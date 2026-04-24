import {NgModule, Component, ViewChild, enableProdMode, ChangeDetectionStrategy, ChangeDetectorRef,AfterViewInit, OnInit} from '@angular/core';
import { UnidadesService } from 'src/app/services/unidades/unidades.services';
import DataGrid from "devextreme/ui/data_grid";
import { IngresosModel } from 'src/app/shared/models/ingresos/ingresos.models';

import { DxDataGridComponent, DxDataGridModule, DxButtonModule} from 'devextreme-angular';
import { CurrencyPipe } from '@angular/common';
import { DxChartComponent, } from 'devextreme-angular';
import { ServiceSales } from '../tasks/app.serviceSales';
import { AniosModel} from './../../shared/models/rentabilidad-contable/renta-contable.model';
import { TotalPorcentajes } from '../../shared/models/ingresos/totalporcentajes.model'
import { ModeloGrafica } from '../../shared/models/ingresos/modeloGrafica.model';
import { Modelos } from '../../shared/models/ingresos/modelos.model';
import { DisponibilidadAnualService } from '../../services/disponibilidadAnual/disponibilidadAnual.service';

import { Customer, Service } from './app.service';

import deMessages from "devextreme/localization/messages/es.json";
import { locale, loadMessages } from "devextreme/localization";

const totalesPor  = new TotalPorcentajes;
const totalesPorGr  = new TotalPorcentajes;

const groupName = new Modelos;

@Component({
  templateUrl: './disponibilidadOperadores.component.html',
  styleUrls: ['./disponibilidadOperadores.component.scss'],
  providers: [UnidadesService,ServiceSales, CurrencyPipe, Service],
})

export class DisponibilidadOperadoresComponent implements OnInit {

  @ViewChild(DxChartComponent, { static: false }) chart: any;

  @ViewChild('dataGridVar', { static: false }) dataGrid: DxDataGridComponent | undefined;

  @ViewChild('gridModal', {static: false}) gridModal: DxDataGridComponent;

  employee: any;
  treeBoxValue: string[];
  treeDataSource: any;

  dataSource: any;
  indicadores: IngresosModel[] = [];
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

  paginacion = 5; 
  readonly allowedPageSizes = [5, 10, 20, 50, 100, 'all'];
  
  applyChangesModes: any;

  applyChangesMode: any;

  layouts: any[];

  pivotGridDataSource: any;

  openModReal: boolean = false;
  positionOf: string = '#myDiv';
  expandGroup: boolean = true;
  isVisible = false;

  totalPor = new TotalPorcentajes;
  totalFoPo = new TotalPorcentajes;

  graficaModel: ModeloGrafica[] = [];



  unidadNegoios: any[] = [
    {idUnidad: 0, ciudad: 'TODOS'},
    {idUnidad: 1, ciudad: 'ORIZABA'},
    {idUnidad: 2, ciudad: 'GUADALAJARA'},
    {idUnidad: 3, ciudad: 'RAMOS ARIZPE'},
    {idUnidad: 4, ciudad: 'MEXICALI'},
    {idUnidad: 5, ciudad: 'HERMOSILLO'},
    {idUnidad: 8, ciudad: 'CUAUTITLAN'},
    {idUnidad: 9, ciudad: 'TULTITLAN'},
  ];

  operacion: any[] = [
    // {id: 0, operacion: 'TODOS'},
    {id: 1, operacion: 'CAJA SECA'},
    {id: 2, operacion: 'ENCORTINADO'},
    {id: 3, operacion: 'GONDOLA'},
    {id: 4, operacion: 'GRADO ALIMENT'},
    {id: 5, operacion: 'TOLVA GRANEL'},
  ];

  transporte: any[] = [
    {id: 0, transporte: 'TODOS'},
    {id: 1, transporte: 'TRATOCAMIONES'},
    {id: 2, transporte: 'REMOLQUES'},
    {id: 3, transporte: 'DOLLYS'},
  ]

  periodo: any[] = [
    { id: 1, periodo: 202301 },
    { id: 2, periodo: 202302 },
    { id: 3, periodo: 202303 },
    { id: 4, periodo: 202304 },
    { id: 5, periodo: 202305 },
    { id: 6, periodo: 202306 },
    { id: 7, periodo: 202307 },
    { id: 8, periodo: 202308 },
    { id: 9, periodo: 202309 },
    { id: 10, periodo: 202310 },
    { id: 11, periodo: 202311 },
    { id: 12, periodo: 202312 },
    { id: 13, periodo: 202401 },
  ];

  estadosOp: any[] = [
    {logistica: 'Ausentismo/Suspendido', operativo: 'No Disponible'},
    {logistica: 'Baja programada', operativo: 'No Disponible'},
    {logistica: 'Capacitación', operativo: 'No Disponible'},
    {logistica: 'Descanso/Vacaciones', operativo: 'No Disponible'},
    {logistica: 'Incapacidad', operativo: 'No Disponible'},
    {logistica: 'Incapacidad Permanente', operativo: 'No Disponible'},
    {logistica: 'Instructor', operativo: 'No Disponible'},
    {logistica: 'Operando', operativo: 'Diponible'},
    {logistica: 'Patio', operativo: 'No Disponible'},
  ]

  selectedUdn: number = 0;
  selectedOperacion: number = 0;
  selectedTransporte: number = 0;
  selectedPeriodo: number = 0;

  printUdn: string = "";

  customers: Customer[];

  formFilter: any = {
    Fecha: ''
  }

  operadores: any = []
  constructor( 
    private disponiblidadService: DisponibilidadAnualService, 
    private service: ServiceSales, 
    private currencyPipe: CurrencyPipe,
    localService: Service
    ) {

      this.customers = localService.getCustomers();

    this.IdUnidadNegocio = 0;
    this.UnidadNegocio = "Nacional";
    this.Anio = 2022;
    
    this.isTreeBoxOpened = false;
    
    this.treeBoxValue = ['0'];

    this.customizeTooltip = this.customizeTooltip.bind(this);
    this.calcularPorcentajes = this.calcularPorcentajes.bind(this);

    loadMessages(deMessages);
    locale(navigator.language);

    this.formFilter
  }

  ngOnInit(): void {
    //this.getIngresosAnuales();
  }

  getIngresosAnuales(){

      this.disponiblidadService.postDisponiblidad(this.selectedUdn, this.formFilter.Fecha).subscribe((response) => {
        this.operadores = response.data.operadores
        console.log(this.operadores)
        this.loadingVisible = false
      });
  }

/*======================SELECTE FUNCIONS================================================*/
    selectUdn(value: any){
      this.selectedUdn = value.value;
      if(this.selectedUdn === 0){
        this.printUdn = "TODOS";
      }
      if(this.selectedUdn === 1){
        this.printUdn = "ORIZABA";
      }
      if(this.selectedUdn === 2){
        this.printUdn = "GUADALAJARA";
      }
      if(this.selectedUdn === 3){
        this.printUdn = "RAMOS ARIZPE";
      }
      if(this.selectedUdn === 4){
        this.printUdn = "MEXICALI";
      }
      if(this.selectedUdn === 5){
        this.printUdn = "HERMOSILLO";
      }
      if(this.selectedUdn === 8){
        this.printUdn = "CUAUTITLAN";
      }
      if(this.selectedUdn === 9){
        this.printUdn = "TULTITLAN";
      }
    }

    selectOperacion(value: any){
      this.selectedOperacion = value.value;
    }

    selectTransporte(value: any){
      this.selectedTransporte = value.value;
    }

    selectPeriodo(value: any){
      this.selectedPeriodo = value.value;
    }

    clickClientesRutas = (e: any) => {
      this.getIngresosAnuales();
      this.dataGrid?.instance.refresh();
     };


    buscarClick = (e: any) => {
      // if (this.selectedPeriodo !==  0 && this.selectedBoxCartera !== undefined) {
        this.loadingVisible = true;
  
        this.getIngresosAnuales();
      // }
  
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

  onRowPrepared(e: any) {

    if (e.rowType == 'data') {

      // e.cells.forEach((c: any) => {
  
      //   if (c.cellElement) {
      //     if(c.columnIndex == 0){
      //       c.cellElement.style.background = "#cdcbcb";
      //     }
  
      //     if(c.columnIndex == 1){
      //       c.cellElement.style.background = "#cdcbcb";
      //     }
      //     if(c.columnIndex == 2){
      //       c.cellElement.style.background = "#cdcbcb";
      //     }

      //     if(c.columnIndex == 3){
      //       c.cellElement.style.background = "#cdcbcb";
      //     }
  
      //     if(c.columnIndex == 4){
      //       c.cellElement.style.background = "#cdcbcb";
      //     }
  
      //     if(c.columnIndex == 5){
      //       c.cellElement.style.background = "#cdcbcb";
      //     }
  
      //     if(c.columnIndex == 6){
      //       c.cellElement.style.background = "#cdcbcb";
      //     }
  
      //     if(c.columnIndex == 7){
      //       c.cellElement.style.background = "#cdcbcb";
      //     }
  
      //     if (c.columnIndex == 8){
      //       c.cellElement.style.background = "#cdcbcb";
      //     }
  
  
      //   }
      // });
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

  onContentReady(e: any) {

    this.loadingVisible = false;

  }

  onCellPrepared(e: any) {
    if (e.rowType == 'groupFooter'){

        e.cellElement.style.fontSize = '15px';
        e.cellElement.style.background = "#DCDCDC";
    }
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

  verDetallesClick(event) {

    if(event.cellElement.innerText == "Enero" || event.cellElement.innerText == "Febrero" || event.cellElement.innerText == "Marzo"
    || event.cellElement.innerText == "Abril" || event.cellElement.innerText == "Mayo" || event.cellElement.innerText == "Junio"
    || event.cellElement.innerText == "Julio" || event.cellElement.innerText == "Agosto" || event.cellElement.innerText == "Septiembre"
    || event.cellElement.innerText == "Octubre" || event.cellElement.innerText == "Noviembre" || event.cellElement.innerText == "Diciembre" ){

      // if(this.indicadores.length !== 0){
        //this.openModReal = true;
      // }else{
      //   this.isVisible = true;
      // } 

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


  formatValue(value) {
    var myvalue = Math.trunc(value);

    var myFormat = myvalue.toString().split(".");
    myFormat[0] = myFormat[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    

    return "$ "+myFormat.join("");

  }

  openDetalle(value){
    // this.loadingVisible = true;
    // var idArea = value.row.data.idArea;
    // var ciclo = value.row.data.ciclo;
    
    // if(idArea !== undefined && ciclo !== undefined){
    
      // this.macrocicloService.postMacrocicloDetalle(idArea, ciclo).subscribe(data =>{
      //   console.log(data.data)
      //   this.detalleMacro = data.data
      //   this.detalleMacro.sort((a, b) => (a.noViaje < b.noViaje ? -1 : 1));

        this.openModReal = true;
    //     this.loadingVisible = false;
    //   })

    // }
  }

}
