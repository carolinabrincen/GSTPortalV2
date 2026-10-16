import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { AbstractManagerService } from 'src/app/shared/services/abstractManagerService';
import { environment } from 'src/environments/environment';

export interface CatalogoDTO {
  id: number;
  clave?: string;
  descripcion: string;
  extra1?: string;    // Clientes: --  |  Plazas: --  |  Rutas: kms_sct  |  Productos: embalaje
  extra2?: string | null; // Clientes: --  |  Plazas: --  |  Rutas: id_tipo_operacion  |  Productos: id_fraccion arancelaria
  valor?: number;     // Rutas: kms_ruta  |  Productos: peso kg/unidad
  idRelacion?: number; // Contratos: idCliente (0 = global)  |  Productos: id_fraccion
}

/** DTO rico para el combo de Ruta en pestaña Cotización. */
export interface RutaCatalogoDTO {
  idRuta: number | null;
  descRuta: string;
  idOrigen: number | null;
  origen: string;
  idDestino: number | null;
  destino: string;
  kmsRuta: number;
  kmsSct: number;
  idTipoOperacion: number | null;
}

/** Opción de un catálogo fijo del front (sin endpoint en el back). */
export interface OpcionClaveDTO {
  clave: string;
  descripcion: string;
}

/** Tipo de servicio (tipo_serv). 'D' por defecto; 'I' / 'E' muestran la sección de comercio exterior. */
export const TIPOS_SERVICIO: OpcionClaveDTO[] = [
  { clave: 'D', descripcion: 'Doméstico' },
  { clave: 'I', descripcion: 'Importación' },
  { clave: 'E', descripcion: 'Exportación' },
];

/** Tipo de cobro (tipo_cobro). 'U' habilita la tarifa unitaria. */
export const TIPOS_COBRO: OpcionClaveDTO[] = [
  { clave: 'V', descripcion: 'Por viaje' },
  { clave: 'T', descripcion: 'Por tonelada' },
  { clave: 'U', descripcion: 'Valor unitario' },
];

/** Criterio que el back asigna a una caseta sin tarifa para los ejes pedidos. */
export const CRITERIO_SIN_TARIFA = 'SIN TARIFA';

/** Una caseta de la ruta con la tarifa aplicada según el número de ejes. */
export interface CasetaDetalleDTO {
  orden: number;
  idCaseta: number;
  caseta: string;
  tarifa: number | null;
  ejesAplicados: number | null;
  criterio: string;
}

/** Casetas de una ruta (ApiResponse.data): total con impuestos de un sentido y detalle. */
export interface CasetasRutaDTO {
  detalle: CasetaDetalleDTO[];
  total: number;
  hayCasetasSinTarifa: boolean;
}

/** Mensaje que se muestra cuando la ruta fue escrita manualmente (no del catálogo). */
export const MSG_RUTA_NO_CATALOGO =
  'La ruta no existe en el catálogo de GST. Debe darse de alta en el Catálogo de Rutas para poder generar el convenio.';

/** Minúsculas y sin acentos, para búsquedas "contiene" del MOCK. */
function normalizar(s: string | undefined | null): string {
  return (s ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

function contiene(texto: string | undefined | null, term: string): boolean {
  return normalizar(texto).includes(normalizar(term));
}

// ── Tipo interno del MOCK — incluye campos de filtro que el DTO real no trae ─
interface MockRutaInternal extends CatalogoDTO {
  _idOrigen: number;
  _idDestino: number;
}

// ── MOCK DATA — activo cuando environment.usarMockCatalogos = true ────────────
const MOCK_CLIENTES: CatalogoDTO[] = [
  { id: 1, clave: 'CLI001', descripcion: 'CEMEX México S.A. de C.V.' },
  { id: 2, clave: 'CLI002', descripcion: 'FEMSA Comercio' },
  { id: 3, clave: 'CLI003', descripcion: 'Grupo Bimbo S.A. de C.V.' },
  { id: 4, clave: 'CLI004', descripcion: 'Walmart de México S. de R.L.' },
  { id: 5, clave: 'CLI005', descripcion: 'Lala S.A. de C.V.' },
];

// Reales de pruebasgst: id/clave = id_plaza, descripcion = desc_plaza.
// Los de ejemplo se movieron a 101–113 para no chocar con id_plaza 1 (HOLCIM ORIZABA).
const MOCK_PLAZAS: CatalogoDTO[] = [
  { id: 1,   clave: '1',   descripcion: 'HOLCIM ORIZABA' },
  { id: 914, clave: '914', descripcion: 'SCHOTT AMATLAN' },
  { id: 930, clave: '930', descripcion: 'CARTONERA PLASTICA CUAUTI' },
  { id: 931, clave: '931', descripcion: 'STERIGENICS CUAUTI' },
  // Ejemplo
  { id: 114, descripcion: 'Puebla' },
  { id: 101, descripcion: 'Ciudad de México' },
  { id: 102, descripcion: 'Guadalajara' },
  { id: 103, descripcion: 'Monterrey' },
  { id: 104, descripcion: 'Querétaro' },
  { id: 105, descripcion: 'San Luis Potosí' },
  { id: 106, descripcion: 'Chihuahua' },
  { id: 107, descripcion: 'Hermosillo' },
  { id: 108, descripcion: 'Tijuana' },
  { id: 109, descripcion: 'Mérida' },
  { id: 110, descripcion: 'Veracruz' },
  { id: 111, descripcion: 'León' },
  { id: 112, descripcion: 'Torreón' },
  { id: 113, descripcion: 'Saltillo' },
];

const MOCK_MONEDAS: CatalogoDTO[] = [
  { id: 1, clave: 'MXN', descripcion: 'Peso Mexicano' },
  { id: 2, clave: 'USD', descripcion: 'Dólar Americano' },
];


// idRelacion = 0 → disponible para todos; idRelacion > 0 → solo ese cliente
const MOCK_CONTRATOS: CatalogoDTO[] = [
  { id: 1, descripcion: 'Spot (sin contrato)',       idRelacion: 0 },
  { id: 2, descripcion: 'Contrato mensual CEMEX',    idRelacion: 1 },
  { id: 3, descripcion: 'Convenio anual CEMEX',      idRelacion: 1 },
  { id: 4, descripcion: 'Contrato mensual FEMSA',    idRelacion: 2 },
  { id: 5, descripcion: 'Contrato anual Bimbo',      idRelacion: 3 },
  { id: 6, descripcion: 'Convenio especial Walmart', idRelacion: 4 },
];

const MOCK_TIPOS_EXPORTACION: CatalogoDTO[] = [
  { id: 1, descripcion: 'Temporal' },
  { id: 2, descripcion: 'Definitiva' },
  { id: 3, descripcion: 'Consolidado' },
  { id: 4, descripcion: 'No aplica' },
];

const MOCK_REGIMENES: CatalogoDTO[] = [
  { id: 1, descripcion: 'Importación definitiva' },
  { id: 2, descripcion: 'Exportación definitiva' },
  { id: 3, descripcion: 'Importación temporal' },
  { id: 4, descripcion: 'Depósito fiscal' },
];

// ── MOCK para el combo de Ruta en pestaña "Cotización" ───────────────────────
const MOCK_RUTAS_CATALOGO: RutaCatalogoDTO[] = [
  { idRuta: 1129, descRuta: 'STERIGENICS CUAUTI - SCHOTT AMATLAN',
    idOrigen: 931, origen: 'STERIGENICS CUAUTI',
    idDestino: 914, destino: 'SCHOTT AMATLAN',
    kmsRuta: 347, kmsSct: 347, idTipoOperacion: null },
  { idRuta: 1, descRuta: 'CDMX → Guadalajara',
    idOrigen: 101, origen: 'Ciudad de México',
    idDestino: 102, destino: 'Guadalajara',
    kmsRuta: 423, kmsSct: 423, idTipoOperacion: 1 },
  { idRuta: 2, descRuta: 'CDMX → Monterrey',
    idOrigen: 101, origen: 'Ciudad de México',
    idDestino: 103, destino: 'Monterrey',
    kmsRuta: 916, kmsSct: 916, idTipoOperacion: 1 },
  { idRuta: 3, descRuta: 'CDMX → Querétaro',
    idOrigen: 101, origen: 'Ciudad de México',
    idDestino: 104, destino: 'Querétaro',
    kmsRuta: 211, kmsSct: 211, idTipoOperacion: 1 },
  { idRuta: 42, descRuta: 'PUEBLA - HOLCIM ORIZABA',
    idOrigen: 114, origen: 'Puebla',
    idDestino: 1, destino: 'HOLCIM ORIZABA',
    kmsRuta: 225, kmsSct: 225, idTipoOperacion: null },
];

// ── MOCK de casetas por ruta (tarifas con impuestos por número de ejes) ─────
// id = número de ejes, como el back
const MOCK_EJES_CASETA: CatalogoDTO[] = [
  { id: 5, clave: '5', descripcion: '5 ejes' },
  { id: 6, clave: '6', descripcion: '6 ejes' },
  { id: 9, clave: '9', descripcion: '9 ejes' },
];

const MOCK_CASETAS_RUTA: { [idRuta: number]: { idCaseta: number; caseta: string; tarifas: { [ejes: number]: number } }[] } = {
  42: [
    { idCaseta: 1, caseta: 'VIA ATLIXCAYOTL', tarifas: { 5: 309, 6: 309, 9: 309 } },
    { idCaseta: 2, caseta: 'AMOZOC',          tarifas: { 5: 328, 6: 438, 9: 438 } },
    { idCaseta: 3, caseta: 'ESPERANZA',       tarifas: { 5: 680, 6: 990, 9: 990 } },
  ],
};

/**
 * Calcula el MOCK de CasetasRuta con la misma forma que ApiResponse.data del back.
 * Con ejes usa la tarifa de ese número de ejes (sin ella → criterio SIN TARIFA, tarifa null);
 * sin ejes usa la tarifa máxima de la caseta.
 */
function mockCasetasRuta(idRuta: number, ejes?: number | null): CasetasRutaDTO {
  const casetas = MOCK_CASETAS_RUTA[idRuta] ?? [];
  const detalle: CasetaDetalleDTO[] = casetas.map((c, i) => {
    const base = { orden: i + 1, idCaseta: c.idCaseta, caseta: c.caseta };
    if (ejes != null) {
      const tarifa = c.tarifas[ejes];
      return tarifa != null
        ? { ...base, tarifa, ejesAplicados: ejes, criterio: 'EJES' }
        : { ...base, tarifa: null, ejesAplicados: null, criterio: CRITERIO_SIN_TARIFA };
    }
    const ejesAplicados = Object.keys(c.tarifas).map(Number)
      .reduce((max, e) => c.tarifas[e] > c.tarifas[max] ? e : max);
    return { ...base, tarifa: c.tarifas[ejesAplicados], ejesAplicados, criterio: 'MAXIMA' };
  });
  return {
    detalle,
    total: detalle.reduce((s, d) => s + (d.tarifa ?? 0), 0),
    hayCasetasSinTarifa: detalle.some(d => d.criterio === CRITERIO_SIN_TARIFA)
  };
}

// extra1=kms_sct, extra2=id_tipo_operacion (null = cualquier tipo), valor=kms_ruta;
// _idOrigen/_idDestino solo para filtro interno MOCK
const MOCK_RUTAS_DATA: MockRutaInternal[] = [
  // Real de pruebasgst
  { id: 1129, clave: '1129', descripcion: 'STERIGENICS CUAUTI - SCHOTT AMATLAN', extra1: '347', extra2: null, valor: 347, _idOrigen: 931, _idDestino: 914 },
  // Ejemplo
  { id: 1, descripcion: 'CDMX → Guadalajara',      extra1: '423', extra2: '1', _idOrigen: 101, _idDestino: 102 },
  { id: 2, descripcion: 'CDMX → Monterrey',        extra1: '916', extra2: '1', _idOrigen: 101, _idDestino: 103 },
  { id: 3, descripcion: 'CDMX → Querétaro',        extra1: '211', extra2: '1', _idOrigen: 101, _idDestino: 104 },
  { id: 4, descripcion: 'Guadalajara → Monterrey', extra1: '670', extra2: '1', _idOrigen: 102, _idDestino: 103 },
  { id: 5, descripcion: 'Querétaro → CDMX',        extra1: '211', extra2: '1', _idOrigen: 104, _idDestino: 101 },
  { id: 6, descripcion: 'Monterrey → Saltillo',    extra1: '85',  extra2: '1', _idOrigen: 103, _idDestino: 113 },
];

// extra1=embalaje por defecto (id del catálogo Embalajes, como texto), extra2=id_fraccion (texto),
// valor=peso kg/unidad, idRelacion=id_fraccion
const MOCK_PRODUCTOS: CatalogoDTO[] = [
  // Real de pruebasgst
  { id: 12, descripcion: 'Lavadoras y suministros de uso doméstico', extra1: '1', extra2: '3', idRelacion: 3 },
  // Ejemplo
  { id: 1, descripcion: 'Cemento Portland',        extra1: '2', extra2: '101', idRelacion: 101, valor: 1500 },
  { id: 2, descripcion: 'Bebidas carbonatadas',    extra1: '1', extra2: '102', idRelacion: 102, valor: 12   },
  { id: 3, descripcion: 'Pan empacado',             extra1: '1', extra2: '103', idRelacion: 103, valor: 8    },
  { id: 4, descripcion: 'Productos lácteos',       extra1: '5', extra2: '104', idRelacion: 104, valor: 10   },
  { id: 5, descripcion: 'Artículos de ferretería', extra1: '3', extra2: '105', idRelacion: 105, valor: 50   },
  { id: 6, descripcion: 'Pinturas y barnices',     extra1: '4', extra2: '106', idRelacion: 106, valor: 20   },
];

// id = embalaje
const MOCK_EMBALAJES: CatalogoDTO[] = [
  { id: 1, descripcion: 'Caja' },
  { id: 2, descripcion: 'Granel' },
  { id: 3, descripcion: 'Pallet' },
  { id: 4, descripcion: 'Cubeta' },
  { id: 5, descripcion: 'Caja refrigerada' },
];
// ─────────────────────────────────────────────────────────────────────────────

@Injectable({ providedIn: 'root' })
export class CatalogosCotizadorService extends AbstractManagerService {

  token = sessionStorage.getItem('token') ?? '';

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + this.token
    })
  };

  constructor(http: HttpClient) {
    super(http);
    this.putInterfaceManager(this);
  }

  /** URL base para todos los endpoints de CatalogosCotizador.
   *  En dev puede apuntar a una API local distinta del resto del portal. */
  private get catUrl(): string {
    return (environment as any).apiCatalogosUrl || this.API_URL;
  }

  private useMock(): boolean {
    return (environment as any).usarMockCatalogos === true;
  }

  private unwrapArr(r: any): CatalogoDTO[] {
    return Array.isArray(r) ? r : (r?.data ?? []);
  }

  /**
   * Un solo elemento de la respuesta. Los endpoints por id del back (Clientes/{id},
   * Plazas/{id}, Productos/{id}) regresan ApiResponse.data como lista de 0 o 1 elementos;
   * también acepta data como objeto o la respuesta sin envolver.
   */
  private unwrapOne(r: any, fallback: CatalogoDTO): CatalogoDTO {
    const data = Array.isArray(r) ? r : (r?.data !== undefined ? r.data : r);
    const arr = Array.isArray(data) ? data : [data];
    return arr[0] ?? fallback;
  }

  // ── Búsqueda con texto ────────────────────────────────────────────────────

  /** Búsqueda de clientes: mín 3 chars; devuelve CatalogoDTO[] (máx 50). */
  searchClientes(term: string): Observable<CatalogoDTO[]> {
    if (!term || term.length < 3) return of([]);
    if (this.useMock()) {
      return of(MOCK_CLIENTES.filter(c =>
        contiene(c.descripcion, term) || contiene(c.clave, term)
      ).slice(0, 50));
    }
    return this.get<any>(`${this.catUrl}api/CatalogosCotizador/Clientes?texto=${encodeURIComponent(term)}`, this.httpOptions)
      .pipe(map(r => this.unwrapArr(r).slice(0, 50)));
  }

  getClienteById(id: number): Observable<CatalogoDTO> {
    const fallback: CatalogoDTO = { id, descripcion: String(id) };
    if (this.useMock()) return of(MOCK_CLIENTES.find(c => c.id === id) ?? fallback);
    return this.get<any>(`${this.catUrl}api/CatalogosCotizador/Clientes/${id}`, this.httpOptions)
      .pipe(map(r => this.unwrapOne(r, fallback)));
  }

  /** Búsqueda de plazas: mín 3 chars; devuelve CatalogoDTO[] (máx 50). */
  searchPlazas(term: string): Observable<CatalogoDTO[]> {
    if (!term || term.length < 3) return of([]);
    if (this.useMock()) {
      return of(MOCK_PLAZAS.filter(p => contiene(p.descripcion, term)).slice(0, 50));
    }
    return this.get<any>(`${this.catUrl}api/CatalogosCotizador/Plazas?texto=${encodeURIComponent(term)}`, this.httpOptions)
      .pipe(map(r => this.unwrapArr(r).slice(0, 50)));
  }

  getPlazaById(id: number): Observable<CatalogoDTO> {
    const fallback: CatalogoDTO = { id, descripcion: String(id) };
    if (this.useMock()) return of(MOCK_PLAZAS.find(p => p.id === id) ?? fallback);
    return this.get<any>(`${this.catUrl}api/CatalogosCotizador/Plazas/${id}`, this.httpOptions)
      .pipe(map(r => this.unwrapOne(r, fallback)));
  }

  /** Búsqueda de productos: mín 3 chars; devuelve CatalogoDTO[] (máx 50). */
  searchProductos(term: string): Observable<CatalogoDTO[]> {
    if (!term || term.length < 3) return of([]);
    if (this.useMock()) {
      return of(MOCK_PRODUCTOS.filter(p => contiene(p.descripcion, term)).slice(0, 50));
    }
    return this.get<any>(`${this.catUrl}api/CatalogosCotizador/Productos?texto=${encodeURIComponent(term)}`, this.httpOptions)
      .pipe(map(r => this.unwrapArr(r).slice(0, 50)));
  }

  getProductoById(id: number): Observable<CatalogoDTO> {
    const fallback: CatalogoDTO = { id, descripcion: String(id) };
    if (this.useMock()) return of(MOCK_PRODUCTOS.find(p => p.id === id) ?? fallback);
    return this.get<any>(`${this.catUrl}api/CatalogosCotizador/Productos/${id}`, this.httpOptions)
      .pipe(map(r => this.unwrapOne(r, fallback)));
  }

  // ── Catálogos estáticos ───────────────────────────────────────────────────

  getMonedas(): Observable<CatalogoDTO[]> {
    if (this.useMock()) return of(MOCK_MONEDAS);
    return this.get<any>(this.catUrl + 'api/CatalogosCotizador/Monedas', this.httpOptions)
      .pipe(map(r => this.unwrapArr(r)));
  }


  /** Contratos disponibles para un cliente. Sin idCliente devuelve solo los globales (idRelacion=0). */
  getContratos(idCliente?: number): Observable<CatalogoDTO[]> {
    if (this.useMock()) {
      if (!idCliente) return of(MOCK_CONTRATOS.filter(c => c.idRelacion === 0));
      return of(MOCK_CONTRATOS.filter(c => !c.idRelacion || c.idRelacion === 0 || c.idRelacion === idCliente));
    }
    const url = idCliente
      ? `${this.catUrl}api/CatalogosCotizador/Contratos/${idCliente}`
      : `${this.catUrl}api/CatalogosCotizador/Contratos`;
    return this.get<any>(url, this.httpOptions).pipe(map(r => this.unwrapArr(r)));
  }

  getTiposExportacion(): Observable<CatalogoDTO[]> {
    if (this.useMock()) return of(MOCK_TIPOS_EXPORTACION);
    return this.get<any>(this.catUrl + 'api/CatalogosCotizador/TiposExportacion', this.httpOptions)
      .pipe(map(r => this.unwrapArr(r)));
  }

  getRegimenes(): Observable<CatalogoDTO[]> {
    if (this.useMock()) return of(MOCK_REGIMENES);
    return this.get<any>(this.catUrl + 'api/CatalogosCotizador/RegimenesAduaneros', this.httpOptions)
      .pipe(map(r => this.unwrapArr(r)));
  }

  /**
   * Rutas para un par origen-destino.
   * Endpoint real: GET Rutas/{idOrigen}/{idDestino}?idTipoOperacion=n
   * MOCK: filtra por _idOrigen/_idDestino (campos internos); el DTO devuelto
   * tiene extra1=kms_sct, extra2=id_tipo_operacion y valor=kms_ruta, igual que el back real.
   * Como el back: con idTipoOperacion, incluye las rutas de ese tipo y las de
   * id_tipo_operacion null/0 (ISNULL(id_tipo_operacion,0) = 0), primero las del tipo exacto.
   */
  getRutas(idOrigen: number, idDestino: number, idTipoOperacion?: number): Observable<CatalogoDTO[]> {
    if (this.useMock()) {
      const op = idTipoOperacion != null ? String(idTipoOperacion) : null;
      const esGenerica = (r: CatalogoDTO) => !r.extra2 || r.extra2 === '0';
      const resultado = MOCK_RUTAS_DATA
        .filter(r => r._idOrigen === idOrigen && r._idDestino === idDestino)
        .filter(r => op == null || r.extra2 === op || esGenerica(r))
        .sort((a, b) =>
          (op != null && a.extra2 === op ? 0 : 1) - (op != null && b.extra2 === op ? 0 : 1) ||
          a.descripcion.localeCompare(b.descripcion))
        .map(({ _idOrigen, _idDestino, ...dto }) => dto as CatalogoDTO);
      return of(resultado);
    }
    const qs = idTipoOperacion != null ? `?idTipoOperacion=${idTipoOperacion}` : '';
    return this.get<any>(`${this.catUrl}api/CatalogosCotizador/Rutas/${idOrigen}/${idDestino}${qs}`, this.httpOptions)
      .pipe(map(r => this.unwrapArr(r)));
  }

  /** Catálogo de embalajes; id = embalaje. */
  getEmbalajes(): Observable<CatalogoDTO[]> {
    if (this.useMock()) return of(MOCK_EMBALAJES);
    return this.get<any>(this.catUrl + 'api/CatalogosCotizador/Embalajes', this.httpOptions)
      .pipe(map(r => this.unwrapArr(r)));
  }

  /**
   * Búsqueda de rutas para el combo de pestaña "Cotización".
   * Mínimo 3 caracteres (sin espacios).
   * MOCK: divide el texto en palabras; cada palabra debe aparecer en
   *   descRuta, origen, destino o el idRuta como texto (contiene, sin acento/mayús).
   * Endpoint real: GET /api/CatalogosCotizador/RutasBuscar?texto=...&idTipoOperacion=n
   */
  searchRutas(texto: string, idTipoOperacion?: number): Observable<RutaCatalogoDTO[]> {
    const limpio = (texto || '').replace(/\s+/g, '');
    if (limpio.length < 3) return of([]);

    if (this.useMock()) {
      const palabras = (texto || '').trim()
        .normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
        .split(/\s+/).filter(p => p.length > 0);

      return of(MOCK_RUTAS_CATALOGO.filter(r => {
        if (idTipoOperacion != null && r.idTipoOperacion != null
            && r.idTipoOperacion !== idTipoOperacion) return false;
        const haystack = normalizar(
          String(r.idRuta) + ' ' + r.descRuta + ' ' + r.origen + ' ' + r.destino
        );
        return palabras.every(p => haystack.includes(p));
      }));
    }

    const qs = idTipoOperacion != null ? `&idTipoOperacion=${idTipoOperacion}` : '';
    return this.get<any>(
      `${this.catUrl}api/CatalogosCotizador/RutasBuscar?texto=${encodeURIComponent(texto)}${qs}`,
      this.httpOptions
    ).pipe(map(r => this.unwrapArr(r) as unknown as RutaCatalogoDTO[]));
  }

  /** Números de ejes con tarifa de casetas (combo "Número de ejes"); id = número de ejes. */
  getEjesCaseta(): Observable<CatalogoDTO[]> {
    if (this.useMock()) return of(MOCK_EJES_CASETA);
    return this.get<any>(this.catUrl + 'api/CatalogosCotizador/EjesCaseta', this.httpOptions)
      .pipe(map(r => this.unwrapArr(r)));
  }

  /**
   * Casetas de una ruta con su total (con impuestos, un sentido).
   * Endpoint real: GET CasetasRuta/{idRuta}?ejes=n → ApiResponse.data = CasetasRutaDTO.
   */
  getCasetasRuta(idRuta: number, ejes?: number | null): Observable<CasetasRutaDTO> {
    if (this.useMock()) return of(mockCasetasRuta(idRuta, ejes));
    const qs = ejes != null ? `?ejes=${ejes}` : '';
    return this.get<any>(`${this.catUrl}api/CatalogosCotizador/CasetasRuta/${idRuta}${qs}`, this.httpOptions)
      .pipe(map(r => r?.data as CasetasRutaDTO));
  }

  /** Obtiene una ruta por id. Devuelve null si no existe. */
  getRutaById(idRuta: number): Observable<RutaCatalogoDTO | null> {
    if (this.useMock()) {
      return of(MOCK_RUTAS_CATALOGO.find(r => r.idRuta === idRuta) ?? null);
    }
    return this.get<any>(
      `${this.catUrl}api/CatalogosCotizador/RutasBuscar/${idRuta}`,
      this.httpOptions
    ).pipe(map(r => {
      const arr = this.unwrapArr(r) as unknown as RutaCatalogoDTO[];
      return arr[0] ?? null;
    }));
  }
}
