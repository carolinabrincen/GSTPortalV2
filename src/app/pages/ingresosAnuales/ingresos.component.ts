import {NgModule, Component, ViewChild, enableProdMode, ChangeDetectionStrategy, ChangeDetectorRef,AfterViewInit, OnInit} from '@angular/core';
import { UnidadesService } from 'src/app/services/unidades/unidades.services';
import DataGrid from "devextreme/ui/data_grid";
import { IngresosModel } from 'src/app/shared/models/ingresos/ingresos.models';

import { DxDataGridComponent, } from 'devextreme-angular';
import { CurrencyPipe } from '@angular/common';
import { DxChartComponent, } from 'devextreme-angular';
import { ServiceSales } from '../tasks/app.serviceSales';
import { AniosModel} from './../../shared/models/rentabilidad-contable/renta-contable.model';
import {Service} from '../../shared/models/ingresos/ingreso.service'
import { TotalPorcentajes } from '../../shared/models/ingresos/totalporcentajes.model'
import { ModeloGrafica } from '../../shared/models/ingresos/modeloGrafica.model';
import { Modelos } from '../../shared/models/ingresos/modelos.model';

import { Workbook } from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { saveAs } from 'file-saver-es';
import { group } from 'console';

const totalesPor  = new TotalPorcentajes;
const totalesPorGr  = new TotalPorcentajes;

const totalesPor26  = new TotalPorcentajes;
const totalesPor25  = new TotalPorcentajes;
const totalesPor24  = new TotalPorcentajes;
const totalesPorGr24  = new TotalPorcentajes;

const groupName = new Modelos;

@Component({
  templateUrl: './ingresos.component.html',
  styleUrls: ['./ingresos.component.scss'],
  providers: [UnidadesService,ServiceSales, CurrencyPipe, Service],
})

export class IngresosComponent implements OnInit {
  @ViewChild(DxChartComponent, { static: false }) chart: any;

  @ViewChild('dataGridVar', { static: false }) dataGrid: DxDataGridComponent | undefined;

  @ViewChild('gridModal', {static: false}) gridModal: DxDataGridComponent;

  @ViewChild('gridDetalleI', { static: false }) gridDetalleI: DxDataGridComponent;

  employee: any;
  treeBoxValue: string[];
  treeDataSource: any;

  dataSource: any;
  
  indicadores: IngresosModel[] = [];
  indicadores2024: IngresosModel[] = [];
  indicadores2025: IngresosModel[] = [];
  indicadores2026: IngresosModel[] = [];

  indicadoresGrafica: any;
  kms: any;
  kmsGrafica: any;
  viajes: any;
  viajesGrafica: any;
  toneladas: any;
  toneladasGrafica: any;

  isTreeBoxOpened: boolean;
  
  gridDataSource: any;

  gridBoxValue: number[] = [3];

  dataGridInstance!: DataGrid;

  IdUnidadNegocio: number;
  UnidadNegocio: string;
  Anio: number;
 
  //loading
  loadingVisible = false;

  gridColumns: any = ['unidadNegocio','tipoOperacion', 'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
 

  anios: AniosModel[] = [
    { idAnio: 2023, anio: "2023" },
    { idAnio: 2022, anio: "2022" }
  ];

  anioSeleccionado: number;

  paginacion = 5; 
  readonly allowedPageSizes = [5, 10, 20, 50, 100, 'all'];
  
  applyChangesModes: any;

  applyChangesMode: any;

  layouts: any[];

  pivotGridDataSource: any;

  openModReal2023: boolean = false;
  openModReal2024: boolean = false;
  openModReal2025: boolean = false;
  openModReal2026: boolean = false;

  positionOf: string = '#myDiv';
  expandGroup: boolean = true;
  isVisible = false;

  totalPor = new TotalPorcentajes;
  totalFoPo = new TotalPorcentajes;
  totalPor24 = new TotalPorcentajes;
  totalFoPo24 = new TotalPorcentajes;
  totalPor25 = new TotalPorcentajes;
  totalFoPo25 = new TotalPorcentajes;

  totalPor26 = new TotalPorcentajes;
  totalFoPo26 = new TotalPorcentajes;

  graficaModel2023: ModeloGrafica[] = [];
  graficaModel2024: ModeloGrafica[] = [];
  graficaModel2025: ModeloGrafica[] = [];
  graficaModel2026: ModeloGrafica[] = [];

  constructor( 
    private unidadesService: UnidadesService, 
    private service: ServiceSales, 
    private currencyPipe: CurrencyPipe,
    testService: Service
    ) {

    this.IdUnidadNegocio = 0;
    this.UnidadNegocio = "Nacional";
    this.Anio = 2022;
    this.treeDataSource = unidadesService.getUnidades();
    
    this.isTreeBoxOpened = false;
    
    this.treeBoxValue = ['0'];

    this.customizeTooltip = this.customizeTooltip.bind(this);
    this.calcularPorcentajes = this.calcularPorcentajes.bind(this);
  }

  ngOnInit(): void {
    this.getIngresosAnuales2026();
  }

  getIngresosAnuales(){
    this.loadingVisible = true;
    var myanio = 2023;
    var myUdN = 0;
      this.service.getIndicadores(myanio, myUdN).subscribe((response) => {
    
         const orderIngreso: IngresosModel[] = response.data;
      let neworderIngreso = [];
      neworderIngreso.push(orderIngreso[3],orderIngreso[2],orderIngreso[0],orderIngreso[1],orderIngreso[4],
                        orderIngreso[6],orderIngreso[7],orderIngreso[5],
                        orderIngreso[9],orderIngreso[8],
                        orderIngreso[11],orderIngreso[10],
                        orderIngreso[13],orderIngreso[12],
                        orderIngreso[15],orderIngreso[16],orderIngreso[14],
                        orderIngreso[18],orderIngreso[17]);

        this.indicadores = neworderIngreso;
        //console.log(this.indicadores)
      });
  }
  getIngresosAnuales2024(){
    this.loadingVisible = true;
    var myanio = 2024;
    var myUdN = 0;
      this.service.getIndicadores2024(myanio, myUdN).subscribe((response) => {
    
         const orderIngreso: IngresosModel[] = response.data;
        this.indicadores2024 = response.data;

      });
  }

  getIngresosAnuales2025(){
    this.loadingVisible = true;
    var myanio = 2025;
    var myUdN = 0;
      this.service.getIndicadores2025(myanio, myUdN).subscribe((response) => {
    
         const orderIngreso: IngresosModel[] = response.data;
        this.indicadores2025 = response.data;
        console.log(this.indicadores2025)

      });
  }

  getIngresosAnuales2026(){
    this.loadingVisible = true;
    var myanio = 2026;
    var myUdN = 0;
      this.service.getIndicadores2026(myanio, myUdN).subscribe((response) => {
    
         const orderIngreso: IngresosModel[] = response.data;
        this.indicadores2026 = response.data;
        console.log(this.indicadores2026)

      });
  }

  getIngresosAnualesChart (Anio: number, UnidadNegocio: number){
    this.service.getIndicadoresGrafica(Anio, UnidadNegocio).subscribe((response) => {
       
      this.indicadoresGrafica = response.data;
      
      
      
    });
  }

  seleccionarAnio(e: any) {
    this.anioSeleccionado = e.value;
  }

  getData2023 = (e: any) =>{
    this.getIngresosAnuales();
  }

  getData2024 = (e: any) =>{
    this.getIngresosAnuales2024();
  }

  getData2025 = (e: any) =>{
    this.getIngresosAnuales2025();
  }

  Actualizar = (e: any) => {
    this.getIngresosAnuales2026();
    this.dataGrid?.instance.refresh();
  };

  saveGridInstance (e:any) {
    this.dataGridInstance = e.component;
  }

  ngAfterViewInit() {
    
    // this.pivotGrid.instance.bindChart(this.chart.instance, {
    //   dataFieldsDisplayMode: 'splitPanes',
    //   alternateDataFields: false,
    // });
  }

  customizeTooltip(args: any) {
    const valueText = (args.seriesName.indexOf('Total') != -1)
      ? new Intl.NumberFormat('en-EN', { style: 'currency', currency: 'USD' }).format(args.originalValue)
      : args.originalValue;

    return {
      html: `${args.seriesName}<div class='currency'>${valueText}</div>`,
    };
  }

  makeAsyncDataSource(http: any, jsonFile: any) {
    // return new CustomStore({
    //   loadMode: 'raw',
    //   key: 'ID',
    //   load() {
    //     return http.get(`data/${jsonFile}`)
    //       .toPromise();
    //   },
    // });
  }

  print() {
    this.chart.instance.print();
  }
  export() {
    this.chart.instance.exportTo('Example', 'png');
  }

  treeView_itemSelectionChanged(e:any) {
    this.treeBoxValue = e.component.getSelectedNodeKeys();
    this.UnidadNegocio = e.node.text;
    
    
    this.IdUnidadNegocio = Number.parseInt(this.treeBoxValue[0]);
    
  
  }
  onTreeBoxOptionChanged(e:any) {
    if (e.name === 'value') {
      this.isTreeBoxOpened = false;
      // this.ref.detectChanges();
    }
  }

  /*========================2023===========================================*/
  onRowPrepared(e: any) {

    if (e.rowType == 'totalFooter') {
      //console.log(e.summaryCells)
  /*====================================PERIODO 2023==================================================*/
      this.graficaModel2023 = [
        {mes: "ENERO", total: e.summaryCells[2][0]?.value, presupuesto: e.summaryCells[3][0]?.value},
        {mes: "FEBRERO", total: e.summaryCells[4][0]?.value, presupuesto: e.summaryCells[5][0]?.value},
        {mes: "MARZO", total: e.summaryCells[6][0]?.value, presupuesto: e.summaryCells[7][0]?.value},
        {mes: "ABRIL", total: e.summaryCells[8][0]?.value, presupuesto: e.summaryCells[9][0]?.value},
        {mes: "MAYO", total: e.summaryCells[10][0]?.value, presupuesto: e.summaryCells[11][0]?.value},
        {mes: "JUNIO", total: e.summaryCells[12][0]?.value, presupuesto: e.summaryCells[13][0]?.value},
        {mes: "JULIO", total: e.summaryCells[14][0]?.value, presupuesto: e.summaryCells[15][0]?.value},
        {mes: "AGOSTO", total: e.summaryCells[16][0]?.value, presupuesto: e.summaryCells[17][0]?.value},
        {mes: "SEPTIEMBRE", total: e.summaryCells[18][0]?.value, presupuesto: e.summaryCells[19][0]?.value},
        {mes: "OCTUBRE", total: e.summaryCells[20][0]?.value, presupuesto: e.summaryCells[21][0]?.value},
        {mes: "NOVIEMBRE", total: e.summaryCells[22][0]?.value, presupuesto: e.summaryCells[23][0]?.value},
        {mes: "DICIEMBRE", total: e.summaryCells[24][0]?.value, presupuesto: e.summaryCells[25][0]?.value},
      ]
  /*====================================PERIODO 2024==================================================*/
    

       //console.log(e.summaryCells)


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
  onCellPrepared(e: any) {
    if (e.rowType == 'groupFooter'){

        e.cellElement.style.fontSize = '15px';
        e.cellElement.style.background = "#DCDCDC";
    }
  }
  onContentReady(e: any) {

    this.loadingVisible = false;

  }

  onRowPreparedDetalle(e: any){
    if (e.rowType == 'groupFooter'){
      if(e.groupIndex == 0){
        //Enero
        this.totalPor.totalE = e.summaryCells[4][0].value;
        this.totalPor.anioAntE = e.summaryCells[5][0].value;
        this.totalPor.presupuestoE = e.summaryCells[7][0].value;
        this.totalPor.proyeccionE = e.summaryCells[9][0].value;
        //Febrero
        this.totalPor.totalFB = e.summaryCells[13][0].value;
        this.totalPor.anioAntFB = e.summaryCells[14][0].value;
        this.totalPor.presupuestoFB = e.summaryCells[16][0].value;
        this.totalPor.proyeccionFB = e.summaryCells[18][0].value;
        //Marzo
        this.totalPor.totalM = e.summaryCells[22][0].value;
        this.totalPor.anioAntM = e.summaryCells[23][0].value;
        this.totalPor.presupuestoM = e.summaryCells[25][0].value;
        this.totalPor.proyeccionM = e.summaryCells[27][0].value;
        //Abril
        this.totalPor.totalA = e.summaryCells[31][0].value;
        this.totalPor.anioAntA = e.summaryCells[32][0].value;
        this.totalPor.presupuestoA = e.summaryCells[34][0].value;
        this.totalPor.proyeccionA = e.summaryCells[36][0].value;
        //Mayo
        this.totalPor.totalMY = e.summaryCells[40][0].value;
        this.totalPor.anioAntMY = e.summaryCells[41][0].value;
        this.totalPor.presupuestoMY = e.summaryCells[43][0].value;
        this.totalPor.proyeccionMY = e.summaryCells[45][0].value;
        //Junio
        this.totalPor.totalJN = e.summaryCells[49][0].value;
        this.totalPor.anioAntJN = e.summaryCells[50][0].value;
        this.totalPor.presupuestoJN = e.summaryCells[52][0].value;
        this.totalPor.proyeccionJN = e.summaryCells[54][0].value;
        //Juio
        this.totalPor.totalJL = e.summaryCells[58][0].value;
        this.totalPor.anioAntJL = e.summaryCells[59][0].value;
        this.totalPor.presupuestoJL = e.summaryCells[61][0].value;
        this.totalPor.proyeccionJL = e.summaryCells[63][0].value;
        //Agosto
        this.totalPor.totalAG = e.summaryCells[67][0].value;
        this.totalPor.anioAntAG = e.summaryCells[68][0].value;
        this.totalPor.presupuestoAG = e.summaryCells[70][0].value;
        this.totalPor.proyeccionAG = e.summaryCells[72][0].value;
        //Septiembre
        this.totalPor.totalS = e.summaryCells[76][0].value;
        this.totalPor.anioAntS = e.summaryCells[77][0].value;
        this.totalPor.presupuestoS = e.summaryCells[79][0].value;
        this.totalPor.proyeccionS = e.summaryCells[81][0].value;
        //Octubre
        this.totalPor.totalOC = e.summaryCells[86][0].value;
        this.totalPor.anioAntOC = e.summaryCells[87][0].value;
        this.totalPor.presupuestoOC = e.summaryCells[89][0].value;
        this.totalPor.proyeccionOC = e.summaryCells[91][0].value;
        //Noviembre
        this.totalPor.totalNV = e.summaryCells[95][0].value;
        this.totalPor.anioAntNV = e.summaryCells[96][0].value;
        this.totalPor.presupuestoNV = e.summaryCells[98][0].value;
        this.totalPor.proyeccionNV = e.summaryCells[100][0].value;
        //Diciembre
        this.totalPor.totalDC = e.summaryCells[104][0].value;
        this.totalPor.anioAntDC = e.summaryCells[105][0].value;
        this.totalPor.presupuestoDC = e.summaryCells[107][0].value;
        this.totalPor.proyeccionDC = e.summaryCells[109][0].value;
        //console.log(e.summaryCells)

        //Enero
        this.totalPor.aniATotalE = this.totalPor.totalE / this.totalPor.anioAntE;
        this.totalPor.presTotalE = this.totalPor.totalE / this.totalPor.presupuestoE;
        this.totalPor.ProyTotalE = this.totalPor.proyeccionE / this.totalPor.presupuestoE;
        //Febrero
        this.totalPor.aniATotalFB = this.totalPor.totalFB / this.totalPor.anioAntFB;
        this.totalPor.presTotalFB = this.totalPor.totalFB / this.totalPor.presupuestoFB;
        this.totalPor.ProyTotalFB = this.totalPor.proyeccionFB / this.totalPor.presupuestoFB;
        //Marzo
        this.totalPor.aniATotalM = this.totalPor.totalM / this.totalPor.anioAntM;
        this.totalPor.presTotalM = this.totalPor.totalM / this.totalPor.presupuestoM;
        this.totalPor.ProyTotalM = this.totalPor.proyeccionM / this.totalPor.presupuestoM;
        //Abril
        this.totalPor.aniATotalA = this.totalPor.totalA / this.totalPor.anioAntA;
        this.totalPor.presTotalA = this.totalPor.totalA / this.totalPor.presupuestoA;
        this.totalPor.ProyTotalA = this.totalPor.proyeccionA / this.totalPor.presupuestoA;
        //Mayo
        this.totalPor.aniATotalMY = this.totalPor.totalMY / this.totalPor.anioAntMY;
        this.totalPor.presTotalMY = this.totalPor.totalMY / this.totalPor.presupuestoMY;
        this.totalPor.ProyTotalMY = this.totalPor.proyeccionMY / this.totalPor.presupuestoMY;
        //Junio
        this.totalPor.aniATotalJN = this.totalPor.totalJN / this.totalPor.anioAntJN;
        this.totalPor.presTotalJN = this.totalPor.totalJN / this.totalPor.presupuestoJN;
        this.totalPor.ProyTotalJN = this.totalPor.proyeccionJN / this.totalPor.presupuestoJN;
        //Julio
        this.totalPor.aniATotalJL = this.totalPor.totalJL / this.totalPor.anioAntJL;
        this.totalPor.presTotalJL = this.totalPor.totalJL / this.totalPor.presupuestoJL;
        this.totalPor.ProyTotalJL = this.totalPor.proyeccionJL / this.totalPor.presupuestoJL;
        //Agosto
        this.totalPor.aniATotalAG = this.totalPor.totalAG / this.totalPor.anioAntAG;
        this.totalPor.presTotalAG = this.totalPor.totalAG / this.totalPor.presupuestoAG;
        this.totalPor.ProyTotalAG = this.totalPor.proyeccionAG / this.totalPor.presupuestoAG;
        //Septiembre
        this.totalPor.aniATotalS = this.totalPor.totalS / this.totalPor.anioAntS;
        this.totalPor.presTotalS = this.totalPor.totalS / this.totalPor.presupuestoS;
        this.totalPor.ProyTotalS = this.totalPor.proyeccionS / this.totalPor.presupuestoS;
        //Octubre
        this.totalPor.aniATotalOC = this.totalPor.totalOC / this.totalPor.anioAntOC;
        this.totalPor.presTotalOC = this.totalPor.totalOC / this.totalPor.presupuestoOC;
        this.totalPor.ProyTotalOC = this.totalPor.proyeccionOC / this.totalPor.presupuestoOC;
        //Noviembre
        this.totalPor.aniATotalNV = this.totalPor.totalNV / this.totalPor.anioAntNV;
        this.totalPor.presTotalNV = this.totalPor.totalNV / this.totalPor.presupuestoNV;
        this.totalPor.ProyTotalNV = this.totalPor.proyeccionNV / this.totalPor.presupuestoNV;
        //Diciembre
        this.totalPor.aniATotalDC = this.totalPor.totalDC / this.totalPor.anioAntDC;
        this.totalPor.presTotalDC = this.totalPor.totalDC / this.totalPor.presupuestoDC;
        this.totalPor.ProyTotalDC = this.totalPor.proyeccionDC / this.totalPor.presupuestoDC;

        //Enero
        e.summaryCells[6][0].value = this.totalPor.aniATotalE;
        e.summaryCells[8][0].value = this.totalPor.presTotalE;
        e.summaryCells[10][0].value = this.totalPor.ProyTotalE;

        totalesPorGr.totalE = e.summaryCells[6][0].value;
        //Febrero
        e.summaryCells[15][0].value = this.totalPor.aniATotalFB;
        e.summaryCells[17][0].value = this.totalPor.presTotalFB;
        e.summaryCells[19][0].value = this.totalPor.ProyTotalFB;
        //Marzo
        e.summaryCells[24][0].value = this.totalPor.aniATotalM;
        e.summaryCells[26][0].value = this.totalPor.presTotalM;
        e.summaryCells[28][0].value = this.totalPor.ProyTotalM;
        //Abril
        e.summaryCells[33][0].value = this.totalPor.aniATotalA;
        e.summaryCells[35][0].value = this.totalPor.presTotalA;
        e.summaryCells[37][0].value = this.totalPor.ProyTotalA;
        //Mayo
        e.summaryCells[42][0].value = this.totalPor.aniATotalMY;
        e.summaryCells[44][0].value = this.totalPor.presTotalMY;
        e.summaryCells[46][0].value = this.totalPor.ProyTotalMY;
        //Junio
        e.summaryCells[51][0].value = this.totalPor.aniATotalJN;
        e.summaryCells[53][0].value = this.totalPor.presTotalJN;
        e.summaryCells[55][0].value = this.totalPor.ProyTotalJN;
        //Julio
        e.summaryCells[60][0].value = this.totalPor.aniATotalJL;
        e.summaryCells[62][0].value = this.totalPor.presTotalJL;
        e.summaryCells[64][0].value = this.totalPor.ProyTotalJL;
        //Agosto
        e.summaryCells[69][0].value = this.totalPor.aniATotalAG;
        e.summaryCells[71][0].value = this.totalPor.presTotalAG;
        e.summaryCells[73][0].value = this.totalPor.ProyTotalAG;
        //Septiembre
        e.summaryCells[78][0].value = this.totalPor.aniATotalS;
        e.summaryCells[80][0].value = this.totalPor.presTotalS;
        e.summaryCells[82][0].value = this.totalPor.ProyTotalS;
        //Octubre
        e.summaryCells[88][0].value = this.totalPor.aniATotalOC;
        e.summaryCells[90][0].value = this.totalPor.presTotalOC;
        e.summaryCells[92][0].value = this.totalPor.ProyTotalOC;
        //Noviembre
        e.summaryCells[97][0].value = this.totalPor.aniATotalNV;
        e.summaryCells[99][0].value = this.totalPor.presTotalNV;
        e.summaryCells[101][0].value = this.totalPor.ProyTotalNV;
        //Diciembre
        e.summaryCells[106][0].value = this.totalPor.aniATotalDC;
        e.summaryCells[108][0].value = this.totalPor.presTotalDC;
        e.summaryCells[110][0].value = this.totalPor.ProyTotalDC;

      }
    }

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
  onCellPreparedDetalle(e: any) {
    if (e.rowType == 'groupFooter'){
      
        e.cellElement.style.fontSize = '15px';
        e.cellElement.style.background = "#DCDCDC";
    }

    if(e.rowType == 'totalFooter'){

      e.totalItem.cells.forEach((c: any) => {
        //Enero
        let totalE = c.totalItem.summaryCells[4][0].value;
        let anioAntE = c.totalItem.summaryCells[5][0].value;
        let presupuestoE = c.totalItem.summaryCells[7][0].value;
        let proyeccionE = c.totalItem.summaryCells[9][0].value;
        //Febrero
        let totalFB = c.totalItem.summaryCells[13][0].value;
        let anioAntFB = c.totalItem.summaryCells[14][0].value;
        let presupuestoFB = c.totalItem.summaryCells[16][0].value;
        let proyeccionFB = c.totalItem.summaryCells[18][0].value;
        //Marzo
        let totalM = c.totalItem.summaryCells[22][0].value;
        let anioAntM = c.totalItem.summaryCells[23][0].value;
        let presupuestoM = c.totalItem.summaryCells[25][0].value;
        let proyeccionM = c.totalItem.summaryCells[27][0].value;
        //Abril
        let totalA = c.totalItem.summaryCells[31][0].value;
        let anioAntA = c.totalItem.summaryCells[32][0].value;
        let presupuestoA = c.totalItem.summaryCells[34][0].value;
        let proyeccionA = c.totalItem.summaryCells[36][0].value;
        //Mayo
        let totalMY = c.totalItem.summaryCells[40][0].value;
        let anioAntMY = c.totalItem.summaryCells[41][0].value;
        let presupuestoMY = c.totalItem.summaryCells[43][0].value;
        let proyeccionMY = c.totalItem.summaryCells[45][0].value;
        //Junio
        let totalJN = c.totalItem.summaryCells[49][0].value;
        let anioAntJN = c.totalItem.summaryCells[50][0].value;
        let presupuestoJN = c.totalItem.summaryCells[52][0].value;
        let proyeccionJN = c.totalItem.summaryCells[54][0].value;
        //Juio
        let totalJL = c.totalItem.summaryCells[58][0].value;
        let anioAntJL = c.totalItem.summaryCells[59][0].value;
        let presupuestoJL = c.totalItem.summaryCells[61][0].value;
        let proyeccionJL = c.totalItem.summaryCells[63][0].value;
        //Agosto
        let totalAG = c.totalItem.summaryCells[67][0].value;
        let anioAntAG = c.totalItem.summaryCells[68][0].value;
        let presupuestoAG = c.totalItem.summaryCells[70][0].value;
        let proyeccionAG = c.totalItem.summaryCells[72][0].value;
        //Septiembre
        let totalS = c.totalItem.summaryCells[76][0].value;
        let anioAntS = c.totalItem.summaryCells[77][0].value;
        let presupuestoS = c.totalItem.summaryCells[79][0].value;
        let proyeccionS = c.totalItem.summaryCells[81][0].value;
        //Octubre
        let totalOC = c.totalItem.summaryCells[86][0].value;
        let anioAntOC = c.totalItem.summaryCells[87][0].value;
        let presupuestoOC = c.totalItem.summaryCells[89][0].value;
        let proyeccionOC = c.totalItem.summaryCells[91][0].value;
        //Noviembre
        let totalNV = c.totalItem.summaryCells[95][0].value;
        let anioAntNV = c.totalItem.summaryCells[96][0].value;
        let presupuestoNV = c.totalItem.summaryCells[98][0].value;
        let proyeccionNV = c.totalItem.summaryCells[100][0].value;
        //Diciembre
        let totalDC = c.totalItem.summaryCells[104][0].value;
        let anioAntDC = c.totalItem.summaryCells[105][0].value;
        let presupuestoDC = c.totalItem.summaryCells[107][0].value;
        let proyeccionDC = c.totalItem.summaryCells[109][0].value;
        //console.log(c.totalItem.summaryCells)

        //Calculo de Porcentajes
        //Enero
        if(c.totalItem.summaryCells[6][0] !== undefined){
          totalE === 0 ? c.totalItem.summaryCells[6][0].value = 0 : c.totalItem.summaryCells[6][0].value = totalE/anioAntE;
          presupuestoE === 0 ? c.totalItem.summaryCells[8][0].value = 0 : c.totalItem.summaryCells[8][0].value = totalE/presupuestoE;
          proyeccionE === 0 ? c.totalItem.summaryCells[10][0].value = 0 : c.totalItem.summaryCells[10][0].value = totalE/proyeccionE;

          totalesPor.totalE = c.totalItem.summaryCells[6][0].value;
          totalesPor.presupuestoE = c.totalItem.summaryCells[8][0].value;
          totalesPor.proyeccionE = c.totalItem.summaryCells[10][0].value;

        }
        //Febrero
        if(c.totalItem.summaryCells[13][0] !== undefined){
          totalFB === 0 ? c.totalItem.summaryCells[15][0].value = 0 : c.totalItem.summaryCells[15][0].value = totalFB/anioAntFB;
          presupuestoFB === 0 ? c.totalItem.summaryCells[17][0].value = 0 : c.totalItem.summaryCells[17][0].value = totalFB/presupuestoFB;
          proyeccionFB === 0 ? c.totalItem.summaryCells[19][0].value = 0 : c.totalItem.summaryCells[19][0].value = totalFB/proyeccionFB;

          totalesPor.totalFB = c.totalItem.summaryCells[15][0].value
          totalesPor.presupuestoFB = c.totalItem.summaryCells[17][0].value
          totalesPor.proyeccionFB = c.totalItem.summaryCells[19][0].value
        }
        //Marzo
        if(c.totalItem.summaryCells[22][0] !== undefined){
          totalM === 0 ? c.totalItem.summaryCells[24][0].value = 0 : c.totalItem.summaryCells[24][0].value = totalM/anioAntM;
          presupuestoM === 0 ? c.totalItem.summaryCells[26][0].value = 0 : c.totalItem.summaryCells[26][0].value = totalM/presupuestoM;
          proyeccionM === 0 ? c.totalItem.summaryCells[28][0].value = 0 : c.totalItem.summaryCells[28][0].value = totalM/proyeccionM;

          totalesPor.totalM = c.totalItem.summaryCells[24][0].value
          totalesPor.presupuestoM = c.totalItem.summaryCells[26][0].value
          totalesPor.proyeccionM = c.totalItem.summaryCells[28][0].value
        }
        //Abril
        if(c.totalItem.summaryCells[31][0] !== undefined){
          totalA === 0 ? c.totalItem.summaryCells[33][0].value = 0 : c.totalItem.summaryCells[33][0].value = totalA/anioAntA;
          presupuestoA === 0 ? c.totalItem.summaryCells[35][0].value = 0 : c.totalItem.summaryCells[35][0].value = totalA/presupuestoA;
          proyeccionA === 0 ? c.totalItem.summaryCells[37][0].value = 0 : c.totalItem.summaryCells[37][0].value = totalA/proyeccionA;

          totalesPor.totalA = c.totalItem.summaryCells[33][0].value
          totalesPor.presupuestoA = c.totalItem.summaryCells[35][0].value
          totalesPor.proyeccionA = c.totalItem.summaryCells[37][0].value
        }
        //Mayo
        if(c.totalItem.summaryCells[40][0] !== undefined){
          totalMY === 0 ? c.totalItem.summaryCells[42][0].value = 0 : c.totalItem.summaryCells[42][0].value = totalMY/anioAntMY;
          presupuestoMY === 0 ? c.totalItem.summaryCells[44][0].value = 0 : c.totalItem.summaryCells[44][0].value = totalMY/presupuestoMY;
          proyeccionMY === 0 ? c.totalItem.summaryCells[46][0].value = 0 : c.totalItem.summaryCells[46][0].value = totalMY/proyeccionMY;

          totalesPor.totalMY = c.totalItem.summaryCells[42][0].value
          totalesPor.presupuestoMY = c.totalItem.summaryCells[44][0].value
          totalesPor.proyeccionMY = c.totalItem.summaryCells[46][0].value
        }
        //Junio
        if(c.totalItem.summaryCells[49][0] !== undefined){
          totalJN === 0 ? c.totalItem.summaryCells[51][0].value = 0 : c.totalItem.summaryCells[51][0].value = totalJN/anioAntJN;
          presupuestoJN === 0 ? c.totalItem.summaryCells[53][0].value = 0 : c.totalItem.summaryCells[53][0].value = totalJN/presupuestoJN;
          proyeccionJN === 0 ? c.totalItem.summaryCells[55][0].value = 0 : c.totalItem.summaryCells[55][0].value = totalJN/proyeccionJN;

          totalesPor.totalJN = c.totalItem.summaryCells[51][0].value
          totalesPor.presupuestoJN = c.totalItem.summaryCells[53][0].value
          totalesPor.proyeccionJN = c.totalItem.summaryCells[55][0].value
        }
        //Julio
        if(c.totalItem.summaryCells[58][0] !== undefined){
          totalJL === 0 ? c.totalItem.summaryCells[60][0].value = 0 : c.totalItem.summaryCells[60][0].value = totalJL/anioAntJL;
          presupuestoJL === 0 ? c.totalItem.summaryCells[62][0].value = 0 : c.totalItem.summaryCells[62][0].value = totalJL/presupuestoJL;
          proyeccionJL === 0 ? c.totalItem.summaryCells[64][0].value = 0 : c.totalItem.summaryCells[64][0].value = totalJL/proyeccionJL;

          totalesPor.totalJL = c.totalItem.summaryCells[60][0].value
          totalesPor.presupuestoJL = c.totalItem.summaryCells[62][0].value
          totalesPor.proyeccionJL = c.totalItem.summaryCells[64][0].value
        }
        //Agosto
        if(c.totalItem.summaryCells[67][0] !== undefined){
          totalAG === 0 ? c.totalItem.summaryCells[69][0].value = 0 : c.totalItem.summaryCells[69][0].value = totalAG/anioAntAG;
          presupuestoAG === 0 ? c.totalItem.summaryCells[71][0].value = 0 : c.totalItem.summaryCells[71][0].value = totalAG/presupuestoAG;
          proyeccionAG === 0 ? c.totalItem.summaryCells[73][0].value = 0 : c.totalItem.summaryCells[73][0].value = totalAG/proyeccionAG;

          totalesPor.totalAG = c.totalItem.summaryCells[69][0].value
          totalesPor.presupuestoAG = c.totalItem.summaryCells[71][0].value
          totalesPor.proyeccionAG = c.totalItem.summaryCells[73][0].value
        }
        //Septiembre
        if(c.totalItem.summaryCells[76][0] !== undefined){
          totalS === 0 ? c.totalItem.summaryCells[78][0].value = 0 : c.totalItem.summaryCells[78][0].value = totalS/anioAntS;
          presupuestoS === 0 ? c.totalItem.summaryCells[80][0].value = 0 : c.totalItem.summaryCells[80][0].value = totalS/presupuestoS;
          proyeccionS === 0 ? c.totalItem.summaryCells[82][0].value = 0 : c.totalItem.summaryCells[82][0].value = totalS/proyeccionS;

          totalesPor.totalS = c.totalItem.summaryCells[78][0].value
          totalesPor.presupuestoS = c.totalItem.summaryCells[80][0].value
          totalesPor.proyeccionS = c.totalItem.summaryCells[82][0].value
        }
        //Octubre
        if(c.totalItem.summaryCells[86][0] !== undefined){
          totalOC === 0 ? c.totalItem.summaryCells[88][0].value = 0 : c.totalItem.summaryCells[88][0].value = totalOC/anioAntOC;
          presupuestoOC === 0 ? c.totalItem.summaryCells[90][0].value = 0 : c.totalItem.summaryCells[90][0].value = totalOC/presupuestoOC;
          proyeccionOC === 0 ? c.totalItem.summaryCells[92][0].value = 0 : c.totalItem.summaryCells[92][0].value = totalOC/proyeccionOC;

          totalesPor.totalOC = c.totalItem.summaryCells[88][0].value
          totalesPor.presupuestoOC = c.totalItem.summaryCells[90][0].value
          totalesPor.proyeccionOC = c.totalItem.summaryCells[92][0].value
        }
        //Noviembre
        if(c.totalItem.summaryCells[95][0] !== undefined){
          totalNV === 0 ? c.totalItem.summaryCells[97][0].value = 0 : c.totalItem.summaryCells[97][0].value = totalNV/anioAntNV;
          presupuestoNV === 0 ? c.totalItem.summaryCells[99][0].value = 0 : c.totalItem.summaryCells[99][0].value = totalNV/presupuestoNV;
          proyeccionNV === 0 ? c.totalItem.summaryCells[101][0].value = 0 : c.totalItem.summaryCells[101][0].value = totalNV/proyeccionNV;

          totalesPor.totalNV = c.totalItem.summaryCells[97][0].value
          totalesPor.presupuestoNV = c.totalItem.summaryCells[99][0].value
          totalesPor.proyeccionNV = c.totalItem.summaryCells[101][0].value
        }
        //Diciembre
        if(c.totalItem.summaryCells[104][0] !== undefined){
          totalDC === 0 ? c.totalItem.summaryCells[106][0].value = 0 : c.totalItem.summaryCells[106][0].value = totalDC/anioAntDC;
          presupuestoDC === 0 ? c.totalItem.summaryCells[108][0].value = 0 : c.totalItem.summaryCells[108][0].value = totalDC/presupuestoDC;
          proyeccionDC === 0 ? c.totalItem.summaryCells[110][0].value = 0 : c.totalItem.summaryCells[110][0].value = totalDC/presupuestoDC;

          totalesPor.totalDC = c.totalItem.summaryCells[106][0].value
          totalesPor.presupuestoDC = c.totalItem.summaryCells[108][0].value
          totalesPor.proyeccionDC = c.totalItem.summaryCells[110][0].value
        }
      })
      
    }
  }

  verDetallesClick2023(event) {

    if(event.cellElement.innerText == "Enero" || event.cellElement.innerText == "Febrero" || event.cellElement.innerText == "Marzo"
    || event.cellElement.innerText == "Abril" || event.cellElement.innerText == "Mayo" || event.cellElement.innerText == "Junio"
    || event.cellElement.innerText == "Julio" || event.cellElement.innerText == "Agosto" || event.cellElement.innerText == "Septiembre"
    || event.cellElement.innerText == "Octubre" || event.cellElement.innerText == "Noviembre" || event.cellElement.innerText == "Diciembre" ){

        this.openModReal2023 = true;
    }
  }
  /*========================2024===========================================*/
  onRowPrepared2024(e: any) {

    if (e.rowType == 'totalFooter') {
      //console.log(e.summaryCells)
  /*====================================PERIODO 2024==================================================*/
  this.graficaModel2024 = [
    {mes: "ENERO", total: e.summaryCells[2][0]?.value, presupuesto: e.summaryCells[3][0]?.value},  
    {mes: "FEBRERO", total: e.summaryCells[4][0]?.value, presupuesto: e.summaryCells[5][0]?.value},
    {mes: "MARZO", total: e.summaryCells[6][0]?.value, presupuesto: e.summaryCells[7][0]?.value},
    {mes: "ABRIL", total: e.summaryCells[8][0]?.value, presupuesto: e.summaryCells[9][0]?.value},
    {mes: "MAYO", total: e.summaryCells[10][0]?.value, presupuesto: e.summaryCells[11][0]?.value},
    {mes: "JUNIO", total: e.summaryCells[12][0]?.value, presupuesto: e.summaryCells[13][0]?.value},
    {mes: "JULIO", total: e.summaryCells[14][0]?.value, presupuesto: e.summaryCells[15][0]?.value},
    {mes: "AGOSTO", total: e.summaryCells[16][0]?.value, presupuesto: e.summaryCells[17][0]?.value},
    {mes: "SEPTIEMBRE", total: e.summaryCells[18][0]?.value, presupuesto: e.summaryCells[19][0]?.value},
    {mes: "OCTUBRE", total: e.summaryCells[20][0]?.value, presupuesto: e.summaryCells[21][0]?.value},
    {mes: "NOVIEMBRE", total: e.summaryCells[22][0]?.value, presupuesto: e.summaryCells[23][0]?.value},
    {mes: "DICIEMBRE", total: e.summaryCells[24][0]?.value, presupuesto: e.summaryCells[25][0]?.value},
  ]
  //        {mes: "MARZO", total: e.summaryCells[6][0]?.value, presupuesto: e.summaryCells[7][0]?.value},
  //console.log(e.summaryCells)

       //console.log(e.summaryCells)


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
  onCellPrepared2024(e: any) {
    if (e.rowType == 'groupFooter'){

        e.cellElement.style.fontSize = '15px';
        e.cellElement.style.background = "#DCDCDC";
    }
  }
  onContentReady2024(e: any) {

    this.loadingVisible = false;

  }

  onRowPreparedDetalle2024(e: any){
    if (e.rowType == 'groupFooter'){
 
      if(e.groupIndex == 0){
        //console.log(e.summaryCells)
        //ENERO 2024
        this.totalPor24.totalE = e.summaryCells[4][0]?.value;
        this.totalPor24.anioAntE = e.summaryCells[5][0]?.value;
        this.totalPor24.presupuestoE = e.summaryCells[7][0]?.value;
        this.totalPor24.proyeccionE = e.summaryCells[9][0]?.value;
        //Febrero
        this.totalPor24.totalFB = e.summaryCells[13][0].value;
        this.totalPor24.anioAntFB = e.summaryCells[14][0].value;
        this.totalPor24.presupuestoFB = e.summaryCells[16][0].value;
        this.totalPor24.proyeccionFB = e.summaryCells[18][0].value;
        // //Marzo
        this.totalPor24.totalM = e.summaryCells[22][0].value;
        this.totalPor24.anioAntM = e.summaryCells[23][0].value;
        this.totalPor24.presupuestoM = e.summaryCells[25][0].value;
        this.totalPor24.proyeccionM = e.summaryCells[27][0].value;
        // //Abril
        this.totalPor24.totalA = e.summaryCells[31][0].value;
        this.totalPor24.anioAntA = e.summaryCells[32][0].value;
        this.totalPor24.presupuestoA = e.summaryCells[34][0].value;
        this.totalPor24.proyeccionA = e.summaryCells[36][0].value;
        // //Mayo
        this.totalPor24.totalMY = e.summaryCells[40][0].value;
        this.totalPor24.anioAntMY = e.summaryCells[41][0].value;
        this.totalPor24.presupuestoMY = e.summaryCells[43][0].value;
        this.totalPor24.proyeccionMY = e.summaryCells[45][0].value;
        // //Junio
        this.totalPor24.totalJN = e.summaryCells[49][0].value;
        this.totalPor24.anioAntJN = e.summaryCells[50][0].value;
        this.totalPor24.presupuestoJN = e.summaryCells[52][0].value;
        this.totalPor24.proyeccionJN = e.summaryCells[54][0].value;
        // //Juio
        this.totalPor24.totalJL = e.summaryCells[58][0].value;
        this.totalPor24.anioAntJL = e.summaryCells[59][0].value;
        this.totalPor24.presupuestoJL = e.summaryCells[61][0].value;
        this.totalPor24.proyeccionJL = e.summaryCells[63][0].value;
        // //Agosto
        this.totalPor24.totalAG = e.summaryCells[67][0].value;
        this.totalPor24.anioAntAG = e.summaryCells[68][0].value;
        this.totalPor24.presupuestoAG = e.summaryCells[70][0].value;
        this.totalPor24.proyeccionAG = e.summaryCells[72][0].value;
        // //Septiembre
        this.totalPor24.totalS = e.summaryCells[76][0].value;
        this.totalPor24.anioAntS = e.summaryCells[77][0].value;
        this.totalPor24.presupuestoS = e.summaryCells[79][0].value;
        this.totalPor24.proyeccionS = e.summaryCells[81][0].value;
        // //Octubre
        this.totalPor24.totalOC = e.summaryCells[86][0].value;
        this.totalPor24.anioAntOC = e.summaryCells[87][0].value;
        this.totalPor24.presupuestoOC = e.summaryCells[89][0].value;
        this.totalPor24.proyeccionOC = e.summaryCells[91][0].value;
        // //Noviembre
        this.totalPor24.totalNV = e.summaryCells[95][0].value;
        this.totalPor24.anioAntNV = e.summaryCells[96][0].value;
        this.totalPor24.presupuestoNV = e.summaryCells[98][0].value;
        this.totalPor24.proyeccionNV = e.summaryCells[100][0].value;
        // //Diciembre
        this.totalPor24.totalDC = e.summaryCells[106][0].value;
        this.totalPor24.anioAntDC = e.summaryCells[107][0].value;
        this.totalPor24.presupuestoDC = e.summaryCells[109][0].value;
        this.totalPor24.proyeccionDC = e.summaryCells[111][0].value;
        // console.log(e.summaryCells)

        //ENERO2024
        this.totalPor24.aniATotalE = this.totalPor24.totalE / this.totalPor24.anioAntE;
        this.totalPor24.presTotalE = this.totalPor24.totalE / this.totalPor24.presupuestoE;
        this.totalPor24.ProyTotalE = this.totalPor24.proyeccionE / this.totalPor24.presupuestoE;
        // //Febrero
        this.totalPor24.aniATotalFB = this.totalPor24.totalFB / this.totalPor24.anioAntFB;
        this.totalPor24.presTotalFB = this.totalPor24.totalFB / this.totalPor24.presupuestoFB;
        this.totalPor24.ProyTotalFB = this.totalPor24.proyeccionFB / this.totalPor24.presupuestoFB;
        // //Marzo
        this.totalPor24.aniATotalM = this.totalPor24.totalM / this.totalPor24.anioAntM;
        this.totalPor24.presTotalM = this.totalPor24.totalM / this.totalPor24.presupuestoM;
        this.totalPor24.ProyTotalM = this.totalPor24.proyeccionM / this.totalPor24.presupuestoM;
        // //Abril
        this.totalPor24.aniATotalA = this.totalPor24.totalA / this.totalPor24.anioAntA;
        this.totalPor24.presTotalA = this.totalPor24.totalA / this.totalPor24.presupuestoA;
        this.totalPor24.ProyTotalA = this.totalPor24.proyeccionA / this.totalPor24.presupuestoA;
        // //Mayo
        this.totalPor24.aniATotalMY = this.totalPor24.totalMY / this.totalPor24.anioAntMY;
        this.totalPor24.presTotalMY = this.totalPor24.totalMY / this.totalPor24.presupuestoMY;
        this.totalPor24.ProyTotalMY = this.totalPor24.proyeccionMY / this.totalPor24.presupuestoMY;
        // //Junio
        this.totalPor24.aniATotalJN = this.totalPor24.totalJN / this.totalPor24.anioAntJN;
        this.totalPor24.presTotalJN = this.totalPor24.totalJN / this.totalPor24.presupuestoJN;
        this.totalPor24.ProyTotalJN = this.totalPor24.proyeccionJN / this.totalPor24.presupuestoJN;
        // //Julio
        this.totalPor24.aniATotalJL = this.totalPor24.totalJL / this.totalPor24.anioAntJL;
        this.totalPor24.presTotalJL = this.totalPor24.totalJL / this.totalPor24.presupuestoJL;
        this.totalPor24.ProyTotalJL = this.totalPor24.proyeccionJL / this.totalPor24.presupuestoJL;
        // //Agosto
        this.totalPor24.aniATotalAG = this.totalPor24.totalAG / this.totalPor24.anioAntAG;
        this.totalPor24.presTotalAG = this.totalPor24.totalAG / this.totalPor24.presupuestoAG;
        this.totalPor24.ProyTotalAG = this.totalPor24.proyeccionAG / this.totalPor24.presupuestoAG;
        // //Septiembre
        this.totalPor24.aniATotalS = this.totalPor24.totalS / this.totalPor24.anioAntS;
        this.totalPor24.presTotalS = this.totalPor24.totalS / this.totalPor24.presupuestoS;
        this.totalPor24.ProyTotalS = this.totalPor24.proyeccionS / this.totalPor24.presupuestoS;
        // //Octubre
        this.totalPor24.aniATotalOC = this.totalPor24.totalOC / this.totalPor24.anioAntOC;
        this.totalPor24.presTotalOC = this.totalPor24.totalOC / this.totalPor24.presupuestoOC;
        this.totalPor24.ProyTotalOC = this.totalPor24.proyeccionOC / this.totalPor24.presupuestoOC;
        // //Noviembre
        this.totalPor24.aniATotalNV = this.totalPor24.totalNV / this.totalPor24.anioAntNV;
        this.totalPor24.presTotalNV = this.totalPor24.totalNV / this.totalPor24.presupuestoNV;
        this.totalPor24.ProyTotalNV = this.totalPor24.proyeccionNV / this.totalPor24.presupuestoNV;
        // //Diciembre
        this.totalPor24.aniATotalDC = this.totalPor24.totalDC / this.totalPor24.anioAntDC;
        this.totalPor24.presTotalDC = this.totalPor24.totalDC / this.totalPor24.presupuestoDC;
        this.totalPor24.ProyTotalDC = this.totalPor24.proyeccionDC / this.totalPor24.presupuestoDC;
     

        //ENERO2024
        if(e.summaryCells[10][0].value !== undefined){
          e.summaryCells[6][0].value = this.totalPor24.aniATotalE;
          e.summaryCells[8][0].value = this.totalPor24.presTotalE;
          e.summaryCells[10][0].value = this.totalPor24.ProyTotalE;
  
        }
        totalesPorGr.totalE = e.summaryCells[6][0]?.value;
        //Febrero
        if(e.summaryCells[15][0].value !== undefined){
          e.summaryCells[15][0].value = this.totalPor24.aniATotalFB;
          e.summaryCells[17][0].value = this.totalPor24.presTotalFB;
          e.summaryCells[19][0].value = this.totalPor24.ProyTotalFB;
        }
        // //Marzo
        if(e.summaryCells[24][0].value !== undefined){
          e.summaryCells[24][0].value = this.totalPor24.aniATotalM;
          e.summaryCells[26][0].value = this.totalPor24.presTotalM;
          e.summaryCells[28][0].value = this.totalPor24.ProyTotalM;
        }
        // //Abril
        if(e.summaryCells[33][0].value !== undefined){
          e.summaryCells[33][0].value = this.totalPor24.aniATotalA;
          e.summaryCells[35][0].value = this.totalPor24.presTotalA;
          e.summaryCells[37][0].value = this.totalPor24.ProyTotalA;
        }
        // //Mayo
        if(e.summaryCells[42][0].value !== undefined){
          e.summaryCells[42][0].value = this.totalPor24.aniATotalMY;
          e.summaryCells[44][0].value = this.totalPor24.presTotalMY;
          e.summaryCells[46][0].value = this.totalPor24.ProyTotalMY;
        }
        // //Junio
        if(e.summaryCells[51][0].value !== undefined){
          e.summaryCells[51][0].value = this.totalPor24.aniATotalJN;
          e.summaryCells[53][0].value = this.totalPor24.presTotalJN;
          e.summaryCells[55][0].value = this.totalPor24.ProyTotalJN;
        }
        // //Julio
        if(e.summaryCells[60][0].value !== undefined){
          e.summaryCells[60][0].value = this.totalPor24.aniATotalJL;
          e.summaryCells[62][0].value = this.totalPor24.presTotalJL;
          e.summaryCells[64][0].value = this.totalPor24.ProyTotalJL;
        }
        // //Agosto
        if(e.summaryCells[69][0].value !== undefined){
          e.summaryCells[69][0].value = this.totalPor24.aniATotalAG;
          e.summaryCells[71][0].value = this.totalPor24.presTotalAG;
          e.summaryCells[73][0].value = this.totalPor24.ProyTotalAG;
        }
        // //Septiembre
        if(e.summaryCells[78][0].value !== undefined){
          e.summaryCells[78][0].value = this.totalPor24.aniATotalS;
          e.summaryCells[80][0].value = this.totalPor24.presTotalS;
          e.summaryCells[82][0].value = this.totalPor24.ProyTotalS;
        }
        // //Octubre
        if(e.summaryCells[88][0].value !== undefined){
          e.summaryCells[88][0].value = this.totalPor24.aniATotalOC;
          e.summaryCells[90][0].value = this.totalPor24.presTotalOC;
          e.summaryCells[92][0].value = this.totalPor24.ProyTotalOC;
        }
        // //Noviembre
        if(e.summaryCells[97][0].value !== undefined){
          e.summaryCells[97][0].value = this.totalPor24.aniATotalNV;
          e.summaryCells[99][0].value = this.totalPor24.presTotalNV;
          e.summaryCells[103][0].value = this.totalPor24.ProyTotalNV;
        
        }
          // //Diciembre
        if(e.summaryCells[108][0].value !== undefined){  
          e.summaryCells[108][0].value = this.totalPor24.aniATotalDC;
          e.summaryCells[110][0].value = this.totalPor24.presTotalDC;
          e.summaryCells[114][0].value = this.totalPor24.ProyTotalDC;
        }
      }
    }

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
  onCellPreparedDetalle2024(e: any) {
    if (e.rowType == 'groupFooter'){
      
        e.cellElement.style.fontSize = '15px';
        e.cellElement.style.background = "#DCDCDC";
    }

    if(e.rowType == 'totalFooter'){

      e.totalItem.cells.forEach((c: any) => {
        //ENERO 2024
        let total24E = c.totalItem.summaryCells[4][0]?.value;
        let anioAnt24E = c.totalItem.summaryCells[5][0]?.value;
        let presupuesto24E = c.totalItem.summaryCells[7][0]?.value;
        let proyeccion24E = c.totalItem.summaryCells[9][0]?.value;
        // //Febrero
        let total24FB = c.totalItem.summaryCells[13][0].value;
        let anioAnt24FB = c.totalItem.summaryCells[14][0].value;
        let presupuesto24FB = c.totalItem.summaryCells[16][0].value;
        let proyeccion24FB = c.totalItem.summaryCells[18][0].value;
        // //Marzo
        let total24M = c.totalItem.summaryCells[22][0].value;
        let anioAnt24M = c.totalItem.summaryCells[23][0].value;
        let presupuesto24M = c.totalItem.summaryCells[25][0].value;
        let proyeccion24M = c.totalItem.summaryCells[27][0].value;
        // //Abril
        let total24A = c.totalItem.summaryCells[31][0].value;
        let anioAnt24A = c.totalItem.summaryCells[32][0].value;
        let presupuesto24A = c.totalItem.summaryCells[34][0].value;
        let proyeccion24A = c.totalItem.summaryCells[36][0].value;
        // //Mayo
        // console.log(c.totalItem.summaryCells)
        let totalMY24 = c.totalItem.summaryCells[40][0].value;
        let anioAntMY24 = c.totalItem.summaryCells[41][0].value;
        let presupuestoMY24 = c.totalItem.summaryCells[43][0].value;
        let proyeccionMY24 = c.totalItem.summaryCells[45][0].value;
        // //Junio
        let totalJN24 = c.totalItem.summaryCells[49][0].value;
        let anioAntJN24 = c.totalItem.summaryCells[50][0].value;
        let presupuestoJN24 = c.totalItem.summaryCells[52][0].value;
        let proyeccionJN24 = c.totalItem.summaryCells[54][0].value;
        // //Juio
        let totalJL24 = c.totalItem.summaryCells[58][0].value;
        let anioAntJL24 = c.totalItem.summaryCells[59][0].value;
        let presupuestoJL24 = c.totalItem.summaryCells[61][0].value;
        let proyeccionJL24 = c.totalItem.summaryCells[63][0].value;
        // //Agosto
        let totalAG24 = c.totalItem.summaryCells[67][0].value;
        let anioAntAG24 = c.totalItem.summaryCells[68][0].value;
        let presupuestoAG24 = c.totalItem.summaryCells[70][0].value;
        let proyeccionAG24 = c.totalItem.summaryCells[72][0].value;
        // //Septiembre
        let totalS24 = c.totalItem.summaryCells[76][0].value;
        let anioAntS24 = c.totalItem.summaryCells[77][0].value;
        let presupuestoS24 = c.totalItem.summaryCells[79][0].value;
        let proyeccionS24 = c.totalItem.summaryCells[81][0].value;
        // //Octubre
        let totalOC24 = c.totalItem.summaryCells[86][0].value;
        let anioAntOC24 = c.totalItem.summaryCells[87][0].value;
        let presupuestoOC24 = c.totalItem.summaryCells[89][0].value;
        let proyeccionOC24 = c.totalItem.summaryCells[91][0].value;
        // //Noviembre
        let totalNV24 = c.totalItem.summaryCells[95][0].value;
        let anioAntNV24 = c.totalItem.summaryCells[96][0].value;
        let presupuestoNV24 = c.totalItem.summaryCells[98][0].value;
        let proyeccionNV24 = c.totalItem.summaryCells[100][0].value;
        // //Diciembre
        let totalDC24 = c.totalItem.summaryCells[106][0].value;
        let anioAntDC24 = c.totalItem.summaryCells[107][0].value;
        let presupuestoDC24 = c.totalItem.summaryCells[109][0].value;
        let proyeccionDC24 = c.totalItem.summaryCells[111][0].value;
        // console.log(c.totalItem.summaryCells)

        //Calculo de Porcentajes
        //ENERO 2024
        if(c.totalItem.summaryCells[6][0] !== undefined){
          total24E === 0 ? c.totalItem.summaryCells[6][0].value = 0 : c.totalItem.summaryCells[6][0].value = total24E/anioAnt24E;
          presupuesto24E === 0 ? c.totalItem.summaryCells[8][0].value = 0 : c.totalItem.summaryCells[8][0].value = total24E/presupuesto24E;
          proyeccion24E === 0 ? c.totalItem.summaryCells[10][0].value = 0 : c.totalItem.summaryCells[10][0].value = total24E/presupuesto24E;

          totalesPor24.totalE = c.totalItem.summaryCells[6][0].value
          totalesPor24.presupuestoE = c.totalItem.summaryCells[8][0].value
          totalesPor24.proyeccionE = c.totalItem.summaryCells[10][0].value
        }
        // //Febrero
        if(c.totalItem.summaryCells[15][0] !== undefined){
          total24FB === 0 ? c.totalItem.summaryCells[15][0].value = 0 : c.totalItem.summaryCells[15][0].value = total24FB/anioAnt24FB;
          presupuesto24FB === 0 ? c.totalItem.summaryCells[17][0].value = 0 : c.totalItem.summaryCells[17][0].value = total24FB/presupuesto24FB;
          proyeccion24FB === 0 ? c.totalItem.summaryCells[19][0].value = 0 : c.totalItem.summaryCells[19][0].value = total24FB/proyeccion24FB;

          totalesPor24.totalFB = c.totalItem.summaryCells[15][0].value
          totalesPor24.presupuestoFB = c.totalItem.summaryCells[17][0].value
          totalesPor24.proyeccionFB = c.totalItem.summaryCells[19][0].value
        }
        // //Marzo
        if(c.totalItem.summaryCells[24][0] !== undefined){
          total24M === 0 ? c.totalItem.summaryCells[24][0].value = 0 : c.totalItem.summaryCells[24][0].value = total24M/anioAnt24M;
          presupuesto24M === 0 ? c.totalItem.summaryCells[26][0].value = 0 : c.totalItem.summaryCells[26][0].value = total24M/presupuesto24M;
          proyeccion24M === 0 ? c.totalItem.summaryCells[28][0].value = 0 : c.totalItem.summaryCells[28][0].value = total24M/proyeccion24M;

          totalesPor24.totalM = c.totalItem.summaryCells[24][0].value
          totalesPor24.presupuestoM = c.totalItem.summaryCells[26][0].value
          totalesPor24.proyeccionM = c.totalItem.summaryCells[28][0].value
        }
        // //Abril
        if(c.totalItem.summaryCells[33][0] !== undefined){
          total24A === 0 ? c.totalItem.summaryCells[33][0].value = 0 : c.totalItem.summaryCells[33][0].value = total24A/anioAnt24A;
          presupuesto24A === 0 ? c.totalItem.summaryCells[35][0].value = 0 : c.totalItem.summaryCells[35][0].value = total24A/presupuesto24A;
          proyeccion24A === 0 ? c.totalItem.summaryCells[37][0].value = 0 : c.totalItem.summaryCells[37][0].value = total24A/proyeccion24A;

          totalesPor24.totalA = c.totalItem.summaryCells[33][0].value
          totalesPor24.presupuestoA = c.totalItem.summaryCells[35][0].value
          totalesPor24.proyeccionA = c.totalItem.summaryCells[37][0].value
        }
        // //Mayo
        if(c.totalItem.summaryCells[42][0] !== undefined){
          totalMY24 === 0 ? c.totalItem.summaryCells[42][0].value = 0 : c.totalItem.summaryCells[42][0].value = totalMY24/anioAntMY24;
          presupuestoMY24 === 0 ? c.totalItem.summaryCells[44][0].value = 0 : c.totalItem.summaryCells[44][0].value = totalMY24/presupuestoMY24;
          proyeccionMY24 === 0 ? c.totalItem.summaryCells[46][0].value = 0 : c.totalItem.summaryCells[46][0].value = totalMY24/proyeccionMY24;

          totalesPor24.totalMY = c.totalItem.summaryCells[42][0].value
          totalesPor24.presupuestoMY = c.totalItem.summaryCells[44][0].value
          totalesPor24.proyeccionMY = c.totalItem.summaryCells[46][0].value
        }
        //Junio
        if(c.totalItem.summaryCells[51][0] !== undefined){
          totalJN24 === 0 ? c.totalItem.summaryCells[51][0].value = 0 : c.totalItem.summaryCells[51][0].value = totalJN24/anioAntJN24;
          presupuestoJN24 === 0 ? c.totalItem.summaryCells[53][0].value = 0 : c.totalItem.summaryCells[53][0].value = totalJN24/presupuestoJN24;
          proyeccionJN24 === 0 ? c.totalItem.summaryCells[55][0].value = 0 : c.totalItem.summaryCells[55][0].value = totalJN24/proyeccionJN24;

          totalesPor24.totalJN = c.totalItem.summaryCells[51][0].value
          totalesPor24.presupuestoJN = c.totalItem.summaryCells[53][0].value
          totalesPor24.proyeccionJN = c.totalItem.summaryCells[55][0].value
        }
        // //Julio
        if(c.totalItem.summaryCells[60][0] !== undefined){
          totalJL24 === 0 ? c.totalItem.summaryCells[60][0].value = 0 : c.totalItem.summaryCells[60][0].value = totalJL24/anioAntJL24;
          presupuestoJL24 === 0 ? c.totalItem.summaryCells[62][0].value = 0 : c.totalItem.summaryCells[62][0].value = totalJL24/presupuestoJL24;
          proyeccionJL24 === 0 ? c.totalItem.summaryCells[64][0].value = 0 : c.totalItem.summaryCells[64][0].value = totalJL24/proyeccionJL24;

          totalesPor24.totalJL = c.totalItem.summaryCells[60][0].value
          totalesPor24.presupuestoJL = c.totalItem.summaryCells[62][0].value
          totalesPor24.proyeccionJL = c.totalItem.summaryCells[64][0].value
        }
        // //Agosto
        if(c.totalItem.summaryCells[69][0] !== undefined){
          totalAG24 === 0 ? c.totalItem.summaryCells[69][0].value = 0 : c.totalItem.summaryCells[69][0].value = totalAG24/anioAntAG24;
          presupuestoAG24 === 0 ? c.totalItem.summaryCells[71][0].value = 0 : c.totalItem.summaryCells[71][0].value = totalAG24/presupuestoAG24;
          proyeccionAG24 === 0 ? c.totalItem.summaryCells[73][0].value = 0 : c.totalItem.summaryCells[73][0].value = totalAG24/proyeccionAG24;

          totalesPor24.totalAG = c.totalItem.summaryCells[69][0].value
          totalesPor24.presupuestoAG = c.totalItem.summaryCells[71][0].value
          totalesPor24.proyeccionAG = c.totalItem.summaryCells[73][0].value
        }
        // //Septiembre
        if(c.totalItem.summaryCells[78][0] !== undefined){
          totalS24 === 0 ? c.totalItem.summaryCells[78][0].value = 0 : c.totalItem.summaryCells[78][0].value = totalS24/anioAntS24;
          presupuestoS24 === 0 ? c.totalItem.summaryCells[80][0].value = 0 : c.totalItem.summaryCells[80][0].value = totalS24/presupuestoS24;
          proyeccionS24 === 0 ? c.totalItem.summaryCells[82][0].value = 0 : c.totalItem.summaryCells[82][0].value = totalS24/proyeccionS24;

          totalesPor24.totalS = c.totalItem.summaryCells[78][0].value
          totalesPor24.presupuestoS = c.totalItem.summaryCells[80][0].value
          totalesPor24.proyeccionS = c.totalItem.summaryCells[82][0].value
        }
        // //Octubre
        if(c.totalItem.summaryCells[88][0] !== undefined){
          totalOC24 === 0 ? c.totalItem.summaryCells[88][0].value = 0 : c.totalItem.summaryCells[88][0].value = totalOC24/anioAntOC24;
          presupuestoOC24 === 0 ? c.totalItem.summaryCells[90][0].value = 0 : c.totalItem.summaryCells[90][0].value = totalOC24/presupuestoOC24;
          proyeccionOC24 === 0 ? c.totalItem.summaryCells[92][0].value = 0 : c.totalItem.summaryCells[92][0].value = totalOC24/proyeccionOC24;

          totalesPor24.totalOC = c.totalItem.summaryCells[88][0].value
          totalesPor24.presupuestoOC = c.totalItem.summaryCells[90][0].value
          totalesPor24.proyeccionOC = c.totalItem.summaryCells[92][0].value
        }
        // //Noviembre
        if(c.totalItem.summaryCells[97][0] !== undefined){
          totalNV24 === 0 ? c.totalItem.summaryCells[97][0].value = 0 : c.totalItem.summaryCells[97][0].value = totalNV24/anioAntNV24;
          presupuestoNV24 === 0 ? c.totalItem.summaryCells[99][0].value = 0 : c.totalItem.summaryCells[99][0].value = totalNV24/presupuestoNV24;
          proyeccionNV24 === 0 ? c.totalItem.summaryCells[103][0].value = 0 : c.totalItem.summaryCells[103][0].value = totalNV24/proyeccionNV24;

          totalesPor24.totalNV = c.totalItem.summaryCells[97][0].value
          totalesPor24.presupuestoNV = c.totalItem.summaryCells[99][0].value
          totalesPor24.proyeccionNV = c.totalItem.summaryCells[103][0].value
        }
        //Diciembre
        if(c.totalItem.summaryCells[108][0] !== undefined){
          totalDC24 === 0 ? c.totalItem.summaryCells[108][0].value = 0 : c.totalItem.summaryCells[108][0].value = totalDC24/anioAntDC24;
          presupuestoDC24 === 0 ? c.totalItem.summaryCells[110][0].value = 0 : c.totalItem.summaryCells[110][0].value = totalDC24/presupuestoDC24;
          proyeccionDC24 === 0 ? c.totalItem.summaryCells[114][0].value = 0 : c.totalItem.summaryCells[114][0].value = totalDC24/presupuestoDC24;

          totalesPor24.totalDC = c.totalItem.summaryCells[108][0].value
          totalesPor24.presupuestoDC = c.totalItem.summaryCells[110][0].value
          totalesPor24.proyeccionDC = c.totalItem.summaryCells[114][0].value
        }

      })
      
    }
  }

  verDetallesClick2024(event) {

    if(event.cellElement.innerText == "Enero" || event.cellElement.innerText == "Febrero" || event.cellElement.innerText == "Marzo"
    || event.cellElement.innerText == "Abril" || event.cellElement.innerText == "Mayo" || event.cellElement.innerText == "Junio"
    || event.cellElement.innerText == "Julio" || event.cellElement.innerText == "Agosto" || event.cellElement.innerText == "Septiembre"
    || event.cellElement.innerText == "Octubre" || event.cellElement.innerText == "Noviembre" || event.cellElement.innerText == "Diciembre" ){

        this.openModReal2024 = true;
    }
  }
  /*========================2025===========================================*/
  onRowPrepared2025(e: any) {

    if (e.rowType == 'totalFooter') {
      //console.log(e.summaryCells)
    /*====================================PERIODO 2024==================================================*/
    this.graficaModel2025 = [
      {mes: "ENERO", total: e.summaryCells[2][0]?.value, presupuesto: e.summaryCells[3][0]?.value},  
      {mes: "FEBRERO", total: e.summaryCells[4][0]?.value, presupuesto: e.summaryCells[5][0]?.value},
      {mes: "MARZO", total: e.summaryCells[6][0]?.value, presupuesto: e.summaryCells[7][0]?.value},
      {mes: "ABRIL", total: e.summaryCells[8][0]?.value, presupuesto: e.summaryCells[9][0]?.value},
      {mes: "MAYO", total: e.summaryCells[10][0]?.value, presupuesto: e.summaryCells[11][0]?.value},
      {mes: "JUNIO", total: e.summaryCells[12][0]?.value, presupuesto: e.summaryCells[13][0]?.value},
      {mes: "JULIO", total: e.summaryCells[14][0]?.value, presupuesto: e.summaryCells[15][0]?.value},
      {mes: "AGOSTO", total: e.summaryCells[16][0]?.value, presupuesto: e.summaryCells[17][0]?.value},
      {mes: "SEPTIEMBRE", total: e.summaryCells[18][0]?.value, presupuesto: e.summaryCells[19][0]?.value},
      {mes: "OCTUBRE", total: e.summaryCells[20][0]?.value, presupuesto: e.summaryCells[21][0]?.value},
      {mes: "NOVIEMBRE", total: e.summaryCells[22][0]?.value, presupuesto: e.summaryCells[23][0]?.value},
      {mes: "DICIEMBRE", total: e.summaryCells[24][0]?.value, presupuesto: e.summaryCells[25][0]?.value},
    ]
    //        {mes: "MARZO", total: e.summaryCells[6][0]?.value, presupuesto: e.summaryCells[7][0]?.value},
    //console.log(e.summaryCells)
  
         //console.log(e.summaryCells)
  
  
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
  onCellPrepared2025(e: any) {
    if (e.rowType == 'groupFooter'){

        e.cellElement.style.fontSize = '15px';
        e.cellElement.style.background = "#DCDCDC";
    }
  }
  onContentReady2025(e: any) {

    this.loadingVisible = false;

  }
  
  onRowPreparedDetalle2025(e: any){
      if (e.rowType == 'groupFooter'){
        if(e.groupIndex == 0){
          //console.log(e.summaryCells)
          //ENERO 2024
          this.totalPor25.totalE = e.summaryCells[4][0]?.value;
          this.totalPor25.anioAntE = e.summaryCells[5][0]?.value;
          this.totalPor25.presupuestoE = e.summaryCells[7][0]?.value;
          this.totalPor25.proyeccionE = e.summaryCells[9][0]?.value;
          //Febrero
          this.totalPor25.totalFB = e.summaryCells[15][0]?.value;
          this.totalPor25.anioAntFB = e.summaryCells[16][0]?.value;
          this.totalPor25.presupuestoFB = e.summaryCells[18][0]?.value;
          this.totalPor25.proyeccionFB = e.summaryCells[20][0]?.value;
          // //Marzo
          this.totalPor25.totalM = e.summaryCells[26][0]?.value;
          this.totalPor25.anioAntM = e.summaryCells[27][0]?.value;
          this.totalPor25.presupuestoM = e.summaryCells[29][0]?.value;
          this.totalPor25.proyeccionM = e.summaryCells[31][0]?.value;
          // //Abril
          this.totalPor25.totalA = e.summaryCells[37][0].value;
          this.totalPor25.anioAntA = e.summaryCells[38][0].value;
          this.totalPor25.presupuestoA = e.summaryCells[40][0].value;
          this.totalPor25.proyeccionA = e.summaryCells[42][0].value;
          // //Mayo
          this.totalPor25.totalMY = e.summaryCells[48][0].value;
          this.totalPor25.anioAntMY = e.summaryCells[49][0].value;
          this.totalPor25.presupuestoMY = e.summaryCells[51][0].value;
          this.totalPor25.proyeccionMY = e.summaryCells[53][0].value;
          // //Junio
          this.totalPor25.totalJN = e.summaryCells[59][0].value;
          this.totalPor25.anioAntJN = e.summaryCells[60][0].value;
          this.totalPor25.presupuestoJN = e.summaryCells[62][0].value;
          this.totalPor25.proyeccionJN = e.summaryCells[64][0].value;
          // //Juio
          this.totalPor25.totalJL = e.summaryCells[70][0].value;
          this.totalPor25.anioAntJL = e.summaryCells[71][0].value;
          this.totalPor25.presupuestoJL = e.summaryCells[73][0].value;
          this.totalPor25.proyeccionJL = e.summaryCells[75][0].value;
          // //Agosto
          this.totalPor25.totalAG = e.summaryCells[81][0].value;
          this.totalPor25.anioAntAG = e.summaryCells[82][0].value;
          this.totalPor25.presupuestoAG = e.summaryCells[84][0].value;
          this.totalPor25.proyeccionAG = e.summaryCells[86][0].value;
          // //Septiembre
          this.totalPor25.totalS = e.summaryCells[92][0].value;
          this.totalPor25.anioAntS = e.summaryCells[93][0].value;
          this.totalPor25.presupuestoS = e.summaryCells[95][0].value;
          this.totalPor25.proyeccionS = e.summaryCells[97][0].value;
          //Octubre
          this.totalPor25.totalOC = e.summaryCells[104][0].value;
          this.totalPor25.anioAntOC = e.summaryCells[105][0].value;
          this.totalPor25.presupuestoOC = e.summaryCells[107][0].value;
          this.totalPor25.proyeccionOC = e.summaryCells[109][0].value;
          // //Noviembre
          this.totalPor25.totalNV = e.summaryCells[115][0].value;
          this.totalPor25.anioAntNV = e.summaryCells[116][0].value;
          this.totalPor25.presupuestoNV = e.summaryCells[118][0].value;
          this.totalPor25.proyeccionNV = e.summaryCells[120][0].value;
          // //Diciembre
          this.totalPor25.totalDC = e.summaryCells[128][0].value;
          this.totalPor25.anioAntDC = e.summaryCells[129][0].value;
          this.totalPor25.presupuestoDC = e.summaryCells[131][0].value;
          this.totalPor25.proyeccionDC = e.summaryCells[133][0].value;
  
          // //ENERO
          this.totalPor25.aniATotalE = this.totalPor25.totalE / this.totalPor25.anioAntE;
          this.totalPor25.presTotalE = this.totalPor25.totalE / this.totalPor25.presupuestoE;
          this.totalPor25.ProyTotalE = this.totalPor25.proyeccionE / this.totalPor25.presupuestoE;
          // // //Febrero
          this.totalPor25.aniATotalFB = this.totalPor25.totalFB / this.totalPor25.anioAntFB;
          this.totalPor25.presTotalFB = this.totalPor25.totalFB / this.totalPor25.presupuestoFB;
          this.totalPor25.ProyTotalFB = this.totalPor25.proyeccionFB / this.totalPor25.presupuestoFB;
          // // //Marzo
          this.totalPor25.aniATotalM = this.totalPor25.totalM / this.totalPor25.anioAntM;
          this.totalPor25.presTotalM = this.totalPor25.totalM / this.totalPor25.presupuestoM;
          this.totalPor25.ProyTotalM = this.totalPor25.proyeccionM / this.totalPor25.presupuestoM;
          // // //Abril
          this.totalPor25.aniATotalA = this.totalPor25.totalA / this.totalPor25.anioAntA;
          this.totalPor25.presTotalA = this.totalPor25.totalA / this.totalPor25.presupuestoA;
          this.totalPor25.ProyTotalA = this.totalPor25.proyeccionA / this.totalPor25.presupuestoA;
          // // //Mayo
          this.totalPor25.aniATotalMY = this.totalPor25.totalMY / this.totalPor25.anioAntMY;
          this.totalPor25.presTotalMY = this.totalPor25.totalMY / this.totalPor25.presupuestoMY;
          this.totalPor25.ProyTotalMY = this.totalPor25.proyeccionMY / this.totalPor25.presupuestoMY;
          // // //Junio
          this.totalPor25.aniATotalJN = this.totalPor25.totalJN / this.totalPor25.anioAntJN;
          this.totalPor25.presTotalJN = this.totalPor25.totalJN / this.totalPor25.presupuestoJN;
          this.totalPor25.ProyTotalJN = this.totalPor25.proyeccionJN / this.totalPor25.presupuestoJN;
          // // //Julio
          this.totalPor25.aniATotalJL = this.totalPor25.totalJL / this.totalPor25.anioAntJL;
          this.totalPor25.presTotalJL = this.totalPor25.totalJL / this.totalPor25.presupuestoJL;
          this.totalPor25.ProyTotalJL = this.totalPor25.proyeccionJL / this.totalPor25.presupuestoJL;
          // // //Agosto
          this.totalPor25.aniATotalAG = this.totalPor25.totalAG / this.totalPor25.anioAntAG;
          this.totalPor25.presTotalAG = this.totalPor25.totalAG / this.totalPor25.presupuestoAG;
          this.totalPor25.ProyTotalAG = this.totalPor25.proyeccionAG / this.totalPor25.presupuestoAG;
          // // //Septiembre
          this.totalPor25.aniATotalS = this.totalPor25.totalS / this.totalPor25.anioAntS;
          this.totalPor25.presTotalS = this.totalPor25.totalS / this.totalPor25.presupuestoS;
          this.totalPor25.ProyTotalS = this.totalPor25.proyeccionS / this.totalPor25.presupuestoS;
          // // //Octubre
          this.totalPor25.aniATotalOC = this.totalPor25.totalOC / this.totalPor25.anioAntOC;
          this.totalPor25.presTotalOC = this.totalPor25.totalOC / this.totalPor25.presupuestoOC;
          this.totalPor25.ProyTotalOC = this.totalPor25.proyeccionOC / this.totalPor25.presupuestoOC;
          // // //Noviembre
          this.totalPor25.aniATotalNV = this.totalPor25.totalNV / this.totalPor25.anioAntNV;
          this.totalPor25.presTotalNV = this.totalPor25.totalNV / this.totalPor25.presupuestoNV;
          this.totalPor25.ProyTotalNV = this.totalPor25.proyeccionNV / this.totalPor25.presupuestoNV;
          // // //Diciembre
          this.totalPor25.aniATotalDC = this.totalPor25.totalDC / this.totalPor25.anioAntDC;
          this.totalPor25.presTotalDC = this.totalPor25.totalDC / this.totalPor25.presupuestoDC;
          this.totalPor25.ProyTotalDC = this.totalPor25.proyeccionDC / this.totalPor25.presupuestoDC;
       
  
          // //ENERO
          if(e.summaryCells[6][0].value !== undefined){
            e.summaryCells[6][0].value = this.totalPor25.aniATotalE;
            e.summaryCells[8][0].value = this.totalPor25.presTotalE;
            // e.summaryCells[12][0].value = this.totalPor25.ProyTotalE;s
          }
          // totalesPorGr.totalE = e.summaryCells[6][0]?.value;
          // //Febrero
          if(e.summaryCells[17][0].value !== undefined){
            e.summaryCells[17][0].value = this.totalPor25.aniATotalFB;
            e.summaryCells[19][0].value = this.totalPor25.presTotalFB;
            e.summaryCells[23][0].value = this.totalPor25.ProyTotalFB;
          }
          // // //Marzo
          if(e.summaryCells[28][0].value !== undefined){
            e.summaryCells[28][0].value = this.totalPor25.aniATotalM;
            e.summaryCells[30][0].value = this.totalPor25.presTotalM;
            e.summaryCells[34][0].value = this.totalPor25.ProyTotalM;
          }
          // // //Abril
          if(e.summaryCells[39][0].value !== undefined){
            e.summaryCells[39][0].value = this.totalPor25.aniATotalA;
            e.summaryCells[41][0].value = this.totalPor25.presTotalA;
            e.summaryCells[45][0].value = this.totalPor25.ProyTotalA;
          }
          // // //Mayo
          if(e.summaryCells[50][0].value !== undefined){
            e.summaryCells[50][0].value = this.totalPor25.aniATotalMY;
            e.summaryCells[52][0].value = this.totalPor25.presTotalMY;
            e.summaryCells[56][0].value = this.totalPor25.ProyTotalMY;
          }
          // // //Junio
          if(e.summaryCells[61][0].value !== undefined){
            e.summaryCells[61][0].value = this.totalPor25.aniATotalJN;
            e.summaryCells[63][0].value = this.totalPor25.presTotalJN;
            e.summaryCells[67][0].value = this.totalPor25.ProyTotalJN;
          }
          // // //Julio
          if(e.summaryCells[72][0].value !== undefined){
            e.summaryCells[72][0].value = this.totalPor25.aniATotalJL;
            e.summaryCells[74][0].value = this.totalPor25.presTotalJL;
            e.summaryCells[78][0].value = this.totalPor25.ProyTotalJL;
          }
          // // //Agosto
          if(e.summaryCells[83][0].value !== undefined){
            e.summaryCells[83][0].value = this.totalPor25.aniATotalAG;
            e.summaryCells[85][0].value = this.totalPor25.presTotalAG;
            e.summaryCells[89][0].value = this.totalPor25.ProyTotalAG;
          }
          // // //Septiembre
          if(e.summaryCells[94][0].value !== undefined){
            e.summaryCells[94][0].value = this.totalPor25.aniATotalS;
            e.summaryCells[96][0].value = this.totalPor25.presTotalS;
            e.summaryCells[100][0].value = this.totalPor25.ProyTotalS;
          }
          // // //Octubre
          if(e.summaryCells[106][0].value !== undefined){
            e.summaryCells[106][0].value = this.totalPor25.aniATotalOC;
            e.summaryCells[108][0].value = this.totalPor25.presTotalOC;
            e.summaryCells[112][0].value = this.totalPor25.ProyTotalOC;
          }
          // // //Noviembre VALIDACION 125, CHECAR NOVPORPROY DOS ARRAY EXTRAS??????
          if(e.summaryCells[125][0].value !== undefined){
            e.summaryCells[117][0].value = this.totalPor25.aniATotalNV;
            e.summaryCells[119][0].value = this.totalPor25.presTotalNV;
            e.summaryCells[125][0].value = this.totalPor25.ProyTotalNV;
          
          }
          //   // //Diciembre
          if(e.summaryCells[130][0].value !== undefined){  
            e.summaryCells[130][0].value = this.totalPor25.aniATotalDC;
            e.summaryCells[132][0].value = this.totalPor25.presTotalDC;
            e.summaryCells[138][0].value = this.totalPor25.ProyTotalDC;
          }
        }
      }
  
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
  onCellPreparedDetalle2025(e: any) {
    if (e.rowType == 'groupFooter'){
      
        e.cellElement.style.fontSize = '15px';
        e.cellElement.style.background = "#DCDCDC";
    }
  
      if(e.rowType == 'totalFooter'){
  
        e.totalItem.cells.forEach((c: any) => {
          //console.log(c.totalItem.summaryCells)
          // //ENERO 2024
          let total25E = c.totalItem.summaryCells[4][0]?.value;
          let anioAnt25E = c.totalItem.summaryCells[5][0]?.value;
          let presupuesto25E = c.totalItem.summaryCells[7][0]?.value;
          let proyeccion25E = c.totalItem.summaryCells[9][0]?.value;
          // // //Febrero
          let total25FB = c.totalItem.summaryCells[15][0].value;
          let anioAnt25FB = c.totalItem.summaryCells[16][0].value;
          let presupuesto25FB = c.totalItem.summaryCells[18][0].value;
          let proyeccion25FB = c.totalItem.summaryCells[20][0].value;
          // // //Marzo
          let total25M = c.totalItem.summaryCells[26][0].value;
          let anioAnt25M = c.totalItem.summaryCells[27][0].value;
          let presupuesto25M = c.totalItem.summaryCells[29][0].value;
          let proyeccion25M = c.totalItem.summaryCells[31][0].value;
          // // //Abril
          let total25A = c.totalItem.summaryCells[37][0].value;
          let anioAnt25A = c.totalItem.summaryCells[38][0].value;
          let presupuesto25A = c.totalItem.summaryCells[40][0].value;
          let proyeccion25A = c.totalItem.summaryCells[42][0].value;
          // // //Mayo
          // // console.log(c.totalItem.summaryCells)
          let totalMY25 = c.totalItem.summaryCells[48][0].value;
          let anioAntMY25 = c.totalItem.summaryCells[49][0].value;
          let presupuestoMY25 = c.totalItem.summaryCells[51][0].value;
          let proyeccionMY25 = c.totalItem.summaryCells[53][0].value;
          // // //Junio
          let totalJN25 = c.totalItem.summaryCells[59][0].value;
          let anioAntJN25 = c.totalItem.summaryCells[60][0].value;
          let presupuestoJN25 = c.totalItem.summaryCells[62][0].value;
          let proyeccionJN25 = c.totalItem.summaryCells[64][0].value;
          // // //Juio
          let totalJL25 = c.totalItem.summaryCells[70][0].value;
          let anioAntJL25 = c.totalItem.summaryCells[71][0].value;
          let presupuestoJL25 = c.totalItem.summaryCells[73][0].value;
          let proyeccionJL25 = c.totalItem.summaryCells[75][0].value;
          // // //Agosto
          let totalAG25 = c.totalItem.summaryCells[81][0].value;
          let anioAntAG25 = c.totalItem.summaryCells[82][0].value;
          let presupuestoAG25 = c.totalItem.summaryCells[84][0].value;
          let proyeccionAG25 = c.totalItem.summaryCells[86][0].value;
          // // //Septiembre
          let totalS25 = c.totalItem.summaryCells[92][0].value;
          let anioAntS25 = c.totalItem.summaryCells[93][0].value;
          let presupuestoS25 = c.totalItem.summaryCells[95][0].value;
          let proyeccionS25 = c.totalItem.summaryCells[97][0].value;
          // // //Octubre
          let totalOC25 = c.totalItem.summaryCells[104][0].value;
          let anioAntOC25 = c.totalItem.summaryCells[105][0].value;
          let presupuestoOC25 = c.totalItem.summaryCells[107][0].value;
          let proyeccionOC25 = c.totalItem.summaryCells[109][0].value;
          // //Noviembre
          let totalNV25 = c.totalItem.summaryCells[115][0].value;
          let anioAntNV25 = c.totalItem.summaryCells[116][0].value;
          let presupuestoNV25 = c.totalItem.summaryCells[118][0].value;
          let proyeccionNV25 = c.totalItem.summaryCells[120][0].value;
          // // //Diciembre
          let totalDC25 = c.totalItem.summaryCells[126][0].value;
          let anioAntDC25 = c.totalItem.summaryCells[127][0].value;
          let presupuestoDC25 = c.totalItem.summaryCells[129][0].value;
          let proyeccionDC25 = c.totalItem.summaryCells[131][0].value;
  
          //Calculo de Porcentajes
          //ENERO
          if(c.totalItem.summaryCells[6][0] !== undefined){
            total25E === 0 ? c.totalItem.summaryCells[6][0].value = 0 : c.totalItem.summaryCells[6][0].value = total25E/anioAnt25E;
            presupuesto25E === 0 ? c.totalItem.summaryCells[8][0].value = 0 : c.totalItem.summaryCells[8][0].value = total25E/presupuesto25E;
            // proyeccion25E === 0 ? c.totalItem.summaryCells[12][0].value = 0 : c.totalItem.summaryCells[12][0].value = total25E/presupuesto25E;
  
            totalesPor25.totalE = c.totalItem.summaryCells[6][0].value
            totalesPor25.presupuestoE = c.totalItem.summaryCells[8][0].value
            // totalesPor25.proyeccionE = c.totalItem.summaryCells[12][0].value
          }
          // // //Febrero
          if(c.totalItem.summaryCells[17][0] !== undefined){
            total25FB === 0 ? c.totalItem.summaryCells[17][0].value = 0 : c.totalItem.summaryCells[17][0].value = total25FB/anioAnt25FB;
            presupuesto25FB === 0 ? c.totalItem.summaryCells[19][0].value = 0 : c.totalItem.summaryCells[19][0].value = total25FB/presupuesto25FB;
            proyeccion25FB === 0 ? c.totalItem.summaryCells[23][0].value = 0 : c.totalItem.summaryCells[23][0].value = total25FB/proyeccion25FB;
  
            totalesPor25.totalFB = c.totalItem.summaryCells[17][0].value
            totalesPor25.presupuestoFB = c.totalItem.summaryCells[19][0].value
            totalesPor25.proyeccionFB = c.totalItem.summaryCells[23][0].value
          }
          // // //Marzo
          if(c.totalItem.summaryCells[28][0] !== undefined){
            total25M === 0 ? c.totalItem.summaryCells[28][0].value = 0 : c.totalItem.summaryCells[28][0].value = total25M/anioAnt25M;
            presupuesto25M === 0 ? c.totalItem.summaryCells[30][0].value = 0 : c.totalItem.summaryCells[30][0].value = total25M/presupuesto25M;
            proyeccion25M === 0 ? c.totalItem.summaryCells[34][0].value = 0 : c.totalItem.summaryCells[34][0].value = total25M/proyeccion25M;
  
            totalesPor25.totalM = c.totalItem.summaryCells[28][0].value
            totalesPor25.presupuestoM = c.totalItem.summaryCells[30][0].value
            totalesPor25.proyeccionM = c.totalItem.summaryCells[34][0].value
          }
          // // //Abril
          if(c.totalItem.summaryCells[39][0] !== undefined){
            total25A === 0 ? c.totalItem.summaryCells[39][0].value = 0 : c.totalItem.summaryCells[39][0].value = total25A/anioAnt25A;
            presupuesto25A === 0 ? c.totalItem.summaryCells[41][0].value = 0 : c.totalItem.summaryCells[41][0].value = total25A/presupuesto25A;
            proyeccion25A === 0 ? c.totalItem.summaryCells[45][0].value = 0 : c.totalItem.summaryCells[45][0].value = total25A/proyeccion25A;
  
            totalesPor25.totalA = c.totalItem.summaryCells[39][0].value
            totalesPor25.presupuestoA = c.totalItem.summaryCells[41][0].value
            totalesPor25.proyeccionA = c.totalItem.summaryCells[45][0].value
          }
          // // //Mayo
          if(c.totalItem.summaryCells[50][0] !== undefined){
            totalMY25 === 0 ? c.totalItem.summaryCells[50][0].value = 0 : c.totalItem.summaryCells[50][0].value = totalMY25/anioAntMY25;
            presupuestoMY25 === 0 ? c.totalItem.summaryCells[52][0].value = 0 : c.totalItem.summaryCells[52][0].value = totalMY25/presupuestoMY25;
            proyeccionMY25 === 0 ? c.totalItem.summaryCells[56][0].value = 0 : c.totalItem.summaryCells[56][0].value = totalMY25/proyeccionMY25;
  
            totalesPor25.totalMY = c.totalItem.summaryCells[50][0].value
            totalesPor25.presupuestoMY = c.totalItem.summaryCells[52][0].value
            totalesPor25.proyeccionMY = c.totalItem.summaryCells[56][0].value
          }
          // //Junio
          if(c.totalItem.summaryCells[61][0] !== undefined){
            totalJN25 === 0 ? c.totalItem.summaryCells[61][0].value = 0 : c.totalItem.summaryCells[61][0].value = totalJN25/anioAntJN25;
            presupuestoJN25 === 0 ? c.totalItem.summaryCells[63][0].value = 0 : c.totalItem.summaryCells[63][0].value = totalJN25/presupuestoJN25;
            proyeccionJN25 === 0 ? c.totalItem.summaryCells[67][0].value = 0 : c.totalItem.summaryCells[67][0].value = totalJN25/proyeccionJN25;
  
            totalesPor25.totalJN = c.totalItem.summaryCells[61][0].value
            totalesPor25.presupuestoJN = c.totalItem.summaryCells[63][0].value
            totalesPor25.proyeccionJN = c.totalItem.summaryCells[67][0].value
          }
          // //Julio
          if(c.totalItem.summaryCells[72][0] !== undefined){
            totalJL25 === 0 ? c.totalItem.summaryCells[72][0].value = 0 : c.totalItem.summaryCells[72][0].value = totalJL25/anioAntJL25;
            presupuestoJL25 === 0 ? c.totalItem.summaryCells[74][0].value = 0 : c.totalItem.summaryCells[74][0].value = totalJL25/presupuestoJL25;
            proyeccionJL25 === 0 ? c.totalItem.summaryCells[78][0].value = 0 : c.totalItem.summaryCells[78][0].value = totalJL25/proyeccionJL25;
  
            totalesPor25.totalJL = c.totalItem.summaryCells[72][0].value
            totalesPor25.presupuestoJL = c.totalItem.summaryCells[74][0].value
            totalesPor25.proyeccionJL = c.totalItem.summaryCells[78][0].value
          }
          // // //Agosto
          if(c.totalItem.summaryCells[83][0] !== undefined){
            totalAG25 === 0 ? c.totalItem.summaryCells[83][0].value = 0 : c.totalItem.summaryCells[83][0].value = totalAG25/anioAntAG25;
            presupuestoAG25 === 0 ? c.totalItem.summaryCells[85][0].value = 0 : c.totalItem.summaryCells[85][0].value = totalAG25/presupuestoAG25;
            proyeccionAG25 === 0 ? c.totalItem.summaryCells[89][0].value = 0 : c.totalItem.summaryCells[89][0].value = totalAG25/proyeccionAG25;
  
            totalesPor25.totalAG = c.totalItem.summaryCells[83][0].value
            totalesPor25.presupuestoAG = c.totalItem.summaryCells[85][0].value
            totalesPor25.proyeccionAG = c.totalItem.summaryCells[89][0].value
          }
          // // //Septiembre
          if(c.totalItem.summaryCells[94][0] !== undefined){
            totalS25 === 0 ? c.totalItem.summaryCells[94][0].value = 0 : c.totalItem.summaryCells[94][0].value = totalS25/anioAntS25;
            presupuestoS25 === 0 ? c.totalItem.summaryCells[96][0].value = 0 : c.totalItem.summaryCells[96][0].value = totalS25/presupuestoS25;
            proyeccionS25 === 0 ? c.totalItem.summaryCells[100][0].value = 0 : c.totalItem.summaryCells[100][0].value = totalS25/proyeccionS25;
  
            totalesPor25.totalS = c.totalItem.summaryCells[94][0].value
            totalesPor25.presupuestoS = c.totalItem.summaryCells[96][0].value
            totalesPor25.proyeccionS = c.totalItem.summaryCells[100][0].value
          }
          // //Octubre
          if(c.totalItem.summaryCells[106][0] !== undefined){
            totalOC25 === 0 ? c.totalItem.summaryCells[106][0].value = 0 : c.totalItem.summaryCells[106][0].value = totalOC25/anioAntOC25;
            presupuestoOC25 === 0 ? c.totalItem.summaryCells[108][0].value = 0 : c.totalItem.summaryCells[108][0].value = totalOC25/presupuestoOC25;
            proyeccionOC25 === 0 ? c.totalItem.summaryCells[112][0].value = 0 : c.totalItem.summaryCells[112][0].value = totalOC25/proyeccionOC25;
  
            totalesPor25.totalOC = c.totalItem.summaryCells[106][0].value
            totalesPor25.presupuestoOC = c.totalItem.summaryCells[108][0].value
            totalesPor25.proyeccionOC = c.totalItem.summaryCells[112][0].value
          }
          // //Noviembre  VALIDACION CON 125 POR DOBLE PROYECCION CHECAR ??????
          if(c.totalItem.summaryCells[125][0] !== undefined){
            totalNV25 === 0 ? c.totalItem.summaryCells[117][0].value = 0 : c.totalItem.summaryCells[117][0].value = totalNV25/anioAntNV25;
            presupuestoNV25 === 0 ? c.totalItem.summaryCells[119][0].value = 0 : c.totalItem.summaryCells[119][0].value = totalNV25/presupuestoNV25;
            proyeccionNV25 === 0 ? c.totalItem.summaryCells[125][0].value = 0 : c.totalItem.summaryCells[125][0].value = totalNV25/proyeccionNV25;
  
            totalesPor25.totalNV = c.totalItem.summaryCells[117][0].value
            totalesPor25.presupuestoNV = c.totalItem.summaryCells[119][0].value
            totalesPor25.proyeccionNV = c.totalItem.summaryCells[125][0].value
          }
          //Diciembre
          if(c.totalItem.summaryCells[128][0] !== undefined){
            totalDC25 === 0 ? c.totalItem.summaryCells[128][0].value = 0 : c.totalItem.summaryCells[128][0].value = totalDC25/anioAntDC25;
            presupuestoDC25 === 0 ? c.totalItem.summaryCells[130][0].value = 0 : c.totalItem.summaryCells[130][0].value = totalDC25/presupuestoDC25;
            proyeccionDC25 === 0 ? c.totalItem.summaryCells[134][0].value = 0 : c.totalItem.summaryCells[134][0].value = totalDC25/proyeccionDC25;
            
            totalesPor25.totalDC = c.totalItem.summaryCells[128][0].value
            totalesPor25.presupuestoDC = c.totalItem.summaryCells[130][0].value
            totalesPor25.proyeccionDC = c.totalItem.summaryCells[134][0].value
          }
  
        })
        
      }
  }
  
  verDetallesClick2025(event) {

    if(event.cellElement.innerText == "Enero" || event.cellElement.innerText == "Febrero" || event.cellElement.innerText == "Marzo"
    || event.cellElement.innerText == "Abril" || event.cellElement.innerText == "Mayo" || event.cellElement.innerText == "Junio"
    || event.cellElement.innerText == "Julio" || event.cellElement.innerText == "Agosto" || event.cellElement.innerText == "Septiembre"
    || event.cellElement.innerText == "Octubre" || event.cellElement.innerText == "Noviembre" || event.cellElement.innerText == "Diciembre" ){

        this.openModReal2025 = true;
    }
  }

  /*========================2026===========================================*/
  onRowPrepared2026(e: any) {

    if (e.rowType == 'totalFooter') {
      //console.log(e.summaryCells)
    /*====================================PERIODO 2024==================================================*/
    this.graficaModel2026 = [
      {mes: "ENERO", total: e.summaryCells[2][0]?.value, presupuesto: e.summaryCells[3][0]?.value},  
      {mes: "FEBRERO", total: e.summaryCells[4][0]?.value, presupuesto: e.summaryCells[5][0]?.value},
      {mes: "MARZO", total: e.summaryCells[6][0]?.value, presupuesto: e.summaryCells[7][0]?.value},
      {mes: "ABRIL", total: e.summaryCells[8][0]?.value, presupuesto: e.summaryCells[9][0]?.value},
      {mes: "MAYO", total: e.summaryCells[10][0]?.value, presupuesto: e.summaryCells[11][0]?.value},
      {mes: "JUNIO", total: e.summaryCells[12][0]?.value, presupuesto: e.summaryCells[13][0]?.value},
      {mes: "JULIO", total: e.summaryCells[14][0]?.value, presupuesto: e.summaryCells[15][0]?.value},
      {mes: "AGOSTO", total: e.summaryCells[16][0]?.value, presupuesto: e.summaryCells[17][0]?.value},
      {mes: "SEPTIEMBRE", total: e.summaryCells[18][0]?.value, presupuesto: e.summaryCells[19][0]?.value},
      {mes: "OCTUBRE", total: e.summaryCells[20][0]?.value, presupuesto: e.summaryCells[21][0]?.value},
      {mes: "NOVIEMBRE", total: e.summaryCells[22][0]?.value, presupuesto: e.summaryCells[23][0]?.value},
      {mes: "DICIEMBRE", total: e.summaryCells[24][0]?.value, presupuesto: e.summaryCells[25][0]?.value},
    ]
    //        {mes: "MARZO", total: e.summaryCells[6][0]?.value, presupuesto: e.summaryCells[7][0]?.value},
    //console.log(e.summaryCells)
  
         //console.log(e.summaryCells)
  
  
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
  onCellPrepared2026(e: any) {
    if (e.rowType == 'groupFooter'){

        e.cellElement.style.fontSize = '15px';
        e.cellElement.style.background = "#DCDCDC";
    }
  }
  onContentReady2026(e: any) {

    this.loadingVisible = false;

  }
  
  onRowPreparedDetalle2026(e: any){
      if (e.rowType == 'groupFooter'){
        if(e.groupIndex == 0){
          //console.log(e.summaryCells)
          //ENERO 2024
          this.totalPor26.totalE = e.summaryCells[4][0]?.value;
          this.totalPor26.anioAntE = e.summaryCells[5][0]?.value;
          this.totalPor26.presupuestoE = e.summaryCells[7][0]?.value;
          this.totalPor26.proyeccionE = e.summaryCells[9][0]?.value;
          // //Febrero
          this.totalPor26.totalFB = e.summaryCells[15][0]?.value;
          this.totalPor26.anioAntFB = e.summaryCells[16][0]?.value;
          this.totalPor26.presupuestoFB = e.summaryCells[18][0]?.value;
          this.totalPor26.proyeccionFB = e.summaryCells[20][0]?.value;
          // // //Marzo
          this.totalPor26.totalM = e.summaryCells[26][0]?.value;
          this.totalPor26.anioAntM = e.summaryCells[27][0]?.value;
          this.totalPor26.presupuestoM = e.summaryCells[29][0]?.value;
          this.totalPor26.proyeccionM = e.summaryCells[31][0]?.value;
          // // //Abril
          // this.totalPor26.totalA = e.summaryCells[37][0].value;
          // this.totalPor26.anioAntA = e.summaryCells[38][0].value;
          // this.totalPor26.presupuestoA = e.summaryCells[40][0].value;
          // this.totalPor26.proyeccionA = e.summaryCells[42][0].value;
          // // //Mayo
          // this.totalPor26.totalMY = e.summaryCells[48][0].value;
          // this.totalPor26.anioAntMY = e.summaryCells[49][0].value;
          // this.totalPor26.presupuestoMY = e.summaryCells[51][0].value;
          // this.totalPor26.proyeccionMY = e.summaryCells[53][0].value;
          // // //Junio
          // this.totalPor26.totalJN = e.summaryCells[59][0].value;
          // this.totalPor26.anioAntJN = e.summaryCells[60][0].value;
          // this.totalPor26.presupuestoJN = e.summaryCells[62][0].value;
          // this.totalPor26.proyeccionJN = e.summaryCells[64][0].value;
          // // //Juio
          // this.totalPor26.totalJL = e.summaryCells[70][0].value;
          // this.totalPor26.anioAntJL = e.summaryCells[71][0].value;
          // this.totalPor26.presupuestoJL = e.summaryCells[73][0].value;
          // this.totalPor26.proyeccionJL = e.summaryCells[75][0].value;
          // // //Agosto
          // this.totalPor26.totalAG = e.summaryCells[81][0].value;
          // this.totalPor26.anioAntAG = e.summaryCells[82][0].value;
          // this.totalPor26.presupuestoAG = e.summaryCells[84][0].value;
          // this.totalPor26.proyeccionAG = e.summaryCells[86][0].value;
          // // //Septiembre
          // this.totalPor26.totalS = e.summaryCells[92][0].value;
          // this.totalPor26.anioAntS = e.summaryCells[93][0].value;
          // this.totalPor26.presupuestoS = e.summaryCells[95][0].value;
          // this.totalPor26.proyeccionS = e.summaryCells[97][0].value;
          // //Octubre
          // this.totalPor26.totalOC = e.summaryCells[104][0].value;
          // this.totalPor26.anioAntOC = e.summaryCells[105][0].value;
          // this.totalPor26.presupuestoOC = e.summaryCells[107][0].value;
          // this.totalPor26.proyeccionOC = e.summaryCells[109][0].value;
          // // //Noviembre
          // this.totalPor26.totalNV = e.summaryCells[115][0].value;
          // this.totalPor26.anioAntNV = e.summaryCells[116][0].value;
          // this.totalPor26.presupuestoNV = e.summaryCells[118][0].value;
          // this.totalPor26.proyeccionNV = e.summaryCells[120][0].value;
          // // //Diciembre
          // this.totalPor26.totalDC = e.summaryCells[128][0].value;
          // this.totalPor26.anioAntDC = e.summaryCells[129][0].value;
          // this.totalPor26.presupuestoDC = e.summaryCells[131][0].value;
          // this.totalPor26.proyeccionDC = e.summaryCells[133][0].value;
  
          // //ENERO
          this.totalPor26.aniATotalE = this.totalPor26.totalE / this.totalPor26.anioAntE;
          this.totalPor26.presTotalE = this.totalPor26.totalE / this.totalPor26.presupuestoE;
          this.totalPor26.ProyTotalE = this.totalPor26.proyeccionE / this.totalPor26.presupuestoE;
          // // // //Febrero
          this.totalPor26.aniATotalFB = this.totalPor26.totalFB / this.totalPor26.anioAntFB;
          this.totalPor26.presTotalFB = this.totalPor26.totalFB / this.totalPor26.presupuestoFB;
          this.totalPor26.ProyTotalFB = this.totalPor26.proyeccionFB / this.totalPor26.presupuestoFB;
          // // // //Marzo
          this.totalPor26.aniATotalM = this.totalPor26.totalM / this.totalPor26.anioAntM;
          this.totalPor26.presTotalM = this.totalPor26.totalM / this.totalPor26.presupuestoM;
          this.totalPor26.ProyTotalM = this.totalPor26.proyeccionM / this.totalPor26.presupuestoM;
          // // // //Abril
          // this.totalPor26.aniATotalA = this.totalPor26.totalA / this.totalPor26.anioAntA;
          // this.totalPor26.presTotalA = this.totalPor26.totalA / this.totalPor26.presupuestoA;
          // this.totalPor26.ProyTotalA = this.totalPor26.proyeccionA / this.totalPor26.presupuestoA;
          // // // //Mayo
          // this.totalPor26.aniATotalMY = this.totalPor26.totalMY / this.totalPor26.anioAntMY;
          // this.totalPor26.presTotalMY = this.totalPor26.totalMY / this.totalPor26.presupuestoMY;
          // this.totalPor26.ProyTotalMY = this.totalPor26.proyeccionMY / this.totalPor26.presupuestoMY;
          // // // //Junio
          // this.totalPor26.aniATotalJN = this.totalPor26.totalJN / this.totalPor26.anioAntJN;
          // this.totalPor26.presTotalJN = this.totalPor26.totalJN / this.totalPor26.presupuestoJN;
          // this.totalPor26.ProyTotalJN = this.totalPor26.proyeccionJN / this.totalPor26.presupuestoJN;
          // // // //Julio
          // this.totalPor26.aniATotalJL = this.totalPor26.totalJL / this.totalPor26.anioAntJL;
          // this.totalPor26.presTotalJL = this.totalPor26.totalJL / this.totalPor26.presupuestoJL;
          // this.totalPor26.ProyTotalJL = this.totalPor26.proyeccionJL / this.totalPor26.presupuestoJL;
          // // // //Agosto
          // this.totalPor26.aniATotalAG = this.totalPor26.totalAG / this.totalPor26.anioAntAG;
          // this.totalPor26.presTotalAG = this.totalPor26.totalAG / this.totalPor26.presupuestoAG;
          // this.totalPor26.ProyTotalAG = this.totalPor26.proyeccionAG / this.totalPor26.presupuestoAG;
          // // // //Septiembre
          // this.totalPor26.aniATotalS = this.totalPor26.totalS / this.totalPor26.anioAntS;
          // this.totalPor26.presTotalS = this.totalPor26.totalS / this.totalPor26.presupuestoS;
          // this.totalPor26.ProyTotalS = this.totalPor26.proyeccionS / this.totalPor26.presupuestoS;
          // // // //Octubre
          // this.totalPor26.aniATotalOC = this.totalPor26.totalOC / this.totalPor26.anioAntOC;
          // this.totalPor26.presTotalOC = this.totalPor26.totalOC / this.totalPor26.presupuestoOC;
          // this.totalPor26.ProyTotalOC = this.totalPor26.proyeccionOC / this.totalPor26.presupuestoOC;
          // // // //Noviembre
          // this.totalPor26.aniATotalNV = this.totalPor26.totalNV / this.totalPor26.anioAntNV;
          // this.totalPor26.presTotalNV = this.totalPor26.totalNV / this.totalPor26.presupuestoNV;
          // this.totalPor26.ProyTotalNV = this.totalPor26.proyeccionNV / this.totalPor26.presupuestoNV;
          // // // //Diciembre
          // this.totalPor26.aniATotalDC = this.totalPor26.totalDC / this.totalPor26.anioAntDC;
          // this.totalPor26.presTotalDC = this.totalPor26.totalDC / this.totalPor26.presupuestoDC;
          // this.totalPor26.ProyTotalDC = this.totalPor26.proyeccionDC / this.totalPor26.presupuestoDC;
       
  
          // //ENERO
          if(e.summaryCells[6][0].value !== undefined){
            e.summaryCells[6][0].value = this.totalPor26.aniATotalE;
            e.summaryCells[8][0].value = this.totalPor26.presTotalE;
            // e.summaryCells[12][0].value = this.totalPor26.ProyTotalE;    
          }
          // totalesPorGr.totalE = e.summaryCells[6][0]?.value;
          // // //Febrero
          if(e.summaryCells[17][0].value !== undefined){
            e.summaryCells[17][0].value = this.totalPor26.aniATotalFB;
            e.summaryCells[19][0].value = this.totalPor26.presTotalFB;
            e.summaryCells[23][0].value = this.totalPor26.ProyTotalFB;
          }
          // // // //Marzo
          if(e.summaryCells[28][0].value !== undefined){
            e.summaryCells[28][0].value = this.totalPor26.aniATotalM;
            e.summaryCells[30][0].value = this.totalPor26.presTotalM;
            e.summaryCells[34][0].value = this.totalPor26.ProyTotalM;
          }
          // // // //Abril
          // if(e.summaryCells[39][0].value !== undefined){
          //   e.summaryCells[39][0].value = this.totalPor26.aniATotalA;
          //   e.summaryCells[41][0].value = this.totalPor26.presTotalA;
          //   e.summaryCells[45][0].value = this.totalPor26.ProyTotalA;
          // }
          // // // //Mayo
          // if(e.summaryCells[50][0].value !== undefined){
          //   e.summaryCells[50][0].value = this.totalPor26.aniATotalMY;
          //   e.summaryCells[52][0].value = this.totalPor26.presTotalMY;
          //   e.summaryCells[56][0].value = this.totalPor26.ProyTotalMY;
          // }
          // // // //Junio
          // if(e.summaryCells[61][0].value !== undefined){
          //   e.summaryCells[61][0].value = this.totalPor26.aniATotalJN;
          //   e.summaryCells[63][0].value = this.totalPor26.presTotalJN;
          //   e.summaryCells[67][0].value = this.totalPor26.ProyTotalJN;
          // }
          // // // //Julio
          // if(e.summaryCells[72][0].value !== undefined){
          //   e.summaryCells[72][0].value = this.totalPor26.aniATotalJL;
          //   e.summaryCells[74][0].value = this.totalPor26.presTotalJL;
          //   e.summaryCells[78][0].value = this.totalPor26.ProyTotalJL;
          // }
          // // // //Agosto
          // if(e.summaryCells[83][0].value !== undefined){
          //   e.summaryCells[83][0].value = this.totalPor26.aniATotalAG;
          //   e.summaryCells[85][0].value = this.totalPor26.presTotalAG;
          //   e.summaryCells[89][0].value = this.totalPor26.ProyTotalAG;
          // }
          // // // //Septiembre
          // if(e.summaryCells[94][0].value !== undefined){
          //   e.summaryCells[94][0].value = this.totalPor26.aniATotalS;
          //   e.summaryCells[96][0].value = this.totalPor26.presTotalS;
          //   e.summaryCells[100][0].value = this.totalPor26.ProyTotalS;
          // }
          // // // //Octubre
          // if(e.summaryCells[106][0].value !== undefined){
          //   e.summaryCells[106][0].value = this.totalPor26.aniATotalOC;
          //   e.summaryCells[108][0].value = this.totalPor26.presTotalOC;
          //   e.summaryCells[112][0].value = this.totalPor26.ProyTotalOC;
          // }
          // // // //Noviembre VALIDACION 126, CHECAR NOVPORPROY DOS ARRAY EXTRAS??????
          // if(e.summaryCells[126][0].value !== undefined){
          //   e.summaryCells[117][0].value = this.totalPor26.aniATotalNV;
          //   e.summaryCells[119][0].value = this.totalPor26.presTotalNV;
          //   e.summaryCells[125][0].value = this.totalPor26.ProyTotalNV;
          
          // }
          // //   // //Diciembre
          // if(e.summaryCells[130][0].value !== undefined){  
          //   e.summaryCells[130][0].value = this.totalPor26.aniATotalDC;
          //   e.summaryCells[132][0].value = this.totalPor26.presTotalDC;
          //   e.summaryCells[138][0].value = this.totalPor26.ProyTotalDC;
          // }
        }
      }
  
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
  onCellPreparedDetalle2026(e: any) {
    if (e.rowType == 'groupFooter'){
      
        e.cellElement.style.fontSize = '15px';
        e.cellElement.style.background = "#DCDCDC";
    }
  
      if(e.rowType == 'totalFooter'){
  
        e.totalItem.cells.forEach((c: any) => {
          //console.log(c.totalItem.summaryCells)
          // //ENERO 2024
          let total26E = c.totalItem.summaryCells[4][0]?.value;
          let anioAnt26E = c.totalItem.summaryCells[5][0]?.value;
          let presupuesto26E = c.totalItem.summaryCells[7][0]?.value;
          let proyeccion26E = c.totalItem.summaryCells[9][0]?.value;
          // // // //Febrero
          let total26FB = c.totalItem.summaryCells[15][0].value;
          let anioAnt26FB = c.totalItem.summaryCells[16][0].value;
          let presupuesto26FB = c.totalItem.summaryCells[18][0].value;
          let proyeccion26FB = c.totalItem.summaryCells[20][0].value;
          // // // //Marzo
          let total26M = c.totalItem.summaryCells[26][0].value;
          let anioAnt26M = c.totalItem.summaryCells[27][0].value;
          let presupuesto26M = c.totalItem.summaryCells[29][0].value;
          let proyeccion26M = c.totalItem.summaryCells[31][0].value;
          // // // //Abril
          // let total26A = c.totalItem.summaryCells[37][0].value;
          // let anioAnt26A = c.totalItem.summaryCells[38][0].value;
          // let presupuesto26A = c.totalItem.summaryCells[40][0].value;
          // let proyeccion26A = c.totalItem.summaryCells[42][0].value;
          // // // //Mayo
          // // // console.log(c.totalItem.summaryCells)
          // let totalMY26 = c.totalItem.summaryCells[48][0].value;
          // let anioAntMY26 = c.totalItem.summaryCells[49][0].value;
          // let presupuestoMY26 = c.totalItem.summaryCells[51][0].value;
          // let proyeccionMY26 = c.totalItem.summaryCells[53][0].value;
          // // // //Junio
          // let totalJN26 = c.totalItem.summaryCells[59][0].value;
          // let anioAntJN26 = c.totalItem.summaryCells[60][0].value;
          // let presupuestoJN26 = c.totalItem.summaryCells[62][0].value;
          // let proyeccionJN26 = c.totalItem.summaryCells[64][0].value;
          // // // //Juio
          // let totalJL26 = c.totalItem.summaryCells[70][0].value;
          // let anioAntJL26 = c.totalItem.summaryCells[71][0].value;
          // let presupuestoJL26 = c.totalItem.summaryCells[73][0].value;
          // let proyeccionJL26 = c.totalItem.summaryCells[75][0].value;
          // // // //Agosto
          // let totalAG26 = c.totalItem.summaryCells[81][0].value;
          // let anioAntAG26 = c.totalItem.summaryCells[82][0].value;
          // let presupuestoAG26 = c.totalItem.summaryCells[84][0].value;
          // let proyeccionAG26 = c.totalItem.summaryCells[86][0].value;
          // // // //Septiembre
          // let totalS26 = c.totalItem.summaryCells[92][0].value;
          // let anioAntS26 = c.totalItem.summaryCells[93][0].value;
          // let presupuestoS26 = c.totalItem.summaryCells[95][0].value;
          // let proyeccionS26 = c.totalItem.summaryCells[97][0].value;
          // // // //Octubre
          // let totalOC26 = c.totalItem.summaryCells[104][0].value;
          // let anioAntOC26 = c.totalItem.summaryCells[105][0].value;
          // let presupuestoOC26 = c.totalItem.summaryCells[107][0].value;
          // let proyeccionOC26 = c.totalItem.summaryCells[109][0].value;
          // // //Noviembre
          // let totalNV26 = c.totalItem.summaryCells[115][0].value;
          // let anioAntNV26 = c.totalItem.summaryCells[116][0].value;
          // let presupuestoNV26 = c.totalItem.summaryCells[118][0].value;
          // let proyeccionNV26 = c.totalItem.summaryCells[120][0].value;
          // // // //Diciembre
          // let totalDC26 = c.totalItem.summaryCells[126][0].value;
          // let anioAntDC26 = c.totalItem.summaryCells[127][0].value;
          // let presupuestoDC26 = c.totalItem.summaryCells[129][0].value;
          // let proyeccionDC26 = c.totalItem.summaryCells[131][0].value;
  
          //Calculo de Porcentajes
          //ENERO
          if(c.totalItem.summaryCells[6][0] !== undefined){
            total26E === 0 ? c.totalItem.summaryCells[6][0].value = 0 : c.totalItem.summaryCells[6][0].value = total26E/anioAnt26E;
            presupuesto26E === 0 ? c.totalItem.summaryCells[8][0].value = 0 : c.totalItem.summaryCells[8][0].value = total26E/presupuesto26E;
            // proyeccion26E === 0 ? c.totalItem.summaryCells[12][0].value = 0 : c.totalItem.summaryCells[12][0].value = total26E/presupuesto26E;
  
            totalesPor26.totalE = c.totalItem.summaryCells[6][0].value
            totalesPor26.presupuestoE = c.totalItem.summaryCells[8][0].value
            // totalesPor26.proyeccionE = c.totalItem.summaryCells[12][0].value
          }
          // // // //Febrero
          if(c.totalItem.summaryCells[17][0] !== undefined){
            total26FB === 0 ? c.totalItem.summaryCells[17][0].value = 0 : c.totalItem.summaryCells[17][0].value = total26FB/anioAnt26FB;
            presupuesto26FB === 0 ? c.totalItem.summaryCells[19][0].value = 0 : c.totalItem.summaryCells[19][0].value = total26FB/presupuesto26FB;
            proyeccion26FB === 0 ? c.totalItem.summaryCells[23][0].value = 0 : c.totalItem.summaryCells[23][0].value = total26FB/proyeccion26FB;
  
            totalesPor26.totalFB = c.totalItem.summaryCells[17][0].value
            totalesPor26.presupuestoFB = c.totalItem.summaryCells[19][0].value
            totalesPor26.proyeccionFB = c.totalItem.summaryCells[23][0].value
          }
          // // // //Marzo
          if(c.totalItem.summaryCells[28][0] !== undefined){
            total26M === 0 ? c.totalItem.summaryCells[28][0].value = 0 : c.totalItem.summaryCells[28][0].value = total26M/anioAnt26M;
            presupuesto26M === 0 ? c.totalItem.summaryCells[30][0].value = 0 : c.totalItem.summaryCells[30][0].value = total26M/presupuesto26M;
            proyeccion26M === 0 ? c.totalItem.summaryCells[34][0].value = 0 : c.totalItem.summaryCells[34][0].value = total26M/proyeccion26M;
  
            totalesPor26.totalM = c.totalItem.summaryCells[28][0].value
            totalesPor26.presupuestoM = c.totalItem.summaryCells[30][0].value
            totalesPor26.proyeccionM = c.totalItem.summaryCells[34][0].value
          }
          // // // //Abril
          // if(c.totalItem.summaryCells[39][0] !== undefined){
          //   total26A === 0 ? c.totalItem.summaryCells[39][0].value = 0 : c.totalItem.summaryCells[39][0].value = total26A/anioAnt26A;
          //   presupuesto26A === 0 ? c.totalItem.summaryCells[41][0].value = 0 : c.totalItem.summaryCells[41][0].value = total26A/presupuesto26A;
          //   proyeccion26A === 0 ? c.totalItem.summaryCells[45][0].value = 0 : c.totalItem.summaryCells[45][0].value = total26A/proyeccion26A;
  
          //   totalesPor26.totalA = c.totalItem.summaryCells[39][0].value
          //   totalesPor26.presupuestoA = c.totalItem.summaryCells[41][0].value
          //   totalesPor26.proyeccionA = c.totalItem.summaryCells[45][0].value
          // }
          // // // //Mayo
          // if(c.totalItem.summaryCells[50][0] !== undefined){
          //   totalMY26 === 0 ? c.totalItem.summaryCells[50][0].value = 0 : c.totalItem.summaryCells[50][0].value = totalMY26/anioAntMY26;
          //   presupuestoMY26 === 0 ? c.totalItem.summaryCells[52][0].value = 0 : c.totalItem.summaryCells[52][0].value = totalMY26/presupuestoMY26;
          //   proyeccionMY26 === 0 ? c.totalItem.summaryCells[56][0].value = 0 : c.totalItem.summaryCells[56][0].value = totalMY26/proyeccionMY26;
  
          //   totalesPor26.totalMY = c.totalItem.summaryCells[50][0].value
          //   totalesPor26.presupuestoMY = c.totalItem.summaryCells[52][0].value
          //   totalesPor26.proyeccionMY = c.totalItem.summaryCells[56][0].value
          // }
          // // //Junio
          // if(c.totalItem.summaryCells[61][0] !== undefined){
          //   totalJN26 === 0 ? c.totalItem.summaryCells[61][0].value = 0 : c.totalItem.summaryCells[61][0].value = totalJN26/anioAntJN26;
          //   presupuestoJN26 === 0 ? c.totalItem.summaryCells[63][0].value = 0 : c.totalItem.summaryCells[63][0].value = totalJN26/presupuestoJN26;
          //   proyeccionJN26 === 0 ? c.totalItem.summaryCells[67][0].value = 0 : c.totalItem.summaryCells[67][0].value = totalJN26/proyeccionJN26;
  
          //   totalesPor26.totalJN = c.totalItem.summaryCells[61][0].value
          //   totalesPor26.presupuestoJN = c.totalItem.summaryCells[63][0].value
          //   totalesPor26.proyeccionJN = c.totalItem.summaryCells[67][0].value
          // }
          // // //Julio
          // if(c.totalItem.summaryCells[72][0] !== undefined){
          //   totalJL26 === 0 ? c.totalItem.summaryCells[72][0].value = 0 : c.totalItem.summaryCells[72][0].value = totalJL26/anioAntJL26;
          //   presupuestoJL26 === 0 ? c.totalItem.summaryCells[74][0].value = 0 : c.totalItem.summaryCells[74][0].value = totalJL26/presupuestoJL26;
          //   proyeccionJL26 === 0 ? c.totalItem.summaryCells[78][0].value = 0 : c.totalItem.summaryCells[78][0].value = totalJL26/proyeccionJL26;
  
          //   totalesPor26.totalJL = c.totalItem.summaryCells[72][0].value
          //   totalesPor26.presupuestoJL = c.totalItem.summaryCells[74][0].value
          //   totalesPor26.proyeccionJL = c.totalItem.summaryCells[78][0].value
          // }
          // // // //Agosto
          // if(c.totalItem.summaryCells[83][0] !== undefined){
          //   totalAG26 === 0 ? c.totalItem.summaryCells[83][0].value = 0 : c.totalItem.summaryCells[83][0].value = totalAG26/anioAntAG26;
          //   presupuestoAG26 === 0 ? c.totalItem.summaryCells[85][0].value = 0 : c.totalItem.summaryCells[85][0].value = totalAG26/presupuestoAG26;
          //   proyeccionAG26 === 0 ? c.totalItem.summaryCells[89][0].value = 0 : c.totalItem.summaryCells[89][0].value = totalAG26/proyeccionAG26;
  
          //   totalesPor26.totalAG = c.totalItem.summaryCells[83][0].value
          //   totalesPor26.presupuestoAG = c.totalItem.summaryCells[85][0].value
          //   totalesPor26.proyeccionAG = c.totalItem.summaryCells[89][0].value
          // }
          // // // //Septiembre
          // if(c.totalItem.summaryCells[94][0] !== undefined){
          //   totalS26 === 0 ? c.totalItem.summaryCells[94][0].value = 0 : c.totalItem.summaryCells[94][0].value = totalS26/anioAntS26;
          //   presupuestoS26 === 0 ? c.totalItem.summaryCells[96][0].value = 0 : c.totalItem.summaryCells[96][0].value = totalS26/presupuestoS26;
          //   proyeccionS26 === 0 ? c.totalItem.summaryCells[100][0].value = 0 : c.totalItem.summaryCells[100][0].value = totalS26/proyeccionS26;
  
          //   totalesPor26.totalS = c.totalItem.summaryCells[94][0].value
          //   totalesPor26.presupuestoS = c.totalItem.summaryCells[96][0].value
          //   totalesPor26.proyeccionS = c.totalItem.summaryCells[100][0].value
          // }
          // // //Octubre
          // if(c.totalItem.summaryCells[106][0] !== undefined){
          //   totalOC26 === 0 ? c.totalItem.summaryCells[106][0].value = 0 : c.totalItem.summaryCells[106][0].value = totalOC26/anioAntOC26;
          //   presupuestoOC26 === 0 ? c.totalItem.summaryCells[108][0].value = 0 : c.totalItem.summaryCells[108][0].value = totalOC26/presupuestoOC26;
          //   proyeccionOC26 === 0 ? c.totalItem.summaryCells[112][0].value = 0 : c.totalItem.summaryCells[112][0].value = totalOC26/proyeccionOC26;
  
          //   totalesPor26.totalOC = c.totalItem.summaryCells[106][0].value
          //   totalesPor26.presupuestoOC = c.totalItem.summaryCells[108][0].value
          //   totalesPor26.proyeccionOC = c.totalItem.summaryCells[112][0].value
          // }
          // // //Noviembre  VALIDACION CON 126 POR DOBLE PROYECCION CHECAR ??????
          // if(c.totalItem.summaryCells[126][0] !== undefined){
          //   totalNV26 === 0 ? c.totalItem.summaryCells[117][0].value = 0 : c.totalItem.summaryCells[117][0].value = totalNV26/anioAntNV26;
          //   presupuestoNV26 === 0 ? c.totalItem.summaryCells[119][0].value = 0 : c.totalItem.summaryCells[119][0].value = totalNV26/presupuestoNV26;
          //   proyeccionNV26 === 0 ? c.totalItem.summaryCells[126][0].value = 0 : c.totalItem.summaryCells[126][0].value = totalNV26/proyeccionNV26;
  
          //   totalesPor26.totalNV = c.totalItem.summaryCells[117][0].value
          //   totalesPor26.presupuestoNV = c.totalItem.summaryCells[119][0].value
          //   totalesPor26.proyeccionNV = c.totalItem.summaryCells[126][0].value
          // }
          // //Diciembre
          // if(c.totalItem.summaryCells[128][0] !== undefined){
          //   totalDC26 === 0 ? c.totalItem.summaryCells[128][0].value = 0 : c.totalItem.summaryCells[128][0].value = totalDC26/anioAntDC26;
          //   presupuestoDC26 === 0 ? c.totalItem.summaryCells[130][0].value = 0 : c.totalItem.summaryCells[130][0].value = totalDC26/presupuestoDC26;
          //   proyeccionDC26 === 0 ? c.totalItem.summaryCells[134][0].value = 0 : c.totalItem.summaryCells[134][0].value = totalDC26/proyeccionDC26;
            
          //   totalesPor26.totalDC = c.totalItem.summaryCells[128][0].value
          //   totalesPor26.presupuestoDC = c.totalItem.summaryCells[130][0].value
          //   totalesPor26.proyeccionDC = c.totalItem.summaryCells[134][0].value
          // }
  
        })
        
      }
  }
  
  verDetallesClick2026(event) {

    if(event.cellElement.innerText == "Enero" || event.cellElement.innerText == "Febrero" || event.cellElement.innerText == "Marzo"
    || event.cellElement.innerText == "Abril" || event.cellElement.innerText == "Mayo" || event.cellElement.innerText == "Junio"
    || event.cellElement.innerText == "Julio" || event.cellElement.innerText == "Agosto" || event.cellElement.innerText == "Septiembre"
    || event.cellElement.innerText == "Octubre" || event.cellElement.innerText == "Noviembre" || event.cellElement.innerText == "Diciembre" ){

        this.openModReal2026 = true;
    }
  }

  //==================Formato a la data de la grafica==================================
  formatSliderTooltip (value) {
    
    return Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(value);
  }
  onShown() {
    // setTimeout(() => {
    //   this.loadingVisible = false;
    // }, 3000);
  }
  onHidden() {
  }
  customizeK(e) {  

    var gridCell = e.gridCell;
    if (gridCell.rowType === 'group') {
      
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
  customizeExportData(cols, rows){  
    //console.log(cols)
    rows.forEach((row: any) =>{  
      
      //console.log(row)
      if(row.rowType == "groupFooter"){
          // row.values[5].value = 123;
          // console.log(row.values[5])
      }

      if(row.rowType == "totalFooter"){
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
  calcularPorcentajes(options: any) {
    // //
    // if (options.summaryProcess === 'calculate') {
    //   if (options.name === 'grupMargenUtilidaPor') {
    //     options.totalValue = .17;
    //   }
    // }
  }
  /**================TEST==================================*/
  exportGrids(e) {
    const context = this;
    const workbook = new Workbook();

    const carteraSheet = workbook.addWorksheet('DETALLE INGRESO');

    function setAlternatingRowsBackground(gridCell, excelCell) {
      if (gridCell.rowType === 'header') {

          excelCell.fill = {
            type: 'pattern', pattern: 'solid', fgColor: { argb: 'D3D3D3' }, bgColor: { argb: 'D3D3D3' },
        }
      }
  
      if(gridCell.rowType == 'groupFooter'){
        if(gridCell.column.dataField == 'eneroPor'){
          console.log(gridCell)
        }

      }
  
      if (gridCell.rowType === 'totalFooter') {
        // if(gridCell.column.caption !== "Nombre de cliente" && gridCell.column.caption !== "Intercompañia"){
        //   var currency = excelCell._value.model.value;
        //   var number = Number(currency.replace(/[^0-9.-]+/g,""));
        //   excelCell._value.model.value = number;
        // }

          excelCell.fill = {
            type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF9460' }, bgColor: { argb: 'FF9460' },
          };
      }

      if (gridCell.rowType === 'group') {
          excelCell.fill = {
            type: 'pattern', pattern: 'solid', fgColor: { argb: 'D3D3D3' }, bgColor: { argb: 'D3D3D3' },
          }
      }
    }

    // carteraSheet.columns = [
    //   { width: 10 }, { width: 35 }, { width: 18 }, { width: 18 }, { width: 18 }, { width: 18 }, { width: 18 },{ width: 18 }
    // ];

    carteraSheet.views = [{state: 'normal'}];

    exportDataGrid({
      worksheet: carteraSheet,
      component: context.gridDetalleI.instance,
      keepColumnWidths: false,
      topLeftCell: { row: 4, column: 2 },
      customizeCell: ({ gridCell, excelCell }) => {
        setAlternatingRowsBackground(gridCell, excelCell);
      },
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Cartera Cliente.xlsx');
      });
    });
  }
  formatValue(value) {
    var myvalue = Math.trunc(value);

    var myFormat = myvalue.toString().split(".");
    myFormat[0] = myFormat[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    

    return "$ "+myFormat.join("");

  }

}