import { RentContModel, UnidadesNegocioModel, MesesModel, AniosModel, CompaniaModel } from './../../shared/models/rentabilidad-contable/renta-contable.model';
import { ProyeccionCostosService } from '../../services/proyeccionCostos/proyeccionCostos.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import liquidaciones from '/src/assets/rc02.json';
import dxSelectBox from 'devextreme/ui/select_box';
import { DxSelectBoxComponent } from 'devextreme-angular';

// import { CountryInfo, EnergyDescription, Service  } from './costos-anuales.service';
import { CostosAnuales } from '../../shared/models/costos-anuales/costosAnuales.model';
import { DetalleCuenta } from '../../shared/models/costos-anuales/detalleCuenta.model'
import { TotalesOperacion } from '../../shared/models/costos-anuales/totalesOperacion.model';
import {  OtrosGastosIngresosOrdonarios } from '../../shared/models/costos-anuales/totalesOtrosGIOr.model'
import { OtrosGastosOperacion } from '../../shared/models/costos-anuales/totalesOtrosGO.model'
import { Otros } from '../../shared/models/costos-anuales/totalesOtros.model';
import { OtrosGastosIngresosEstraordinarios } from '../../shared/models/costos-anuales/totalesOtrosGIE.model';
import { GastosIngresosFinancieros } from '../..//shared/models/costos-anuales/totalesGIFinancieros.model';
import { Totales0 } from '../../shared/models/costos-anuales/totales0.model';
import { Provisiones } from '../../shared/models/costos-anuales/totalesProvisiones.model';
import { Clasificacion } from '../../shared/models/costos-anuales/clasificaion.model';
import { CostosTPS } from '../../shared/models/costos-anuales/CostosTPS.model';
import { CostosTPSOccidente } from '../../shared/models/costos-anuales/costosTPSOccidente.model';
import { CostosTPSGolfo } from '../../shared/models/costos-anuales/costosTPSGolfo.mode';
import { CostosTPSGrafica } from '../../shared/models/costos-anuales/costosTPSGrafica.mode';
import { Compania } from '../../shared/models/costos-anuales/compania.model'; 
import { ProyeccionCostosModel } from '../../shared/models/proyeccionCostos/proyeccionCostos.model';

import notify from 'devextreme/ui/notify';

@Component({

  templateUrl: './proyeccionCostos.component.html',
  styleUrls: ['./proyeccionCostos.component.scss']
})
export class ProyeccionCostosComponent implements OnInit {

  @ViewChild('selectTracto') selectTracto!: DxSelectBoxComponent;

  liquidaciones: any = liquidaciones;

  costosAnuales: CostosAnuales[] = [];

  col: string = '50';


  arrUnidadesNegocio = []
  arrTractos: string[] = [];

  arrMeses: MesesModel[] = [
    { idMes: 1, nombre: 'ENERO' },
    { idMes: 2, nombre: 'FEBRERO' },
    { idMes: 3, nombre: 'MARZO' },
    { idMes: 4, nombre: 'ABRIL' },
    { idMes: 5, nombre: 'MAYO' },
    { idMes: 6, nombre: 'JUNIO' },
    { idMes: 7, nombre: 'JULIO' },
    { idMes: 8, nombre: 'AGOSTO' },
    { idMes: 9, nombre: 'SEPTIEMBRE' },
    { idMes: 10, nombre: 'OCTUBRE' },
    { idMes: 11, nombre: 'NOVIEMBRE' },
    { idMes: 12, nombre: 'DICIEMBRE' }
  ];

  arrAnos: AniosModel[] = [
    { idAnio: 202603, anio: "202603" },
    { idAnio: 202604, anio: "202604" },
  ];

  companias: Compania[] =[]

  nweCompanias = [
    {idcompania: 'GSTCON', compania: 'GST CONSOLIDADO'},
    {idCompania: 'TEICUA', compania: 'TRANSPORTADORA ESPECIALIZADA INDUSTRIAL S.A. DE C.V.'},
    {idCompania: 'TBKHER', compania: 'TRANSPORTES BONAMPAK S.A. DE C.V.'},
    {idCompania: 'TCGTUL', compania: 'TRANSPORTES DE CARGA GEMINIS S.A. DE C.V.'},
  ]


  clasificaciones: Clasificacion[] = [
    {idClas:0, clasificacion: 'TODOS'},
    {idClas:1, clasificacion: '00.- Indicadores'},
    {idClas:2, clasificacion: '01.- Operación'},
    {idClas:3, clasificacion: '02.- Otros Gastos de Operación'},
    {idClas:4, clasificacion: '03.- Total Otros Gastos y Prod. Extraordinarios'},
    {idClas:5, clasificacion: '04.- Total Otros Gastos y Productos Financieros'},
    {idClas:6, clasificacion: '05.- Total de Provisiones'}
  ]

  readonly allowedPageSizes = [5, 10, 20, 50, 100, 'all'];

  loadingVisible = false;

  proyeccCosService!: ProyeccionCostosService;

  anioSeleccionado: number = 0;
  udnSeleccionado: any;
  selectedCompania: any;
  selectedCompaniaNew: string = ''
  selectedClasficacion: number = 0;

  //===========chart===================
  types: string[] = ['line', 'stackedline', 'fullstackedline'];

  openModReal: boolean = false;
  closeButtonOptions: any;
  printButtonOptions: any;
  positionOf: string = '#myDiv';
  arrRentGer: any[] = [];
  arrLiquidacionesDetalle: any[] = [];
  promedioPonderado: number = 0;
  //============test========
  positions: string[];
  states: string[];

  paginacion: number = 0;
  expandGroup: boolean = true;

  modeSearch: 'true' | 'false' = 'false';

  isVisible = false;

  type = 'info';

  message = '';

  
  modDetalleA: boolean;

  rtlEnabled = false;

  proyeccionCTS1: ProyeccionCostosModel[] = []
  proyeccionCTS2: ProyeccionCostosModel[] = []

  constructor(
    private proyeccionCostosService: ProyeccionCostosService,
    ) {
    this.verDetallesClick = this.verDetallesClick.bind(this)
    this.proyeccCosService = proyeccionCostosService;
  }

  ngOnInit(): void {
    this.getCompanias();
  }

  ngAfterViewInit(): void {}

  //=================GETS===========================
  getProyeccionCostos(){
    this.anioSeleccionado = 202604;
    const request = new Promise((resolve, reject) => {
      this.proyeccCosService.postProyeccionCostos(this.anioSeleccionado, this.udnSeleccionado).subscribe(data => {
        
        const orderdata: ProyeccionCostosModel[] = data.data;
        let firstGrid = [];
        firstGrid.push(orderdata[0],orderdata[1],orderdata[2],orderdata[3],orderdata[4],orderdata[5],
                       orderdata[6],orderdata[7],orderdata[8],orderdata[9],orderdata[10],orderdata[11],
                       orderdata[12],orderdata[13],orderdata[14],orderdata[15],orderdata[16],orderdata[17],
                       orderdata[18]);

        let secondGrid = [];
        secondGrid.push(orderdata[19],orderdata[20],orderdata[21],orderdata[22],
                        orderdata[23],orderdata[24],orderdata[25],
                        orderdata[26],orderdata[27]);
        
                          

        
        this.proyeccionCTS1 = firstGrid;
        this.proyeccionCTS2 = secondGrid;

        this.loadingVisible = false;
      })
    });
    return request;
  }
  
  getCompanias(){
    this.proyeccCosService.getCompanias().subscribe(data => {
      this.companias = data.data;
     // console.log(this.companias)
    })
  }

  getUnidadesNegocio(value) {
    const request = new Promise((resolve, reject) => {
      // this.costosAnuService.postUnidadesNegocio(id).subscribe(data =>{
      //   this.arrUnidadesNegocio = data.data;
      // })
      if(value == 'GST CONSOLIDADO'){
        this.arrUnidadesNegocio = [
          {idUdn: 'GST CONSOLIDADO', udn: 'GST CONSOLIDADO'}
        ]
      }
      if(value == 'TRANSPORTADORA ESPECIALIZADA INDUSTRIAL S.A. DE C.V.'){
        this.arrUnidadesNegocio = [
          {idUdn: 'TEICUA', udn: 'TEICUA'}
        ]
      }else if(value == 'TRANSPORTES BONAMPAK S.A. DE C.V.'){
        this.arrUnidadesNegocio = [
          {idUdn: 'TBKHER', udn: 'TBKHER'},
          {idUdn: 'TBKRAM', udn: 'TBKRAM'},
          {idUdn: 'TBKORI', udn: 'TBKORI'},
          {idUdn: 'TBKGDL', udn: 'TBKGDL'},
          {idUdn: 'TBKMEX', udn: 'TBKMEX'}
        ]
      }else if(value == 'TRANSPORTES DE CARGA GEMINIS S.A. DE C.V.'){
        this.arrUnidadesNegocio = [
          {idUdn: 'TCGTUL', udn: 'TCGTUL'}
        ]
      }

    });
    return request;

  }



 

  //=================SELECTS========================
  //Manejadores de Eventos
  // seleccionarAnio(e: any) {
  //   this.anioSeleccionado = e.value;
  // }
  
  selectCompania(e: any) {
    this.selectedCompania = e.value;
    var myValue = []
    myValue.push(e.value)
    this.getUnidadesNegocio(myValue);
  }
  
  myCompania: string = "";
  selectCompaniaNew(e: any) {
    this.selectedCompaniaNew = e.value;
    this.myCompania = e.value;
    var myValue = []

    this.getUnidadesNegocio(e.value);
  }
  myUdN: string = "";
  seleccionarUDN(e: any) {
    this.udnSeleccionado = e.value;
    this.myUdN = e.value;
    //console.log(e)
  }

  selectClasficacion(e: any) {
    this.selectedClasficacion = e.value;
  }

  verDetallesClick(data) {
    var mydata = data.data;
  }

  borrarClick = (e: any) =>{
    this.selectTracto.value = '';
  }

  buscarClick = (e: any) => {
    if (this.selectedClasficacion !==  undefined) {
      this.loadingVisible = true;
      this.modeSearch = 'true'
        // console.log('entre : '+this.totales.totalER)

        this.getProyeccionCostos();

    }

  };

  onShown() {
    // setTimeout(() => {
    //   this.loadingVisible = false;
    // }, 3000);
  }

  onContentReady(e: any) {

    this.loadingVisible = false;

  }

  onHidden() {
  }

  onRowPreparedCAER(e: any){
    if (e.rowType == 'data') {
      e.cells.forEach((c: any) => {

        if (c.cellElement) {
          if (c.value && c.value.toString().startsWith('-')) {
            c.cellElement.style.color = "red";
            c.cellElement.style.fontWeight = "bolder";
          }
        }



      });
    }

    if (e.rowType == 'group') {
      if (e.groupIndex == 0) {
        e.rowElement.style.backgroundColor = '#dcdcdc';
        e.rowElement.style.color = "black";
        e.rowElement.style.fontWeight = "bolder";
      }
     
    }
  }

  onCellPreparedCAER(e: any){
    if (e.rowType == 'data') {
        if(e.data.renglon == 21 ||
          e.data.renglon == 24){
            e.cellElement.style.fontWeight = "bolder";
            e.cellElement.style.fontSize = "14px";
            e.cellElement.style.color = "black";
          } 

        if (e.data.renglon == 27 || 
          e.data.renglon == 32 ||
          e.data.renglon == 39 ||
          e.data.renglon == 43)
        {
          e.cellElement.style.fontWeight = "bolder";
          e.cellElement.style.fontSize = "14px";
        
          e.cellElement.style.background = "#ff9460";
          e.cellElement.style.color = "black";
        }

        if (e.data.renglon == 2 || 
          e.data.renglon == 8 ||
          e.data.renglon == 14 ||
          e.data.renglon == 20 ||
          e.data.renglon == 28 ||
          e.data.renglon == 37 ||
          e.data.renglon == 38 ||
          e.data.renglon == 40 ||
          e.data.renglon == 44 ||
          e.data.renglon == 45)
        {
          e.cellElement.style.fontWeight = "bolder";
          e.cellElement.style.fontSize = "14px";
          
        
          e.cellElement.style.background = "#DCDCDC";
          e.cellElement.style.color = "black";
        }
    }
  }

//====================personalize style excel========================================
  customizeCAER(e) {  
    var gridCell = e.gridCell;
    if (gridCell.rowType === 'data') {
      console.log(gridCell.data)
      if (gridCell.data.concepto === '1. Volumen transportado' ||
          gridCell.data.concepto === '2. Viajes Realizados' ||
          gridCell.data.concepto === '3. PRODUCTO NETO' ||
          gridCell.data.concepto === '4. COSTO DE OPERACION' || gridCell.data.concepto === 'Administación') {

          e.backgroundColor = "#DCDCDC";
          e.fontWeight = "bolder"
          e.font = {bold: true}
      }

      if(gridCell.data.concepto == 'UTILIDAD BRUTA' ||
        gridCell.data.concepto == 'UTILIDAD DE OPERACION' ||
        gridCell.data.concepto == 'UTILIDAD ANTES DE IMPTO. Y PTU' ||
        gridCell.data.concepto == 'UTILIDAD NETA'){

          e.backgroundColor = "#FD9460";
          e.font = {bold: true}
      }

      if(gridCell.data.concepto == 'Mantenimiento' ||
        gridCell.data.concepto == 'Transportacion'){

          e.font = {bold: true}
        }


    }
  }

//==================Formato a la data de la grafica==================================
  formatSliderTooltip (value) {
    
    return Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(value);
  }

//==================Formato solo comas===============================================  
  separator(value) {
      // var str = value.toString().split(".");
      // str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
      // return str.join(".");

      var myvalue = Math.trunc(value);

    var myFormat = myvalue.toString().split(".");
    myFormat[0] = myFormat[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    

    return myFormat.join("");
  }

  customizeColumns(columns) {
    columns[0].width = 70;
  }



}


