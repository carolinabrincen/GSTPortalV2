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
import { DisponibilidadAnualService } from '../../services/disponibilidadAnual/disponibilidadAnual.service';
import { DisponibilidadMensual, NoOperando, Operando } from 'src/app/shared/models/disponiblidad/disponibilidadMensual.model';

import { DecimalPipe } from '@angular/common';

import notify from 'devextreme/ui/notify';

const totalesPor = new TotalPorcentajes;
const totalesPorGr = new TotalPorcentajes;

const groupName = new Modelos;

@Component({
  templateUrl: './disponiblidadMensual.component.html',
  styleUrls: ['./disponiblidadMensual.component.scss'],
  providers: [UnidadesService, ServiceSales, CurrencyPipe, Service],
})

export class disponibilidadMensualComponent implements OnInit {

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

  meses: any[] = [
    { id: 1, mes: 'ENERO'},
    { id: 2, mes: 'FEBRERO'},
    { id: 3, mes: 'MARZO'},
    { id: 4, mes: 'ABRIL'},
    { id: 5, mes: 'MAYO'},
    { id: 6, mes: 'JUNIO'},
    { id: 7, mes: 'JULIO'},
    { id: 8, mes: 'AGOSTO'},
    { id: 9, mes: 'SEPTIEMBRE'},
    { id: 10, mes: 'OCTUBRE'},
    { id: 11, mes: 'NOVIEMBRE'},
    { id: 12, mes: 'DICIEMBRE'},
  ];

  anio: any[] = [
    { id: 2024, anio:  2024},
    { id: 2025, anio:  2025},
    { id: 2026, anio:  2026},
  ];

  status: any[] = [
    { id: 1, descripcion: 'Ausentismo/Suspendido', disponible: 'No Disponible', status: 'A', tipo: 'Manual' },
    { id: 3, descripcion: 'Baja programada', disponible: 'No Disponible', status: 'A', tipo: 'Manual' },
    { id: 4, descripcion: 'Capacitacion', disponible: 'No Disponible', status: 'A', tipo: 'Manual' },
    { id: 5, descripcion: 'Descanso/Vacaciones', disponible: 'No Disponible', status: 'A', tipo: 'Manual' },
    { id: 6, descripcion: 'Incapacidad', disponible: 'No Disponible', status: 'A', tipo: 'Manual' },
    { id: 7, descripcion: 'Instructor', disponible: 'No Disponible', status: 'A', tipo: 'Manual' },
    { id: 8, descripcion: 'En espera de viaje', disponible: 'Disponible', status: 'A', tipo: 'Automatico' },
    { id: 9, descripcion: 'Operando', disponible: 'Disponible', status: 'A', tipo: 'Automatico' },
    { id: 10, descripcion: 'Disponible (Patio)', disponible: 'Disponible', status: 'A', tipo: 'Mixto' },
    { id: 11, descripcion: 'Taller', disponible: 'No Disponible', status: 'A', tipo: 'Automatico' },
    { id: 12, descripcion: 'Sin Estado', disponible: 'No Disponible', status: 'A', tipo: 'Automatico' },
  ]

  udn: any[] = [
    {idArea: 0, nombre: 'TODOS'},
    {idArea: 1, nombre: 'ORIZABA' },
    {idArea: 2, nombre: 'GUADALAJARA' },
    {idArea: 3, nombre: 'RAMOS ARIZPE' },
    {idArea: 4, nombre: 'MEXICALI' },
    {idArea: 5, nombre: 'HERMOSILLO' },
    {idArea: 8, nombre: 'CUAUTITLAN' },
    {idArea: 9, nombre: 'TULTITLAN' },

  ]

  operaciones: any[] = [
    {id: 0, operacion: 'TODOS'},
    {id: 4, operacion: 'CAJA SECA'},
    {id: 9, operacion: 'ENCORTINADO'},
    {id: 10, operacion: 'GONDOLA'},
    {id: 8, operacion: 'GRADO ALIMENT'},
    {id: 11, operacion: 'TOLVA GRANEL'},
  ];

  estadoTracto: any[] = [
    {siglas: 'TC', estado: 'TC - Tránsito Cargado', color:'#70ad46'},
    {siglas: 'TV', estado: 'TV - Tránsito Vacío', color:'#aad08d'},
    {siglas: 'AU', estado: 'AU - Auxilio', color:'#c7dfb3'},
    {siglas: 'PR', estado: 'PR - Progranado Para Viaje', color:'#4572c6'},
    {siglas: 'TD', estado: 'TD - Espera Viaje', color:'#9bc1e7'},
    {siglas: 'PA', estado: 'PA - Patio Sin Operador', color:'#9cc1e5'},
    {siglas: 'TT', estado: 'TT - Taller', color:'#ffd963'},
    {siglas: 'DV', estado: 'DV - Descanso Vacaciones', color:'#bfbfbf'},
    {siglas: 'IN', estado: 'IN - Incapacidad', color:'#bfbfbf'},
    {siglas: 'TS', estado: 'TS - Siniestrado', color:'#a6a6a6'},
    {siglas: 'BP', estado: 'BP - Baja Progamada', color:'#a6a6a6'},
    
  ]

  selectedMes: number = 0;
  selectedAnio: number = 0;  

  selectedOperacion: number = 0;
  selectedTransporte: number = 0;
  selectedPeriodo: number = 0;
  selectedStatus: number = 0;
  selectedOp: number = 0;
  selectedUdn: number = 0;
  selectedFiltro: string = "";


  printUdn: string = "";

  formFilter: any = {
    Fecha: ''
  }

  disponibilidadMensual: any = [];
  operadorDetalle: any = [];
  unidadDetalle: any =  [];
  tractos: any = [];
  graficaOperador: any = [];
  promedioOpMen: any = [];

  showFilterRow: boolean;
  currentFilter: any;
  applyFilterTypes: any;

  now: Date = new Date();

  formCierre: any = {
    id: "",
    operador: "",
    udN: "",
    tipoOperacion: "",
  }

  formUnidad: any = {
    tracto: "",
    remolque1: "",
    remolque2: "",
    udN: "",
    tipoOperacion: "",
  }
  bolFormSoloLectura = false;

  pipe = new DecimalPipe('es-MX');

  constructor(
    private disponibilidadService: DisponibilidadAnualService,
    private service: ServiceSales,
    private currencyPipe: CurrencyPipe,
    testService: Service
  ) {

    this.customizeTooltip = this.customizeTooltip.bind(this);
    this.calcularPorcentajes = this.calcularPorcentajes.bind(this);
    this.formFilter
    this.showFilterRow = true;

    this.applyFilterTypes = [{
      key: 'auto',
      name: 'Immediately',
    }, {
      key: 'onClick',
      name: 'On Button Click',
    }];

    this.currentFilter = this.applyFilterTypes[0].key;
  }

  ngOnInit(): void {
    // this.getDisponiblidadAnual();
  }

  getDisponiblidadMensual() {
    this.disponibilidadMensual = [];
    this.disponibilidadService.postDisponiblidadMensual(this.selectedMes, this.selectedAnio, this.selectedUdn, this.selectedOp).subscribe((response) => {
      this.disponibilidadMensual = response.data.disponiblidadMensualDTO;

      
      let myOperador = response.data.graficaPastel;
        let myOperandos = [
          {operador: myOperador.operando, value: 'Operando'},
          {operador: myOperador.noOperando, value: 'SinViaje/Programado'}
        ]
        this.graficaOperador = myOperandos;

      let myPromedio = [
        {promedio: myOperador.promOperando, value: 'Operando'},
        {promedio: myOperador.promNoOperando, value: 'SinViaje/ Programado'},
        {promedio: myOperador.promTotal, value: 'Total Disponibles'},
        {promedio: myOperador.promTotal, value: 'Disponible'},
        {promedio: myOperador.promNoDisponible, value: 'No Disponible'},
        {promedio: myOperador.promTotalT, value: 'Total'},
      ]  
        this.promedioOpMen = myPromedio;
       // console.log(this.graficaOperador)
      

      // this.graficaOperador.push(response.data.graficaPastel);
      // console.log(this.graficaOperador)
      
      this.loadingVisible = false

    });
  }

  getTracto() {
    this.tractos = []
    let siglas = ""
    this.disponibilidadService.postTracto(this.selectedAnio, this.selectedMes, this.selectedUdn, this.selectedOp, siglas).subscribe((response) => {
      this.tractos = response.data.mes;
      console.log(this.tractos)
      this.loadingVisible = false

    });
  }

  getFiltro() {
    this.tractos = []
    
    this.disponibilidadService.postTracto(this.selectedAnio, this.selectedMes, this.selectedUdn, this.selectedOp, this.selectedFiltro).subscribe((response) => {
      this.tractos = response.data.mes;
      console.log(this.tractos)
      this.loadingVisible = false

    });
  }

  /*======================SELECTE FUNCIONS================================================*/
  selectMes(value: any) {
    this.selectedMes = value.value;
    console.log(this.selectedMes)
  }
  selectAnio(value: any) {
    this.selectedAnio = value.value;
  }
  selectUdn(value: any) {
    this.selectedUdn = value.value;
  }
  selectOpe(value: any) {
    this.selectedOp = value.value;
  }
  selectOperacion(value: any) {
    this.selectedOperacion = value.value
    console.log(this.selectedOperacion)
  }
  selectStatus(value: any) {
    this.selectedStatus = value.value;
    console.log(value)
  }

  selectFiltro(value: any) {
    this.selectedFiltro = value.value;
    console.log(this.selectedFiltro)
  }

  blurStatus(value: any) {
    console.log(value)
    this.status.forEach(element => {
      if (element.id === this.selectedStatus) {
        value.data.descripcionStManual = element.descripcion;

      }
    });
  }
  /*========================Guardar Status Manual=========================================*/

  saveStatusManual(value) {
    let myValue = value.data
    let myIdUser = sessionStorage.getItem('idUsuario')

    // if(myValue.inicio !== null && myValue.fin !== null){
    // if(myValue.inicio == null){
    //   myValue.inicio = "";
    // }
    // if(myValue.fin == null){
    //   myValue.fin = "";
    // }

    // if(myValue.observaciones == null){
    //   myValue.observaciones = "";
    // }
    this.loadingVisible = true;

    this.disponibilidadService.postStatusManual(myValue.id_personal, this.selectedStatus, myIdUser, myValue.inicio, myValue.fin, myValue.observaciones).subscribe(data => {
      console.log(data)
      this.getDisponiblidadMensual()

      notify({
        message: data.data,
        position: {
          my: 'center center',
          at: 'center center',
        },
      }, 'success', 4000);
    })
    // }else{
    //   notify({
    //     message: 'Falta datos por seleccionar o confirmar',
    //     position: {
    //       my: 'center center',
    //       at: 'center center',
    //     },
    //   }, 'warning', 3000);
    // }

  }
  /*========================Guardar Tipo Operacion Operador=========================================*/
  saveTipoOperacionOper(value) {
    let myValue = value.data
    let myIdUser = sessionStorage.getItem('idUsuario')

    this.loadingVisible = true;

    this.disponibilidadService.postTipoOperacionOpe(myValue.id_personal, this.selectedOperacion, myIdUser).subscribe(data => {
      console.log(data)

      notify({
        message: data.data,
        position: {
          my: 'center center',
          at: 'center center',
        },
      }, 'success', 4000);
    })
  }

  buscarClick = (e: any) => {
     if (this.selectedMes !== undefined && this.selectedAnio !== undefined && this.selectedUdn !== undefined && this.selectedOp !== undefined) {
      this.loadingVisible = true;
      
      this.getDisponiblidadMensual();
      this.getTracto();
     }
      // }else{
      //   notify({
      //     message: "Debe seleccionar la Fecha",
      //     position: {
      //       my: 'top center',
      //       at: 'top center',
      //     },
      //   }, 'warning', 4000);
      // }
  };
  
  buscarFiltro = (e: any) => {
     if (this.selectedMes !== undefined && this.selectedAnio !== undefined && this.selectedUdn !== undefined && this.selectedOp !== undefined && this.selectedFiltro !== "") {
      this.loadingVisible = true;
      
      this.getFiltro();
     }
  };

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

  print() {
    this.chart.instance.print();
  }
  export() {
    this.chart.instance.exportTo('Example', 'png');
  }

  onRowPreparedT(e: any) {
    if (e.rowType == 'data') {

      e.cells.forEach((c: any) => {

        if (c.cellElement) {
          if(c.columnIndex == 4){
            if (c.data.dia1 == "PC"){
              c.cellElement.style.background = "#fed966";
            }
            if (c.data.dia1 == "EC") {
              c.cellElement.style.background = "#fb0000";
            }
            if (c.data.dia1 == "TC") {
              c.cellElement.style.background = "#70ad46";
            }
            if (c.data.dia1 == "ED") {
              c.cellElement.style.background = "#012060";
            }
            if (c.data.dia1 == "TV") {
              c.cellElement.style.background = "#aad08d";
            }
            if (c.data.dia1 == "TT") {
              c.cellElement.style.background = "#ffd963";
            }
            if (c.data.dia1 == "D") {
              c.cellElement.style.background = "#fffafaff";
            }
            if (c.data.dia1 == "V") {
              c.cellElement.style.background = "#cdcbcb";
            }
            if (c.data.dia1 == "P") {
              c.cellElement.style.background = "#fcc6c6";
            }
            if (c.data.dia1 == "A") {
              c.cellElement.style.background = "#fffdfdff";
            }
            if (c.data.dia1 == "TD") {
              c.cellElement.style.background = "#9bc1e7";
            }
            if (c.data.dia1 == "DV") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia1 == "PA") {
              c.cellElement.style.background = "#9cc1e5";
            }
            if (c.data.dia1 == "PR") {
              c.cellElement.style.background = "#4572c6";
            }
            if (c.data.dia1 == "AU") {
              c.cellElement.style.background = "#c7dfb3";
            }
            if (c.data.dia1 == "IN") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia1 == "TS") {
              c.cellElement.style.background = "#a6a6a6";
            }
          }
          if(c.columnIndex == 5){
            if (c.data.dia2 == "PC"){
              c.cellElement.style.background = "#fed966";
            }
            if (c.data.dia2 == "EC") {
              c.cellElement.style.background = "#fb0000";
            }
            if (c.data.dia2 == "TC") {
              c.cellElement.style.background = "#70ad46";
            }
            if (c.data.dia2 == "ED") {
              c.cellElement.style.background = "#012060";
            }
            if (c.data.dia2 == "TV") {
              c.cellElement.style.background = "#aad08d";
            }
            if (c.data.dia2 == "TT") {
              c.cellElement.style.background = "#ffd963";
            }
            if (c.data.dia2 == "D") {
              c.cellElement.style.background = "#fffafaff";
            }
            if (c.data.dia2 == "V") {
              c.cellElement.style.background = "#cdcbcb";
            }
            if (c.data.dia2 == "P") {
              c.cellElement.style.background = "#fcc6c6";
            }
            if (c.data.dia2 == "A") {
              c.cellElement.style.background = "#fffdfdff";
            }
            if (c.data.dia2 == "TD") {
              c.cellElement.style.background = "#9bc1e7";
            }
            if (c.data.dia2 == "DV") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia2 == "PA") {
              c.cellElement.style.background = "#9cc1e5";
            }
            if (c.data.dia2 == "PR") {
              c.cellElement.style.background = "#4572c6";
            }
            if (c.data.dia2 == "AU") {
              c.cellElement.style.background = "#c7dfb3";
            }
            if (c.data.dia2 == "IN") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia2 == "TS") {
              c.cellElement.style.background = "#a6a6a6";
            }
          }
          if(c.columnIndex == 6){
            if (c.data.dia3 == "PC"){
              c.cellElement.style.background = "#fed966";
            }
            if (c.data.dia3 == "EC") {
              c.cellElement.style.background = "#fb0000";
            }
            if (c.data.dia3 == "TC") {
              c.cellElement.style.background = "#70ad46";
            }
            if (c.data.dia3 == "ED") {
              c.cellElement.style.background = "#012060";
            }
            if (c.data.dia3 == "TV") {
              c.cellElement.style.background = "#aad08d";
            }
            if (c.data.dia3 == "TT") {
              c.cellElement.style.background = "#ffd963";
            }
            if (c.data.dia3 == "D") {
              c.cellElement.style.background = "#fffafaff";
            }
            if (c.data.dia3 == "V") {
              c.cellElement.style.background = "#cdcbcb";
            }
            if (c.data.dia3 == "P") {
              c.cellElement.style.background = "#fcc6c6";
            }
            if (c.data.dia3 == "A") {
              c.cellElement.style.background = "#fffdfdff";
            }
            if (c.data.dia3 == "TD") {
              c.cellElement.style.background = "#9bc1e7";
            }
            if (c.data.dia3 == "DV") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia3 == "PA") {
              c.cellElement.style.background = "#9cc1e5";
            }
            if (c.data.dia3 == "PR") {
              c.cellElement.style.background = "#4572c6";
            }
            if (c.data.dia3 == "AU") {
              c.cellElement.style.background = "#c7dfb3";
            }
            if (c.data.dia3 == "IN") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia3 == "TS") {
              c.cellElement.style.background = "#a6a6a6";
            }
          }
          if(c.columnIndex == 7){
            if (c.data.dia4 == "PC"){
              c.cellElement.style.background = "#fed966";
            }
            if (c.data.dia4 == "EC") {
              c.cellElement.style.background = "#fb0000";
            }
            if (c.data.dia4 == "TC") {
              c.cellElement.style.background = "#70ad46";
            }
            if (c.data.dia4 == "ED") {
              c.cellElement.style.background = "#012060";
            }
            if (c.data.dia4 == "TV") {
              c.cellElement.style.background = "#aad08d";
            }
            if (c.data.dia4 == "TT") {
              c.cellElement.style.background = "#ffd963";
            }
            if (c.data.dia4 == "D") {
              c.cellElement.style.background = "#fffafaff";
            }
            if (c.data.dia4 == "V") {
              c.cellElement.style.background = "#cdcbcb";
            }
            if (c.data.dia4 == "P") {
              c.cellElement.style.background = "#fcc6c6";
            }
            if (c.data.dia4 == "A") {
              c.cellElement.style.background = "#fffdfdff";
            }
            if (c.data.dia4 == "TD") {
              c.cellElement.style.background = "#9bc1e7";
            }
            if (c.data.dia4 == "DV") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia4 == "PA") {
              c.cellElement.style.background = "#9cc1e5";
            }
            if (c.data.dia4 == "PR") {
              c.cellElement.style.background = "#4572c6";
            }
            if (c.data.dia4 == "AU") {
              c.cellElement.style.background = "#c7dfb3";
            }
            if (c.data.dia4 == "IN") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia4 == "TS") {
              c.cellElement.style.background = "#a6a6a6";
            }
          }
          if(c.columnIndex == 8){
            if (c.data.dia5 == "PC"){
              c.cellElement.style.background = "#fed966";
            }
            if (c.data.dia5 == "EC") {
              c.cellElement.style.background = "#fb0000";
            }
            if (c.data.dia5 == "TC") {
              c.cellElement.style.background = "#70ad46";
            }
            if (c.data.dia5 == "ED") {
              c.cellElement.style.background = "#012060";
            }
            if (c.data.dia5 == "TV") {
              c.cellElement.style.background = "#aad08d";
            }
            if (c.data.dia5 == "TT") {
              c.cellElement.style.background = "#ffd963";
            }
            if (c.data.dia5 == "D") {
              c.cellElement.style.background = "#fffafaff";
            }
            if (c.data.dia5 == "V") {
              c.cellElement.style.background = "#cdcbcb";
            }
            if (c.data.dia5 == "P") {
              c.cellElement.style.background = "#fcc6c6";
            }
            if (c.data.dia5 == "A") {
              c.cellElement.style.background = "#fffdfdff";
            }
            if (c.data.dia5 == "TD") {
              c.cellElement.style.background = "#9bc1e7";
            }
            if (c.data.dia5 == "DV") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia5 == "PA") {
              c.cellElement.style.background = "#9cc1e5";
            }
            if (c.data.dia5 == "PR") {
              c.cellElement.style.background = "#4572c6";
            }
            if (c.data.dia5 == "AU") {
              c.cellElement.style.background = "#c7dfb3";
            }
            if (c.data.dia5 == "IN") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia5 == "TS") {
              c.cellElement.style.background = "#a6a6a6";
            }
          }
          if(c.columnIndex == 9){
            if (c.data.dia6 == "PC"){
              c.cellElement.style.background = "#fed966";
            }
            if (c.data.dia6 == "EC") {
              c.cellElement.style.background = "#fb0000";
            }
            if (c.data.dia6 == "TC") {
              c.cellElement.style.background = "#70ad46";
            }
            if (c.data.dia6 == "ED") {
              c.cellElement.style.background = "#012060";
            }
            if (c.data.dia6 == "TV") {
              c.cellElement.style.background = "#aad08d";
            }
            if (c.data.dia6 == "TT") {
              c.cellElement.style.background = "#ffd963";
            }
            if (c.data.dia6 == "D") {
              c.cellElement.style.background = "#fffafaff";
            }
            if (c.data.dia6 == "V") {
              c.cellElement.style.background = "#cdcbcb";
            }
            if (c.data.dia6 == "P") {
              c.cellElement.style.background = "#fcc6c6";
            }
            if (c.data.dia6 == "A") {
              c.cellElement.style.background = "#fffdfdff";
            }
            if (c.data.dia6 == "TD") {
              c.cellElement.style.background = "#9bc1e7";
            }
            if (c.data.dia6 == "DV") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia6 == "PA") {
              c.cellElement.style.background = "#9cc1e5";
            }
            if (c.data.dia6 == "PR") {
              c.cellElement.style.background = "#4572c6";
            }
            if (c.data.dia6 == "AU") {
              c.cellElement.style.background = "#c7dfb3";
            }
            if (c.data.dia6 == "IN") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia6 == "TS") {
              c.cellElement.style.background = "#a6a6a6";
            }
          }
          if(c.columnIndex == 10){
            if (c.data.dia7 == "PC"){
              c.cellElement.style.background = "#fed966";
            }
            if (c.data.dia7 == "EC") {
              c.cellElement.style.background = "#fb0000";
            }
            if (c.data.dia7 == "TC") {
              c.cellElement.style.background = "#70ad46";
            }
            if (c.data.dia7 == "ED") {
              c.cellElement.style.background = "#012060";
            }
            if (c.data.dia7 == "TV") {
              c.cellElement.style.background = "#aad08d";
            }
            if (c.data.dia7 == "TT") {
              c.cellElement.style.background = "#ffd963";
            }
            if (c.data.dia7 == "D") {
              c.cellElement.style.background = "#fffafaff";
            }
            if (c.data.dia7 == "V") {
              c.cellElement.style.background = "#cdcbcb";
            }
            if (c.data.dia7 == "P") {
              c.cellElement.style.background = "#fcc6c6";
            }
            if (c.data.dia7 == "A") {
              c.cellElement.style.background = "#fffdfdff";
            }
           if (c.data.dia7 == "TD") {
              c.cellElement.style.background = "#9bc1e7";
            }
            if (c.data.dia7 == "DV") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia7 == "PA") {
              c.cellElement.style.background = "#9cc1e5";
            }
            if (c.data.dia7 == "PR") {
              c.cellElement.style.background = "#4572c6";
            }
            if (c.data.dia7 == "AU") {
              c.cellElement.style.background = "#c7dfb3";
            }
            if (c.data.dia7 == "IN") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia7 == "TS") {
              c.cellElement.style.background = "#a6a6a6";
            }
          }
          if(c.columnIndex == 11){
            if (c.data.dia8 == "PC"){
              c.cellElement.style.background = "#fed966";
            }
            if (c.data.dia8 == "EC") {
              c.cellElement.style.background = "#fb0000";
            }
            if (c.data.dia8 == "TC") {
              c.cellElement.style.background = "#70ad46";
            }
            if (c.data.dia8 == "ED") {
              c.cellElement.style.background = "#012060";
            }
            if (c.data.dia8 == "TV") {
              c.cellElement.style.background = "#aad08d";
            }
            if (c.data.dia8 == "TT") {
              c.cellElement.style.background = "#ffd963";
            }
            if (c.data.dia8 == "D") {
              c.cellElement.style.background = "#fffafaff";
            }
            if (c.data.dia8 == "V") {
              c.cellElement.style.background = "#cdcbcb";
            }
            if (c.data.dia8 == "P") {
              c.cellElement.style.background = "#fcc6c6";
            }
            if (c.data.dia8 == "A") {
              c.cellElement.style.background = "#fffdfdff";
            }
            if (c.data.dia8 == "TD") {
              c.cellElement.style.background = "#9bc1e7";
            }
            if (c.data.dia8 == "DV") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia8 == "PA") {
              c.cellElement.style.background = "#9cc1e5";
            }
            if (c.data.dia8 == "PR") {
              c.cellElement.style.background = "#4572c6";
            }
            if (c.data.dia8 == "AU") {
              c.cellElement.style.background = "#c7dfb3";
            }
            if (c.data.dia8 == "IN") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia8 == "TS") {
              c.cellElement.style.background = "#a6a6a6";
            }
          }
          if(c.columnIndex == 12){
            if (c.data.dia9 == "PC"){
              c.cellElement.style.background = "#fed966";
            }
            if (c.data.dia9 == "EC") {
              c.cellElement.style.background = "#fb0000";
            }
            if (c.data.dia9 == "TC") {
              c.cellElement.style.background = "#70ad46";
            }
            if (c.data.dia9 == "ED") {
              c.cellElement.style.background = "#012060";
            }
            if (c.data.dia9 == "TV") {
              c.cellElement.style.background = "#aad08d";
            }
            if (c.data.dia9 == "TT") {
              c.cellElement.style.background = "#ffd963";
            }
            if (c.data.dia9 == "D") {
              c.cellElement.style.background = "#fffafaff";
            }
            if (c.data.dia9 == "V") {
              c.cellElement.style.background = "#cdcbcb";
            }
            if (c.data.dia9 == "P") {
              c.cellElement.style.background = "#fcc6c6";
            }
            if (c.data.dia9 == "A") {
              c.cellElement.style.background = "#fffdfdff";
            }
            if (c.data.dia9 == "TD") {
              c.cellElement.style.background = "#9bc1e7";
            }
            if (c.data.dia9 == "DV") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia9 == "PA") {
              c.cellElement.style.background = "#9cc1e5";
            }
            if (c.data.dia9 == "PR") {
              c.cellElement.style.background = "#4572c6";
            }
            if (c.data.dia9 == "AU") {
              c.cellElement.style.background = "#c7dfb3";
            }
            if (c.data.dia9 == "IN") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia9 == "TS") {
              c.cellElement.style.background = "#a6a6a6";
            }
          }
          if(c.columnIndex == 13){
            if (c.data.dia10 == "PC"){
              c.cellElement.style.background = "#fed966";
            }
            if (c.data.dia10 == "EC") {
              c.cellElement.style.background = "#fb0000";
            }
            if (c.data.dia10 == "TC") {
              c.cellElement.style.background = "#70ad46";
            }
            if (c.data.dia10 == "ED") {
              c.cellElement.style.background = "#012060";
            }
            if (c.data.dia10 == "TV") {
              c.cellElement.style.background = "#aad08d";
            }
            if (c.data.dia10 == "TT") {
              c.cellElement.style.background = "#ffd963";
            }
            if (c.data.dia10 == "D") {
              c.cellElement.style.background = "#fffafaff";
            }
            if (c.data.dia10 == "V") {
              c.cellElement.style.background = "#cdcbcb";
            }
            if (c.data.dia10 == "P") {
              c.cellElement.style.background = "#fcc6c6";
            }
            if (c.data.dia10 == "A") {
              c.cellElement.style.background = "#fffdfdff";
            }
           if (c.data.dia10 == "TD") {
              c.cellElement.style.background = "#9bc1e7";
            }
            if (c.data.dia10 == "DV") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia10 == "PA") {
              c.cellElement.style.background = "#9cc1e5";
            }
            if (c.data.dia10 == "PR") {
              c.cellElement.style.background = "#4572c6";
            }
            if (c.data.dia10 == "AU") {
              c.cellElement.style.background = "#c7dfb3";
            }
            if (c.data.dia10 == "IN") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia10 == "TS") {
              c.cellElement.style.background = "#a6a6a6";
            }
          }
          if(c.columnIndex == 14){
            if (c.data.dia11 == "PC"){
              c.cellElement.style.background = "#fed966";
            }
            if (c.data.dia11 == "EC") {
              c.cellElement.style.background = "#fb0000";
            }
            if (c.data.dia11 == "TC") {
              c.cellElement.style.background = "#70ad46";
            }
            if (c.data.dia11 == "ED") {
              c.cellElement.style.background = "#012060";
            }
            if (c.data.dia11 == "TV") {
              c.cellElement.style.background = "#aad08d";
            }
            if (c.data.dia11 == "TT") {
              c.cellElement.style.background = "#ffd963";
            }
            if (c.data.dia11 == "D") {
              c.cellElement.style.background = "#fffafaff";
            }
            if (c.data.dia11 == "V") {
              c.cellElement.style.background = "#cdcbcb";
            }
            if (c.data.dia11 == "P") {
              c.cellElement.style.background = "#fcc6c6";
            }
            if (c.data.dia11 == "A") {
              c.cellElement.style.background = "#fffdfdff";
            }
            if (c.data.dia11 == "TD") {
              c.cellElement.style.background = "#9bc1e7";
            }
            if (c.data.dia11 == "DV") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia11 == "PA") {
              c.cellElement.style.background = "#9cc1e5";
            }
            if (c.data.dia11 == "PR") {
              c.cellElement.style.background = "#4572c6";
            }
            if (c.data.dia11 == "AU") {
              c.cellElement.style.background = "#c7dfb3";
            }
            if (c.data.dia11 == "IN") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia11 == "TS") {
              c.cellElement.style.background = "#a6a6a6";
            }
          }
          if(c.columnIndex == 15){
            if (c.data.dia12 == "PC"){
              c.cellElement.style.background = "#fed966";
            }
            if (c.data.dia12 == "EC") {
              c.cellElement.style.background = "#fb0000";
            }
            if (c.data.dia12 == "TC") {
              c.cellElement.style.background = "#70ad46";
            }
            if (c.data.dia12 == "ED") {
              c.cellElement.style.background = "#012060";
            }
            if (c.data.dia12 == "TV") {
              c.cellElement.style.background = "#aad08d";
            }
            if (c.data.dia12 == "TT") {
              c.cellElement.style.background = "#ffd963";
            }
            if (c.data.dia12 == "D") {
              c.cellElement.style.background = "#fffafaff";
            }
            if (c.data.dia12 == "V") {
              c.cellElement.style.background = "#cdcbcb";
            }
            if (c.data.dia12 == "P") {
              c.cellElement.style.background = "#fcc6c6";
            }
            if (c.data.dia12 == "A") {
              c.cellElement.style.background = "#fffdfdff";
            }
            if (c.data.dia12 == "TD") {
              c.cellElement.style.background = "#9bc1e7";
            }
            if (c.data.dia12 == "DV") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia12 == "PA") {
              c.cellElement.style.background = "#9cc1e5";
            }
            if (c.data.dia12 == "PR") {
              c.cellElement.style.background = "#4572c6";
            }
            if (c.data.dia12 == "AU") {
              c.cellElement.style.background = "#c7dfb3";
            }
            if (c.data.dia12 == "IN") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia12 == "TS") {
              c.cellElement.style.background = "#a6a6a6";
            }
          }
          if(c.columnIndex == 16){
            if (c.data.dia13 == "PC"){
              c.cellElement.style.background = "#fed966";
            }
            if (c.data.dia13 == "EC") {
              c.cellElement.style.background = "#fb0000";
            }
            if (c.data.dia13 == "TC") {
              c.cellElement.style.background = "#70ad46";
            }
            if (c.data.dia13 == "ED") {
              c.cellElement.style.background = "#012060";
            }
            if (c.data.dia13 == "TV") {
              c.cellElement.style.background = "#aad08d";
            }
            if (c.data.dia13 == "TT") {
              c.cellElement.style.background = "#ffd963";
            }
            if (c.data.dia13 == "D") {
              c.cellElement.style.background = "#fffafaff";
            }
            if (c.data.dia13 == "V") {
              c.cellElement.style.background = "#cdcbcb";
            }
            if (c.data.dia13 == "P") {
              c.cellElement.style.background = "#fcc6c6";
            }
            if (c.data.dia13 == "A") {
              c.cellElement.style.background = "#fffdfdff";
            }
            if (c.data.dia13 == "TD") {
              c.cellElement.style.background = "#9bc1e7";
            }
            if (c.data.dia13 == "DV") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia13 == "PA") {
              c.cellElement.style.background = "#9cc1e5";
            }
            if (c.data.dia13 == "PR") {
              c.cellElement.style.background = "#4572c6";
            }
            if (c.data.dia13 == "AU") {
              c.cellElement.style.background = "#c7dfb3";
            }
            if (c.data.dia13 == "IN") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia13 == "TS") {
              c.cellElement.style.background = "#a6a6a6";
            }
          }
          if(c.columnIndex == 17){
            if (c.data.dia14 == "PC"){
              c.cellElement.style.background = "#fed966";
            }
            if (c.data.dia14 == "EC") {
              c.cellElement.style.background = "#fb0000";
            }
            if (c.data.dia14 == "TC") {
              c.cellElement.style.background = "#70ad46";
            }
            if (c.data.dia14 == "ED") {
              c.cellElement.style.background = "#012060";
            }
            if (c.data.dia14 == "TV") {
              c.cellElement.style.background = "#aad08d";
            }
            if (c.data.dia14 == "TT") {
              c.cellElement.style.background = "#ffd963";
            }
            if (c.data.dia14 == "D") {
              c.cellElement.style.background = "#fffafaff";
            }
            if (c.data.dia14 == "V") {
              c.cellElement.style.background = "#cdcbcb";
            }
            if (c.data.dia14 == "P") {
              c.cellElement.style.background = "#fcc6c6";
            }
            if (c.data.dia14 == "A") {
              c.cellElement.style.background = "#fffdfdff";
            }
            if (c.data.dia14 == "TD") {
              c.cellElement.style.background = "#9bc1e7";
            }
            if (c.data.dia14 == "DV") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia14 == "PA") {
              c.cellElement.style.background = "#9cc1e5";
            }
            if (c.data.dia14 == "PR") {
              c.cellElement.style.background = "#4572c6";
            }
            if (c.data.dia14 == "AU") {
              c.cellElement.style.background = "#c7dfb3";
            }
            if (c.data.dia14 == "IN") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia14 == "TS") {
              c.cellElement.style.background = "#a6a6a6";
            }
          }
          if(c.columnIndex == 18){
            if (c.data.dia15 == "PC"){
              c.cellElement.style.background = "#fed966";
            }
            if (c.data.dia15 == "EC") {
              c.cellElement.style.background = "#fb0000";
            }
            if (c.data.dia15 == "TC") {
              c.cellElement.style.background = "#70ad46";
            }
            if (c.data.dia15 == "ED") {
              c.cellElement.style.background = "#012060";
            }
            if (c.data.dia15 == "TV") {
              c.cellElement.style.background = "#aad08d";
            }
            if (c.data.dia15 == "TT") {
              c.cellElement.style.background = "#ffd963";
            }
            if (c.data.dia15 == "D") {
              c.cellElement.style.background = "#fffafaff";
            }
            if (c.data.dia15 == "V") {
              c.cellElement.style.background = "#cdcbcb";
            }
            if (c.data.dia15 == "P") {
              c.cellElement.style.background = "#fcc6c6";
            }
            if (c.data.dia15 == "A") {
              c.cellElement.style.background = "#fffdfdff";
            }
           if (c.data.dia15 == "TD") {
              c.cellElement.style.background = "#9bc1e7";
            }
            if (c.data.dia15 == "DV") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia15 == "PA") {
              c.cellElement.style.background = "#9cc1e5";
            }
            if (c.data.dia15 == "PR") {
              c.cellElement.style.background = "#4572c6";
            }
            if (c.data.dia15 == "AU") {
              c.cellElement.style.background = "#c7dfb3";
            }
            if (c.data.dia15 == "IN") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia15 == "TS") {
              c.cellElement.style.background = "#a6a6a6";
            }
          }
          if(c.columnIndex == 19){
            if (c.data.dia16 == "PC"){
              c.cellElement.style.background = "#fed966";
            }
            if (c.data.dia16 == "EC") {
              c.cellElement.style.background = "#fb0000";
            }
            if (c.data.dia16 == "TC") {
              c.cellElement.style.background = "#70ad46";
            }
            if (c.data.dia16 == "ED") {
              c.cellElement.style.background = "#012060";
            }
            if (c.data.dia16 == "TV") {
              c.cellElement.style.background = "#aad08d";
            }
            if (c.data.dia16 == "TT") {
              c.cellElement.style.background = "#ffd963";
            }
            if (c.data.dia16 == "D") {
              c.cellElement.style.background = "#fffafaff";
            }
            if (c.data.dia16 == "V") {
              c.cellElement.style.background = "#cdcbcb";
            }
            if (c.data.dia16 == "P") {
              c.cellElement.style.background = "#fcc6c6";
            }
            if (c.data.dia16 == "A") {
              c.cellElement.style.background = "#fffdfdff";
            }
            if (c.data.dia16 == "TD") {
              c.cellElement.style.background = "#9bc1e7";
            }
            if (c.data.dia16 == "DV") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia16 == "PA") {
              c.cellElement.style.background = "#9cc1e5";
            }
            if (c.data.dia16 == "PR") {
              c.cellElement.style.background = "#4572c6";
            }
            if (c.data.dia16 == "AU") {
              c.cellElement.style.background = "#c7dfb3";
            }
            if (c.data.dia16 == "IN") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia16 == "TS") {
              c.cellElement.style.background = "#a6a6a6";
            }
          }
          if(c.columnIndex == 20){
            if (c.data.dia17 == "PC"){
              c.cellElement.style.background = "#fed966";
            }
            if (c.data.dia17 == "EC") {
              c.cellElement.style.background = "#fb0000";
            }
            if (c.data.dia17 == "TC") {
              c.cellElement.style.background = "#70ad46";
            }
            if (c.data.dia17 == "ED") {
              c.cellElement.style.background = "#012060";
            }
            if (c.data.dia17 == "TV") {
              c.cellElement.style.background = "#aad08d";
            }
            if (c.data.dia17 == "TT") {
              c.cellElement.style.background = "#ffd963";
            }
            if (c.data.dia17 == "D") {
              c.cellElement.style.background = "#fffafaff";
            }
            if (c.data.dia17 == "V") {
              c.cellElement.style.background = "#cdcbcb";
            }
            if (c.data.dia17 == "P") {
              c.cellElement.style.background = "#fcc6c6";
            }
            if (c.data.dia17 == "A") {
              c.cellElement.style.background = "#fffdfdff";
            }
            if (c.data.dia17 == "TD") {
              c.cellElement.style.background = "#9bc1e7";
            }
            if (c.data.dia17 == "DV") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia17 == "PA") {
              c.cellElement.style.background = "#9cc1e5";
            }
            if (c.data.dia17 == "PR") {
              c.cellElement.style.background = "#4572c6";
            }
            if (c.data.dia17 == "AU") {
              c.cellElement.style.background = "#c7dfb3";
            }
            if (c.data.dia17 == "IN") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia17 == "TS") {
              c.cellElement.style.background = "#a6a6a6";
            }
          }
          if(c.columnIndex == 21){
            if (c.data.dia18 == "PC"){
              c.cellElement.style.background = "#fed966";
            }
            if (c.data.dia18 == "EC") {
              c.cellElement.style.background = "#fb0000";
            }
            if (c.data.dia18 == "TC") {
              c.cellElement.style.background = "#70ad46";
            }
            if (c.data.dia18 == "ED") {
              c.cellElement.style.background = "#012060";
            }
            if (c.data.dia18 == "TV") {
              c.cellElement.style.background = "#aad08d";
            }
            if (c.data.dia18 == "TT") {
              c.cellElement.style.background = "#ffd963";
            }
            if (c.data.dia18 == "D") {
              c.cellElement.style.background = "#fffafaff";
            }
            if (c.data.dia18 == "V") {
              c.cellElement.style.background = "#cdcbcb";
            }
            if (c.data.dia18 == "P") {
              c.cellElement.style.background = "#fcc6c6";
            }
            if (c.data.dia18 == "A") {
              c.cellElement.style.background = "#fffdfdff";
            }
            if (c.data.dia18 == "TD") {
              c.cellElement.style.background = "#9bc1e7";
            }
            if (c.data.dia18 == "DV") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia18 == "PA") {
              c.cellElement.style.background = "#9cc1e5";
            }
            if (c.data.dia18 == "PR") {
              c.cellElement.style.background = "#4572c6";
            }
            if (c.data.dia18 == "AU") {
              c.cellElement.style.background = "#c7dfb3";
            }
            if (c.data.dia18 == "IN") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia18 == "TS") {
              c.cellElement.style.background = "#a6a6a6";
            }
          }
          if(c.columnIndex == 22){
            if (c.data.dia19 == "PC"){
              c.cellElement.style.background = "#fed966";
            }
            if (c.data.dia19 == "EC") {
              c.cellElement.style.background = "#fb0000";
            }
            if (c.data.dia19 == "TC") {
              c.cellElement.style.background = "#70ad46";
            }
            if (c.data.dia19 == "ED") {
              c.cellElement.style.background = "#012060";
            }
            if (c.data.dia19 == "TV") {
              c.cellElement.style.background = "#aad08d";
            }
            if (c.data.dia19 == "TT") {
              c.cellElement.style.background = "#ffd963";
            }
            if (c.data.dia19 == "D") {
              c.cellElement.style.background = "#fffafaff";
            }
            if (c.data.dia19 == "V") {
              c.cellElement.style.background = "#cdcbcb";
            }
            if (c.data.dia19 == "P") {
              c.cellElement.style.background = "#fcc6c6";
            }
            if (c.data.dia19 == "A") {
              c.cellElement.style.background = "#fffdfdff";
            }
            if (c.data.dia19 == "TD") {
              c.cellElement.style.background = "#9bc1e7";
            }
            if (c.data.dia19 == "DV") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia19 == "PA") {
              c.cellElement.style.background = "#9cc1e5";
            }
            if (c.data.dia19 == "PR") {
              c.cellElement.style.background = "#4572c6";
            }
            if (c.data.dia19 == "AU") {
              c.cellElement.style.background = "#c7dfb3";
            }
            if (c.data.dia19 == "IN") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia19 == "TS") {
              c.cellElement.style.background = "#a6a6a6";
            }
          }
          if(c.columnIndex == 23){
            if (c.data.dia20 == "PC"){
              c.cellElement.style.background = "#fed966";
            }
            if (c.data.dia20 == "EC") {
              c.cellElement.style.background = "#fb0000";
            }
            if (c.data.dia20 == "TC") {
              c.cellElement.style.background = "#70ad46";
            }
            if (c.data.dia20 == "ED") {
              c.cellElement.style.background = "#012060";
            }
            if (c.data.dia20 == "TV") {
              c.cellElement.style.background = "#aad08d";
            }
            if (c.data.dia20 == "TT") {
              c.cellElement.style.background = "#ffd963";
            }
            if (c.data.dia20 == "D") {
              c.cellElement.style.background = "#fffafaff";
            }
            if (c.data.dia20 == "V") {
              c.cellElement.style.background = "#cdcbcb";
            }
            if (c.data.dia20 == "P") {
              c.cellElement.style.background = "#fcc6c6";
            }
            if (c.data.dia20 == "A") {
              c.cellElement.style.background = "#fffdfdff";
            }
            if (c.data.dia20 == "TD") {
              c.cellElement.style.background = "#9bc1e7";
            }
            if (c.data.dia20 == "DV") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia20 == "PA") {
              c.cellElement.style.background = "#9cc1e5";
            }
            if (c.data.dia20 == "PR") {
              c.cellElement.style.background = "#4572c6";
            }
            if (c.data.dia20 == "AU") {
              c.cellElement.style.background = "#c7dfb3";
            }
            if (c.data.dia20 == "IN") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia20 == "TS") {
              c.cellElement.style.background = "#a6a6a6";
            }
          }
          if(c.columnIndex == 24){
            if (c.data.dia21 == "PC"){
              c.cellElement.style.background = "#fed966";
            }
            if (c.data.dia21 == "EC") {
              c.cellElement.style.background = "#fb0000";
            }
            if (c.data.dia21 == "TC") {
              c.cellElement.style.background = "#70ad46";
            }
            if (c.data.dia21 == "ED") {
              c.cellElement.style.background = "#012060";
            }
            if (c.data.dia21 == "TV") {
              c.cellElement.style.background = "#aad08d";
            }
            if (c.data.dia21 == "TT") {
              c.cellElement.style.background = "#ffd963";
            }
            if (c.data.dia21 == "D") {
              c.cellElement.style.background = "#fffafaff";
            }
            if (c.data.dia21 == "V") {
              c.cellElement.style.background = "#cdcbcb";
            }
            if (c.data.dia21 == "P") {
              c.cellElement.style.background = "#fcc6c6";
            }
            if (c.data.dia21 == "A") {
              c.cellElement.style.background = "#fffdfdff";
            }
            if (c.data.dia21 == "TD") {
              c.cellElement.style.background = "#9bc1e7";
            }
            if (c.data.dia21 == "DV") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia21 == "PA") {
              c.cellElement.style.background = "#9cc1e5";
            }
            if (c.data.dia21 == "PR") {
              c.cellElement.style.background = "#4572c6";
            }
            if (c.data.dia21 == "AU") {
              c.cellElement.style.background = "#c7dfb3";
            }
            if (c.data.dia21 == "IN") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia21 == "TS") {
              c.cellElement.style.background = "#a6a6a6";
            }
          }
          if(c.columnIndex == 25){
            if (c.data.dia22 == "PC"){
              c.cellElement.style.background = "#fed966";
            }
            if (c.data.dia22 == "EC") {
              c.cellElement.style.background = "#fb0000";
            }
            if (c.data.dia22 == "TC") {
              c.cellElement.style.background = "#70ad46";
            }
            if (c.data.dia22 == "ED") {
              c.cellElement.style.background = "#012060";
            }
            if (c.data.dia22 == "TV") {
              c.cellElement.style.background = "#aad08d";
            }
            if (c.data.dia22 == "TT") {
              c.cellElement.style.background = "#ffd963";
            }
            if (c.data.dia22 == "D") {
              c.cellElement.style.background = "#fffafaff";
            }
            if (c.data.dia22 == "V") {
              c.cellElement.style.background = "#cdcbcb";
            }
            if (c.data.dia22 == "P") {
              c.cellElement.style.background = "#fcc6c6";
            }
            if (c.data.dia22 == "A") {
              c.cellElement.style.background = "#fffdfdff";
            }
            if (c.data.dia22 == "TD") {
              c.cellElement.style.background = "#9bc1e7";
            }
            if (c.data.dia22 == "DV") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia22 == "PA") {
              c.cellElement.style.background = "#9cc1e5";
            }
            if (c.data.dia22 == "PR") {
              c.cellElement.style.background = "#4572c6";
            }
            if (c.data.dia22 == "AU") {
              c.cellElement.style.background = "#c7dfb3";
            }
            if (c.data.dia22 == "IN") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia22 == "TS") {
              c.cellElement.style.background = "#a6a6a6";
            }
          }
          if(c.columnIndex == 26){
            if (c.data.dia23 == "PC"){
              c.cellElement.style.background = "#fed966";
            }
            if (c.data.dia23 == "EC") {
              c.cellElement.style.background = "#fb0000";
            }
            if (c.data.dia23 == "TC") {
              c.cellElement.style.background = "#70ad46";
            }
            if (c.data.dia23 == "ED") {
              c.cellElement.style.background = "#012060";
            }
            if (c.data.dia23 == "TV") {
              c.cellElement.style.background = "#aad08d";
            }
            if (c.data.dia23 == "TT") {
              c.cellElement.style.background = "#ffd963";
            }
            if (c.data.dia23 == "D") {
              c.cellElement.style.background = "#fffafaff";
            }
            if (c.data.dia23 == "V") {
              c.cellElement.style.background = "#cdcbcb";
            }
            if (c.data.dia23 == "P") {
              c.cellElement.style.background = "#fcc6c6";
            }
            if (c.data.dia23 == "A") {
              c.cellElement.style.background = "#fffdfdff";
            }
            if (c.data.dia23 == "TD") {
              c.cellElement.style.background = "#9bc1e7";
            }
            if (c.data.dia23 == "DV") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia23 == "PA") {
              c.cellElement.style.background = "#9cc1e5";
            }
            if (c.data.dia23 == "PR") {
              c.cellElement.style.background = "#4572c6";
            }
            if (c.data.dia23 == "AU") {
              c.cellElement.style.background = "#c7dfb3";
            }
            if (c.data.dia23 == "IN") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia23 == "TS") {
              c.cellElement.style.background = "#a6a6a6";
            }
          }
          if(c.columnIndex == 27){
            if (c.data.dia24 == "PC"){
              c.cellElement.style.background = "#fed966";
            }
            if (c.data.dia24 == "EC") {
              c.cellElement.style.background = "#fb0000";
            }
            if (c.data.dia24 == "TC") {
              c.cellElement.style.background = "#70ad46";
            }
            if (c.data.dia24 == "ED") {
              c.cellElement.style.background = "#012060";
            }
            if (c.data.dia24 == "TV") {
              c.cellElement.style.background = "#aad08d";
            }
            if (c.data.dia24 == "TT") {
              c.cellElement.style.background = "#ffd963";
            }
            if (c.data.dia24 == "D") {
              c.cellElement.style.background = "#fffafaff";
            }
            if (c.data.dia24 == "V") {
              c.cellElement.style.background = "#cdcbcb";
            }
            if (c.data.dia24 == "P") {
              c.cellElement.style.background = "#fcc6c6";
            }
            if (c.data.dia24 == "A") {
              c.cellElement.style.background = "#fffdfdff";
            }
            if (c.data.dia24 == "TD") {
              c.cellElement.style.background = "#9bc1e7";
            }
            if (c.data.dia24 == "DV") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia24 == "PA") {
              c.cellElement.style.background = "#9cc1e5";
            }
            if (c.data.dia24 == "PR") {
              c.cellElement.style.background = "#4572c6";
            }
            if (c.data.dia24 == "AU") {
              c.cellElement.style.background = "#c7dfb3";
            }
            if (c.data.dia24 == "IN") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia24 == "TS") {
              c.cellElement.style.background = "#a6a6a6";
            }
          }
          if(c.columnIndex == 28){
            if (c.data.dia25 == "PC"){
              c.cellElement.style.background = "#fed966";
            }
            if (c.data.dia25 == "EC") {
              c.cellElement.style.background = "#fb0000";
            }
            if (c.data.dia25 == "TC") {
              c.cellElement.style.background = "#70ad46";
            }
            if (c.data.dia25 == "ED") {
              c.cellElement.style.background = "#012060";
            }
            if (c.data.dia25 == "TV") {
              c.cellElement.style.background = "#aad08d";
            }
            if (c.data.dia25 == "TT") {
              c.cellElement.style.background = "#ffd963";
            }
            if (c.data.dia25 == "D") {
              c.cellElement.style.background = "#fffafaff";
            }
            if (c.data.dia25 == "V") {
              c.cellElement.style.background = "#cdcbcb";
            }
            if (c.data.dia25 == "P") {
              c.cellElement.style.background = "#fcc6c6";
            }
            if (c.data.dia25 == "A") {
              c.cellElement.style.background = "#fffdfdff";
            }
            if (c.data.dia25 == "TD") {
              c.cellElement.style.background = "#9bc1e7";
            }
            if (c.data.dia25 == "DV") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia25 == "PA") {
              c.cellElement.style.background = "#9cc1e5";
            }
            if (c.data.dia25 == "PR") {
              c.cellElement.style.background = "#4572c6";
            }
            if (c.data.dia25 == "AU") {
              c.cellElement.style.background = "#c7dfb3";
            }
            if (c.data.dia25 == "IN") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia25 == "TS") {
              c.cellElement.style.background = "#a6a6a6";
            }
          }
          if(c.columnIndex == 29){
            if (c.data.dia26 == "PC"){
              c.cellElement.style.background = "#fed966";
            }
            if (c.data.dia26 == "EC") {
              c.cellElement.style.background = "#fb0000";
            }
            if (c.data.dia26 == "TC") {
              c.cellElement.style.background = "#70ad46";
            }
            if (c.data.dia26 == "ED") {
              c.cellElement.style.background = "#012060";
            }
            if (c.data.dia26 == "TV") {
              c.cellElement.style.background = "#aad08d";
            }
            if (c.data.dia26 == "TT") {
              c.cellElement.style.background = "#ffd963";
            }
            if (c.data.dia26 == "D") {
              c.cellElement.style.background = "#fffafaff";
            }
            if (c.data.dia26 == "V") {
              c.cellElement.style.background = "#cdcbcb";
            }
            if (c.data.dia26 == "P") {
              c.cellElement.style.background = "#fcc6c6";
            }
            if (c.data.dia26 == "A") {
              c.cellElement.style.background = "#fffdfdff";
            }
            if (c.data.dia26 == "TD") {
              c.cellElement.style.background = "#9bc1e7";
            }
            if (c.data.dia26 == "DV") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia26 == "PA") {
              c.cellElement.style.background = "#9cc1e5";
            }
            if (c.data.dia26 == "PR") {
              c.cellElement.style.background = "#4572c6";
            }
            if (c.data.dia26 == "AU") {
              c.cellElement.style.background = "#c7dfb3";
            }
            if (c.data.dia26 == "IN") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia26 == "TS") {
              c.cellElement.style.background = "#a6a6a6";
            }
          }
          if(c.columnIndex == 30){
            if (c.data.dia27 == "PC"){
              c.cellElement.style.background = "#fed966";
            }
            if (c.data.dia27 == "EC") {
              c.cellElement.style.background = "#fb0000";
            }
            if (c.data.dia27 == "TC") {
              c.cellElement.style.background = "#70ad46";
            }
            if (c.data.dia27 == "ED") {
              c.cellElement.style.background = "#012060";
            }
            if (c.data.dia27 == "TV") {
              c.cellElement.style.background = "#aad08d";
            }
            if (c.data.dia27 == "TT") {
              c.cellElement.style.background = "#ffd963";
            }
            if (c.data.dia27 == "D") {
              c.cellElement.style.background = "#fffafaff";
            }
            if (c.data.dia27 == "V") {
              c.cellElement.style.background = "#cdcbcb";
            }
            if (c.data.dia27 == "P") {
              c.cellElement.style.background = "#fcc6c6";
            }
            if (c.data.dia27 == "A") {
              c.cellElement.style.background = "#fffdfdff";
            }
            if (c.data.dia27 == "TD") {
              c.cellElement.style.background = "#9bc1e7";
            }
            if (c.data.dia27 == "DV") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia27 == "PA") {
              c.cellElement.style.background = "#9cc1e5";
            }
            if (c.data.dia27 == "PR") {
              c.cellElement.style.background = "#4572c6";
            }
            if (c.data.dia27 == "AU") {
              c.cellElement.style.background = "#c7dfb3";
            }
            if (c.data.dia27 == "IN") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia27 == "TS") {
              c.cellElement.style.background = "#a6a6a6";
            }
          }
          if(c.columnIndex == 31){
            if (c.data.dia28 == "PC"){
              c.cellElement.style.background = "#fed966";
            }
            if (c.data.dia28 == "EC") {
              c.cellElement.style.background = "#fb0000";
            }
            if (c.data.dia28 == "TC") {
              c.cellElement.style.background = "#70ad46";
            }
            if (c.data.dia28 == "ED") {
              c.cellElement.style.background = "#012060";
            }
            if (c.data.dia28 == "TV") {
              c.cellElement.style.background = "#aad08d";
            }
            if (c.data.dia28 == "TT") {
              c.cellElement.style.background = "#ffd963";
            }
            if (c.data.dia28 == "D") {
              c.cellElement.style.background = "#fffafaff";
            }
            if (c.data.dia28 == "V") {
              c.cellElement.style.background = "#cdcbcb";
            }
            if (c.data.dia28 == "P") {
              c.cellElement.style.background = "#fcc6c6";
            }
            if (c.data.dia28 == "A") {
              c.cellElement.style.background = "#fffdfdff";
            }
            if (c.data.dia28 == "TD") {
              c.cellElement.style.background = "#9bc1e7";
            }
            if (c.data.dia28 == "DV") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia28 == "PA") {
              c.cellElement.style.background = "#9cc1e5";
            }
            if (c.data.dia28 == "PR") {
              c.cellElement.style.background = "#4572c6";
            }
            if (c.data.dia28 == "AU") {
              c.cellElement.style.background = "#c7dfb3";
            }
            if (c.data.dia28 == "IN") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia28 == "TS") {
              c.cellElement.style.background = "#a6a6a6";
            }
          }
          if(c.columnIndex == 32){
            if (c.data.dia29 == "PC"){
              c.cellElement.style.background = "#fed966";
            }
            if (c.data.dia29 == "EC") {
              c.cellElement.style.background = "#fb0000";
            }
            if (c.data.dia29 == "TC") {
              c.cellElement.style.background = "#70ad46";
            }
            if (c.data.dia29 == "ED") {
              c.cellElement.style.background = "#012060";
            }
            if (c.data.dia29 == "TV") {
              c.cellElement.style.background = "#aad08d";
            }
            if (c.data.dia29 == "TT") {
              c.cellElement.style.background = "#ffd963";
            }
            if (c.data.dia29 == "D") {
              c.cellElement.style.background = "#fffafaff";
            }
            if (c.data.dia29 == "V") {
              c.cellElement.style.background = "#cdcbcb";
            }
            if (c.data.dia29 == "P") {
              c.cellElement.style.background = "#fcc6c6";
            }
            if (c.data.dia29 == "A") {
              c.cellElement.style.background = "#fffdfdff";
            }
            if (c.data.dia29 == "TD") {
              c.cellElement.style.background = "#9bc1e7";
            }
            if (c.data.dia29 == "DV") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia29 == "PA") {
              c.cellElement.style.background = "#9cc1e5";
            }
            if (c.data.dia29 == "PR") {
              c.cellElement.style.background = "#4572c6";
            }
            if (c.data.dia29 == "AU") {
              c.cellElement.style.background = "#c7dfb3";
            }
            if (c.data.dia29 == "IN") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia29 == "TS") {
              c.cellElement.style.background = "#a6a6a6";
            }
          }
          if(c.columnIndex == 33){
            if (c.data.dia30 == "PC"){
              c.cellElement.style.background = "#fed966";
            }
            if (c.data.dia30 == "EC") {
              c.cellElement.style.background = "#fb0000";
            }
            if (c.data.dia30 == "TC") {
              c.cellElement.style.background = "#70ad46";
            }
            if (c.data.dia30 == "ED") {
              c.cellElement.style.background = "#012060";
            }
            if (c.data.dia30 == "TV") {
              c.cellElement.style.background = "#aad08d";
            }
            if (c.data.dia30 == "TT") {
              c.cellElement.style.background = "#ffd963";
            }
            if (c.data.dia30 == "D") {
              c.cellElement.style.background = "#fffafaff";
            }
            if (c.data.dia30 == "V") {
              c.cellElement.style.background = "#cdcbcb";
            }
            if (c.data.dia30 == "P") {
              c.cellElement.style.background = "#fcc6c6";
            }
            if (c.data.dia30 == "A") {
              c.cellElement.style.background = "#fffdfdff";
            }
            if (c.data.dia30 == "TD") {
              c.cellElement.style.background = "#9bc1e7";
            }
            if (c.data.dia30 == "DV") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia30 == "PA") {
              c.cellElement.style.background = "#9cc1e5";
            }
            if (c.data.dia30 == "PR") {
              c.cellElement.style.background = "#4572c6";
            }
            if (c.data.dia30 == "AU") {
              c.cellElement.style.background = "#c7dfb3";
            }
            if (c.data.dia30 == "IN") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia30 == "TS") {
              c.cellElement.style.background = "#a6a6a6";
            }
          }
          if(c.columnIndex == 34){
            if (c.data.dia31 == "PC"){
              c.cellElement.style.background = "#fed966";
            }
            if (c.data.dia31 == "EC") {
              c.cellElement.style.background = "#fb0000";
            }
            if (c.data.dia31 == "TC") {
              c.cellElement.style.background = "#70ad46";
            }
            if (c.data.dia31 == "ED") {
              c.cellElement.style.background = "#012060";
            }
            if (c.data.dia31 == "TV") {
              c.cellElement.style.background = "#aad08d";
            }
            if (c.data.dia31 == "TT") {
              c.cellElement.style.background = "#ffd963";
            }
            if (c.data.dia31 == "D") {
              c.cellElement.style.background = "#fffafaff";
            }
            if (c.data.dia31 == "V") {
              c.cellElement.style.background = "#cdcbcb";
            }
            if (c.data.dia31 == "P") {
              c.cellElement.style.background = "#fcc6c6";
            }
            if (c.data.dia31 == "A") {
              c.cellElement.style.background = "#fffdfdff";
            }
            if (c.data.dia31 == "TD") {
              c.cellElement.style.background = "#9bc1e7";
            }
            if (c.data.dia31 == "DV") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia31 == "PA") {
              c.cellElement.style.background = "#9cc1e5";
            }
            if (c.data.dia31 == "PR") {
              c.cellElement.style.background = "#4572c6";
            }
            if (c.data.dia31 == "AU") {
              c.cellElement.style.background = "#c7dfb3";
            }
            if (c.data.dia31 == "IN") {
              c.cellElement.style.background = "#bfbfbf";
            }
            if (c.data.dia31 == "TS") {
              c.cellElement.style.background = "#a6a6a6";
            }
          }
        }
      });
    }
    // if (e.rowType == 'totalFooter') {
    //   e.cells.forEach((c: any) => {
    //     if (c.cellElement) {
    //       c.cellElement.style.fontWeight = "bolder";
    //       c.cellElement.style.fontSize = "16px";
    //       c.cellElement.style.background = "#ff9460";
    //       c.cellElement.style.color = "black";
    //     }
    //   });
    // };
  }

  onCellPreparedT(e: any) {
    // if (e.rowType == 'group') {

    //   e.cellElement.style.fontSize = '12px';
    //   e.cellElement.style.background = "#DCDCDC";
    // }

    // if (e.rowType == 'groupFooter') {


    //   if (e.columnIndex == 2) {
    //     e.cellElement.style.fontWeight = "bolder";
    //     e.cellElement.style.fontSize = "15px";
    //     e.cellElement.style.background = "#cdcbcb";
    //   }
    // }
  }

  customizeTr(e) {
    var gridCell = e.gridCell;

    if (gridCell.rowType === 'data') {

      if (e.gridCell.column.dataField == "dia1") {
        if (gridCell.data.dia1 == "PC"){
          e.backgroundColor = "#fed966";
        }
        if (gridCell.data.dia1 == "EC") {
          e.backgroundColor = "#fb0000";
        }
        if (gridCell.data.dia1 == "TC") {
          e.backgroundColor = "#70ad46";
        }
        if (gridCell.data.dia1 == "ED") {
          e.backgroundColor = "#012060";
        }
        if (gridCell.data.dia1 == "TV") {
          e.backgroundColor = "#aad08d";
        }
        if (gridCell.data.dia1 == "TT") {
          e.backgroundColor = "#ffd963";
        }
        if (gridCell.data.dia1 == "D") {
          e.backgroundColor = "#fffafaff";
        }
        if (gridCell.data.dia1 == "V") {
          e.backgroundColor = "#cdcbcb";
        }
        if (gridCell.data.dia1 == "P") {
          e.backgroundColor = "#fcc6c6";
        }
        if (gridCell.data.dia1 == "A") {
          e.backgroundColor = "#fffdfdff";
        }
        if (gridCell.data.dia1 == "TD") {
          e.backgroundColor = "#9bc1e7";
        }
        if (gridCell.data.dia1 == "DV") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia1 == "PA") {
          e.backgroundColor = "#9cc1e5";
        }
        if (gridCell.data.dia1 == "PR") {
          e.backgroundColor = "#4572c6";
        }
        if (gridCell.data.dia1 == "AU") {
          e.backgroundColor = "#c7dfb3";
        }
        if (gridCell.data.dia1 == "IN") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia1 == "TS") {
          e.backgroundColor = "#a6a6a6";
        }
        
      }
      if (e.gridCell.column.dataField == "dia2") {
        if (gridCell.data.dia2 == "PC"){
          e.backgroundColor = "#fed966";
        }
        if (gridCell.data.dia2 == "EC") {
          e.backgroundColor = "#fb0000";
        }
        if (gridCell.data.dia2 == "TC") {
          e.backgroundColor = "#70ad46";
        }
        if (gridCell.data.dia2 == "ED") {
          e.backgroundColor = "#012060";
        }
        if (gridCell.data.dia2 == "TV") {
          e.backgroundColor = "#aad08d";
        }
        if (gridCell.data.dia2 == "TT") {
          e.backgroundColor = "#ffd963";
        }
        if (gridCell.data.dia2 == "D") {
          e.backgroundColor = "#fffafaff";
        }
        if (gridCell.data.dia2 == "V") {
          e.backgroundColor = "#cdcbcb";
        }
        if (gridCell.data.dia2 == "P") {
          e.backgroundColor = "#fcc6c6";
        }
        if (gridCell.data.dia2 == "A") {
          e.backgroundColor = "#fffdfdff";
        }
        if (gridCell.data.dia2 == "TD") {
          e.backgroundColor = "#9bc1e7";
        }
        if (gridCell.data.dia2 == "DV") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia2 == "PA") {
          e.backgroundColor = "#9cc1e5";
        }
        if (gridCell.data.dia2 == "PR") {
          e.backgroundColor = "#4572c6";
        }
        if (gridCell.data.dia2 == "AU") {
          e.backgroundColor = "#c7dfb3";
        }
        if (gridCell.data.dia2 == "IN") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia2 == "TS") {
          e.backgroundColor = "#a6a6a6";
        }
        
      }
      if (e.gridCell.column.dataField == "dia3") {
        if (gridCell.data.dia3 == "PC"){
          e.backgroundColor = "#fed966";
        }
        if (gridCell.data.dia3 == "EC") {
          e.backgroundColor = "#fb0000";
        }
        if (gridCell.data.dia3 == "TC") {
          e.backgroundColor = "#70ad46";
        }
        if (gridCell.data.dia3 == "ED") {
          e.backgroundColor = "#012060";
        }
        if (gridCell.data.dia3 == "TV") {
          e.backgroundColor = "#aad08d";
        }
        if (gridCell.data.dia3 == "TT") {
          e.backgroundColor = "#ffd963";
        }
        if (gridCell.data.dia3 == "D") {
          e.backgroundColor = "#fffafaff";
        }
        if (gridCell.data.dia3 == "V") {
          e.backgroundColor = "#cdcbcb";
        }
        if (gridCell.data.dia3 == "P") {
          e.backgroundColor = "#fcc6c6";
        }
        if (gridCell.data.dia3 == "A") {
          e.backgroundColor = "#fffdfdff";
        }
        if (gridCell.data.dia3 == "TD") {
          e.backgroundColor = "#9bc1e7";
        }
        if (gridCell.data.dia3 == "DV") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia3 == "PA") {
          e.backgroundColor = "#9cc1e5";
        }
        if (gridCell.data.dia3 == "PR") {
          e.backgroundColor = "#4572c6";
        }
        if (gridCell.data.dia3 == "AU") {
          e.backgroundColor = "#c7dfb3";
        }
        if (gridCell.data.dia3 == "IN") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia3 == "TS") {
          e.backgroundColor = "#a6a6a6";
        }
        
      }
      if (e.gridCell.column.dataField == "dia4") {
        if (gridCell.data.dia4 == "PC"){
          e.backgroundColor = "#fed966";
        }
        if (gridCell.data.dia4 == "EC") {
          e.backgroundColor = "#fb0000";
        }
        if (gridCell.data.dia4 == "TC") {
          e.backgroundColor = "#70ad46";
        }
        if (gridCell.data.dia4 == "ED") {
          e.backgroundColor = "#012060";
        }
        if (gridCell.data.dia4 == "TV") {
          e.backgroundColor = "#aad08d";
        }
        if (gridCell.data.dia4 == "TT") {
          e.backgroundColor = "#ffd963";
        }
        if (gridCell.data.dia4 == "D") {
          e.backgroundColor = "#fffafaff";
        }
        if (gridCell.data.dia4 == "V") {
          e.backgroundColor = "#cdcbcb";
        }
        if (gridCell.data.dia4 == "P") {
          e.backgroundColor = "#fcc6c6";
        }
        if (gridCell.data.dia4 == "A") {
          e.backgroundColor = "#fffdfdff";
        }
        if (gridCell.data.dia4 == "TD") {
          e.backgroundColor = "#9bc1e7";
        }
        if (gridCell.data.dia4 == "DV") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia4 == "PA") {
          e.backgroundColor = "#9cc1e5";
        }
        if (gridCell.data.dia4 == "PR") {
          e.backgroundColor = "#4572c6";
        }
        if (gridCell.data.dia4 == "AU") {
          e.backgroundColor = "#c7dfb3";
        }
        if (gridCell.data.dia4 == "IN") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia4 == "TS") {
          e.backgroundColor = "#a6a6a6";
        }
        
      }
      if (e.gridCell.column.dataField == "dia5") {
        if (gridCell.data.dia5 == "PC"){
          e.backgroundColor = "#fed966";
        }
        if (gridCell.data.dia5 == "EC") {
          e.backgroundColor = "#fb0000";
        }
        if (gridCell.data.dia5 == "TC") {
          e.backgroundColor = "#70ad46";
        }
        if (gridCell.data.dia5 == "ED") {
          e.backgroundColor = "#012060";
        }
        if (gridCell.data.dia5 == "TV") {
          e.backgroundColor = "#aad08d";
        }
        if (gridCell.data.dia5 == "TT") {
          e.backgroundColor = "#ffd963";
        }
        if (gridCell.data.dia5 == "D") {
          e.backgroundColor = "#fffafaff";
        }
        if (gridCell.data.dia5 == "V") {
          e.backgroundColor = "#cdcbcb";
        }
        if (gridCell.data.dia5 == "P") {
          e.backgroundColor = "#fcc6c6";
        }
        if (gridCell.data.dia5 == "A") {
          e.backgroundColor = "#fffdfdff";
        }
        if (gridCell.data.dia5 == "TD") {
          e.backgroundColor = "#9bc1e7";
        }
        if (gridCell.data.dia5 == "DV") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia5 == "PA") {
          e.backgroundColor = "#9cc1e5";
        }
        if (gridCell.data.dia5 == "PR") {
          e.backgroundColor = "#4572c6";
        }
        if (gridCell.data.dia5 == "AU") {
          e.backgroundColor = "#c7dfb3";
        }
        if (gridCell.data.dia5 == "IN") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia5 == "TS") {
          e.backgroundColor = "#a6a6a6";
        }
        
      }
      if (e.gridCell.column.dataField == "dia6") {
        if (gridCell.data.dia6 == "PC"){
          e.backgroundColor = "#fed966";
        }
        if (gridCell.data.dia6 == "EC") {
          e.backgroundColor = "#fb0000";
        }
        if (gridCell.data.dia6 == "TC") {
          e.backgroundColor = "#70ad46";
        }
        if (gridCell.data.dia6 == "ED") {
          e.backgroundColor = "#012060";
        }
        if (gridCell.data.dia6 == "TV") {
          e.backgroundColor = "#aad08d";
        }
        if (gridCell.data.dia6 == "TT") {
          e.backgroundColor = "#ffd963";
        }
        if (gridCell.data.dia6 == "D") {
          e.backgroundColor = "#fffafaff";
        }
        if (gridCell.data.dia6 == "V") {
          e.backgroundColor = "#cdcbcb";
        }
        if (gridCell.data.dia6 == "P") {
          e.backgroundColor = "#fcc6c6";
        }
        if (gridCell.data.dia6 == "A") {
          e.backgroundColor = "#fffdfdff";
        }
        if (gridCell.data.dia6 == "TD") {
          e.backgroundColor = "#9bc1e7";
        }
        if (gridCell.data.dia6 == "DV") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia6 == "PA") {
          e.backgroundColor = "#9cc1e5";
        }
        if (gridCell.data.dia6 == "PR") {
          e.backgroundColor = "#4572c6";
        }
        if (gridCell.data.dia6 == "AU") {
          e.backgroundColor = "#c7dfb3";
        }
        if (gridCell.data.dia6 == "IN") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia6 == "TS") {
          e.backgroundColor = "#a6a6a6";
        }
        
      }
      if (e.gridCell.column.dataField == "dia7") {
        if (gridCell.data.dia7 == "PC"){
          e.backgroundColor = "#fed966";
        }
        if (gridCell.data.dia7 == "EC") {
          e.backgroundColor = "#fb0000";
        }
        if (gridCell.data.dia7 == "TC") {
          e.backgroundColor = "#70ad46";
        }
        if (gridCell.data.dia7 == "ED") {
          e.backgroundColor = "#012060";
        }
        if (gridCell.data.dia7 == "TV") {
          e.backgroundColor = "#aad08d";
        }
        if (gridCell.data.dia7 == "TT") {
          e.backgroundColor = "#ffd963";
        }
        if (gridCell.data.dia7 == "D") {
          e.backgroundColor = "#fffafaff";
        }
        if (gridCell.data.dia7 == "V") {
          e.backgroundColor = "#cdcbcb";
        }
        if (gridCell.data.dia7 == "P") {
          e.backgroundColor = "#fcc6c6";
        }
        if (gridCell.data.dia7 == "A") {
          e.backgroundColor = "#fffdfdff";
        }
        if (gridCell.data.dia7 == "TD") {
          e.backgroundColor = "#9bc1e7";
        }
        if (gridCell.data.dia7 == "DV") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia7 == "PA") {
          e.backgroundColor = "#9cc1e5";
        }
        if (gridCell.data.dia7 == "PR") {
          e.backgroundColor = "#4572c6";
        }
        if (gridCell.data.dia7 == "AU") {
          e.backgroundColor = "#c7dfb3";
        }
        if (gridCell.data.dia7 == "IN") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia7 == "TS") {
          e.backgroundColor = "#a6a6a6";
        }
        
      }
      if (e.gridCell.column.dataField == "dia8") {
        if (gridCell.data.dia8 == "PC"){
          e.backgroundColor = "#fed966";
        }
        if (gridCell.data.dia8 == "EC") {
          e.backgroundColor = "#fb0000";
        }
        if (gridCell.data.dia8 == "TC") {
          e.backgroundColor = "#70ad46";
        }
        if (gridCell.data.dia8 == "ED") {
          e.backgroundColor = "#012060";
        }
        if (gridCell.data.dia8 == "TV") {
          e.backgroundColor = "#aad08d";
        }
        if (gridCell.data.dia8 == "TT") {
          e.backgroundColor = "#ffd963";
        }
        if (gridCell.data.dia8 == "D") {
          e.backgroundColor = "#fffafaff";
        }
        if (gridCell.data.dia8 == "V") {
          e.backgroundColor = "#cdcbcb";
        }
        if (gridCell.data.dia8 == "P") {
          e.backgroundColor = "#fcc6c6";
        }
        if (gridCell.data.dia8 == "A") {
          e.backgroundColor = "#fffdfdff";
        }
        if (gridCell.data.dia8 == "TD") {
          e.backgroundColor = "#9bc1e7";
        }
        if (gridCell.data.dia8 == "DV") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia8 == "PA") {
          e.backgroundColor = "#9cc1e5";
        }
        if (gridCell.data.dia8 == "PR") {
          e.backgroundColor = "#4572c6";
        }
        if (gridCell.data.dia8 == "AU") {
          e.backgroundColor = "#c7dfb3";
        }
        if (gridCell.data.dia8 == "IN") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia8 == "TS") {
          e.backgroundColor = "#a6a6a6";
        }
        
      }
      if (e.gridCell.column.dataField == "dia9") {
        if (gridCell.data.dia9 == "PC"){
          e.backgroundColor = "#fed966";
        }
        if (gridCell.data.dia9 == "EC") {
          e.backgroundColor = "#fb0000";
        }
        if (gridCell.data.dia9 == "TC") {
          e.backgroundColor = "#70ad46";
        }
        if (gridCell.data.dia9 == "ED") {
          e.backgroundColor = "#012060";
        }
        if (gridCell.data.dia9 == "TV") {
          e.backgroundColor = "#aad08d";
        }
        if (gridCell.data.dia9 == "TT") {
          e.backgroundColor = "#ffd963";
        }
        if (gridCell.data.dia9 == "D") {
          e.backgroundColor = "#fffafaff";
        }
        if (gridCell.data.dia9 == "V") {
          e.backgroundColor = "#cdcbcb";
        }
        if (gridCell.data.dia9 == "P") {
          e.backgroundColor = "#fcc6c6";
        }
        if (gridCell.data.dia9 == "A") {
          e.backgroundColor = "#fffdfdff";
        }
        if (gridCell.data.dia9 == "TD") {
          e.backgroundColor = "#9bc1e7";
        }
        if (gridCell.data.dia9 == "DV") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia9 == "PA") {
          e.backgroundColor = "#9cc1e5";
        }
        if (gridCell.data.dia9 == "PR") {
          e.backgroundColor = "#4572c6";
        }
        if (gridCell.data.dia9 == "AU") {
          e.backgroundColor = "#c7dfb3";
        }
        if (gridCell.data.dia9 == "IN") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia9 == "TS") {
          e.backgroundColor = "#a6a6a6";
        }
        
      }
      if (e.gridCell.column.dataField == "dia10") {
        if (gridCell.data.dia10 == "PC"){
          e.backgroundColor = "#fed966";
        }
        if (gridCell.data.dia10 == "EC") {
          e.backgroundColor = "#fb0000";
        }
        if (gridCell.data.dia10 == "TC") {
          e.backgroundColor = "#70ad46";
        }
        if (gridCell.data.dia10 == "ED") {
          e.backgroundColor = "#012060";
        }
        if (gridCell.data.dia10 == "TV") {
          e.backgroundColor = "#aad08d";
        }
        if (gridCell.data.dia10 == "TT") {
          e.backgroundColor = "#ffd963";
        }
        if (gridCell.data.dia10 == "D") {
          e.backgroundColor = "#fffafaff";
        }
        if (gridCell.data.dia10 == "V") {
          e.backgroundColor = "#cdcbcb";
        }
        if (gridCell.data.dia10 == "P") {
          e.backgroundColor = "#fcc6c6";
        }
        if (gridCell.data.dia10 == "A") {
          e.backgroundColor = "#fffdfdff";
        }
        if (gridCell.data.dia10 == "TD") {
          e.backgroundColor = "#9bc1e7";
        }
        if (gridCell.data.dia10 == "DV") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia10 == "PA") {
          e.backgroundColor = "#9cc1e5";
        }
        if (gridCell.data.dia10 == "PR") {
          e.backgroundColor = "#4572c6";
        }
        if (gridCell.data.dia10 == "AU") {
          e.backgroundColor = "#c7dfb3";
        }
        if (gridCell.data.dia10 == "IN") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia10 == "TS") {
          e.backgroundColor = "#a6a6a6";
        }
        
      }
      if (e.gridCell.column.dataField == "dia11") {
        if (gridCell.data.dia11 == "PC"){
          e.backgroundColor = "#fed966";
        }
        if (gridCell.data.dia11 == "EC") {
          e.backgroundColor = "#fb0000";
        }
        if (gridCell.data.dia11 == "TC") {
          e.backgroundColor = "#70ad46";
        }
        if (gridCell.data.dia11 == "ED") {
          e.backgroundColor = "#012060";
        }
        if (gridCell.data.dia11 == "TV") {
          e.backgroundColor = "#aad08d";
        }
        if (gridCell.data.dia11 == "TT") {
          e.backgroundColor = "#ffd963";
        }
        if (gridCell.data.dia11 == "D") {
          e.backgroundColor = "#fffafaff";
        }
        if (gridCell.data.dia11 == "V") {
          e.backgroundColor = "#cdcbcb";
        }
        if (gridCell.data.dia11 == "P") {
          e.backgroundColor = "#fcc6c6";
        }
        if (gridCell.data.dia11 == "A") {
          e.backgroundColor = "#fffdfdff";
        }
        if (gridCell.data.dia11 == "TD") {
          e.backgroundColor = "#9bc1e7";
        }
        if (gridCell.data.dia11 == "DV") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia11 == "PA") {
          e.backgroundColor = "#9cc1e5";
        }
        if (gridCell.data.dia11 == "PR") {
          e.backgroundColor = "#4572c6";
        }
        if (gridCell.data.dia11 == "AU") {
          e.backgroundColor = "#c7dfb3";
        }
        if (gridCell.data.dia11 == "IN") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia11 == "TS") {
          e.backgroundColor = "#a6a6a6";
        }
        
      }
      if (e.gridCell.column.dataField == "dia12") {
        if (gridCell.data.dia12 == "PC"){
          e.backgroundColor = "#fed966";
        }
        if (gridCell.data.dia12 == "EC") {
          e.backgroundColor = "#fb0000";
        }
        if (gridCell.data.dia12 == "TC") {
          e.backgroundColor = "#70ad46";
        }
        if (gridCell.data.dia12 == "ED") {
          e.backgroundColor = "#012060";
        }
        if (gridCell.data.dia12 == "TV") {
          e.backgroundColor = "#aad08d";
        }
        if (gridCell.data.dia12 == "TT") {
          e.backgroundColor = "#ffd963";
        }
        if (gridCell.data.dia12 == "D") {
          e.backgroundColor = "#fffafaff";
        }
        if (gridCell.data.dia12 == "V") {
          e.backgroundColor = "#cdcbcb";
        }
        if (gridCell.data.dia12 == "P") {
          e.backgroundColor = "#fcc6c6";
        }
        if (gridCell.data.dia12 == "A") {
          e.backgroundColor = "#fffdfdff";
        }
        if (gridCell.data.dia12 == "TD") {
          e.backgroundColor = "#9bc1e7";
        }
        if (gridCell.data.dia12 == "DV") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia12 == "PA") {
          e.backgroundColor = "#9cc1e5";
        }
        if (gridCell.data.dia12 == "PR") {
          e.backgroundColor = "#4572c6";
        }
        if (gridCell.data.dia12 == "AU") {
          e.backgroundColor = "#c7dfb3";
        }
        if (gridCell.data.dia12 == "IN") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia12 == "TS") {
          e.backgroundColor = "#a6a6a6";
        }
        
      }
      if (e.gridCell.column.dataField == "dia13") {
        if (gridCell.data.dia13 == "PC"){
          e.backgroundColor = "#fed966";
        }
        if (gridCell.data.dia13 == "EC") {
          e.backgroundColor = "#fb0000";
        }
        if (gridCell.data.dia13 == "TC") {
          e.backgroundColor = "#70ad46";
        }
        if (gridCell.data.dia13 == "ED") {
          e.backgroundColor = "#012060";
        }
        if (gridCell.data.dia13 == "TV") {
          e.backgroundColor = "#aad08d";
        }
        if (gridCell.data.dia13 == "TT") {
          e.backgroundColor = "#ffd963";
        }
        if (gridCell.data.dia13 == "D") {
          e.backgroundColor = "#fffafaff";
        }
        if (gridCell.data.dia13 == "V") {
          e.backgroundColor = "#cdcbcb";
        }
        if (gridCell.data.dia13 == "P") {
          e.backgroundColor = "#fcc6c6";
        }
        if (gridCell.data.dia13 == "A") {
          e.backgroundColor = "#fffdfdff";
        }
        if (gridCell.data.dia13 == "TD") {
          e.backgroundColor = "#9bc1e7";
        }
        if (gridCell.data.dia13 == "DV") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia13 == "PA") {
          e.backgroundColor = "#9cc1e5";
        }
        if (gridCell.data.dia13 == "PR") {
          e.backgroundColor = "#4572c6";
        }
        if (gridCell.data.dia13 == "AU") {
          e.backgroundColor = "#c7dfb3";
        }
        if (gridCell.data.dia13 == "IN") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia13 == "TS") {
          e.backgroundColor = "#a6a6a6";
        }
        
      }
      if (e.gridCell.column.dataField == "dia14") {
        if (gridCell.data.dia14 == "PC"){
          e.backgroundColor = "#fed966";
        }
        if (gridCell.data.dia14 == "EC") {
          e.backgroundColor = "#fb0000";
        }
        if (gridCell.data.dia14 == "TC") {
          e.backgroundColor = "#70ad46";
        }
        if (gridCell.data.dia14 == "ED") {
          e.backgroundColor = "#012060";
        }
        if (gridCell.data.dia14 == "TV") {
          e.backgroundColor = "#aad08d";
        }
        if (gridCell.data.dia14 == "TT") {
          e.backgroundColor = "#ffd963";
        }
        if (gridCell.data.dia14 == "D") {
          e.backgroundColor = "#fffafaff";
        }
        if (gridCell.data.dia14 == "V") {
          e.backgroundColor = "#cdcbcb";
        }
        if (gridCell.data.dia14 == "P") {
          e.backgroundColor = "#fcc6c6";
        }
        if (gridCell.data.dia14 == "A") {
          e.backgroundColor = "#fffdfdff";
        }
        if (gridCell.data.dia14 == "TD") {
          e.backgroundColor = "#9bc1e7";
        }
        if (gridCell.data.dia14 == "DV") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia14 == "PA") {
          e.backgroundColor = "#9cc1e5";
        }
        if (gridCell.data.dia14 == "PR") {
          e.backgroundColor = "#4572c6";
        }
        if (gridCell.data.dia14 == "AU") {
          e.backgroundColor = "#c7dfb3";
        }
        if (gridCell.data.dia14 == "IN") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia14 == "TS") {
          e.backgroundColor = "#a6a6a6";
        }
        
      }
      if (e.gridCell.column.dataField == "dia15") {
        if (gridCell.data.dia15 == "PC"){
          e.backgroundColor = "#fed966";
        }
        if (gridCell.data.dia15 == "EC") {
          e.backgroundColor = "#fb0000";
        }
        if (gridCell.data.dia15 == "TC") {
          e.backgroundColor = "#70ad46";
        }
        if (gridCell.data.dia15 == "ED") {
          e.backgroundColor = "#012060";
        }
        if (gridCell.data.dia15 == "TV") {
          e.backgroundColor = "#aad08d";
        }
        if (gridCell.data.dia15 == "TT") {
          e.backgroundColor = "#ffd963";
        }
        if (gridCell.data.dia15 == "D") {
          e.backgroundColor = "#fffafaff";
        }
        if (gridCell.data.dia15 == "V") {
          e.backgroundColor = "#cdcbcb";
        }
        if (gridCell.data.dia15 == "P") {
          e.backgroundColor = "#fcc6c6";
        }
        if (gridCell.data.dia15 == "A") {
          e.backgroundColor = "#fffdfdff";
        }
        if (gridCell.data.dia15 == "TD") {
          e.backgroundColor = "#9bc1e7";
        }
        if (gridCell.data.dia15 == "DV") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia15 == "PA") {
          e.backgroundColor = "#9cc1e5";
        }
        if (gridCell.data.dia15 == "PR") {
          e.backgroundColor = "#4572c6";
        }
        if (gridCell.data.dia15 == "AU") {
          e.backgroundColor = "#c7dfb3";
        }
        if (gridCell.data.dia15 == "IN") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia15 == "TS") {
          e.backgroundColor = "#a6a6a6";
        }
        
      }
      if (e.gridCell.column.dataField == "dia16") {
        if (gridCell.data.dia16 == "PC"){
          e.backgroundColor = "#fed966";
        }
        if (gridCell.data.dia16 == "EC") {
          e.backgroundColor = "#fb0000";
        }
        if (gridCell.data.dia16 == "TC") {
          e.backgroundColor = "#70ad46";
        }
        if (gridCell.data.dia16 == "ED") {
          e.backgroundColor = "#012060";
        }
        if (gridCell.data.dia16 == "TV") {
          e.backgroundColor = "#aad08d";
        }
        if (gridCell.data.dia16 == "TT") {
          e.backgroundColor = "#ffd963";
        }
        if (gridCell.data.dia16 == "D") {
          e.backgroundColor = "#fffafaff";
        }
        if (gridCell.data.dia16 == "V") {
          e.backgroundColor = "#cdcbcb";
        }
        if (gridCell.data.dia16 == "P") {
          e.backgroundColor = "#fcc6c6";
        }
        if (gridCell.data.dia16 == "A") {
          e.backgroundColor = "#fffdfdff";
        }
        if (gridCell.data.dia16 == "TD") {
          e.backgroundColor = "#9bc1e7";
        }
        if (gridCell.data.dia16 == "DV") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia16 == "PA") {
          e.backgroundColor = "#9cc1e5";
        }
        if (gridCell.data.dia16 == "PR") {
          e.backgroundColor = "#4572c6";
        }
        if (gridCell.data.dia16 == "AU") {
          e.backgroundColor = "#c7dfb3";
        }
        if (gridCell.data.dia16 == "IN") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia16 == "TS") {
          e.backgroundColor = "#a6a6a6";
        }
        
      }
      if (e.gridCell.column.dataField == "dia17") {
        if (gridCell.data.dia17 == "PC"){
          e.backgroundColor = "#fed966";
        }
        if (gridCell.data.dia17 == "EC") {
          e.backgroundColor = "#fb0000";
        }
        if (gridCell.data.dia17 == "TC") {
          e.backgroundColor = "#70ad46";
        }
        if (gridCell.data.dia17 == "ED") {
          e.backgroundColor = "#012060";
        }
        if (gridCell.data.dia17 == "TV") {
          e.backgroundColor = "#aad08d";
        }
        if (gridCell.data.dia17 == "TT") {
          e.backgroundColor = "#ffd963";
        }
        if (gridCell.data.dia17 == "D") {
          e.backgroundColor = "#fffafaff";
        }
        if (gridCell.data.dia17 == "V") {
          e.backgroundColor = "#cdcbcb";
        }
        if (gridCell.data.dia17 == "P") {
          e.backgroundColor = "#fcc6c6";
        }
        if (gridCell.data.dia17 == "A") {
          e.backgroundColor = "#fffdfdff";
        }
        if (gridCell.data.dia17 == "TD") {
          e.backgroundColor = "#9bc1e7";
        }
        if (gridCell.data.dia17 == "DV") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia17 == "PA") {
          e.backgroundColor = "#9cc1e5";
        }
        if (gridCell.data.dia17 == "PR") {
          e.backgroundColor = "#4572c6";
        }
        if (gridCell.data.dia17 == "AU") {
          e.backgroundColor = "#c7dfb3";
        }
        if (gridCell.data.dia17 == "IN") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia17 == "TS") {
          e.backgroundColor = "#a6a6a6";
        }
        
      }
      if (e.gridCell.column.dataField == "dia18") {
        if (gridCell.data.dia18 == "PC"){
          e.backgroundColor = "#fed966";
        }
        if (gridCell.data.dia18 == "EC") {
          e.backgroundColor = "#fb0000";
        }
        if (gridCell.data.dia18 == "TC") {
          e.backgroundColor = "#70ad46";
        }
        if (gridCell.data.dia18 == "ED") {
          e.backgroundColor = "#012060";
        }
        if (gridCell.data.dia18 == "TV") {
          e.backgroundColor = "#aad08d";
        }
        if (gridCell.data.dia18 == "TT") {
          e.backgroundColor = "#ffd963";
        }
        if (gridCell.data.dia18 == "D") {
          e.backgroundColor = "#fffafaff";
        }
        if (gridCell.data.dia18 == "V") {
          e.backgroundColor = "#cdcbcb";
        }
        if (gridCell.data.dia18 == "P") {
          e.backgroundColor = "#fcc6c6";
        }
        if (gridCell.data.dia18 == "A") {
          e.backgroundColor = "#fffdfdff";
        }
        if (gridCell.data.dia18 == "TD") {
          e.backgroundColor = "#9bc1e7";
        }
        if (gridCell.data.dia18 == "DV") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia18 == "PA") {
          e.backgroundColor = "#9cc1e5";
        }
        if (gridCell.data.dia18 == "PR") {
          e.backgroundColor = "#4572c6";
        }
        if (gridCell.data.dia18 == "AU") {
          e.backgroundColor = "#c7dfb3";
        }
        if (gridCell.data.dia18 == "IN") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia18 == "TS") {
          e.backgroundColor = "#a6a6a6";
        }
        
      }
      if (e.gridCell.column.dataField == "dia19") {
        if (gridCell.data.dia19 == "PC"){
          e.backgroundColor = "#fed966";
        }
        if (gridCell.data.dia19 == "EC") {
          e.backgroundColor = "#fb0000";
        }
        if (gridCell.data.dia19 == "TC") {
          e.backgroundColor = "#70ad46";
        }
        if (gridCell.data.dia19 == "ED") {
          e.backgroundColor = "#012060";
        }
        if (gridCell.data.dia19 == "TV") {
          e.backgroundColor = "#aad08d";
        }
        if (gridCell.data.dia19 == "TT") {
          e.backgroundColor = "#ffd963";
        }
        if (gridCell.data.dia19 == "D") {
          e.backgroundColor = "#fffafaff";
        }
        if (gridCell.data.dia19 == "V") {
          e.backgroundColor = "#cdcbcb";
        }
        if (gridCell.data.dia19 == "P") {
          e.backgroundColor = "#fcc6c6";
        }
        if (gridCell.data.dia19 == "A") {
          e.backgroundColor = "#fffdfdff";
        }
        if (gridCell.data.dia19 == "TD") {
          e.backgroundColor = "#9bc1e7";
        }
        if (gridCell.data.dia19 == "DV") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia19 == "PA") {
          e.backgroundColor = "#9cc1e5";
        }
        if (gridCell.data.dia19 == "PR") {
          e.backgroundColor = "#4572c6";
        }
        if (gridCell.data.dia19 == "AU") {
          e.backgroundColor = "#c7dfb3";
        }
        if (gridCell.data.dia19 == "IN") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia19 == "TS") {
          e.backgroundColor = "#a6a6a6";
        }
        
      }
      if (e.gridCell.column.dataField == "dia20") {
        if (gridCell.data.dia20 == "PC"){
          e.backgroundColor = "#fed966";
        }
        if (gridCell.data.dia20 == "EC") {
          e.backgroundColor = "#fb0000";
        }
        if (gridCell.data.dia20 == "TC") {
          e.backgroundColor = "#70ad46";
        }
        if (gridCell.data.dia20 == "ED") {
          e.backgroundColor = "#012060";
        }
        if (gridCell.data.dia20 == "TV") {
          e.backgroundColor = "#aad08d";
        }
        if (gridCell.data.dia20 == "TT") {
          e.backgroundColor = "#ffd963";
        }
        if (gridCell.data.dia20 == "D") {
          e.backgroundColor = "#fffafaff";
        }
        if (gridCell.data.dia20 == "V") {
          e.backgroundColor = "#cdcbcb";
        }
        if (gridCell.data.dia20 == "P") {
          e.backgroundColor = "#fcc6c6";
        }
        if (gridCell.data.dia20 == "A") {
          e.backgroundColor = "#fffdfdff";
        }
        if (gridCell.data.dia20 == "TD") {
          e.backgroundColor = "#9bc1e7";
        }
        if (gridCell.data.dia20 == "DV") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia20 == "PA") {
          e.backgroundColor = "#9cc1e5";
        }
        if (gridCell.data.dia20 == "PR") {
          e.backgroundColor = "#4572c6";
        }
        if (gridCell.data.dia20 == "AU") {
          e.backgroundColor = "#c7dfb3";
        }
        if (gridCell.data.dia20 == "IN") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia20 == "TS") {
          e.backgroundColor = "#a6a6a6";
        }
        
      }
      if (e.gridCell.column.dataField == "dia21") {
        if (gridCell.data.dia21 == "PC"){
          e.backgroundColor = "#fed966";
        }
        if (gridCell.data.dia21 == "EC") {
          e.backgroundColor = "#fb0000";
        }
        if (gridCell.data.dia21 == "TC") {
          e.backgroundColor = "#70ad46";
        }
        if (gridCell.data.dia21 == "ED") {
          e.backgroundColor = "#012060";
        }
        if (gridCell.data.dia21 == "TV") {
          e.backgroundColor = "#aad08d";
        }
        if (gridCell.data.dia21 == "TT") {
          e.backgroundColor = "#ffd963";
        }
        if (gridCell.data.dia21 == "D") {
          e.backgroundColor = "#fffafaff";
        }
        if (gridCell.data.dia21 == "V") {
          e.backgroundColor = "#cdcbcb";
        }
        if (gridCell.data.dia21 == "P") {
          e.backgroundColor = "#fcc6c6";
        }
        if (gridCell.data.dia21 == "A") {
          e.backgroundColor = "#fffdfdff";
        }
       if (gridCell.data.dia21 == "TD") {
          e.backgroundColor = "#9bc1e7";
        }
        if (gridCell.data.dia21 == "DV") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia21 == "PA") {
          e.backgroundColor = "#9cc1e5";
        }
        if (gridCell.data.dia21 == "PR") {
          e.backgroundColor = "#4572c6";
        }
        if (gridCell.data.dia21 == "AU") {
          e.backgroundColor = "#c7dfb3";
        }
        if (gridCell.data.dia21 == "IN") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia21 == "TS") {
          e.backgroundColor = "#a6a6a6";
        }
      }
      if (e.gridCell.column.dataField == "dia22") {
        if (gridCell.data.dia22 == "PC"){
          e.backgroundColor = "#fed966";
        }
        if (gridCell.data.dia22 == "EC") {
          e.backgroundColor = "#fb0000";
        }
        if (gridCell.data.dia22 == "TC") {
          e.backgroundColor = "#70ad46";
        }
        if (gridCell.data.dia22 == "ED") {
          e.backgroundColor = "#012060";
        }
        if (gridCell.data.dia22 == "TV") {
          e.backgroundColor = "#aad08d";
        }
        if (gridCell.data.dia22 == "TT") {
          e.backgroundColor = "#ffd963";
        }
        if (gridCell.data.dia22 == "D") {
          e.backgroundColor = "#fffafaff";
        }
        if (gridCell.data.dia22 == "V") {
          e.backgroundColor = "#cdcbcb";
        }
        if (gridCell.data.dia22 == "P") {
          e.backgroundColor = "#fcc6c6";
        }
        if (gridCell.data.dia22 == "A") {
          e.backgroundColor = "#fffdfdff";
        }
        if (gridCell.data.dia22 == "TD") {
          e.backgroundColor = "#9bc1e7";
        }
        if (gridCell.data.dia22 == "DV") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia22 == "PA") {
          e.backgroundColor = "#9cc1e5";
        }
        if (gridCell.data.dia22 == "PR") {
          e.backgroundColor = "#4572c6";
        }
        if (gridCell.data.dia22 == "AU") {
          e.backgroundColor = "#c7dfb3";
        }
        if (gridCell.data.dia22 == "IN") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia22 == "TS") {
          e.backgroundColor = "#a6a6a6";
        }
      }
      if (e.gridCell.column.dataField == "dia23") {
        if (gridCell.data.dia23 == "PC"){
          e.backgroundColor = "#fed966";
        }
        if (gridCell.data.dia23 == "EC") {
          e.backgroundColor = "#fb0000";
        }
        if (gridCell.data.dia23 == "TC") {
          e.backgroundColor = "#70ad46";
        }
        if (gridCell.data.dia23 == "ED") {
          e.backgroundColor = "#012060";
        }
        if (gridCell.data.dia23 == "TV") {
          e.backgroundColor = "#aad08d";
        }
        if (gridCell.data.dia23 == "TT") {
          e.backgroundColor = "#ffd963";
        }
        if (gridCell.data.dia23 == "D") {
          e.backgroundColor = "#fffafaff";
        }
        if (gridCell.data.dia23 == "V") {
          e.backgroundColor = "#cdcbcb";
        }
        if (gridCell.data.dia23 == "P") {
          e.backgroundColor = "#fcc6c6";
        }
        if (gridCell.data.dia23 == "A") {
          e.backgroundColor = "#fffdfdff";
        }
        if (gridCell.data.dia23 == "TD") {
          e.backgroundColor = "#9bc1e7";
        }
        if (gridCell.data.dia23 == "DV") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia23 == "PA") {
          e.backgroundColor = "#9cc1e5";
        }
        if (gridCell.data.dia23 == "PR") {
          e.backgroundColor = "#4572c6";
        }
        if (gridCell.data.dia23 == "AU") {
          e.backgroundColor = "#c7dfb3";
        }
        if (gridCell.data.dia23 == "IN") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia23 == "TS") {
          e.backgroundColor = "#a6a6a6";
        }
      }
      if (e.gridCell.column.dataField == "dia24") {
        if (gridCell.data.dia24 == "PC"){
          e.backgroundColor = "#fed966";
        }
        if (gridCell.data.dia24 == "EC") {
          e.backgroundColor = "#fb0000";
        }
        if (gridCell.data.dia24 == "TC") {
          e.backgroundColor = "#70ad46";
        }
        if (gridCell.data.dia24 == "ED") {
          e.backgroundColor = "#012060";
        }
        if (gridCell.data.dia24 == "TV") {
          e.backgroundColor = "#aad08d";
        }
        if (gridCell.data.dia24 == "TT") {
          e.backgroundColor = "#ffd963";
        }
        if (gridCell.data.dia24 == "D") {
          e.backgroundColor = "#fffafaff";
        }
        if (gridCell.data.dia24 == "V") {
          e.backgroundColor = "#cdcbcb";
        }
        if (gridCell.data.dia24 == "P") {
          e.backgroundColor = "#fcc6c6";
        }
        if (gridCell.data.dia24 == "A") {
          e.backgroundColor = "#fffdfdff";
        }
        if (gridCell.data.dia24 == "TD") {
          e.backgroundColor = "#9bc1e7";
        }
        if (gridCell.data.dia24 == "DV") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia24 == "PA") {
          e.backgroundColor = "#9cc1e5";
        }
        if (gridCell.data.dia24 == "PR") {
          e.backgroundColor = "#4572c6";
        }
        if (gridCell.data.dia24 == "AU") {
          e.backgroundColor = "#c7dfb3";
        }
        if (gridCell.data.dia24 == "IN") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia24 == "TS") {
          e.backgroundColor = "#a6a6a6";
        }
      }
      if (e.gridCell.column.dataField == "dia25") {
        if (gridCell.data.dia25 == "PC"){
          e.backgroundColor = "#fed966";
        }
        if (gridCell.data.dia25 == "EC") {
          e.backgroundColor = "#fb0000";
        }
        if (gridCell.data.dia25 == "TC") {
          e.backgroundColor = "#70ad46";
        }
        if (gridCell.data.dia25 == "ED") {
          e.backgroundColor = "#012060";
        }
        if (gridCell.data.dia25 == "TV") {
          e.backgroundColor = "#aad08d";
        }
        if (gridCell.data.dia25 == "TT") {
          e.backgroundColor = "#ffd963";
        }
        if (gridCell.data.dia25 == "D") {
          e.backgroundColor = "#fffafaff";
        }
        if (gridCell.data.dia25 == "V") {
          e.backgroundColor = "#cdcbcb";
        }
        if (gridCell.data.dia25 == "P") {
          e.backgroundColor = "#fcc6c6";
        }
        if (gridCell.data.dia25 == "A") {
          e.backgroundColor = "#fffdfdff";
        }
        if (gridCell.data.dia25 == "TD") {
          e.backgroundColor = "#9bc1e7";
        }
        if (gridCell.data.dia25 == "DV") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia25 == "PA") {
          e.backgroundColor = "#9cc1e5";
        }
        if (gridCell.data.dia25 == "PR") {
          e.backgroundColor = "#4572c6";
        }
        if (gridCell.data.dia25 == "AU") {
          e.backgroundColor = "#c7dfb3";
        }
        if (gridCell.data.dia25 == "IN") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia25 == "TS") {
          e.backgroundColor = "#a6a6a6";
        }
      }
      if (e.gridCell.column.dataField == "dia26") {
        if (gridCell.data.dia26 == "PC"){
          e.backgroundColor = "#fed966";
        }
        if (gridCell.data.dia26 == "EC") {
          e.backgroundColor = "#fb0000";
        }
        if (gridCell.data.dia26 == "TC") {
          e.backgroundColor = "#70ad46";
        }
        if (gridCell.data.dia26 == "ED") {
          e.backgroundColor = "#012060";
        }
        if (gridCell.data.dia26 == "TV") {
          e.backgroundColor = "#aad08d";
        }
        if (gridCell.data.dia26 == "TT") {
          e.backgroundColor = "#ffd963";
        }
        if (gridCell.data.dia26 == "D") {
          e.backgroundColor = "#fffafaff";
        }
        if (gridCell.data.dia26 == "V") {
          e.backgroundColor = "#cdcbcb";
        }
        if (gridCell.data.dia26 == "P") {
          e.backgroundColor = "#fcc6c6";
        }
        if (gridCell.data.dia26 == "A") {
          e.backgroundColor = "#fffdfdff";
        }
        if (gridCell.data.dia26 == "TD") {
          e.backgroundColor = "#9bc1e7";
        }
        if (gridCell.data.dia26 == "DV") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia26 == "PA") {
          e.backgroundColor = "#9cc1e5";
        }
        if (gridCell.data.dia26 == "PR") {
          e.backgroundColor = "#4572c6";
        }
        if (gridCell.data.dia26 == "AU") {
          e.backgroundColor = "#c7dfb3";
        }
        if (gridCell.data.dia26 == "IN") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia26 == "TS") {
          e.backgroundColor = "#a6a6a6";
        }
      }
      if (e.gridCell.column.dataField == "dia27") {
        if (gridCell.data.dia27 == "PC"){
          e.backgroundColor = "#fed966";
        }
        if (gridCell.data.dia27 == "EC") {
          e.backgroundColor = "#fb0000";
        }
        if (gridCell.data.dia27 == "TC") {
          e.backgroundColor = "#70ad46";
        }
        if (gridCell.data.dia27 == "ED") {
          e.backgroundColor = "#012060";
        }
        if (gridCell.data.dia27 == "TV") {
          e.backgroundColor = "#aad08d";
        }
        if (gridCell.data.dia27 == "TT") {
          e.backgroundColor = "#ffd963";
        }
        if (gridCell.data.dia27 == "D") {
          e.backgroundColor = "#fffafaff";
        }
        if (gridCell.data.dia27 == "V") {
          e.backgroundColor = "#cdcbcb";
        }
        if (gridCell.data.dia27 == "P") {
          e.backgroundColor = "#fcc6c6";
        }
        if (gridCell.data.dia27 == "A") {
          e.backgroundColor = "#fffdfdff";
        }
        if (gridCell.data.dia27 == "TD") {
          e.backgroundColor = "#9bc1e7";
        }
        if (gridCell.data.dia27 == "DV") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia27 == "PA") {
          e.backgroundColor = "#9cc1e5";
        }
        if (gridCell.data.dia27 == "PR") {
          e.backgroundColor = "#4572c6";
        }
        if (gridCell.data.dia27 == "AU") {
          e.backgroundColor = "#c7dfb3";
        }
        if (gridCell.data.dia27 == "IN") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia27 == "TS") {
          e.backgroundColor = "#a6a6a6";
        }
      }
      if (e.gridCell.column.dataField == "dia28") {
        if (gridCell.data.dia28 == "PC"){
          e.backgroundColor = "#fed966";
        }
        if (gridCell.data.dia28 == "EC") {
          e.backgroundColor = "#fb0000";
        }
        if (gridCell.data.dia28 == "TC") {
          e.backgroundColor = "#70ad46";
        }
        if (gridCell.data.dia28 == "ED") {
          e.backgroundColor = "#012060";
        }
        if (gridCell.data.dia28 == "TV") {
          e.backgroundColor = "#aad08d";
        }
        if (gridCell.data.dia28 == "TT") {
          e.backgroundColor = "#ffd963";
        }
        if (gridCell.data.dia28 == "D") {
          e.backgroundColor = "#fffafaff";
        }
        if (gridCell.data.dia28 == "V") {
          e.backgroundColor = "#cdcbcb";
        }
        if (gridCell.data.dia28 == "P") {
          e.backgroundColor = "#fcc6c6";
        }
        if (gridCell.data.dia28 == "A") {
          e.backgroundColor = "#fffdfdff";
        }
        if (gridCell.data.dia28 == "TD") {
          e.backgroundColor = "#9bc1e7";
        }
        if (gridCell.data.dia28 == "DV") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia28 == "PA") {
          e.backgroundColor = "#9cc1e5";
        }
        if (gridCell.data.dia28 == "PR") {
          e.backgroundColor = "#4572c6";
        }
        if (gridCell.data.dia28 == "AU") {
          e.backgroundColor = "#c7dfb3";
        }
        if (gridCell.data.dia28 == "IN") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia28 == "TS") {
          e.backgroundColor = "#a6a6a6";
        }
      }
      if (e.gridCell.column.dataField == "dia29") {
        if (gridCell.data.dia29 == "PC"){
          e.backgroundColor = "#fed966";
        }
        if (gridCell.data.dia29 == "EC") {
          e.backgroundColor = "#fb0000";
        }
        if (gridCell.data.dia29 == "TC") {
          e.backgroundColor = "#70ad46";
        }
        if (gridCell.data.dia29 == "ED") {
          e.backgroundColor = "#012060";
        }
        if (gridCell.data.dia29 == "TV") {
          e.backgroundColor = "#aad08d";
        }
        if (gridCell.data.dia29 == "TT") {
          e.backgroundColor = "#ffd963";
        }
        if (gridCell.data.dia29 == "D") {
          e.backgroundColor = "#fffafaff";
        }
        if (gridCell.data.dia29 == "V") {
          e.backgroundColor = "#cdcbcb";
        }
        if (gridCell.data.dia29 == "P") {
          e.backgroundColor = "#fcc6c6";
        }
        if (gridCell.data.dia29 == "A") {
          e.backgroundColor = "#fffdfdff";
        }
        if (gridCell.data.dia29 == "TD") {
          e.backgroundColor = "#9bc1e7";
        }
        if (gridCell.data.dia29 == "DV") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia29 == "PA") {
          e.backgroundColor = "#9cc1e5";
        }
        if (gridCell.data.dia29 == "PR") {
          e.backgroundColor = "#4572c6";
        }
        if (gridCell.data.dia29 == "AU") {
          e.backgroundColor = "#c7dfb3";
        }
        if (gridCell.data.dia29 == "IN") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia29 == "TS") {
          e.backgroundColor = "#a6a6a6";
        }
      }
      if (e.gridCell.column.dataField == "dia30") {
        if (gridCell.data.dia30 == "PC"){
          e.backgroundColor = "#fed966";
        }
        if (gridCell.data.dia30 == "EC") {
          e.backgroundColor = "#fb0000";
        }
        if (gridCell.data.dia30 == "TC") {
          e.backgroundColor = "#70ad46";
        }
        if (gridCell.data.dia30 == "ED") {
          e.backgroundColor = "#012060";
        }
        if (gridCell.data.dia30 == "TV") {
          e.backgroundColor = "#aad08d";
        }
        if (gridCell.data.dia30 == "TT") {
          e.backgroundColor = "#ffd963";
        }
        if (gridCell.data.dia30 == "D") {
          e.backgroundColor = "#fffafaff";
        }
        if (gridCell.data.dia30 == "V") {
          e.backgroundColor = "#cdcbcb";
        }
        if (gridCell.data.dia30 == "P") {
          e.backgroundColor = "#fcc6c6";
        }
        if (gridCell.data.dia30 == "A") {
          e.backgroundColor = "#fffdfdff";
        }
        if (gridCell.data.dia30 == "TD") {
          e.backgroundColor = "#9bc1e7";
        }
        if (gridCell.data.dia30 == "DV") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia30 == "PA") {
          e.backgroundColor = "#9cc1e5";
        }
        if (gridCell.data.dia30 == "PR") {
          e.backgroundColor = "#4572c6";
        }
        if (gridCell.data.dia30 == "AU") {
          e.backgroundColor = "#c7dfb3";
        }
        if (gridCell.data.dia30 == "IN") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia30 == "TS") {
          e.backgroundColor = "#a6a6a6";
        }
      }
      if (e.gridCell.column.dataField == "dia31") {
        if (gridCell.data.dia31 == "PC"){
          e.backgroundColor = "#fed966";
        }
        if (gridCell.data.dia31 == "EC") {
          e.backgroundColor = "#fb0000";
        }
        if (gridCell.data.dia31 == "TC") {
          e.backgroundColor = "#70ad46";
        }
        if (gridCell.data.dia31 == "ED") {
          e.backgroundColor = "#012060";
        }
        if (gridCell.data.dia31 == "TV") {
          e.backgroundColor = "#aad08d";
        }
        if (gridCell.data.dia31 == "TT") {
          e.backgroundColor = "#ffd963";
        }
        if (gridCell.data.dia31 == "D") {
          e.backgroundColor = "#fffafaff";
        }
        if (gridCell.data.dia31 == "V") {
          e.backgroundColor = "#cdcbcb";
        }
        if (gridCell.data.dia31 == "P") {
          e.backgroundColor = "#fcc6c6";
        }
        if (gridCell.data.dia31 == "A") {
          e.backgroundColor = "#fffdfdff";
        }
       if (gridCell.data.dia31 == "TD") {
          e.backgroundColor = "#9bc1e7";
        }
        if (gridCell.data.dia31 == "DV") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia31 == "PA") {
          e.backgroundColor = "#9cc1e5";
        }
        if (gridCell.data.dia31 == "PR") {
          e.backgroundColor = "#4572c6";
        }
        if (gridCell.data.dia31 == "AU") {
          e.backgroundColor = "#c7dfb3";
        }
        if (gridCell.data.dia31 == "IN") {
          e.backgroundColor = "#bfbfbf";
        }
        if (gridCell.data.dia31 == "TS") {
          e.backgroundColor = "#a6a6a6";
        }
      }     
    }

    // if (gridCell.rowType === 'groupFooter') {
    //   e.backgroundColor = "#DCDCDC";
    //   e.fontWeight = "bolder"
    //   e.font = {bold: true}
    // }

    // if (gridCell.rowType === 'totalFooter') {
      
    //   e.backgroundColor = "#ff9460";
    //   e.fontWeight = "bolder"
    //   e.font = {bold: true}
    // }
  }


  onRowPreparedDM(e: any) {
    // if (e.rowType == 'data') {

    //   e.cells.forEach((c: any) => {

    //     if (c.cellElement) {
    //       if (c.columnIndex == 2) {
    //         c.cellElement.style.fontWeight = "bolder";
    //         c.cellElement.style.fontSize = "15px";
    //         c.cellElement.style.background = "#cdcbcb";
    //       }
    //     }
    //   });
    // }
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

  onCellPreparedDM(e: any) {
    if (e.rowType == 'group') {

      e.cellElement.style.fontSize = '12px';
      e.cellElement.style.background = "#DCDCDC";
    }

    // if (e.rowType == 'groupFooter') {


    //   if (e.columnIndex == 2) {
    //     e.cellElement.style.fontWeight = "bolder";
    //     e.cellElement.style.fontSize = "15px";
    //     e.cellElement.style.background = "#cdcbcb";
    //   }
    // }
  }

  customizeOp(e) {
    var gridCell = e.gridCell;

    // if (gridCell.rowType === 'data') {

    //   if (e.gridCell.column.dataField == "disponibles") {
    //     e.backgroundColor = "#DCDCDC";
    //     e.fontWeight = "bolder"
    //     e.font = { bold: true }
    //   }     
    // }

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



  onRowPreparedOperador(e: any) {

    if (e.rowType == 'totalFooter') {
      //console.log(e.summaryCells)
      // this.graficaModel = [
      //   {mes: "ENERO", total: e.summaryCells[2][0].value, presupuesto: e.summaryCells[3][0].value},
      //   {mes: "FEBRERO", total: e.summaryCells[4][0].value, presupuesto: e.summaryCells[5][0].value},
      //   {mes: "MARZO", total: e.summaryCells[6][0].value, presupuesto: e.summaryCells[7][0].value},
      //   {mes: "ABRIL", total: e.summaryCells[8][0].value, presupuesto: e.summaryCells[9][0].value},
      //   {mes: "MAYO", total: e.summaryCells[10][0].value, presupuesto: e.summaryCells[11][0].value},
      //   {mes: "JUNIO", total: e.summaryCells[12][0].value, presupuesto: e.summaryCells[13][0].value},
      //   {mes: "JULIO", total: e.summaryCells[14][0].value, presupuesto: e.summaryCells[15][0].value},
      //   {mes: "AGOSTO", total: e.summaryCells[16][0].value, presupuesto: e.summaryCells[17][0].value},
      //   {mes: "SEPTIEMBRE", total: e.summaryCells[18][0].value, presupuesto: e.summaryCells[19][0].value},
      //   {mes: "OCTUBRE", total: e.summaryCells[20][0].value, presupuesto: e.summaryCells[21][0].value},
      //   {mes: "NOVIEMBRE", total: e.summaryCells[22][0].value, presupuesto: e.summaryCells[23][0].value},
      //   {mes: "DICIEMBRE", total: e.summaryCells[24][0].value, presupuesto: e.summaryCells[25][0].value},  
      // ]
      // e.summaryCells[7][0].value


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

  onCellPreparedOperador(e: any) {
    if (e.rowType == 'groupFooter') {

      e.cellElement.style.fontSize = '15px';
      e.cellElement.style.background = "#DCDCDC";
    }
  }

  onRowPreparedRemolques(e: any) {

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

  onCellPreparedRemolques(e: any) {
    if (e.rowType == 'group') {

      e.cellElement.style.fontSize = '12px';
      e.cellElement.style.background = "#DCDCDC";
    }
    if (e.rowType == 'groupFooter') {

      e.cellElement.style.fontSize = '15px';
      e.cellElement.style.background = "#DCDCDC";
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



  onCellPreparedDetalle(e: any) {
    if (e.rowType == 'groupFooter') {

      e.cellElement.style.fontSize = '15px';
      e.cellElement.style.background = "#DCDCDC";
    }

    if (e.rowType == 'totalFooter') {

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
        if (c.totalItem.summaryCells[6][0] !== undefined) {
          totalE === 0 ? c.totalItem.summaryCells[6][0].value = 0 : c.totalItem.summaryCells[6][0].value = totalE / anioAntE;
          presupuestoE === 0 ? c.totalItem.summaryCells[8][0].value = 0 : c.totalItem.summaryCells[8][0].value = totalE / presupuestoE;
          proyeccionE === 0 ? c.totalItem.summaryCells[10][0].value = 0 : c.totalItem.summaryCells[10][0].value = totalE / proyeccionE;

          totalesPor.totalE = c.totalItem.summaryCells[6][0].value;
          totalesPor.presupuestoE = c.totalItem.summaryCells[8][0].value;
          totalesPor.proyeccionE = c.totalItem.summaryCells[10][0].value;

        }
        //Febrero
        if (c.totalItem.summaryCells[13][0] !== undefined) {
          totalFB === 0 ? c.totalItem.summaryCells[15][0].value = 0 : c.totalItem.summaryCells[15][0].value = totalFB / anioAntFB;
          presupuestoFB === 0 ? c.totalItem.summaryCells[17][0].value = 0 : c.totalItem.summaryCells[17][0].value = totalFB / presupuestoFB;
          proyeccionFB === 0 ? c.totalItem.summaryCells[19][0].value = 0 : c.totalItem.summaryCells[19][0].value = totalFB / proyeccionFB;

          totalesPor.totalFB = c.totalItem.summaryCells[15][0].value
          totalesPor.presupuestoFB = c.totalItem.summaryCells[17][0].value
          totalesPor.proyeccionFB = c.totalItem.summaryCells[19][0].value
        }
        //Marzo
        if (c.totalItem.summaryCells[22][0] !== undefined) {
          totalM === 0 ? c.totalItem.summaryCells[24][0].value = 0 : c.totalItem.summaryCells[24][0].value = totalM / anioAntM;
          presupuestoM === 0 ? c.totalItem.summaryCells[26][0].value = 0 : c.totalItem.summaryCells[26][0].value = totalM / presupuestoM;
          proyeccionM === 0 ? c.totalItem.summaryCells[28][0].value = 0 : c.totalItem.summaryCells[28][0].value = totalM / proyeccionM;

          totalesPor.totalM = c.totalItem.summaryCells[24][0].value
          totalesPor.presupuestoM = c.totalItem.summaryCells[26][0].value
          totalesPor.proyeccionM = c.totalItem.summaryCells[28][0].value
        }
        //Abril
        if (c.totalItem.summaryCells[31][0] !== undefined) {
          totalA === 0 ? c.totalItem.summaryCells[33][0].value = 0 : c.totalItem.summaryCells[33][0].value = totalA / anioAntA;
          presupuestoA === 0 ? c.totalItem.summaryCells[35][0].value = 0 : c.totalItem.summaryCells[35][0].value = totalA / presupuestoA;
          proyeccionA === 0 ? c.totalItem.summaryCells[37][0].value = 0 : c.totalItem.summaryCells[37][0].value = totalA / proyeccionA;

          totalesPor.totalA = c.totalItem.summaryCells[33][0].value
          totalesPor.presupuestoA = c.totalItem.summaryCells[35][0].value
          totalesPor.proyeccionA = c.totalItem.summaryCells[37][0].value
        }
        //Mayo
        if (c.totalItem.summaryCells[40][0] !== undefined) {
          totalMY === 0 ? c.totalItem.summaryCells[42][0].value = 0 : c.totalItem.summaryCells[42][0].value = totalMY / anioAntMY;
          presupuestoMY === 0 ? c.totalItem.summaryCells[44][0].value = 0 : c.totalItem.summaryCells[44][0].value = totalMY / presupuestoMY;
          proyeccionMY === 0 ? c.totalItem.summaryCells[46][0].value = 0 : c.totalItem.summaryCells[46][0].value = totalMY / proyeccionMY;

          totalesPor.totalMY = c.totalItem.summaryCells[42][0].value
          totalesPor.presupuestoMY = c.totalItem.summaryCells[44][0].value
          totalesPor.proyeccionMY = c.totalItem.summaryCells[46][0].value
        }
        //Junio
        if (c.totalItem.summaryCells[49][0] !== undefined) {
          totalJN === 0 ? c.totalItem.summaryCells[51][0].value = 0 : c.totalItem.summaryCells[51][0].value = totalJN / anioAntJN;
          presupuestoJN === 0 ? c.totalItem.summaryCells[53][0].value = 0 : c.totalItem.summaryCells[53][0].value = totalJN / presupuestoJN;
          proyeccionJN === 0 ? c.totalItem.summaryCells[55][0].value = 0 : c.totalItem.summaryCells[55][0].value = totalJN / proyeccionJN;

          totalesPor.totalJN = c.totalItem.summaryCells[51][0].value
          totalesPor.presupuestoJN = c.totalItem.summaryCells[53][0].value
          totalesPor.proyeccionJN = c.totalItem.summaryCells[55][0].value
        }
        //Julio
        if (c.totalItem.summaryCells[58][0] !== undefined) {
          totalJL === 0 ? c.totalItem.summaryCells[60][0].value = 0 : c.totalItem.summaryCells[60][0].value = totalJL / anioAntJL;
          presupuestoJL === 0 ? c.totalItem.summaryCells[62][0].value = 0 : c.totalItem.summaryCells[62][0].value = totalJL / presupuestoJL;
          proyeccionJL === 0 ? c.totalItem.summaryCells[64][0].value = 0 : c.totalItem.summaryCells[64][0].value = totalJL / proyeccionJL;

          totalesPor.totalJL = c.totalItem.summaryCells[60][0].value
          totalesPor.presupuestoJL = c.totalItem.summaryCells[62][0].value
          totalesPor.proyeccionJL = c.totalItem.summaryCells[64][0].value
        }
        //Agosto
        if (c.totalItem.summaryCells[67][0] !== undefined) {
          totalAG === 0 ? c.totalItem.summaryCells[69][0].value = 0 : c.totalItem.summaryCells[69][0].value = totalAG / anioAntAG;
          presupuestoAG === 0 ? c.totalItem.summaryCells[71][0].value = 0 : c.totalItem.summaryCells[71][0].value = totalAG / presupuestoAG;
          proyeccionAG === 0 ? c.totalItem.summaryCells[73][0].value = 0 : c.totalItem.summaryCells[73][0].value = totalAG / proyeccionAG;

          totalesPor.totalAG = c.totalItem.summaryCells[69][0].value
          totalesPor.presupuestoAG = c.totalItem.summaryCells[71][0].value
          totalesPor.proyeccionAG = c.totalItem.summaryCells[73][0].value
        }
        //Septiembre
        if (c.totalItem.summaryCells[76][0] !== undefined) {
          totalS === 0 ? c.totalItem.summaryCells[78][0].value = 0 : c.totalItem.summaryCells[78][0].value = totalS / anioAntS;
          presupuestoS === 0 ? c.totalItem.summaryCells[80][0].value = 0 : c.totalItem.summaryCells[80][0].value = totalS / presupuestoS;
          proyeccionS === 0 ? c.totalItem.summaryCells[82][0].value = 0 : c.totalItem.summaryCells[82][0].value = totalS / proyeccionS;

          totalesPor.totalS = c.totalItem.summaryCells[78][0].value
          totalesPor.presupuestoS = c.totalItem.summaryCells[80][0].value
          totalesPor.proyeccionS = c.totalItem.summaryCells[82][0].value
        }
        //Octubre
        if (c.totalItem.summaryCells[86][0] !== undefined) {
          totalOC === 0 ? c.totalItem.summaryCells[88][0].value = 0 : c.totalItem.summaryCells[88][0].value = totalOC / anioAntOC;
          presupuestoOC === 0 ? c.totalItem.summaryCells[90][0].value = 0 : c.totalItem.summaryCells[90][0].value = totalOC / presupuestoOC;
          proyeccionOC === 0 ? c.totalItem.summaryCells[92][0].value = 0 : c.totalItem.summaryCells[92][0].value = totalOC / proyeccionOC;

          totalesPor.totalOC = c.totalItem.summaryCells[88][0].value
          totalesPor.presupuestoOC = c.totalItem.summaryCells[90][0].value
          totalesPor.proyeccionOC = c.totalItem.summaryCells[92][0].value
        }
        //Noviembre
        if (c.totalItem.summaryCells[95][0] !== undefined) {
          totalNV === 0 ? c.totalItem.summaryCells[97][0].value = 0 : c.totalItem.summaryCells[97][0].value = totalNV / anioAntNV;
          presupuestoNV === 0 ? c.totalItem.summaryCells[99][0].value = 0 : c.totalItem.summaryCells[99][0].value = totalNV / presupuestoNV;
          proyeccionNV === 0 ? c.totalItem.summaryCells[101][0].value = 0 : c.totalItem.summaryCells[101][0].value = totalNV / proyeccionNV;

          totalesPor.totalNV = c.totalItem.summaryCells[97][0].value
          totalesPor.presupuestoNV = c.totalItem.summaryCells[99][0].value
          totalesPor.proyeccionNV = c.totalItem.summaryCells[101][0].value
        }
        //Diciembre
        if (c.totalItem.summaryCells[104][0] !== undefined) {
          totalDC === 0 ? c.totalItem.summaryCells[106][0].value = 0 : c.totalItem.summaryCells[106][0].value = totalDC / anioAntDC;
          presupuestoDC === 0 ? c.totalItem.summaryCells[108][0].value = 0 : c.totalItem.summaryCells[108][0].value = totalDC / presupuestoDC;
          proyeccionDC === 0 ? c.totalItem.summaryCells[110][0].value = 0 : c.totalItem.summaryCells[110][0].value = totalDC / presupuestoDC;

          totalesPor.totalDC = c.totalItem.summaryCells[106][0].value
          totalesPor.presupuestoDC = c.totalItem.summaryCells[108][0].value
          totalesPor.proyeccionDC = c.totalItem.summaryCells[110][0].value
        }

      })

    }
  }

  onRowPreparedRTracto(e: any) {
  }

  onCellPreparedRTracto(e: any) {
    if (e.rowType == 'group') {

      e.cellElement.style.fontSize = '12px';
      e.cellElement.style.background = "#DCDCDC";
    }

    if (e.rowType == 'groupFooter') {

    }
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

  openModal(value){
    let idOperador = value.data.id_personal; 
    this.disponibilidadService.getOperador(idOperador).subscribe(data =>{
      this.operadorDetalle = data.data;
      // console.log(this.operadorDetalle)

      this.openModalOperador = true;
    })
  }

  openModalUnidad(value){
    let idUnidad = value.data.tracto; 
    this.disponibilidadService.getUTracto(idUnidad).subscribe(data =>{
      this.unidadDetalle = data.data;
      console.log(this.unidadDetalle)

      this.openModalUnidades = true;
    })
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
    console.log(value)
  }
   customizeLabelDonut(point) {
    return `${point.argumentText}   :    $ ${point.valueText}`;
  }

  calculatePercent(value){
    //var mypercent = 
    var mypercent = value * 100;
    var myvalue = Math.trunc(mypercent);
    
    return myvalue +"%";
  }
}
