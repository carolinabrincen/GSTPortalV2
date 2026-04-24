import { NgModule, Component, ViewChild, enableProdMode, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit, OnInit } from '@angular/core';
import { UnidadesService } from 'src/app/services/unidades/unidades.services';
import DataGrid from "devextreme/ui/data_grid";
import { IngresosModel } from 'src/app/shared/models/ingresos/ingresos.models';

import { DxDataGridComponent, } from 'devextreme-angular';
import { CurrencyPipe } from '@angular/common';
import { DxChartComponent, } from 'devextreme-angular';
import { ServiceSales } from '../tasks/app.serviceSales';
import { AniosModel } from './../../shared/models/rentabilidad-contable/renta-contable.model';
import { Service } from '../../shared/models/ingresos/ingreso.service'
import { TotalPorcentajes } from '../../shared/models/ingresos/totalporcentajes.model'
import { ModeloGrafica } from '../../shared/models/ingresos/modeloGrafica.model';
import { Modelos } from '../../shared/models/ingresos/modelos.model';
import { AltasBjasService } from 'src/app/services/altasBajas/altasBajas.service';
import { TotalesXDisponibilidad, TotalOperacion, TotalesXTracos, TotalOpeT, TotalesXRemolques, TotalOpeR  } from '../../shared/models/disponiblidad/totalesXDisponibilidad';
import { AltasBajas } from 'src/app/shared/models/altasBajas/balanza.model';
import notify from 'devextreme/ui/notify';

import {
  Sales, SalesByState, SalesByStateAndCity, SalesOrOpportunitiesByCategory,
} from 'src/app/types/analytics';

import { Workbook } from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { saveAs } from 'file-saver-es';
import { group } from 'console';
import { Observable, forkJoin } from 'rxjs';

const totalesPor = new TotalPorcentajes;
const printMes = new AltasBajas;

type DashboardData = SalesOrOpportunitiesByCategory | Sales | SalesByState | SalesByStateAndCity | null;
type DataLoader = (startDate: string, endDate: string) => Observable<Object>;

@Component({
  templateUrl: './altasBajas.component.html',
  styleUrls: ['./altasBajas.component.scss'],
  providers: [UnidadesService, ServiceSales, CurrencyPipe, Service],
})

export class AltasBajasComponent implements OnInit {

  @ViewChild(DxChartComponent, { static: false }) chart: any;


  @ViewChild('gridModal', { static: false }) gridModal: DxDataGridComponent;



  //loading
  loadingVisible = false;

  paginacion = 5;
  readonly allowedPageSizes = [5, 10, 20, 50, 100, 'all'];


  openModalOperador: boolean = false;
  openModalUnidades: boolean = false;

  expandGroup: boolean = true;
  isVisible = false;

  grid1: any[] = [];
  grid2: any[] = [];
  grid3: any[] = [];
 
  selectedUdn: number = 0;

  printUdn: string = "";

  formFilter: any = {
    Fecha: ''
  }

  bolFormSoloLectura = false;

  anual: any[] = [];
  anualGrafica: any[] = [];
  mensualAltas: any[] = [];
  mensualBajas: any[] = [];
  mensualSaldos: any[] = [];
  detalleAltas: any[] = [];
  detalleBajas: any[] = [];
  resumenInicio: any[] = [];
  resumenAltas: any[] = [];
  resumenBajas: any[] = [];
  resumenFin: any[] = [];
  resumenMes: any[] = []
  platillaPA: any[] = [];

  mes1: string = "";
  mes2: string = "";
  mes3: string = "";
  mes4: string = "";
  mes5: string = "";
  mes6: string = "";
  mes7: string = "";
  mes8: string = "";
  mes9: string = "";
  mes10: string = "";
  mes11: string = "";
  mes12: string = "";



  opportunities: SalesOrOpportunitiesByCategory = null;
  sales: Sales = null;
  salesByState: SalesByState = null;
  salesByCategory: SalesByStateAndCity = null;
  conversion: any;
  leads: any;

  modalDA = false;
  modalDB = false;

  chart_visualRange = [1, 12];

  periodo: any[] = [
    { idPeriodo: 202604, periodo: "2026-04-01" },
    { idPeriodo: 202603, periodo: "2026-03-01" },
    { idPeriodo: 202602, periodo: "2026-02-01" },
    { idPeriodo: 202601, periodo: "2026-01-01" },
    { idPeriodo: 202512, periodo: "2025-12-01" },
    { idPeriodo: 202511, periodo: "2025-11-01" },
    { idPeriodo: 202510, periodo: "2025-10-01" },
    { idPeriodo: 202509, periodo: "2025-09-01" },
    { idPeriodo: 202508, periodo: "2025-08-01" },
    { idPeriodo: 202507, periodo: "2025-07-01" },
    { idPeriodo: 202506, periodo: "2025-06-01" },
    { idPeriodo: 202505, periodo: "2025-05-01" },
    { idPeriodo: 202504, periodo: "2025-04-01" },
    { idPeriodo: 202503, periodo: "2025-03-01" },
    { idPeriodo: 202502, periodo: "2025-02-01" },
    { idPeriodo: 202501, periodo: "2025-01-01" },
    { idPeriodo: 202412, periodo: "2024-12-01" },
    { idPeriodo: 202411, periodo: "2024-11-01" },
    { idPeriodo: 202410, periodo: "2024-10-01" },
    { idPeriodo: 202409, periodo: "2024-09-01" },
    { idPeriodo: 202408, periodo: "2024-08-01" },
    ];

  selectedPeriodo: number = 0;
  screen = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  
  constructor(
    private altasBajasService: AltasBjasService,
    private service: ServiceSales,
    private currencyPipe: CurrencyPipe,
    testService: Service
  ) {

    this.customizeTooltip = this.customizeTooltip.bind(this);
    this.calcularPorcentajes = this.calcularPorcentajes.bind(this);
    this.formFilter   

   

  }

  title="Inicio"

  ngOnInit(): void {
    // this.getDisponiblidadAnual();
  }

  getAltasBajas() {

     var getPeriodo = this.selectedPeriodo;
    
    printMes.mes1 = new Date(getPeriodo).toLocaleString('es-MX',{month:'numeric'});
    //Solo obtiene un mes antirior 
    if(printMes.mes1 == "12"){
      this.mes1 = "Febrero"
      this.mes2 = "Marzo"
      this.mes3 = "Abril"
      this.mes4 = "Mayo"
      this.mes5 = "Junio"
      this.mes6 = "Julio"
      this.mes7 = "Agosto"
      this.mes8 = "Septiembre"
      this.mes9 = "Octubre"
      this.mes10 = "Noviembre"
      this.mes11 = "Diciembre"
      this.mes12 = "Enero"
    }else if(printMes.mes1 == "1"){
      this.mes1 = "Marzo"
      this.mes2 = "Abril"
      this.mes3 = "Mayo"
      this.mes4 = "Junio"
      this.mes5 = "Julio"
      this.mes6 = "Agosto"
      this.mes7 = "Septiembre"
      this.mes8 = "Octubre"
      this.mes9 = "Noviembre"
      this.mes10 = "Diciembre"
      this.mes11 = "Enero"
      this.mes12 = "Febrero"
    }else if(printMes.mes1 == "2"){
      this.mes1 = "Abril"
      this.mes2 = "Mayo"
      this.mes3 = "Junio"
      this.mes4 = "Julio"
      this.mes5 = "Agosto"
      this.mes6 = "Septiembre"
      this.mes7 = "Octubre"
      this.mes8 = "Noviembre"
      this.mes9 = "Diciembre"
      this.mes10 = "Enero"
      this.mes11 = "Febrero"
      this.mes12 = "Marzo"
    }else if(printMes.mes1 == "3"){
      this.mes1 = "Mayo"
      this.mes2 = "Junio"
      this.mes3 = "Julio"
      this.mes4 = "Agosto"
      this.mes5 = "Septiembre"
      this.mes6 = "Octubre"
      this.mes7 = "Noviembre"
      this.mes8 = "Diciembre"
      this.mes9 = "Enero"
      this.mes10 = "Febrero"
      this.mes11 = "Marzo"
      this.mes12 = "Abril"
    }else if(printMes.mes1 == "4"){
      this.mes1 = "Junio"
      this.mes2 = "Julio"
      this.mes3 = "Agosto"
      this.mes4 = "Septiembre"
      this.mes5 = "Octubre"
      this.mes6 = "Noviembre"
      this.mes7 = "Diciembre"
      this.mes8 = "Enero"
      this.mes9 = "Febrero"
      this.mes10 = "Marzo"
      this.mes11 = "Abril"
      this.mes12 = "Mayo"
    }else if(printMes.mes1 == "5"){
      this.mes1 = "Julio"
      this.mes2 = "Agosto"
      this.mes3 = "Septiembre"
      this.mes4 = "Octubre"
      this.mes5 = "Noviembre"
      this.mes6 = "Diciembre"
      this.mes7 = "Enero"
      this.mes8 = "Febrero"
      this.mes9 = "Marzo"
      this.mes10 = "Abril"
      this.mes11 = "Mayo"
      this.mes12 = "Junio"
    }else if(printMes.mes1 == "6"){
      this.mes1 = "Agosto"
      this.mes2 = "Septiembre"
      this.mes3 = "Octubre"
      this.mes4 = "Noviembre"
      this.mes5 = "Diciembre"
      this.mes6 = "Enero"
      this.mes7 = "Febrero"
      this.mes8 = "Marzo"
      this.mes9 = "Abril"
      this.mes10 = "Mayo"
      this.mes11 = "Junio"
      this.mes12 = "Julio"
    }else if(printMes.mes1 == "7"){
      this.mes1 = "Septiembre"
      this.mes2 = "Octubre"
      this.mes3 = "Noviembre"
      this.mes4 = "Diciembre"
      this.mes5 = "Enero"
      this.mes6 = "Febrero"
      this.mes7 = "Marzo"
      this.mes8 = "Abril"
      this.mes9 = "Mayo"
      this.mes10 = "Junio"
      this.mes11 = "Julio"
      this.mes12 = "Agosto"
    }else if(printMes.mes1 == "8"){
      this.mes1 = "Octubre"
      this.mes2 = "Noviembre"
      this.mes3 = "Diciembre"
      this.mes4 = "Enero"
      this.mes5 = "Febrero"
      this.mes6 = "Marzo"
      this.mes7 = "Abril"
      this.mes8 = "Mayo"
      this.mes9 = "Junio"
      this.mes10 = "Julio"
      this.mes11 = "Agosto"
      this.mes12 = "Septiembre"
    }else if(printMes.mes1 == "9"){
      this.mes1 = "Noviembre"
      this.mes2 = "Diciembre"
      this.mes3 = "Enero"
      this.mes4 = "Febrero"
      this.mes5 = "Marzo"
      this.mes6 = "Abril"
      this.mes7 = "Mayo"
      this.mes8 = "Junio"
      this.mes9 = "Julio"
      this.mes10 = "Agosto"
      this.mes11 = "Septiembre"
      this.mes12 = "Octubre"
    }else if(printMes.mes1 == "10"){
      this.mes1 = "Diciembre"
      this.mes2 = "Enero"
      this.mes3 = "Febrero"
      this.mes4 = "Marzo"
      this.mes5 = "Abril"
      this.mes6 = "Mayo"
      this.mes7 = "Junio"
      this.mes8 = "Julio"
      this.mes9 = "Agosto"
      this.mes10 = "Septiembre"
      this.mes11 = "Octubre"
      this.mes12 = "Noviembre"
    }else if(printMes.mes1 == "11"){
      this.mes1 = "Enero"
      this.mes2 = "Febrero"
      this.mes3 = "Marzo"
      this.mes4 = "Abril"
      this.mes5 = "Mayo"
      this.mes6 = "Junio"
      this.mes7 = "Julio"
      this.mes8 = "Agosto"
      this.mes9 = "Septiembre"
      this.mes10 = "Octubre"
      this.mes11 = "Noviembre"
      this.mes12 = "Diciembre"
    }

    this.altasBajasService.getAltasBajas(this.selectedPeriodo).subscribe((response) => {
      //console.log(response.data)
      var myAnual = response.data.anual;
      for(let i =0; i<myAnual.length; i++){ 
        var myBajas = myAnual[i].bajas;
        var operacionB = myBajas * -1;
        myAnual[i].bajas = operacionB;
      }
      this.anualGrafica = myAnual;
      this.anualGrafica.sort((a, b) => (a.orden < b.orden ? -1 : 1));

      this.mensualAltas = response.data.mensualAltas;
      this.mensualAltas.sort((a, b) => (a.orden < b.orden ? -1 : 1));
      this.mensualBajas = response.data.mensualBajas;
      this.mensualBajas.sort((a, b) => (a.orden < b.orden ? -1 : 1));
      this.mensualSaldos = response.data.mensualSaldos;
      this.mensualSaldos.sort((a, b) => (a.orden < b.orden ? -1 : 1));

      this.detalleAltas = response.data.detalleAltas;
      this.detalleBajas = response.data.detalleBajas;

      var resumenI = response.data.resumenMes.filter((word) => word.tipo == "Inicio");
      this.resumenInicio = resumenI;
      var resumenA = response.data.resumenMes.filter((word) => word.tipo == "Altas");
      this.resumenAltas = resumenA;
      var resumenB = response.data.resumenMes.filter((word) => word.tipo == "Bajas");
      this.resumenBajas = resumenB;
      var resumenF = response.data.resumenMes.filter((word) => word.tipo == "Fin"); 
      this.resumenFin = resumenF;

      this.resumenMes = response.data.resumenMes;//no se usar por el momento 

      this.platillaPA = response.data.plantillaPromedioAnual;
      this.platillaPA.sort((a, b) => (a.periodo < b.periodo ? -1 : 1));

      //console.log(response.data)

      this.loadingVisible = false;
    });
  }

  getABAnual() {

    this.altasBajasService.getAltasBajas(this.selectedPeriodo).subscribe((response) => {

      this.anual = response.data.anual;
      this.anual.sort((a, b) => (a.orden < b.orden ? -1 : 1));
    });
  }

  /*======================SELECTE FUNCIONS================================================*/
  selectUdn(value: any) {
    this.selectedUdn = value.value;
    //console.log(this.selectedUdn)
    if (this.selectedUdn === 0) {
      this.printUdn = "TODOS";
    }
    if (this.selectedUdn === 1) {
      this.printUdn = "ORIZABA";
    }
    if (this.selectedUdn === 2) {
      this.printUdn = "GUADALAJARA";
    }
    if (this.selectedUdn === 3) {
      this.printUdn = "RAMOS ARIZPE";
    }
    if (this.selectedUdn === 4) {
      this.printUdn = "MEXICALI";
    }
    if (this.selectedUdn === 5) {
      this.printUdn = "HERMOSILLO";
    }
    if (this.selectedUdn === 8) {
      this.printUdn = "CUAUTITLAN";
    }
    if (this.selectedUdn === 9) {
      this.printUdn = "TULTITLAN";
    }
  }
  selectFecha(value: any) {
   
  }
 
  selectPeriodo(e: any) {
    this.selectedPeriodo = e.value;
    // console.log(this.selectedPeriodo)
  }

  onClick(value: any){
    //console.log(value)
  }

  buscarClick = (e: any) => {
    if (this.selectedPeriodo !== undefined) {
      this.loadingVisible = true;
      
      this.getAltasBajas();
      this.getABAnual();
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

  openModalA = (e: any) =>{
    this.modalDA = true;
  }

  openModalB = (e: any) =>{
    this.modalDB = true;
  }






  ngAfterViewInit() {

    // this.pivotGrid.instance.bindChart(this.chart.instance, {
    //   dataFieldsDisplayMode: 'splitPanes',
    //   alternateDataFields: false,
    // });
  }

  // customizeTooltip(args: any) {
  //   const valueText = (args.seriesName.indexOf('Total') != -1)
  //     ? new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'USD' }).format(args.originalValue)
  //     : args.originalValue;

  //   return {
  //     html: `${args.seriesName}<div class='currency'>${valueText}</div>`,
  //   };
  // }
   customizeTooltip = ({ valueText }: { valueText: number }) => ({
    text: Math.abs(valueText),
  });

  // customizeLabel: DxChartTypes.ValueAxisLabel['customizeText'] = ({ value }) => `${Math.abs(value as number)}%`;

  print() {
    this.chart.instance.print();
  }
  export() {
    this.chart.instance.exportTo('Example', 'png');
  }

  onRowPreparedResumenO(e: any) {
  
    if (e.rowType == 'totalFooter') {
      e.cells.forEach((c: any) => {
        if (c.cellElement) {
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.fontSize = "16px";
          c.cellElement.style.background = "#ff9460";
          c.cellElement.style.color = "black";
        }
      });
    };
  }

  onCellPreparedResumenO(e: any) {
  

  }

  onRowPreparedAnual(e: any) {
  
    if (e.rowType == 'totalFooter') {
      e.cells.forEach((c: any) => {
        if (c.cellElement) {
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.fontSize = "16px";
          c.cellElement.style.background = "#ff9460";
          c.cellElement.style.color = "black";
        }
      });
    };
  }

  onCellPreparedAnual(e: any) {
    var myRotacion  = 0;
    var totalRotacion = 0;
    if (e.rowType == 'totalFooter') {

      // e.totalItem.cells.forEach((c: any) => {
      //   myRotacion = c.totalItem.summaryCells[5][0].value;
        
      //   totalRotacion = myRotacion / 100;
      //   var mypercent = Math.trunc(totalRotacion);
      //   c.totalItem.summaryCells[5][0].value = mypercent;
      //  // console.log(c.totalItem.summaryCells)
      // })
    }
  }

  customizeOp(e) {
    var gridCell = e.gridCell;

    if (gridCell.rowType === 'data') {

      if (e.gridCell.column.dataField == "disponibles") {
        e.backgroundColor = "#DCDCDC";
        e.fontWeight = "bolder"
        e.font = { bold: true }
      }

      if (e.gridCell.column.dataField == "instructor") {
        e.backgroundColor = "#DCDCDC";
        e.fontWeight = "bolder"
        e.font = { bold: true }
      }

      if (e.gridCell.column.dataField == "noDisponibles") {
        e.backgroundColor = "#DCDCDC";
        e.fontWeight = "bolder"
        e.font = { bold: true }
      }

      if (e.gridCell.column.dataField == "bajaPor") {
        e.fontWeight = "bolder"
        e.font = { bold: true }
      }

      if (e.gridCell.column.dataField == "total") {
        e.backgroundColor = "#DCDCDC";
        e.fontWeight = "bolder"
        e.font = { bold: true }
      }

     
    }

    if (gridCell.rowType === 'groupFooter') {
      e.backgroundColor = "#DCDCDC";
      e.fontWeight = "bolder"
      e.font = {bold: true}
    }

    if (gridCell.rowType === 'totalFooter') {
      
      e.backgroundColor = "#ff9460";
      e.fontWeight = "bolder"
      e.font = {bold: true}
    }
  }

  calcularPorcentajes(options: any) {
    // //
    // if (options.summaryProcess === 'calculate') {
    //   if (options.name === 'grupMargenUtilidaPor') {
    //     options.totalValue = .17;
    //   }
    // }
  }

  //==================Formato a la data de la grafica==================================
  formatSliderTooltip(value) {

    return Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN' }).format(value);
  }

  onShown() {
    // setTimeout(() => {
    //   this.loadingVisible = false;
    // }, 3000);
  }

  onHidden() {
  }


   getTotal(data: Array<{value?: number, total?: number}> ): number {
    return (data || []).reduce((total, item) => total + (item.value || item.total), 0);
  }

  abs(value: number): number {
    return Math.abs(value);
  }


  customizeK(e) {

    var gridCell = e.gridCell;
    if (gridCell.rowType === 'group') {

      e.backgroundColor = "#DCDCDC";
      e.fontWeight = "bolder"
      e.font = { bold: true }

    }

    if (gridCell.rowType === 'totalFooter') {

      e.backgroundColor = "#ff9460";
      e.fontWeight = "bolder"
      e.font = { bold: true }

    }


  }

  customizeExportData(cols, rows) {
    //console.log(cols)
    rows.forEach((row: any) => {

      //console.log(row)
      if (row.rowType == "groupFooter") {


      }

      if (row.rowType == "totalFooter") {
        //Enero
        row.values[5].value = totalesPor.totalE;
        row.values[7].value = totalesPor.presupuestoE;
        row.values[9].value = totalesPor.proyeccionE;
        //Febrero
        row.values[14].value = totalesPor.totalFB;
        row.values[16].value = totalesPor.presupuestoFB;
        row.values[18].value = totalesPor.proyeccionFB;
        //Marzo
        row.values[23].value = totalesPor.totalM;
        row.values[25].value = totalesPor.presupuestoM;
        row.values[27].value = totalesPor.proyeccionM;
        //Abril
        row.values[32].value = totalesPor.totalA;
        row.values[34].value = totalesPor.presupuestoA;
        row.values[36].value = totalesPor.proyeccionA;
        //Mayo
        row.values[41].value = totalesPor.totalMY;
        row.values[43].value = totalesPor.presupuestoMY;
        row.values[45].value = totalesPor.proyeccionMY;
        //JUnio
        row.values[50].value = totalesPor.totalJN;
        row.values[52].value = totalesPor.presupuestoJN;
        row.values[54].value = totalesPor.proyeccionJN;
        //Julio
        row.values[59].value = totalesPor.totalJL;
        row.values[61].value = totalesPor.presupuestoJL;
        row.values[63].value = totalesPor.proyeccionJL;
        //Agosto
        row.values[68].value = totalesPor.totalAG;
        row.values[70].value = totalesPor.presupuestoAG;
        row.values[72].value = totalesPor.proyeccionAG;
        //Septiembre
        row.values[77].value = totalesPor.totalS;
        row.values[79].value = totalesPor.presupuestoS;
        row.values[81].value = totalesPor.proyeccionS;
        //Octubre
        row.values[87].value = totalesPor.totalOC;
        row.values[89].value = totalesPor.presupuestoOC;
        row.values[91].value = totalesPor.proyeccionOC;
        //Noviembre
        row.values[96].value = totalesPor.totalNV;
        row.values[98].value = totalesPor.presupuestoNV;
        row.values[100].value = totalesPor.proyeccionNV;
        //Diciembre
        row.values[105].value = totalesPor.totalDC;
        row.values[107].value = totalesPor.presupuestoDC;
        row.values[109].value = totalesPor.proyeccionDC;

      }

    });
  }


  formatValue(value) {
    var myvalue = Math.trunc(value);

    var myFormat = myvalue.toString().split(".");
    myFormat[0] = myFormat[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");


    return "$ " + myFormat.join("");

  }

  dateBixInicio(value) {
    //console.log(value)
  }

   calculatePercent(value){
    var mypercent = Math.trunc(value);
    mypercent / 100;
    
    return mypercent +"%";
  }

  formatRedondear(value){
    var numero = value;
    var numeroR
    numero = Number(numero.toFixed(2));
    numeroR = Math.round(numero)
    return numeroR
  }
}
