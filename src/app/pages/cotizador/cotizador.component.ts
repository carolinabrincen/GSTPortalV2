import { switchMap, map } from 'rxjs/operators';
import { of, Subscription } from 'rxjs';
import { ReportsPDFService } from './../../shared/reports/reports-pdf.service';
import { CotizadorService } from './../../services/cotizador/cotizador.service';
import { CotizacionModel, VariablesCotizacionModel, DetalleCotizacionModel} from './../../shared/models/cotizador/cotizador.model';
import { CatalogosCotizadorService, RutaCatalogoDTO, CasetasRutaDTO, CRITERIO_SIN_TARIFA, MSG_RUTA_NO_CATALOGO } from 'src/app/services/cotizador/catalogos-cotizador.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  DxDataGridModule,
  DxDataGridComponent,
  DxTemplateModule,
  DxSelectBoxModule,
  DxButtonModule,
  DxFormComponent,
} from 'devextreme-angular';
import { UnidadesNegocioModel } from 'src/app/shared/models/rentabilidad-contable/renta-contable.model';
import { RentContService } from 'src/app/services/rentabilidad-contable/rent-cont.service';
import { RentGerService } from 'src/app/services/rentabilidad-gerencial/rent-ger.service';
import { CarteraClientesService } from 'src/app/services/carteraClientes/carteraCliente.service';
import { TiposOperacionModel } from 'src/app/shared/models/rentabilidad-gerencial/renta-geren.model';
import notify from 'devextreme/ui/notify';
import { confirm } from 'devextreme/ui/dialog';
import { IUser } from 'src/app/shared/services';
import themes from 'devextreme/ui/themes';
import dxSelectBox from 'devextreme/ui/select_box';
import { runInThisContext } from 'vm';
import DataSource from 'devextreme/data/data_source';
import CustomStore from 'devextreme/data/custom_store';







@Component({
  selector: 'app-cotizador',
  templateUrl: './cotizador.component.html',
  styleUrls: ['./cotizador.component.scss']
})
export class CotizadorComponent implements OnInit {

  private _user: IUser | null = null;

  arrCotizaciones: CotizacionModel[] = [];
  arrPreCotizaciones: CotizacionModel[] = [];
  arrUnidadesNegocio: UnidadesNegocioModel[] = [];
  arrTipoOperacion: TiposOperacionModel[] = [];
  arrVariables: VariablesCotizacionModel[] = [];
  arrDetalleCotizacion: DetalleCotizacionModel[] = [];
  arrClasificaciones: string[] = [];
  arrClientes: any[] = [];
  clientesDataSource: any = null;
  private _clientesIndex: { lower: string; item: any }[] = [];
  refreshClientesOptions: any;

  // ── Ruta (pestaña Cotización) ─────────────────────────────────────────────
  rutaDataSource: DataSource;
  selectedRuta: RutaCatalogoDTO | null = null;
  private ultimasRutas: RutaCatalogoDTO[] = [];
  mostrarAvisoRuta = false;
  readonly msgRutaNoCatalogo = MSG_RUTA_NO_CATALOGO;
  origenOptions: any = {};
  destinoOptions: any = {};

  // ── Casetas automáticas por ruta y número de ejes ────────────────────────
  arrEjes: { valor: number | null; texto: string }[] = [{ valor: null, texto: 'Sin definir' }];
  casetasRuta: CasetasRutaDTO | null = null;
  /** Ruta y ejes con los que se obtuvo casetasRuta (el DTO no los trae). */
  private casetasRutaKey: { idRuta: number; ejes: number | null } | null = null;
  bolModalCasetas = false;
  readonly criterioSinTarifa = CRITERIO_SIN_TARIFA;
  /** El usuario editó a mano casetas ida/regreso desde el último cálculo. */
  private casetasEditadasManual = false;
  private casetasSub: Subscription | null = null;

  @ViewChild('rentGer') rentGer!: DxDataGridComponent;
  @ViewChild('cotizadorForm', { static: false }) cotizadorFormRef!: DxFormComponent;

  arrCotizacionesSelect: CotizacionModel[] = [];

  allMode: string;
  checkBoxesMode: string;
 

  itemCotizacion: CotizacionModel = {
    idCotizacion: undefined,
    folio: 0,
    sencillo:true,
    tipoViaje: "Solo de ida",
    regresa_vacio: false,
    regreso:"Vacio",
    id_ingreso: "0",
    id_area: undefined,
    unidadNegocio: "",
    id_tipo_operacion: 0,
    tipoOperacion: "",
    clasificacion: "",
    cliente: undefined,
    origen: undefined,
    destino: undefined,
    kms_ida: 0,
    kms_regreso:0,
    kms_totales: 0,
    casetas: 0,
    casetas_si: 0,
    casetas_regreso:0,
    casetas_regreso_si:0,
    casetas_total_sin_impuestos:0,
    diesel:0,
    diesel_sin_impuestos: 0,
    diesel_total_sin_impuestos:0,
    num_estancias_ida: 0,
    num_maniobras_ida: 0,
    ton_carga_ida:0,
    num_estancias_regreso:0,
    num_maniobras_regreso:0,
    ton_carga_regreso:0,
    clienta_paga: false,
    clientePagaCasetas:"No",
    tarifaFinal:0,
    costoViaje:0,
    toneladas:0,
    costo_tonelada:0,
    costoPorKm:0,
    ingresoPorKm:0,
    rend_cargado:0,
    rend_vacio:0,
    // Datos para convenio
    idCliente: undefined,
    idRemitente: undefined,
    idDestinatario: undefined,
    idOrigen: undefined,
    idDestino: undefined,
    idRuta: undefined,
    ruta: undefined,
    numEjes: null,
    idTipoMoneda: undefined,
    tipoServ: undefined,
    tipoCobro: undefined,
    tipoCobroManual: false,
    tarifaUnitaria: undefined,
    idContrato: undefined,
    idTipoExportacion: undefined,
    regimenes: [],
    toleranciaLlegada: 0,
    descConvenio: undefined,
    observaciones: undefined,
    productos: []

  };

  buttonOptions: any = {
    text: 'Guardar',
    type: 'default',
    icon: 'check',
    useSubmitBehavior: true,

  };
  buttonCalcularVariables: any;
  buttonOptionsVariables: any;
  buttonOptionsPre: any;
  buttonOptionsImprimir: any;
  buttonOptionsRadioTipoViaje: any;
  RadioButtonTipoViaje: any;
  RadioButtonRegreso: any;
  RadioButtonClientePagaCasetas: any;
  RadioButtonPrecioXTonelada: any;

  buttonOptionsActualizar: any;
  buttonOptionsAprobar: any;
  buttonOptionsCerar: any;

  bolModal: boolean = false;
  activeTab: number = 0;
  positionOf: string = '#myDiv';
  tituloModal: string = '';
  sololectura:string = '';

  bolModalVariables = false;
  bolModalDetalleCotizacion = false;
  readonly allowedPageSizes = [5, 10, 20, 50];

  tipoRegistro: string = '';
  operacion: string = '';
  rowIndex: number = -1;
  bolEsViajeSencillo = true;
  bolEsPrecioTonelada = true;
  bolEsViajeVacio = true;
  bolBotonAprobarCotizacion = false;
  bolFormSoloLectura = false;

  modConfimation: boolean= false
  constructor(
    private cotizadorService: CotizadorService,
    private renContService: RentContService,
    private renGerService: RentGerService,
    private pdfReport: ReportsPDFService,
    private carteraClientesService: CarteraClientesService,
    private catService: CatalogosCotizadorService
  ) {
    const that = this;
    this.unidadNegocio_ValueChanged = this.unidadNegocio_ValueChanged.bind(this);
    this.cliente_onCustomItemCreating    = this.cliente_onCustomItemCreating.bind(this);
    this.cliente_onSelectionChanged      = this.cliente_onSelectionChanged.bind(this);
    this.clienteItemTemplate             = this.clienteItemTemplate.bind(this);
    this.ruta_onSelectionChanged         = this.ruta_onSelectionChanged.bind(this);
    this.ruta_onCustomItemCreating       = this.ruta_onCustomItemCreating.bind(this);
    this.ruta_onValueChanged             = this.ruta_onValueChanged.bind(this);
    this.numEjes_ValueChanged            = this.numEjes_ValueChanged.bind(this);
    this.buildRutaDataSource();
    this.editarCotizacionClick = this.editarCotizacionClick.bind(this);
    this.eliminarCotizcionClick = this.eliminarCotizcionClick.bind(this);
    this.verCortizacionClick = this.verCortizacionClick.bind(this);
    this.imprimirCortizacionClick = this.imprimirCortizacionClick.bind(this);
    this.dieselValueChanged = this.dieselValueChanged.bind(this);
    this.caseta_ida_ValueChanged = this.caseta_ida_ValueChanged.bind(this);
    this.caseta_regreso_ValueChanged = this.caseta_regreso_ValueChanged.bind(this);
    this.toneladasTotalValueChanged = this.toneladasTotalValueChanged.bind(this);
    this.precioToneladasTotalValueChanged = this.precioToneladasTotalValueChanged.bind(this);
    this.precioTotalValueChanged = this.precioTotalValueChanged.bind(this);
    this.tipoOperacion_ValueChanged = this.tipoOperacion_ValueChanged.bind(this);



    this.allMode = 'allPages';
          this.checkBoxesMode = themes.current().startsWith('material') ? 'always' : 'onClick';
     
    //VER VARIABLES
    this.buttonOptionsVariables = {
      type: 'normal',
      text: 'Ver variables',
      icon: 'fieldchooser',

      onClick(e: any) {
        that.bolModalVariables = true;
      },
    };
    //PREVIZUALIZAR
    this.buttonOptionsPre = {
      type: 'normal',
      text: 'Costos',
      icon: 'file',

      onClick(e: any) {
        that.bolModalDetalleCotizacion = true;

      },
    };
    //IMPRIMIR
    this.buttonOptionsImprimir = {
      type: 'normal',
      text: 'Imprimir',
      icon: 'print',

      onClick(e: any) {
        pdfReport.obtenerReporte([that.itemCotizacion]);

      },
    };
    //Configuracion de radiobutton Tipo de viaje
    this.RadioButtonTipoViaje = {
      items: ['Solo de ida', 'Redondo'],
      value: 'Solo de ida',
      layout: 'horizontal',
      onValueChanged: (e) => {
        this.bolEsViajeSencillo = e.value === 'Solo de ida' ? true : false;
        // Al pasar a Redondo por acción del usuario, llenar kms (si está en 0) y casetas de regreso
        if (e.event != null && e.value === 'Redondo' && this.itemCotizacion.idRuta) {
          this.llenarKmsRegresoRedondo(this.itemCotizacion.idRuta);
          this.calcularCasetas('regreso');
        }
      },
    };

    //Configuracion de radiobutton Precio por tonelada
    this.RadioButtonPrecioXTonelada = {
      items: ['No', 'Si'],
      value: 'Precio por tonelada',
      layout: 'horizontal',
      onValueChanged: (e) => {
        this.bolEsPrecioTonelada = e.value === 'Si' ? true : false;
        
      },
    };

    //Configuracion de radiobutton Regreso
    this.RadioButtonRegreso = {
      items: ['Vacio', 'Cargado'],
      value: 'Vacio',
      layout: 'horizontal',
      onValueChanged: (e) => {
        this.bolEsViajeVacio = e.value === 'Vacio' ? true : false;
      },
    };
    //Configuracion de radiobutton Cliente Paga Casetas
    this.RadioButtonClientePagaCasetas = {
      items: ['No', 'Si'],
      value: 'No',
      layout: 'horizontal',
      onValueChanged: (e) => {
      },
    };

    //Actualizar
    this.buttonOptionsActualizar = {
      type: 'normal',
      text: 'Actualizar',

      onClick() {

      },
    };

    //Aprovar
    this.buttonOptionsAprobar = {
      type: 'normal',
      text: 'Aprobar',

      onClick(e: any) {

      },
    };

    //Cerrar
    this.buttonOptionsCerar = {
      type: 'normal',
      text: 'Cerrar',
      icon: 'exit',
      onClick(e: any) {
        that.modConfimation = false;
      },
    };

    //Refresh clientes
    this.refreshClientesOptions = {
      icon: 'refresh',
      type: 'normal',
      stylingMode: 'outlined',
      hint: 'Actualizar lista de clientes',
      onClick() { that.getClientes(true); }
    };

  }

  ngOnInit(): void {
    this.getCotizaciones();
    this.getPreCotizaciones();
    this.getUnidadesNegocio();
    this.getClientes();
    this.getEjesCaseta();
  }

  // //#region :::: GETTERS ::::
  getCotizaciones() {
    this.arrCotizaciones = [];
    this.cotizadorService.getCotizaciones().subscribe(res => {
      this.arrCotizaciones = res.data;
    });
  }

  
  tarifaFinal: number;
  getPreCotizaciones() {
    this.arrPreCotizaciones = [];
    this.cotizadorService.getPreCotizaciones().subscribe(res => {
      this.arrPreCotizaciones = res.data;
        var mydata = res.data;
        for(var i = 0; i<mydata.length; i++){

          this.tarifaFinal = mydata[i].tarifaFinal;
        }
        
      });
  }

  getUnidadesNegocio() {
    this.arrUnidadesNegocio = [];
    this.renContService.getUnidadesNegocio().subscribe(res => {
      this.arrUnidadesNegocio = res.data;
    });
  }

  getTiposOperacion(idUdN: number) {
    this.arrTipoOperacion = [];
    this.cotizadorService.getTiposOperacion(idUdN).subscribe(res => {
      this.arrTipoOperacion = res.data;
    });
  }

  getEjesCaseta() {
    this.catService.getEjesCaseta().subscribe(ejes => {
      this.arrEjes = [
        { valor: null, texto: 'Sin definir' },
        ...ejes.map(e => ({ valor: e.id, texto: e.descripcion || `${e.id} ejes` }))
      ];
    });
  }

  getClientes(mostrarNotificacion = false) {
    this.refreshClientesOptions = { ...this.refreshClientesOptions, disabled: true, icon: 'clock' };
    this.carteraClientesService.getClientesDisplay().subscribe({
      next: (res) => {
        const lista = res.data || res || [];
        this.arrClientes = lista.sort((a: any, b: any) =>
          (a.cliente || '').localeCompare(b.cliente || '', 'es', { sensitivity: 'base' })
        );
        // Construir índice lowercase una sola vez para búsqueda O(n) sin conversiones repetidas
        this._clientesIndex = this.arrClientes.map(item => ({
          lower: (item.cliente || '').toLowerCase(),
          item
        }));
        this.buildClientesDataSource();
        this.refreshClientesOptions = { ...this.refreshClientesOptions, disabled: false, icon: 'refresh' };
        if (mostrarNotificacion) notify('Lista de clientes actualizada', 'success', 2000);
      },
      error: () => {
        this.refreshClientesOptions = { ...this.refreshClientesOptions, disabled: false, icon: 'refresh' };
        if (mostrarNotificacion) notify('Error al actualizar la lista de clientes', 'error', 3000);
      }
    });
  }

  buildClientesDataSource() {
    const self = this;
    const PAGE_SIZE = 50;

    this.clientesDataSource = new DataSource({
      store: new CustomStore({
        key: 'cliente',
        load: (options: any) => {
          const term = (options.searchValue || '').toLowerCase().trim();
          // Solo mostrar clientes con idCliente > 0 (filtro front-end)
          const idx = self._clientesIndex.filter(e => (e.item.idCliente ?? 0) > 0);
          let filtered: any[];

          if (!term) {
            // Sin búsqueda: pasar todos los items (paginados por DevExtreme)
            filtered = idx.map(e => e.item);
          } else {
            // Búsqueda con índice pre-construido: una sola conversión a minúsculas por término
            filtered = [];
            for (let i = 0; i < idx.length; i++) {
              if (idx[i].lower.includes(term)) filtered.push(idx[i].item);
            }
          }

          const skip = options.skip || 0;
          const take = Math.min(options.take || PAGE_SIZE, PAGE_SIZE);
          return Promise.resolve({
            data: filtered.slice(skip, skip + take),
            totalCount: filtered.length
          });
        },
        // Requerido para que acceptCustomValue pueda resolver el valor seleccionado
        byKey: (key: string) => {
          const found = self.arrClientes.find(c => c.cliente === key);
          return Promise.resolve(found ?? { cliente: key });
        }
      }),
      paginate: true,
      pageSize: PAGE_SIZE
    });
  }

  cliente_onCustomItemCreating(args: any) {
    // Custom item siempre tiene idCliente: null (texto libre, sin catálogo)
    const nuevoCliente = { idCliente: null, cliente: args.text };
    this.arrClientes.push(nuevoCliente);
    this._clientesIndex.push({ lower: args.text.toLowerCase(), item: nuevoCliente });
    args.customItem = nuevoCliente;
  }

  cliente_onSelectionChanged(e: any): void {
    // Captura idCliente del catálogo, o null si es texto libre o se limpia
    this.itemCotizacion.idCliente = e.selectedItem?.idCliente ?? null;
  }

  clienteItemTemplate(item: any): string {
    if (!item) return '';
    const id = item.idCliente > 0 ? item.idCliente : '—';
    return `<span>${id} &middot; ${item.cliente || ''}</span>`;
  }

  // ── Ruta ─────────────────────────────────────────────────────────────────

  buildRutaDataSource(): void {
    const svc = this.catService;
    const self = this;
    this.rutaDataSource = new DataSource({
      store: new CustomStore({
        key: 'idRuta',
        load: (opts: any) => {
          const sv = opts.searchValue || '';
          const idTipo = self.itemCotizacion?.id_tipo_operacion || undefined;
          return svc.searchRutas(sv, idTipo).toPromise()
            .then((r: RutaCatalogoDTO[]) => { self.ultimasRutas = r ?? []; return r; });
        },
        byKey: (key: any): Promise<RutaCatalogoDTO | null> => {
          // Valor nulo (campo vacío o ruta manual sin id)
          if (key === null || key === undefined || key === '') {
            return Promise.resolve(null);
          }
          // DevExtreme pasó el objeto completo (ya resuelto)
          if (typeof key === 'object') {
            return Promise.resolve(key as RutaCatalogoDTO);
          }
          // id numérico: cache de la última búsqueda antes de ir al servidor
          const enCache = self.ultimasRutas.find(r => r.idRuta === key);
          if (enCache) return Promise.resolve(enCache);
          return svc.getRutaById(key as number).toPromise() as Promise<RutaCatalogoDTO | null>;
        }
      }),
      searchExpr: 'descRuta',
      paginate: false
    });
  }

  ruta_onSelectionChanged(e: any): void {
    const item: RutaCatalogoDTO | null = e.selectedItem;
    if (!item) return; // null/clear is handled in ruta_onValueChanged
    this.selectedRuta = item;
    // descRuta del catálogo, o el texto escrito si la ruta no existe
    this.itemCotizacion.ruta = item.descRuta || undefined;
    if (item.idRuta) {
      this.itemCotizacion.idRuta    = item.idRuta;
      this.itemCotizacion.idOrigen  = item.idOrigen;
      this.itemCotizacion.origen    = item.origen || '';
      this.itemCotizacion.idDestino = item.idDestino;
      this.itemCotizacion.destino   = item.destino || '';
      // Los kms se llenan en ruta_onValueChanged (solo por acción del usuario)
      this.mostrarAvisoRuta = false;
      this._actualizarReadOnly(item.idOrigen != null, item.idDestino != null);
    } else {
      // Ruta manual (texto libre): idRuta = null
      this.itemCotizacion.idRuta    = undefined;
      this.itemCotizacion.idOrigen  = undefined;
      this.itemCotizacion.idDestino = undefined;
      this.mostrarAvisoRuta = true;
      this._actualizarReadOnly(false, false);
    }
  }

  ruta_onCustomItemCreating(args: any): void {
    const custom: RutaCatalogoDTO = {
      idRuta: null, descRuta: args.text,
      idOrigen: null, origen: '', idDestino: null, destino: '',
      kmsRuta: 0, kmsSct: 0, idTipoOperacion: null
    };
    this.selectedRuta = custom;
    args.customItem = custom;
  }

  ruta_onValueChanged(e: any): void {
    if (e.event == null) return; // ignorar cambios programáticos (modo edición)
    this.casetasSub?.unsubscribe();
    this.setCasetasRuta(null);
    // Ruta del catálogo → kms y casetas automáticos; ruta manual → quedan manuales
    if (e.value?.idRuta) {
      const cambioDeRuta = e.previousValue?.idRuta != null && e.previousValue.idRuta !== e.value.idRuta;
      this.llenarKmsRuta(e.value.kmsRuta, cambioDeRuta);
      this.calcularCasetas('ruta', e.value.idRuta);
    }
    if (e.value == null) {
      this.selectedRuta = null;
      this.itemCotizacion.idRuta    = undefined;
      this.itemCotizacion.ruta      = undefined;
      this.itemCotizacion.idOrigen  = undefined;
      this.itemCotizacion.origen    = undefined;
      this.itemCotizacion.idDestino = undefined;
      this.itemCotizacion.destino   = undefined;
      this.mostrarAvisoRuta = false;
      this._actualizarReadOnly(false, false);
    }
  }

  /**
   * Llena kms_ida (y kms_regreso si el viaje es Redondo) con los kms de la ruta.
   * Solo pisa capturas manuales (kms ≠ 0) si se eligió otra ruta; en ese caso avisa.
   */
  private llenarKmsRuta(kmsRuta: number | null | undefined, cambioDeRuta: boolean): void {
    const kms = kmsRuta ?? 0;
    if (!kms) return;
    const campos = this.itemCotizacion.tipoViaje === 'Redondo' ? ['kms_ida', 'kms_regreso'] : ['kms_ida'];
    let reemplazados = false;
    for (const campo of campos) {
      const actual = this.itemCotizacion[campo];
      if (!actual || cambioDeRuta) {
        if (actual && actual !== kms) reemplazados = true;
        this.asignarCampoForm(campo, kms);
      }
    }
    if (reemplazados) notify('Kilómetros actualizados según la ruta', 'info', 3000);
  }

  /**
   * Al pasar a Redondo: kms_regreso = kms de la ruta, solo si está en 0.
   * Usa la ruta seleccionada; si no corresponde al idRuta del modelo, la consulta.
   */
  private llenarKmsRegresoRedondo(idRuta: number): void {
    const aplicar = (kmsRuta: number | null | undefined) => {
      const previo = this.itemCotizacion.kms_regreso;
      const kms = kmsRuta ?? 0;
      if (!previo && kms) this.asignarCampoForm('kms_regreso', kms);
    };
    if (this.selectedRuta?.idRuta === idRuta) {
      aplicar(this.selectedRuta.kmsRuta);
    } else {
      this.catService.getRutaById(idRuta).subscribe(r => aplicar(r?.kmsRuta));
    }
  }

  /** Asigna un campo en el modelo y en su editor del dx-form, para que se vea de inmediato. */
  private asignarCampoForm(dataField: string, valor: any): void {
    this.itemCotizacion[dataField] = valor;
    this.cotizadorFormRef?.instance?.getEditor(dataField)?.option('value', valor);
  }

  /**
   * Actualiza readOnly de Origen y Destino.
   * Dual: asigna objeto nuevo (para binding Angular) Y llama getEditor()
   * (para garantizar actualización inmediata si el form ya existe).
   */
  private _actualizarReadOnly(origenRO: boolean, destinoRO: boolean): void {
    this.origenOptions  = { readOnly: origenRO };
    this.destinoOptions = { readOnly: destinoRO };
    const inst = this.cotizadorFormRef?.instance;
    if (inst) {
      inst.getEditor('origen')?.option('readOnly', origenRO);
      inst.getEditor('destino')?.option('readOnly', destinoRO);
    }
  }

  getRentabilidad(operacion: string) {
    // console.log(this.itemCotizacion.id_area+"   "+operacion)

    this.cotizadorService.getRentabilidad(this.itemCotizacion.id_area, operacion).subscribe(res => {
      
      this.itemCotizacion.rend_cargado = res.data.rend_cargado;
      this.itemCotizacion.rend_vacio = res.data.rend_vacio;
    });
    

  }

  
  // Resuelve el nombre correcto del tipo de operación desde la lista del área.
  // El back puede devolver un nombre abreviado en tipoOperacion; clasificacion
  // siempre tiene el nombre exacto con el que se guardó.
  private _resolverTipoOperacion(
    ops: TiposOperacionModel[],
    idTipo: number,
    clasificacion: string | undefined,
    tipoOperacion: string | undefined
  ): { finalOps: TiposOperacionModel[], resolvedValue: string } {
    if (!ops.length) return { finalOps: ops, resolvedValue: tipoOperacion ?? '' };

    const ref = (clasificacion ?? tipoOperacion ?? '').trim().toLowerCase();
    const idNum = idTipo;

    // a) coincidencia por id Y nombre
    let match = ops.find(o => o.idTipoOperacion === idNum && o.operacion.trim().toLowerCase() === ref);
    // b) solo nombre
    if (!match) match = ops.find(o => o.operacion.trim().toLowerCase() === ref);
    // c) solo id (primer elemento)
    if (!match) match = ops.find(o => o.idTipoOperacion === idNum);

    if (match) return { finalOps: ops, resolvedValue: match.operacion };

    // d) opción temporal para no dejar el combo vacío
    const nombre = (clasificacion ?? tipoOperacion ?? '').trim();
    const temp: TiposOperacionModel = { idTipoOperacion: idNum, operacion: nombre };
    return { finalOps: [...ops, temp], resolvedValue: nombre };
  }

  //#endregion :::: FIN GETTERS ::::

  //#endregion :::: EVENTOS :::::
  dieselValueChanged(e: any) {
    this.itemCotizacion.diesel_sin_impuestos = e.value === 0 ? 0 : +(((this.itemCotizacion.diesel-0.490817)/1.16) + 0.490817).toFixed(2);
  }
 
  
  caseta_ida_ValueChanged(e: any) {
    if (e.event != null) this.casetasEditadasManual = true;
    this.itemCotizacion.casetas_si = e.value === 0 ? 0 : +((this.itemCotizacion.casetas)/1.16).toFixed(2);
  }

  caseta_regreso_ValueChanged(e: any) {
    if (e.event != null) this.casetasEditadasManual = true;
    this.itemCotizacion.casetas_regreso_si = e.value === 0 ? 0 : +((this.itemCotizacion.casetas_regreso)/1.16).toFixed(2);


   }

  numEjes_ValueChanged(e: any) {
    if (e.event == null) return; // ignorar cambios programáticos (modo edición)
    this.calcularCasetas('ejes');
  }

  /**
   * Llena casetas con impuestos desde el catálogo de la ruta y el número de ejes.
   * Solo se llama por acción del usuario; en ruta manual (sin idRuta) no hace nada.
   * - 'ruta' / 'ejes': llena ida, y regreso si el viaje es Redondo; avisa si
   *   el usuario había editado las casetas a mano.
   * - 'regreso': al pasar a Redondo, llena solo el regreso.
   */
  private calcularCasetas(motivo: 'ruta' | 'ejes' | 'regreso', idRuta = this.itemCotizacion.idRuta): void {
    if (!idRuta) return;
    const ejes = this.itemCotizacion.numEjes ?? null;
    this.casetasSub?.unsubscribe();
    this.setCasetasRuta(null);
    this.casetasSub = this.catService.getCasetasRuta(idRuta, ejes).subscribe({
      next: res => {
        this.setCasetasRuta(res, idRuta, ejes);
        const total = +(res?.total ?? 0);
        const redondo = this.itemCotizacion.tipoViaje === 'Redondo';
        if (motivo !== 'regreso') {
          this.itemCotizacion.casetas = total;
          this.caseta_ida_ValueChanged({ value: total });
        }
        if (redondo) {
          this.itemCotizacion.casetas_regreso = total;
          this.caseta_regreso_ValueChanged({ value: total });
        }
        if (motivo !== 'regreso' && this.casetasEditadasManual) {
          notify('Casetas recalculadas según la ruta y número de ejes.', 'info', 3000);
        }
        if (motivo !== 'regreso') this.casetasEditadasManual = false;
      },
      error: () => notify('No se pudieron obtener las casetas de la ruta', 'error', 3000)
    });
  }

  verCasetasClick(): void {
    const idRuta = this.itemCotizacion.idRuta;
    if (!idRuta) return;
    const ejes = this.itemCotizacion.numEjes ?? null;
    // Detalle informativo: no modifica los montos capturados
    const key = this.casetasRutaKey;
    if (this.casetasRuta && key?.idRuta === idRuta && key.ejes === ejes) {
      this.bolModalCasetas = true;
      return;
    }
    this.catService.getCasetasRuta(idRuta, ejes).subscribe({
      next: res => { this.setCasetasRuta(res, idRuta, ejes); this.bolModalCasetas = true; },
      error: () => notify('No se pudieron obtener las casetas de la ruta', 'error', 3000)
    });
  }

  private setCasetasRuta(res: CasetasRutaDTO | null, idRuta?: number, ejes: number | null = null): void {
    this.casetasRuta = res;
    this.casetasRutaKey = res && idRuta ? { idRuta, ejes } : null;
  }

  /** Total del popup: el que calcula el back, no la suma de la columna. */
  casetasTotal_customizeText = (): string =>
    'Total: $ ' + (this.casetasRuta?.total ?? 0).toLocaleString('es-MX', { maximumFractionDigits: 2 });

  /** Marca en el popup las casetas sin tarifa para los ejes pedidos. */
  casetaDetalle_onRowPrepared(e: any): void {
    if (e.rowType === 'data' && e.data?.criterio === this.criterioSinTarifa) {
      e.rowElement.style.backgroundColor = '#fff8e1';
      e.rowElement.style.color = '#e65100';
    }
  }
  toneladasTotalValueChanged(e: any) {
        if(this.itemCotizacion.costoViaje >0  && this.itemCotizacion.toneladas> 0)
        {
          if(this.itemCotizacion.tarifaFinal > 0)
          {
            this.itemCotizacion.costo_tonelada = this.itemCotizacion.tarifaFinal /
            e.value;
          }
          else
          {
          this.itemCotizacion.costo_tonelada = this.itemCotizacion.costoViaje /
            e.value;
          }
        }
        else
        {
          this.itemCotizacion.costo_tonelada = 0;
        }
   
  }

  precioToneladasTotalValueChanged(e: any) {
    
    if(this.itemCotizacion.costo_tonelada > 0)
    {
      if(this.itemCotizacion.toneladas > 0)
      {
        var costo = this.itemCotizacion.toneladas * this.itemCotizacion.costo_tonelada;
        if(costo >= this.itemCotizacion.costoViaje)
        {
          this.itemCotizacion.tarifaFinal = costo;
        }
        else
        {
          this.itemCotizacion.costo_tonelada = 0;
        }
      }
    }
  }

  unidadNegocio_ValueChanged(e: any) {
    if (e.event == null) return;
    if (e.value > 0) {
      this.itemCotizacion.tipoOperacion = '';
      this.getTiposOperacion(e.value);
    } else {
      this.arrTipoOperacion = null;
      this.itemCotizacion.tipoOperacion = '';
    }
  }

  tipoOperacion_ValueChanged(e: any) {
  
    if(e.value != undefined || e.value != null){ 
     
   this.getRentabilidad(e.value);
  }
  }



precioTotalValueChanged(e: any) {
    
  if(this.itemCotizacion.tarifaFinal > 0)
  {
    if(this.itemCotizacion.toneladas> 0)
    {
      if(this.itemCotizacion.tarifaFinal > this.itemCotizacion.costoViaje)
      {
        this.itemCotizacion.costo_tonelada = this.itemCotizacion.tarifaFinal / this.itemCotizacion.toneladas;
      }
      else
      {
        this.itemCotizacion.tarifaFinal = 0;
      }
    }
    else
    {
      if(this.itemCotizacion.tarifaFinal < this.itemCotizacion.costoViaje)
      {
        this.itemCotizacion.tarifaFinal = 0;
      }
    }
  }
}


  mouseoverAprobarCotizacion(e: any) {
    //TODO: Validar que sea tamien el gerente
    this.bolBotonAprobarCotizacion = e.value === 'PRECOTIZACION';

  }
  aprobarCotizacionClick(e: any) {
    const clonedItem = { ...e.row.data };
    let result = confirm("<i>Esta seguro de aprobar la cotización: <b>" +
      clonedItem.folio + "</b></i>", "Confirmar Operación");
    result.then((dialogResult) => {
      if (dialogResult) {
        //TODO: Implementar endpoint para aprobar cotizacion
        this.cotizadorService.postAprobarCotizacion(clonedItem.idCotizacion).subscribe(res =>{
          if (res.responseCode === 200) {
            //agregamos precotizacion a las aprobadas
            const elementIndex = this.arrPreCotizaciones.findIndex(obj=> obj.idCotizacion == clonedItem.idCotizacion);
            this.arrPreCotizaciones[elementIndex].status = "APROBADA";
            this.arrCotizaciones.push(this.arrPreCotizaciones[elementIndex]);

            //Quitamos la aprobada de las precotizaciones
            this.arrPreCotizaciones = this.arrPreCotizaciones.filter(e => e.idCotizacion !== clonedItem.idCotizacion);

            notify({
              message: 'Cotización aprobada con exito!',
              position: {
                my: 'center center',
                at: 'center center',
              },
            }, 'success', 3000);
          } else {
            notify({
              message: res.responseText,
              position: {
                my: 'center center',
                at: 'center center',
              },
            }, 'error', 5000);
          }
        });
      }
    });
  }

  /** Modelo a enviar al guardar; numEjes vive solo en el front (aún no se envía). */
  private payloadGuardado(): any {
    const { numEjes, ...payload } = this.itemCotizacion;
    return payload;
  }

  guardarCotizacionClick(e: any) {
    console.log(e)
    e.preventDefault();
    switch (this.tipoRegistro) {
      case 'nuevo':

        this.itemCotizacion.sencillo = this.itemCotizacion.tipoViaje === "Solo de ida" ? true : false;
        this.itemCotizacion.regresa_vacio = this.itemCotizacion.regreso === "Vacio" ? true : false;
        this.itemCotizacion.clienta_paga = this.itemCotizacion.clientePagaCasetas === "Si" ? true : false;
        this.itemCotizacion.idCotizacion = 0;
        this.itemCotizacion.id_ingreso = sessionStorage.getItem("idUsuario");

        this.cotizadorService.postNuevaCotizacion(this.payloadGuardado()).subscribe(res => {
          if (res.responseCode === 200) {
            this.itemCotizacion = res.data;
            this.getPreCotizaciones();
            notify({
              message: 'Cotización guardada con exito!',
              position: {
                my: 'center center',
                at: 'center center',
              },
            }, 'success', 3000);
          } else {
            notify({
              
              message: res.responseText,
              position: {
                my: 'center center',
                at: 'center center',
              },
            }, 'error', 3000);
          }


        });
        break;
      case 'editar':
        this.itemCotizacion.sencillo = this.itemCotizacion.tipoViaje === "Solo de ida" ? true : false;
        this.itemCotizacion.regresa_vacio = this.itemCotizacion.regreso === "Vacio" ? true : false;
        this.itemCotizacion.clienta_paga = this.itemCotizacion.clientePagaCasetas === "Si" ? true : false;
        
        this.cotizadorService.postEditarCotizacion(this.payloadGuardado()).subscribe(res => {
          if (res.responseCode === 200) {
            this.itemCotizacion = res.data;
            // console.log(this.itemCotizacion)
            this.getPreCotizaciones();
            this.tipoOperacion_ValueChanged = this.tipoOperacion_ValueChanged.bind(this);
            console.log("SE EDITO CORRECTAMENTE")
            notify({
              message: 'Cotización guardada con exito!',
              position: {
                my: 'center center',
                at: 'center center',
              },
            }, 'success', 3000);
          } else {
            console.log("ALGO PASO !!!!!!!!")
            notify({
              message: res.responseText,
              position: {
                my: 'center center',
                at: 'center center',
              },
            }, 'error', 3000);
          }
        });
        break;
      default:
        break;
    }
    this.limpiarForm();
    this.bolModal = false;
    this.bolFormSoloLectura = false;
  }

  editarCotizacionClick(e: any) {
    this.bolFormSoloLectura = false;
    e.event.preventDefault();
    this.tipoRegistro = "editar";
    this.bolModal = true;
    this.activeTab = 0;
    this.selectedRuta = null;
    this.mostrarAvisoRuta = false;
    this._actualizarReadOnly(false, false);
    this.resetCasetasRuta();
    this.cotizadorService.getCotizacion(e.row.data.idCotizacion).pipe(
      switchMap(res => {
        const datos = res.data;
        if (datos.id_area) {
          return this.cotizadorService.getTiposOperacion(datos.id_area).pipe(
            map(r => ({ datos, ops: (r.data ?? []) as TiposOperacionModel[] }))
          );
        }
        return of({ datos, ops: [] as TiposOperacionModel[] });
      })
    ).subscribe(({ datos, ops }) => {
      const { finalOps, resolvedValue } = this._resolverTipoOperacion(
        ops, datos.id_tipo_operacion, datos.clasificacion, datos.tipoOperacion
      );
      this.arrTipoOperacion = finalOps;
      this.itemCotizacion = datos;
      this.itemCotizacion.tipoOperacion = resolvedValue;
      this.tituloModal = "Editando Cotizacion Folio: " + this.itemCotizacion.folio;
      this.sololectura = "no";
      // Recuperar idCliente para cotizaciones anteriores que solo tienen texto
      if (this.itemCotizacion.cliente && !this.itemCotizacion.idCliente) {
        const found = this.arrClientes.find(c => c.cliente === this.itemCotizacion.cliente);
        if (found && (found.idCliente ?? 0) > 0) {
          this.itemCotizacion.idCliente = found.idCliente;
        }
      }
      // Recuperar ruta del catálogo si el modelo la trae
      if (this.itemCotizacion.idRuta) {
        this.catService.getRutaById(this.itemCotizacion.idRuta).subscribe(ruta => {
          if (ruta) {
            this.selectedRuta = ruta;
            this._actualizarReadOnly(ruta.idOrigen != null, ruta.idDestino != null);
          }
        });
      } else if (this.itemCotizacion.ruta) {
        // Ruta escrita a mano: mostrar el texto guardado en el combo
        this.selectedRuta = {
          idRuta: null, descRuta: this.itemCotizacion.ruta,
          idOrigen: null, origen: '', idDestino: null, destino: '',
          kmsRuta: 0, kmsSct: 0, idTipoOperacion: null
        };
        this.mostrarAvisoRuta = true;
        this._actualizarReadOnly(false, false);
      } else {
        this.selectedRuta = null;
        this.mostrarAvisoRuta = false;
        this._actualizarReadOnly(false, false);
      }
      // dx-form no propaga editorOptions.items al editor ya creado;
      // se actualiza directamente después del ciclo de detección de cambios
      setTimeout(() => {
        const ed = this.cotizadorFormRef?.instance?.getEditor('tipoOperacion');
        if (ed) {
          ed.option('items', finalOps);
          ed.option('value', resolvedValue);
        }
      }, 0);
    });
  }

  onSelectionChanged(_e: any) {
    this.arrCotizacionesSelect = this.rentGer.instance.getSelectedRowsData();
  }

  obtenerReporte() {
    this.pdfReport.obtenerReporte(this.arrCotizacionesSelect);
  }

  verCortizacionClick(e: any) {
    e.event.preventDefault();
    this.bolFormSoloLectura = true;
    this.bolModal = true;
    this.activeTab = 0;
    this.selectedRuta = null;
    this.resetCasetasRuta();
    this.sololectura = "si";
    this.cotizadorService.getCotizacion(e.row.data.idCotizacion).pipe(
      switchMap(res => {
        const datos = res.data;
        if (datos.id_area) {
          return this.cotizadorService.getTiposOperacion(datos.id_area).pipe(
            map(r => ({ datos, ops: (r.data ?? []) as TiposOperacionModel[] }))
          );
        }
        return of({ datos, ops: [] as TiposOperacionModel[] });
      })
    ).subscribe(({ datos, ops }) => {
      const { finalOps, resolvedValue } = this._resolverTipoOperacion(
        ops, datos.id_tipo_operacion, datos.clasificacion, datos.tipoOperacion
      );
      this.arrTipoOperacion = finalOps;
      this.itemCotizacion = datos;
      this.itemCotizacion.tipoOperacion = resolvedValue;
      this.tituloModal = "Cotizacion Folio: " + this.itemCotizacion.folio + " (Solo Lectura)";
      setTimeout(() => {
        const ed = this.cotizadorFormRef?.instance?.getEditor('tipoOperacion');
        if (ed) {
          ed.option('items', finalOps);
          ed.option('value', resolvedValue);
        }
      }, 0);
    });
  }

  imprimirCortizacionClick(e: any) {
    const clonedItem = { ...e.row.data };
    this.itemCotizacion = clonedItem;
    this.tituloModal = "Cotizacion Folio: " + this.itemCotizacion.folio + " (Solo Lectura)";
    this.pdfReport.obtenerReporte([this.itemCotizacion]);
  }

  nuevaCotizacionClick() {
    this.bolFormSoloLectura = false;
    this.tituloModal = 'Nueva Cotización';
    this.tipoRegistro = 'nuevo';
    this.limpiarForm();
    this.asignarFolio();
    this.bolModal = true;
     this.sololectura = "no";
  }

  eliminarCotizcionClick(e: any) {
    const clonedItem = { ...e.row.data };
    let result = confirm("<i>Esta seguro de eliminar cotización: " +
      clonedItem.folio + "</i>", "Confirmar Operación");
    result.then((dialogResult) => {
      if (dialogResult) {

        this.cotizadorService.postEliminarCotizacion(clonedItem.idCotizacion).subscribe(res =>{
          if (res.responseCode === 200) {
            this.arrPreCotizaciones = this.arrPreCotizaciones.filter(e => e.idCotizacion !== clonedItem.idCotizacion);
            notify({
              message: 'Cotización eliminada con exito!',
              position: {
                my: 'center center',
                at: 'center center',
              },
            }, 'success', 3000);
          } else {
            notify({
              message: res.responseText,
              position: {
                my: 'center center',
                at: 'center center',
              },
            }, 'error', 3000);
          }
        });
      }
    });
  }

  limpiarForm() {
    this.bolFormSoloLectura = false;
    this.activeTab = 0;
    this.selectedRuta = null;
    this.mostrarAvisoRuta = false;
    this.arrTipoOperacion = [];
    this._actualizarReadOnly(false, false);
    this.resetCasetasRuta();
    //this.itemCotizacion = {};
    this.itemCotizacion = {
      idCotizacion: undefined,
      folio: 0,
      sencillo:true,
      tipoViaje: "Solo de ida",
      regresa_vacio: false,
      regreso:"Vacio",
      id_ingreso: "0",
      id_area: undefined,
      unidadNegocio: "",
      id_tipo_operacion: 0,
      tipoOperacion: "",
      clasificacion: "",
      cliente: undefined,
      origen: undefined,
      destino: undefined,
      kms_ida: 0,
      kms_regreso:0,
      kms_totales: 0,
      casetas: 0,
      casetas_si: 0,
      casetas_regreso:0,
      casetas_regreso_si: 0,
      casetas_total_sin_impuestos:0,
      diesel:0,
      diesel_sin_impuestos: 0,
      diesel_total_sin_impuestos:0,
      num_estancias_ida: 0,
      num_maniobras_ida: 0,
      ton_carga_ida:0,
      num_estancias_regreso:0,
      num_maniobras_regreso:0,
      ton_carga_regreso:0,
      clienta_paga: false,
      clientePagaCasetas:"No",
      tarifaFinal:0,
      costoViaje:0,
      toneladas:0,
      costo_tonelada:0,
      costoPorKm:0,
      ingresoPorKm:0,
      rend_cargado:0,
      rend_vacio:0,
      // Datos para convenio
      idCliente: undefined,
      idRemitente: undefined,
      idDestinatario: undefined,
      idOrigen: undefined,
      idDestino: undefined,
      idRuta: undefined,
      ruta: undefined,
      numEjes: null,
      idTipoMoneda: undefined,
      tipoServ: undefined,
      tipoCobro: undefined,
      tipoCobroManual: false,
      tarifaUnitaria: undefined,
      idContrato: undefined,
      idTipoExportacion: undefined,
      regimenes: [],
      toleranciaLlegada: 0,
      descConvenio: undefined,
      observaciones: undefined,
      productos: []
    };
  }

  private resetCasetasRuta(): void {
    this.casetasSub?.unsubscribe();
    this.casetasSub = null;
    this.setCasetasRuta(null);
    this.casetasEditadasManual = false;
    this.bolModalCasetas = false;
  }

  asignarFolio() {
    
      this.itemCotizacion.folio = 1 ;
  }
  //#endregion :::: FIN EVENTOS ::::


  onRowPrepared(e){
  }
  onContentReady(e){
  }
  onCellPrepared(e){
  }

  itemCotizacionT25: CotizacionModel = {
    idCotizacion: undefined,
    folio: 0,
    sencillo:true,
    tipoViaje: "Solo de ida",
    regresa_vacio: false,
    regreso:"Vacio",
    id_ingreso: "0",
    id_area: undefined,
    unidadNegocio: "",
    id_tipo_operacion: 0,
    tipoOperacion: "",
    clasificacion: "",
    cliente: undefined,
    origen: undefined,
    destino: undefined,
    kms_ida: 0,
    kms_regreso:0,
    kms_totales: 0,
    casetas: 0,
    casetas_si: 0,
    casetas_regreso:0,
    casetas_regreso_si:0,
    casetas_total_sin_impuestos:0,
    diesel:0,
    diesel_sin_impuestos: 0,
    diesel_total_sin_impuestos:0,
    num_estancias_ida: 0,
    num_maniobras_ida: 0,
    ton_carga_ida:0,
    num_estancias_regreso:0,
    num_maniobras_regreso:0,
    ton_carga_regreso:0,
    clienta_paga: false,
    clientePagaCasetas:"No",
    tarifaFinal:0,
    costoViaje:0,
    toneladas:0,
    costo_tonelada:0,
    costoPorKm:0,
    ingresoPorKm:0,
    rend_cargado:0,
    rend_vacio:0
    
  };

  limpiarFormT25() {
    this.bolFormSoloLectura = false;
    //this.itemCotizacion = {};
    this.itemCotizacion = {
      idCotizacion: undefined,
      folio: 0,
      sencillo:true,
      tipoViaje: "Solo de ida",
      regresa_vacio: false,
      regreso:"Vacio",
      id_ingreso: "0",
      id_area: undefined,
      unidadNegocio: "",
      id_tipo_operacion: 0,
      tipoOperacion: "",
      clasificacion: "",
      cliente: undefined,
      origen: undefined,
      destino: undefined,
      kms_ida: 0,
      kms_regreso:0,
      kms_totales: 0,
      casetas: 0,
      casetas_si: 0,
      casetas_regreso:0,
      casetas_regreso_si: 0,
      casetas_total_sin_impuestos:0,
      diesel:0,
      diesel_sin_impuestos: 0,
      diesel_total_sin_impuestos:0,
      num_estancias_ida: 0,
      num_maniobras_ida: 0,
      ton_carga_ida:0,
      num_estancias_regreso:0,
      num_maniobras_regreso:0,
      ton_carga_regreso:0,
      clienta_paga: false,
      clientePagaCasetas:"No",
      tarifaFinal:0,
      costoViaje:0,
      toneladas:0,
      costo_tonelada:0,
      costoPorKm:0,
      ingresoPorKm:0,
      rend_cargado:0,
      rend_vacio:0
    };
  }

  T25: number;
  tipoOperacion: string;
  casetaSImp: number;
  casetasRegreso: number;
  mode: boolean = false;
  // dataCotizacion: any;
  tarifa25(data){
    // this.dataCotizacion = data.data;
    // this.modConfimation = true;

    this.T25 = data.data.tarifa25;
    this.tipoOperacion = data.data.tipoOperacion;
    this.casetaSImp = data.data.casetas_total_sin_impuestos;
    this.casetasRegreso = data.data.casetas_regreso;

    this.cotizadorService.getCotizacion(data.data.idCotizacion).subscribe(res => {
      this.itemCotizacionT25 = res.data;
    });
    
    
    const formatValue = Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(data.data.tarifa25);
    const clonedItem = { ...data.data };
    let result = confirm("<i>La tarifa final sera <b>"+formatValue+"</b></i><br>"+
                        "<i>Esta seguro de aprobar la cotización: <b>" +
      clonedItem.folio + "</b></i>", "Confirmar Operación");
    result.then((dialogResult) => {


        if (dialogResult) {
          //TODO: Implementar endpoint para aprobar cotizacion
          this.guardarCotizacionT25()

          // if(this.tarifaFinal == 0){

          // }

          if(this.itemCotizacionT25.tarifaFinal !== 0){
            // alert("entre")
            this.cotizadorService.postAprobarCotizacion(clonedItem.idCotizacion).subscribe(res =>{
              if (res.responseCode === 200) {
                //agregamos precotizacion a las aprobadas

                const elementIndex = this.arrPreCotizaciones.findIndex(obj=> obj.idCotizacion == clonedItem.idCotizacion);
                this.arrPreCotizaciones[elementIndex].status = "APROBADA";
                
                this.arrCotizaciones.push(this.arrPreCotizaciones[elementIndex]);

                //Quitamos la aprobada de las precotizaciones
                this.arrPreCotizaciones = this.arrPreCotizaciones.filter(e => e.idCotizacion !== clonedItem.idCotizacion);
                

                notify({
                  message: 'Cotización aprobada con exito!',
                  position: {
                    my: 'center center',
                    at: 'center center',
                  },
                }, 'success', 3000);

              } else {
                notify({
                  message: res.responseText,
                  position: {
                    my: 'center center',
                    at: 'center center',
                  },
                }, 'error', 5000);
              }
            });

          }
        }
      
    });
  }

  guardarCotizacionT25() {
   
    
          this.itemCotizacionT25.sencillo = this.itemCotizacionT25.tipoViaje === "Solo de ida" ? true : false;
          this.itemCotizacionT25.regresa_vacio = this.itemCotizacionT25.regreso === "Vacio" ? true : false;
          this.itemCotizacionT25.clienta_paga = this.itemCotizacionT25.clientePagaCasetas === "Si" ? true : false;
          this.itemCotizacionT25.tarifaFinal = this.T25;
          this.itemCotizacionT25.tipoOperacion = this.tipoOperacion;
          this.itemCotizacionT25.casetas_total_sin_impuestos = this.casetaSImp;
          this.itemCotizacionT25.casetas_regreso = this.casetasRegreso;
          
          this.cotizadorService.postEditarCotizacion(this.itemCotizacionT25).subscribe(res => {
            if (res.responseCode === 200) {
              this.itemCotizacionT25 = res.data;
              this.getPreCotizaciones();
              if(res.data.tarifaFinal == this.T25){
              this.mode = true;
              }
              notify({
                message: 'Cotización guardada con exito!',
                position: {
                  my: 'center center',
                  at: 'center center',
                },
              }, 'success', 3000);
            } else {
              notify({
                message: res.responseText,
                position: {
                  my: 'center center',
                  at: 'center center',
                },
              }, 'error', 3000);
            }
          });

          this.limpiarFormT25();
  }

  itemCotizacionT30: CotizacionModel = {
    idCotizacion: undefined,
    folio: 0,
    sencillo:true,
    tipoViaje: "Solo de ida",
    regresa_vacio: false,
    regreso:"Vacio",
    id_ingreso: "0",
    id_area: undefined,
    unidadNegocio: "",
    id_tipo_operacion: 0,
    tipoOperacion: "",
    clasificacion: "",
    cliente: undefined,
    origen: undefined,
    destino: undefined,
    kms_ida: 0,
    kms_regreso:0,
    kms_totales: 0,
    casetas: 0,
    casetas_si: 0,
    casetas_regreso:0,
    casetas_regreso_si:0,
    casetas_total_sin_impuestos:0,
    diesel:0,
    diesel_sin_impuestos: 0,
    diesel_total_sin_impuestos:0,
    num_estancias_ida: 0,
    num_maniobras_ida: 0,
    ton_carga_ida:0,
    num_estancias_regreso:0,
    num_maniobras_regreso:0,
    ton_carga_regreso:0,
    clienta_paga: false,
    clientePagaCasetas:"No",
    tarifaFinal:0,
    costoViaje:0,
    toneladas:0,
    costo_tonelada:0,
    costoPorKm:0,
    ingresoPorKm:0,
    rend_cargado:0,
    rend_vacio:0
    
  };

  limpiarFormT30() {
    this.bolFormSoloLectura = false;
    //this.itemCotizacion = {};
    this.itemCotizacion = {
      idCotizacion: undefined,
      folio: 0,
      sencillo:true,
      tipoViaje: "Solo de ida",
      regresa_vacio: false,
      regreso:"Vacio",
      id_ingreso: "0",
      id_area: undefined,
      unidadNegocio: "",
      id_tipo_operacion: 0,
      tipoOperacion: "",
      clasificacion: "",
      cliente: undefined,
      origen: undefined,
      destino: undefined,
      kms_ida: 0,
      kms_regreso:0,
      kms_totales: 0,
      casetas: 0,
      casetas_si: 0,
      casetas_regreso:0,
      casetas_regreso_si: 0,
      casetas_total_sin_impuestos:0,
      diesel:0,
      diesel_sin_impuestos: 0,
      diesel_total_sin_impuestos:0,
      num_estancias_ida: 0,
      num_maniobras_ida: 0,
      ton_carga_ida:0,
      num_estancias_regreso:0,
      num_maniobras_regreso:0,
      ton_carga_regreso:0,
      clienta_paga: false,
      clientePagaCasetas:"No",
      tarifaFinal:0,
      costoViaje:0,
      toneladas:0,
      costo_tonelada:0,
      costoPorKm:0,
      ingresoPorKm:0,
      rend_cargado:0,
      rend_vacio:0
    };
  }

  T30: number;
  tipoOperacionT30: string;
  casetaSImpT30: number;
  casetasRegresoT30: number;
  modeT30: boolean = false;
  tarifa30(data){    
    this.T30 = data.data.tarifa30;
    this.tipoOperacionT30 = data.data.tipoOperacion;
    this.casetaSImpT30 = data.data.casetas_total_sin_impuestos;
    this.casetasRegresoT30 = data.data.casetas_regreso;

    this.cotizadorService.getCotizacion(data.data.idCotizacion).subscribe(res => {
      this.itemCotizacionT30 = res.data;
    });

    const formatValue = Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(data.data.tarifa30);
    const clonedItem = { ...data.data };
    let result = confirm("<i>La tarifa final sera <b>"+formatValue+"</b></i><br>"+
                        "<i>Esta seguro de aprobar la cotización: <b>" +
      clonedItem.folio + "</b></i>", "Confirmar Operación");
    result.then((dialogResult) => {


      if (dialogResult) {
        //TODO: Implementar endpoint para aprobar cotizacion
        this.guardarCotizacionT30()

        if(this.itemCotizacionT30.tarifaFinal !== 0){
        this.cotizadorService.postAprobarCotizacion(clonedItem.idCotizacion).subscribe(res =>{
          if (res.responseCode === 200) {
            //agregamos precotizacion a las aprobadas
            const elementIndex = this.arrPreCotizaciones.findIndex(obj=> obj.idCotizacion == clonedItem.idCotizacion);
            this.arrPreCotizaciones[elementIndex].status = "APROBADA";
            this.arrCotizaciones.push(this.arrPreCotizaciones[elementIndex]);

            //Quitamos la aprobada de las precotizaciones
            this.arrPreCotizaciones = this.arrPreCotizaciones.filter(e => e.idCotizacion !== clonedItem.idCotizacion);

            notify({
              message: 'Cotización aprobada con exito!',
              position: {
                my: 'center center',
                at: 'center center',
              },
            }, 'success', 3000);
          } else {
            notify({
              message: res.responseText,
              position: {
                my: 'center center',
                at: 'center center',
              },
            }, 'error', 5000);
          }
        });
      }
    }
    });
  }

  guardarCotizacionT30() {
   
    
    this.itemCotizacionT30.sencillo = this.itemCotizacionT30.tipoViaje === "Solo de ida" ? true : false;
    this.itemCotizacionT30.regresa_vacio = this.itemCotizacionT30.regreso === "Vacio" ? true : false;
    this.itemCotizacionT30.clienta_paga = this.itemCotizacionT30.clientePagaCasetas === "Si" ? true : false;
    this.itemCotizacionT30.tarifaFinal = this.T30;
    this.itemCotizacionT30.tipoOperacion = this.tipoOperacionT30;
    this.itemCotizacionT30.casetas_total_sin_impuestos = this.casetaSImpT30;
    this.itemCotizacionT30.casetas_regreso = this.casetasRegresoT30;
    
    this.cotizadorService.postEditarCotizacion(this.itemCotizacionT30).subscribe(res => {
      if (res.responseCode === 200) {
        this.itemCotizacionT30 = res.data;
        this.getPreCotizaciones();
        if(res.data.tarifaFinal == this.T30){
        this.modeT30 = true;
        }
        notify({
          message: 'Cotización guardada con exito!',
          position: {
            my: 'center center',
            at: 'center center',
          },
        }, 'success', 3000);
      } else {
        notify({
          message: res.responseText,
          position: {
            my: 'center center',
            at: 'center center',
          },
        }, 'error', 3000);
      }
    });

    this.limpiarFormT30();
}

  itemCotizacionT35: CotizacionModel = {
    idCotizacion: undefined,
    folio: 0,
    sencillo:true,
    tipoViaje: "Solo de ida",
    regresa_vacio: false,
    regreso:"Vacio",
    id_ingreso: "0",
    id_area: undefined,
    unidadNegocio: "",
    id_tipo_operacion: 0,
    tipoOperacion: "",
    clasificacion: "",
    cliente: undefined,
    origen: undefined,
    destino: undefined,
    kms_ida: 0,
    kms_regreso:0,
    kms_totales: 0,
    casetas: 0,
    casetas_si: 0,
    casetas_regreso:0,
    casetas_regreso_si:0,
    casetas_total_sin_impuestos:0,
    diesel:0,
    diesel_sin_impuestos: 0,
    diesel_total_sin_impuestos:0,
    num_estancias_ida: 0,
    num_maniobras_ida: 0,
    ton_carga_ida:0,
    num_estancias_regreso:0,
    num_maniobras_regreso:0,
    ton_carga_regreso:0,
    clienta_paga: false,
    clientePagaCasetas:"No",
    tarifaFinal:0,
    costoViaje:0,
    toneladas:0,
    costo_tonelada:0,
    costoPorKm:0,
    ingresoPorKm:0,
    rend_cargado:0,
    rend_vacio:0
    
  };

  limpiarFormT35() {
    this.bolFormSoloLectura = false;
    //this.itemCotizacion = {};
    this.itemCotizacion = {
      idCotizacion: undefined,
      folio: 0,
      sencillo:true,
      tipoViaje: "Solo de ida",
      regresa_vacio: false,
      regreso:"Vacio",
      id_ingreso: "0",
      id_area: undefined,
      unidadNegocio: "",
      id_tipo_operacion: 0,
      tipoOperacion: "",
      clasificacion: "",
      cliente: undefined,
      origen: undefined,
      destino: undefined,
      kms_ida: 0,
      kms_regreso:0,
      kms_totales: 0,
      casetas: 0,
      casetas_si: 0,
      casetas_regreso:0,
      casetas_regreso_si: 0,
      casetas_total_sin_impuestos:0,
      diesel:0,
      diesel_sin_impuestos: 0,
      diesel_total_sin_impuestos:0,
      num_estancias_ida: 0,
      num_maniobras_ida: 0,
      ton_carga_ida:0,
      num_estancias_regreso:0,
      num_maniobras_regreso:0,
      ton_carga_regreso:0,
      clienta_paga: false,
      clientePagaCasetas:"No",
      tarifaFinal:0,
      costoViaje:0,
      toneladas:0,
      costo_tonelada:0,
      costoPorKm:0,
      ingresoPorKm:0,
      rend_cargado:0,
      rend_vacio:0
    };
  }

  T35: number;
  tipoOperacionT35: string;
  casetaSImpT35: number;
  casetasRegresoT35: number;
  modeT35: boolean = false;
  tarifa35(data){
    this.T35 = data.data.tarifa35;
    this.tipoOperacionT35 = data.data.tipoOperacion;
    this.casetaSImpT35 = data.data.casetas_total_sin_impuestos;
    this.casetasRegresoT35 = data.data.casetas_regreso;

    this.cotizadorService.getCotizacion(data.data.idCotizacion).subscribe(res => {
      this.itemCotizacionT35 = res.data;
    });
    
    const formatValue = Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(data.data.tarifa35);
    const clonedItem = { ...data.data };
    let result = confirm("<i>La tarifa final sera <b>"+formatValue+"</b></i><br>"+
                        "<i>Esta seguro de aprobar la cotización: <b>" +
      clonedItem.folio + "</b></i>", "Confirmar Operación");
    result.then((dialogResult) => {


      if (dialogResult) {
        //TODO: Implementar endpoint para aprobar cotizacion
        this.guardarCotizacionT35();


        if(this.itemCotizacionT35.tarifaFinal !== 0){
        this.cotizadorService.postAprobarCotizacion(clonedItem.idCotizacion).subscribe(res =>{
          if (res.responseCode === 200) {
            //agregamos precotizacion a las aprobadas
            const elementIndex = this.arrPreCotizaciones.findIndex(obj=> obj.idCotizacion == clonedItem.idCotizacion);
            this.arrPreCotizaciones[elementIndex].status = "APROBADA";
            this.arrCotizaciones.push(this.arrPreCotizaciones[elementIndex]);

            //Quitamos la aprobada de las precotizaciones
            this.arrPreCotizaciones = this.arrPreCotizaciones.filter(e => e.idCotizacion !== clonedItem.idCotizacion);

            notify({
              message: 'Cotización aprobada con exito!',
              position: {
                my: 'center center',
                at: 'center center',
              },
            }, 'success', 3000);
          } else {
            notify({
              message: res.responseText,
              position: {
                my: 'center center',
                at: 'center center',
              },
            }, 'error', 5000);
          }
        });
      }
    }
    });
  }

  guardarCotizacionT35() {
   
    
    this.itemCotizacionT35.sencillo = this.itemCotizacionT35.tipoViaje === "Solo de ida" ? true : false;
    this.itemCotizacionT35.regresa_vacio = this.itemCotizacionT35.regreso === "Vacio" ? true : false;
    this.itemCotizacionT35.clienta_paga = this.itemCotizacionT35.clientePagaCasetas === "Si" ? true : false;
    this.itemCotizacionT35.tarifaFinal = this.T35;
    this.itemCotizacionT35.tipoOperacion = this.tipoOperacionT35;
    this.itemCotizacionT35.casetas_total_sin_impuestos = this.casetaSImpT35;
    this.itemCotizacionT35.casetas_regreso = this.casetasRegresoT35;
    
    this.cotizadorService.postEditarCotizacion(this.itemCotizacionT35).subscribe(res => {
      if (res.responseCode === 200) {
        this.itemCotizacionT35 = res.data;
        this.getPreCotizaciones();
        if(res.data.tarifaFinal == this.T35){
        this.modeT35 = true;
        }
        notify({
          message: 'Cotización guardada con exito!',
          position: {
            my: 'center center',
            at: 'center center',
          },
        }, 'success', 3000);
      } else {
        notify({
          message: res.responseText,
          position: {
            my: 'center center',
            at: 'center center',
          },
        }, 'error', 3000);
      }
    });

    this.limpiarFormT35();
}


  itemCotizacionT40: CotizacionModel = {
    idCotizacion: undefined,
    folio: 0,
    sencillo:true,
    tipoViaje: "Solo de ida",
    regresa_vacio: false,
    regreso:"Vacio",
    id_ingreso: "0",
    id_area: undefined,
    unidadNegocio: "",
    id_tipo_operacion: 0,
    tipoOperacion: "",
    clasificacion: "",
    cliente: undefined,
    origen: undefined,
    destino: undefined,
    kms_ida: 0,
    kms_regreso:0,
    kms_totales: 0,
    casetas: 0,
    casetas_si: 0,
    casetas_regreso:0,
    casetas_regreso_si:0,
    casetas_total_sin_impuestos:0,
    diesel:0,
    diesel_sin_impuestos: 0,
    diesel_total_sin_impuestos:0,
    num_estancias_ida: 0,
    num_maniobras_ida: 0,
    ton_carga_ida:0,
    num_estancias_regreso:0,
    num_maniobras_regreso:0,
    ton_carga_regreso:0,
    clienta_paga: false,
    clientePagaCasetas:"No",
    tarifaFinal:0,
    costoViaje:0,
    toneladas:0,
    costo_tonelada:0,
    costoPorKm:0,
    ingresoPorKm:0,
    rend_cargado:0,
    rend_vacio:0
    
  };

  limpiarFormT40() {
    this.bolFormSoloLectura = false;
    //this.itemCotizacion = {};
    this.itemCotizacion = {
      idCotizacion: undefined,
      folio: 0,
      sencillo:true,
      tipoViaje: "Solo de ida",
      regresa_vacio: false,
      regreso:"Vacio",
      id_ingreso: "0",
      id_area: undefined,
      unidadNegocio: "",
      id_tipo_operacion: 0,
      tipoOperacion: "",
      clasificacion: "",
      cliente: undefined,
      origen: undefined,
      destino: undefined,
      kms_ida: 0,
      kms_regreso:0,
      kms_totales: 0,
      casetas: 0,
      casetas_si: 0,
      casetas_regreso:0,
      casetas_regreso_si: 0,
      casetas_total_sin_impuestos:0,
      diesel:0,
      diesel_sin_impuestos: 0,
      diesel_total_sin_impuestos:0,
      num_estancias_ida: 0,
      num_maniobras_ida: 0,
      ton_carga_ida:0,
      num_estancias_regreso:0,
      num_maniobras_regreso:0,
      ton_carga_regreso:0,
      clienta_paga: false,
      clientePagaCasetas:"No",
      tarifaFinal:0,
      costoViaje:0,
      toneladas:0,
      costo_tonelada:0,
      costoPorKm:0,
      ingresoPorKm:0,
      rend_cargado:0,
      rend_vacio:0
    };
  }

  T40: number;
  tipoOperacionT40: string;
  casetaSImpT40: number;
  casetasRegresoT40: number;
  modeT40: boolean = false;
  tarifa40(data){
    this.T40 = data.data.tarifa40;
    this.tipoOperacionT40 = data.data.tipoOperacion;
    this.casetaSImpT40 = data.data.casetas_total_sin_impuestos;
    this.casetasRegresoT40 = data.data.casetas_regreso;

    this.cotizadorService.getCotizacion(data.data.idCotizacion).subscribe(res => {
      this.itemCotizacionT40 = res.data;
    });
    
    const formatValue = Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(data.data.tarifa40);
    const clonedItem = { ...data.data };
    let result = confirm("<i>La tarifa final sera <b>"+formatValue+"</b></i><br>"+
                        "<i>Esta seguro de aprobar la cotización: <b>" +
      clonedItem.folio + "</b></i>", "Confirmar Operación");
    result.then((dialogResult) => {


      if (dialogResult) {
        //TODO: Implementar endpoint para aprobar cotizacion
        this.guardarCotizacionT40();
        
        if(this.itemCotizacionT40.tarifaFinal !== 0){
        this.cotizadorService.postAprobarCotizacion(clonedItem.idCotizacion).subscribe(res =>{
          if (res.responseCode === 200) {
            //agregamos precotizacion a las aprobadas
            const elementIndex = this.arrPreCotizaciones.findIndex(obj=> obj.idCotizacion == clonedItem.idCotizacion);
            this.arrPreCotizaciones[elementIndex].status = "APROBADA";
            this.arrCotizaciones.push(this.arrPreCotizaciones[elementIndex]);

            //Quitamos la aprobada de las precotizaciones
            this.arrPreCotizaciones = this.arrPreCotizaciones.filter(e => e.idCotizacion !== clonedItem.idCotizacion);

            notify({
              message: 'Cotización aprobada con exito!',
              position: {
                my: 'center center',
                at: 'center center',
              },
            }, 'success', 3000);
          } else {
            notify({
              message: res.responseText,
              position: {
                my: 'center center',
                at: 'center center',
              },
            }, 'error', 5000);
          }
        });
      }
    }
    });

    
  }

  guardarCotizacionT40() {
   
    
    this.itemCotizacionT40.sencillo = this.itemCotizacionT40.tipoViaje === "Solo de ida" ? true : false;
    this.itemCotizacionT40.regresa_vacio = this.itemCotizacionT40.regreso === "Vacio" ? true : false;
    this.itemCotizacionT40.clienta_paga = this.itemCotizacionT40.clientePagaCasetas === "Si" ? true : false;
    this.itemCotizacionT40.tarifaFinal = this.T40;
    this.itemCotizacionT40.tipoOperacion = this.tipoOperacionT40;
    this.itemCotizacionT40.casetas_total_sin_impuestos = this.casetaSImpT40;
    this.itemCotizacionT40.casetas_regreso = this.casetasRegresoT40;
    
    this.cotizadorService.postEditarCotizacion(this.itemCotizacionT40).subscribe(res => {
      if (res.responseCode === 200) {
        this.itemCotizacionT40 = res.data;
        this.getPreCotizaciones();
        if(res.data.tarifaFinal == this.T40){
        this.modeT40 = true;
        }
        notify({
          message: 'Cotización guardada con exito!',
          position: {
            my: 'center center',
            at: 'center center',
          },
        }, 'success', 3000);
      } else {
        notify({
          message: res.responseText,
          position: {
            my: 'center center',
            at: 'center center',
          },
        }, 'error', 3000);
      }
    });

    this.limpiarFormT40();
}
}
