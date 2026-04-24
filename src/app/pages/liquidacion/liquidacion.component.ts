import { NgModule, Component, ViewChild, enableProdMode, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit, OnInit } from '@angular/core';
import { UnidadesService } from 'src/app/services/unidades/unidades.services';
import DataGrid from "devextreme/ui/data_grid";
import { IngresosModel } from 'src/app/shared/models/ingresos/ingresos.models';
import { CommonModule, formatDate } from '@angular/common';
import { DxDataGridComponent, DxFormComponent} from 'devextreme-angular';
import { CurrencyPipe, NumberFormatStyle } from '@angular/common';
import { DxChartComponent, } from 'devextreme-angular';
import { ServiceSales } from '../tasks/app.serviceSales';
import { AniosModel } from './../../shared/models/rentabilidad-contable/renta-contable.model';
import { Service } from '../../shared/models/ingresos/ingreso.service'
import { TotalPorcentajes } from '../../shared/models/ingresos/totalporcentajes.model'
import { ModeloGrafica } from '../../shared/models/ingresos/modeloGrafica.model';
import { Modelos } from '../../shared/models/ingresos/modelos.model';
import { LiquidacionService } from 'src/app/services/liquidacion/liquidacion';
import { Liquidacion, totalesBajas} from 'src/app/shared/models/liquidacion/liquidacion.model'
import notify from 'devextreme/ui/notify';
import { StorageService } from '../../shared/services/storage.service';

import { analyticsPanelItems } from 'src/app/types/resource';
import { Options as DataSourceConfig } from 'devextreme/ui/pivot_grid/data_source';
// import { DxDropDownButtonTypes } from 'devextreme-angular/ui/drop-down-button';

import { Workbook } from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { saveAs } from 'file-saver-es';
import { group } from 'console';

import { ActivatedRoute, Router } from '@angular/router';
const getcvetra =new Liquidacion; 

@Component({
  templateUrl: './liquidacion.component.html',
  styleUrls: ['./liquidacion.component.scss'],
  providers: [UnidadesService, ServiceSales, CurrencyPipe, Service],
})

export class LiquidacionComponent implements OnInit {

  @ViewChild(DxChartComponent, { static: false }) chart: any;
  @ViewChild(DxFormComponent, { static: false }) form:DxFormComponent;


  @ViewChild('gridModal', { static: false }) gridModal: DxDataGridComponent;


  //loading
  loadingVisible = false;
  isVisible = false;

  paginacion = 5;
  readonly allowedPageSizes = [5, 10, 20, 50, 100, 'all'];
  autogroupingAC = false;
  chart_visualRange = [1, 31];

  formFilter: any = {
    Fecha: ''
  }
  pagos: any[] = []
  pagosXDia: any[] = [];  
  pagosXMes: any[] = [];
  pagosDetalleP: any[] = [];
  graficaPXMesResumen: any[] = [];
  graficaPXClasificado: any[] = [
    {total: 0}
  ];

  liquidacion: any[] = [];
  graficaUO: any[] = [];
  titulosMes: any;
  observaciones: any[] = [];
  viajesPenLiq: any[] = [];
  LiqPag: any[] = [];
  bajasMA: any[] = [];
  bajasMem: any[] = [];
  bajasAnu: any[] = [];
  salesByCategory: any[] = [];
  salesByDateAndCategory: any[] = null;

  cvetra: number = 0;
  cvetra2: number = 0;
  verCvetra: number = 0;

  modTotal: boolean = false;
  modObservaciones: boolean = false;
  modVerObs: boolean = false;
  bolFormSoloLectura = false;
  buttonOptionsCancelar: any

  formObs: any = {
    cvetra: 0,
    idUsuario: "",
    observaciones: "",
  }

   buttonOptions: any = {
    text: 'Guardar',
    type: 'success',
    useSubmitBehavior: true,

  };

  username: string

  visualRange = [1, 12]
  customRange = analyticsPanelItems[5].value.split('/').map((d) => new Date(d));
  isLoading: boolean = false;
  periodoMA = ['Mensual', 'Anual'];
  periodoUdnMen = ['TODOS', 'CUAUTITLAN', 'GUADALAJARA', 'HERMOSILLO', 'MEXICALI', 'ORIZABA', 'RAMOS ARIZPE', 'TULTITLAN'];
  periodoUdnAnu = ['TODOS', 'CUAUTITLAN', 'GUADALAJARA', 'HERMOSILLO', 'MEXICALI', 'ORIZABA', 'RAMOS ARIZPE', 'TULTITLAN'];
  periodoUO = ['Udn', 'Operación'];
  groupByPeriods = ['Mensual', 'Anual'];
  
  bandera: boolean = false;

  itemPeriodo: string;
  itemUdnMen: string;
  itemUdnAanu: string;

  constructor(
    private liquidacionService: LiquidacionService,
    private service: ServiceSales,
    private currencyPipe: CurrencyPipe,
    testService: Service,
    private storageService: StorageService,
    private router: Router
  ) {

    this.customizeTooltip = this.customizeTooltip.bind(this);
    this.calcularPorcentajes = this.calcularPorcentajes.bind(this);
    this.formFilter

    const that = this;
    this.buttonOptionsCancelar= {
          text: 'Cancelar',
          type: 'danger',
          onClick(e: any) {
            that.modObservaciones = false;
          },
        };
  }

   loadData = (groupBy: string) => {
    // const [startDate, endDate] = analyticsPanelItems[4].value.split('/');
    // const tasks = [
    //   ['sales', this.service.getSales(startDate, endDate)],
    //   ['salesByDateAndCategory', this.service.getSalesByOrderDate(groupBy)],
    // ].map(([dataName, loader]: [string, Observable<Sale[]>]) => {
    //     const task = loader.pipe(share());
    //     task.subscribe((data) => this[dataName] = data);
    //     return task;
    //   }
    // );

    // forkJoin(tasks).subscribe(() => {
    //   this.isLoading = false;
    // });
  };

  ngOnInit(): void {
    // this.getDisponiblidadAnual();
    // this.loadData(this.groupByPeriods[1].toLowerCase());
//     this.visualRange = this.customRange;
    this.getUserName();
  }

  getLiquidacion() {

    // var printMes= "" ;
    // var printAnio = "";
    // var filtro = ""
    // printAnio = new Date(this.formFilter.Fecha.toISOString()).toLocaleString('es-MX',{year: 'numeric' });
    // printMes = new Date(this.formFilter.Fecha.toISOString()).toLocaleString('es-MX',{month:'numeric' });
    
    
    this.loadingVisible = true;
    this.liquidacionService.getLiquidacion(this.formFilter.Fecha.toISOString()).subscribe((response) => {
      this.titulosMes = response.data;
      this.liquidacion = response.data.spLiquidacionesMensuales;
      this.graficaUO = response.data.graficaUDN;
      //console.log(response.data)
      //this.graficaPXClasificado = myGrafica;
      this.loadingVisible = false;
    })
  }

  getBajas() {
    this.bajasMA = [];
    //this.loadingVisible = true;
    this.liquidacionService.getBajas(this.formFilter.Fecha.toISOString()).subscribe((response) => {
      //console.log(response.data)

      var myBaja = response.data.bajasMensuales;
      var myTotalesBP = [];
      
       let totalSumaBaj = response.data.bajasMensuales.reduce((acc, val) => {
        //console.log(acc, '   ',val)
             return acc + val.bajas;
            //return acc;
          }, 0);
          //console.log(totalSumaBaj)
       myBaja.forEach((row: any) =>{ 

        if(row.motivo == "AUSENTISMO"){
          let totalPorcentajeA = 0;
          
          var mytotalBA = 0;
          mytotalBA = response.data.bajasMensuales.reduce((acc, val) => {
            if (val.motivo == "AUSENTISMO") return acc + val.bajas;
            return acc;
          }, 0);

          totalPorcentajeA = mytotalBA / totalSumaBaj;
          //console.log(mytotalBA, ' + ', totalSumaBaj, ' = ', totalPorcentajeA)
          // var mytotalPA = 0;
          // mytotalPA = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "AUSENTISMO") return acc + val.porcentaje;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = mytotalBA;
          myTotalesBajasA.motivo = "AUSENTISMO";
          myTotalesBajasA.porcentaje = totalPorcentajeA;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "DEFUNCION"){
          let totalPorcentajeD = 0;
          var mytotalBD = 0;

          mytotalBD = response.data.bajasMensuales.reduce((acc, val) => {
            if (val.motivo == "DEFUNCION") return acc + val.bajas;
            return acc;
          }, 0);

          totalPorcentajeD = mytotalBD / totalSumaBaj;

          // var mytotalPD = 0;
          // mytotalPD = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "DEFUNCION") return acc + val.porcentaje;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = mytotalBD;
          myTotalesBajasA.motivo = "DEFUNCION";
          myTotalesBajasA.porcentaje = totalPorcentajeD;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "OTROS"){
          let totalPorcentajeO = 0;
          var mytotalBO = 0;

          mytotalBO = response.data.bajasMensuales.reduce((acc, val) => {
            if (val.motivo == "OTROS") return acc + val.bajas;
            return acc;
          }, 0);

          totalPorcentajeO = mytotalBO / totalSumaBaj;

          // var mytotalPO = 0;
          // mytotalPO = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "OTROS") return acc + val.porcentaje;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = mytotalBO;
          myTotalesBajasA.motivo = "OTROS";
          myTotalesBajasA.porcentaje = totalPorcentajeO;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "RESICION DE CONTRATO"){
          let totalPorcentajeRC = 0;
          var mytotalBR = 0;

          mytotalBR = response.data.bajasMensuales.reduce((acc, val) => {
            if (val.motivo == "RESICION DE CONTRATO") return acc + val.bajas;
            return acc;
          }, 0);

          totalPorcentajeRC = mytotalBR / totalSumaBaj;

          // var mytotalPR = 0;
          // mytotalPR = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "RESICION DE CONTRATO") return acc + val.porcentaje;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = mytotalBR;
          myTotalesBajasA.motivo = "RESICION DE CONTRATO";
          myTotalesBajasA.porcentaje = totalPorcentajeRC;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "SEPARACION VOLUNTARIA"){
          let totalPorcentajeSV = 0;
          var mytotalBS = 0;

          mytotalBS = response.data.bajasMensuales.reduce((acc, val) => {
            if (val.motivo == "SEPARACION VOLUNTARIA") return acc + val.bajas;
            return acc;
          }, 0);

          totalPorcentajeSV = mytotalBS / totalSumaBaj;

          // var mytotalPS = 0;
          // mytotalPS = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "SEPARACION VOLUNTARIA") return acc + val.porcentaje;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = mytotalBS;
          myTotalesBajasA.motivo = "SEPARACION VOLUNTARIA";
          myTotalesBajasA.porcentaje = totalPorcentajeSV;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "ABANDONO DE EMPLEO"){
          let totalPorcentajeAE = 0;
          var mytotalAE = 0;

          mytotalAE = response.data.bajasMensuales.reduce((acc, val) => {
            if (val.motivo == "ABANDONO DE EMPLEO") return acc + val.bajas;
            return acc;
          }, 0);

          totalPorcentajeAE = mytotalAE / totalSumaBaj;

          // var mytotalPS = 0;
          // mytotalPS = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "SEPARACION VOLUNTARIA") return acc + val.porcentaje;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = mytotalAE;
          myTotalesBajasA.motivo = "ABANDONO DE EMPLEO";
          myTotalesBajasA.porcentaje = totalPorcentajeAE;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "JUBILACION"){
          let totalPorcentajeJ = 0;
          var mytotalJ = 0;

          mytotalJ = response.data.bajasMensuales.reduce((acc, val) => {
            if (val.motivo == "JUBILACION") return acc + val.bajas;
            return acc;
          }, 0);

          totalPorcentajeJ = mytotalJ / totalSumaBaj;

          // var mytotalPS = 0;
          // mytotalPS = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "SEPARACION VOLUNTARIA") return acc + val.porcentaje;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = mytotalJ;
          myTotalesBajasA.motivo = "JUBILACION";
          myTotalesBajasA.porcentaje = totalPorcentajeJ;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "TERMINO DE CONTRATO"){
          let totalPorcentajeTC = 0;
          var mytotalTC = 0;

          mytotalTC = response.data.bajasMensuales.reduce((acc, val) => {
            if (val.motivo == "TERMINO DE CONTRATO") return acc + val.bajas;
            return acc;
          }, 0);

          totalPorcentajeTC = mytotalTC / totalSumaBaj;

          // var mytotalPS = 0;
          // mytotalPS = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "SEPARACION VOLUNTARIA") return acc + val.porcentaje;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = mytotalTC;
          myTotalesBajasA.motivo = "TERMINO DE CONTRATO";
          myTotalesBajasA.porcentaje = totalPorcentajeTC;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "PENSION"){
          let totalPorcentajeP = 0;
          var mytotalP = 0;

          mytotalP = response.data.bajasMensuales.reduce((acc, val) => {
            if (val.motivo == "PENSION") return acc + val.bajas;
            return acc;
          }, 0);

          totalPorcentajeP = mytotalP / totalSumaBaj;

          // var mytotalPS = 0;
          // mytotalPS = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "SEPARACION VOLUNTARIA") return acc + val.porcentaje;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = mytotalP;
          myTotalesBajasA.motivo = "PENSION";
          myTotalesBajasA.porcentaje = totalPorcentajeP;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }
       })

      var result = myTotalesBP.reduce((unique, o) => {
          if(!unique.some(obj => obj.motivo === o.motivo)) {
            unique.push(o);
          }
          return unique;
      },[]);
      this.bajasMA = result;
      //console.log(this.bajasMA)
        //this.loadingVisible = false;
      //console.log(this.bajasMA)
    })
  }
  /*======================SELECTE FUNCIONS================================================*/

  verTotal(value){
    this.viajesPenLiq = [];
    this.LiqPag = [];
    this.cvetra2 = 0;

    this.cvetra2 = value.data.idPersonal;
     
    if(getcvetra.cvetra !== undefined){
      this.getDetalleOperador()
    }
    
    
    this.modTotal = true;


  }

  agregarObs(value){
    //console.log(value.data) 
    this.formObs.observaciones = "";
    this.cvetra = 0;

    this.cvetra = value.data.idPersonal;
    console.log(this.cvetra)
    this.modObservaciones = true;
  }

  VerObs(value){
    this.observaciones = []
    this.verCvetra = 0

    this.verCvetra = value.data.idPersonal;
    this.modVerObs = true;

    if(getcvetra.cvetra !== undefined){
      this.getObservaciones()
    }
  }
  
  buscarClick = (e: any) => {

    if (this.formFilter.Fecha !== "") {

      this.itemPeriodo = "Mensual"
      this.itemUdnMen = "Todos"

      this.getLiquidacion();
      this.getBajas();
      }else{
        notify({
          message: "Debe seleccionar la Fecha",
          position: {
            my: 'top center',
            at: 'top center',
          },
        }, 'warning', 4000);
      }
    };

    calcularPorcentajes(options: any) {
      //
      if (options.summaryProcess === 'calculate') {
        if (options.name === 'grupMargenUtilidaPor') {
          options.totalValue = .17;
        }
      }
    }


  getUserName(){
    this.username = this.storageService.getSession("username");

    //console.log(this.username)
  }

  guardarObservacion(e) {
      e.preventDefault();

        this.loadingVisible = true;
        console.log(this.formObs)
        this.liquidacionService.postObservaciones(this.cvetra, this.username, this.formObs.observaciones).subscribe(data =>{
          console.log(data)
        
          if (data.responseCode === 200) {

            notify({
          message: "La observación se guardo con exito",
          position: {
            my: 'center',
            at: 'center',
          },
        }, 'success', 4000);

              this.modObservaciones = false;
              this.bolFormSoloLectura = false;
              this.loadingVisible = false;
          }

       
        })
  }

  getObservaciones(){
    this.loadingVisible = true;
    //console.log(this.cvetra)
    this.liquidacionService.getObservaciones(this.verCvetra).subscribe(data =>{
      this.observaciones = data.data;
      //console.log(this.observaciones)
      this.loadingVisible = false;
    })
  }

  getDetalleOperador(){
    this.loadingVisible = true;

    this.liquidacionService.getDetalleOperador(this.formFilter.Fecha.toISOString(),this.cvetra2).subscribe(data =>{
      this.viajesPenLiq = data.data.liquidacionesPendientes;
      this.LiqPag = data.data.liquidacionSemanal;
      console.log(data.data)
      this.loadingVisible = false;
    })
  }



    onRangeChanged = ({value: dates}) => {
    const [startDate, endDate] = dates.map((date) => formatDate(date, 'yyyy-MM-dd', 'en'));

    //this.isLoading = true;

    // this.service.getSalesByCategory(startDate, endDate)
    //   .subscribe((result) => {
    //     this.salesByCategory = result;
    //     this.isLoading = false;
    //   });
  };

    selectionChange({item: period}: any) {
   // this.isLoading = true;

    // this.service.getSalesByOrderDate(period.toLowerCase())
    //   .subscribe((result) => {
    //     this.salesByDateAndCategory = result;
    //     this.isLoading = false;
    //   })
  }

  selectionMotivosB({item: period}: any) {
    if(period == "Anual"){
      this.itemPeriodo = period;
      console.log("ANUAL")
      this.bajasMA = [];
      this.loadingVisible = true;
      this.liquidacionService.getBajas(this.formFilter.Fecha.toISOString()).subscribe((response) => {
          var myBaja = response.data.bajasAnuales;
      var myTotalesBP = [];
      
       myBaja.forEach((row: any) =>{ 

        if(row.motivo == "AUSENTISMO"){
          
          var mytotalBA = 0;
          mytotalBA = response.data.bajasAnuales.reduce((acc, val) => {
            if (val.motivo == "AUSENTISMO") return acc + val.bajas;
            return acc;
          }, 0);

          var mytotalPA = 0;
          mytotalPA = response.data.bajasAnuales.reduce((acc, val) => {
            if (val.motivo == "AUSENTISMO") return acc + val.porcentaje;
            return acc;
          }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = mytotalBA;
          myTotalesBajasA.motivo = "AUSENTISMO";
          myTotalesBajasA.porcentaje = mytotalPA;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "DEFUNCION"){
          
          var mytotalBD = 0;
          mytotalBD = response.data.bajasAnuales.reduce((acc, val) => {
            if (val.motivo == "DEFUNCION") return acc + val.bajas;
            return acc;
          }, 0);

          var mytotalPD = 0;
          mytotalPD = response.data.bajasAnuales.reduce((acc, val) => {
            if (val.motivo == "DEFUNCION") return acc + val.porcentaje;
            return acc;
          }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = mytotalBD;
          myTotalesBajasA.motivo = "DEFUNCION";
          myTotalesBajasA.porcentaje = mytotalPD;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "OTROS"){
          
          var mytotalBO = 0;
          mytotalBO = response.data.bajasAnuales.reduce((acc, val) => {
            if (val.motivo == "OTROS") return acc + val.bajas;
            return acc;
          }, 0);

          var mytotalPO = 0;
          mytotalPO = response.data.bajasAnuales.reduce((acc, val) => {
            if (val.motivo == "OTROS") return acc + val.porcentaje;
            return acc;
          }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = mytotalBO;
          myTotalesBajasA.motivo = "OTROS";
          myTotalesBajasA.porcentaje = mytotalPO;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "RESICION DE CONTRATO"){
          
          var mytotalBR = 0;
          mytotalBR = response.data.bajasAnuales.reduce((acc, val) => {
            if (val.motivo == "RESICION DE CONTRATO") return acc + val.bajas;
            return acc;
          }, 0);

          var mytotalPR = 0;
          mytotalPR = response.data.bajasAnuales.reduce((acc, val) => {
            if (val.motivo == "RESICION DE CONTRATO") return acc + val.porcentaje;
            return acc;
          }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = mytotalBR;
          myTotalesBajasA.motivo = "RESICION DE CONTRATO";
          myTotalesBajasA.porcentaje = mytotalPR;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "SEPARACION VOLUNTARIA"){
          
          var mytotalBS = 0;
          mytotalBS = response.data.bajasAnuales.reduce((acc, val) => {
            if (val.motivo == "SEPARACION VOLUNTARIA") return acc + val.bajas;
            return acc;
          }, 0);

          var mytotalPS = 0;
          mytotalPS = response.data.bajasAnuales.reduce((acc, val) => {
            if (val.motivo == "SEPARACION VOLUNTARIA") return acc + val.porcentaje;
            return acc;
          }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = mytotalBS;
          myTotalesBajasA.motivo = "SEPARACION VOLUNTARIA";
          myTotalesBajasA.porcentaje = mytotalPS;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "ABANDONO DE EMPLEO"){
          
          var mytotalBAE = 0;
          mytotalBAE = response.data.bajasAnuales.reduce((acc, val) => {
            if (val.motivo == "ABANDONO DE EMPLEO") return acc + val.bajas;
            return acc;
          }, 0);

          var mytotalPAE = 0;
          mytotalPAE = response.data.bajasAnuales.reduce((acc, val) => {
            if (val.motivo == "ABANDONO DE EMPLEO") return acc + val.porcentaje;
            return acc;
          }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = mytotalBAE;
          myTotalesBajasA.motivo = "ABANDONO DE EMPLEO";
          myTotalesBajasA.porcentaje = mytotalPAE;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "JUBILACION"){
          
          var mytotalJ = 0;
          mytotalJ = response.data.bajasAnuales.reduce((acc, val) => {
            if (val.motivo == "JUBILACION") return acc + val.bajas;
            return acc;
          }, 0);

          var mytotalPJ = 0;
          mytotalPJ = response.data.bajasAnuales.reduce((acc, val) => {
            if (val.motivo == "JUBILACION") return acc + val.porcentaje;
            return acc;
          }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = mytotalJ;
          myTotalesBajasA.motivo = "JUBILACION";
          myTotalesBajasA.porcentaje = mytotalPJ;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "PENSION"){  
          
          var mytotalP = 0;
          mytotalP = response.data.bajasAnuales.reduce((acc, val) => {
            if (val.motivo == "PENSION") return acc + val.bajas;
            return acc;
          }, 0);

          var mytotalPP = 0;
          mytotalPP = response.data.bajasAnuales.reduce((acc, val) => {
            if (val.motivo == "PENSION") return acc + val.porcentaje;
            return acc;
          }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = mytotalP;
          myTotalesBajasA.motivo = "PENSION";
          myTotalesBajasA.porcentaje = mytotalPP;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "TERMINO DE CONTRATO"){  
          
          var mytotalT = 0;
          mytotalT = response.data.bajasAnuales.reduce((acc, val) => {
            if (val.motivo == "TERMINO DE CONTRATO") return acc + val.bajas;
            return acc;
          }, 0);

          var mytotalPT = 0;
          mytotalPT = response.data.bajasAnuales.reduce((acc, val) => {
            if (val.motivo == "TERMINO DE CONTRATO") return acc + val.porcentaje;
            return acc;
          }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = mytotalT;
          myTotalesBajasA.motivo = "TERMINO DE CONTRATO";
          myTotalesBajasA.porcentaje = mytotalPT;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }
       })

      var result = myTotalesBP.reduce((unique, o) => {
          if(!unique.some(obj => obj.motivo === o.motivo)) {
            unique.push(o);
          }
          return unique;
      },[]);
      this.bajasMA = result;
      //console.log(this.bajasMA)
        this.loadingVisible = false;
      })
    }else if(period == "Mensual"){
      this.itemPeriodo = period;
      console.log("MENSUAL")
      this.bajasMA = [];
      this.loadingVisible = true;
      this.liquidacionService.getBajas(this.formFilter.Fecha.toISOString()).subscribe((response) => {
          var myBaja = response.data.bajasMensuales;
      var myTotalesBP = [];

       let totalSumaBaj = response.data.bajasMensuales.reduce((acc, val) => {
             return acc + val.bajas;
            //return acc;
          }, 0);
          //console.log(totalSumaBaj)
       myBaja.forEach((row: any) =>{ 

        if(row.motivo == "AUSENTISMO"){
          let totalPorcentajeA = 0;
          
          var mytotalBA = 0;
          mytotalBA = response.data.bajasMensuales.reduce((acc, val) => {
            if (val.motivo == "AUSENTISMO") return acc + val.bajas;
            return acc;
          }, 0);

          totalPorcentajeA = mytotalBA / totalSumaBaj;


          // var mytotalPA = 0;
          // mytotalPA = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "AUSENTISMO") return acc + val.porcentaje;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = mytotalBA;
          myTotalesBajasA.motivo = "AUSENTISMO";
          myTotalesBajasA.porcentaje = totalPorcentajeA;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "DEFUNCION"){
          let totalPorcentajeD = 0;
          var mytotalBD = 0;

          mytotalBD = response.data.bajasMensuales.reduce((acc, val) => {
            if (val.motivo == "DEFUNCION") return acc + val.bajas;
            return acc;
          }, 0);

          totalPorcentajeD = mytotalBD / totalSumaBaj;

          // var mytotalPD = 0;
          // mytotalPD = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "DEFUNCION") return acc + val.porcentaje;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = mytotalBD;
          myTotalesBajasA.motivo = "DEFUNCION";
          myTotalesBajasA.porcentaje = totalPorcentajeD;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "OTROS"){
          let totalPorcentajeO = 0;
          var mytotalBO = 0;

          mytotalBO = response.data.bajasMensuales.reduce((acc, val) => {
            if (val.motivo == "OTROS") return acc + val.bajas;
            return acc;
          }, 0);

          totalPorcentajeO = mytotalBO / totalSumaBaj;

          // var mytotalPO = 0;
          // mytotalPO = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "OTROS") return acc + val.porcentaje;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = mytotalBO;
          myTotalesBajasA.motivo = "OTROS";
          myTotalesBajasA.porcentaje = totalPorcentajeO;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "RESICION DE CONTRATO"){
          let totalPorcentajeRC = 0;
          var mytotalBR = 0;

          mytotalBR = response.data.bajasMensuales.reduce((acc, val) => {
            if (val.motivo == "RESICION DE CONTRATO") return acc + val.bajas;
            return acc;
          }, 0);

          totalPorcentajeRC = mytotalBR / totalSumaBaj;

          // var mytotalPR = 0;
          // mytotalPR = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "RESICION DE CONTRATO") return acc + val.porcentaje;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = mytotalBR;
          myTotalesBajasA.motivo = "RESICION DE CONTRATO";
          myTotalesBajasA.porcentaje = totalPorcentajeRC;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "SEPARACION VOLUNTARIA"){
          let totalPorcentajeSV = 0;
          var mytotalBS = 0;

          mytotalBS = response.data.bajasMensuales.reduce((acc, val) => {
            if (val.motivo == "SEPARACION VOLUNTARIA") return acc + val.bajas;
            return acc;
          }, 0);

          totalPorcentajeSV = mytotalBS / totalSumaBaj;

          // var mytotalPS = 0;
          // mytotalPS = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "SEPARACION VOLUNTARIA") return acc + val.porcentaje;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = mytotalBS;
          myTotalesBajasA.motivo = "SEPARACION VOLUNTARIA";
          myTotalesBajasA.porcentaje = totalPorcentajeSV;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "ABANDONO DE EMPLEO"){
          let totalPorcentajeAE = 0;
          var mytotalAE = 0;

          mytotalAE = response.data.bajasMensuales.reduce((acc, val) => {
            if (val.motivo == "ABANDONO DE EMPLEO") return acc + val.bajas;
            return acc;
          }, 0);

          totalPorcentajeAE = mytotalAE / totalSumaBaj;

          // var mytotalPS = 0;
          // mytotalPS = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "SEPARACION VOLUNTARIA") return acc + val.porcentaje;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = mytotalAE;
          myTotalesBajasA.motivo = "ABANDONO DE EMPLEO";
          myTotalesBajasA.porcentaje = totalPorcentajeAE;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "JUBILACION"){
          let totalPorcentajeJ = 0;
          var mytotalJ = 0;

          mytotalJ = response.data.bajasMensuales.reduce((acc, val) => {
            if (val.motivo == "JUBILACION") return acc + val.bajas;
            return acc;
          }, 0);

          totalPorcentajeJ = mytotalJ / totalSumaBaj;

          // var mytotalPS = 0;
          // mytotalPS = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "SEPARACION VOLUNTARIA") return acc + val.porcentaje;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = mytotalJ;
          myTotalesBajasA.motivo = "JUBILACION";
          myTotalesBajasA.porcentaje = totalPorcentajeJ;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "TERMINO DE CONTRATO"){
          let totalPorcentajeTC = 0;
          var mytotalTC = 0;

          mytotalTC = response.data.bajasMensuales.reduce((acc, val) => {
            if (val.motivo == "TERMINO DE CONTRATO") return acc + val.bajas;
            return acc;
          }, 0);

          totalPorcentajeTC = mytotalTC / totalSumaBaj;

          // var mytotalPS = 0;
          // mytotalPS = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "SEPARACION VOLUNTARIA") return acc + val.porcentaje;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = mytotalTC;
          myTotalesBajasA.motivo = "TERMINO DE CONTRATO";
          myTotalesBajasA.porcentaje = totalPorcentajeTC;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "PENSION"){
          let totalPorcentajeP = 0;
          var mytotalP = 0;

          mytotalP = response.data.bajasMensuales.reduce((acc, val) => {
            if (val.motivo == "PENSION") return acc + val.bajas;
            return acc;
          }, 0);

          totalPorcentajeP = mytotalP / totalSumaBaj;

          // var mytotalPS = 0;
          // mytotalPS = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "SEPARACION VOLUNTARIA") return acc + val.porcentaje;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = mytotalP;
          myTotalesBajasA.motivo = "PENSION";
          myTotalesBajasA.porcentaje = totalPorcentajeP;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }
       })

      var result = myTotalesBP.reduce((unique, o) => {
          if(!unique.some(obj => obj.motivo === o.motivo)) {
            unique.push(o);
          }
          return unique;
      },[]);
      this.bajasMA = result;
      //console.log(this.bajasMA)
        this.loadingVisible = false;
      })
    }
  }

  selectionUdnMen({item: period}: any) {
    console.log("MENSUAL")
    if(period == "TODOS"){
      this.itemUdnMen = period;
      this.bajasMA = [];
      this.loadingVisible = true;
      this.liquidacionService.getBajas(this.formFilter.Fecha.toISOString()).subscribe((response) => {
          var myBaja = response.data.bajasMensuales;
      var myTotalesBP = [];
      
       let totalSumaBaj = response.data.bajasMensuales.reduce((acc, val) => {
        console.log(acc, '   ',val)
             return acc + val.bajas;
            //return acc;
          }, 0);
          //console.log(totalSumaBaj)
       myBaja.forEach((row: any) =>{ 

        if(row.motivo == "AUSENTISMO"){
          let totalPorcentajeA = 0;
          
          var mytotalBA = 0;
          mytotalBA = response.data.bajasMensuales.reduce((acc, val) => {
            if (val.motivo == "AUSENTISMO") return acc + val.bajas;
            return acc;
          }, 0);

          totalPorcentajeA = mytotalBA / totalSumaBaj;
          console.log(mytotalBA, ' + ', totalSumaBaj, ' = ', totalPorcentajeA)
          // var mytotalPA = 0;
          // mytotalPA = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "AUSENTISMO") return acc + val.porcentaje;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = mytotalBA;
          myTotalesBajasA.motivo = "AUSENTISMO";
          myTotalesBajasA.porcentaje = totalPorcentajeA;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "DEFUNCION"){
          let totalPorcentajeD = 0;
          var mytotalBD = 0;

          mytotalBD = response.data.bajasMensuales.reduce((acc, val) => {
            if (val.motivo == "DEFUNCION") return acc + val.bajas;
            return acc;
          }, 0);

          totalPorcentajeD = mytotalBD / totalSumaBaj;

          // var mytotalPD = 0;
          // mytotalPD = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "DEFUNCION") return acc + val.porcentaje;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = mytotalBD;
          myTotalesBajasA.motivo = "DEFUNCION";
          myTotalesBajasA.porcentaje = totalPorcentajeD;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "OTROS"){
          let totalPorcentajeO = 0;
          var mytotalBO = 0;

          mytotalBO = response.data.bajasMensuales.reduce((acc, val) => {
            if (val.motivo == "OTROS") return acc + val.bajas;
            return acc;
          }, 0);

          totalPorcentajeO = mytotalBO / totalSumaBaj;

          // var mytotalPO = 0;
          // mytotalPO = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "OTROS") return acc + val.porcentaje;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = mytotalBO;
          myTotalesBajasA.motivo = "OTROS";
          myTotalesBajasA.porcentaje = totalPorcentajeO;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "RESICION DE CONTRATO"){
          let totalPorcentajeRC = 0;
          var mytotalBR = 0;

          mytotalBR = response.data.bajasMensuales.reduce((acc, val) => {
            if (val.motivo == "RESICION DE CONTRATO") return acc + val.bajas;
            return acc;
          }, 0);

          totalPorcentajeRC = mytotalBR / totalSumaBaj;

          // var mytotalPR = 0;
          // mytotalPR = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "RESICION DE CONTRATO") return acc + val.porcentaje;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = mytotalBR;
          myTotalesBajasA.motivo = "RESICION DE CONTRATO";
          myTotalesBajasA.porcentaje = totalPorcentajeRC;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "SEPARACION VOLUNTARIA"){
          let totalPorcentajeSV = 0;
          var mytotalBS = 0;

          mytotalBS = response.data.bajasMensuales.reduce((acc, val) => {
            if (val.motivo == "SEPARACION VOLUNTARIA") return acc + val.bajas;
            return acc;
          }, 0);

          totalPorcentajeSV = mytotalBS / totalSumaBaj;

          // var mytotalPS = 0;
          // mytotalPS = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "SEPARACION VOLUNTARIA") return acc + val.porcentaje;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = mytotalBS;
          myTotalesBajasA.motivo = "SEPARACION VOLUNTARIA";
          myTotalesBajasA.porcentaje = totalPorcentajeSV;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "ABANDONO DE EMPLEO"){
          let totalPorcentajeAE = 0;
          var mytotalAE = 0;

          mytotalAE = response.data.bajasMensuales.reduce((acc, val) => {
            if (val.motivo == "ABANDONO DE EMPLEO") return acc + val.bajas;
            return acc;
          }, 0);

          totalPorcentajeAE = mytotalAE / totalSumaBaj;

          // var mytotalPS = 0;
          // mytotalPS = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "SEPARACION VOLUNTARIA") return acc + val.porcentaje;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = mytotalAE;
          myTotalesBajasA.motivo = "ABANDONO DE EMPLEO";
          myTotalesBajasA.porcentaje = totalPorcentajeAE;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "JUBILACION"){
          let totalPorcentajeJ = 0;
          var mytotalJ = 0;

          mytotalJ = response.data.bajasMensuales.reduce((acc, val) => {
            if (val.motivo == "JUBILACION") return acc + val.bajas;
            return acc;
          }, 0);

          totalPorcentajeJ = mytotalJ / totalSumaBaj;

          // var mytotalPS = 0;
          // mytotalPS = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "SEPARACION VOLUNTARIA") return acc + val.porcentaje;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = mytotalJ;
          myTotalesBajasA.motivo = "JUBILACION";
          myTotalesBajasA.porcentaje = totalPorcentajeJ;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "TERMINO DE CONTRATO"){
          let totalPorcentajeTC = 0;
          var mytotalTC = 0;

          mytotalTC = response.data.bajasMensuales.reduce((acc, val) => {
            if (val.motivo == "TERMINO DE CONTRATO") return acc + val.bajas;
            return acc;
          }, 0);

          totalPorcentajeTC = mytotalTC / totalSumaBaj;

          // var mytotalPS = 0;
          // mytotalPS = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "SEPARACION VOLUNTARIA") return acc + val.porcentaje;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = mytotalTC;
          myTotalesBajasA.motivo = "TERMINO DE CONTRATO";
          myTotalesBajasA.porcentaje = totalPorcentajeTC;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "PENSION"){
          let totalPorcentajeP = 0;
          var mytotalP = 0;

          mytotalP = response.data.bajasMensuales.reduce((acc, val) => {
            if (val.motivo == "PENSION") return acc + val.bajas;
            return acc;
          }, 0);

          totalPorcentajeP = mytotalP / totalSumaBaj;

          // var mytotalPS = 0;
          // mytotalPS = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "SEPARACION VOLUNTARIA") return acc + val.porcentaje;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = mytotalP;
          myTotalesBajasA.motivo = "PENSION";
          myTotalesBajasA.porcentaje = totalPorcentajeP;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }
       })

      var result = myTotalesBP.reduce((unique, o) => {
          if(!unique.some(obj => obj.motivo === o.motivo)) {
            unique.push(o);
          }
          return unique;
      },[]);
      this.bajasMA = result;
      //console.log(this.bajasMA)
        this.loadingVisible = false;
      })
    }else if(period == "ORIZABA"){
      this.itemUdnMen = period;
      this.bajasMA = [];
      this.loadingVisible = true;
      this.liquidacionService.getBajas(this.formFilter.Fecha.toISOString()).subscribe((response) => {
        //console.log("MEN ==> ORIZABA", this.bajasMA)

      var myBaja = response.data.bajasMensuales.filter((word) => word.udn == "ORIZABA");;
      var myTotalesBP = [];
      
     let mytotalSuma = response.data.bajasMensuales.reduce((acc, val) => {
        
            if (val.udn == "ORIZABA") return acc + val.bajas;
            return acc;
          }, 0);

       myBaja.forEach((row: any) =>{ 
        
        if(row.motivo == "AUSENTISMO"){
          
          var totalPorcentajeA = 0;
          

          // let mytotalBA = response.data.bajasMensuales.reduce((acc, val) => {
          //   console.log(val) 
          //   if (val.motivo == "AUSENTISMO") return acc + val.bajas;
           
          //   return acc;
          // }, 0);

          totalPorcentajeA  = row.bajas / mytotalSuma;
          

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "AUSENTISMO";
          myTotalesBajasA.porcentaje = totalPorcentajeA;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "DEFUNCION"){
          var totalPorcentajeD = 0;
          var mytotalBD = 0;

          totalPorcentajeD  = row.bajas / mytotalSuma;
          //console.log(totalPorcentajeD)

          // mytotalBD = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "DEFUNCION") return acc + val.bajas;
          //   return acc;
          // }, 0);



          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "DEFUNCION";
          myTotalesBajasA.porcentaje = totalPorcentajeD;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "OTROS"){
          var totalPorcentajeO = 0;
          var mytotalBO = 0;

          totalPorcentajeO  = row.bajas / mytotalSuma;
      
          // mytotalBO = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "OTROS") return acc + val.bajas;
          //   return acc;
          // }, 0);

         
          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "OTROS";
          myTotalesBajasA.porcentaje = totalPorcentajeO;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "RESICION DE CONTRATO"){
          var totalPorcentajeRC = 0;
          var mytotalBR = 0;

          totalPorcentajeRC  = row.bajas / mytotalSuma;

          // mytotalBR = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "RESICION DE CONTRATO") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "RESICION DE CONTRATO";
          myTotalesBajasA.porcentaje = totalPorcentajeRC;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "SEPARACION VOLUNTARIA"){
          var totalPorcentajeSV = 0;
          var mytotalBS = 0;

          totalPorcentajeSV  = row.bajas / mytotalSuma;

          // mytotalBS = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "SEPARACION VOLUNTARIA") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "SEPARACION VOLUNTARIA";
          myTotalesBajasA.porcentaje = totalPorcentajeSV;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "ABANDONO DE EMPLEO"){
          let totalPorcentajeAE = 0;
          var mytotalAE = 0;

          // mytotalAE = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "ABANDONO DE EMPLEO") return acc + val.bajas;
          //   return acc;
          // }, 0);

          totalPorcentajeAE = row.bajas / mytotalSuma;


          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "ABANDONO DE EMPLEO";
          myTotalesBajasA.porcentaje = totalPorcentajeAE;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "JUBILACION"){
          let totalPorcentajeJ = 0;
          var mytotalJ = 0;

          // mytotalJ = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "JUBILACION") return acc + val.bajas;
          //   return acc;
          // }, 0);

          totalPorcentajeJ = row.bajas / mytotalSuma;

       
          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "JUBILACION";
          myTotalesBajasA.porcentaje = totalPorcentajeJ;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "TERMINO DE CONTRATO"){
          let totalPorcentajeTC = 0;
          var mytotalTC = 0;

          // mytotalTC = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "TERMINO DE CONTRATO") return acc + val.bajas;
          //   return acc;
          // }, 0);

          totalPorcentajeTC = row.bajas / mytotalSuma;

         

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "TERMINO DE CONTRATO";
          myTotalesBajasA.porcentaje = totalPorcentajeTC;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "PENSION"){
          let totalPorcentajeP = 0;
          var mytotalP = 0;

          // mytotalP = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "PENSION") return acc + val.bajas;
          //   return acc;
          // }, 0);

          totalPorcentajeP = row.bajas / mytotalSuma;

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "PENSION";
          myTotalesBajasA.porcentaje = totalPorcentajeP;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }
       })

      var result = myTotalesBP.reduce((unique, o) => {
          if(!unique.some(obj => obj.motivo === o.motivo)) {
            unique.push(o);
          }
          return unique;
      },[]);
      this.bajasMA = result;
        
        this.loadingVisible = false;
         if(this.bajasMA.length == 0){
          notify({
          message: "No hay datos",
          position: {
            my: 'center',
            at: 'center',
          },
        }, 'error', 3000);
        }
    })
    }else if(period == "GUADALAJARA"){
      this.itemUdnMen = period;
      this.bajasMA = [];
      this.loadingVisible = true;
      this.liquidacionService.getBajas(this.formFilter.Fecha.toISOString()).subscribe((response) => {
      var myBaja = response.data.bajasMensuales.filter((word) => word.udn == "GUADALAJARA");;
      var myTotalesBP = [];
      
       let mytotalSuma = response.data.bajasMensuales.reduce((acc, val) => {
        
            if (val.udn == "GUADALAJARA") return acc + val.bajas;
            return acc;
          }, 0);

       myBaja.forEach((row: any) =>{ 
        
        if(row.motivo == "AUSENTISMO"){
          
          var totalPorcentajeA = 0;
          

          // let mytotalBA = response.data.bajasMensuales.reduce((acc, val) => {
          //   console.log(val) 
          //   if (val.motivo == "AUSENTISMO") return acc + val.bajas;
           
          //   return acc;
          // }, 0);

          totalPorcentajeA  = row.bajas / mytotalSuma;
          

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "AUSENTISMO";
          myTotalesBajasA.porcentaje = totalPorcentajeA;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "DEFUNCION"){
          var totalPorcentajeD = 0;
          var mytotalBD = 0;

          totalPorcentajeD  = row.bajas / mytotalSuma;
          //console.log(totalPorcentajeD)

          // mytotalBD = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "DEFUNCION") return acc + val.bajas;
          //   return acc;
          // }, 0);



          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "DEFUNCION";
          myTotalesBajasA.porcentaje = totalPorcentajeD;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "OTROS"){
          var totalPorcentajeO = 0;
          var mytotalBO = 0;

          totalPorcentajeO  = row.bajas / mytotalSuma;
      
          // mytotalBO = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "OTROS") return acc + val.bajas;
          //   return acc;
          // }, 0);

         
          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "OTROS";
          myTotalesBajasA.porcentaje = totalPorcentajeO;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "RESICION DE CONTRATO"){
          var totalPorcentajeRC = 0;
          var mytotalBR = 0;

          totalPorcentajeRC  = row.bajas / mytotalSuma;

          // mytotalBR = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "RESICION DE CONTRATO") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "RESICION DE CONTRATO";
          myTotalesBajasA.porcentaje = totalPorcentajeRC;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "SEPARACION VOLUNTARIA"){
          var totalPorcentajeSV = 0;
          var mytotalBS = 0;

          totalPorcentajeSV  = row.bajas / mytotalSuma;

          // mytotalBS = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "SEPARACION VOLUNTARIA") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "SEPARACION VOLUNTARIA";
          myTotalesBajasA.porcentaje = totalPorcentajeSV;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "ABANDONO DE EMPLEO"){
          let totalPorcentajeAE = 0;
          var mytotalAE = 0;

          // mytotalAE = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "ABANDONO DE EMPLEO") return acc + val.bajas;
          //   return acc;
          // }, 0);

          totalPorcentajeAE = row.bajas / mytotalSuma;


          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "ABANDONO DE EMPLEO";
          myTotalesBajasA.porcentaje = totalPorcentajeAE;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "JUBILACION"){
          let totalPorcentajeJ = 0;
          var mytotalJ = 0;

          // mytotalJ = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "JUBILACION") return acc + val.bajas;
          //   return acc;
          // }, 0);

          totalPorcentajeJ = row.bajas / mytotalSuma;

       
          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "JUBILACION";
          myTotalesBajasA.porcentaje = totalPorcentajeJ;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "TERMINO DE CONTRATO"){
          let totalPorcentajeTC = 0;
          var mytotalTC = 0;

          // mytotalTC = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "TERMINO DE CONTRATO") return acc + val.bajas;
          //   return acc;
          // }, 0);

          totalPorcentajeTC = row.bajas / mytotalSuma;

         

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "TERMINO DE CONTRATO";
          myTotalesBajasA.porcentaje = totalPorcentajeTC;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "PENSION"){
          let totalPorcentajeP = 0;
          var mytotalP = 0;

          // mytotalP = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "PENSION") return acc + val.bajas;
          //   return acc;
          // }, 0);

          totalPorcentajeP = row.bajas / mytotalSuma;

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "PENSION";
          myTotalesBajasA.porcentaje = totalPorcentajeP;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }
       })

      var result = myTotalesBP.reduce((unique, o) => {
          if(!unique.some(obj => obj.motivo === o.motivo)) {
            unique.push(o);
          }
          return unique;
      },[]);
      this.bajasMA = result;
        
        this.loadingVisible = false;
         if(this.bajasMA.length == 0){
          notify({
          message: "No hay datos",
          position: {
            my: 'center',
            at: 'center',
          },
        }, 'error', 3000);
        }
      })
    }else if(period == "RAMOS ARIZPE"){
      this.itemUdnMen = period;
      this.bajasMA = [];
      this.loadingVisible = true;
      this.liquidacionService.getBajas(this.formFilter.Fecha.toISOString()).subscribe((response) => {
      var myBaja = response.data.bajasMensuales.filter((word) => word.udn == "RAMOS ARIZPE");;
      var myTotalesBP = [];
      
        let mytotalSuma = response.data.bajasMensuales.reduce((acc, val) => {
        
            if (val.udn == "RAMOS ARIZPE") return acc + val.bajas;
            return acc;
          }, 0);

       myBaja.forEach((row: any) =>{ 
        
        if(row.motivo == "AUSENTISMO"){
          
          var totalPorcentajeA = 0;
          

          // let mytotalBA = response.data.bajasMensuales.reduce((acc, val) => {
          //   console.log(val) 
          //   if (val.motivo == "AUSENTISMO") return acc + val.bajas;
           
          //   return acc;
          // }, 0);

          totalPorcentajeA  = row.bajas / mytotalSuma;
          

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "AUSENTISMO";
          myTotalesBajasA.porcentaje = totalPorcentajeA;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "DEFUNCION"){
          var totalPorcentajeD = 0;
          var mytotalBD = 0;

          totalPorcentajeD  = row.bajas / mytotalSuma;
          //console.log(totalPorcentajeD)

          // mytotalBD = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "DEFUNCION") return acc + val.bajas;
          //   return acc;
          // }, 0);



          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "DEFUNCION";
          myTotalesBajasA.porcentaje = totalPorcentajeD;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "OTROS"){
          var totalPorcentajeO = 0;
          var mytotalBO = 0;

          totalPorcentajeO  = row.bajas / mytotalSuma;
      
          // mytotalBO = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "OTROS") return acc + val.bajas;
          //   return acc;
          // }, 0);

         
          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "OTROS";
          myTotalesBajasA.porcentaje = totalPorcentajeO;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "RESICION DE CONTRATO"){
          var totalPorcentajeRC = 0;
          var mytotalBR = 0;

          totalPorcentajeRC  = row.bajas / mytotalSuma;

          // mytotalBR = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "RESICION DE CONTRATO") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "RESICION DE CONTRATO";
          myTotalesBajasA.porcentaje = totalPorcentajeRC;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "SEPARACION VOLUNTARIA"){
          var totalPorcentajeSV = 0;
          var mytotalBS = 0;

          totalPorcentajeSV  = row.bajas / mytotalSuma;

          // mytotalBS = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "SEPARACION VOLUNTARIA") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "SEPARACION VOLUNTARIA";
          myTotalesBajasA.porcentaje = totalPorcentajeSV;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "ABANDONO DE EMPLEO"){
          let totalPorcentajeAE = 0;
          var mytotalAE = 0;

          // mytotalAE = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "ABANDONO DE EMPLEO") return acc + val.bajas;
          //   return acc;
          // }, 0);

          totalPorcentajeAE = row.bajas / mytotalSuma;


          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "ABANDONO DE EMPLEO";
          myTotalesBajasA.porcentaje = totalPorcentajeAE;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "JUBILACION"){
          let totalPorcentajeJ = 0;
          var mytotalJ = 0;

          // mytotalJ = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "JUBILACION") return acc + val.bajas;
          //   return acc;
          // }, 0);

          totalPorcentajeJ = row.bajas / mytotalSuma;

       
          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "JUBILACION";
          myTotalesBajasA.porcentaje = totalPorcentajeJ;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "TERMINO DE CONTRATO"){
          let totalPorcentajeTC = 0;
          var mytotalTC = 0;

          // mytotalTC = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "TERMINO DE CONTRATO") return acc + val.bajas;
          //   return acc;
          // }, 0);

          totalPorcentajeTC = row.bajas / mytotalSuma;

         

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "TERMINO DE CONTRATO";
          myTotalesBajasA.porcentaje = totalPorcentajeTC;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "PENSION"){
          let totalPorcentajeP = 0;
          var mytotalP = 0;

          // mytotalP = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "PENSION") return acc + val.bajas;
          //   return acc;
          // }, 0);

          totalPorcentajeP = row.bajas / mytotalSuma;

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "PENSION";
          myTotalesBajasA.porcentaje = totalPorcentajeP;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }
       })

      var result = myTotalesBP.reduce((unique, o) => {
          if(!unique.some(obj => obj.motivo === o.motivo)) {
            unique.push(o);
          }
          return unique;
      },[]);
      this.bajasMA = result;
        
        this.loadingVisible = false;
         if(this.bajasMA.length == 0){
          notify({
          message: "No hay datos",
          position: {
            my: 'center',
            at: 'center',
          },
        }, 'error', 3000);
        }
      })
    }else if(period == "MEXICALI"){
      this.itemUdnMen = period;    
      this.bajasMA = [];
      this.loadingVisible = true;
      this.liquidacionService.getBajas(this.formFilter.Fecha.toISOString()).subscribe((response) => {
      var myBaja = response.data.bajasMensuales.filter((word) => word.udn == "MEXICALI");;
      var myTotalesBP = [];
      
       let mytotalSuma = response.data.bajasMensuales.reduce((acc, val) => {
        
            if (val.udn == "MEXICALI") return acc + val.bajas;
            return acc;
          }, 0);

       myBaja.forEach((row: any) =>{ 
        
        if(row.motivo == "AUSENTISMO"){
          
          var totalPorcentajeA = 0;
          

          // let mytotalBA = response.data.bajasMensuales.reduce((acc, val) => {
          //   console.log(val) 
          //   if (val.motivo == "AUSENTISMO") return acc + val.bajas;
           
          //   return acc;
          // }, 0);

          totalPorcentajeA  = row.bajas / mytotalSuma;
          

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "AUSENTISMO";
          myTotalesBajasA.porcentaje = totalPorcentajeA;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "DEFUNCION"){
          var totalPorcentajeD = 0;
          var mytotalBD = 0;

          totalPorcentajeD  = row.bajas / mytotalSuma;
          //console.log(totalPorcentajeD)

          // mytotalBD = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "DEFUNCION") return acc + val.bajas;
          //   return acc;
          // }, 0);



          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "DEFUNCION";
          myTotalesBajasA.porcentaje = totalPorcentajeD;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "OTROS"){
          var totalPorcentajeO = 0;
          var mytotalBO = 0;

          totalPorcentajeO  = row.bajas / mytotalSuma;
      
          // mytotalBO = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "OTROS") return acc + val.bajas;
          //   return acc;
          // }, 0);

         
          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "OTROS";
          myTotalesBajasA.porcentaje = totalPorcentajeO;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "RESICION DE CONTRATO"){
          var totalPorcentajeRC = 0;
          var mytotalBR = 0;

          totalPorcentajeRC  = row.bajas / mytotalSuma;

          // mytotalBR = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "RESICION DE CONTRATO") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "RESICION DE CONTRATO";
          myTotalesBajasA.porcentaje = totalPorcentajeRC;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "SEPARACION VOLUNTARIA"){
          var totalPorcentajeSV = 0;
          var mytotalBS = 0;

          totalPorcentajeSV  = row.bajas / mytotalSuma;

          // mytotalBS = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "SEPARACION VOLUNTARIA") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "SEPARACION VOLUNTARIA";
          myTotalesBajasA.porcentaje = totalPorcentajeSV;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "ABANDONO DE EMPLEO"){
          let totalPorcentajeAE = 0;
          var mytotalAE = 0;

          // mytotalAE = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "ABANDONO DE EMPLEO") return acc + val.bajas;
          //   return acc;
          // }, 0);

          totalPorcentajeAE = row.bajas / mytotalSuma;


          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "ABANDONO DE EMPLEO";
          myTotalesBajasA.porcentaje = totalPorcentajeAE;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "JUBILACION"){
          let totalPorcentajeJ = 0;
          var mytotalJ = 0;

          // mytotalJ = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "JUBILACION") return acc + val.bajas;
          //   return acc;
          // }, 0);

          totalPorcentajeJ = row.bajas / mytotalSuma;

       
          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "JUBILACION";
          myTotalesBajasA.porcentaje = totalPorcentajeJ;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "TERMINO DE CONTRATO"){
          let totalPorcentajeTC = 0;
          var mytotalTC = 0;

          // mytotalTC = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "TERMINO DE CONTRATO") return acc + val.bajas;
          //   return acc;
          // }, 0);

          totalPorcentajeTC = row.bajas / mytotalSuma;

         

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "TERMINO DE CONTRATO";
          myTotalesBajasA.porcentaje = totalPorcentajeTC;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "PENSION"){
          let totalPorcentajeP = 0;
          var mytotalP = 0;

          // mytotalP = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "PENSION") return acc + val.bajas;
          //   return acc;
          // }, 0);

          totalPorcentajeP = row.bajas / mytotalSuma;

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "PENSION";
          myTotalesBajasA.porcentaje = totalPorcentajeP;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }
       })

      var result = myTotalesBP.reduce((unique, o) => {
          if(!unique.some(obj => obj.motivo === o.motivo)) {
            unique.push(o);
          }
          return unique;
      },[]);
      this.bajasMA = result;
        
        this.loadingVisible = false;
         if(this.bajasMA.length == 0){
          notify({
          message: "No hay datos",
          position: {
            my: 'center',
            at: 'center',
          },
        }, 'error', 3000);
        }
      })
    }else if(period == "HERMOSILLO"){
      this.itemUdnMen = period;
      this.bajasMA = [];
      this.loadingVisible = true;
      this.liquidacionService.getBajas(this.formFilter.Fecha.toISOString()).subscribe((response) => {
      var myBaja = response.data.bajasMensuales.filter((word) => word.udn == "HERMOSILLO");;
      var myTotalesBP = [];
      
       let mytotalSuma = response.data.bajasMensuales.reduce((acc, val) => {
        
            if (val.udn == "HERMOSILLO") return acc + val.bajas;
            return acc;
          }, 0);

       myBaja.forEach((row: any) =>{ 
        
        if(row.motivo == "AUSENTISMO"){
          
          var totalPorcentajeA = 0;
          

          // let mytotalBA = response.data.bajasMensuales.reduce((acc, val) => {
          //   console.log(val) 
          //   if (val.motivo == "AUSENTISMO") return acc + val.bajas;
           
          //   return acc;
          // }, 0);

          totalPorcentajeA  = row.bajas / mytotalSuma;
          

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "AUSENTISMO";
          myTotalesBajasA.porcentaje = totalPorcentajeA;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "DEFUNCION"){
          var totalPorcentajeD = 0;
          var mytotalBD = 0;

          totalPorcentajeD  = row.bajas / mytotalSuma;
          //console.log(totalPorcentajeD)

          // mytotalBD = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "DEFUNCION") return acc + val.bajas;
          //   return acc;
          // }, 0);



          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "DEFUNCION";
          myTotalesBajasA.porcentaje = totalPorcentajeD;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "OTROS"){
          var totalPorcentajeO = 0;
          var mytotalBO = 0;

          totalPorcentajeO  = row.bajas / mytotalSuma;
      
          // mytotalBO = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "OTROS") return acc + val.bajas;
          //   return acc;
          // }, 0);

         
          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "OTROS";
          myTotalesBajasA.porcentaje = totalPorcentajeO;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "RESICION DE CONTRATO"){
          var totalPorcentajeRC = 0;
          var mytotalBR = 0;

          totalPorcentajeRC  = row.bajas / mytotalSuma;

          // mytotalBR = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "RESICION DE CONTRATO") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "RESICION DE CONTRATO";
          myTotalesBajasA.porcentaje = totalPorcentajeRC;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "SEPARACION VOLUNTARIA"){
          var totalPorcentajeSV = 0;
          var mytotalBS = 0;

          totalPorcentajeSV  = row.bajas / mytotalSuma;

          // mytotalBS = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "SEPARACION VOLUNTARIA") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "SEPARACION VOLUNTARIA";
          myTotalesBajasA.porcentaje = totalPorcentajeSV;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }
        if(row.motivo == "ABANDONO DE EMPLEO"){
          let totalPorcentajeAE = 0;
          var mytotalAE = 0;

          // mytotalAE = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "ABANDONO DE EMPLEO") return acc + val.bajas;
          //   return acc;
          // }, 0);

          totalPorcentajeAE = row.bajas / mytotalSuma;


          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "ABANDONO DE EMPLEO";
          myTotalesBajasA.porcentaje = totalPorcentajeAE;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "JUBILACION"){
          let totalPorcentajeJ = 0;
          var mytotalJ = 0;

          // mytotalJ = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "JUBILACION") return acc + val.bajas;
          //   return acc;
          // }, 0);

          totalPorcentajeJ = row.bajas / mytotalSuma;

       
          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "JUBILACION";
          myTotalesBajasA.porcentaje = totalPorcentajeJ;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "TERMINO DE CONTRATO"){
          let totalPorcentajeTC = 0;
          var mytotalTC = 0;

          // mytotalTC = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "TERMINO DE CONTRATO") return acc + val.bajas;
          //   return acc;
          // }, 0);

          totalPorcentajeTC = row.bajas / mytotalSuma;

         

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "TERMINO DE CONTRATO";
          myTotalesBajasA.porcentaje = totalPorcentajeTC;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "PENSION"){
          let totalPorcentajeP = 0;
          var mytotalP = 0;

          // mytotalP = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "PENSION") return acc + val.bajas;
          //   return acc;
          // }, 0);

          totalPorcentajeP = row.bajas / mytotalSuma;

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "PENSION";
          myTotalesBajasA.porcentaje = totalPorcentajeP;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }
       })

      var result = myTotalesBP.reduce((unique, o) => {
          if(!unique.some(obj => obj.motivo === o.motivo)) {
            unique.push(o);
          }
          return unique;
      },[]);
      this.bajasMA = result;
        
        this.loadingVisible = false;
         if(this.bajasMA.length == 0){
          notify({
          message: "No hay datos",
          position: {
            my: 'center',
            at: 'center',
          },
        }, 'error', 3000);
        }
      })
    }else if(period == "CUAUTITLAN"){
      this.itemUdnMen = period;
      this.bajasMA = [];
      this.loadingVisible = true;
      this.liquidacionService.getBajas(this.formFilter.Fecha.toISOString()).subscribe((response) => {
      var myBaja = response.data.bajasMensuales.filter((word) => word.udn == "CUAUTITLAN");;
      var myTotalesBP = [];
      

      let mytotalSuma = response.data.bajasMensuales.reduce((acc, val) => {
        
            if (val.udn == "CUAUTITLAN") return acc + val.bajas;
            return acc;
          }, 0);

       myBaja.forEach((row: any) =>{ 
        
        if(row.motivo == "AUSENTISMO"){
          
          var totalPorcentajeA = 0;
          

          // let mytotalBA = response.data.bajasMensuales.reduce((acc, val) => {
          //   console.log(val) 
          //   if (val.motivo == "AUSENTISMO") return acc + val.bajas;
           
          //   return acc;
          // }, 0);

          totalPorcentajeA  = row.bajas / mytotalSuma;
          

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "AUSENTISMO";
          myTotalesBajasA.porcentaje = totalPorcentajeA;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "DEFUNCION"){
          var totalPorcentajeD = 0;
          var mytotalBD = 0;

          totalPorcentajeD  = row.bajas / mytotalSuma;
          //console.log(totalPorcentajeD)

          // mytotalBD = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "DEFUNCION") return acc + val.bajas;
          //   return acc;
          // }, 0);



          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "DEFUNCION";
          myTotalesBajasA.porcentaje = totalPorcentajeD;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "OTROS"){
          var totalPorcentajeO = 0;
          var mytotalBO = 0;

          totalPorcentajeO  = row.bajas / mytotalSuma;
      
          // mytotalBO = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "OTROS") return acc + val.bajas;
          //   return acc;
          // }, 0);

         
          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "OTROS";
          myTotalesBajasA.porcentaje = totalPorcentajeO;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "RESICION DE CONTRATO"){
          var totalPorcentajeRC = 0;
          var mytotalBR = 0;

          totalPorcentajeRC  = row.bajas / mytotalSuma;

          // mytotalBR = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "RESICION DE CONTRATO") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "RESICION DE CONTRATO";
          myTotalesBajasA.porcentaje = totalPorcentajeRC;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "SEPARACION VOLUNTARIA"){
          var totalPorcentajeSV = 0;
          var mytotalBS = 0;

          totalPorcentajeSV  = row.bajas / mytotalSuma;

          // mytotalBS = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "SEPARACION VOLUNTARIA") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "SEPARACION VOLUNTARIA";
          myTotalesBajasA.porcentaje = totalPorcentajeSV;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }
        if(row.motivo == "ABANDONO DE EMPLEO"){
          let totalPorcentajeAE = 0;
          var mytotalAE = 0;

          // mytotalAE = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "ABANDONO DE EMPLEO") return acc + val.bajas;
          //   return acc;
          // }, 0);

          totalPorcentajeAE = row.bajas / mytotalSuma;


          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "ABANDONO DE EMPLEO";
          myTotalesBajasA.porcentaje = totalPorcentajeAE;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "JUBILACION"){
          let totalPorcentajeJ = 0;
          var mytotalJ = 0;

          // mytotalJ = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "JUBILACION") return acc + val.bajas;
          //   return acc;
          // }, 0);

          totalPorcentajeJ = row.bajas / mytotalSuma;

       
          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "JUBILACION";
          myTotalesBajasA.porcentaje = totalPorcentajeJ;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "TERMINO DE CONTRATO"){
          let totalPorcentajeTC = 0;
          var mytotalTC = 0;

          // mytotalTC = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "TERMINO DE CONTRATO") return acc + val.bajas;
          //   return acc;
          // }, 0);

          totalPorcentajeTC = row.bajas / mytotalSuma;

         

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "TERMINO DE CONTRATO";
          myTotalesBajasA.porcentaje = totalPorcentajeTC;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "PENSION"){
          let totalPorcentajeP = 0;
          var mytotalP = 0;

          // mytotalP = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "PENSION") return acc + val.bajas;
          //   return acc;
          // }, 0);

          totalPorcentajeP = row.bajas / mytotalSuma;

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "PENSION";
          myTotalesBajasA.porcentaje = totalPorcentajeP;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }
       })

      var result = myTotalesBP.reduce((unique, o) => {
          if(!unique.some(obj => obj.motivo === o.motivo)) {
            unique.push(o);
          }
          return unique;
      },[]);
      this.bajasMA = result;
        
        this.loadingVisible = false;
         if(this.bajasMA.length == 0){
          notify({
          message: "No hay datos",
          position: {
            my: 'center',
            at: 'center',
          },
        }, 'error', 3000);
        }
      })
    }else if(period == "TULTITLAN"){  
      this.itemUdnMen = period;
      this.bajasMA = [];
      this.loadingVisible = true;
      this.liquidacionService.getBajas(this.formFilter.Fecha.toISOString()).subscribe((response) => {
      var myBaja = response.data.bajasMensuales.filter((word) => word.udn == "TULTITLAN");;
      var myTotalesBP = [];
      
       let mytotalSuma = response.data.bajasMensuales.reduce((acc, val) => {
        
            if (val.udn == "TULTITLAN") return acc + val.bajas;
            return acc;
          }, 0);

       myBaja.forEach((row: any) =>{ 
        
        if(row.motivo == "AUSENTISMO"){
          
          var totalPorcentajeA = 0;
          

          // let mytotalBA = response.data.bajasMensuales.reduce((acc, val) => {
          //   console.log(val) 
          //   if (val.motivo == "AUSENTISMO") return acc + val.bajas;
           
          //   return acc;
          // }, 0);

          totalPorcentajeA  = row.bajas / mytotalSuma;
          

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "AUSENTISMO";
          myTotalesBajasA.porcentaje = totalPorcentajeA;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "DEFUNCION"){
          var totalPorcentajeD = 0;
          var mytotalBD = 0;

          totalPorcentajeD  = row.bajas / mytotalSuma;
          //console.log(totalPorcentajeD)

          // mytotalBD = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "DEFUNCION") return acc + val.bajas;
          //   return acc;
          // }, 0);



          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "DEFUNCION";
          myTotalesBajasA.porcentaje = totalPorcentajeD;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "OTROS"){
          var totalPorcentajeO = 0;
          var mytotalBO = 0;

          totalPorcentajeO  = row.bajas / mytotalSuma;
      
          // mytotalBO = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "OTROS") return acc + val.bajas;
          //   return acc;
          // }, 0);

         
          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "OTROS";
          myTotalesBajasA.porcentaje = totalPorcentajeO;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "RESICION DE CONTRATO"){
          var totalPorcentajeRC = 0;
          var mytotalBR = 0;

          totalPorcentajeRC  = row.bajas / mytotalSuma;

          // mytotalBR = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "RESICION DE CONTRATO") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "RESICION DE CONTRATO";
          myTotalesBajasA.porcentaje = totalPorcentajeRC;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "SEPARACION VOLUNTARIA"){
          var totalPorcentajeSV = 0;
          var mytotalBS = 0;

          totalPorcentajeSV  = row.bajas / mytotalSuma;

          // mytotalBS = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "SEPARACION VOLUNTARIA") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "SEPARACION VOLUNTARIA";
          myTotalesBajasA.porcentaje = totalPorcentajeSV;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }
        if(row.motivo == "ABANDONO DE EMPLEO"){
          let totalPorcentajeAE = 0;
          var mytotalAE = 0;

          // mytotalAE = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "ABANDONO DE EMPLEO") return acc + val.bajas;
          //   return acc;
          // }, 0);

          totalPorcentajeAE = row.bajas / mytotalSuma;


          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "ABANDONO DE EMPLEO";
          myTotalesBajasA.porcentaje = totalPorcentajeAE;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "JUBILACION"){
          let totalPorcentajeJ = 0;
          var mytotalJ = 0;

          // mytotalJ = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "JUBILACION") return acc + val.bajas;
          //   return acc;
          // }, 0);

          totalPorcentajeJ = row.bajas / mytotalSuma;

       
          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "JUBILACION";
          myTotalesBajasA.porcentaje = totalPorcentajeJ;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "TERMINO DE CONTRATO"){
          let totalPorcentajeTC = 0;
          var mytotalTC = 0;

          // mytotalTC = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "TERMINO DE CONTRATO") return acc + val.bajas;
          //   return acc;
          // }, 0);

          totalPorcentajeTC = row.bajas / mytotalSuma;

         

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "TERMINO DE CONTRATO";
          myTotalesBajasA.porcentaje = totalPorcentajeTC;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "PENSION"){
          let totalPorcentajeP = 0;
          var mytotalP = 0;

          // mytotalP = response.data.bajasMensuales.reduce((acc, val) => {
          //   if (val.motivo == "PENSION") return acc + val.bajas;
          //   return acc;
          // }, 0);

          totalPorcentajeP = row.bajas / mytotalSuma;

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "PENSION";
          myTotalesBajasA.porcentaje = totalPorcentajeP;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }
       })

      var result = myTotalesBP.reduce((unique, o) => {
          if(!unique.some(obj => obj.motivo === o.motivo)) {
            unique.push(o);
          }
          return unique;
      },[]);
      this.bajasMA = result;
        
        this.loadingVisible = false;
         if(this.bajasMA.length == 0){
          notify({
          message: "No hay datos",
          position: {
            my: 'center',
            at: 'center',
          },
        }, 'error', 3000);
        }
      })
    }
  }
  
  selectionUdnAnu({item: period}: any) {
      console.log("ANUAL")
    if(period == "TODOS"){
      this.itemUdnAanu = period;
      this.bajasMA = [];
      this.loadingVisible = true;
      this.liquidacionService.getBajas(this.formFilter.Fecha.toISOString()).subscribe((response) => {
         var myBaja = response.data.bajasAnuales;
      var myTotalesBP = [];
      
        myBaja.forEach((row: any) =>{ 

        if(row.motivo == "AUSENTISMO"){
          
          var mytotalBA = 0;
          mytotalBA = response.data.bajasAnuales.reduce((acc, val) => {
            if (val.motivo == "AUSENTISMO") return acc + val.bajas;
            return acc;
          }, 0);

          var mytotalPA = 0;
          mytotalPA = response.data.bajasAnuales.reduce((acc, val) => {
            if (val.motivo == "AUSENTISMO") return acc + val.porcentaje;
            return acc;
          }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = mytotalBA;
          myTotalesBajasA.motivo = "AUSENTISMO";
          myTotalesBajasA.porcentaje = mytotalPA;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "DEFUNCION"){
          
          var mytotalBD = 0;
          mytotalBD = response.data.bajasAnuales.reduce((acc, val) => {
            if (val.motivo == "DEFUNCION") return acc + val.bajas;
            return acc;
          }, 0);

          var mytotalPD = 0;
          mytotalPD = response.data.bajasAnuales.reduce((acc, val) => {
            if (val.motivo == "DEFUNCION") return acc + val.porcentaje;
            return acc;
          }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = mytotalBD;
          myTotalesBajasA.motivo = "DEFUNCION";
          myTotalesBajasA.porcentaje = mytotalPD;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "OTROS"){
          
          var mytotalBO = 0;
          mytotalBO = response.data.bajasAnuales.reduce((acc, val) => {
            if (val.motivo == "OTROS") return acc + val.bajas;
            return acc;
          }, 0);

          var mytotalPO = 0;
          mytotalPO = response.data.bajasAnuales.reduce((acc, val) => {
            if (val.motivo == "OTROS") return acc + val.porcentaje;
            return acc;
          }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = mytotalBO;
          myTotalesBajasA.motivo = "OTROS";
          myTotalesBajasA.porcentaje = mytotalPO;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "RESICION DE CONTRATO"){
          
          var mytotalBR = 0;
          mytotalBR = response.data.bajasAnuales.reduce((acc, val) => {
            if (val.motivo == "RESICION DE CONTRATO") return acc + val.bajas;
            return acc;
          }, 0);

          var mytotalPR = 0;
          mytotalPR = response.data.bajasAnuales.reduce((acc, val) => {
            if (val.motivo == "RESICION DE CONTRATO") return acc + val.porcentaje;
            return acc;
          }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = mytotalBR;
          myTotalesBajasA.motivo = "RESICION DE CONTRATO";
          myTotalesBajasA.porcentaje = mytotalPR;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "SEPARACION VOLUNTARIA"){
          
          var mytotalBS = 0;
          mytotalBS = response.data.bajasAnuales.reduce((acc, val) => {
            if (val.motivo == "SEPARACION VOLUNTARIA") return acc + val.bajas;
            return acc;
          }, 0);

          var mytotalPS = 0;
          mytotalPS = response.data.bajasAnuales.reduce((acc, val) => {
            if (val.motivo == "SEPARACION VOLUNTARIA") return acc + val.porcentaje;
            return acc;
          }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = mytotalBS;
          myTotalesBajasA.motivo = "SEPARACION VOLUNTARIA";
          myTotalesBajasA.porcentaje = mytotalPS;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "ABANDONO DE EMPLEO"){
          
          var mytotalBAE = 0;
          mytotalBAE = response.data.bajasAnuales.reduce((acc, val) => {
            if (val.motivo == "ABANDONO DE EMPLEO") return acc + val.bajas;
            return acc;
          }, 0);

          var mytotalPAE = 0;
          mytotalPAE = response.data.bajasAnuales.reduce((acc, val) => {
            if (val.motivo == "ABANDONO DE EMPLEO") return acc + val.porcentaje;
            return acc;
          }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = mytotalBAE;
          myTotalesBajasA.motivo = "ABANDONO DE EMPLEO";
          myTotalesBajasA.porcentaje = mytotalPAE;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "JUBILACION"){
          
          var mytotalJ = 0;
          mytotalJ = response.data.bajasAnuales.reduce((acc, val) => {
            if (val.motivo == "JUBILACION") return acc + val.bajas;
            return acc;
          }, 0);

          var mytotalPJ = 0;
          mytotalPJ = response.data.bajasAnuales.reduce((acc, val) => {
            if (val.motivo == "JUBILACION") return acc + val.porcentaje;
            return acc;
          }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = mytotalJ;
          myTotalesBajasA.motivo = "JUBILACION";
          myTotalesBajasA.porcentaje = mytotalPJ;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "PENSION"){  
          
          var mytotalP = 0;
          mytotalP = response.data.bajasAnuales.reduce((acc, val) => {
            if (val.motivo == "PENSION") return acc + val.bajas;
            return acc;
          }, 0);

          var mytotalPP = 0;
          mytotalPP = response.data.bajasAnuales.reduce((acc, val) => {
            if (val.motivo == "PENSION") return acc + val.porcentaje;
            return acc;
          }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = mytotalP;
          myTotalesBajasA.motivo = "PENSION";
          myTotalesBajasA.porcentaje = mytotalPP;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "TERMINO DE CONTRATO"){  
          
          var mytotalT = 0;
          mytotalT = response.data.bajasAnuales.reduce((acc, val) => {
            if (val.motivo == "TERMINO DE CONTRATO") return acc + val.bajas;
            return acc;
          }, 0);

          var mytotalPT = 0;
          mytotalPT = response.data.bajasAnuales.reduce((acc, val) => {
            if (val.motivo == "TERMINO DE CONTRATO") return acc + val.porcentaje;
            return acc;
          }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = mytotalT;
          myTotalesBajasA.motivo = "TERMINO DE CONTRATO";
          myTotalesBajasA.porcentaje = mytotalPT;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }
       })

      var result = myTotalesBP.reduce((unique, o) => {
          if(!unique.some(obj => obj.motivo === o.motivo)) {
            unique.push(o);
          }
          return unique;
      },[]);
      this.bajasMA = result;
      console.log(response.data.bajasAnuales)
        this.loadingVisible = false;
      })
    }else if(period == "ORIZABA"){
      this.itemUdnAanu = period;
      this.bajasMA = [];
      this.loadingVisible = true;
      this.liquidacionService.getBajas(this.formFilter.Fecha.toISOString()).subscribe((response) => {
      var myBaja = response.data.bajasAnuales.filter((word) => word.udn == "ORIZABA");;
      var myTotalesBP = [];
      
      let mytotalSuma = response.data.bajasAnuales.reduce((acc, val) => {
            if (val.udn == "ORIZABA") return acc + val.bajas;
            return acc;
      }, 0);

       myBaja.forEach((row: any) =>{ 
        
        //console.log(row )
        if(row.motivo == "AUSENTISMO"){
          
          var totalPorcentajeA = 0;
          var mytotalBA = 0;


          totalPorcentajeA  = row.bajas / mytotalSuma;
          //console.log(totalPorcentajeA)

          // mytotalBA = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "AUSENTISMO") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "AUSENTISMO";
          myTotalesBajasA.porcentaje = totalPorcentajeA;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "DEFUNCION"){
          var totalPorcentajeD = 0;
          var mytotalBD = 0;

          totalPorcentajeD  = row.bajas / mytotalSuma;
          //console.log(totalPorcentajeD)

          // mytotalBD = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "DEFUNCION") return acc + val.bajas;
          //   return acc;
          // }, 0);



          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "DEFUNCION";
          myTotalesBajasA.porcentaje = totalPorcentajeD;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "OTROS"){
          var totalPorcentajeO = 0;
          var mytotalBO = 0;

          totalPorcentajeO  = row.bajas / mytotalSuma;
      
          // mytotalBO = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "OTROS") return acc + val.bajas;
          //   return acc;
          // }, 0);

         
          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "OTROS";
          myTotalesBajasA.porcentaje = totalPorcentajeO;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "RESICION DE CONTRATO"){
          var totalPorcentajeRC = 0;
          var mytotalBR = 0;

          totalPorcentajeRC  = row.bajas / mytotalSuma;

          // mytotalBR = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "RESICION DE CONTRATO") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "RESICION DE CONTRATO";
          myTotalesBajasA.porcentaje = totalPorcentajeRC;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "SEPARACION VOLUNTARIA"){
          var totalPorcentajeSV = 0;
          var mytotalBS = 0;

          totalPorcentajeSV  = row.bajas / mytotalSuma;

          // mytotalBS = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "SEPARACION VOLUNTARIA") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "SEPARACION VOLUNTARIA";
          myTotalesBajasA.porcentaje = totalPorcentajeSV;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "ABANDONO DE EMPLEO"){
          var totalPorcentajeAE = 0;
          var mytotalBAE = 0;

          totalPorcentajeAE  = row.bajas / mytotalSuma;

          // mytotalBAE = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "ABANDONO DE EMPLEO") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "ABANDONO DE EMPLEO";
          myTotalesBajasA.porcentaje = totalPorcentajeAE;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "JUBILACION"){
          var totalPorcentajeJ = 0;
          var mytotalJ = 0;

          totalPorcentajeJ  = row.bajas / mytotalSuma;

          // mytotalJ = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "JUBILACION") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "JUBILACION";
          myTotalesBajasA.porcentaje = totalPorcentajeJ;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "PENSION"){  
          var totalPorcentajeP = 0;
          var mytotalP = 0;

          totalPorcentajeP  = row.bajas / mytotalSuma;

          // mytotalP = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "PENSION") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "PENSION";
          myTotalesBajasA.porcentaje = totalPorcentajeP;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "TERMINO DE CONTRATO"){  
          var totalPorcentajeTC = 0;
          var mytotalT = 0;

          totalPorcentajeTC  = row.bajas / mytotalSuma;

          // mytotalT = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "TERMINO DE CONTRATO") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "TERMINO DE CONTRATO";
          myTotalesBajasA.porcentaje = totalPorcentajeTC;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }
       })

      var result = myTotalesBP.reduce((unique, o) => {
          if(!unique.some(obj => obj.motivo === o.motivo)) {
            unique.push(o);
          }
          return unique;
      },[]);
      this.bajasMA = result;
        
        this.loadingVisible = false;
         if(this.bajasMA.length == 0){
          notify({
          message: "No hay datos",
          position: {
            my: 'center',
            at: 'center',
          },
        }, 'error', 3000);
        }
    })
    }else if(period == "GUADALAJARA"){
      this.itemUdnAanu = period;
      this.bajasMA = [];
      this.loadingVisible = true;
      this.liquidacionService.getBajas(this.formFilter.Fecha.toISOString()).subscribe((response) => {
      var myBaja = response.data.bajasAnuales.filter((word) => word.udn == "GUADALAJARA");;
      var myTotalesBP = [];
      
       let mytotalSuma = response.data.bajasAnuales.reduce((acc, val) => {
            if (val.udn == "GUADALAJARA") return acc + val.bajas;
            return acc;
      }, 0);

       myBaja.forEach((row: any) =>{ 
        
        console.log(row )
        if(row.motivo == "AUSENTISMO"){
          
          var totalPorcentajeA = 0;
          var mytotalBA = 0;


          totalPorcentajeA  = row.bajas / mytotalSuma;
          //console.log(totalPorcentajeA)

          // mytotalBA = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "AUSENTISMO") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "AUSENTISMO";
          myTotalesBajasA.porcentaje = totalPorcentajeA;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "DEFUNCION"){
          var totalPorcentajeD = 0;
          var mytotalBD = 0;

          totalPorcentajeD  = row.bajas / mytotalSuma;
          //console.log(totalPorcentajeD)

          // mytotalBD = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "DEFUNCION") return acc + val.bajas;
          //   return acc;
          // }, 0);



          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "DEFUNCION";
          myTotalesBajasA.porcentaje = totalPorcentajeD;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "OTROS"){
          var totalPorcentajeO = 0;
          var mytotalBO = 0;

          totalPorcentajeO  = row.bajas / mytotalSuma;
      
          // mytotalBO = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "OTROS") return acc + val.bajas;
          //   return acc;
          // }, 0);

         
          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "OTROS";
          myTotalesBajasA.porcentaje = totalPorcentajeO;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "RESICION DE CONTRATO"){
          var totalPorcentajeRC = 0;
          var mytotalBR = 0;

          totalPorcentajeRC  = row.bajas / mytotalSuma;

          // mytotalBR = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "RESICION DE CONTRATO") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "RESICION DE CONTRATO";
          myTotalesBajasA.porcentaje = totalPorcentajeRC;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "SEPARACION VOLUNTARIA"){
          var totalPorcentajeSV = 0;
          var mytotalBS = 0;

          totalPorcentajeSV  = row.bajas / mytotalSuma;

          // mytotalBS = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "SEPARACION VOLUNTARIA") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "SEPARACION VOLUNTARIA";
          myTotalesBajasA.porcentaje = totalPorcentajeSV;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "ABANDONO DE EMPLEO"){
          var totalPorcentajeAE = 0;
          var mytotalBAE = 0;

          totalPorcentajeAE  = row.bajas / mytotalSuma;

          // mytotalBAE = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "ABANDONO DE EMPLEO") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "ABANDONO DE EMPLEO";
          myTotalesBajasA.porcentaje = totalPorcentajeAE;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "JUBILACION"){
          var totalPorcentajeJ = 0;
          var mytotalJ = 0;

          totalPorcentajeJ  = row.bajas / mytotalSuma;

          // mytotalJ = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "JUBILACION") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "JUBILACION";
          myTotalesBajasA.porcentaje = totalPorcentajeJ;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "PENSION"){  
          var totalPorcentajeP = 0;
          var mytotalP = 0;

          totalPorcentajeP  = row.bajas / mytotalSuma;

          // mytotalP = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "PENSION") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "PENSION";
          myTotalesBajasA.porcentaje = totalPorcentajeP;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "TERMINO DE CONTRATO"){  
          var totalPorcentajeTC = 0;
          var mytotalT = 0;

          totalPorcentajeTC  = row.bajas / mytotalSuma;

          // mytotalT = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "TERMINO DE CONTRATO") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "TERMINO DE CONTRATO";
          myTotalesBajasA.porcentaje = totalPorcentajeTC;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }
       })

      var result = myTotalesBP.reduce((unique, o) => {
          if(!unique.some(obj => obj.motivo === o.motivo)) {
            unique.push(o);
          }
          return unique;
      },[]);
      this.bajasMA = result;
        
        this.loadingVisible = false;
         if(this.bajasMA.length == 0){
          notify({
          message: "No hay datos",
          position: {
            my: 'center',
            at: 'center',
          },
        }, 'error', 3000);
        }
      })
    }else if(period == "RAMOS ARIZPE"){
      this.itemUdnAanu = period;
      this.bajasMA = [];
      this.loadingVisible = true;
      this.liquidacionService.getBajas(this.formFilter.Fecha.toISOString()).subscribe((response) => {
      var myBaja = response.data.bajasAnuales.filter((word) => word.udn == "RAMOS ARIZPE");;
      var myTotalesBP = [];
      
       let mytotalSuma = response.data.bajasAnuales.reduce((acc, val) => {
            if (val.udn == "RAMOS ARIZPE") return acc + val.bajas;
            return acc;
      }, 0);

       myBaja.forEach((row: any) =>{ 
        
        console.log(row )
        if(row.motivo == "AUSENTISMO"){
          
          var totalPorcentajeA = 0;
          var mytotalBA = 0;


          totalPorcentajeA  = row.bajas / mytotalSuma;
          //console.log(totalPorcentajeA)

          // mytotalBA = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "AUSENTISMO") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "AUSENTISMO";
          myTotalesBajasA.porcentaje = totalPorcentajeA;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "DEFUNCION"){
          var totalPorcentajeD = 0;
          var mytotalBD = 0;

          totalPorcentajeD  = row.bajas / mytotalSuma;
          //console.log(totalPorcentajeD)

          // mytotalBD = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "DEFUNCION") return acc + val.bajas;
          //   return acc;
          // }, 0);



          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "DEFUNCION";
          myTotalesBajasA.porcentaje = totalPorcentajeD;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "OTROS"){
          var totalPorcentajeO = 0;
          var mytotalBO = 0;

          totalPorcentajeO  = row.bajas / mytotalSuma;
      
          // mytotalBO = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "OTROS") return acc + val.bajas;
          //   return acc;
          // }, 0);

         
          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "OTROS";
          myTotalesBajasA.porcentaje = totalPorcentajeO;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "RESICION DE CONTRATO"){
          var totalPorcentajeRC = 0;
          var mytotalBR = 0;

          totalPorcentajeRC  = row.bajas / mytotalSuma;

          // mytotalBR = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "RESICION DE CONTRATO") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "RESICION DE CONTRATO";
          myTotalesBajasA.porcentaje = totalPorcentajeRC;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "SEPARACION VOLUNTARIA"){
          var totalPorcentajeSV = 0;
          var mytotalBS = 0;

          totalPorcentajeSV  = row.bajas / mytotalSuma;

          // mytotalBS = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "SEPARACION VOLUNTARIA") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "SEPARACION VOLUNTARIA";
          myTotalesBajasA.porcentaje = totalPorcentajeSV;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "ABANDONO DE EMPLEO"){
          var totalPorcentajeAE = 0;
          var mytotalBAE = 0;

          totalPorcentajeAE  = row.bajas / mytotalSuma;

          // mytotalBAE = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "ABANDONO DE EMPLEO") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "ABANDONO DE EMPLEO";
          myTotalesBajasA.porcentaje = totalPorcentajeAE;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "JUBILACION"){
          var totalPorcentajeJ = 0;
          var mytotalJ = 0;

          totalPorcentajeJ  = row.bajas / mytotalSuma;

          // mytotalJ = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "JUBILACION") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "JUBILACION";
          myTotalesBajasA.porcentaje = totalPorcentajeJ;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "PENSION"){  
          var totalPorcentajeP = 0;
          var mytotalP = 0;

          totalPorcentajeP  = row.bajas / mytotalSuma;

          // mytotalP = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "PENSION") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "PENSION";
          myTotalesBajasA.porcentaje = totalPorcentajeP;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "TERMINO DE CONTRATO"){  
          var totalPorcentajeTC = 0;
          var mytotalT = 0;

          totalPorcentajeTC  = row.bajas / mytotalSuma;

          // mytotalT = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "TERMINO DE CONTRATO") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "TERMINO DE CONTRATO";
          myTotalesBajasA.porcentaje = totalPorcentajeTC;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }
       })

      var result = myTotalesBP.reduce((unique, o) => {
          if(!unique.some(obj => obj.motivo === o.motivo)) {
            unique.push(o);
          }
          return unique;
      },[]);
      this.bajasMA = result;
        
        this.loadingVisible = false;
         if(this.bajasMA.length == 0){
          notify({
          message: "No hay datos",
          position: {
            my: 'center',
            at: 'center',
          },
        }, 'error', 3000);
        }
      })
    }else if(period == "MEXICALI"){
      this.itemUdnAanu = period;
      this.bajasMA = [];
      this.loadingVisible = true;
      this.liquidacionService.getBajas(this.formFilter.Fecha.toISOString()).subscribe((response) => {
      var myBaja = response.data.bajasAnuales.filter((word) => word.udn == "MEXICALI");;
      var myTotalesBP = [];
      
       let mytotalSuma = response.data.bajasAnuales.reduce((acc, val) => {
            if (val.udn == "MEXICALI") return acc + val.bajas;
            return acc;
      }, 0);

       myBaja.forEach((row: any) =>{ 
        
        console.log(row )
        if(row.motivo == "AUSENTISMO"){
          
          var totalPorcentajeA = 0;
          var mytotalBA = 0;


          totalPorcentajeA  = row.bajas / mytotalSuma;
          //console.log(totalPorcentajeA)

          // mytotalBA = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "AUSENTISMO") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "AUSENTISMO";
          myTotalesBajasA.porcentaje = totalPorcentajeA;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "DEFUNCION"){
          var totalPorcentajeD = 0;
          var mytotalBD = 0;

          totalPorcentajeD  = row.bajas / mytotalSuma;
          //console.log(totalPorcentajeD)

          // mytotalBD = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "DEFUNCION") return acc + val.bajas;
          //   return acc;
          // }, 0);



          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "DEFUNCION";
          myTotalesBajasA.porcentaje = totalPorcentajeD;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "OTROS"){
          var totalPorcentajeO = 0;
          var mytotalBO = 0;

          totalPorcentajeO  = row.bajas / mytotalSuma;
      
          // mytotalBO = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "OTROS") return acc + val.bajas;
          //   return acc;
          // }, 0);

         
          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "OTROS";
          myTotalesBajasA.porcentaje = totalPorcentajeO;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "RESICION DE CONTRATO"){
          var totalPorcentajeRC = 0;
          var mytotalBR = 0;

          totalPorcentajeRC  = row.bajas / mytotalSuma;

          // mytotalBR = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "RESICION DE CONTRATO") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "RESICION DE CONTRATO";
          myTotalesBajasA.porcentaje = totalPorcentajeRC;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "SEPARACION VOLUNTARIA"){
          var totalPorcentajeSV = 0;
          var mytotalBS = 0;

          totalPorcentajeSV  = row.bajas / mytotalSuma;

          // mytotalBS = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "SEPARACION VOLUNTARIA") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "SEPARACION VOLUNTARIA";
          myTotalesBajasA.porcentaje = totalPorcentajeSV;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "ABANDONO DE EMPLEO"){
          var totalPorcentajeAE = 0;
          var mytotalBAE = 0;

          totalPorcentajeAE  = row.bajas / mytotalSuma;

          // mytotalBAE = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "ABANDONO DE EMPLEO") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "ABANDONO DE EMPLEO";
          myTotalesBajasA.porcentaje = totalPorcentajeAE;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "JUBILACION"){
          var totalPorcentajeJ = 0;
          var mytotalJ = 0;

          totalPorcentajeJ  = row.bajas / mytotalSuma;

          // mytotalJ = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "JUBILACION") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "JUBILACION";
          myTotalesBajasA.porcentaje = totalPorcentajeJ;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "PENSION"){  
          var totalPorcentajeP = 0;
          var mytotalP = 0;

          totalPorcentajeP  = row.bajas / mytotalSuma;

          // mytotalP = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "PENSION") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "PENSION";
          myTotalesBajasA.porcentaje = totalPorcentajeP;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "TERMINO DE CONTRATO"){  
          var totalPorcentajeTC = 0;
          var mytotalT = 0;

          totalPorcentajeTC  = row.bajas / mytotalSuma;

          // mytotalT = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "TERMINO DE CONTRATO") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "TERMINO DE CONTRATO";
          myTotalesBajasA.porcentaje = totalPorcentajeTC;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }
       })

      var result = myTotalesBP.reduce((unique, o) => {
          if(!unique.some(obj => obj.motivo === o.motivo)) {
            unique.push(o);
          }
          return unique;
      },[]);
      this.bajasMA = result;
        
        this.loadingVisible = false;
         if(this.bajasMA.length == 0){
          notify({
          message: "No hay datos",
          position: {
            my: 'center',
            at: 'center',
          },
        }, 'error', 3000);
        }
      })
    }else if(period == "HERMOSILLO"){
      this.itemUdnAanu = period;
      this.bajasMA = [];
      this.loadingVisible = true;
      this.liquidacionService.getBajas(this.formFilter.Fecha.toISOString()).subscribe((response) => {
      var myBaja = response.data.bajasAnuales.filter((word) => word.udn == "HERMOSILLO");;
      var myTotalesBP = [];
      
      let mytotalSuma = response.data.bajasAnuales.reduce((acc, val) => {
            if (val.udn == "HERMOSILLO") return acc + val.bajas;
            return acc;
      }, 0);

       myBaja.forEach((row: any) =>{ 
        
        console.log(row )
        if(row.motivo == "AUSENTISMO"){
          
          var totalPorcentajeA = 0;
          var mytotalBA = 0;


          totalPorcentajeA  = row.bajas / mytotalSuma;
          //console.log(totalPorcentajeA)

          // mytotalBA = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "AUSENTISMO") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "AUSENTISMO";
          myTotalesBajasA.porcentaje = totalPorcentajeA;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "DEFUNCION"){
          var totalPorcentajeD = 0;
          var mytotalBD = 0;

          totalPorcentajeD  = row.bajas / mytotalSuma;
          //console.log(totalPorcentajeD)

          // mytotalBD = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "DEFUNCION") return acc + val.bajas;
          //   return acc;
          // }, 0);



          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "DEFUNCION";
          myTotalesBajasA.porcentaje = totalPorcentajeD;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "OTROS"){
          var totalPorcentajeO = 0;
          var mytotalBO = 0;

          totalPorcentajeO  = row.bajas / mytotalSuma;
      
          // mytotalBO = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "OTROS") return acc + val.bajas;
          //   return acc;
          // }, 0);

         
          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "OTROS";
          myTotalesBajasA.porcentaje = totalPorcentajeO;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "RESICION DE CONTRATO"){
          var totalPorcentajeRC = 0;
          var mytotalBR = 0;

          totalPorcentajeRC  = row.bajas / mytotalSuma;

          // mytotalBR = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "RESICION DE CONTRATO") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "RESICION DE CONTRATO";
          myTotalesBajasA.porcentaje = totalPorcentajeRC;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "SEPARACION VOLUNTARIA"){
          var totalPorcentajeSV = 0;
          var mytotalBS = 0;

          totalPorcentajeSV  = row.bajas / mytotalSuma;

          // mytotalBS = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "SEPARACION VOLUNTARIA") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "SEPARACION VOLUNTARIA";
          myTotalesBajasA.porcentaje = totalPorcentajeSV;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "ABANDONO DE EMPLEO"){
          var totalPorcentajeAE = 0;
          var mytotalBAE = 0;

          totalPorcentajeAE  = row.bajas / mytotalSuma;

          // mytotalBAE = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "ABANDONO DE EMPLEO") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "ABANDONO DE EMPLEO";
          myTotalesBajasA.porcentaje = totalPorcentajeAE;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "JUBILACION"){
          var totalPorcentajeJ = 0;
          var mytotalJ = 0;

          totalPorcentajeJ  = row.bajas / mytotalSuma;

          // mytotalJ = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "JUBILACION") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "JUBILACION";
          myTotalesBajasA.porcentaje = totalPorcentajeJ;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "PENSION"){  
          var totalPorcentajeP = 0;
          var mytotalP = 0;

          totalPorcentajeP  = row.bajas / mytotalSuma;

          // mytotalP = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "PENSION") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "PENSION";
          myTotalesBajasA.porcentaje = totalPorcentajeP;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "TERMINO DE CONTRATO"){  
          var totalPorcentajeTC = 0;
          var mytotalT = 0;

          totalPorcentajeTC  = row.bajas / mytotalSuma;

          // mytotalT = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "TERMINO DE CONTRATO") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "TERMINO DE CONTRATO";
          myTotalesBajasA.porcentaje = totalPorcentajeTC;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }
       })

      var result = myTotalesBP.reduce((unique, o) => {
          if(!unique.some(obj => obj.motivo === o.motivo)) {
            unique.push(o);
          }
          return unique;
      },[]);
      this.bajasMA = result;
        
        this.loadingVisible = false;
         if(this.bajasMA.length == 0){
          notify({
          message: "No hay datos",
          position: {
            my: 'center',
            at: 'center',
          },
        }, 'error', 3000);
        }
      })
    }else if(period == "CUAUTITLAN"){
      this.itemUdnAanu = period;
      this.bajasMA = [];
      this.loadingVisible = true;
      this.liquidacionService.getBajas(this.formFilter.Fecha.toISOString()).subscribe((response) => {
      var myBaja = response.data.bajasAnuales.filter((word) => word.udn == "CUAUTITLAN");;
      var myTotalesBP = [];
      
       let mytotalSuma = response.data.bajasAnuales.reduce((acc, val) => {
            if (val.udn == "CUAUTITLAN") return acc + val.bajas;
            return acc;
      }, 0);

       myBaja.forEach((row: any) =>{ 
        
        console.log(row )
        if(row.motivo == "AUSENTISMO"){
          
          var totalPorcentajeA = 0;
          var mytotalBA = 0;


          totalPorcentajeA  = row.bajas / mytotalSuma;
          //console.log(totalPorcentajeA)

          // mytotalBA = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "AUSENTISMO") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "AUSENTISMO";
          myTotalesBajasA.porcentaje = totalPorcentajeA;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "DEFUNCION"){
          var totalPorcentajeD = 0;
          var mytotalBD = 0;

          totalPorcentajeD  = row.bajas / mytotalSuma;
          //console.log(totalPorcentajeD)

          // mytotalBD = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "DEFUNCION") return acc + val.bajas;
          //   return acc;
          // }, 0);



          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "DEFUNCION";
          myTotalesBajasA.porcentaje = totalPorcentajeD;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "OTROS"){
          var totalPorcentajeO = 0;
          var mytotalBO = 0;

          totalPorcentajeO  = row.bajas / mytotalSuma;
      
          // mytotalBO = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "OTROS") return acc + val.bajas;
          //   return acc;
          // }, 0);

         
          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "OTROS";
          myTotalesBajasA.porcentaje = totalPorcentajeO;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "RESICION DE CONTRATO"){
          var totalPorcentajeRC = 0;
          var mytotalBR = 0;

          totalPorcentajeRC  = row.bajas / mytotalSuma;

          // mytotalBR = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "RESICION DE CONTRATO") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "RESICION DE CONTRATO";
          myTotalesBajasA.porcentaje = totalPorcentajeRC;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "SEPARACION VOLUNTARIA"){
          var totalPorcentajeSV = 0;
          var mytotalBS = 0;

          totalPorcentajeSV  = row.bajas / mytotalSuma;

          // mytotalBS = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "SEPARACION VOLUNTARIA") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "SEPARACION VOLUNTARIA";
          myTotalesBajasA.porcentaje = totalPorcentajeSV;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "ABANDONO DE EMPLEO"){
          var totalPorcentajeAE = 0;
          var mytotalBAE = 0;

          totalPorcentajeAE  = row.bajas / mytotalSuma;

          // mytotalBAE = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "ABANDONO DE EMPLEO") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "ABANDONO DE EMPLEO";
          myTotalesBajasA.porcentaje = totalPorcentajeAE;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "JUBILACION"){
          var totalPorcentajeJ = 0;
          var mytotalJ = 0;

          totalPorcentajeJ  = row.bajas / mytotalSuma;

          // mytotalJ = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "JUBILACION") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "JUBILACION";
          myTotalesBajasA.porcentaje = totalPorcentajeJ;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "PENSION"){  
          var totalPorcentajeP = 0;
          var mytotalP = 0;

          totalPorcentajeP  = row.bajas / mytotalSuma;

          // mytotalP = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "PENSION") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "PENSION";
          myTotalesBajasA.porcentaje = totalPorcentajeP;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "TERMINO DE CONTRATO"){  
          var totalPorcentajeTC = 0;
          var mytotalT = 0;

          totalPorcentajeTC  = row.bajas / mytotalSuma;

          // mytotalT = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "TERMINO DE CONTRATO") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "TERMINO DE CONTRATO";
          myTotalesBajasA.porcentaje = totalPorcentajeTC;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }
       })

      var result = myTotalesBP.reduce((unique, o) => {
          if(!unique.some(obj => obj.motivo === o.motivo)) {
            unique.push(o);
          }
          return unique;
      },[]);
      this.bajasMA = result;
        
        this.loadingVisible = false;
         if(this.bajasMA.length == 0){
          notify({
          message: "No hay datos",
          position: {
            my: 'center',
            at: 'center',
          },
        }, 'error', 3000);
        }
      })
    }else if(period == "TULTITLAN"){
      this.itemUdnAanu = period;
      this.bajasMA = [];
      this.loadingVisible = true;
      this.liquidacionService.getBajas(this.formFilter.Fecha.toISOString()).subscribe((response) => {
      var myBaja = response.data.bajasAnuales.filter((word) => word.udn == "TULTITLAN");;
      var myTotalesBP = [];
      
       let mytotalSuma = response.data.bajasAnuales.reduce((acc, val) => {
            if (val.udn == "TULTITLAN") return acc + val.bajas;
            return acc;
      }, 0);

       myBaja.forEach((row: any) =>{ 
        
        //console.log(row )
        if(row.motivo == "AUSENTISMO"){
          
          var totalPorcentajeA = 0;
          var mytotalBA = 0;


          totalPorcentajeA  = row.bajas / mytotalSuma;
          //console.log(totalPorcentajeA)

          // mytotalBA = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "AUSENTISMO") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "AUSENTISMO";
          myTotalesBajasA.porcentaje = totalPorcentajeA;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "DEFUNCION"){
          var totalPorcentajeD = 0;
          var mytotalBD = 0;

          totalPorcentajeD  = row.bajas / mytotalSuma;
          //console.log(totalPorcentajeD)

          // mytotalBD = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "DEFUNCION") return acc + val.bajas;
          //   return acc;
          // }, 0);



          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "DEFUNCION";
          myTotalesBajasA.porcentaje = totalPorcentajeD;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "OTROS"){
          var totalPorcentajeO = 0;
          var mytotalBO = 0;

          totalPorcentajeO  = row.bajas / mytotalSuma;
      
          // mytotalBO = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "OTROS") return acc + val.bajas;
          //   return acc;
          // }, 0);

         
          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "OTROS";
          myTotalesBajasA.porcentaje = totalPorcentajeO;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "RESICION DE CONTRATO"){
          var totalPorcentajeRC = 0;
          var mytotalBR = 0;

          totalPorcentajeRC  = row.bajas / mytotalSuma;

          // mytotalBR = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "RESICION DE CONTRATO") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "RESICION DE CONTRATO";
          myTotalesBajasA.porcentaje = totalPorcentajeRC;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "SEPARACION VOLUNTARIA"){
          var totalPorcentajeSV = 0;
          var mytotalBS = 0;

          totalPorcentajeSV  = row.bajas / mytotalSuma;

          // mytotalBS = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "SEPARACION VOLUNTARIA") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "SEPARACION VOLUNTARIA";
          myTotalesBajasA.porcentaje = totalPorcentajeSV;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "ABANDONO DE EMPLEO"){
          var totalPorcentajeAE = 0;
          var mytotalBAE = 0;

          totalPorcentajeAE  = row.bajas / mytotalSuma;

          // mytotalBAE = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "ABANDONO DE EMPLEO") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "ABANDONO DE EMPLEO";
          myTotalesBajasA.porcentaje = totalPorcentajeAE;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "JUBILACION"){
          var totalPorcentajeJ = 0;
          var mytotalJ = 0;

          totalPorcentajeJ  = row.bajas / mytotalSuma;

          // mytotalJ = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "JUBILACION") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "JUBILACION";
          myTotalesBajasA.porcentaje = totalPorcentajeJ;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "PENSION"){  
          var totalPorcentajeP = 0;
          var mytotalP = 0;

          totalPorcentajeP  = row.bajas / mytotalSuma;

          // mytotalP = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "PENSION") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "PENSION";
          myTotalesBajasA.porcentaje = totalPorcentajeP;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }

        if(row.motivo == "TERMINO DE CONTRATO"){  
          var totalPorcentajeTC = 0;
          var mytotalT = 0;

          totalPorcentajeTC  = row.bajas / mytotalSuma;

          // mytotalT = response.data.bajasAnuales.reduce((acc, val) => {
          //   if (val.motivo == "TERMINO DE CONTRATO") return acc + val.bajas;
          //   return acc;
          // }, 0);

          let myTotalesBajasA = new totalesBajas;
          myTotalesBajasA.bajas = row.bajas;
          myTotalesBajasA.motivo = "TERMINO DE CONTRATO";
          myTotalesBajasA.porcentaje = totalPorcentajeTC;

          myTotalesBP.push(myTotalesBajasA)
          //console.log(this.bajasMA)
        }
       })

      var result = myTotalesBP.reduce((unique, o) => {
          if(!unique.some(obj => obj.motivo === o.motivo)) {
            unique.push(o);
          }
          return unique;
      },[]);
      this.bajasMA = result;
        
        this.loadingVisible = false;
         if(this.bajasMA.length == 0){
          notify({
          message: "No hay datos",
          position: {
            my: 'center',
            at: 'center',
          },
        }, 'error', 3000);
        }
      })
    }
  }

  selectionGraficaUO({item: period}: any) {
    if(period == "Udn"){
      this.graficaUO = [];

      this.loadingVisible = true;
      this.liquidacionService.getLiquidacion(this.formFilter.Fecha.toISOString()).subscribe((response) => {
        this.graficaUO = response.data.graficaUDN;
        console.log(response.data)
        this.loadingVisible = false;
      });

    }else if(period == "Operación"){
      this.graficaUO = [];

      this.loadingVisible = true;
      this.liquidacionService.getLiquidacion(this.formFilter.Fecha.toISOString()).subscribe((response) => {
        this.graficaUO = response.data.graficaOperacion;
        console.log(response.data)
        this.loadingVisible = false;
      });

    }
  }

  ngAfterViewInit() {

    // this.pivotGrid.instance.bindChart(this.chart.instance, {
    //   dataFieldsDisplayMode: 'splitPanes',
    //   alternateDataFields: false,
    // });
  }
 onShown() {
    // setTimeout(() => {
    //   this.loadingVisible = false;
    // }, 3000);
  }
  onRowPreparedObs(e: any){
   if (e.rowType == 'group') {
      if (e.groupIndex == 0) {
        e.rowElement.style.backgroundColor = '#dcdcdc';
        e.rowElement.style.color = "black";
        e.rowElement.style.fontWeight = "bolder";
      }
     
    }

  }
  onCellPreparedObs(e: any){
    if (e.rowType == 'totalFooter') {
      e.totalItem.cells.forEach((c: any) => {
        if (c.cellElement) {
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.fontSize = "16px";
            c.cellElement.style.background = "#ff9460";
            c.cellElement.style.color = "black"; 
        }   
      });
    }
  }


   onRowPreparedMen(e: any){
//  if (e.rowType == 'data') {

//     e.cells.forEach((c: any) => {

//       if (c.value && c.value.toString().startsWith('-')) {
//         if(c.cellElement?.style !== undefined){
//           c.cellElement.style.color = "red";
//         }

//       }

//       if (c.cellElement) {
//         if(c.columnIndex == 12){
//           c.cellElement.style.fontWeight = "bolder";
//           c.cellElement.style.fontSize = "15px";
//           c.cellElement.style.background = "#cdcbcb";
//         }

//       }
//     });
//   }

  if (e.rowType == 'totalFooter') {
    e.cells.forEach((c: any) => {
      // console.log(e)
      // if(e.summaryCell[8].length == 0){
      //   console.log("Entre!!!!!")
      //   e.summaryCell[8]
      // }
    });
  }

    if (e.rowType == 'group') {

     //console.log(e)
      if (e.groupIndex == 0) {
        e.rowElement.style.backgroundColor = '#dcdcdc';
        e.rowElement.style.color = "black";
        e.rowElement.style.fontWeight = "bolder";
      }
     
    }
  }

  onCellPreparedMen(e: any){
 if (e.rowType === 'groupFooter'){


      e.cellElement.style.fontWeight = "bolder";
      e.cellElement.style.fontSize = "15px";
      e.cellElement.style.background = "#cdcbcb";
    }    


    if (e.rowType == 'totalFooter') {
      e.totalItem.cells.forEach((c: any) => {
        if (c.cellElement) {
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.fontSize = "16px";
            c.cellElement.style.background = "#ff9460";
            c.cellElement.style.color = "black"; 
        }   
        

      });
    }
  }

  onRowPreparedAnu(e: any){
//  if (e.rowType == 'data') {

//     e.cells.forEach((c: any) => {

//       if (c.value && c.value.toString().startsWith('-')) {
//         if(c.cellElement?.style !== undefined){
//           c.cellElement.style.color = "red";
//         }

//       }

//       if (c.cellElement) {
//         if(c.columnIndex == 12){
//           c.cellElement.style.fontWeight = "bolder";
//           c.cellElement.style.fontSize = "15px";
//           c.cellElement.style.background = "#cdcbcb";
//         }

//       }
//     });
//   }

  if (e.rowType == 'totalFooter') {
    e.cells.forEach((c: any) => {
      // console.log(e)
      // if(e.summaryCell[8].length == 0){
      //   console.log("Entre!!!!!")
      //   e.summaryCell[8]
      // }
    });
  }

    if (e.rowType == 'group') {

     //console.log(e)
      if (e.groupIndex == 0) {
        e.rowElement.style.backgroundColor = '#dcdcdc';
        e.rowElement.style.color = "black";
        e.rowElement.style.fontWeight = "bolder";
      }
     
    }
  }

  onCellPreparedAnu(e: any){
 if (e.rowType === 'groupFooter'){


      e.cellElement.style.fontWeight = "bolder";
      e.cellElement.style.fontSize = "15px";
      e.cellElement.style.background = "#cdcbcb";
    }    


    if (e.rowType == 'totalFooter') {
      e.totalItem.cells.forEach((c: any) => {
        if (c.cellElement) {
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.fontSize = "16px";
            c.cellElement.style.background = "#ff9460";
            c.cellElement.style.color = "black"; 
        }   
        

      });
    }
  }


  onRowPreparedPXD(e: any){
    //if(e.rowType == 'header'){
    //  e.cells.forEach((c: any) => {
//
    //    if (c.cellElement) {
    //      if(c.columnIndex == 1
    //      ){
    //        c.cellElement.style.color = "#000000"
    //        c.cellElement.style.fontSize = '15px'
    //      }
//
    //    }
    //  })
    //}
   if (e.rowType == 'data') {

    e.cells.forEach((c: any) => {

      if (c.value && c.value.toString().startsWith('-')) {
        if(c.cellElement?.style !== undefined){
          c.cellElement.style.color = "red";
        }

      }

      if (c.cellElement) {
        
        if(c.columnIndex == 11){

          if (c.data.mes1 > 30000) {
            if(c.cellElement?.style !== undefined){
              // c.cellElement.style.fontWeight = "bolder";
              c.cellElement.style.background = "#a9d08e";
            }
          }
          if (c.data.mes1 >= 25000 && c.data.mes1 <= 30000) {
            if(c.cellElement?.style !== undefined){
              // c.cellElement.style.fontWeight = "bolder";
              c.cellElement.style.background = "#ffd966";
            }
          }
          if (c.data.mes1 < 25000 && c.data.mes1 > 0) {
            if(c.cellElement?.style !== undefined){
              // c.cellElement.style.fontWeight = "bolder";
              c.cellElement.style.background = "#ff5050";
            }
          }
        }
        if(c.columnIndex == 14){
          if (c.data.mes2 > 30000) {
            if(c.cellElement?.style !== undefined){
              // c.cellElement.style.fontWeight = "bolder";
              c.cellElement.style.background = "#a9d08e";
            }
          }
          if (c.data.mes2 >= 25000 && c.data.mes2 <= 30000) {
            if(c.cellElement?.style !== undefined){
              // c.cellElement.style.fontWeight = "bolder";
              c.cellElement.style.background = "#ffd966";
            }
          }
          if (c.data.mes2 < 25000 && c.data.mes2 > 0) {
            if(c.cellElement?.style !== undefined){
              // c.cellElement.style.fontWeight = "bolder";
              c.cellElement.style.background = "#ff5050";
            }
          }
        }
        if(c.columnIndex == 17){
          if (c.data.mes3 > 30000) {
            if(c.cellElement?.style !== undefined){
              // c.cellElement.style.fontWeight = "bolder";
              c.cellElement.style.background = "#a9d08e";
            }
          }
          if (c.data.mes3 >= 25000 && c.data.mes3 <= 30000) {
            if(c.cellElement?.style !== undefined){
              // c.cellElement.style.fontWeight = "bolder";
              c.cellElement.style.background = "#ffd966";
            }
          }
          if (c.data.mes3 < 25000 && c.data.mes3 > 0) {
            if(c.cellElement?.style !== undefined){
              // c.cellElement.style.fontWeight = "bolder";
              c.cellElement.style.background = "#ff5050";
            }
          }
        }
        if(c.columnIndex == 18){
          c.cellElement.style.color = "#000000"
          c.cellElement.style.fontSize = '15px'

          if (c.data.promedioMensual > 30000) {
            if(c.cellElement?.style !== undefined){
              c.cellElement.style.fontWeight = "bolder";
              c.cellElement.style.background = "#a9d08e";
            }
          }
          if (c.data.promedioMensual >= 25000 && c.data.promedioMensual <= 30000) {
            if(c.cellElement?.style !== undefined){
              c.cellElement.style.fontWeight = "bolder";
              c.cellElement.style.background = "#ffd966";
            }
          }
          if (c.data.promedioMensual < 25000 && c.data.promedioMensual > 0) {
            if(c.cellElement?.style !== undefined){
              c.cellElement.style.fontWeight = "bolder";
              c.cellElement.style.background = "#ff5050";
            }
          }
        }

        if(c.columnIndex == 23){
          c.cellElement.style.color = "#000000"
          c.cellElement.style.fontSize = '15px'
          if (c.data.total > 30000) {
            if(c.cellElement?.style !== undefined){
              c.cellElement.style.fontWeight = "bolder";
              c.cellElement.style.background = "#a9d08e";
            }
          }
          if (c.data.total >= 25000 && c.data.total <= 30000) {
            if(c.cellElement?.style !== undefined){
              c.cellElement.style.fontWeight = "bolder";
              c.cellElement.style.background = "#ffd966";
            }
          }
          if (c.data.total < 25000 && c.data.total > 0) {
            if(c.cellElement?.style !== undefined){
              c.cellElement.style.fontWeight = "bolder";
              c.cellElement.style.background = "#ff5050";
            }
          }
        }

      }
    });
  }

  if (e.rowType == 'totalFooter') {
    e.cells.forEach((c: any) => {


      // if(c.columnIndex == 11){
      //   c.cellElement.style.fontWeight = "bolder";
      //   c.cellElement.style.fontSize = "15px";
      //   c.cellElement.style.background = "#cdcbcb";
      // }

      // if(c.columnIndex == 17){
      //   c.cellElement.style.fontWeight = "bolder";
      //   c.cellElement.style.fontSize = "15px";
      //   c.cellElement.style.background = "#cdcbcb";
      // }

      // if(c.columnIndex == 20){
      //     c.cellElement.style.fontWeight = "bolder";
      //     c.cellElement.style.fontSize = "15px";
      //     c.cellElement.style.background = "#cdcbcb";
      //  }

      // if(c.columnIndex == 21){
      //     c.cellElement.style.fontWeight = "bolder";
      //     c.cellElement.style.fontSize = "15px";
      //     c.cellElement.style.background = "#cdcbcb";
      // }

    });
  }

    if (e.rowType == 'group') {

     //console.log(e)
      if (e.groupIndex == 0) {
        e.rowElement.style.backgroundColor = '#dcdcdc';
        e.rowElement.style.color = "black";
        e.rowElement.style.fontWeight = "bolder";
      }
     
    }

  }

  onCellPreparedPXD(e: any){
  if (e.rowType === 'groupFooter'){


      e.cellElement.style.fontWeight = "bolder";
      e.cellElement.style.fontSize = "15px";
      e.cellElement.style.background = "#cdcbcb";
    }    


    if (e.rowType == 'totalFooter') {
      e.totalItem.cells.forEach((c: any) => {
        if (c.cellElement) {
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.fontSize = "16px";
            c.cellElement.style.background = "#ff9460";
            c.cellElement.style.color = "black"; 
        }   
      });
    }
  }

  customizePXD(e) {  
  var gridCell = e.gridCell;
  if (gridCell.rowType === 'data') {


    if(e.gridCell.column.dataField == "mes1"){
      if(gridCell.data.mes1 > 30000){
        e.backgroundColor = "#a9d08e";
        // e.fontWeight = "bolder"
//         e.font = {bold: true}
      }
      if(gridCell.data.mes1 >= 25000 && gridCell.data.mes1 <= 30000){
        e.backgroundColor = "#ffd966";
        // e.fontWeight = "bolder"
        // e.font = {bold: true}
      }
      if(gridCell.data.mes1 < 25000 && gridCell.data.mes1 > 0){
        e.backgroundColor = "#ff5050";
        // e.fontWeight = "bolder"
        // e.font = {bold: true}
      }

    }

    if(e.gridCell.column.dataField == "mes2"){
      if(gridCell.data.mes2 > 30000){
        e.backgroundColor = "#a9d08e";
        // e.fontWeight = "bolder"
        // e.font = {bold: true}
      }
      if(gridCell.data.mes2 >= 25000 && gridCell.data.mes2 <= 30000){
        e.backgroundColor = "#ffd966";
        // e.fontWeight = "bolder"
        // e.font = {bold: true}
      }
      if(gridCell.data.mes2 < 25000 && gridCell.data.mes2 > 0){
        e.backgroundColor = "#ff5050";
        // e.fontWeight = "bolder"
        // e.font = {bold: true}
      }
    }


    if(e.gridCell.column.dataField == "mes3"){
      if(gridCell.data.mes3 > 30000){
        e.backgroundColor = "#a9d08e";
        // e.fontWeight = "bolder"
        // e.font = {bold: true}
      }
      if(gridCell.data.mes3 >= 25000 && gridCell.data.mes3 <= 30000){
        e.backgroundColor = "#ffd966";
        // e.fontWeight = "bolder"
        // e.font = {bold: true}
      }
      if(gridCell.data.mes3 < 25000 && gridCell.data.mes3 > 0){
        e.backgroundColor = "#ff5050";
        // e.fontWeight = "bolder"
        // e.font = {bold: true}
      }
    }
    if(e.gridCell.column.dataField == "promedioMensual"){
      if(gridCell.data.promedioMensual > 30000){
        e.backgroundColor = "#a9d08e";
        e.fontWeight = "bolder"
        e.font = {bold: true}
      }
      if(gridCell.data.promedioMensual >= 25000 && gridCell.data.promedioMensual <= 30000){
        e.backgroundColor = "#ffd966";
        e.fontWeight = "bolder"
        e.font = {bold: true}
      }
      if(gridCell.data.promedioMensual < 25000 && gridCell.data.promedioMensual > 0){
        e.backgroundColor = "#ff5050";
        e.fontWeight = "bolder"
        e.font = {bold: true}
      }
    }
    
    if(e.gridCell.column.dataField == "total"){
      if(gridCell.data.total > 30000){
        e.backgroundColor = "#a9d08e";
        e.fontWeight = "bolder"
        e.font = {bold: true}
      }
      if(gridCell.data.total >= 25000 && gridCell.data.total <= 30000){
        e.backgroundColor = "#ffd966";
        e.fontWeight = "bolder"
        e.font = {bold: true}
      }
      if(gridCell.data.total < 25000 && gridCell.data.total > 0){
        e.backgroundColor = "#ff5050";
        e.fontWeight = "bolder"
        e.font = {bold: true}
      }
    }
  }

  if (gridCell.rowType === 'groupFooter') {
    
    e.backgroundColor = "#cdcbcb";
    e.fontWeight = "bolder"
    e.font = {bold: true}
  }

  if (gridCell.rowType === 'totalFooter') {
      
    e.backgroundColor = "#ff9460";
    e.fontWeight = "bolder"
    e.font = {bold: true}

    // if(e.gridCell.column.dataField == "promedioMensual"){
    //    e.backgroundColor = "#cdcbcb";
    //     e.fontWeight = "bolder"
    //     e.font = {bold: true}
    // }

    //     if(e.gridCell.column.dataField == "liquidado"){
    //    e.backgroundColor = "#cdcbcb";
    //     e.fontWeight = "bolder"
    //     e.font = {bold: true}
    // }

    //     if(e.gridCell.column.dataField == "noLiquidado"){
    //    e.backgroundColor = "#cdcbcb";
    //     e.fontWeight = "bolder"
    //     e.font = {bold: true}
    // }

    //     if(e.gridCell.column.dataField == "total"){
    //    e.backgroundColor = "#cdcbcb";
    //     e.fontWeight = "bolder"
    //     e.font = {bold: true}
    // }

   
  }
  }

  onRowPreparedVPL(e: any){
 if (e.rowType == 'data') {

    e.cells.forEach((c: any) => {

      if (c.value && c.value.toString().startsWith('-')) {
        if(c.cellElement?.style !== undefined){
          c.cellElement.style.color = "red";
        }

      }

      if (c.cellElement) {
        if(c.columnIndex == 12){
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.fontSize = "15px";
          c.cellElement.style.background = "#cdcbcb";
        }

      }
    });
  }

  if (e.rowType == 'totalFooter') {
    e.cells.forEach((c: any) => {
      // console.log(e)
      // if(e.summaryCell[8].length == 0){
      //   console.log("Entre!!!!!")
      //   e.summaryCell[8]
      // }
    });
  }

    if (e.rowType == 'group') {

     //console.log(e)
      if (e.groupIndex == 0) {
        e.rowElement.style.backgroundColor = '#dcdcdc';
        e.rowElement.style.color = "black";
        e.rowElement.style.fontWeight = "bolder";
      }
     
    }
  }

  onCellPreparedVPL(e: any){
 if (e.rowType === 'groupFooter'){


      e.cellElement.style.fontWeight = "bolder";
      e.cellElement.style.fontSize = "15px";
      e.cellElement.style.background = "#cdcbcb";
    }    


    if (e.rowType == 'totalFooter') {
      e.totalItem.cells.forEach((c: any) => {
        if (c.cellElement) {
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.fontSize = "16px";
            c.cellElement.style.background = "#ff9460";
            c.cellElement.style.color = "black"; 
        }   


        // console.log(c.totalItem.summaryCells)
        if(c.totalItem.summaryCells[8].length == 0){
          console.log("Entre !!")
          c.totalItem.summaryCells[8]= [{value: 0}];
        }

        if(c.totalItem.summaryCells[10].length == 0){
          console.log("Entre !!")
          c.totalItem.summaryCells[10]= [{value: 0}];
        }

        if(c.totalItem.summaryCells[11].length == 0){
          console.log("Entre !!")
          c.totalItem.summaryCells[11]= [{value: 0}];
        }

      });
    }
  }

  customizeVPL(e) {  
  var gridCell = e.gridCell;

  if (gridCell.rowType === 'data') {
    
    if(e.gridCell.column.dataField == "total"){
      e.backgroundColor = "#cdcbcb";
      e.fontWeight = "bolder"
      e.font = {bold: true}
    }
  }

  if (gridCell.rowType === 'groupFooter') {
    
    e.backgroundColor = "#cdcbcb";
    e.fontWeight = "bolder"
    e.font = {bold: true}
  }

  if (gridCell.rowType === 'totalFooter') {
      
      if(e.gridCell.column.dataField == "pagoXTonelada"){
          e.value = 0; 
      }
      if(e.gridCell.column.dataField == "maniobraAutocarga"){
          e.value = 0; 
      }
      if(e.gridCell.column.dataField == "maniobraFull"){
          e.value = 0; 
      }
      
      e.backgroundColor = "#ff9460";
      e.fontWeight = "bolder"
      e.font = {bold: true}   
  }
  }

  onRowPreparedLP(e: any){
 if (e.rowType == 'data') {

    e.cells.forEach((c: any) => {

      if (c.value && c.value.toString().startsWith('-')) {
        if(c.cellElement?.style !== undefined){
          c.cellElement.style.color = "red";
        }

      }

      if (c.cellElement) {
        if(c.columnIndex == 3){
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.fontSize = "15px";
          c.cellElement.style.background = "#cdcbcb";
        }

      }
    });
  }

  if (e.rowType == 'totalFooter') {
    e.cells.forEach((c: any) => {

    });
  }

    if (e.rowType == 'group') {

     //console.log(e)
      if (e.groupIndex == 0) {
        e.rowElement.style.backgroundColor = '#dcdcdc';
        e.rowElement.style.color = "black";
        e.rowElement.style.fontWeight = "bolder";
      }
     
    }
  }
  onCellPreparedLP(e: any){
 if (e.rowType === 'groupFooter'){


      e.cellElement.style.fontWeight = "bolder";
      e.cellElement.style.fontSize = "15px";
      e.cellElement.style.background = "#cdcbcb";
    }    


    if (e.rowType == 'totalFooter') {
      e.totalItem.cells.forEach((c: any) => {
        if (c.cellElement) {
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.fontSize = "16px";
            c.cellElement.style.background = "#ff9460";
            c.cellElement.style.color = "black"; 
        }   
      });
    }
  }

    customizeLP(e) {  
  var gridCell = e.gridCell;
  if (gridCell.rowType === 'data') {
    
    if(e.gridCell.column.dataField == "total"){
      e.backgroundColor = "#cdcbcb";
      e.fontWeight = "bolder"
      e.font = {bold: true}
    }
  }

  if (gridCell.rowType === 'groupFooter') {
    
    e.backgroundColor = "#cdcbcb";
    e.fontWeight = "bolder"
    e.font = {bold: true}
  }

  if (gridCell.rowType === 'totalFooter') {
      
    e.backgroundColor = "#ff9460";
    e.fontWeight = "bolder"
    e.font = {bold: true}   
  }
  }



    onRowPreparedG(e: any){
  //  if (e.rowType == 'data') {

  //   e.cells.forEach((c: any) => {

  //     if (c.value && c.value.toString().startsWith('-')) {
  //       if(c.cellElement?.style !== undefined){
  //         c.cellElement.style.color = "red";
  //       }

  //     }

  //     if (c.cellElement) {
  //       if(c.columnIndex == 12){
  //         c.cellElement.style.fontWeight = "bolder";
  //         c.cellElement.style.fontSize = "15px";
  //         c.cellElement.style.background = "#cdcbcb";
  //       }

  //       if(c.columnIndex == 15){
  //         c.cellElement.style.fontWeight = "bolder";
  //         c.cellElement.style.fontSize = "15px";
  //         c.cellElement.style.background = "#cdcbcb";
  //       }

  //     }
  //   });
  // }

  if (e.rowType == 'totalFooter') {
    e.cells.forEach((c: any) => {


      // if(c.columnIndex == 11){
      //   c.cellElement.style.fontWeight = "bolder";
      //   c.cellElement.style.fontSize = "15px";
      //   c.cellElement.style.background = "#cdcbcb";
      // }

      // if(c.columnIndex == 17){
      //   c.cellElement.style.fontWeight = "bolder";
      //   c.cellElement.style.fontSize = "15px";
      //   c.cellElement.style.background = "#cdcbcb";
      // }

      // if(c.columnIndex == 20){
      //     c.cellElement.style.fontWeight = "bolder";
      //     c.cellElement.style.fontSize = "15px";
      //     c.cellElement.style.background = "#cdcbcb";
      //  }

      // if(c.columnIndex == 21){
      //     c.cellElement.style.fontWeight = "bolder";
      //     c.cellElement.style.fontSize = "15px";
      //     c.cellElement.style.background = "#cdcbcb";
      // }

    });
  }

    if (e.rowType == 'group') {

     //console.log(e)
      if (e.groupIndex == 0) {
        e.rowElement.style.backgroundColor = '#dcdcdc';
        e.rowElement.style.color = "black";
        e.rowElement.style.fontWeight = "bolder";
      }
     
    }

  }

  onCellPreparedG(e: any){
  if (e.rowType === 'groupFooter'){


      e.cellElement.style.fontWeight = "bolder";
      e.cellElement.style.fontSize = "15px";
      e.cellElement.style.background = "#cdcbcb";
    }    


    if (e.rowType == 'totalFooter') {
      e.totalItem.cells.forEach((c: any) => {
        if (c.cellElement) {
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.fontSize = "16px";
            c.cellElement.style.background = "#ff9460";
            c.cellElement.style.color = "black"; 
        }   
      });
    }
  }
  /**=========================PAGOS POR MES=========================================== */
  onRowPreparedPXM(e: any){
    // if (e.rowType == 'data') {
    //   e.cells.forEach((c: any) => {

    //     if (c.cellElement) {
    //       if (c.value && c.value.toString().startsWith('-')) {
    //         c.cellElement.style.color = "red";
    //         c.cellElement.style.fontWeight = "bolder";
    //       }
    //     }

        

    //   });
    // }

    if (e.rowType == 'group') {
      if (e.groupIndex == 0) {
        e.rowElement.style.backgroundColor = '#dcdcdc';
        e.rowElement.style.color = "black";
        e.rowElement.style.fontWeight = "bolder";
      }
     
    }

  }

  //==================Formato a la data de la grafica==================================
  customizeTooltip(args: any) {
    const valueText = (args.seriesName.indexOf('Total') != -1)
      ? new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(args.originalValue)
      : args.originalValue;

      var myvalue = Math.trunc(valueText);

    var myFormat = myvalue.toString().split(".");
    myFormat[0] = myFormat[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return {
      html: `${args.seriesName}<div class='currency'>$ ${myFormat}</div>`,
    };
  }

  formatSliderTooltip(value) {

    return Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(value);
  }

  onHidden() {}

  calculatePercent(value){
    var mypercent = Math.trunc(value);
    mypercent / 100;
    
    return mypercent +"%";
  }

  formatValue(value) {
    var myvalue = Math.trunc(value);

    var myFormat = myvalue.toString().split(".");
    myFormat[0] = myFormat[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");


    return "$ " + myFormat.join("");

  }
  
 
}
