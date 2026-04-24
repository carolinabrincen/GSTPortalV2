import { RentContModel, UnidadesNegocioModel, MesesModel, AniosModel, CompaniaModel } from './../../shared/models/rentabilidad-contable/renta-contable.model';
import { CostosAnualesService } from '../../services/costos-anuales/rent-cont.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import liquidaciones from 'src/assets/rc02.json';
import dxSelectBox from 'devextreme/ui/select_box';
import { DxSelectBoxComponent } from 'devextreme-angular';

import { CountryInfo, EnergyDescription, Service  } from './costos-anuales.service';
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
import { UnidadNegocio } from '../../shared/models/costos-anuales/udn.model';
import { Totales01Operacion } from 'src/app/shared/models/costos-anuales/totales01Operacion.model';
import { TotalesOGO } from 'src/app/shared/models/costos-anuales/totalesOGO.model';

import notify from 'devextreme/ui/notify';
@Component({

  templateUrl: './costos-anuales.component.html',
  styleUrls: ['./costos-anuales.component.scss'],
  providers: [Service],
})
export class CostosAnualesComponent implements OnInit {

  @ViewChild('selectTracto') selectTracto!: DxSelectBoxComponent;

  liquidaciones: any = liquidaciones;
  fechaInicio: Date = new Date();
  fechaFin: Date = new Date();

  costosAnuales: CostosAnuales[] = [];
  DestalleCuenta: DetalleCuenta[] = [];
  costosFTP: CostosTPS[] = [];
  costosTPSOccidente: CostosTPSOccidente[] = [];
  costosTPSGolfo: CostosTPSGolfo[] = [];
  costosTPSGrafica: CostosTPSGrafica[] = [];


  col: string = '50';


  arrUnidadesNegocio: UnidadNegocio[] = [];

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
    { idAnio: 2023, anio: "2023" }
    // { idAnio: 2021, anio: "2021" },
  ];

  companias: Compania[] =[]


  clasificaciones: Clasificacion[] = [
    {idClas:0, clasificacion: ''},
    {idClas:1, clasificacion: '00.- Indicadores'},
    {idClas:2, clasificacion: '01.- Operación'},
    {idClas:3, clasificacion: '02.- Otros Gastos de Operación'},
    {idClas:4, clasificacion: '03.- Total Otros Gastos y Prod. Extraordinarios'},
    {idClas:5, clasificacion: '04.- Total Otros Gastos y Productos Financieros'},
    {idClas:6, clasificacion: '05.- Total de Provisiones'}
  ]

  readonly allowedPageSizes = [5, 10, 20, 50, 100, 'all'];

  loadingVisible = false;

  costosAnuService!: CostosAnualesService;

  mesSeleccionado: number = 0;
  anioSeleccionado: number = 0;
  udnSeleccionado: number = 0;
  tractoSeleccionado: string = '';
  selectedCompania: number = 0;
  selectedAnioTPS: number = 0;
  selectedMesTPS: number = 0;
  selectedClasficacion: number = 0;

  objTracto: any;
  objRentabilidad: any;

  //===========chart===================
  countriesInfo: CountryInfo[];
  energySources: EnergyDescription[];
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

  totalesOperacion = new TotalesOperacion;
  totales01O = new Totales01Operacion;
  totales02OGO = new TotalesOGO;
  totalesOGIO = new OtrosGastosIngresosOrdonarios;
  totalesOtrosGO = new OtrosGastosOperacion;
  totalesOtros = new Otros;
  totalesOtrosGIE = new OtrosGastosIngresosEstraordinarios;
  totalesGIF = new GastosIngresosFinancieros;
  totales = new Totales0;
  totalesProvisiones = new Provisiones;

  paginacion: number = 0;
  expandGroup: boolean = true;

  modeSearch: 'true' | 'false' = 'false';

  isVisible = false;

  type = 'info';

  message = '';

  constructor(
    private costosAnualesService: CostosAnualesService,
    private service: Service
    ) {

    this.calcularPorcentajes = this.calcularPorcentajes.bind(this);
    this.verDetallesClick = this.verDetallesClick.bind(this)
    this.costosAnuService = costosAnualesService;

  //===========chart===================
    this.countriesInfo = service.getCountriesInfo();
    this.energySources = service.getEnergySources();
  }


  ngOnInit(): void {
    this.getCompanias();
  }

  ngAfterViewInit(): void {}

  //=================GETS===========================
  getCompanias(){
    this.costosAnuService.getCompanias().subscribe(data => {
      this.companias = data.data;
      //console.log(this.companias)
    })
  }

  getUnidadesNegocio(id) {
    const request = new Promise((resolve, reject) => {
      this.costosAnuService.postUnidadesNegocio(id).subscribe(data =>{
        this.arrUnidadesNegocio = data.data;
      })
    });
    return request;

  }

  //=================SELECTS========================
  //Manejadores de Eventos
  seleccionarAnio(e: any) {
    this.anioSeleccionado = e.value;
  }
  seleccionarMes(e: any) {
    this.mesSeleccionado = e.value;
  }
  selectCompania(e: any) {
    this.selectedCompania = e.value;
    var myValue = []
    myValue.push(e.value)
    this.getUnidadesNegocio(myValue);
  }  
  seleccionarUDN(e: any) {
    this.udnSeleccionado = e.value;
    //console.log(e)
  }

  selectClasficacion(e: any) {
    this.selectedClasficacion = e.value;
  }

  seleccionarAnioTPS(e: any) {
    this.selectedAnioTPS = e.value;
  }
  seleccionarMesTPS(e: any) {
    this.selectedMesTPS = e.value;
  }


  callCostosAnuales() {
    const request = new Promise((resolve, reject) => {
      var myclasificacion = 0
      this.costosAnuService.postEdoResult(this.anioSeleccionado, this.selectedCompania, this.udnSeleccionado, this.mesSeleccionado, this.selectedClasficacion).subscribe(data =>{
        this.costosAnuales = data.data;
        this.paginacion = 0;
        this.expandGroup = true;
      })
    });
    return request;
  }

  verDetallesClick(data) {
    //console.log(data)

      var anio = this.anioSeleccionado;
      var idCompania = this.selectedCompania;
      var idArea = this.udnSeleccionado;
      var mes = this.mesSeleccionado;
      var periodo = 0;
      var idCuenta = data.key.idCuenta;
      this.costosAnuService.postDetalleCuenta(anio, idCompania, idArea, mes, periodo, idCuenta).subscribe(data =>{
        //console.log(data)
        this.DestalleCuenta = data.data
        this.openModReal = true;
      })
  }

  borrarClick = (e: any) =>{
    this.selectTracto.value = '';
  }

  
  buscarClick = (e: any) => {
    if (this.selectedClasficacion !==  undefined) {
      this.loadingVisible = true;
      this.modeSearch = 'true'

      this.totalesProvisiones = new Provisiones
      this.totalesOtrosGO = new OtrosGastosOperacion
      this.totalesOtrosGIE = new OtrosGastosIngresosEstraordinarios
      this.totalesOtros = new Otros
      this.totalesOperacion = new TotalesOperacion
      this.totalesOGIO = new OtrosGastosIngresosOrdonarios
      this.totalesGIF = new GastosIngresosFinancieros
      this.totales  = new Totales0

        // console.log('entre : '+this.totales.totalER)

      this.callCostosAnuales().then(() => {
        this.loadingVisible = false;
      });
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

  onCellPrepared(e: any) {
    if(e.rowType === "groupFooter" && e.column.dataField === "margenUtilida") {
      //console.log('👣', e);

        e.cellElement.style.color = "red";
        // Tracks the `Amount` data field
        // e.watch(function() {
        //     return e.data.Amount;
        // }, function() {
        //     e.cellElement.style.color = e.data.Amount >= 10000 ? "green" : "red";
        // })
    }
}

totalesOGOER
totalesOGOEP
totalesOGOED
totalesOGOFR
totalesOGOFP
totalesOGOFD
totalesOGOMR
totalesOGOMP
totalesOGOMD
totalesOGOAR
totalesOGOAP
totalesOGOAD
totalesOGOMYR
totalesOGOMYP
totalesOGOMYD
totalesOGOJR
totalesOGOJP
totalesOGOJD
totalesOGOJLR
totalesOGOJLP
totalesOGOJLD
totalesOGOAGR
totalesOGOAGP
totalesOGOAGD
totalesOGOSR
totalesOGOSP
totalesOGOSD
totalesOGOOR
totalesOGOOP
totalesOGOOD
totalesOGONR
totalesOGONP
totalesOGOND
totalesOGODR
totalesOGODP
totalesOGODD
totalesOGOACR
totalesOGOACP
totalesOGOACD

  groupValue: string;
  onRowPrepared(e: any) {

    if (e.rowType == 'data') {
      e.cells.forEach((c: any) => {
        if (c.cellElement) {
          //poner en rojo negativos
          if (c.value && c.value.toString().startsWith('-')) {
            c.cellElement.style.color = "red";
          }
          //porcentaje de combistuble > .25 en rojo
          if (c.columnIndex == 16 && c.value >= .25) {
            c.cellElement.style.color = "red";
          }
        }
      });
    }

    if (e.rowType == 'group') {
      //====Agregando estilos a la agrupacion=========================================
      if (e.groupIndex == 0) {
        e.rowElement.style.backgroundColor = '#ff9460';
        e.rowElement.style.color = "white";
        
      }
      else {
        e.rowElement.style.backgroundColor = '#dcdcdc';
        e.rowElement.style.color = "black";
        e.rowElement.style.fontWeight = "bolder";
      }
    }

    if (e.rowType == 'groupFooter') {


      if (e.groupIndex === 0) {
        e.summaryCells[5][0].displayFormat = 'Utilidad (Perdida) Neta ' + e.key[0];
      }

      if (e.groupIndex === 1) {
        if(e.data.key !== '0.- INDICADORES'){
          e.summaryCells[5][0].displayFormat = e.key[1];
        }else{
          this.groupValue = '0.- INDICADORES';
    
          e.cells.forEach((c: any) => {
          
            if(c.summaryItems.length !== 0 ){
              c.summaryItems = [];
              // c.cellElement.style.background = "#dcdcdc";
            }
          });

        }

      }

      if (e.groupIndex === 2) {
        e.summaryCells[5][0].displayFormat = e.key[2];

        if(e.data.key == 'INDICADORES'){
          e.cells.forEach((c: any) => {
          
            if(c.summaryItems.length !== 0 ){
              c.summaryItems = [];
              // c.cellElement.style.background = "#dcdcdc";
            }
          })
        }

//================================Resta de la agrupaciones==============================================

//=============================== Sancando valores para 01.- OPERACION==================================================
        if(e.data.key == 'a.- INGRESOS POR FLETE'){
          this.totales01O.totalIFER = e.summaryCells[7][0].value;
          this.totales01O.totalIFEP = e.summaryCells[8][0].value;
          this.totales01O.totalIFED = e.summaryCells[9][0].value;
          this.totales01O.totalIFFR = e.summaryCells[12][0].value;
          this.totales01O.totalIFFP = e.summaryCells[13][0].value;
          this.totales01O.totalIFFD = e.summaryCells[14][0].value;
          this.totales01O.totalIFMR = e.summaryCells[17][0].value;
          this.totales01O.totalIFMP = e.summaryCells[18][0].value;
          this.totales01O.totalIFMD = e.summaryCells[19][0].value;
          this.totales01O.totalIFAR = e.summaryCells[22][0].value;
          this.totales01O.totalIFAP = e.summaryCells[23][0].value;
          this.totales01O.totalIFAD = e.summaryCells[24][0].value;
          this.totales01O.totalIFMYR = e.summaryCells[27][0].value;
          this.totales01O.totalIFMYP = e.summaryCells[28][0].value;
          this.totales01O.totalIFMYD = e.summaryCells[29][0].value;
          this.totales01O.totalIFJR = e.summaryCells[32][0].value;
          this.totales01O.totalIFJP = e.summaryCells[33][0].value;
          this.totales01O.totalIFJD = e.summaryCells[34][0].value;
          this.totales01O.totalIFJLR = e.summaryCells[37][0].value;
          this.totales01O.totalIFJLP = e.summaryCells[38][0].value;
          this.totales01O.totalIFJLD = e.summaryCells[39][0].value;
          this.totales01O.totalIFAGR = e.summaryCells[42][0].value;
          this.totales01O.totalIFAGP = e.summaryCells[43][0].value;
          this.totales01O.totalIFAGD = e.summaryCells[44][0].value;
          this.totales01O.totalIFSR = e.summaryCells[47][0].value;
          this.totales01O.totalIFSP = e.summaryCells[48][0].value;
          this.totales01O.totalIFSD = e.summaryCells[49][0].value;
          this.totales01O.totalIFOR = e.summaryCells[52][0].value;
          this.totales01O.totalIFOP = e.summaryCells[53][0].value;
          this.totales01O.totalIFOD = e.summaryCells[54][0].value;
          this.totales01O.totalIFNR = e.summaryCells[57][0].value;
          this.totales01O.totalIFNP = e.summaryCells[58][0].value;
          this.totales01O.totalIFND = e.summaryCells[59][0].value;
          this.totales01O.totalIFDR = e.summaryCells[62][0].value;
          this.totales01O.totalIFDP = e.summaryCells[63][0].value;
          this.totales01O.totalIFDD = e.summaryCells[64][0].value;
          this.totales01O.totalIFACR = e.summaryCells[67][0].value;
          this.totales01O.totalIFACP = e.summaryCells[68][0].value;
          this.totales01O.totalIFACD = e.summaryCells[69][0].value;
        }

        if(e.data.key == 'b.- COSTOS '){
          this.totales01O.totalCER = e.summaryCells[7][0].value;
          this.totales01O.totalCEP = e.summaryCells[8][0].value;
          this.totales01O.totalCED = e.summaryCells[9][0].value;
          this.totales01O.totalCFR = e.summaryCells[12][0].value;
          this.totales01O.totalCFP = e.summaryCells[13][0].value;
          this.totales01O.totalCFD = e.summaryCells[14][0].value;
          this.totales01O.totalCMR = e.summaryCells[17][0].value;
          this.totales01O.totalCMP = e.summaryCells[18][0].value;
          this.totales01O.totalCMD = e.summaryCells[19][0].value;
          this.totales01O.totalCAR = e.summaryCells[22][0].value;
          this.totales01O.totalCAP = e.summaryCells[23][0].value;
          this.totales01O.totalCAD = e.summaryCells[24][0].value;
          this.totales01O.totalCMYR = e.summaryCells[27][0].value;
          this.totales01O.totalCMYP = e.summaryCells[28][0].value;
          this.totales01O.totalCMYD = e.summaryCells[29][0].value;
          this.totales01O.totalCJR = e.summaryCells[32][0].value;
          this.totales01O.totalCJP = e.summaryCells[33][0].value;
          this.totales01O.totalCJD = e.summaryCells[34][0].value;
          this.totales01O.totalCJLR = e.summaryCells[37][0].value;
          this.totales01O.totalCJLP = e.summaryCells[38][0].value;
          this.totales01O.totalCJLD = e.summaryCells[39][0].value;
          this.totales01O.totalCAGR = e.summaryCells[42][0].value;
          this.totales01O.totalCAGP = e.summaryCells[43][0].value;
          this.totales01O.totalCAGD = e.summaryCells[44][0].value;
          this.totales01O.totalCSR = e.summaryCells[47][0].value;
          this.totales01O.totalCSP = e.summaryCells[48][0].value;
          this.totales01O.totalCSD = e.summaryCells[49][0].value;
          this.totales01O.totalCOR = e.summaryCells[52][0].value;
          this.totales01O.totalCOP = e.summaryCells[53][0].value;
          this.totales01O.totalCOD = e.summaryCells[54][0].value;
          this.totales01O.totalCNR = e.summaryCells[57][0].value;
          this.totales01O.totalCNP = e.summaryCells[58][0].value;
          this.totales01O.totalCND = e.summaryCells[59][0].value;
          this.totales01O.totalCDR = e.summaryCells[62][0].value;
          this.totales01O.totalCDP = e.summaryCells[63][0].value;
          this.totales01O.totalCDD = e.summaryCells[64][0].value;
          this.totales01O.totalCACR = e.summaryCells[67][0].value;
          this.totales01O.totalCACP = e.summaryCells[68][0].value;
          this.totales01O.totalCACD = e.summaryCells[69][0].value;


          this.totales01O.total01OperacionER = this.totales01O.totalIFER - this.totales01O.totalCER;
          this.totales01O.total01OperacionEP = this.totales01O.totalIFEP - this.totales01O.totalCEP;
          this.totales01O.total01OperacionED = this.totales01O.totalIFED - this.totales01O.totalCED;
          this.totales01O.total01OperacionFR = this.totales01O.totalIFFR - this.totales01O.totalCFR;
          this.totales01O.total01OperacionFP = this.totales01O.totalIFFP - this.totales01O.totalCFP;
          this.totales01O.total01OperacionFD = this.totales01O.totalIFFD - this.totales01O.totalCFD;
          this.totales01O.total01OperacionMR = this.totales01O.totalIFMR - this.totales01O.totalCMR;
          this.totales01O.total01OperacionMP = this.totales01O.totalIFMP - this.totales01O.totalCMP;
          this.totales01O.total01OperacionMD = this.totales01O.totalIFMD - this.totales01O.totalCMD;
          this.totales01O.total01OperacionAR = this.totales01O.totalIFAR - this.totales01O.totalCAR;
          this.totales01O.total01OperacionAP = this.totales01O.totalIFAP - this.totales01O.totalCAP;
          this.totales01O.total01OperacionAD = this.totales01O.totalIFAD - this.totales01O.totalCAD;
          this.totales01O.total01OperacionMYR = this.totales01O.totalIFMYR - this.totales01O.totalCMYR;
          this.totales01O.total01OperacionMYP = this.totales01O.totalIFMYP - this.totales01O.totalCMYP;
          this.totales01O.total01OperacionMYD = this.totales01O.totalIFMYD - this.totales01O.totalCMYD;
          this.totales01O.total01OperacionJR = this.totales01O.totalIFJR - this.totales01O.totalCJR;
          this.totales01O.total01OperacionJP = this.totales01O.totalIFJP - this.totales01O.totalCJP;
          this.totales01O.total01OperacionJD = this.totales01O.totalIFJD - this.totales01O.totalCJD;
          this.totales01O.total01OperacionJLR = this.totales01O.totalIFJLR - this.totales01O.totalCJLR;
          this.totales01O.total01OperacionJLP = this.totales01O.totalIFJLP - this.totales01O.totalCJLP;
          this.totales01O.total01OperacionJLD = this.totales01O.totalIFJLD - this.totales01O.totalCJLD;
          this.totales01O.total01OperacionAGR = this.totales01O.totalIFAGR - this.totales01O.totalCAGR;
          this.totales01O.total01OperacionAGP = this.totales01O.totalIFAGP - this.totales01O.totalCAGP;
          this.totales01O.total01OperacionAGD = this.totales01O.totalIFAGD - this.totales01O.totalCAGD;
          this.totales01O.total01OperacionSR = this.totales01O.totalIFSR - this.totales01O.totalCSR;
          this.totales01O.total01OperacionSP = this.totales01O.totalIFSP - this.totales01O.totalCSP;
          this.totales01O.total01OperacionSD = this.totales01O.totalIFSD - this.totales01O.totalCSD;
          this.totales01O.total01OperacionOR = this.totales01O.totalIFOR - this.totales01O.totalCOR;
          this.totales01O.total01OperacionOP = this.totales01O.totalIFOP - this.totales01O.totalCOP;
          this.totales01O.total01OperacionOD = this.totales01O.totalIFOD - this.totales01O.totalCOD;
          this.totales01O.total01OperacionNR = this.totales01O.totalIFNR - this.totales01O.totalCNR;
          this.totales01O.total01OperacionNP = this.totales01O.totalIFNP - this.totales01O.totalCNP;
          this.totales01O.total01OperacionND = this.totales01O.totalIFND - this.totales01O.totalCND;
          this.totales01O.total01OperacionDR = this.totales01O.totalIFDR - this.totales01O.totalCDR;
          this.totales01O.total01OperacionDP = this.totales01O.totalIFDP - this.totales01O.totalCDP;
          this.totales01O.total01OperacionDD = this.totales01O.totalIFDD - this.totales01O.totalCDD;
          this.totales01O.total01OperacionACR = this.totales01O.totalIFACR - this.totales01O.totalCACR;
          this.totales01O.total01OperacionACP = this.totales01O.totalIFACP - this.totales01O.totalCACP;
          this.totales01O.total01OperacionACD = this.totales01O.totalIFACD - this.totales01O.totalCACD;
        }        

//========================Sacando los valores para  UTILIDAD BRUTA======================================================
        if(e.data.key == 'a.- Total de Producto Neto'){          
          // console.log(e)
          this.totalesOperacion.totalFleteER = e.summaryCells[7][0].value;
          this.totalesOperacion.totalFleteEP = e.summaryCells[8][0].value;
          this.totalesOperacion.totalFleteED = e.summaryCells[9][0].value;
          this.totalesOperacion.totalFleteFR = e.summaryCells[12][0].value;
          this.totalesOperacion.totalFleteFP = e.summaryCells[13][0].value;
          this.totalesOperacion.totalFleteFD = e.summaryCells[14][0].value;
          this.totalesOperacion.totalFleteMR = e.summaryCells[17][0].value;
          this.totalesOperacion.totalFleteMP = e.summaryCells[18][0].value;
          this.totalesOperacion.totalFleteMD = e.summaryCells[19][0].value;
          this.totalesOperacion.totalFleteAR = e.summaryCells[22][0].value;
          this.totalesOperacion.totalFleteAP = e.summaryCells[23][0].value;
          this.totalesOperacion.totalFleteAD = e.summaryCells[24][0].value;
          this.totalesOperacion.totalFleteMYR = e.summaryCells[27][0].value;
          this.totalesOperacion.totalFleteMYP = e.summaryCells[28][0].value;
          this.totalesOperacion.totalFleteMYD = e.summaryCells[29][0].value;
          this.totalesOperacion.totalFleteJR = e.summaryCells[32][0].value;
          this.totalesOperacion.totalFleteJP = e.summaryCells[33][0].value;
          this.totalesOperacion.totalFleteJD = e.summaryCells[34][0].value;
          this.totalesOperacion.totalFleteJLR = e.summaryCells[37][0].value;
          this.totalesOperacion.totalFleteJLP = e.summaryCells[38][0].value;
          this.totalesOperacion.totalFleteJLD = e.summaryCells[39][0].value;
          this.totalesOperacion.totalFleteAGR = e.summaryCells[42][0].value;
          this.totalesOperacion.totalFleteAGP = e.summaryCells[43][0].value;
          this.totalesOperacion.totalFleteAGD = e.summaryCells[44][0].value;
          this.totalesOperacion.totalFleteSR = e.summaryCells[47][0].value;
          this.totalesOperacion.totalFleteSP = e.summaryCells[48][0].value;
          this.totalesOperacion.totalFleteSD = e.summaryCells[49][0].value;
          this.totalesOperacion.totalFleteOR = e.summaryCells[52][0].value;
          this.totalesOperacion.totalFleteOP = e.summaryCells[53][0].value;
          this.totalesOperacion.totalFleteOD = e.summaryCells[54][0].value;
          this.totalesOperacion.totalFleteNR = e.summaryCells[57][0].value;
          this.totalesOperacion.totalFleteNP = e.summaryCells[58][0].value;
          this.totalesOperacion.totalFleteND = e.summaryCells[59][0].value;
          this.totalesOperacion.totalFleteDR = e.summaryCells[62][0].value;
          this.totalesOperacion.totalFleteDP = e.summaryCells[63][0].value;
          this.totalesOperacion.totalFleteDD = e.summaryCells[64][0].value;
          this.totalesOperacion.totalFleteACR = e.summaryCells[67][0].value;
          this.totalesOperacion.totalFleteACP = e.summaryCells[68][0].value;
          this.totalesOperacion.totalFleteACD = e.summaryCells[69][0].value;
        }

        if(e.data.key == 'b.- Total Costo de Operacion'){    
          this.totalesOperacion.totalCostosER = e.summaryCells[7][0].value;
          this.totalesOperacion.totalCostosEP = e.summaryCells[8][0].value;
          this.totalesOperacion.totalCostosED = e.summaryCells[9][0].value;
          this.totalesOperacion.totalCostosFR = e.summaryCells[12][0].value;
          this.totalesOperacion.totalCostosFP = e.summaryCells[13][0].value;
          this.totalesOperacion.totalCostosFD = e.summaryCells[14][0].value;
          this.totalesOperacion.totalCostosMR = e.summaryCells[17][0].value;
          this.totalesOperacion.totalCostosMP = e.summaryCells[18][0].value;
          this.totalesOperacion.totalCostosMD = e.summaryCells[19][0].value;
          this.totalesOperacion.totalCostosAR = e.summaryCells[22][0].value;
          this.totalesOperacion.totalCostosAP = e.summaryCells[23][0].value;
          this.totalesOperacion.totalCostosAD = e.summaryCells[24][0].value;
          this.totalesOperacion.totalCostosMYR = e.summaryCells[27][0].value;
          this.totalesOperacion.totalCostosMYP = e.summaryCells[28][0].value;
          this.totalesOperacion.totalCostosMYD = e.summaryCells[29][0].value;
          this.totalesOperacion.totalCostosJR = e.summaryCells[32][0].value;
          this.totalesOperacion.totalCostosJP = e.summaryCells[33][0].value;
          this.totalesOperacion.totalCostosJD = e.summaryCells[34][0].value;
          this.totalesOperacion.totalCostosJLR = e.summaryCells[37][0].value;
          this.totalesOperacion.totalCostosJLP = e.summaryCells[38][0].value;
          this.totalesOperacion.totalCostosJLD = e.summaryCells[39][0].value;
          this.totalesOperacion.totalCostosAGR = e.summaryCells[42][0].value;
          this.totalesOperacion.totalCostosAGP = e.summaryCells[43][0].value;
          this.totalesOperacion.totalCostosAGD = e.summaryCells[44][0].value;
          this.totalesOperacion.totalCostosSR = e.summaryCells[47][0].value;
          this.totalesOperacion.totalCostosSP = e.summaryCells[48][0].value;
          this.totalesOperacion.totalCostosSD = e.summaryCells[49][0].value;
          this.totalesOperacion.totalCostosOR = e.summaryCells[52][0].value;
          this.totalesOperacion.totalCostosOP = e.summaryCells[53][0].value;
          this.totalesOperacion.totalCostosOD = e.summaryCells[54][0].value;
          this.totalesOperacion.totalCostosNR = e.summaryCells[57][0].value;
          this.totalesOperacion.totalCostosNP = e.summaryCells[58][0].value;
          this.totalesOperacion.totalCostosND = e.summaryCells[59][0].value;
          this.totalesOperacion.totalCostosDR = e.summaryCells[62][0].value;
          this.totalesOperacion.totalCostosDP = e.summaryCells[63][0].value;
          this.totalesOperacion.totalCostosDD = e.summaryCells[64][0].value;
          this.totalesOperacion.totalCostosACR = e.summaryCells[67][0].value;
          this.totalesOperacion.totalCostosACP = e.summaryCells[68][0].value;
          this.totalesOperacion.totalCostosACD = e.summaryCells[69][0].value;


          this.totalesOperacion.totalOperacionER = this.totalesOperacion.totalFleteER - this.totalesOperacion.totalCostosER;
          this.totalesOperacion.totalOperacionEP = this.totalesOperacion.totalFleteEP - this.totalesOperacion.totalCostosEP;
          this.totalesOperacion.totalOperacionED = this.totalesOperacion.totalFleteED - this.totalesOperacion.totalCostosED;
          this.totalesOperacion.totalOperacionFR = this.totalesOperacion.totalFleteFR - this.totalesOperacion.totalCostosFR;
          this.totalesOperacion.totalOperacionFP = this.totalesOperacion.totalFleteFP - this.totalesOperacion.totalCostosFP;
          this.totalesOperacion.totalOperacionFD = this.totalesOperacion.totalFleteFD - this.totalesOperacion.totalCostosFD;
          this.totalesOperacion.totalOperacionMR = this.totalesOperacion.totalFleteMR - this.totalesOperacion.totalCostosMR;
          this.totalesOperacion.totalOperacionMP = this.totalesOperacion.totalFleteMP - this.totalesOperacion.totalCostosMP;
          this.totalesOperacion.totalOperacionMD = this.totalesOperacion.totalFleteMD - this.totalesOperacion.totalCostosMD;
          this.totalesOperacion.totalOperacionAR = this.totalesOperacion.totalFleteAR - this.totalesOperacion.totalCostosAR;
          this.totalesOperacion.totalOperacionAP = this.totalesOperacion.totalFleteAP - this.totalesOperacion.totalCostosAP;
          this.totalesOperacion.totalOperacionAD = this.totalesOperacion.totalFleteAD - this.totalesOperacion.totalCostosAD;
          this.totalesOperacion.totalOperacionMYR = this.totalesOperacion.totalFleteMYR - this.totalesOperacion.totalCostosMYR;
          this.totalesOperacion.totalOperacionMYP = this.totalesOperacion.totalFleteMYP - this.totalesOperacion.totalCostosMYP;
          this.totalesOperacion.totalOperacionMYD = this.totalesOperacion.totalFleteMYD - this.totalesOperacion.totalCostosMYD; 
          this.totalesOperacion.totalOperacionJR = this.totalesOperacion.totalFleteJR - this.totalesOperacion.totalCostosJR;
          this.totalesOperacion.totalOperacionJP = this.totalesOperacion.totalFleteJP - this.totalesOperacion.totalCostosJP;
          this.totalesOperacion.totalOperacionJD = this.totalesOperacion.totalFleteJD - this.totalesOperacion.totalCostosJD;
          this.totalesOperacion.totalOperacionJLR = this.totalesOperacion.totalFleteJLR - this.totalesOperacion.totalCostosJLR;
          this.totalesOperacion.totalOperacionJLP = this.totalesOperacion.totalFleteJLP - this.totalesOperacion.totalCostosJLP;
          this.totalesOperacion.totalOperacionJLD = this.totalesOperacion.totalFleteJLD - this.totalesOperacion.totalCostosJD;
          this.totalesOperacion.totalOperacionAGR = this.totalesOperacion.totalFleteAGR - this.totalesOperacion.totalCostosAGR;
          this.totalesOperacion.totalOperacionAGP = this.totalesOperacion.totalFleteAGP - this.totalesOperacion.totalCostosAGP;
          this.totalesOperacion.totalOperacionAGD = this.totalesOperacion.totalFleteAGD - this.totalesOperacion.totalCostosAGD;
          this.totalesOperacion.totalOperacionSR = this.totalesOperacion.totalFleteSR - this.totalesOperacion.totalCostosSR;
          this.totalesOperacion.totalOperacionSP = this.totalesOperacion.totalFleteSP - this.totalesOperacion.totalCostosSP;
          this.totalesOperacion.totalOperacionSD = this.totalesOperacion.totalFleteSD - this.totalesOperacion.totalCostosSD;
          this.totalesOperacion.totalOperacionOR = this.totalesOperacion.totalFleteOR - this.totalesOperacion.totalCostosOR;
          this.totalesOperacion.totalOperacionOP = this.totalesOperacion.totalFleteOP - this.totalesOperacion.totalCostosOP;
          this.totalesOperacion.totalOperacionOD = this.totalesOperacion.totalFleteOD - this.totalesOperacion.totalCostosOD;
          this.totalesOperacion.totalOperacionNR = this.totalesOperacion.totalFleteNR - this.totalesOperacion.totalCostosNR;
          this.totalesOperacion.totalOperacionNP = this.totalesOperacion.totalFleteNP - this.totalesOperacion.totalCostosNP;
          this.totalesOperacion.totalOperacionND = this.totalesOperacion.totalFleteND - this.totalesOperacion.totalCostosND;
          this.totalesOperacion.totalOperacionDR = this.totalesOperacion.totalFleteDR - this.totalesOperacion.totalCostosDR;
          this.totalesOperacion.totalOperacionDP = this.totalesOperacion.totalFleteDP - this.totalesOperacion.totalCostosDR;
          this.totalesOperacion.totalOperacionDD = this.totalesOperacion.totalFleteDD - this.totalesOperacion.totalCostosDD;
          this.totalesOperacion.totalOperacionACR = this.totalesOperacion.totalFleteACR - this.totalesOperacion.totalCostosACR;
          this.totalesOperacion.totalOperacionACP = this.totalesOperacion.totalFleteACP - this.totalesOperacion.totalCostosACP;
          this.totalesOperacion.totalOperacionACD = this.totalesOperacion.totalFleteACD - this.totalesOperacion.totalCostosACD;
        }

//===============================Resta de la agrupacion de Total Otros Gastos de Operacion===============================
        // if(e.data.key == 'a.- GASTOS ADMINISTRATIVOS'){
        //     this.totalesOtrosGO.totalGAER = e.summaryCells[7][0].value;
        //     this.totalesOtrosGO.totalGAEP = e.summaryCells[8][0].value;
        //     this.totalesOtrosGO.totalGAED = e.summaryCells[9][0].value;
        //     this.totalesOtrosGO.totalGAFR = e.summaryCells[12][0].value;
        //     this.totalesOtrosGO.totalGAFP = e.summaryCells[13][0].value;
        //     this.totalesOtrosGO.totalGAFD = e.summaryCells[14][0].value;
        //     this.totalesOtrosGO.totalGAMR = e.summaryCells[17][0].value;
        //     this.totalesOtrosGO.totalGAMP = e.summaryCells[18][0].value;
        //     this.totalesOtrosGO.totalGAMD = e.summaryCells[19][0].value;
        //     this.totalesOtrosGO.totalGAAR = e.summaryCells[22][0].value;
        //     this.totalesOtrosGO.totalGAAP = e.summaryCells[23][0].value;
        //     this.totalesOtrosGO.totalGAAD = e.summaryCells[24][0].value;
        //     this.totalesOtrosGO.totalGAMYR = e.summaryCells[27][0].value;
        //     this.totalesOtrosGO.totalGAMYP = e.summaryCells[28][0].value;
        //     this.totalesOtrosGO.totalGAMYD = e.summaryCells[29][0].value;
        //     this.totalesOtrosGO.totalGAJR = e.summaryCells[32][0].value;
        //     this.totalesOtrosGO.totalGAJP = e.summaryCells[33][0].value;
        //     this.totalesOtrosGO.totalGAJD = e.summaryCells[34][0].value;
        //     this.totalesOtrosGO.totalGAJLR = e.summaryCells[37][0].value;
        //     this.totalesOtrosGO.totalGAJLP = e.summaryCells[38][0].value;
        //     this.totalesOtrosGO.totalGAJLD = e.summaryCells[39][0].value;
        //     this.totalesOtrosGO.totalGAAGR = e.summaryCells[42][0].value;
        //     this.totalesOtrosGO.totalGAAGP = e.summaryCells[43][0].value;
        //     this.totalesOtrosGO.totalGAAGD = e.summaryCells[44][0].value;
        //     this.totalesOtrosGO.totalGASR = e.summaryCells[47][0].value;
        //     this.totalesOtrosGO.totalGASP = e.summaryCells[48][0].value;
        //     this.totalesOtrosGO.totalGASD = e.summaryCells[49][0].value;
        //     this.totalesOtrosGO.totalGAOR = e.summaryCells[52][0].value;
        //     this.totalesOtrosGO.totalGAOP = e.summaryCells[53][0].value;
        //     this.totalesOtrosGO.totalGAOD = e.summaryCells[54][0].value;
        //     this.totalesOtrosGO.totalGANR = e.summaryCells[57][0].value;
        //     this.totalesOtrosGO.totalGANP = e.summaryCells[58][0].value;
        //     this.totalesOtrosGO.totalGAND = e.summaryCells[59][0].value;
        //     this.totalesOtrosGO.totalGADR = e.summaryCells[62][0].value;
        //     this.totalesOtrosGO.totalGADP = e.summaryCells[63][0].value;
        //     this.totalesOtrosGO.totalGADD = e.summaryCells[64][0].value;
        //     this.totalesOtrosGO.totalGAACR = e.summaryCells[67][0].value;
        //     this.totalesOtrosGO.totalGAACP = e.summaryCells[68][0].value;
        //     this.totalesOtrosGO.totalGAACD = e.summaryCells[69][0].value;
        // }

        // if(e.data.key == 'b.- DEPRECIACION DE ACTIVOS'){
        //   this.totalesOtrosGO.totalDAER = e.summaryCells[7][0].value;
        //   this.totalesOtrosGO.totalDAEP = e.summaryCells[8][0].value;
        //   this.totalesOtrosGO.totalDAED = e.summaryCells[9][0].value;
        //   this.totalesOtrosGO.totalDAFR = e.summaryCells[12][0].value;
        //   this.totalesOtrosGO.totalDAFP = e.summaryCells[13][0].value;
        //   this.totalesOtrosGO.totalDAFD = e.summaryCells[14][0].value;
        //   this.totalesOtrosGO.totalDAMR = e.summaryCells[17][0].value;
        //   this.totalesOtrosGO.totalDAMP = e.summaryCells[18][0].value;
        //   this.totalesOtrosGO.totalDAMD = e.summaryCells[19][0].value;
        //   this.totalesOtrosGO.totalDAAR = e.summaryCells[22][0].value;
        //   this.totalesOtrosGO.totalDAAP = e.summaryCells[23][0].value;
        //   this.totalesOtrosGO.totalDAAD = e.summaryCells[24][0].value;
        //   this.totalesOtrosGO.totalDAMYR = e.summaryCells[27][0].value;
        //   this.totalesOtrosGO.totalDAMYP = e.summaryCells[28][0].value;
        //   this.totalesOtrosGO.totalDAMYD = e.summaryCells[29][0].value;
        //   this.totalesOtrosGO.totalDAJR = e.summaryCells[32][0].value;
        //   this.totalesOtrosGO.totalDAJP = e.summaryCells[33][0].value;
        //   this.totalesOtrosGO.totalDAJD = e.summaryCells[34][0].value;
        //   this.totalesOtrosGO.totalDAJLR = e.summaryCells[37][0].value;
        //   this.totalesOtrosGO.totalDAJLP = e.summaryCells[38][0].value;
        //   this.totalesOtrosGO.totalDAJLD = e.summaryCells[39][0].value;
        //   this.totalesOtrosGO.totalDAAGR = e.summaryCells[42][0].value;
        //   this.totalesOtrosGO.totalDAAGP = e.summaryCells[43][0].value;
        //   this.totalesOtrosGO.totalDAAGD = e.summaryCells[44][0].value;
        //   this.totalesOtrosGO.totalDASR = e.summaryCells[47][0].value;
        //   this.totalesOtrosGO.totalDASP = e.summaryCells[48][0].value;
        //   this.totalesOtrosGO.totalDASD = e.summaryCells[49][0].value;
        //   this.totalesOtrosGO.totalDAOR = e.summaryCells[52][0].value;
        //   this.totalesOtrosGO.totalDAOP = e.summaryCells[53][0].value;
        //   this.totalesOtrosGO.totalDAOD = e.summaryCells[54][0].value;
        //   this.totalesOtrosGO.totalDANR = e.summaryCells[57][0].value;
        //   this.totalesOtrosGO.totalDANP = e.summaryCells[58][0].value;
        //   this.totalesOtrosGO.totalDAND = e.summaryCells[59][0].value;
        //   this.totalesOtrosGO.totalDADR = e.summaryCells[62][0].value;
        //   this.totalesOtrosGO.totalDADP = e.summaryCells[63][0].value;
        //   this.totalesOtrosGO.totalDADD = e.summaryCells[64][0].value;
        //   this.totalesOtrosGO.totalDAACR = e.summaryCells[67][0].value;
        //   this.totalesOtrosGO.totalDAACP = e.summaryCells[68][0].value;
        //   this.totalesOtrosGO.totalDAACD = e.summaryCells[69][0].value;

        // }

//================================Resta de la agrupacion de 03.- OTROS GASTOS/INGRESOS EXTRAORDINARIOS        
        if(e.data.key == 'a.- GASTOS INGRESO DE COLABORACIÓN'){
          this.totalesOtrosGIE.totalGICER = e.summaryCells[7][0].value;
          this.totalesOtrosGIE.totalGICEP = e.summaryCells[8][0].value;
          this.totalesOtrosGIE.totalGICED = e.summaryCells[9][0].value;
          this.totalesOtrosGIE.totalGICFR = e.summaryCells[12][0].value;
          this.totalesOtrosGIE.totalGICFP = e.summaryCells[13][0].value;
          this.totalesOtrosGIE.totalGICFD = e.summaryCells[14][0].value;
          this.totalesOtrosGIE.totalGICMR = e.summaryCells[17][0].value;
          this.totalesOtrosGIE.totalGICMP = e.summaryCells[18][0].value;
          this.totalesOtrosGIE.totalGICMD = e.summaryCells[19][0].value;
          this.totalesOtrosGIE.totalGICAR = e.summaryCells[22][0].value;
          this.totalesOtrosGIE.totalGICAP = e.summaryCells[23][0].value;
          this.totalesOtrosGIE.totalGICAD = e.summaryCells[24][0].value;
          this.totalesOtrosGIE.totalGICMYR = e.summaryCells[27][0].value;
          this.totalesOtrosGIE.totalGICMYP = e.summaryCells[28][0].value;
          this.totalesOtrosGIE.totalGICMYD = e.summaryCells[29][0].value;
          this.totalesOtrosGIE.totalGICJR = e.summaryCells[32][0].value;
          this.totalesOtrosGIE.totalGICJP = e.summaryCells[33][0].value;
          this.totalesOtrosGIE.totalGICJD = e.summaryCells[34][0].value;
          this.totalesOtrosGIE.totalGICJLR = e.summaryCells[37][0].value;
          this.totalesOtrosGIE.totalGICJLP = e.summaryCells[38][0].value;
          this.totalesOtrosGIE.totalGICJLD = e.summaryCells[39][0].value;
          this.totalesOtrosGIE.totalGICAGR = e.summaryCells[42][0].value;
          this.totalesOtrosGIE.totalGICAGP = e.summaryCells[43][0].value;
          this.totalesOtrosGIE.totalGICAGD = e.summaryCells[44][0].value;
          this.totalesOtrosGIE.totalGICSR = e.summaryCells[47][0].value;
          this.totalesOtrosGIE.totalGICSP = e.summaryCells[48][0].value;
          this.totalesOtrosGIE.totalGICSD = e.summaryCells[49][0].value;
          this.totalesOtrosGIE.totalGICOR = e.summaryCells[52][0].value;
          this.totalesOtrosGIE.totalGICOP = e.summaryCells[53][0].value;
          this.totalesOtrosGIE.totalGICOD = e.summaryCells[54][0].value;
          this.totalesOtrosGIE.totalGICNR = e.summaryCells[57][0].value;
          this.totalesOtrosGIE.totalGICNP = e.summaryCells[58][0].value;
          this.totalesOtrosGIE.totalGICND = e.summaryCells[59][0].value;
          this.totalesOtrosGIE.totalGICDR = e.summaryCells[62][0].value;
          this.totalesOtrosGIE.totalGICDP = e.summaryCells[63][0].value;
          this.totalesOtrosGIE.totalGICDD = e.summaryCells[64][0].value;
          this.totalesOtrosGIE.totalGICACR = e.summaryCells[67][0].value;
          this.totalesOtrosGIE.totalGICACP = e.summaryCells[68][0].value;
          this.totalesOtrosGIE.totalGICACD = e.summaryCells[69][0].value;
        }

        if(e.data.key == 'b.- ESTÍMULOS FISCALES'){
          this.totalesOtrosGIE.totalEFER = e.summaryCells[7][0].value;
          this.totalesOtrosGIE.totalEFEP = e.summaryCells[8][0].value;
          this.totalesOtrosGIE.totalEFED = e.summaryCells[9][0].value;
          this.totalesOtrosGIE.totalEFFR = e.summaryCells[12][0].value;
          this.totalesOtrosGIE.totalEFFP = e.summaryCells[13][0].value;
          this.totalesOtrosGIE.totalEFFD = e.summaryCells[14][0].value;
          this.totalesOtrosGIE.totalEFMR = e.summaryCells[17][0].value;
          this.totalesOtrosGIE.totalEFMP = e.summaryCells[18][0].value;
          this.totalesOtrosGIE.totalEFMD = e.summaryCells[19][0].value;
          this.totalesOtrosGIE.totalEFAR = e.summaryCells[22][0].value;
          this.totalesOtrosGIE.totalEFAP = e.summaryCells[23][0].value;
          this.totalesOtrosGIE.totalEFAD = e.summaryCells[24][0].value;
          this.totalesOtrosGIE.totalEFMYR = e.summaryCells[27][0].value;
          this.totalesOtrosGIE.totalEFMYP = e.summaryCells[28][0].value;
          this.totalesOtrosGIE.totalEFMYD = e.summaryCells[29][0].value;
          this.totalesOtrosGIE.totalEFJR = e.summaryCells[32][0].value;
          this.totalesOtrosGIE.totalEFJP = e.summaryCells[33][0].value;
          this.totalesOtrosGIE.totalEFJD = e.summaryCells[34][0].value;
          this.totalesOtrosGIE.totalEFJLR = e.summaryCells[37][0].value;
          this.totalesOtrosGIE.totalEFJLP = e.summaryCells[38][0].value;
          this.totalesOtrosGIE.totalEFJLD = e.summaryCells[39][0].value;
          this.totalesOtrosGIE.totalEFAGR = e.summaryCells[42][0].value;
          this.totalesOtrosGIE.totalEFAGP = e.summaryCells[43][0].value;
          this.totalesOtrosGIE.totalEFAGD = e.summaryCells[44][0].value;
          this.totalesOtrosGIE.totalEFSR = e.summaryCells[47][0].value;
          this.totalesOtrosGIE.totalEFSP = e.summaryCells[48][0].value;
          this.totalesOtrosGIE.totalEFSD = e.summaryCells[49][0].value;
          this.totalesOtrosGIE.totalEFOR = e.summaryCells[52][0].value;
          this.totalesOtrosGIE.totalEFOP = e.summaryCells[53][0].value;
          this.totalesOtrosGIE.totalEFOD = e.summaryCells[54][0].value;
          this.totalesOtrosGIE.totalEFNR = e.summaryCells[57][0].value;
          this.totalesOtrosGIE.totalEFNP = e.summaryCells[58][0].value;
          this.totalesOtrosGIE.totalEFND = e.summaryCells[59][0].value;
          this.totalesOtrosGIE.totalEFDR = e.summaryCells[62][0].value;
          this.totalesOtrosGIE.totalEFDP = e.summaryCells[63][0].value;
          this.totalesOtrosGIE.totalEFDD = e.summaryCells[64][0].value;
          this.totalesOtrosGIE.totalEFACR = e.summaryCells[67][0].value;
          this.totalesOtrosGIE.totalEFACP = e.summaryCells[68][0].value;
          this.totalesOtrosGIE.totalEFACD = e.summaryCells[69][0].value;
        }

        if(e.data.key == 'c.- VENTA DE ACTIVO FIJO'){
          this.totalesOtrosGIE.totalVAFER = e.summaryCells[7][0].value;
          this.totalesOtrosGIE.totalVAFEP = e.summaryCells[8][0].value;
          this.totalesOtrosGIE.totalVAFED = e.summaryCells[9][0].value;
          this.totalesOtrosGIE.totalVAFFR = e.summaryCells[12][0].value;
          this.totalesOtrosGIE.totalVAFFP = e.summaryCells[13][0].value;
          this.totalesOtrosGIE.totalVAFFD = e.summaryCells[14][0].value;
          this.totalesOtrosGIE.totalVAFMR = e.summaryCells[17][0].value;
          this.totalesOtrosGIE.totalVAFMP = e.summaryCells[18][0].value;
          this.totalesOtrosGIE.totalVAFMD = e.summaryCells[19][0].value;
          this.totalesOtrosGIE.totalVAFAR = e.summaryCells[22][0].value;
          this.totalesOtrosGIE.totalVAFAP = e.summaryCells[23][0].value;
          this.totalesOtrosGIE.totalVAFAD = e.summaryCells[24][0].value;
          this.totalesOtrosGIE.totalVAFMYR = e.summaryCells[27][0].value;
          this.totalesOtrosGIE.totalVAFMYP = e.summaryCells[28][0].value;
          this.totalesOtrosGIE.totalVAFMYD = e.summaryCells[29][0].value;
          this.totalesOtrosGIE.totalVAFJR = e.summaryCells[32][0].value;
          this.totalesOtrosGIE.totalVAFJP = e.summaryCells[33][0].value;
          this.totalesOtrosGIE.totalVAFJD = e.summaryCells[34][0].value;
          this.totalesOtrosGIE.totalVAFJLR = e.summaryCells[37][0].value;
          this.totalesOtrosGIE.totalVAFJLP = e.summaryCells[38][0].value;
          this.totalesOtrosGIE.totalVAFJLD = e.summaryCells[39][0].value;
          this.totalesOtrosGIE.totalVAFAGR = e.summaryCells[42][0].value;
          this.totalesOtrosGIE.totalVAFAGP = e.summaryCells[43][0].value;
          this.totalesOtrosGIE.totalVAFAGD = e.summaryCells[44][0].value;
          this.totalesOtrosGIE.totalVAFSR = e.summaryCells[47][0].value;
          this.totalesOtrosGIE.totalVAFSP = e.summaryCells[48][0].value;
          this.totalesOtrosGIE.totalVAFSD = e.summaryCells[49][0].value;
          this.totalesOtrosGIE.totalVAFOR = e.summaryCells[52][0].value;
          this.totalesOtrosGIE.totalVAFOP = e.summaryCells[53][0].value;
          this.totalesOtrosGIE.totalVAFOD = e.summaryCells[54][0].value;
          this.totalesOtrosGIE.totalVAFNR = e.summaryCells[57][0].value;
          this.totalesOtrosGIE.totalVAFNP = e.summaryCells[58][0].value;
          this.totalesOtrosGIE.totalVAFND = e.summaryCells[59][0].value;
          this.totalesOtrosGIE.totalVAFDR = e.summaryCells[62][0].value;
          this.totalesOtrosGIE.totalVAFDP = e.summaryCells[63][0].value;
          this.totalesOtrosGIE.totalVAFDD = e.summaryCells[64][0].value;
          this.totalesOtrosGIE.totalVAFACR = e.summaryCells[67][0].value;
          this.totalesOtrosGIE.totalVAFACP = e.summaryCells[68][0].value;
          this.totalesOtrosGIE.totalVAFACD = e.summaryCells[69][0].value;
        }

//================================Resta de la agrupacion 04.- GASTOS/INGRESOS FINANCIEROS================================
        if(e.data.key == 'a.- PRODUCTOS FINANCIEROS'){
          this.totalesGIF.totalPFER = e.summaryCells[7][0].value;
          this.totalesGIF.totalPFEP = e.summaryCells[8][0].value;
          this.totalesGIF.totalPFED = e.summaryCells[9][0].value;
          this.totalesGIF.totalPFFR = e.summaryCells[12][0].value;
          this.totalesGIF.totalPFFP = e.summaryCells[13][0].value;
          this.totalesGIF.totalPFFD = e.summaryCells[14][0].value;
          this.totalesGIF.totalPFMR = e.summaryCells[17][0].value;
          this.totalesGIF.totalPFMP = e.summaryCells[18][0].value;
          this.totalesGIF.totalPFMD = e.summaryCells[19][0].value;
          this.totalesGIF.totalPFAR = e.summaryCells[22][0].value;
          this.totalesGIF.totalPFAP = e.summaryCells[23][0].value;
          this.totalesGIF.totalPFAD = e.summaryCells[24][0].value;
          this.totalesGIF.totalPFMYR = e.summaryCells[27][0].value;
          this.totalesGIF.totalPFMYP = e.summaryCells[28][0].value;
          this.totalesGIF.totalPFMYD = e.summaryCells[29][0].value;
          this.totalesGIF.totalPFJR = e.summaryCells[32][0].value;
          this.totalesGIF.totalPFJP = e.summaryCells[33][0].value;
          this.totalesGIF.totalPFJD = e.summaryCells[34][0].value;
          this.totalesGIF.totalPFJLR = e.summaryCells[37][0].value;
          this.totalesGIF.totalPFJLP = e.summaryCells[38][0].value;
          this.totalesGIF.totalPFJLD = e.summaryCells[39][0].value;
          this.totalesGIF.totalPFAGR = e.summaryCells[42][0].value;
          this.totalesGIF.totalPFAGP = e.summaryCells[43][0].value;
          this.totalesGIF.totalPFAGD = e.summaryCells[44][0].value;
          this.totalesGIF.totalPFSR = e.summaryCells[47][0].value;
          this.totalesGIF.totalPFSP = e.summaryCells[48][0].value;
          this.totalesGIF.totalPFSD = e.summaryCells[49][0].value;
          this.totalesGIF.totalPFOR = e.summaryCells[52][0].value;
          this.totalesGIF.totalPFOP = e.summaryCells[53][0].value;
          this.totalesGIF.totalPFOD = e.summaryCells[54][0].value;
          this.totalesGIF.totalPFNR = e.summaryCells[57][0].value;
          this.totalesGIF.totalPFNP = e.summaryCells[58][0].value;
          this.totalesGIF.totalPFND = e.summaryCells[59][0].value;
          this.totalesGIF.totalPFDR = e.summaryCells[62][0].value;
          this.totalesGIF.totalPFDP = e.summaryCells[63][0].value;
          this.totalesGIF.totalPFDD = e.summaryCells[64][0].value;
          this.totalesGIF.totalPFACR = e.summaryCells[67][0].value;
          this.totalesGIF.totalPFACP = e.summaryCells[68][0].value;
          this.totalesGIF.totalPFACD = e.summaryCells[69][0].value;
        }

        if(e.data.key == 'b.- GASTOS FINANCIEROS'){
          this.totalesGIF.totalGFER = e.summaryCells[7][0].value;
          this.totalesGIF.totalGFEP = e.summaryCells[8][0].value
          this.totalesGIF.totalGFED = e.summaryCells[9][0].value
          this.totalesGIF.totalGFFR = e.summaryCells[12][0].value
          this.totalesGIF.totalGFFP = e.summaryCells[13][0].value
          this.totalesGIF.totalGFFD = e.summaryCells[14][0].value
          this.totalesGIF.totalGFMR = e.summaryCells[17][0].value
          this.totalesGIF.totalGFMP = e.summaryCells[18][0].value
          this.totalesGIF.totalGFMD = e.summaryCells[19][0].value
          this.totalesGIF.totalGFAR = e.summaryCells[22][0].value
          this.totalesGIF.totalGFAP = e.summaryCells[23][0].value
          this.totalesGIF.totalGFAD = e.summaryCells[24][0].value
          this.totalesGIF.totalGFMYR = e.summaryCells[27][0].value
          this.totalesGIF.totalGFMYP = e.summaryCells[28][0].value
          this.totalesGIF.totalGFMYD = e.summaryCells[29][0].value
          this.totalesGIF.totalGFJR = e.summaryCells[32][0].value
          this.totalesGIF.totalGFJP = e.summaryCells[33][0].value
          this.totalesGIF.totalGFJD = e.summaryCells[34][0].value
          this.totalesGIF.totalGFJLR = e.summaryCells[37][0].value
          this.totalesGIF.totalGFJLP = e.summaryCells[38][0].value
          this.totalesGIF.totalGFJLD = e.summaryCells[39][0].value
          this.totalesGIF.totalGFAGR = e.summaryCells[42][0].value
          this.totalesGIF.totalGFAGP = e.summaryCells[43][0].value
          this.totalesGIF.totalGFAGD = e.summaryCells[44][0].value
          this.totalesGIF.totalGFSR = e.summaryCells[47][0].value
          this.totalesGIF.totalGFSP = e.summaryCells[48][0].value
          this.totalesGIF.totalGFSD = e.summaryCells[49][0].value
          this.totalesGIF.totalGFOR = e.summaryCells[52][0].value
          this.totalesGIF.totalGFOP = e.summaryCells[53][0].value
          this.totalesGIF.totalGFOD = e.summaryCells[54][0].value
          this.totalesGIF.totalGFNR = e.summaryCells[57][0].value
          this.totalesGIF.totalGFNP = e.summaryCells[58][0].value
          this.totalesGIF.totalGFND = e.summaryCells[59][0].value
          this.totalesGIF.totalGFDR = e.summaryCells[62][0].value
          this.totalesGIF.totalGFDP = e.summaryCells[63][0].value
          this.totalesGIF.totalGFDD = e.summaryCells[64][0].value
          this.totalesGIF.totalGFACR = e.summaryCells[67][0].value
          this.totalesGIF.totalGFACP = e.summaryCells[68][0].value
          this.totalesGIF.totalGFACD = e.summaryCells[69][0].value

          this.totalesGIF.totalesGIFER = this.totalesGIF.totalGFER - this.totalesGIF.totalPFER;
          this.totalesGIF.totalesGIFEP = this.totalesGIF.totalGFEP -this.totalesGIF.totalPFEP;
          this.totalesGIF.totalesGIFED = this.totalesGIF.totalGFED -this.totalesGIF.totalPFED;
          this.totalesGIF.totalesGIFFR = this.totalesGIF.totalGFFR -this.totalesGIF.totalPFFR;
          this.totalesGIF.totalesGIFFP = this.totalesGIF.totalGFFP -this.totalesGIF.totalPFFP;
          this.totalesGIF.totalesGIFFD = this.totalesGIF.totalGFFD -this.totalesGIF.totalPFFD;
          this.totalesGIF.totalesGIFMR = this.totalesGIF.totalGFMR -this.totalesGIF.totalPFMR;
          this.totalesGIF.totalesGIFMP = this.totalesGIF.totalGFMP -this.totalesGIF.totalPFMP;
          this.totalesGIF.totalesGIFMD = this.totalesGIF.totalGFMD -this.totalesGIF.totalPFMD;
          this.totalesGIF.totalesGIFAR = this.totalesGIF.totalGFAR -this.totalesGIF.totalPFAR;
          this.totalesGIF.totalesGIFAP = this.totalesGIF.totalGFAP -this.totalesGIF.totalPFAP;
          this.totalesGIF.totalesGIFAD = this.totalesGIF.totalGFAD -this.totalesGIF.totalPFAD;
          this.totalesGIF.totalesGIFMYR = this.totalesGIF.totalGFMYR -this.totalesGIF.totalPFMYR;
          this.totalesGIF.totalesGIFMYP = this.totalesGIF.totalGFMYP -this.totalesGIF.totalPFMYP;
          this.totalesGIF.totalesGIFMYD = this.totalesGIF.totalGFMYD -this.totalesGIF.totalPFMYD;
          this.totalesGIF.totalesGIFJR = this.totalesGIF.totalGFJR -this.totalesGIF.totalPFJR;
          this.totalesGIF.totalesGIFJP = this.totalesGIF.totalGFJP -this.totalesGIF.totalPFJP;
          this.totalesGIF.totalesGIFJD = this.totalesGIF.totalGFJD -this.totalesGIF.totalPFJD;
          this.totalesGIF.totalesGIFJLR = this.totalesGIF.totalGFJLR -this.totalesGIF.totalPFJLR;
          this.totalesGIF.totalesGIFJLP = this.totalesGIF.totalGFJLP -this.totalesGIF.totalPFJLP;
          this.totalesGIF.totalesGIFJLD = this.totalesGIF.totalGFJLD -this.totalesGIF.totalPFJLD;
          this.totalesGIF.totalesGIFAGR = this.totalesGIF.totalGFAGR -this.totalesGIF.totalPFAGR;
          this.totalesGIF.totalesGIFAGP = this.totalesGIF.totalGFAGP -this.totalesGIF.totalPFAGP;
          this.totalesGIF.totalesGIFAGD = this.totalesGIF.totalGFAGD -this.totalesGIF.totalPFAGD;
          this.totalesGIF.totalesGIFSR = this.totalesGIF.totalGFSR -this.totalesGIF.totalPFSR;
          this.totalesGIF.totalesGIFSP = this.totalesGIF.totalGFSP -this.totalesGIF.totalPFSP;
          this.totalesGIF.totalesGIFSD = this.totalesGIF.totalGFSD -this.totalesGIF.totalPFSD;
          this.totalesGIF.totalesGIFOR = this.totalesGIF.totalGFOR -this.totalesGIF.totalPFOR;
          this.totalesGIF.totalesGIFOP = this.totalesGIF.totalGFOP -this.totalesGIF.totalPFOP;
          this.totalesGIF.totalesGIFOD = this.totalesGIF.totalGFOD -this.totalesGIF.totalPFOD;
          this.totalesGIF.totalesGIFNR = this.totalesGIF.totalGFNR -this.totalesGIF.totalPFNR;
          this.totalesGIF.totalesGIFNP = this.totalesGIF.totalGFNP -this.totalesGIF.totalPFNP;
          this.totalesGIF.totalesGIFND = this.totalesGIF.totalGFND -this.totalesGIF.totalPFND;
          this.totalesGIF.totalesGIFDR = this.totalesGIF.totalGFDR -this.totalesGIF.totalPFDR;
          this.totalesGIF.totalesGIFDP = this.totalesGIF.totalGFDP -this.totalesGIF.totalPFDP;
          this.totalesGIF.totalesGIFDD = this.totalesGIF.totalGFDD -this.totalesGIF.totalPFDD;
          this.totalesGIF.totalesGIFACR = this.totalesGIF.totalGFACR -this.totalesGIF.totalPFACR;
          this.totalesGIF.totalesGIFACP = this.totalesGIF.totalGFACP -this.totalesGIF.totalPFACP;
          this.totalesGIF.totalesGIFACD = this.totalesGIF.totalGFACD -this.totalesGIF.totalPFACD;
        }
      }

      if (e.groupIndex === 3) {
        e.summaryCells[5][0].displayFormat = e.key[3];


        if(e.data.key == 'a) VOLUMEN TRANSPORTADO'){
          e.cells.forEach((c: any) => {
          
            if(c.summaryItems.length !== 0 ){
              c.summaryItems = [];
              // c.cellElement.style.background = "#dcdcdc";
            }
          })
        }

        if(e.data.key == 'b) KILÓMETROS'){
          e.cells.forEach((c: any) => {
          
            if(c.summaryItems.length !== 0 ){
              c.summaryItems = [];
              // c.cellElement.style.background = "#dcdcdc";
            }
          })
        }

        if(e.data.key == 'c) VIAJES REALIZADOS'){
          e.cells.forEach((c: any) => {
          
            if(c.summaryItems.length !== 0 ){
              c.summaryItems = [];
              // c.cellElement.style.background = "#dcdcdc";
            }
          })
        }

        //=================================Resta de la agrupacion Otros gastos/ingresos ordinarios=========================
        //========================Sacando los valores para la operacion============================================
        if(e.data.key == '401-01-000 INGRESOS ORDINARIOS'){
          this.totalesOGIO.totalIOER = e.summaryCells[7][0].value;
          this.totalesOGIO.totalIOEP = e.summaryCells[8][0].value;
          this.totalesOGIO.totalIOED = e.summaryCells[9][0].value;
          this.totalesOGIO.totalIOFR = e.summaryCells[12][0].value;
          this.totalesOGIO.totalIOFP = e.summaryCells[13][0].value;
          this.totalesOGIO.totalIOFD = e.summaryCells[14][0].value;
          this.totalesOGIO.totalIOMR = e.summaryCells[17][0].value;
          this.totalesOGIO.totalIOMP = e.summaryCells[18][0].value;
          this.totalesOGIO.totalIOMD = e.summaryCells[19][0].value;
          this.totalesOGIO.totalIOAR = e.summaryCells[22][0].value;
          this.totalesOGIO.totalIOAP = e.summaryCells[23][0].value;
          this.totalesOGIO.totalIOAD = e.summaryCells[24][0].value;
          this.totalesOGIO.totalIOMYR = e.summaryCells[27][0].value;
          this.totalesOGIO.totalIOMYP = e.summaryCells[28][0].value;
          this.totalesOGIO.totalIOMYD = e.summaryCells[29][0].value;
          this.totalesOGIO.totalIOJR = e.summaryCells[32][0].value;
          this.totalesOGIO.totalIOJP = e.summaryCells[33][0].value;
          this.totalesOGIO.totalIOJD = e.summaryCells[34][0].value;
          this.totalesOGIO.totalIOJLR = e.summaryCells[37][0].value;
          this.totalesOGIO.totalIOJLP = e.summaryCells[38][0].value;
          this.totalesOGIO.totalIOJLD = e.summaryCells[39][0].value;
          this.totalesOGIO.totalIOAGR = e.summaryCells[42][0].value;
          this.totalesOGIO.totalIOAGP = e.summaryCells[43][0].value;
          this.totalesOGIO.totalIOAGD = e.summaryCells[44][0].value;
          this.totalesOGIO.totalIOSR = e.summaryCells[47][0].value;
          this.totalesOGIO.totalIOSP = e.summaryCells[48][0].value;
          this.totalesOGIO.totalIOSD = e.summaryCells[49][0].value;
          this.totalesOGIO.totalIOOR = e.summaryCells[52][0].value;
          this.totalesOGIO.totalIOOP = e.summaryCells[53][0].value;
          this.totalesOGIO.totalIOOD = e.summaryCells[54][0].value;
          this.totalesOGIO.totalIONR = e.summaryCells[57][0].value;
          this.totalesOGIO.totalIONP = e.summaryCells[58][0].value;
          this.totalesOGIO.totalIOND = e.summaryCells[59][0].value;
          this.totalesOGIO.totalIODR = e.summaryCells[62][0].value;
          this.totalesOGIO.totalIODP = e.summaryCells[63][0].value;
          this.totalesOGIO.totalIODD = e.summaryCells[64][0].value;
          this.totalesOGIO.totalIOACR = e.summaryCells[67][0].value;
          this.totalesOGIO.totalIOACP = e.summaryCells[68][0].value;
          this.totalesOGIO.totalIOACD = e.summaryCells[69][0].value;


        }

        if(e.data.key == '505-01-000 OTROS GASTOS  ORDINARIOS      '){
          this.totalesOGIO.totalOGOER = e.summaryCells[7][0].value;
          this.totalesOGIO.totalOGOEP = e.summaryCells[8][0].value;
          this.totalesOGIO.totalOGOED = e.summaryCells[9][0].value;
          this.totalesOGIO.totalOGOFR = e.summaryCells[12][0].value;
          this.totalesOGIO.totalOGOFP = e.summaryCells[13][0].value;
          this.totalesOGIO.totalOGOFD = e.summaryCells[14][0].value;
          this.totalesOGIO.totalOGOMR = e.summaryCells[17][0].value;
          this.totalesOGIO.totalOGOMP = e.summaryCells[18][0].value;
          this.totalesOGIO.totalOGOMD = e.summaryCells[19][0].value;
          this.totalesOGIO.totalOGOAR = e.summaryCells[22][0].value;
          this.totalesOGIO.totalOGOAP = e.summaryCells[23][0].value;
          this.totalesOGIO.totalOGOAD = e.summaryCells[24][0].value;
          this.totalesOGIO.totalOGOMYR = e.summaryCells[27][0].value;
          this.totalesOGIO.totalOGOMYP = e.summaryCells[28][0].value;
          this.totalesOGIO.totalOGOMYD = e.summaryCells[29][0].value;
          this.totalesOGIO.totalOGOJR = e.summaryCells[32][0].value;
          this.totalesOGIO.totalOGOJP = e.summaryCells[33][0].value;
          this.totalesOGIO.totalOGOJD = e.summaryCells[34][0].value;
          this.totalesOGIO.totalOGOJLR = e.summaryCells[37][0].value;
          this.totalesOGIO.totalOGOJLP = e.summaryCells[38][0].value;
          this.totalesOGIO.totalOGOJLD = e.summaryCells[39][0].value;
          this.totalesOGIO.totalOGOAGR = e.summaryCells[42][0].value;
          this.totalesOGIO.totalOGOAGP = e.summaryCells[43][0].value;
          this.totalesOGIO.totalOGOAGD = e.summaryCells[44][0].value;
          this.totalesOGIO.totalOGOSR = e.summaryCells[47][0].value;
          this.totalesOGIO.totalOGOSP = e.summaryCells[48][0].value;
          this.totalesOGIO.totalOGOSD = e.summaryCells[49][0].value;
          this.totalesOGIO.totalOGOOR = e.summaryCells[52][0].value;
          this.totalesOGIO.totalOGOOP = e.summaryCells[53][0].value;
          this.totalesOGIO.totalOGOOD = e.summaryCells[54][0].value;
          this.totalesOGIO.totalOGONR = e.summaryCells[57][0].value;
          this.totalesOGIO.totalOGONP = e.summaryCells[58][0].value;
          this.totalesOGIO.totalOGOND = e.summaryCells[59][0].value;
          this.totalesOGIO.totalOGODR = e.summaryCells[62][0].value;
          this.totalesOGIO.totalOGODP = e.summaryCells[63][0].value;
          this.totalesOGIO.totalOGODD = e.summaryCells[64][0].value;
          this.totalesOGIO.totalOGOACR = e.summaryCells[67][0].value;
          this.totalesOGIO.totalOGOACP = e.summaryCells[68][0].value;
          this.totalesOGIO.totalOGOACD = e.summaryCells[69][0].value;

          this.totalesOGIO.totalOtrosGIOER = this.totalesOGIO.totalOGOER - this.totalesOGIO.totalIOER;
          this.totalesOGIO.totalOtrosGIOEP = this.totalesOGIO.totalOGOEP - this.totalesOGIO.totalIOEP;
          this.totalesOGIO.totalOtrosGIOED = this.totalesOGIO.totalOGOED - this.totalesOGIO.totalIOED;
          this.totalesOGIO.totalOtrosGIOFR = this.totalesOGIO.totalOGOFR - this.totalesOGIO.totalIOFR;
          this.totalesOGIO.totalOtrosGIOFP = this.totalesOGIO.totalOGOFP - this.totalesOGIO.totalIOFP;
          this.totalesOGIO.totalOtrosGIOFD = this.totalesOGIO.totalOGOFD - this.totalesOGIO.totalIOFD;
          this.totalesOGIO.totalOtrosGIOMR = this.totalesOGIO.totalOGOMR - this.totalesOGIO.totalIOMR;
          this.totalesOGIO.totalOtrosGIOMP = this.totalesOGIO.totalOGOMP - this.totalesOGIO.totalIOMP;
          this.totalesOGIO.totalOtrosGIOMD = this.totalesOGIO.totalOGOMD - this.totalesOGIO.totalIOMD;
          this.totalesOGIO.totalOtrosGIOAR = this.totalesOGIO.totalOGOAR - this.totalesOGIO.totalIOAR;
          this.totalesOGIO.totalOtrosGIOAP = this.totalesOGIO.totalOGOAP - this.totalesOGIO.totalIOAP;
          this.totalesOGIO.totalOtrosGIOAD = this.totalesOGIO.totalOGOAD - this.totalesOGIO.totalIOAD;
          this.totalesOGIO.totalOtrosGIOMYR = this.totalesOGIO.totalOGOMYR - this.totalesOGIO.totalIOMYR;
          this.totalesOGIO.totalOtrosGIOMYP = this.totalesOGIO.totalOGOMYP - this.totalesOGIO.totalIOMYP;
          this.totalesOGIO.totalOtrosGIOMYD = this.totalesOGIO.totalOGOMYD - this.totalesOGIO.totalIOMYD;
          this.totalesOGIO.totalOtrosGIOJR = this.totalesOGIO.totalOGOJR - this.totalesOGIO.totalIOJR;
          this.totalesOGIO.totalOtrosGIOJP = this.totalesOGIO.totalOGOJP - this.totalesOGIO.totalIOJP;
          this.totalesOGIO.totalOtrosGIOJD = this.totalesOGIO.totalOGOJD - this.totalesOGIO.totalIOJD;
          this.totalesOGIO.totalOtrosGIOJLR = this.totalesOGIO.totalOGOJLR - this.totalesOGIO.totalIOJLR;
          this.totalesOGIO.totalOtrosGIOJLP = this.totalesOGIO.totalOGOJLP - this.totalesOGIO.totalIOJLP;
          this.totalesOGIO.totalOtrosGIOJLD = this.totalesOGIO.totalOGOJLD - this.totalesOGIO.totalIOJLD;
          this.totalesOGIO.totalOtrosGIOAGR = this.totalesOGIO.totalOGOAGR - this.totalesOGIO.totalIOAGR;
          this.totalesOGIO.totalOtrosGIOAGP = this.totalesOGIO.totalOGOAGP - this.totalesOGIO.totalIOAGP;
          this.totalesOGIO.totalOtrosGIOAGD = this.totalesOGIO.totalOGOAGD - this.totalesOGIO.totalIOAGD;
          this.totalesOGIO.totalOtrosGIOSR = this.totalesOGIO.totalOGOSR - this.totalesOGIO.totalIOSR;
          this.totalesOGIO.totalOtrosGIOSP = this.totalesOGIO.totalOGOSP - this.totalesOGIO.totalIOSP;
          this.totalesOGIO.totalOtrosGIOSD = this.totalesOGIO.totalOGOSD - this.totalesOGIO.totalIOSD;
          this.totalesOGIO.totalOtrosGIOOR = this.totalesOGIO.totalOGOOR - this.totalesOGIO.totalIOOR;
          this.totalesOGIO.totalOtrosGIOOP = this.totalesOGIO.totalOGOOP - this.totalesOGIO.totalIOOP;
          this.totalesOGIO.totalOtrosGIOOD = this.totalesOGIO.totalOGOOD - this.totalesOGIO.totalIOOD;
          this.totalesOGIO.totalOtrosGIONR = this.totalesOGIO.totalOGONR - this.totalesOGIO.totalIONR;
          this.totalesOGIO.totalOtrosGIONP = this.totalesOGIO.totalOGONP - this.totalesOGIO.totalIONP;
          this.totalesOGIO.totalOtrosGIOND = this.totalesOGIO.totalOGOND - this.totalesOGIO.totalIOND;
          this.totalesOGIO.totalOtrosGIODR = this.totalesOGIO.totalOGODR - this.totalesOGIO.totalIODR;
          this.totalesOGIO.totalOtrosGIODP = this.totalesOGIO.totalOGODP - this.totalesOGIO.totalIODP;
          this.totalesOGIO.totalOtrosGIODD = this.totalesOGIO.totalOGODD - this.totalesOGIO.totalIODD;
          this.totalesOGIO.totalOtrosGIOACR = this.totalesOGIO.totalOGOAR - this.totalesOGIO.totalIOACR;
          this.totalesOGIO.totalOtrosGIOACP = this.totalesOGIO.totalOGOAP - this.totalesOGIO.totalIOACP;
          this.totalesOGIO.totalOtrosGIOACD = this.totalesOGIO.totalOGOAD - this.totalesOGIO.totalIOACD;
        }
//=================================Resta de la agrupacion Otros Gastos/Ingresos Extraordinario=========================
        //=========================Sacando los valores para la operaion 
        if(e.data.key == '405-01-000 OTROS ING OPER EXTRAORDINARIO'){
          this.totalesOtros.totalOIOEER = e.summaryCells[7][0].value;
          this.totalesOtros.totalOIOEEP = e.summaryCells[8][0].value;
          this.totalesOtros.totalOIOEED = e.summaryCells[9][0].value;
          this.totalesOtros.totalOIOEFR = e.summaryCells[12][0].value;
          this.totalesOtros.totalOIOEFP = e.summaryCells[13][0].value;
          this.totalesOtros.totalOIOEFD = e.summaryCells[14][0].value;
          this.totalesOtros.totalOIOEMR = e.summaryCells[17][0].value;
          this.totalesOtros.totalOIOEMP = e.summaryCells[18][0].value;
          this.totalesOtros.totalOIOEMD = e.summaryCells[19][0].value;
          this.totalesOtros.totalOIOEAR = e.summaryCells[22][0].value;
          this.totalesOtros.totalOIOEAP = e.summaryCells[23][0].value;
          this.totalesOtros.totalOIOEAD = e.summaryCells[24][0].value;
          this.totalesOtros.totalOIOEMYR = e.summaryCells[27][0].value;
          this.totalesOtros.totalOIOEMYP = e.summaryCells[28][0].value;
          this.totalesOtros.totalOIOEMYD = e.summaryCells[29][0].value;
          this.totalesOtros.totalOIOEJR = e.summaryCells[32][0].value;
          this.totalesOtros.totalOIOEJP = e.summaryCells[33][0].value;
          this.totalesOtros.totalOIOEJD = e.summaryCells[34][0].value;
          this.totalesOtros.totalOIOEJLR = e.summaryCells[37][0].value;
          this.totalesOtros.totalOIOEJLP = e.summaryCells[38][0].value;
          this.totalesOtros.totalOIOEJLD = e.summaryCells[39][0].value;
          this.totalesOtros.totalOIOEAGR = e.summaryCells[42][0].value;
          this.totalesOtros.totalOIOEAGP = e.summaryCells[43][0].value;
          this.totalesOtros.totalOIOEAGD = e.summaryCells[44][0].value;
          this.totalesOtros.totalOIOESR = e.summaryCells[47][0].value;
          this.totalesOtros.totalOIOESP = e.summaryCells[48][0].value;
          this.totalesOtros.totalOIOESD = e.summaryCells[49][0].value;
          this.totalesOtros.totalOIOEOR = e.summaryCells[52][0].value;
          this.totalesOtros.totalOIOEOP = e.summaryCells[53][0].value;
          this.totalesOtros.totalOIOEOD = e.summaryCells[54][0].value;
          this.totalesOtros.totalOIOENR = e.summaryCells[57][0].value;
          this.totalesOtros.totalOIOENP = e.summaryCells[58][0].value;
          this.totalesOtros.totalOIOEND = e.summaryCells[59][0].value;
          this.totalesOtros.totalOIOEDR = e.summaryCells[62][0].value;
          this.totalesOtros.totalOIOEDP = e.summaryCells[63][0].value;
          this.totalesOtros.totalOIOEDD = e.summaryCells[64][0].value;
          this.totalesOtros.totalOIOEACR = e.summaryCells[67][0].value;
          this.totalesOtros.totalOIOEACP = e.summaryCells[68][0].value;
          this.totalesOtros.totalOIOEACD = e.summaryCells[69][0].value;
        }
        if(e.data.key == '507-01-000 OTROS GASTOS OPER EXTRAORDINARIOS  '){
          this.totalesOtros.totalOGOEER = e.summaryCells[7][0].value;
          this.totalesOtros.totalOGOEEP = e.summaryCells[8][0].value;
          this.totalesOtros.totalOGOEED = e.summaryCells[9][0].value;
          this.totalesOtros.totalOGOEFR = e.summaryCells[12][0].value;
          this.totalesOtros.totalOGOEFP = e.summaryCells[13][0].value;
          this.totalesOtros.totalOGOEFD = e.summaryCells[14][0].value;
          this.totalesOtros.totalOGOEMR = e.summaryCells[17][0].value;
          this.totalesOtros.totalOGOEMP = e.summaryCells[18][0].value;
          this.totalesOtros.totalOGOEMD = e.summaryCells[19][0].value;
          this.totalesOtros.totalOGOEAR = e.summaryCells[22][0].value;
          this.totalesOtros.totalOGOEAP = e.summaryCells[23][0].value;
          this.totalesOtros.totalOGOEAD = e.summaryCells[24][0].value;
          this.totalesOtros.totalOGOEMYR = e.summaryCells[27][0].value;
          this.totalesOtros.totalOGOEMYP = e.summaryCells[28][0].value;
          this.totalesOtros.totalOGOEMYD = e.summaryCells[29][0].value;
          this.totalesOtros.totalOGOEJR = e.summaryCells[32][0].value;
          this.totalesOtros.totalOGOEJP = e.summaryCells[33][0].value;
          this.totalesOtros.totalOGOEJD = e.summaryCells[34][0].value;
          this.totalesOtros.totalOGOEJLR = e.summaryCells[37][0].value;
          this.totalesOtros.totalOGOEJLP = e.summaryCells[38][0].value;
          this.totalesOtros.totalOGOEJLD = e.summaryCells[39][0].value;
          this.totalesOtros.totalOGOEAGR = e.summaryCells[42][0].value;
          this.totalesOtros.totalOGOEAGP = e.summaryCells[43][0].value;
          this.totalesOtros.totalOGOEAGD = e.summaryCells[44][0].value;
          this.totalesOtros.totalOGOESR = e.summaryCells[47][0].value;
          this.totalesOtros.totalOGOESP = e.summaryCells[48][0].value;
          this.totalesOtros.totalOGOESD = e.summaryCells[49][0].value;
          this.totalesOtros.totalOGOEOR = e.summaryCells[52][0].value;
          this.totalesOtros.totalOGOEOP = e.summaryCells[53][0].value;
          this.totalesOtros.totalOGOEOD = e.summaryCells[54][0].value;
          this.totalesOtros.totalOGOENR = e.summaryCells[57][0].value;
          this.totalesOtros.totalOGOENP = e.summaryCells[58][0].value;
          this.totalesOtros.totalOGOEND = e.summaryCells[59][0].value;
          this.totalesOtros.totalOGOEDR = e.summaryCells[62][0].value;
          this.totalesOtros.totalOGOEDP = e.summaryCells[63][0].value;
          this.totalesOtros.totalOGOEDD = e.summaryCells[64][0].value;
          this.totalesOtros.totalOGOEACR = e.summaryCells[67][0].value;
          this.totalesOtros.totalOGOEACP = e.summaryCells[68][0].value;
          this.totalesOtros.totalOGOEACD = e.summaryCells[69][0].value;

          this.totalesOtros.totalesOtrosER = this.totalesOtros.totalOGOEER - this.totalesOtros.totalOIOEER;
          this.totalesOtros.totalesOtrosEP = this.totalesOtros.totalOGOEEP - this.totalesOtros.totalOIOEEP;
          this.totalesOtros.totalesOtrosED = this.totalesOtros.totalOGOEED - this.totalesOtros.totalOIOEED;
          this.totalesOtros.totalesOtrosFR = this.totalesOtros.totalOGOEFR - this.totalesOtros.totalOIOEFR;
          this.totalesOtros.totalesOtrosFP = this.totalesOtros.totalOGOEFP - this.totalesOtros.totalOIOEFP;
          this.totalesOtros.totalesOtrosFD = this.totalesOtros.totalOGOEFD - this.totalesOtros.totalOIOEFD;
          this.totalesOtros.totalesOtrosMR = this.totalesOtros.totalOGOEMR - this.totalesOtros.totalOIOEMR;
          this.totalesOtros.totalesOtrosMP = this.totalesOtros.totalOGOEMP - this.totalesOtros.totalOIOEMP;
          this.totalesOtros.totalesOtrosMD = this.totalesOtros.totalOGOEMD - this.totalesOtros.totalOIOEMD;
          this.totalesOtros.totalesOtrosAR = this.totalesOtros.totalOGOEAR - this.totalesOtros.totalOIOEAR;
          this.totalesOtros.totalesOtrosAP = this.totalesOtros.totalOGOEAP - this.totalesOtros.totalOIOEAP;
          this.totalesOtros.totalesOtrosAD = this.totalesOtros.totalOGOEAD - this.totalesOtros.totalOIOEAD;
          this.totalesOtros.totalesOtrosMYR = this.totalesOtros.totalOGOEMYR - this.totalesOtros.totalOIOEMYR;
          this.totalesOtros.totalesOtrosMYP = this.totalesOtros.totalOGOEMYP - this.totalesOtros.totalOIOEMYP;
          this.totalesOtros.totalesOtrosMYD = this.totalesOtros.totalOGOEMYD - this.totalesOtros.totalOIOEMYD;
          this.totalesOtros.totalesOtrosJR = this.totalesOtros.totalOGOEJR - this.totalesOtros.totalOIOEJR;
          this.totalesOtros.totalesOtrosJP = this.totalesOtros.totalOGOEJP - this.totalesOtros.totalOIOEJP;
          this.totalesOtros.totalesOtrosJD = this.totalesOtros.totalOGOEJD - this.totalesOtros.totalOIOEJD;
          this.totalesOtros.totalesOtrosJLR = this.totalesOtros.totalOGOEJLR - this.totalesOtros.totalOIOEJLR;
          this.totalesOtros.totalesOtrosJLP = this.totalesOtros.totalOGOEJLP - this.totalesOtros.totalOIOEJLP;
          this.totalesOtros.totalesOtrosJLD = this.totalesOtros.totalOGOEJLD - this.totalesOtros.totalOIOEJLD;
          this.totalesOtros.totalesOtrosAGR = this.totalesOtros.totalOGOEAGR - this.totalesOtros.totalOIOEAGR;
          this.totalesOtros.totalesOtrosAGP = this.totalesOtros.totalOGOEAGP - this.totalesOtros.totalOIOEAGP;
          this.totalesOtros.totalesOtrosAGD = this.totalesOtros.totalOGOEAGD - this.totalesOtros.totalOIOEAGD;
          this.totalesOtros.totalesOtrosSR = this.totalesOtros.totalOGOESR - this.totalesOtros.totalOIOESR;
          this.totalesOtros.totalesOtrosSP = this.totalesOtros.totalOGOESP - this.totalesOtros.totalOIOESP;
          this.totalesOtros.totalesOtrosSD = this.totalesOtros.totalOGOESD - this.totalesOtros.totalOIOESD;
          this.totalesOtros.totalesOtrosOR = this.totalesOtros.totalOGOEOR - this.totalesOtros.totalOIOEOR;
          this.totalesOtros.totalesOtrosOP = this.totalesOtros.totalOGOEOP - this.totalesOtros.totalOIOEOP;
          this.totalesOtros.totalesOtrosOD = this.totalesOtros.totalOGOEOD - this.totalesOtros.totalOIOEOD;
          this.totalesOtros.totalesOtrosNR = this.totalesOtros.totalOGOENR - this.totalesOtros.totalOIOENR;
          this.totalesOtros.totalesOtrosNP = this.totalesOtros.totalOGOENP - this.totalesOtros.totalOIOENP;
          this.totalesOtros.totalesOtrosND = this.totalesOtros.totalOGOEND - this.totalesOtros.totalOIOEND;
          this.totalesOtros.totalesOtrosDR = this.totalesOtros.totalOGOEDR - this.totalesOtros.totalOIOEDR;
          this.totalesOtros.totalesOtrosDP = this.totalesOtros.totalOGOEDP - this.totalesOtros.totalOIOEDP;
          this.totalesOtros.totalesOtrosDD = this.totalesOtros.totalOGOEDD - this.totalesOtros.totalOIOEDD;
          this.totalesOtros.totalesOtrosACR = this.totalesOtros.totalOGOEACR - this.totalesOtros.totalOIOEACR;
          this.totalesOtros.totalesOtrosACP = this.totalesOtros.totalOGOEACP - this.totalesOtros.totalOIOEACP;
          this.totalesOtros.totalesOtrosACD = this.totalesOtros.totalOGOEACD - this.totalesOtros.totalOIOEACD;
        }
      }

      if (e.groupIndex === 4) {
        e.summaryCells[5][0].displayFormat = e.key[4];
      }

      //=====Resta Entre Fletes y Costos============================================
      if(e.groupIndex == 0 && e.key[0]){
        e.summaryCells[7][0].value = this.totales.totalER;
        e.summaryCells[8][0].value = this.totales.totalEP;
        e.summaryCells[9][0].value = this.totales.totalED;
        e.summaryCells[12][0].value = this.totales.totalFR;
        e.summaryCells[13][0].value = this.totales.totalFP;
        e.summaryCells[14][0].value = this.totales.totalFD;
        e.summaryCells[17][0].value = this.totales.totalMR;
        e.summaryCells[18][0].value = this.totales.totalMP;
        e.summaryCells[19][0].value = this.totales.totalMD;
        e.summaryCells[22][0].value = this.totales.totalAR;
        e.summaryCells[23][0].value = this.totales.totalAP;
        e.summaryCells[24][0].value = this.totales.totalAD;
        e.summaryCells[27][0].value = this.totales.totalMYR;
        e.summaryCells[28][0].value = this.totales.totalMYP;
        e.summaryCells[29][0].value = this.totales.totalMYD;
        e.summaryCells[32][0].value = this.totales.totalJR;
        e.summaryCells[33][0].value = this.totales.totalJP;
        e.summaryCells[34][0].value = this.totales.totalJD;
        e.summaryCells[37][0].value = this.totales.totalJLR;
        e.summaryCells[38][0].value = this.totales.totalJLP;
        e.summaryCells[39][0].value = this.totales.totalJLD;
        e.summaryCells[42][0].value = this.totales.totalAGR;
        e.summaryCells[43][0].value = this.totales.totalAGP;
        e.summaryCells[44][0].value = this.totales.totalAGD;
        e.summaryCells[47][0].value = this.totales.totalSR;
        e.summaryCells[48][0].value = this.totales.totalSP;
        e.summaryCells[49][0].value = this.totales.totalSD;
        e.summaryCells[52][0].value = this.totales.totalOR;
        e.summaryCells[53][0].value = this.totales.totalOP;
        e.summaryCells[54][0].value = this.totales.totalOD;
        e.summaryCells[57][0].value = this.totales.totalNR;
        e.summaryCells[58][0].value = this.totales.totalNP;
        e.summaryCells[59][0].value = this.totales.totalND;
        e.summaryCells[62][0].value = this.totales.totalDR;
        e.summaryCells[63][0].value = this.totales.totalDP;
        e.summaryCells[64][0].value = this.totales.totalDD;
        e.summaryCells[67][0].value = this.totales.totalACR;
        e.summaryCells[68][0].value = this.totales.totalACP;
        e.summaryCells[69][0].value = this.totales.totalACD;

        // if(e.summaryCells[7][0].value !== undefined){
        //    this.expandGroup = false
        // }
      }

      // //no se ocupa es por el momento
      // if(e.groupIndex == 1 && e.data.key == '01.- UTILIDAD BRUTA'){
      //   e.summaryCells[7][0].value = this.totalesOperacion.totalOperacionER;
      //   e.summaryCells[8][0].value = this.totalesOperacion.totalOperacionEP;
      //   e.summaryCells[9][0].value = this.totalesOperacion.totalOperacionED;
      //   e.summaryCells[12][0].value = this.totalesOperacion.totalOperacionFR;
      //   e.summaryCells[13][0].value = this.totalesOperacion.totalOperacionFP;
      //   e.summaryCells[14][0].value = this.totalesOperacion.totalOperacionFD;
      //   e.summaryCells[17][0].value = this.totalesOperacion.totalOperacionMR;
      //   e.summaryCells[18][0].value = this.totalesOperacion.totalOperacionMP;
      //   e.summaryCells[19][0].value = this.totalesOperacion.totalOperacionMD;
      //   e.summaryCells[22][0].value = this.totalesOperacion.totalOperacionAR;
      //   e.summaryCells[23][0].value = this.totalesOperacion.totalOperacionAP;
      //   e.summaryCells[24][0].value = this.totalesOperacion.totalOperacionAD;
      //   e.summaryCells[27][0].value = this.totalesOperacion.totalOperacionMYR;
      //   e.summaryCells[28][0].value = this.totalesOperacion.totalOperacionMYP;
      //   e.summaryCells[29][0].value = this.totalesOperacion.totalOperacionMYD;
      //   e.summaryCells[32][0].value = this.totalesOperacion.totalOperacionJR;
      //   e.summaryCells[33][0].value = this.totalesOperacion.totalOperacionJP;
      //   e.summaryCells[34][0].value = this.totalesOperacion.totalOperacionJD;
      //   e.summaryCells[37][0].value = this.totalesOperacion.totalOperacionJLR;
      //   e.summaryCells[38][0].value = this.totalesOperacion.totalOperacionJLP;
      //   e.summaryCells[39][0].value = this.totalesOperacion.totalOperacionJLD;
      //   e.summaryCells[42][0].value = this.totalesOperacion.totalOperacionAGR;
      //   e.summaryCells[43][0].value = this.totalesOperacion.totalOperacionAGP;
      //   e.summaryCells[44][0].value = this.totalesOperacion.totalOperacionAGD;
      //   e.summaryCells[47][0].value = this.totalesOperacion.totalOperacionSR;
      //   e.summaryCells[48][0].value = this.totalesOperacion.totalOperacionSP;
      //   e.summaryCells[49][0].value = this.totalesOperacion.totalOperacionSD;
      //   e.summaryCells[52][0].value = this.totalesOperacion.totalOperacionOR;
      //   e.summaryCells[53][0].value = this.totalesOperacion.totalOperacionOP;
      //   e.summaryCells[54][0].value = this.totalesOperacion.totalOperacionOD;
      //   e.summaryCells[57][0].value = this.totalesOperacion.totalOperacionNR;
      //   e.summaryCells[58][0].value = this.totalesOperacion.totalOperacionNP;
      //   e.summaryCells[59][0].value = this.totalesOperacion.totalOperacionND;
      //   e.summaryCells[62][0].value = this.totalesOperacion.totalOperacionDR;
      //   e.summaryCells[63][0].value = this.totalesOperacion.totalOperacionDP;
      //   e.summaryCells[64][0].value = this.totalesOperacion.totalOperacionDD;
      //   e.summaryCells[67][0].value = this.totalesOperacion.totalOperacionACR;
      //   e.summaryCells[68][0].value = this.totalesOperacion.totalOperacionACP;
      //   e.summaryCells[69][0].value = this.totalesOperacion.totalOperacionACD;


      // }
      // //no se ocupa es por el momento
      // if(e.groupIndex == 1 && e.data.key == '02.- Total Otros Gastos de Operacion'){
      //   e.summaryCells[7][0].value = this.totalesOtrosGO.totalOGOperacionER;
      //   e.summaryCells[8][0].value = this.totalesOtrosGO.totalOGOperacionEP;
      //   e.summaryCells[9][0].value = this.totalesOtrosGO.totalOGOperacionED;
      //   e.summaryCells[12][0].value = this.totalesOtrosGO.totalOGOperacionFR;
      //   e.summaryCells[13][0].value = this.totalesOtrosGO.totalOGOperacionFP;
      //   e.summaryCells[14][0].value = this.totalesOtrosGO.totalOGOperacionFD;
      //   e.summaryCells[17][0].value = this.totalesOtrosGO.totalOGOperacionMR;
      //   e.summaryCells[18][0].value = this.totalesOtrosGO.totalOGOperacionMP;
      //   e.summaryCells[19][0].value = this.totalesOtrosGO.totalOGOperacionMD;
      //   e.summaryCells[22][0].value = this.totalesOtrosGO.totalOGOperacionAR;
      //   e.summaryCells[23][0].value = this.totalesOtrosGO.totalOGOperacionAP;
      //   e.summaryCells[24][0].value = this.totalesOtrosGO.totalOGOperacionAD;
      //   e.summaryCells[27][0].value = this.totalesOtrosGO.totalOGOperacionMYR;
      //   e.summaryCells[28][0].value = this.totalesOtrosGO.totalOGOperacionMYP;
      //   e.summaryCells[29][0].value = this.totalesOtrosGO.totalOGOperacionMYD;
      //   e.summaryCells[32][0].value = this.totalesOtrosGO.totalOGOperacionJR;
      //   e.summaryCells[33][0].value = this.totalesOtrosGO.totalOGOperacionJP;
      //   e.summaryCells[34][0].value = this.totalesOtrosGO.totalOGOperacionJD;
      //   e.summaryCells[37][0].value = this.totalesOtrosGO.totalOGOperacionJLR;
      //   e.summaryCells[38][0].value = this.totalesOtrosGO.totalOGOperacionJLP;
      //   e.summaryCells[39][0].value = this.totalesOtrosGO.totalOGOperacionJLD;
      //   e.summaryCells[42][0].value = this.totalesOtrosGO.totalOGOperacionAGR;
      //   e.summaryCells[43][0].value = this.totalesOtrosGO.totalOGOperacionAGP;
      //   e.summaryCells[44][0].value = this.totalesOtrosGO.totalOGOperacionAGD;
      //   e.summaryCells[47][0].value = this.totalesOtrosGO.totalOGOperacionSR;
      //   e.summaryCells[48][0].value = this.totalesOtrosGO.totalOGOperacionSP;
      //   e.summaryCells[49][0].value = this.totalesOtrosGO.totalOGOperacionSD;
      //   e.summaryCells[52][0].value = this.totalesOtrosGO.totalOGOperacionOR;
      //   e.summaryCells[53][0].value = this.totalesOtrosGO.totalOGOperacionOP;
      //   e.summaryCells[54][0].value = this.totalesOtrosGO.totalOGOperacionOD;
      //   e.summaryCells[57][0].value = this.totalesOtrosGO.totalOGOperacionNR;
      //   e.summaryCells[58][0].value = this.totalesOtrosGO.totalOGOperacionNP;
      //   e.summaryCells[59][0].value = this.totalesOtrosGO.totalOGOperacionND;
      //   e.summaryCells[62][0].value = this.totalesOtrosGO.totalOGOperacionDR;
      //   e.summaryCells[63][0].value = this.totalesOtrosGO.totalOGOperacionDP;
      //   e.summaryCells[64][0].value = this.totalesOtrosGO.totalOGOperacionDD;
      //   e.summaryCells[67][0].value = this.totalesOtrosGO.totalOGOperacionACR;
      //   e.summaryCells[68][0].value = this.totalesOtrosGO.totalOGOperacionACP;
      //   e.summaryCells[69][0].value = this.totalesOtrosGO.totalOGOperacionACD;

      // }

      if(e.groupIndex == 1 && e.data.key == '01.- OPERACION'){
        e.summaryCells[7][0].value = this.totales01O.total01OperacionER;
        e.summaryCells[8][0].value = this.totales01O.total01OperacionEP;
        e.summaryCells[9][0].value = this.totales01O.total01OperacionED;
        e.summaryCells[12][0].value = this.totales01O.total01OperacionFR;
        e.summaryCells[13][0].value = this.totales01O.total01OperacionFP;
        e.summaryCells[14][0].value = this.totales01O.total01OperacionFD;
        e.summaryCells[17][0].value = this.totales01O.total01OperacionMR;
        e.summaryCells[18][0].value = this.totales01O.total01OperacionMP;
        e.summaryCells[19][0].value = this.totales01O.total01OperacionMD;
        e.summaryCells[22][0].value = this.totales01O.total01OperacionAR;
        e.summaryCells[23][0].value = this.totales01O.total01OperacionAP;
        e.summaryCells[24][0].value = this.totales01O.total01OperacionAD;
        e.summaryCells[27][0].value = this.totales01O.total01OperacionMYR;
        e.summaryCells[28][0].value = this.totales01O.total01OperacionMYP;
        e.summaryCells[29][0].value = this.totales01O.total01OperacionMYD;
        e.summaryCells[32][0].value = this.totales01O.total01OperacionJR;
        e.summaryCells[33][0].value = this.totales01O.total01OperacionJP;
        e.summaryCells[34][0].value = this.totales01O.total01OperacionJD;
        e.summaryCells[37][0].value = this.totales01O.total01OperacionJLR;
        e.summaryCells[38][0].value = this.totales01O.total01OperacionJLP;
        e.summaryCells[39][0].value = this.totales01O.total01OperacionJLD;
        e.summaryCells[42][0].value = this.totales01O.total01OperacionAGR;
        e.summaryCells[43][0].value = this.totales01O.total01OperacionAGP;
        e.summaryCells[44][0].value = this.totales01O.total01OperacionAGD;
        e.summaryCells[47][0].value = this.totales01O.total01OperacionSR;
        e.summaryCells[48][0].value = this.totales01O.total01OperacionSP;
        e.summaryCells[49][0].value = this.totales01O.total01OperacionSD;
        e.summaryCells[52][0].value = this.totales01O.total01OperacionOR;
        e.summaryCells[53][0].value = this.totales01O.total01OperacionOP;
        e.summaryCells[54][0].value = this.totales01O.total01OperacionOD;
        e.summaryCells[57][0].value = this.totales01O.total01OperacionNR;
        e.summaryCells[58][0].value = this.totales01O.total01OperacionNP;
        e.summaryCells[59][0].value = this.totales01O.total01OperacionND;
        e.summaryCells[62][0].value = this.totales01O.total01OperacionDR;
        e.summaryCells[63][0].value = this.totales01O.total01OperacionDP;
        e.summaryCells[64][0].value = this.totales01O.total01OperacionDD;
        e.summaryCells[67][0].value = this.totales01O.total01OperacionACR;
        e.summaryCells[68][0].value = this.totales01O.total01OperacionACP;
        e.summaryCells[69][0].value = this.totales01O.total01OperacionACD;

        e.summaryCells[5][0].displayFormat = 'UTILIDAD BRUTA';
         // console.log('🌲', e);
  
        
      }



      if(e.groupIndex == 1 && e.data.key == '02.- OTROS GASTOS DE OPERACIÓN'){
         
        this.totales02OGO.totalesOGOER = e.summaryCells[7][0].value;
        this.totales02OGO.totalesOGOEP = e.summaryCells[8][0].value;
        this.totales02OGO.totalesOGOED = e.summaryCells[9][0].value;
        this.totales02OGO.totalesOGOFR = e.summaryCells[12][0].value;
        this.totales02OGO.totalesOGOFP = e.summaryCells[13][0].value;
        this.totales02OGO.totalesOGOFD = e.summaryCells[14][0].value;
        this.totales02OGO.totalesOGOMR = e.summaryCells[17][0].value;
        this.totales02OGO.totalesOGOMP = e.summaryCells[18][0].value;
        this.totales02OGO.totalesOGOMD = e.summaryCells[19][0].value;
        this.totales02OGO.totalesOGOAR = e.summaryCells[22][0].value;
        this.totales02OGO.totalesOGOAP = e.summaryCells[23][0].value;
        this.totales02OGO.totalesOGOAD = e.summaryCells[24][0].value;
        this.totales02OGO.totalesOGOMYR = e.summaryCells[27][0].value;
        this.totales02OGO.totalesOGOMYP = e.summaryCells[28][0].value;
        this.totales02OGO.totalesOGOMYD = e.summaryCells[29][0].value;
        this.totales02OGO.totalesOGOJR = e.summaryCells[32][0].value; 
        this.totales02OGO.totalesOGOJP = e.summaryCells[33][0].value; 
        this.totales02OGO.totalesOGOJD = e.summaryCells[34][0].value; 
        this.totales02OGO.totalesOGOJLR = e.summaryCells[37][0].value;
        this.totales02OGO.totalesOGOJLP = e.summaryCells[38][0].value;
        this.totales02OGO.totalesOGOJLD = e.summaryCells[39][0].value;
        this.totales02OGO.totalesOGOAGR = e.summaryCells[42][0].value;
        this.totales02OGO.totalesOGOAGP = e.summaryCells[43][0].value;
        this.totales02OGO.totalesOGOAGD = e.summaryCells[44][0].value;
        this.totales02OGO.totalesOGOSR = e.summaryCells[47][0].value; 
        this.totales02OGO.totalesOGOSP = e.summaryCells[48][0].value; 
        this.totales02OGO.totalesOGOSD = e.summaryCells[49][0].value; 
        this.totales02OGO.totalesOGOOR = e.summaryCells[52][0].value; 
        this.totales02OGO.totalesOGOOP = e.summaryCells[53][0].value; 
        this.totales02OGO.totalesOGOOD = e.summaryCells[54][0].value; 
        this.totales02OGO.totalesOGONR = e.summaryCells[57][0].value; 
        this.totales02OGO.totalesOGONP = e.summaryCells[58][0].value; 
        this.totales02OGO.totalesOGOND = e.summaryCells[59][0].value; 
        this.totales02OGO.totalesOGODR = e.summaryCells[62][0].value; 
        this.totales02OGO.totalesOGODP = e.summaryCells[63][0].value; 
        this.totales02OGO.totalesOGODD = e.summaryCells[64][0].value; 
        this.totales02OGO.totalesOGOACR = e.summaryCells[67][0].value;
        this.totales02OGO.totalesOGOACP = e.summaryCells[68][0].value;
        this.totales02OGO.totalesOGOACD = e.summaryCells[69][0].value;


      }

      // if(e.groupIndex == 2 && e.data.key == 'c.- OTROS GASTOS/INGRESOS ORDINARIOS'){
      //   e.summaryCells[7][0].value = this.totalesOGIO.totalOtrosGIOER;
      //   e.summaryCells[8][0].value = this.totalesOGIO.totalOtrosGIOEP;
      //   e.summaryCells[9][0].value = this.totalesOGIO.totalOtrosGIOED;
      //   e.summaryCells[12][0].value = this.totalesOGIO.totalOtrosGIOFR;
      //   e.summaryCells[13][0].value = this.totalesOGIO.totalOtrosGIOFP;
      //   e.summaryCells[14][0].value = this.totalesOGIO.totalOtrosGIOFD;
      //   e.summaryCells[17][0].value = this.totalesOGIO.totalOtrosGIOMR;
      //   e.summaryCells[18][0].value = this.totalesOGIO.totalOtrosGIOMP;
      //   e.summaryCells[19][0].value = this.totalesOGIO.totalOtrosGIOMD;
      //   e.summaryCells[22][0].value = this.totalesOGIO.totalOtrosGIOAR;
      //   e.summaryCells[23][0].value = this.totalesOGIO.totalOtrosGIOAP;
      //   e.summaryCells[24][0].value = this.totalesOGIO.totalOtrosGIOAD;
      //   e.summaryCells[27][0].value = this.totalesOGIO.totalOtrosGIOMYR;
      //   e.summaryCells[28][0].value = this.totalesOGIO.totalOtrosGIOMYP;
      //   e.summaryCells[29][0].value = this.totalesOGIO.totalOtrosGIOMYD;
      //   e.summaryCells[32][0].value = this.totalesOGIO.totalOtrosGIOJR;
      //   e.summaryCells[33][0].value = this.totalesOGIO.totalOtrosGIOJP;
      //   e.summaryCells[34][0].value = this.totalesOGIO.totalOtrosGIOJD;
      //   e.summaryCells[37][0].value = this.totalesOGIO.totalOtrosGIOJLR;
      //   e.summaryCells[38][0].value = this.totalesOGIO.totalOtrosGIOJLP;
      //   e.summaryCells[39][0].value = this.totalesOGIO.totalOtrosGIOJLD;
      //   e.summaryCells[42][0].value = this.totalesOGIO.totalOtrosGIOAGR;
      //   e.summaryCells[43][0].value = this.totalesOGIO.totalOtrosGIOAGP;
      //   e.summaryCells[44][0].value = this.totalesOGIO.totalOtrosGIOAGD;
      //   e.summaryCells[47][0].value = this.totalesOGIO.totalOtrosGIOSR;
      //   e.summaryCells[48][0].value = this.totalesOGIO.totalOtrosGIOSP;
      //   e.summaryCells[49][0].value = this.totalesOGIO.totalOtrosGIOSD;
      //   e.summaryCells[52][0].value = this.totalesOGIO.totalOtrosGIOOR;
      //   e.summaryCells[53][0].value = this.totalesOGIO.totalOtrosGIOOP;
      //   e.summaryCells[54][0].value = this.totalesOGIO.totalOtrosGIOOD;
      //   e.summaryCells[57][0].value = this.totalesOGIO.totalOtrosGIONR;
      //   e.summaryCells[58][0].value = this.totalesOGIO.totalOtrosGIONP;
      //   e.summaryCells[59][0].value = this.totalesOGIO.totalOtrosGIOND;
      //   e.summaryCells[62][0].value = this.totalesOGIO.totalOtrosGIODR;
      //   e.summaryCells[63][0].value = this.totalesOGIO.totalOtrosGIODP;
      //   e.summaryCells[64][0].value = this.totalesOGIO.totalOtrosGIODD;
      //   e.summaryCells[67][0].value = this.totalesOGIO.totalOtrosGIOACR;
      //   e.summaryCells[68][0].value = this.totalesOGIO.totalOtrosGIOACP;
      //   e.summaryCells[69][0].value = this.totalesOGIO.totalOtrosGIOACD;

      //   let sumaOGOER
      //   let sumaOGOEP
      //   let sumaOGOED
      //   let sumaOGOFR
      //   let sumaOGOFP
      //   let sumaOGOFD
      //   let sumaOGOMR
      //   let sumaOGOMP
      //   let sumaOGOMD
      //   let sumaOGOAR
      //   let sumaOGOAP
      //   let sumaOGOAD
      //   let sumaOGOMYR
      //   let sumaOGOMYP
      //   let sumaOGOMYD
      //   let sumaOGOJR
      //   let sumaOGOJP
      //   let sumaOGOJD
      //   let sumaOGOJLR
      //   let sumaOGOJLP
      //   let sumaOGOJLD
      //   let sumaOGOAGR
      //   let sumaOGOAGP
      //   let sumaOGOAGD
      //   let sumaOGOSR
      //   let sumaOGOSP
      //   let sumaOGOSD
      //   let sumaOGOOR
      //   let sumaOGOOP
      //   let sumaOGOOD
      //   let sumaOGONR
      //   let sumaOGONP
      //   let sumaOGOND
      //   let sumaOGODR
      //   let sumaOGODP
      //   let sumaOGODD
      //   let sumaOGOACR
      //   let sumaOGOACP
      //   let sumaOGOACD


      //   sumaOGOER = this.totalesOtrosGO.totalGAER + this.totalesOtrosGO.totalDAER;
      //   this.totalesOtrosGO.totalOGOperacionER = sumaOGOER - this.totalesOGIO.totalOtrosGIOER
      //   sumaOGOEP = this.totalesOtrosGO.totalGAEP + this.totalesOtrosGO.totalDAEP;
      //   this.totalesOtrosGO.totalOGOperacionEP = sumaOGOEP - this.totalesOGIO.totalOtrosGIOEP
      //   sumaOGOED = this.totalesOtrosGO.totalGAED + this.totalesOtrosGO.totalDAED;
      //   this.totalesOtrosGO.totalOGOperacionED = sumaOGOED - this.totalesOGIO.totalOtrosGIOED
      //   sumaOGOFR = this.totalesOtrosGO.totalGAFR + this.totalesOtrosGO.totalDAFR;
      //   this.totalesOtrosGO.totalOGOperacionFR = sumaOGOFR - this.totalesOGIO.totalOtrosGIOFR
      //   sumaOGOFP = this.totalesOtrosGO.totalGAFP + this.totalesOtrosGO.totalDAFP;
      //   this.totalesOtrosGO.totalOGOperacionFP = sumaOGOFP - this.totalesOGIO.totalOtrosGIOFP
      //   sumaOGOFD = this.totalesOtrosGO.totalGAFD + this.totalesOtrosGO.totalDAFD;
      //   this.totalesOtrosGO.totalOGOperacionFD = sumaOGOFD - this.totalesOGIO.totalOtrosGIOFD
      //   sumaOGOMR = this.totalesOtrosGO.totalGAMR + this.totalesOtrosGO.totalDAMR;
      //   this.totalesOtrosGO.totalOGOperacionMR = sumaOGOMR - this.totalesOGIO.totalOtrosGIOMR
      //   sumaOGOMP = this.totalesOtrosGO.totalGAMP + this.totalesOtrosGO.totalDAMP;
      //   this.totalesOtrosGO.totalOGOperacionMP = sumaOGOMP - this.totalesOGIO.totalOtrosGIOMP
      //   sumaOGOMD = this.totalesOtrosGO.totalGAMD + this.totalesOtrosGO.totalDAMD;
      //   this.totalesOtrosGO.totalOGOperacionMD = sumaOGOMD - this.totalesOGIO.totalOtrosGIOMD
      //   sumaOGOAR = this.totalesOtrosGO.totalGAAR + this.totalesOtrosGO.totalDAAR;
      //   this.totalesOtrosGO.totalOGOperacionAR = sumaOGOAR - this.totalesOGIO.totalOtrosGIOAR
      //   sumaOGOAP = this.totalesOtrosGO.totalGAAP + this.totalesOtrosGO.totalDAAP;
      //   this.totalesOtrosGO.totalOGOperacionAP = sumaOGOAP - this.totalesOGIO.totalOtrosGIOAP
      //   sumaOGOAD = this.totalesOtrosGO.totalGAAD + this.totalesOtrosGO.totalDAAD;
      //   this.totalesOtrosGO.totalOGOperacionAD = sumaOGOAD - this.totalesOGIO.totalOtrosGIOAD
      //   sumaOGOMYR = this.totalesOtrosGO.totalGAMYR + this.totalesOtrosGO.totalDAMYR;
      //   this.totalesOtrosGO.totalOGOperacionMYR = sumaOGOMYR - this.totalesOGIO.totalOtrosGIOMYR
      //   sumaOGOMYP = this.totalesOtrosGO.totalGAMYP + this.totalesOtrosGO.totalDAMYP;
      //   this.totalesOtrosGO.totalOGOperacionMYP = sumaOGOMYP - this.totalesOGIO.totalOtrosGIOMYP
      //   sumaOGOMYD = this.totalesOtrosGO.totalGAMYD + this.totalesOtrosGO.totalDAMYD;
      //   this.totalesOtrosGO.totalOGOperacionMYD = sumaOGOMYD - this.totalesOGIO.totalOtrosGIOMYD
      //   sumaOGOJR = this.totalesOtrosGO.totalGAJR + this.totalesOtrosGO.totalDAJR;
      //   this.totalesOtrosGO.totalOGOperacionJR = sumaOGOJR - this.totalesOGIO.totalOtrosGIOJR
      //   sumaOGOJP = this.totalesOtrosGO.totalGAJP + this.totalesOtrosGO.totalDAJP;
      //   this.totalesOtrosGO.totalOGOperacionJP = sumaOGOJP - this.totalesOGIO.totalOtrosGIOJP
      //   sumaOGOJD = this.totalesOtrosGO.totalGAJD + this.totalesOtrosGO.totalDAJD;
      //   this.totalesOtrosGO.totalOGOperacionJD = sumaOGOJD - this.totalesOGIO.totalOtrosGIOJD
      //   sumaOGOJLR = this.totalesOtrosGO.totalGAJLR + this.totalesOtrosGO.totalDAJLR;
      //   this.totalesOtrosGO.totalOGOperacionJLR = sumaOGOJLR - this.totalesOGIO.totalOtrosGIOJLR
      //   sumaOGOJLP = this.totalesOtrosGO.totalGAJLP + this.totalesOtrosGO.totalDAJLP;
      //   this.totalesOtrosGO.totalOGOperacionJLP = sumaOGOJLP - this.totalesOGIO.totalOtrosGIOJLP
      //   sumaOGOJLD = this.totalesOtrosGO.totalGAJLD + this.totalesOtrosGO.totalDAJLD;
      //   this.totalesOtrosGO.totalOGOperacionJLD = sumaOGOJLD - this.totalesOGIO.totalOtrosGIOJLD
      //   sumaOGOAGR = this.totalesOtrosGO.totalGAAGR + this.totalesOtrosGO.totalDAAGR;
      //   this.totalesOtrosGO.totalOGOperacionAGR = sumaOGOAGR - this.totalesOGIO.totalOtrosGIOAGR
      //   sumaOGOAGP = this.totalesOtrosGO.totalGAAGP + this.totalesOtrosGO.totalDAAGP;
      //   this.totalesOtrosGO.totalOGOperacionAGP = sumaOGOAGP - this.totalesOGIO.totalOtrosGIOAGP
      //   sumaOGOAGD = this.totalesOtrosGO.totalGAAGD + this.totalesOtrosGO.totalDAAGD;
      //   this.totalesOtrosGO.totalOGOperacionAGD = sumaOGOAGD - this.totalesOGIO.totalOtrosGIOAGD
      //   sumaOGOSR = this.totalesOtrosGO.totalGASR + this.totalesOtrosGO.totalDASR;
      //   this.totalesOtrosGO.totalOGOperacionSR = sumaOGOSR - this.totalesOGIO.totalOtrosGIOSR
      //   sumaOGOSP = this.totalesOtrosGO.totalGASP + this.totalesOtrosGO.totalDASP;
      //   this.totalesOtrosGO.totalOGOperacionSP = sumaOGOSP - this.totalesOGIO.totalOtrosGIOSP
      //   sumaOGOSD = this.totalesOtrosGO.totalGASD + this.totalesOtrosGO.totalDASD;
      //   this.totalesOtrosGO.totalOGOperacionSD = sumaOGOSD - this.totalesOGIO.totalOtrosGIOSD
      //   sumaOGOOR = this.totalesOtrosGO.totalGAOR + this.totalesOtrosGO.totalDAOR;
      //   this.totalesOtrosGO.totalOGOperacionOR = sumaOGOOR - this.totalesOGIO.totalOtrosGIOOR
      //   sumaOGOOP = this.totalesOtrosGO.totalGAOP + this.totalesOtrosGO.totalDAOP;
      //   this.totalesOtrosGO.totalOGOperacionOP = sumaOGOOP - this.totalesOGIO.totalOtrosGIOOP
      //   sumaOGOOD = this.totalesOtrosGO.totalGAOD + this.totalesOtrosGO.totalDAOD;
      //   this.totalesOtrosGO.totalOGOperacionOD = sumaOGOOD - this.totalesOGIO.totalOtrosGIOOD
      //   sumaOGONR = this.totalesOtrosGO.totalGANR + this.totalesOtrosGO.totalDANR;
      //   this.totalesOtrosGO.totalOGOperacionNR = sumaOGONR - this.totalesOGIO.totalOtrosGIONR
      //   sumaOGONP = this.totalesOtrosGO.totalGANP + this.totalesOtrosGO.totalDANP;
      //   this.totalesOtrosGO.totalOGOperacionNP = sumaOGONP - this.totalesOGIO.totalOtrosGIONP
      //   sumaOGOND = this.totalesOtrosGO.totalGAND + this.totalesOtrosGO.totalDAND;
      //   this.totalesOtrosGO.totalOGOperacionND = sumaOGOND - this.totalesOGIO.totalOtrosGIOND
      //   sumaOGODR = this.totalesOtrosGO.totalGADR + this.totalesOtrosGO.totalDADR;
      //   this.totalesOtrosGO.totalOGOperacionDR = sumaOGODR - this.totalesOGIO.totalOtrosGIODR
      //   sumaOGODP = this.totalesOtrosGO.totalGADP + this.totalesOtrosGO.totalDADP;
      //   this.totalesOtrosGO.totalOGOperacionDP = sumaOGODP - this.totalesOGIO.totalOtrosGIODP
      //   sumaOGODD = this.totalesOtrosGO.totalGADD + this.totalesOtrosGO.totalDADD;
      //   this.totalesOtrosGO.totalOGOperacionDD = sumaOGODD - this.totalesOGIO.totalOtrosGIODD
      //   sumaOGOACR = this.totalesOtrosGO.totalGAACR + this.totalesOtrosGO.totalDAACR;
      //   this.totalesOtrosGO.totalOGOperacionACR = sumaOGOACR - this.totalesOGIO.totalOtrosGIOACR
      //   sumaOGOACP = this.totalesOtrosGO.totalGAACP + this.totalesOtrosGO.totalDAACP;
      //   this.totalesOtrosGO.totalOGOperacionACP = sumaOGOACP - this.totalesOGIO.totalOtrosGIOACP
      //   sumaOGOACD = this.totalesOtrosGO.totalGAACD + this.totalesOtrosGO.totalDAACD;
      //   this.totalesOtrosGO.totalOGOperacionACD = sumaOGOACD - this.totalesOGIO.totalOtrosGIOACD
        
      // }

      if(e.groupIndex == 1 && e.data.key == '03.- OTROS GASTOS/INGRESOS EXTRAORDINARIOS'){
        e.summaryCells[7][0].value = this.totalesOtrosGIE.totalesOGIEER;
        e.summaryCells[8][0].value = this.totalesOtrosGIE.totalesOGIEEP;
        e.summaryCells[9][0].value = this.totalesOtrosGIE.totalesOGIEED;
        e.summaryCells[12][0].value = this.totalesOtrosGIE.totalesOGIEFR;
        e.summaryCells[13][0].value = this.totalesOtrosGIE.totalesOGIEFP;
        e.summaryCells[14][0].value = this.totalesOtrosGIE.totalesOGIEFD;
        e.summaryCells[17][0].value = this.totalesOtrosGIE.totalesOGIEMR;
        e.summaryCells[18][0].value = this.totalesOtrosGIE.totalesOGIEMP;
        e.summaryCells[19][0].value = this.totalesOtrosGIE.totalesOGIEMD;
        e.summaryCells[22][0].value = this.totalesOtrosGIE.totalesOGIEAR;
        e.summaryCells[23][0].value = this.totalesOtrosGIE.totalesOGIEAP;
        e.summaryCells[24][0].value = this.totalesOtrosGIE.totalesOGIEAD;
        e.summaryCells[27][0].value = this.totalesOtrosGIE.totalesOGIEMYR;
        e.summaryCells[28][0].value = this.totalesOtrosGIE.totalesOGIEMYP;
        e.summaryCells[29][0].value = this.totalesOtrosGIE.totalesOGIEMYD;
        e.summaryCells[32][0].value = this.totalesOtrosGIE.totalesOGIEJR;
        e.summaryCells[33][0].value = this.totalesOtrosGIE.totalesOGIEJP;
        e.summaryCells[34][0].value = this.totalesOtrosGIE.totalesOGIEJD;
        e.summaryCells[37][0].value = this.totalesOtrosGIE.totalesOGIEJLR;
        e.summaryCells[38][0].value = this.totalesOtrosGIE.totalesOGIEJLP;
        e.summaryCells[39][0].value = this.totalesOtrosGIE.totalesOGIEJLD;
        e.summaryCells[42][0].value = this.totalesOtrosGIE.totalesOGIEAGR;
        e.summaryCells[43][0].value = this.totalesOtrosGIE.totalesOGIEAGP;
        e.summaryCells[44][0].value = this.totalesOtrosGIE.totalesOGIEAGD;
        e.summaryCells[47][0].value = this.totalesOtrosGIE.totalesOGIESR;
        e.summaryCells[48][0].value = this.totalesOtrosGIE.totalesOGIESP;
        e.summaryCells[49][0].value = this.totalesOtrosGIE.totalesOGIESD;
        e.summaryCells[52][0].value = this.totalesOtrosGIE.totalesOGIEOR;
        e.summaryCells[53][0].value = this.totalesOtrosGIE.totalesOGIEOP;
        e.summaryCells[54][0].value = this.totalesOtrosGIE.totalesOGIEOD;
        e.summaryCells[57][0].value = this.totalesOtrosGIE.totalesOGIENR;
        e.summaryCells[58][0].value = this.totalesOtrosGIE.totalesOGIENP;
        e.summaryCells[59][0].value = this.totalesOtrosGIE.totalesOGIEND;
        e.summaryCells[62][0].value = this.totalesOtrosGIE.totalesOGIEDR;
        e.summaryCells[63][0].value = this.totalesOtrosGIE.totalesOGIEDP;
        e.summaryCells[64][0].value = this.totalesOtrosGIE.totalesOGIEDD;
        e.summaryCells[67][0].value = this.totalesOtrosGIE.totalesOGIEACR;
        e.summaryCells[68][0].value = this.totalesOtrosGIE.totalesOGIEACP;
        e.summaryCells[69][0].value = this.totalesOtrosGIE.totalesOGIEACD;
      }

      if(e.groupIndex == 2 && e.data.key == 'd.- OTROS'){
        e.summaryCells[7][0].value = this.totalesOtros.totalesOtrosER;
        e.summaryCells[8][0].value = this.totalesOtros.totalesOtrosEP;
        e.summaryCells[9][0].value = this.totalesOtros.totalesOtrosED;
        e.summaryCells[12][0].value = this.totalesOtros.totalesOtrosFR;
        e.summaryCells[13][0].value = this.totalesOtros.totalesOtrosFP;
        e.summaryCells[14][0].value = this.totalesOtros.totalesOtrosFD;
        e.summaryCells[17][0].value = this.totalesOtros.totalesOtrosMR;
        e.summaryCells[18][0].value = this.totalesOtros.totalesOtrosMP;
        e.summaryCells[19][0].value = this.totalesOtros.totalesOtrosMD;
        e.summaryCells[22][0].value = this.totalesOtros.totalesOtrosAR;
        e.summaryCells[23][0].value = this.totalesOtros.totalesOtrosAP;
        e.summaryCells[24][0].value = this.totalesOtros.totalesOtrosAD;
        e.summaryCells[27][0].value = this.totalesOtros.totalesOtrosMYR;
        e.summaryCells[28][0].value = this.totalesOtros.totalesOtrosMYP;
        e.summaryCells[29][0].value = this.totalesOtros.totalesOtrosMYD;
        e.summaryCells[32][0].value = this.totalesOtros.totalesOtrosJR;
        e.summaryCells[33][0].value = this.totalesOtros.totalesOtrosJP;
        e.summaryCells[34][0].value = this.totalesOtros.totalesOtrosJD;
        e.summaryCells[37][0].value = this.totalesOtros.totalesOtrosJLR;
        e.summaryCells[38][0].value = this.totalesOtros.totalesOtrosJLP;
        e.summaryCells[39][0].value = this.totalesOtros.totalesOtrosJLD;
        e.summaryCells[42][0].value = this.totalesOtros.totalesOtrosAGR;
        e.summaryCells[43][0].value = this.totalesOtros.totalesOtrosAGP;
        e.summaryCells[44][0].value = this.totalesOtros.totalesOtrosAGD;
        e.summaryCells[47][0].value = this.totalesOtros.totalesOtrosSR;
        e.summaryCells[48][0].value = this.totalesOtros.totalesOtrosSP;
        e.summaryCells[49][0].value = this.totalesOtros.totalesOtrosSD;
        e.summaryCells[52][0].value = this.totalesOtros.totalesOtrosOR;
        e.summaryCells[53][0].value = this.totalesOtros.totalesOtrosOP;
        e.summaryCells[54][0].value = this.totalesOtros.totalesOtrosOD;
        e.summaryCells[57][0].value = this.totalesOtros.totalesOtrosNR;
        e.summaryCells[58][0].value = this.totalesOtros.totalesOtrosNP;
        e.summaryCells[59][0].value = this.totalesOtros.totalesOtrosND;
        e.summaryCells[62][0].value = this.totalesOtros.totalesOtrosDR;
        e.summaryCells[63][0].value = this.totalesOtros.totalesOtrosDP;
        e.summaryCells[64][0].value = this.totalesOtros.totalesOtrosDD;
        e.summaryCells[67][0].value = this.totalesOtros.totalesOtrosACR;
        e.summaryCells[68][0].value = this.totalesOtros.totalesOtrosACP;
        e.summaryCells[69][0].value = this.totalesOtros.totalesOtrosACD;
        
        let sumaOGIEER;
        let sumaOGIEEP
        let sumaOGIEED
        let sumaOGIEFR
        let sumaOGIEFP
        let sumaOGIEFD
        let sumaOGIEMR
        let sumaOGIEMP
        let sumaOGIEMD
        let sumaOGIEAR
        let sumaOGIEAP
        let sumaOGIEAD
        let sumaOGIEMYR
        let sumaOGIEMYP
        let sumaOGIEMYD
        let sumaOGIEJR
        let sumaOGIEJP
        let sumaOGIEJD
        let sumaOGIEJLR
        let sumaOGIEJLP
        let sumaOGIEJLD
        let sumaOGIEAGR
        let sumaOGIEAGP
        let sumaOGIEAGD
        let sumaOGIESR
        let sumaOGIESP
        let sumaOGIESD
        let sumaOGIEOR
        let sumaOGIEOP
        let sumaOGIEOD
        let sumaOGIENR
        let sumaOGIENP
        let sumaOGIEND
        let sumaOGIEDR
        let sumaOGIEDP
        let sumaOGIEDD
        let sumaOGIEACR
        let sumaOGIEACP
        let sumaOGIEACD

        sumaOGIEER = this.totalesOtrosGIE.totalGICER + this.totalesOtrosGIE.totalEFER + this.totalesOtrosGIE.totalVAFER;
        this.totalesOtrosGIE.totalesOGIEER = sumaOGIEER - this.totalesOtros.totalesOtrosER;
        sumaOGIEEP = this.totalesOtrosGIE.totalGICEP + this.totalesOtrosGIE.totalEFEP + this.totalesOtrosGIE.totalVAFEP;
        this.totalesOtrosGIE.totalesOGIEEP = sumaOGIEEP -this.totalesOtros.totalesOtrosEP
        sumaOGIEED = this.totalesOtrosGIE.totalGICED + this.totalesOtrosGIE.totalEFED + this.totalesOtrosGIE.totalVAFED;
        this.totalesOtrosGIE.totalesOGIEED = sumaOGIEED -this.totalesOtros.totalesOtrosED
        sumaOGIEFR = this.totalesOtrosGIE.totalGICFR + this.totalesOtrosGIE.totalEFFR + this.totalesOtrosGIE.totalVAFFR;
        this.totalesOtrosGIE.totalesOGIEFR = sumaOGIEFR -this.totalesOtros.totalesOtrosFR
        sumaOGIEFP = this.totalesOtrosGIE.totalGICFP + this.totalesOtrosGIE.totalEFFP + this.totalesOtrosGIE.totalVAFFP;
        this.totalesOtrosGIE.totalesOGIEFP = sumaOGIEFP -this.totalesOtros.totalesOtrosFP
        sumaOGIEFD = this.totalesOtrosGIE.totalGICFD + this.totalesOtrosGIE.totalEFFD + this.totalesOtrosGIE.totalVAFFD;
        this.totalesOtrosGIE.totalesOGIEFD = sumaOGIEFD -this.totalesOtros.totalesOtrosFD
        sumaOGIEMR = this.totalesOtrosGIE.totalGICMR + this.totalesOtrosGIE.totalEFMR + this.totalesOtrosGIE.totalVAFMR;
        this.totalesOtrosGIE.totalesOGIEMR = sumaOGIEMR -this.totalesOtros.totalesOtrosMR
        sumaOGIEMP = this.totalesOtrosGIE.totalGICMP + this.totalesOtrosGIE.totalEFMP + this.totalesOtrosGIE.totalVAFMP;
        this.totalesOtrosGIE.totalesOGIEMP = sumaOGIEMP -this.totalesOtros.totalesOtrosMP
        sumaOGIEMD = this.totalesOtrosGIE.totalGICMD + this.totalesOtrosGIE.totalEFMD + this.totalesOtrosGIE.totalVAFMD;
        this.totalesOtrosGIE.totalesOGIEMD = sumaOGIEMD -this.totalesOtros.totalesOtrosMD
        sumaOGIEAR = this.totalesOtrosGIE.totalGICAR + this.totalesOtrosGIE.totalEFAR + this.totalesOtrosGIE.totalVAFAR;
        this.totalesOtrosGIE.totalesOGIEAR = sumaOGIEAR -this.totalesOtros.totalesOtrosAR
        sumaOGIEAP = this.totalesOtrosGIE.totalGICAP + this.totalesOtrosGIE.totalEFAP + this.totalesOtrosGIE.totalVAFAP;
        this.totalesOtrosGIE.totalesOGIEAP = sumaOGIEAP -this.totalesOtros.totalesOtrosAP
        sumaOGIEAD = this.totalesOtrosGIE.totalGICAD + this.totalesOtrosGIE.totalEFAD + this.totalesOtrosGIE.totalVAFAD;
        this.totalesOtrosGIE.totalesOGIEAD = sumaOGIEAD -this.totalesOtros.totalesOtrosAD
        sumaOGIEMYR = this.totalesOtrosGIE.totalGICMYR + this.totalesOtrosGIE.totalEFMYR + this.totalesOtrosGIE.totalVAFMYR;
        this.totalesOtrosGIE.totalesOGIEMYR = sumaOGIEMYR -this.totalesOtros.totalesOtrosMYR
        sumaOGIEMYP = this.totalesOtrosGIE.totalGICMYP + this.totalesOtrosGIE.totalEFMYP + this.totalesOtrosGIE.totalVAFMYP;
        this.totalesOtrosGIE.totalesOGIEMYP = sumaOGIEMYP -this.totalesOtros.totalesOtrosMYP
        sumaOGIEMYD = this.totalesOtrosGIE.totalGICMYD + this.totalesOtrosGIE.totalEFMYD + this.totalesOtrosGIE.totalVAFMYD;
        this.totalesOtrosGIE.totalesOGIEMYD = sumaOGIEMYD -this.totalesOtros.totalesOtrosMYD
        sumaOGIEJR = this.totalesOtrosGIE.totalGICJR + this.totalesOtrosGIE.totalEFJR + this.totalesOtrosGIE.totalVAFJR;
        this.totalesOtrosGIE.totalesOGIEJR = sumaOGIEJR -this.totalesOtros.totalesOtrosJR
        sumaOGIEJP = this.totalesOtrosGIE.totalGICJP + this.totalesOtrosGIE.totalEFJP + this.totalesOtrosGIE.totalVAFJP;
        this.totalesOtrosGIE.totalesOGIEJP = sumaOGIEJP -this.totalesOtros.totalesOtrosJP
        sumaOGIEJD = this.totalesOtrosGIE.totalGICJD + this.totalesOtrosGIE.totalEFJD + this.totalesOtrosGIE.totalVAFJD;
        this.totalesOtrosGIE.totalesOGIEJD = sumaOGIEJD -this.totalesOtros.totalesOtrosJD
        sumaOGIEJLR = this.totalesOtrosGIE.totalGICJLR + this.totalesOtrosGIE.totalEFJLR + this.totalesOtrosGIE.totalVAFJLR;
        this.totalesOtrosGIE.totalesOGIEJLR = sumaOGIEJLR -this.totalesOtros.totalesOtrosJLR
        sumaOGIEJLP = this.totalesOtrosGIE.totalGICJLP + this.totalesOtrosGIE.totalEFJLP + this.totalesOtrosGIE.totalVAFJLP;
        this.totalesOtrosGIE.totalesOGIEJLP = sumaOGIEJLP -this.totalesOtros.totalesOtrosJLP
        sumaOGIEJLD = this.totalesOtrosGIE.totalGICJLD + this.totalesOtrosGIE.totalEFJLD + this.totalesOtrosGIE.totalVAFJLD;
        this.totalesOtrosGIE.totalesOGIEJLD = sumaOGIEJLD -this.totalesOtros.totalesOtrosJLD
        sumaOGIEAGR = this.totalesOtrosGIE.totalGICAGR + this.totalesOtrosGIE.totalEFAGR + this.totalesOtrosGIE.totalVAFAGR;
        this.totalesOtrosGIE.totalesOGIEAGR = sumaOGIEAGR -this.totalesOtros.totalesOtrosAGR
        sumaOGIEAGP = this.totalesOtrosGIE.totalGICAGP + this.totalesOtrosGIE.totalEFAGP + this.totalesOtrosGIE.totalVAFAGP;
        this.totalesOtrosGIE.totalesOGIEAGP = sumaOGIEAGP -this.totalesOtros.totalesOtrosAGP
        sumaOGIEAGD = this.totalesOtrosGIE.totalGICAGD + this.totalesOtrosGIE.totalEFAGD + this.totalesOtrosGIE.totalVAFAGD;
        this.totalesOtrosGIE.totalesOGIEAGD = sumaOGIEAGD -this.totalesOtros.totalesOtrosAGD
        sumaOGIESR = this.totalesOtrosGIE.totalGICSR + this.totalesOtrosGIE.totalEFSR + this.totalesOtrosGIE.totalVAFSR;
        this.totalesOtrosGIE.totalesOGIESR = sumaOGIESR -this.totalesOtros.totalesOtrosSR
        sumaOGIESP = this.totalesOtrosGIE.totalGICSP + this.totalesOtrosGIE.totalEFSP + this.totalesOtrosGIE.totalVAFSP;
        this.totalesOtrosGIE.totalesOGIESP = sumaOGIESP -this.totalesOtros.totalesOtrosSP
        sumaOGIESD = this.totalesOtrosGIE.totalGICSD + this.totalesOtrosGIE.totalEFSD + this.totalesOtrosGIE.totalVAFSD;
        this.totalesOtrosGIE.totalesOGIESD = sumaOGIESD -this.totalesOtros.totalesOtrosSD
        sumaOGIEOR = this.totalesOtrosGIE.totalGICOR + this.totalesOtrosGIE.totalEFOR + this.totalesOtrosGIE.totalVAFOR;
        this.totalesOtrosGIE.totalesOGIEOR = sumaOGIEOR -this.totalesOtros.totalesOtrosOR
        sumaOGIEOP = this.totalesOtrosGIE.totalGICOP + this.totalesOtrosGIE.totalEFOP + this.totalesOtrosGIE.totalVAFOP;
        this.totalesOtrosGIE.totalesOGIEOP = sumaOGIEOP -this.totalesOtros.totalesOtrosOP
        sumaOGIEOD = this.totalesOtrosGIE.totalGICOD + this.totalesOtrosGIE.totalEFOD + this.totalesOtrosGIE.totalVAFOD;
        this.totalesOtrosGIE.totalesOGIEOD = sumaOGIEOD -this.totalesOtros.totalesOtrosOD
        sumaOGIENR = this.totalesOtrosGIE.totalGICNR + this.totalesOtrosGIE.totalEFNR + this.totalesOtrosGIE.totalVAFNR;
        this.totalesOtrosGIE.totalesOGIENR = sumaOGIENR -this.totalesOtros.totalesOtrosNR
        sumaOGIENP = this.totalesOtrosGIE.totalGICNP + this.totalesOtrosGIE.totalEFNP + this.totalesOtrosGIE.totalVAFNP;
        this.totalesOtrosGIE.totalesOGIENP = sumaOGIENP -this.totalesOtros.totalesOtrosNP
        sumaOGIEND = this.totalesOtrosGIE.totalGICND + this.totalesOtrosGIE.totalEFND + this.totalesOtrosGIE.totalVAFND;
        this.totalesOtrosGIE.totalesOGIEND = sumaOGIEND -this.totalesOtros.totalesOtrosND
        sumaOGIEDR = this.totalesOtrosGIE.totalGICDR + this.totalesOtrosGIE.totalEFDR + this.totalesOtrosGIE.totalVAFDR;
        this.totalesOtrosGIE.totalesOGIEDR = sumaOGIEDR -this.totalesOtros.totalesOtrosDR
        sumaOGIEDP = this.totalesOtrosGIE.totalGICDP + this.totalesOtrosGIE.totalEFDP + this.totalesOtrosGIE.totalVAFDP;
        this.totalesOtrosGIE.totalesOGIEDP = sumaOGIEDP -this.totalesOtros.totalesOtrosDP
        sumaOGIEDD = this.totalesOtrosGIE.totalGICDD + this.totalesOtrosGIE.totalEFDD + this.totalesOtrosGIE.totalVAFDD;
        this.totalesOtrosGIE.totalesOGIEDD = sumaOGIEDD -this.totalesOtros.totalesOtrosDD
        sumaOGIEACR = this.totalesOtrosGIE.totalGICACR + this.totalesOtrosGIE.totalEFACR + this.totalesOtrosGIE.totalVAFACR;
        this.totalesOtrosGIE.totalesOGIEACR = sumaOGIEACR -this.totalesOtros.totalesOtrosACR
        sumaOGIEACP = this.totalesOtrosGIE.totalGICACP + this.totalesOtrosGIE.totalEFACP + this.totalesOtrosGIE.totalVAFACP;
        this.totalesOtrosGIE.totalesOGIEACP = sumaOGIEACP -this.totalesOtros.totalesOtrosACP
        sumaOGIEACD = this.totalesOtrosGIE.totalGICACD + this.totalesOtrosGIE.totalEFACD + this.totalesOtrosGIE.totalVAFACD;
        this.totalesOtrosGIE.totalesOGIEACD = sumaOGIEACD -this.totalesOtros.totalesOtrosACD
      }

      if(e.groupIndex == 1 && e.data.key == '04.- GASTOS/INGRESOS FINANCIEROS'){
        e.summaryCells[7][0].value = this.totalesGIF.totalesGIFER
        e.summaryCells[8][0].value = this.totalesGIF.totalesGIFEP
        e.summaryCells[9][0].value = this.totalesGIF.totalesGIFED
        e.summaryCells[12][0].value = this.totalesGIF.totalesGIFFR
        e.summaryCells[13][0].value = this.totalesGIF.totalesGIFFP
        e.summaryCells[14][0].value = this.totalesGIF.totalesGIFFD
        e.summaryCells[17][0].value = this.totalesGIF.totalesGIFMR
        e.summaryCells[18][0].value = this.totalesGIF.totalesGIFMP
        e.summaryCells[19][0].value = this.totalesGIF.totalesGIFMD
        e.summaryCells[22][0].value = this.totalesGIF.totalesGIFAR
        e.summaryCells[23][0].value = this.totalesGIF.totalesGIFAP
        e.summaryCells[24][0].value = this.totalesGIF.totalesGIFAD
        e.summaryCells[27][0].value = this.totalesGIF.totalesGIFMYR
        e.summaryCells[28][0].value = this.totalesGIF.totalesGIFMYP
        e.summaryCells[29][0].value = this.totalesGIF.totalesGIFMYD
        e.summaryCells[32][0].value = this.totalesGIF.totalesGIFJR
        e.summaryCells[33][0].value = this.totalesGIF.totalesGIFJP
        e.summaryCells[34][0].value = this.totalesGIF.totalesGIFJD
        e.summaryCells[37][0].value = this.totalesGIF.totalesGIFJLR
        e.summaryCells[38][0].value = this.totalesGIF.totalesGIFJLP
        e.summaryCells[39][0].value = this.totalesGIF.totalesGIFJLD
        e.summaryCells[42][0].value = this.totalesGIF.totalesGIFAGR
        e.summaryCells[43][0].value = this.totalesGIF.totalesGIFAGP
        e.summaryCells[44][0].value = this.totalesGIF.totalesGIFAGD
        e.summaryCells[47][0].value = this.totalesGIF.totalesGIFSR
        e.summaryCells[48][0].value = this.totalesGIF.totalesGIFSP
        e.summaryCells[49][0].value = this.totalesGIF.totalesGIFSD
        e.summaryCells[52][0].value = this.totalesGIF.totalesGIFOR
        e.summaryCells[53][0].value = this.totalesGIF.totalesGIFOP
        e.summaryCells[54][0].value = this.totalesGIF.totalesGIFOD
        e.summaryCells[57][0].value = this.totalesGIF.totalesGIFNR
        e.summaryCells[58][0].value = this.totalesGIF.totalesGIFNP
        e.summaryCells[59][0].value = this.totalesGIF.totalesGIFND
        e.summaryCells[62][0].value = this.totalesGIF.totalesGIFDR
        e.summaryCells[63][0].value = this.totalesGIF.totalesGIFDP
        e.summaryCells[64][0].value = this.totalesGIF.totalesGIFDD
        e.summaryCells[67][0].value = this.totalesGIF.totalesGIFACR
        e.summaryCells[68][0].value = this.totalesGIF.totalesGIFACP
        e.summaryCells[69][0].value = this.totalesGIF.totalesGIFACD

      }

      if(e.groupIndex == 1 && e.data.key == '05.- PROVISIONES'){
        this.totalesProvisiones.totalProvisionER = e.summaryCells[7][0].value; 
        this.totalesProvisiones.totalProvisionEP = e.summaryCells[8][0].value; 
        this.totalesProvisiones.totalProvisionED = e.summaryCells[9][0].value; 
        this.totalesProvisiones.totalProvisionFR = e.summaryCells[12][0].value; 
        this.totalesProvisiones.totalProvisionFP = e.summaryCells[13][0].value; 
        this.totalesProvisiones.totalProvisionFD = e.summaryCells[14][0].value; 
        this.totalesProvisiones.totalProvisionMR = e.summaryCells[17][0].value; 
        this.totalesProvisiones.totalProvisionMP = e.summaryCells[18][0].value; 
        this.totalesProvisiones.totalProvisionMD = e.summaryCells[19][0].value; 
        this.totalesProvisiones.totalProvisionAR = e.summaryCells[22][0].value; 
        this.totalesProvisiones.totalProvisionAP = e.summaryCells[23][0].value; 
        this.totalesProvisiones.totalProvisionAD = e.summaryCells[24][0].value; 
        this.totalesProvisiones.totalProvisionMYR = e.summaryCells[27][0].value; ;
        this.totalesProvisiones.totalProvisionMYP = e.summaryCells[28][0].value; ;
        this.totalesProvisiones.totalProvisionMYD = e.summaryCells[29][0].value; ;
        this.totalesProvisiones.totalProvisionJR = e.summaryCells[32][0].value; 
        this.totalesProvisiones.totalProvisionJP = e.summaryCells[33][0].value; 
        this.totalesProvisiones.totalProvisionJD = e.summaryCells[34][0].value; 
        this.totalesProvisiones.totalProvisionJLR = e.summaryCells[37][0].value; ;
        this.totalesProvisiones.totalProvisionJLP = e.summaryCells[38][0].value; ;
        this.totalesProvisiones.totalProvisionJLD = e.summaryCells[39][0].value; ;
        this.totalesProvisiones.totalProvisionAGR = e.summaryCells[42][0].value; ;
        this.totalesProvisiones.totalProvisionAGP = e.summaryCells[43][0].value; ;
        this.totalesProvisiones.totalProvisionAGD = e.summaryCells[44][0].value; ;
        this.totalesProvisiones.totalProvisionSR = e.summaryCells[47][0].value; 
        this.totalesProvisiones.totalProvisionSP = e.summaryCells[48][0].value; 
        this.totalesProvisiones.totalProvisionSD = e.summaryCells[49][0].value; 
        this.totalesProvisiones.totalProvisionOR = e.summaryCells[52][0].value; 
        this.totalesProvisiones.totalProvisionOP = e.summaryCells[53][0].value; 
        this.totalesProvisiones.totalProvisionOD = e.summaryCells[54][0].value; 
        this.totalesProvisiones.totalProvisionNR = e.summaryCells[57][0].value; 
        this.totalesProvisiones.totalProvisionNP = e.summaryCells[58][0].value; 
        this.totalesProvisiones.totalProvisionND = e.summaryCells[59][0].value; 
        this.totalesProvisiones.totalProvisionDR = e.summaryCells[62][0].value; 
        this.totalesProvisiones.totalProvisionDP = e.summaryCells[63][0].value; 
        this.totalesProvisiones.totalProvisionDD = e.summaryCells[64][0].value; 
        this.totalesProvisiones.totalProvisionACR = e.summaryCells[67][0].value; ;
        this.totalesProvisiones.totalProvisionACP = e.summaryCells[68][0].value; ;
        this.totalesProvisiones.totalProvisionACD = e.summaryCells[69][0].value; ;
      }


      //=========================Totales Compania====================================================================

      //TOTAL NIVEL 01
      this.totales.total01ER = this.totales01O.total01OperacionER;
      this.totales.total01EP = this.totales01O.total01OperacionEP;
      this.totales.total01ED = this.totales01O.total01OperacionED;
      this.totales.total01FR = this.totales01O.total01OperacionFR;
      this.totales.total01FP = this.totales01O.total01OperacionFP;
      this.totales.total01FD = this.totales01O.total01OperacionFD;
      this.totales.total01MR = this.totales01O.total01OperacionMR;
      this.totales.total01MP = this.totales01O.total01OperacionMP;
      this.totales.total01MD = this.totales01O.total01OperacionMD;
      this.totales.total01AR = this.totales01O.total01OperacionAR;
      this.totales.total01AP = this.totales01O.total01OperacionAP;
      this.totales.total01AD = this.totales01O.total01OperacionAD;
      this.totales.total01MYR = this.totales01O.total01OperacionMYR;
      this.totales.total01MYP = this.totales01O.total01OperacionMYP;
      this.totales.total01MYD = this.totales01O.total01OperacionMYD;
      this.totales.total01JR = this.totales01O.total01OperacionJR;
      this.totales.total01JP = this.totales01O.total01OperacionJP;
      this.totales.total01JD = this.totales01O.total01OperacionJD;
      this.totales.total01JLR = this.totales01O.total01OperacionJLR;
      this.totales.total01JLP = this.totales01O.total01OperacionJLP;
      this.totales.total01JLD = this.totales01O.total01OperacionJLD;
      this.totales.total01AGR = this.totales01O.total01OperacionAGR;
      this.totales.total01AGP = this.totales01O.total01OperacionAGP;
      this.totales.total01AGD = this.totales01O.total01OperacionAGD;
      this.totales.total01SR = this.totales01O.total01OperacionSR;
      this.totales.total01SP = this.totales01O.total01OperacionSP;
      this.totales.total01SD = this.totales01O.total01OperacionSD;
      this.totales.total01OR = this.totales01O.total01OperacionOR;
      this.totales.total01OP = this.totales01O.total01OperacionOP;
      this.totales.total01OD = this.totales01O.total01OperacionOD;
      this.totales.total01NR = this.totales01O.total01OperacionNR;
      this.totales.total01NP = this.totales01O.total01OperacionNP;
      this.totales.total01ND = this.totales01O.total01OperacionND;
      this.totales.total01DR = this.totales01O.total01OperacionDR;
      this.totales.total01DP = this.totales01O.total01OperacionDP;
      this.totales.total01DD = this.totales01O.total01OperacionDD;
      this.totales.total01ACR = this.totales01O.total01OperacionACR;
      this.totales.total01ACP = this.totales01O.total01OperacionACP;
      this.totales.total01ACD = this.totales01O.total01OperacionACD;

      //TOTALE NIVEL 1 no se ocupa por el momento
      // this.totales.total1ER = this.totalesOperacion.totalOperacionER;
      // this.totales.total1EP = this.totalesOperacion.totalOperacionEP;
      // this.totales.total1ED = this.totalesOperacion.totalOperacionED;
      // this.totales.total1FR = this.totalesOperacion.totalOperacionFR;
      // this.totales.total1FP = this.totalesOperacion.totalOperacionFP;
      // this.totales.total1FD = this.totalesOperacion.totalOperacionFD;
      // this.totales.total1MR = this.totalesOperacion.totalOperacionMR;
      // this.totales.total1MP = this.totalesOperacion.totalOperacionMP;
      // this.totales.total1MD = this.totalesOperacion.totalOperacionMD;
      // this.totales.total1AR = this.totalesOperacion.totalOperacionAR;
      // this.totales.total1AP = this.totalesOperacion.totalOperacionAP;
      // this.totales.total1AD = this.totalesOperacion.totalOperacionAD;
      // this.totales.total1MYR = this.totalesOperacion.totalOperacionMYR;
      // this.totales.total1MYP = this.totalesOperacion.totalOperacionMYP;
      // this.totales.total1MYD = this.totalesOperacion.totalOperacionMYD;
      // this.totales.total1JR = this.totalesOperacion.totalOperacionJR;
      // this.totales.total1JP = this.totalesOperacion.totalOperacionJP;
      // this.totales.total1JD = this.totalesOperacion.totalOperacionJD;
      // this.totales.total1JLR = this.totalesOperacion.totalOperacionJLR;
      // this.totales.total1JLP = this.totalesOperacion.totalOperacionJLP;
      // this.totales.total1JLD = this.totalesOperacion.totalOperacionJLD;
      // this.totales.total1AGR = this.totalesOperacion.totalOperacionAGR;
      // this.totales.total1AGP = this.totalesOperacion.totalOperacionAGP;
      // this.totales.total1AGD = this.totalesOperacion.totalOperacionAGD;
      // this.totales.total1SR = this.totalesOperacion.totalOperacionSR;
      // this.totales.total1SP = this.totalesOperacion.totalOperacionSP;
      // this.totales.total1SD = this.totalesOperacion.totalOperacionSD;
      // this.totales.total1OR = this.totalesOperacion.totalOperacionOR;
      // this.totales.total1OP = this.totalesOperacion.totalOperacionOP;
      // this.totales.total1OD = this.totalesOperacion.totalOperacionOD;
      // this.totales.total1NR = this.totalesOperacion.totalOperacionNR;
      // this.totales.total1NP = this.totalesOperacion.totalOperacionNP;
      // this.totales.total1ND = this.totalesOperacion.totalOperacionND;
      // this.totales.total1DR = this.totalesOperacion.totalOperacionDR;
      // this.totales.total1DP = this.totalesOperacion.totalOperacionDP;
      // this.totales.total1DD = this.totalesOperacion.totalOperacionDD;
      // this.totales.total1ACR = this.totalesOperacion.totalOperacionACR;
      // this.totales.total1ACP = this.totalesOperacion.totalOperacionACP;
      // this.totales.total1ACD = this.totalesOperacion.totalOperacionACD;

      //TOTAL NIVEL 02
      this.totales.total02ER = this.totales02OGO.totalesOGOER;
      this.totales.total02EP = this.totales02OGO.totalesOGOEP;
      this.totales.total02ED = this.totales02OGO.totalesOGOED;
      this.totales.total02FR = this.totales02OGO.totalesOGOFR;
      this.totales.total02FP = this.totales02OGO.totalesOGOFP;
      this.totales.total02FD = this.totales02OGO.totalesOGOFD;
      this.totales.total02MR = this.totales02OGO.totalesOGOMR;
      this.totales.total02MP = this.totales02OGO.totalesOGOMP;
      this.totales.total02MD = this.totales02OGO.totalesOGOMD;
      this.totales.total02AR = this.totales02OGO.totalesOGOAR;
      this.totales.total02AP = this.totales02OGO.totalesOGOAP;
      this.totales.total02AD = this.totales02OGO.totalesOGOAD;
      this.totales.total02MYR = this.totales02OGO.totalesOGOMYR;
      this.totales.total02MYP = this.totales02OGO.totalesOGOMYP;
      this.totales.total02MYD = this.totales02OGO.totalesOGOMYD;
      this.totales.total02JR = this.totales02OGO.totalesOGOJR;
      this.totales.total02JP = this.totales02OGO.totalesOGOJP;
      this.totales.total02JD = this.totales02OGO.totalesOGOJD;
      this.totales.total02JLR = this.totales02OGO.totalesOGOJLR;
      this.totales.total02JLP = this.totales02OGO.totalesOGOJLP;
      this.totales.total02JLD = this.totales02OGO.totalesOGOJLD;
      this.totales.total02AGR = this.totales02OGO.totalesOGOAGR;
      this.totales.total02AGP = this.totales02OGO.totalesOGOAGP;
      this.totales.total02AGD = this.totales02OGO.totalesOGOAGD;
      this.totales.total02SR = this.totales02OGO.totalesOGOSR;
      this.totales.total02SP = this.totales02OGO.totalesOGOSP;
      this.totales.total02SD = this.totales02OGO.totalesOGOSD;
      this.totales.total02OR = this.totales02OGO.totalesOGOOR;
      this.totales.total02OP = this.totales02OGO.totalesOGOOP;
      this.totales.total02OD = this.totales02OGO.totalesOGOOD;
      this.totales.total02NR = this.totales02OGO.totalesOGONR;
      this.totales.total02NP = this.totales02OGO.totalesOGONP;
      this.totales.total02ND = this.totales02OGO.totalesOGOND;
      this.totales.total02DR = this.totales02OGO.totalesOGODR;
      this.totales.total02DP = this.totales02OGO.totalesOGODP;
      this.totales.total02DD = this.totales02OGO.totalesOGODD;
      this.totales.total02ACR = this.totales02OGO.totalesOGOACR;
      this.totales.total02ACP = this.totales02OGO.totalesOGOACP;
      this.totales.total02ACD = this.totales02OGO.totalesOGOACD;

      //TOTAL NIVEL 2 no se ocupa por el momento
      // this.totales.total2ER= this.totalesOtrosGO.totalOGOperacionER;
      // this.totales.total2EP = this.totalesOtrosGO.totalOGOperacionEP;
      // this.totales.total2ED = this.totalesOtrosGO.totalOGOperacionED;
      // this.totales.total2FR = this.totalesOtrosGO.totalOGOperacionFR;
      // this.totales.total2FP = this.totalesOtrosGO.totalOGOperacionFP;
      // this.totales.total2FD = this.totalesOtrosGO.totalOGOperacionFD;
      // this.totales.total2MR = this.totalesOtrosGO.totalOGOperacionMR;
      // this.totales.total2MP = this.totalesOtrosGO.totalOGOperacionMP;
      // this.totales.total2MD = this.totalesOtrosGO.totalOGOperacionMD;
      // this.totales.total2AR = this.totalesOtrosGO.totalOGOperacionAR;
      // this.totales.total2AP = this.totalesOtrosGO.totalOGOperacionAP;
      // this.totales.total2AD = this.totalesOtrosGO.totalOGOperacionAD;
      // this.totales.total2MYR = this.totalesOtrosGO.totalOGOperacionMYR;
      // this.totales.total2MYP = this.totalesOtrosGO.totalOGOperacionMYP;
      // this.totales.total2MYD = this.totalesOtrosGO.totalOGOperacionMYD;
      // this.totales.total2JR = this.totalesOtrosGO.totalOGOperacionJR;
      // this.totales.total2JP = this.totalesOtrosGO.totalOGOperacionJP;
      // this.totales.total2JD = this.totalesOtrosGO.totalOGOperacionJD;
      // this.totales.total2JLR = this.totalesOtrosGO.totalOGOperacionJLR;
      // this.totales.total2JLP = this.totalesOtrosGO.totalOGOperacionJLP;
      // this.totales.total2JLD = this.totalesOtrosGO.totalOGOperacionJLD;
      // this.totales.total2AGR = this.totalesOtrosGO.totalOGOperacionAGR;
      // this.totales.total2AGP = this.totalesOtrosGO.totalOGOperacionAGP;
      // this.totales.total2AGD = this.totalesOtrosGO.totalOGOperacionAGD;
      // this.totales.total2SR = this.totalesOtrosGO.totalOGOperacionSR;
      // this.totales.total2SP = this.totalesOtrosGO.totalOGOperacionSP;
      // this.totales.total2SD = this.totalesOtrosGO.totalOGOperacionSD;
      // this.totales.total2OR = this.totalesOtrosGO.totalOGOperacionOR;
      // this.totales.total2OP = this.totalesOtrosGO.totalOGOperacionOP;
      // this.totales.total2OD = this.totalesOtrosGO.totalOGOperacionOD;
      // this.totales.total2NR = this.totalesOtrosGO.totalOGOperacionNR;
      // this.totales.total2NP = this.totalesOtrosGO.totalOGOperacionNP;
      // this.totales.total2ND = this.totalesOtrosGO.totalOGOperacionND;
      // this.totales.total2DR = this.totalesOtrosGO.totalOGOperacionDR;
      // this.totales.total2DP = this.totalesOtrosGO.totalOGOperacionDP;
      // this.totales.total2DD = this.totalesOtrosGO.totalOGOperacionDD;
      // this.totales.total2ACR = this.totalesOtrosGO.totalOGOperacionACR;
      // this.totales.total2ACP = this.totalesOtrosGO.totalOGOperacionACP;
      // this.totales.total2ACD = this.totalesOtrosGO.totalOGOperacionACD;
      
            //TOTAL NIVEL 03
      this.totales.total3ER = this.totalesOtrosGIE.totalesOGIEER;
      this.totales.total3EP = this.totalesOtrosGIE.totalesOGIEEP;
      this.totales.total3ED = this.totalesOtrosGIE.totalesOGIEED;
      this.totales.total3FR = this.totalesOtrosGIE.totalesOGIEFR;
      this.totales.total3FP = this.totalesOtrosGIE.totalesOGIEFP;
      this.totales.total3FD = this.totalesOtrosGIE.totalesOGIEFD;
      this.totales.total3MR = this.totalesOtrosGIE.totalesOGIEMR;
      this.totales.total3MP = this.totalesOtrosGIE.totalesOGIEMP;
      this.totales.total3MD = this.totalesOtrosGIE.totalesOGIEMD;
      this.totales.total3AR = this.totalesOtrosGIE.totalesOGIEAR;
      this.totales.total3AP = this.totalesOtrosGIE.totalesOGIEAP;
      this.totales.total3AD = this.totalesOtrosGIE.totalesOGIEAD;
      this.totales.total3MYR = this.totalesOtrosGIE.totalesOGIEMYR;
      this.totales.total3MYP = this.totalesOtrosGIE.totalesOGIEMYP;
      this.totales.total3MYD = this.totalesOtrosGIE.totalesOGIEMYD;
      this.totales.total3JR = this.totalesOtrosGIE.totalesOGIEJR;
      this.totales.total3JP = this.totalesOtrosGIE.totalesOGIEJP;
      this.totales.total3JD = this.totalesOtrosGIE.totalesOGIEJD;
      this.totales.total3JLR = this.totalesOtrosGIE.totalesOGIEJLR;
      this.totales.total3JLP = this.totalesOtrosGIE.totalesOGIEJLP;
      this.totales.total3JLD = this.totalesOtrosGIE.totalesOGIEJLD;
      this.totales.total3AGR = this.totalesOtrosGIE.totalesOGIEAGR;
      this.totales.total3AGP = this.totalesOtrosGIE.totalesOGIEAGP;
      this.totales.total3AGD = this.totalesOtrosGIE.totalesOGIEAGD;
      this.totales.total3SR = this.totalesOtrosGIE.totalesOGIESR;
      this.totales.total3SP = this.totalesOtrosGIE.totalesOGIESP;
      this.totales.total3SD = this.totalesOtrosGIE.totalesOGIESD;
      this.totales.total3OR = this.totalesOtrosGIE.totalesOGIEOR;
      this.totales.total3OP = this.totalesOtrosGIE.totalesOGIEOP;
      this.totales.total3OD = this.totalesOtrosGIE.totalesOGIEOD;
      this.totales.total3NR = this.totalesOtrosGIE.totalesOGIENR;
      this.totales.total3NP = this.totalesOtrosGIE.totalesOGIENP;
      this.totales.total3ND = this.totalesOtrosGIE.totalesOGIEND;
      this.totales.total3DR = this.totalesOtrosGIE.totalesOGIEDR;
      this.totales.total3DP = this.totalesOtrosGIE.totalesOGIEDP;
      this.totales.total3DD = this.totalesOtrosGIE.totalesOGIEDD;
      this.totales.total3ACR = this.totalesOtrosGIE.totalesOGIEACR;
      this.totales.total3ACP = this.totalesOtrosGIE.totalesOGIEACP;
      this.totales.total3ACD = this.totalesOtrosGIE.totalesOGIEACD;

            //TOTAL NIVEL 04
      this.totales.total4ER = this.totalesGIF.totalesGIFER;
      this.totales.total4EP = this.totalesGIF.totalesGIFEP;
      this.totales.total4ED = this.totalesGIF.totalesGIFED;
      this.totales.total4FR = this.totalesGIF.totalesGIFFR;
      this.totales.total4FP = this.totalesGIF.totalesGIFFP;
      this.totales.total4FD = this.totalesGIF.totalesGIFFD;
      this.totales.total4MR = this.totalesGIF.totalesGIFMR;
      this.totales.total4MP = this.totalesGIF.totalesGIFMP;
      this.totales.total4MD = this.totalesGIF.totalesGIFMD;
      this.totales.total4AR = this.totalesGIF.totalesGIFAR;
      this.totales.total4AP = this.totalesGIF.totalesGIFAP;
      this.totales.total4AD = this.totalesGIF.totalesGIFAD;
      this.totales.total4MYR = this.totalesGIF.totalesGIFMYR;
      this.totales.total4MYP = this.totalesGIF.totalesGIFMYP;
      this.totales.total4MYD = this.totalesGIF.totalesGIFMYD;
      this.totales.total4JR = this.totalesGIF.totalesGIFJR;
      this.totales.total4JP = this.totalesGIF.totalesGIFJP;
      this.totales.total4JD = this.totalesGIF.totalesGIFJD;
      this.totales.total4JLR = this.totalesGIF.totalesGIFJLR;
      this.totales.total4JLP = this.totalesGIF.totalesGIFJLP;
      this.totales.total4JLD = this.totalesGIF.totalesGIFJLD;
      this.totales.total4AGR = this.totalesGIF.totalesGIFAGR;
      this.totales.total4AGP = this.totalesGIF.totalesGIFAGP;
      this.totales.total4AGD = this.totalesGIF.totalesGIFAGD;
      this.totales.total4SR = this.totalesGIF.totalesGIFSR;
      this.totales.total4SP = this.totalesGIF.totalesGIFSP;
      this.totales.total4SD = this.totalesGIF.totalesGIFSD;
      this.totales.total4OR = this.totalesGIF.totalesGIFOR;
      this.totales.total4OP = this.totalesGIF.totalesGIFOP;
      this.totales.total4OD = this.totalesGIF.totalesGIFOD;
      this.totales.total4NR = this.totalesGIF.totalesGIFNR;
      this.totales.total4NP = this.totalesGIF.totalesGIFNP;
      this.totales.total4ND = this.totalesGIF.totalesGIFND;
      this.totales.total4DR = this.totalesGIF.totalesGIFDR;
      this.totales.total4DP = this.totalesGIF.totalesGIFDP;
      this.totales.total4DD = this.totalesGIF.totalesGIFDD;
      this.totales.total4ACR = this.totalesGIF.totalesGIFACR;
      this.totales.total4ACP = this.totalesGIF.totalesGIFACP;
      this.totales.total4ACD = this.totalesGIF.totalesGIFACD;

            //TOTAL NIVEL 05
      this.totales.total5ER = this.totalesProvisiones.totalProvisionER;
      this.totales.total5EP = this.totalesProvisiones.totalProvisionER;
      this.totales.total5ED = this.totalesProvisiones.totalProvisionEP;
      this.totales.total5FR = this.totalesProvisiones.totalProvisionFR;
      this.totales.total5FP = this.totalesProvisiones.totalProvisionFP;
      this.totales.total5FD = this.totalesProvisiones.totalProvisionFD;
      this.totales.total5MR = this.totalesProvisiones.totalProvisionMR;
      this.totales.total5MP = this.totalesProvisiones.totalProvisionMP;
      this.totales.total5MD = this.totalesProvisiones.totalProvisionMD;
      this.totales.total5AR = this.totalesProvisiones.totalProvisionAR;
      this.totales.total5AP = this.totalesProvisiones.totalProvisionAP;
      this.totales.total5AD = this.totalesProvisiones.totalProvisionAD;
      this.totales.total5MYR = this.totalesProvisiones.totalProvisionMYR;
      this.totales.total5MYP = this.totalesProvisiones.totalProvisionMYP;
      this.totales.total5MYD = this.totalesProvisiones.totalProvisionMYD;
      this.totales.total5JR = this.totalesProvisiones.totalProvisionJR;
      this.totales.total5JP = this.totalesProvisiones.totalProvisionJP;
      this.totales.total5JD = this.totalesProvisiones.totalProvisionJD;
      this.totales.total5JLR = this.totalesProvisiones.totalProvisionJLR;
      this.totales.total5JLP = this.totalesProvisiones.totalProvisionJLP;
      this.totales.total5JLD = this.totalesProvisiones.totalProvisionJLD;
      this.totales.total5AGR = this.totalesProvisiones.totalProvisionAGR;
      this.totales.total5AGP = this.totalesProvisiones.totalProvisionAGP;
      this.totales.total5AGD = this.totalesProvisiones.totalProvisionAGD;
      this.totales.total5SR = this.totalesProvisiones.totalProvisionSR;
      this.totales.total5SP = this.totalesProvisiones.totalProvisionSP;
      this.totales.total5SD = this.totalesProvisiones.totalProvisionSD;
      this.totales.total5OR = this.totalesProvisiones.totalProvisionOR;
      this.totales.total5OP = this.totalesProvisiones.totalProvisionOP;
      this.totales.total5OD = this.totalesProvisiones.totalProvisionOD;
      this.totales.total5NR = this.totalesProvisiones.totalProvisionNR;
      this.totales.total5NP = this.totalesProvisiones.totalProvisionNP;
      this.totales.total5ND = this.totalesProvisiones.totalProvisionND;
      this.totales.total5DR = this.totalesProvisiones.totalProvisionDR;
      this.totales.total5DP = this.totalesProvisiones.totalProvisionDP;
      this.totales.total5DD = this.totalesProvisiones.totalProvisionDD;
      this.totales.total5ACR = this.totalesProvisiones.totalProvisionACR;
      this.totales.total5ACP = this.totalesProvisiones.totalProvisionACP;
      this.totales.total5ACD = this.totalesProvisiones.totalProvisionACD;

            //TOTAL NIVEL 00
      this.totales.totalER = this.totales.total01ER - this.totales.total02ER - this.totales.total3ER - this.totales.total4ER - this.totales.total5ER;
      this.totales.totalEP = this.totales.total01EP - this.totales.total02EP - this.totales.total3EP - this.totales.total4EP - this.totales.total5EP;
      this.totales.totalED = this.totales.total01ED - this.totales.total02ED - this.totales.total3ED - this.totales.total4ED - this.totales.total5ED;
      this.totales.totalFR = this.totales.total01FR - this.totales.total02FR - this.totales.total3FR - this.totales.total4FR - this.totales.total5FR;
      this.totales.totalFP = this.totales.total01FP - this.totales.total02FP - this.totales.total3FP - this.totales.total4FP - this.totales.total5FP;
      this.totales.totalFD = this.totales.total01FD - this.totales.total02FD - this.totales.total3FD - this.totales.total4FD - this.totales.total5FD;
      this.totales.totalMR = this.totales.total01MR - this.totales.total02MR - this.totales.total3MR - this.totales.total4MR - this.totales.total5MR;
      this.totales.totalMP = this.totales.total01MP - this.totales.total02MP - this.totales.total3MP - this.totales.total4MP - this.totales.total5MP;
      this.totales.totalMD = this.totales.total01MD - this.totales.total02MD - this.totales.total3MD - this.totales.total4MD - this.totales.total5MD;
      this.totales.totalAR = this.totales.total01AR - this.totales.total02AR - this.totales.total3AR - this.totales.total4AR - this.totales.total5AR;
      this.totales.totalAP = this.totales.total01AP - this.totales.total02AP - this.totales.total3AP - this.totales.total4AP - this.totales.total5AP;
      this.totales.totalAD = this.totales.total01AD - this.totales.total02AD - this.totales.total3AD - this.totales.total4AD - this.totales.total5AD;
      this.totales.totalMYR = this.totales.total01MYR - this.totales.total02MYR - this.totales.total3MYR - this.totales.total4MYR - this.totales.total5MYR;
      this.totales.totalMYP = this.totales.total01MYP - this.totales.total02MYP - this.totales.total3MYP - this.totales.total4MYP - this.totales.total5MYP;
      this.totales.totalMYD = this.totales.total01MYD - this.totales.total02MYD - this.totales.total3MYD - this.totales.total4MYD - this.totales.total5MYD;
      this.totales.totalJR = this.totales.total01JR - this.totales.total02JR - this.totales.total3JR - this.totales.total4JR - this.totales.total5JR;
      this.totales.totalJP = this.totales.total01JP - this.totales.total02JP - this.totales.total3JP - this.totales.total4JP - this.totales.total5JP;
      this.totales.totalJD = this.totales.total01JD - this.totales.total02JD - this.totales.total3JD - this.totales.total4JD - this.totales.total5JD;
      this.totales.totalJLR = this.totales.total01JLR - this.totales.total02JLR - this.totales.total3JLR - this.totales.total4JLR - this.totales.total5JLR;
      this.totales.totalJLP = this.totales.total01JLP - this.totales.total02JLP - this.totales.total3JLP - this.totales.total4JLP - this.totales.total5JLP;
      this.totales.totalJLD = this.totales.total01JLD - this.totales.total02JLD - this.totales.total3JLD - this.totales.total4JLD - this.totales.total5JLD;
      this.totales.totalAGR = this.totales.total01AGR - this.totales.total02AGR - this.totales.total3AGR - this.totales.total4AGR - this.totales.total5AGR;
      this.totales.totalAGP = this.totales.total01AGP - this.totales.total02AGP - this.totales.total3AGP - this.totales.total4AGP - this.totales.total5AGP;
      this.totales.totalAGD = this.totales.total01AGD - this.totales.total02AGD - this.totales.total3AGD - this.totales.total4AGD - this.totales.total5AGD;
      this.totales.totalSR = this.totales.total01SR - this.totales.total02SR  - this.totales.total3SR - this.totales.total4SR - this.totales.total5SR;
      this.totales.totalSP = this.totales.total01SP - this.totales.total02SP  - this.totales.total3SP - this.totales.total4SP - this.totales.total5SP;
      this.totales.totalSD = this.totales.total01SD - this.totales.total02SD  - this.totales.total3SD - this.totales.total4SD - this.totales.total5SD;
      this.totales.totalOR = this.totales.total01OR - this.totales.total02OR - this.totales.total3OR - this.totales.total4OR - this.totales.total5OR;
      this.totales.totalOP = this.totales.total01OP - this.totales.total02OP - this.totales.total3OP - this.totales.total4OP - this.totales.total5OP;
      this.totales.totalOD = this.totales.total01OD - this.totales.total02OD - this.totales.total3OD - this.totales.total4OD - this.totales.total5OD;
      this.totales.totalNR = this.totales.total01NR - this.totales.total02NR - this.totales.total3NR - this.totales.total4NR - this.totales.total5NR;
      this.totales.totalNP = this.totales.total01NP - this.totales.total02NP - this.totales.total3NP - this.totales.total4NP - this.totales.total5NP;
      this.totales.totalND = this.totales.total01ND - this.totales.total02ND - this.totales.total3ND - this.totales.total4ND - this.totales.total5ND;
      this.totales.totalDR = this.totales.total01DR - this.totales.total02DR - this.totales.total3DR - this.totales.total4DR - this.totales.total5DR;
      this.totales.totalDP = this.totales.total01DP - this.totales.total02DP - this.totales.total3DP - this.totales.total4DP - this.totales.total5DP;
      this.totales.totalDD = this.totales.total01DD - this.totales.total02DD - this.totales.total3DD - this.totales.total4DD - this.totales.total5DD;
      this.totales.totalACR = this.totales.total01ACR - this.totales.total02ACR - this.totales.total3ACR - this.totales.total4ACR - this.totales.total5ACR;
      this.totales.totalACP = this.totales.total01ACP - this.totales.total02ACP - this.totales.total3ACP - this.totales.total4ACP - this.totales.total5ACP;
      this.totales.totalACD = this.totales.total01ACD - this.totales.total02ACD - this.totales.total3ACD - this.totales.total4ACD - this.totales.total5ACD;      

    this.paginacion = 20
    if(this.paginacion = 20){
      this.expandGroup = false
    }




    }

  }
  calcularPorcentajes(options: any) {
    // //
    // if (options.summaryProcess === 'calculate') {
    //   if (options.name === 'grupMargenUtilidaPor') {
    //     options.totalValue = .17;
    //     console.log('📵', options);
    //   }
    // }
  }

  onRowPreparedDetalle(e: any){

  }


  getTPS(){
    let anio = this.selectedAnioTPS;
    let mes = this.selectedMesTPS;
    this.costosAnualesService.getTPS(anio).subscribe(data =>{
      //console.log(data.data)
      
      this.costosFTP = data.data.tpsdto;
      this.costosTPSOccidente = data.data.tpsOccidenteDTO;
      this.costosTPSGolfo = data.data.tpsGolfoDTO;
      this.costosTPSGrafica = data.data.tpsGraficaDTO;

      this.loadingVisible = false;
    })
  }

  buscarClickTPS = (e: any) => {
    if (this.selectedAnioTPS !== 0 && this.selectedMesTPS !== 0) {

      this.loadingVisible = true;
      this.getTPS();
    }else{
      this.isVisible = true;
    }
  };

  onRowPreparedTPS(e: any){


    if (e.rowType == 'data') {
      e.cells.forEach((c: any) => {

        if (c.cellElement) {
          //poner en rojo negativos
          if (c.value && c.value.toString().startsWith('-')) {
            c.cellElement.style.color = "red";
            c.cellElement.style.fontWeight = "bolder";
          }

          //negrita columna margen utilidad
          // if (c.columnIndex == 2  || c.columnIndex == 11) {
          //   c.cellElement.style.fontWeight = "bolder";
          //   c.cellElement.style.fontSize = "14px";
          //   c.cellElement.style.background = "#f5f5f5";
          // }

          //porcentaje de combistuble > .25 en rojo
          // if (c.columnIndex == 16 && c.value >= .25) {
          //   c.cellElement.style.color = "red";
          // }

          if(c.rowIndex == 20 ||
            c.rowIndex == 23){
              c.cellElement.style.fontWeight = "bolder";
              c.cellElement.style.fontSize = "14px";
              c.cellElement.style.color = "black";
            } 

          if (c.rowIndex == 26 || 
            c.rowIndex == 31 ||
            c.rowIndex == 38 ||
            c.rowIndex == 42)
          {
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.fontSize = "14px";
            
          
          c.cellElement.style.background = "#ff9460";
          c.cellElement.style.color = "black";
          }

          if (c.rowIndex == 1 || 
            c.rowIndex == 7 ||
            c.rowIndex == 13 ||
            c.rowIndex == 19 ||
            c.rowIndex == 27 ||
            c.rowIndex == 36 ||
            c.rowIndex == 37 ||
            c.rowIndex == 39 ||
            c.rowIndex == 43 ||
            c.rowIndex == 44)
          {
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.fontSize = "14px";
            
          
          c.cellElement.style.background = "#DCDCDC";
          c.cellElement.style.color = "black";
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


//====================personalize style excel========================================
  customizeCompania(e) {  
    var gridCell = e.gridCell;
    if (gridCell.rowType === 'data') {
      if (gridCell.data.concepto === '1.- Volumen Transportado' ||
          gridCell.data.concepto === '2.- Viajes Realizados' ||
          gridCell.data.concepto === '3.- PRODUCTO NETO' ||
          gridCell.data.concepto === '3.- COSTO DE OPERACION' ||
          gridCell.data.concepto === '5.- OTROS GASTOS DE OPERACION' ||
          gridCell.data.concepto === '6.TOTAL GASTOS Y PRODUCTOS EXTRAORDINARIOS' ||
          gridCell.data.concepto === '7.TOTAL GASTOS Y PRODUCTOS FINAN.' ||
          gridCell.data.concepto === '8. PROVISIONES' ||
          gridCell.data.concepto === '9. FLUJO DE EFECTIVO' ||
          gridCell.data.concepto === '10. FLUJO DE OPERACIÓN') {

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

  customizeRCO(e) {  
    var gridCell = e.gridCell;
    if (gridCell.rowType === 'data') {
      if (gridCell.data.concepto === '1.- Volumen Transportado' ||
          gridCell.data.concepto === '2.- Viajes Realizados' ||
          gridCell.data.concepto === '3.- PRODUCTO NETO' ||
          gridCell.data.concepto === '3.- COSTO DE OPERACION' ||
          gridCell.data.concepto === '5.- OTROS GASTOS DE OPERACION' ||
          gridCell.data.concepto === '6.TOTAL GASTOS Y PRODUCTOS EXTRAORDINARIOS' ||
          gridCell.data.concepto === '7.TOTAL GASTOS Y PRODUCTOS FINAN.' ||
          gridCell.data.concepto === '8. PROVISIONES' ||
          gridCell.data.concepto === '9. FLUJO DE EFECTIVO' ||
          gridCell.data.concepto === '10. FLUJO DE OPERACIÓN') {

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

  customizeGS(e) {  
    var gridCell = e.gridCell;
    if (gridCell.rowType === 'data') {
      if (gridCell.data.concepto === '1.- Volumen Transportado' ||
          gridCell.data.concepto === '2.- Viajes Realizados' ||
          gridCell.data.concepto === '3.- PRODUCTO NETO' ||
          gridCell.data.concepto === '3.- COSTO DE OPERACION' ||
          gridCell.data.concepto === '5.- OTROS GASTOS DE OPERACION' ||
          gridCell.data.concepto === '6.TOTAL GASTOS Y PRODUCTOS EXTRAORDINARIOS' ||
          gridCell.data.concepto === '7.TOTAL GASTOS Y PRODUCTOS FINAN.' ||
          gridCell.data.concepto === '8. PROVISIONES' ||
          gridCell.data.concepto === '9. FLUJO DE EFECTIVO' ||
          gridCell.data.concepto === '10. FLUJO DE OPERACIÓN') {

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

}


