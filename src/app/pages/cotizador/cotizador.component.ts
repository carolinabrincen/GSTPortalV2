import { ReportsPDFService } from './../../shared/reports/reports-pdf.service';
import { CotizadorService } from './../../services/cotizador/cotizador.service';
import { CotizacionModel, VariablesCotizacionModel, DetalleCotizacionModel} from './../../shared/models/cotizador/cotizador.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import {
  DxDataGridModule,
  DxDataGridComponent,
  DxTemplateModule,
  DxSelectBoxModule,
  DxButtonModule,
} from 'devextreme-angular';
import { UnidadesNegocioModel } from 'src/app/shared/models/rentabilidad-contable/renta-contable.model';
import { RentContService } from 'src/app/services/rentabilidad-contable/rent-cont.service';
import { RentGerService } from 'src/app/services/rentabilidad-gerencial/rent-ger.service';
import { TiposOperacionModel } from 'src/app/shared/models/rentabilidad-gerencial/renta-geren.model';
import notify from 'devextreme/ui/notify';
import { confirm } from 'devextreme/ui/dialog';
import { IUser } from 'src/app/shared/services';
import themes from 'devextreme/ui/themes';
import dxSelectBox from 'devextreme/ui/select_box';
import { runInThisContext } from 'vm';







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

  @ViewChild('rentGer') rentGer!: DxDataGridComponent;

  arrCotizacionesSelect: CotizacionModel[] = [];

  allMode: string;
  checkBoxesMode: string;
 

  itemCotizacion: any = {
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
    private pdfReport: ReportsPDFService
  ) {
    const that = this;
    this.unidadNegocio_ValueChanged = this.unidadNegocio_ValueChanged.bind(this);
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


  }

  ngOnInit(): void {
    this.getCotizaciones();
    this.getPreCotizaciones();
    this.getUnidadesNegocio();
    
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

  getRentabilidad(operacion: string) {
    // console.log(this.itemCotizacion.id_area+"   "+operacion)

    this.cotizadorService.getRentabilidad(this.itemCotizacion.id_area, operacion).subscribe(res => {
      
      this.itemCotizacion.rend_cargado = res.data.rend_cargado;
      this.itemCotizacion.rend_vacio = res.data.rend_vacio;
    });
    

  }

  
  //#endregion :::: FIN GETTERS ::::

  //#endregion :::: EVENTOS :::::
  dieselValueChanged(e: any) {
    this.itemCotizacion.diesel_sin_impuestos = e.value === 0 ? 0 : +(((this.itemCotizacion.diesel-0.40228)/1.16) + 0.40228).toFixed(2);
  }
 
  
  caseta_ida_ValueChanged(e: any) {
    this.itemCotizacion.casetas_si = e.value === 0 ? 0 : +((this.itemCotizacion.casetas)/1.16).toFixed(2);
  }

  caseta_regreso_ValueChanged(e: any) {  
    this.itemCotizacion.casetas_regreso_si = e.value === 0 ? 0 : +((this.itemCotizacion.casetas_regreso)/1.16).toFixed(2);

   
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
    if(e.value > 0)
    {
      this.getTiposOperacion(e.value);
      console.log(e.value);
    }
    else
    {
       console.log(e.value  + "666" );
      this.arrTipoOperacion = null;
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

        this.cotizadorService.postNuevaCotizacion(this.itemCotizacion).subscribe(res => {
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
        
        this.cotizadorService.postEditarCotizacion(this.itemCotizacion).subscribe(res => {
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
    // const clonedItem = { ...e.row.data };
    // this.rowIndex = e.row.rowIndex;
  
    // this.itemCotizacion = clonedItem;
    // this.tituloModal = "Editando Cotizacion Folio: " + this.itemCotizacion.folio;
    this.bolModal = true;
    this.cotizadorService.getCotizacion(e.row.data.idCotizacion).subscribe(res => {
      this.itemCotizacion = res.data;
      this.tituloModal = "Editando Cotizacion Folio: " + this.itemCotizacion.folio;
      this.sololectura = "no";
      // console.log( this.itemCotizacion)
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
   // const clonedItem = { ...e.row.data };
   // this.itemCotizacion = clonedItem;
    this.tituloModal = "Cotizacion Folio: " + this.itemCotizacion.folio + " (Solo Lectura)";
    this.bolModal = true;
    this.sololectura = "si";
     //this.bolModal = true;
    this.cotizadorService.getCotizacion(e.row.data.idCotizacion).subscribe(res => {
      this.itemCotizacion = res.data;
      //this.tituloModal = "Editando Cotizacion Folio: " + this.itemCotizacion.folio;
      //this.sololectura = "no";
      // console.log( this.itemCotizacion)
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
