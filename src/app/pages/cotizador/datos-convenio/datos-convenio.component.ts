import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { DxFormComponent } from 'devextreme-angular';
import DataSource from 'devextreme/data/data_source';
import CustomStore, { Options as CustomStoreOptions } from 'devextreme/data/custom_store';
import { CotizacionModel, ProductoCotizacionModel } from 'src/app/shared/models/cotizador/cotizador.model';
import { CatalogoDTO, CatalogosCotizadorService } from 'src/app/services/cotizador/catalogos-cotizador.service';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-datos-convenio',
  templateUrl: './datos-convenio.component.html',
  styleUrls: ['./datos-convenio.component.scss']
})
export class DatosConvenioComponent implements OnInit, OnChanges {

  @ViewChild(DxFormComponent) formRef?: DxFormComponent;

  @Input()  modelo: CotizacionModel;
  @Output() modeloChange = new EventEmitter<CotizacionModel>();

  /** Lista de clientes de pestaña 1 (sin uso directo aquí). */
  @Input() clientes: any[] = [];

  /** idCliente de pestaña 1 — dispara recarga de contratos al cambiar. */
  @Input() idClientePadre: number | null;

  // ── DataSources con búsqueda en servidor (mín 3 chars, paginate:false) ────
  clienteGSTDataSource: DataSource;   // Remitente y Destinatario
  productoDataSource:   DataSource;
  // Store separado para dxo-lookup del grid (no acepta DataSource directamente)
  productosStore:       CustomStore;

  // Catálogos estáticos
  arrMonedas:          CatalogoDTO[] = [];
  arrTiposServicio:    CatalogoDTO[] = [];
  arrTiposCobro:       CatalogoDTO[] = [];
  arrTiposExportacion: CatalogoDTO[] = [];
  arrRegimenes:        CatalogoDTO[] = [];
  arrEmbalajes:        CatalogoDTO[] = [];
  /** dataSource del dxo-lookup de Embalaje (ver _buildEmbalajesLookup). */
  embalajesLookup:     { store: CustomStore };

  // Catálogos dependientes (cargados por llamada al servicio)
  arrContratos: CatalogoDTO[] = [];

  constructor(private catService: CatalogosCotizadorService) {
    this.onTipoServChanged = this.onTipoServChanged.bind(this);
    this.onTipoCobroChanged = this.onTipoCobroChanged.bind(this);

    this._buildClienteGSTDataSource();
    this._buildProductoDataSource();
    this._buildProductosStore();
    this._buildEmbalajesLookup();
  }

  ngOnInit(): void {
    this._cargarCatalogosEstaticos();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const clChange = changes['idClientePadre'];
    if (clChange) {
      const prev: number | null = clChange.previousValue ?? null;
      const curr: number | null = clChange.currentValue ?? null;

      if (curr !== prev) {
        if (clChange.firstChange) {
          // Modo edición: cargar contratos sin limpiar idContrato guardado
          if (curr) this._cargarContratos(curr);
        } else {
          // Cambio real por el usuario: solo limpiar si había un cliente anterior.
          // Si también cambió el modelo es una carga (editar/ver/nueva): conservar idContrato.
          if (prev !== null && !changes['modelo']) {
            this.modelo.idContrato = undefined;
            this.arrContratos      = [];
          }
          if (curr) this._cargarContratos(curr);
          else      this.arrContratos = [];
        }
      }
    }
  }

  // ── Constructores de DataSource ───────────────────────────────────────────

  private _buildClienteGSTDataSource(): void {
    const svc = this.catService;
    this.clienteGSTDataSource = new DataSource({
      store: new CustomStore({
        key: 'id',
        load: (opts: any) => svc.searchClientes(opts.searchValue || '').toPromise(),
        byKey: (key: number) => svc.getClienteById(key).toPromise()
      }),
      paginate: false
    });
  }

  private _buildProductoDataSource(): void {
    const svc = this.catService;
    this.productoDataSource = new DataSource({
      store: new CustomStore({
        key: 'id',
        load: (opts: any) => svc.searchProductos(opts.searchValue || '').toPromise(),
        byKey: (key: number) => svc.getProductoById(key).toPromise()
      }),
      paginate: false
    });
  }

  private _buildProductosStore(): void {
    const svc = this.catService;
    this.productosStore = new CustomStore({
      key: 'id',
      load: (opts: any) => svc.searchProductos(opts.searchValue || '').toPromise(),
      byKey: (key: number) => svc.getProductoById(key).toPromise()
    } as CustomStoreOptions<CatalogoDTO, number>);
  }

  /**
   * Lookup de Embalaje del grid de productos. Carga propia (fuera del forkJoin, para
   * que un fallo de otro catálogo no la deje vacía) y por store: el grid pide los
   * datos cuando los necesita, sin depender de que arrEmbalajes ya esté lleno al
   * renderizar.
   */
  private _buildEmbalajesLookup(): void {
    let carga: Promise<CatalogoDTO[]> | null = null;
    this.embalajesLookup = {
      store: new CustomStore({
        key: 'id',
        loadMode: 'raw',
        load: () => {
          if (!carga) {
            carga = this.catService.getEmbalajes().toPromise()
              .then(r => (this.arrEmbalajes = r ?? []))
              .catch(err => { carga = null; throw err; }); // permitir reintento
          }
          return carga;
        }
      } as CustomStoreOptions<CatalogoDTO, number>)
    };
  }

  // ── Catálogos estáticos + carga inicial de dependientes ──────────────────

  private _cargarCatalogosEstaticos(): void {
    forkJoin({
      monedas:       this.catService.getMonedas(),
      tiposServicio: this.catService.getTiposServicio(),
      tiposCobro:    this.catService.getTiposCobro(),
      tiposExp:      this.catService.getTiposExportacion(),
      regimenes:     this.catService.getRegimenes(),
    }).subscribe(res => {
      this.arrMonedas          = res.monedas;
      this.arrTiposServicio    = res.tiposServicio;
      this.arrTiposCobro       = res.tiposCobro;
      this.arrTiposExportacion = res.tiposExp;
      this.arrRegimenes        = res.regimenes;

      // Modo edición: cargar contratos si el modelo tiene cliente guardado
      const idCli = this.idClientePadre ?? this.modelo?.idCliente;
      if (idCli) this._cargarContratos(idCli);
    });
  }

  // ── Catálogos dependientes ────────────────────────────────────────────────

  private _cargarContratos(idCliente: number): void {
    this.catService.getContratos(idCliente).subscribe(data => { this.arrContratos = data; });
  }

  /**
   * Empuja los valores del modelo a los editores del form tras cargar una
   * cotización guardada (remitente/destinatario se resuelven con byKey).
   */
  refrescarEditores(): void {
    const form = this.formRef?.instance;
    if (!form || !this.modelo) return;
    const campos: (keyof CotizacionModel)[] = [
      'idRemitente', 'idDestinatario', 'idTipoMoneda', 'tipoServ', 'tipoCobro',
      'tarifaUnitaria', 'idContrato', 'idTipoExportacion', 'regimenes',
      'toleranciaLlegada', 'descConvenio', 'observaciones'
    ];
    for (const campo of campos) {
      form.getEditor(campo)?.option('value', this.modelo[campo] ?? null);
    }
  }

  // ── Texto vacío de contratos según estado del cliente ────────────────────

  get contratoNoDataText(): string {
    return this.idClientePadre
      ? 'Sin contratos para este cliente'
      : 'Seleccione el cliente del catálogo en la pestaña Cotización';
  }

  // ── Evento tipo de servicio ───────────────────────────────────────────────

  onTipoServChanged(_e: any): void {
    const c = (this.modelo?.tipoServ || '').toUpperCase();
    if (c !== 'I' && c !== 'E') {
      this.modelo.idTipoExportacion = undefined;
      this.modelo.regimenes         = [];
    }
  }

  // ── Evento tipo de cobro ──────────────────────────────────────────────────

  onTipoCobroChanged(e: any): void {
    // Solo un cambio del usuario lo marca como manual (no la carga en edición)
    if (e.event != null) this.modelo.tipoCobroManual = true;
    if (!this.esTarifaUnitaria) this.modelo.tarifaUnitaria = undefined;
  }

  /** La tarifa unitaria solo aplica con tipoCobro = 'U'. */
  get esTarifaUnitaria(): boolean {
    return (this.modelo?.tipoCobro || '').toUpperCase() === 'U';
  }

  // ── Visibilidad sección Comercio Exterior ─────────────────────────────────

  get esComercioExterior(): boolean {
    const c = (this.modelo?.tipoServ || '').toUpperCase();
    return c === 'I' || c === 'E';
  }

  // ── setCellValue grid productos — arrow fn + Promise para que DX espere ──

  /**
   * Firma de DevExtreme: (newData, value, currentRowData). Regresa la promesa para
   * que el grid espere los datos del producto antes de pintar la fila.
   */
  setCellValueProducto = (newData: ProductoCotizacionModel, value: number,
                          currentRowData: ProductoCotizacionModel): Promise<void> => {
    newData.idProducto = value;
    if (value == null) return Promise.resolve();
    return this.catService.getProductoById(value).toPromise().then(p => {
      if (!p) return;
      newData.descripcion = p.descripcion;
      newData.idFraccion  = this._aNumero(p.idRelacion as any) ?? null;
      newData.peso        = p.valor || 0;
      // Embalaje por defecto del producto, solo si la fila aún no tiene uno
      if (currentRowData?.embalaje == null) {
        newData.embalaje = this._aNumero(p.extra1) ?? null;
      }
    });
  }

  private _aNumero(v: string | number | null | undefined): number | undefined {
    const n = Number(v);
    return v != null && v !== '' && !isNaN(n) ? n : undefined;
  }

  // ── Renglón consecutivo del grid de productos ─────────────────────────────

  onProductoInitNewRow = (e: any): void => {
    e.data.renglon  = (this.modelo.productos?.length ?? 0) + 1;
    e.data.embalaje = null;   // sin embalaje hasta elegir producto (no 0 ni '')
  }

  /** Recalcula renglon 1, 2, 3… según el orden del grid (al agregar o borrar). */
  renumerarProductos = (): void => {
    (this.modelo.productos ?? []).forEach((p, i) => p.renglon = i + 1);
  }
}
