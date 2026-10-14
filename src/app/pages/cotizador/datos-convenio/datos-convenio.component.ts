import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
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
  arrConceptos:        CatalogoDTO[] = [];

  // Catálogos dependientes (cargados por llamada al servicio)
  arrContratos: CatalogoDTO[] = [];

  constructor(private catService: CatalogosCotizadorService) {
    this.onTipoServChanged = this.onTipoServChanged.bind(this);

    this._buildClienteGSTDataSource();
    this._buildProductoDataSource();
    this._buildProductosStore();
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
          // Cambio real por el usuario: solo limpiar si había un cliente anterior
          if (prev !== null) {
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

  // ── Catálogos estáticos + carga inicial de dependientes ──────────────────

  private _cargarCatalogosEstaticos(): void {
    forkJoin({
      monedas:       this.catService.getMonedas(),
      tiposServicio: this.catService.getTiposServicio(),
      tiposCobro:    this.catService.getTiposCobro(),
      tiposExp:      this.catService.getTiposExportacion(),
      regimenes:     this.catService.getRegimenes(),
      conceptos:     this.catService.getConceptos(),
    }).subscribe(res => {
      this.arrMonedas          = res.monedas;
      this.arrTiposServicio    = res.tiposServicio;
      this.arrTiposCobro       = res.tiposCobro;
      this.arrTiposExportacion = res.tiposExp;
      this.arrRegimenes        = res.regimenes;
      this.arrConceptos        = res.conceptos;

      // Modo edición: cargar contratos si el modelo tiene cliente guardado
      const idCli = this.idClientePadre ?? this.modelo?.idCliente;
      if (idCli) this._cargarContratos(idCli);
    });
  }

  // ── Catálogos dependientes ────────────────────────────────────────────────

  private _cargarContratos(idCliente: number): void {
    this.catService.getContratos(idCliente).subscribe(data => { this.arrContratos = data; });
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

  // ── Visibilidad sección Comercio Exterior ─────────────────────────────────

  get esComercioExterior(): boolean {
    const c = (this.modelo?.tipoServ || '').toUpperCase();
    return c === 'I' || c === 'E';
  }

  // ── setCellValue grid productos — arrow fn + Promise para que DX espere ──

  setCellValueProducto = (rowData: ProductoCotizacionModel, value: number): Promise<void> => {
    rowData.idProducto = value;
    return this.catService.getProductoById(value).toPromise().then(prod => {
      if (prod) {
        rowData.producto   = prod.descripcion;
        rowData.embalaje   = prod.extra1 || '';
        rowData.idFraccion = prod.extra2 || '';
        rowData.peso       = prod.valor  || 0;
      }
    });
  }
}
