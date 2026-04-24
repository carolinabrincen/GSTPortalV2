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
import { TotalesXDisponibilidad, TotalOperacion, TotalesXTracos, TotalOpeT, TotalesXRemolques, TotalOpeR  } from '../../shared/models/disponiblidad/totalesXDisponibilidad';

import notify from 'devextreme/ui/notify';

import { Workbook } from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { saveAs } from 'file-saver-es';
import { group } from 'console';

const totalesPor = new TotalPorcentajes;
const totalesPorGr = new TotalPorcentajes;

const groupName = new Modelos;

const totalXDisponibilidad = new TotalesXDisponibilidad;
const totalXD = new TotalesXDisponibilidad;
const totalOperacion = new TotalOperacion;
const totalOD = new TotalOperacion;

const totalXTractos = new TotalesXTracos;
const totalXT = new TotalesXTracos;
const totalOpeT  = new TotalOpeT;
const totalOT  = new TotalOpeT;

const totalXRemolques = new TotalesXRemolques;
const totalXR = new TotalesXRemolques;
const totalOpeR  = new TotalOpeR;
const totalOR  = new TotalOpeR;

@Component({
  templateUrl: './disponiblidad.component.html',
  styleUrls: ['./disponiblidad.component.scss'],
  providers: [UnidadesService, ServiceSales, CurrencyPipe, Service],
})

export class disponiblidadComponent implements OnInit {

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

  unidadNegoios: any[] = [
    { idUnidad: 0, ciudad: 'TODOS' },
    { idUnidad: 1, ciudad: 'ORIZABA' },
    { idUnidad: 2, ciudad: 'GUADALAJARA' },
    { idUnidad: 3, ciudad: 'RAMOS ARIZPE' },
    { idUnidad: 4, ciudad: 'MEXICALI' },
    { idUnidad: 5, ciudad: 'HERMOSILLO' },
    { idUnidad: 8, ciudad: 'CUAUTITLAN' },
    { idUnidad: 9, ciudad: 'TULTITLAN' },
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

  operaciones: any[] = [
    { id: 0, descripcion: 'SIN ASIGNAR' },
    { id: 4, descripcion: 'CAJA SECA' },
    { id: 10, descripcion: 'GONDOLA' },
    { id: 11, descripcion: 'TOLVA GRANEL' },
    { id: 8, descripcion: 'GRADO ALIMENT' },
    { id: 9, descripcion: 'ENCORTINADO' },



  ];

  selectedUdn: number = 0;
  selectedOperacion: number = 0;
  selectedTransporte: number = 0;
  selectedPeriodo: number = 0;
  selectedStatus: number = 0;


  printUdn: string = "";

  formFilter: any = {
    Fecha: ''
  }

  resumenOperadores: any = [];
  resumenTractos: any = [];
  resumenRemolques: any = [];
  resumenDolly: any = [];
  tractos: any = [];
  operadores: any = [];
  remolque: any = [];

  operadorDetalle: any = [];
  unidadDetalle: any =  [];

  promedioMensual: any = 0;

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

  getDisponiblidadAnual() {
    this.disponibilidadService.postDisponiblidad(this.selectedUdn, this.formFilter.Fecha).subscribe((response) => {
      
      this.promedioMensual = response.data.promedioMensual

      this.resumenOperadores = response.data.resumenOperadores;
      this.resumenTractos = response.data.resumen;
      this.resumenRemolques = response.data.resumenRemolques;
      this.resumenDolly = response.data.resumenDollys;
      this.tractos = response.data.tractos;
      this.operadores = response.data.operadores;
      this.remolque = response.data.remolques;
      this.loadingVisible = false

      this.selectedOperacion = undefined;
      this.selectedStatus = undefined;
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
    //console.log(value)
  }
  selectOperacion(value: any) {
    this.selectedOperacion = value.value
    console.log(this.selectedOperacion)
  }
  selectStatus(value: any) {
    this.selectedStatus = value.value;
    console.log(value)
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
      this.getDisponiblidadAnual()

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
      this.getDisponiblidadAnual()

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
    if (this.selectedUdn !== undefined && this.formFilter.Fecha !== "") {
      this.loadingVisible = true;
      
      this.getDisponiblidadAnual();
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

  onRowPreparedResumenO(e: any) {
    if (e.rowType == 'data') {

      e.cells.forEach((c: any) => {

        if (c.cellElement) {
          if (c.columnIndex == 2) {
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.fontSize = "15px";
            c.cellElement.style.background = "#cdcbcb";
          }

          if (c.columnIndex == 12) {
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.fontSize = "15px";
            c.cellElement.style.background = "#cdcbcb";
          }

          if (c.columnIndex == 14) {
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.fontSize = "15px";
            c.cellElement.style.background = "#cdcbcb";
          }


          if (c.columnIndex == 32) {
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.fontSize = "15px";
            c.cellElement.style.background = "#cdcbcb";
          }
        }
      });
    }
    if (e.rowType == 'groupFooter'){

      //console.log(e.summaryCells)
      totalXDisponibilidad.disponiblePor = e.summaryCells[2][0]?.value;
      totalXDisponibilidad.operandoPor = e.summaryCells[4][0]?.value;
      totalXDisponibilidad.enEsperaPor = e.summaryCells[6][0]?.value;
      totalXDisponibilidad.patioPor = e.summaryCells[8][0]?.value;
      totalXDisponibilidad.auxilioPor = e.summaryCells[10][0]?.value;
      totalXDisponibilidad.isntrictorPor = e.summaryCells[12][0]?.value;
      totalXDisponibilidad.noDisponiblePor = e.summaryCells[14][0]?.value;
      totalXDisponibilidad.tallerPor = e.summaryCells[16][0]?.value;
      totalXDisponibilidad.capacitacionPor = e.summaryCells[18][0]?.value;
      totalXDisponibilidad.descansosPor = e.summaryCells[20][0]?.value;
      totalXDisponibilidad.incapcidadPor = e.summaryCells[22][0]?.value;
      totalXDisponibilidad.ausentismoPor = e.summaryCells[24][0]?.value;
      totalXDisponibilidad.bajaPor = e.summaryCells[26][0]?.value;
      totalXDisponibilidad.corralonPor = e.summaryCells[28][0]?.value;
      totalXDisponibilidad.siniestradoPor = e.summaryCells[30][0]?.value;
      totalXDisponibilidad.total = e.summaryCells[32][0]?.value;
      // console.log("1 ==> "+totalXDisponibilidad.disponiblePor)

      totalOperacion.totalDisponiblePor = totalXDisponibilidad.disponiblePor / totalXDisponibilidad.total;
      totalOperacion.totalOperandoPor = totalXDisponibilidad.operandoPor / totalXDisponibilidad.total;
      totalOperacion.totalEnEsperaPor = totalXDisponibilidad.enEsperaPor / totalXDisponibilidad.total;
      totalOperacion.totalPatioPor = totalXDisponibilidad.patioPor / totalXDisponibilidad.total;
      totalOperacion.totalAuxilioPor = totalXDisponibilidad.auxilioPor / totalXDisponibilidad.total;
      totalOperacion.totalIsntrictorPor = totalXDisponibilidad.isntrictorPor / totalXDisponibilidad.total;
      totalOperacion.totalNoDisponiblePor = totalXDisponibilidad.noDisponiblePor / totalXDisponibilidad.total;
      totalOperacion.totalTallerPor = totalXDisponibilidad.tallerPor / totalXDisponibilidad.total;
      totalOperacion.totalCapacitacionPor = totalXDisponibilidad.capacitacionPor / totalXDisponibilidad.total;
      totalOperacion.totalDescansosPor = totalXDisponibilidad.descansosPor / totalXDisponibilidad.total;
      totalOperacion.totalIncapcidadPor = totalXDisponibilidad.incapcidadPor / totalXDisponibilidad.total;
      totalOperacion.totalAusentismoPor = totalXDisponibilidad.ausentismoPor / totalXDisponibilidad.total;
      totalOperacion.totalBajaPor = totalXDisponibilidad.bajaPor / totalXDisponibilidad.total;
      totalOperacion.totalCorralonPor = totalXDisponibilidad.corralonPor / totalXDisponibilidad.total;
      totalOperacion.totalSiniestradoPor = totalXDisponibilidad.siniestradoPor / totalXDisponibilidad.total;
      // console.log("2 ==> "+totalOperacion.totalDisponiblePor)


      e.summaryCells[3][0].value = totalOperacion.totalDisponiblePor; 
      e.summaryCells[5][0].value = totalOperacion.totalOperandoPor;
      e.summaryCells[7][0].value = totalOperacion.totalEnEsperaPor;
      e.summaryCells[9][0].value = totalOperacion.totalPatioPor;
      e.summaryCells[11][0].value = totalOperacion.totalAuxilioPor;
      e.summaryCells[13][0].value = totalOperacion.totalIsntrictorPor;
      e.summaryCells[15][0].value = totalOperacion.totalNoDisponiblePor;
      e.summaryCells[17][0].value = totalOperacion.totalTallerPor;
      e.summaryCells[19][0].value = totalOperacion.totalCapacitacionPor;
      e.summaryCells[21][0].value = totalOperacion.totalDescansosPor;
      e.summaryCells[23][0].value = totalOperacion.totalIncapcidadPor;
      e.summaryCells[25][0].value = totalOperacion.totalAusentismoPor;
      e.summaryCells[27][0].value = totalOperacion.totalBajaPor;
      e.summaryCells[29][0].value = totalOperacion.totalCorralonPor;
      e.summaryCells[31][0].value = totalOperacion.totalSiniestradoPor;
      // console.log("4 ==> "+e.summaryCells[3][0].value) 
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

  onCellPreparedResumenO(e: any) {
    if (e.rowType == 'group') {

      e.cellElement.style.fontSize = '12px';
      e.cellElement.style.background = "#DCDCDC";
    }

    if (e.rowType == 'groupFooter') {


      if (e.columnIndex == 2) {
        e.cellElement.style.fontWeight = "bolder";
        e.cellElement.style.fontSize = "15px";
        e.cellElement.style.background = "#cdcbcb";
      }

      if (e.columnIndex == 12) {
        e.cellElement.style.fontWeight = "bolder";
        e.cellElement.style.fontSize = "15px";
        e.cellElement.style.background = "#cdcbcb";
      }

      if (e.columnIndex == 14) {
        e.cellElement.style.fontWeight = "bolder";
        e.cellElement.style.fontSize = "15px";
        e.cellElement.style.background = "#cdcbcb";
      }

      // if(e.columnIndex == 24){
      //   e.cellElement.style.fontWeight = "bolder";
      //   e.cellElement.style.fontSize = "15px";
      //   e.cellElement.style.background = "#cdcbcb";
      // }

      // if (e.columnIndex == 29) {
      //   e.cellElement.style.fontWeight = "bolder";
      //   e.cellElement.style.fontSize = "15px";
      //   e.cellElement.style.background = "#cdcbcb";
      // }

      if (e.columnIndex == 32) {
        e.cellElement.style.fontWeight = "bolder";
        e.cellElement.style.fontSize = "15px";
        e.cellElement.style.background = "#cdcbcb";
      }

    }

    if (e.rowType == 'totalFooter') {
   
      e.totalItem.cells.forEach((c: any) => {
        // console.log(c.totalItem.summaryCells)
        totalXD.disponiblePor = c.totalItem.summaryCells[2][0].value;
        totalXD.operandoPor = c.totalItem.summaryCells[4][0].value;
        totalXD.enEsperaPor = c.totalItem.summaryCells[6][0].value;
        totalXD.patioPor = c.totalItem.summaryCells[8][0].value;
        totalXD.auxilioPor = c.totalItem.summaryCells[10][0].value;
        totalXD.isntrictorPor = c.totalItem.summaryCells[12][0].value;
        totalXD.noDisponiblePor = c.totalItem.summaryCells[14][0].value;
        totalXD.tallerPor = c.totalItem.summaryCells[16][0].value;
        totalXD.capacitacionPor = c.totalItem.summaryCells[18][0].value;
        totalXD.descansosPor = c.totalItem.summaryCells[20][0].value;
        totalXD.incapcidadPor = c.totalItem.summaryCells[22][0].value;
        totalXD.ausentismoPor = c.totalItem.summaryCells[24][0].value;
        totalXD.bajaPor = c.totalItem.summaryCells[26][0].value;
        totalXD.corralonPor = c.totalItem.summaryCells[28][0].value;
        totalXD.siniestradoPor = c.totalItem.summaryCells[30][0].value;
        totalXD.total = c.totalItem.summaryCells[32][0].value;

        totalOD.totalDisponiblePor = totalXD.disponiblePor / totalXD.total;
        totalOD.totalOperandoPor = totalXD.operandoPor / totalXD.total;
        totalOD.totalEnEsperaPor = totalXD.enEsperaPor / totalXD.total;
        totalOD.totalPatioPor = totalXD.patioPor / totalXD.total;
        totalOD.totalAuxilioPor = totalXD.auxilioPor / totalXD.total;
        totalOD.totalIsntrictorPor = totalXD.isntrictorPor / totalXD.total;
        totalOD.totalNoDisponiblePor = totalXD.noDisponiblePor / totalXD.total;
        totalOD.totalTallerPor = totalXD.tallerPor / totalXD.total;
        totalOD.totalCapacitacionPor = totalXD.capacitacionPor / totalXD.total;
        totalOD.totalDescansosPor = totalXD.descansosPor / totalXD.total;
        totalOD.totalIncapcidadPor = totalXD.incapcidadPor / totalXD.total;
        totalOD.totalAusentismoPor = totalXD.ausentismoPor / totalXD.total;
        totalOD.totalBajaPor = totalXD.bajaPor / totalXD.total;
        totalOD.totalCorralonPor = totalXD.corralonPor / totalXD.total;
        totalOD.totalSiniestradoPor = totalXD.siniestradoPor / totalXD.total;

        c.totalItem.summaryCells[3][0].value = totalOD.totalDisponiblePor;  
        c.totalItem.summaryCells[5][0].value = totalOD.totalOperandoPor;  
        c.totalItem.summaryCells[7][0].value = totalOD.totalEnEsperaPor;  
        c.totalItem.summaryCells[9][0].value = totalOD.totalPatioPor;  
        c.totalItem.summaryCells[11][0].value = totalOD.totalAuxilioPor;  
        c.totalItem.summaryCells[13][0].value = totalOD.totalIsntrictorPor;  
        c.totalItem.summaryCells[15][0].value = totalOD.totalNoDisponiblePor;  
        c.totalItem.summaryCells[17][0].value = totalOD.totalTallerPor;  
        c.totalItem.summaryCells[19][0].value = totalOD.totalCapacitacionPor;  
        c.totalItem.summaryCells[21][0].value = totalOD.totalDescansosPor;  
        c.totalItem.summaryCells[23][0].value = totalOD.totalIncapcidadPor;  
        c.totalItem.summaryCells[25][0].value = totalOD.totalAusentismoPor;  
        c.totalItem.summaryCells[27][0].value = totalOD.totalBajaPor;  
        c.totalItem.summaryCells[29][0].value = totalOD.totalCorralonPor  
        c.totalItem.summaryCells[31][0].value = totalOD.totalSiniestradoPor    
      });
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

  onRowPreparedResumenT(e: any) {
    if (e.rowType == 'data') {

      e.cells.forEach((c: any) => {

        if (c.cellElement) {
          if (c.columnIndex == 3) {
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.fontSize = "15px";
            c.cellElement.style.background = "#cdcbcb";
          }

          if (c.columnIndex == 11) {
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.fontSize = "15px";
            c.cellElement.style.background = "#cdcbcb";
          }

          if (c.columnIndex == 23) {
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.fontSize = "15px";
            c.cellElement.style.background = "#cdcbcb";
          }

          if (c.columnIndex == 24) {
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.fontSize = "15px";
            c.cellElement.style.background = "#cdcbcb";
          }

        }
      });
    }

    if (e.rowType == 'groupFooter'){

      // console.log(e.summaryCells)
      totalXTractos.disponible = e.summaryCells[3][0]?.value;
      totalXTractos.operadores = e.summaryCells[5][0]?.value;
      totalXTractos.variacion = e.summaryCells[7][0]?.value;
      totalXTractos.auxilio = e.summaryCells[9][0]?.value;
      totalXTractos.noDisponible = e.summaryCells[11][0]?.value;
      totalXTractos.taller = e.summaryCells[13][0]?.value;
      totalXTractos.siniestrado = e.summaryCells[15][0]?.value;
      totalXTractos.robo = e.summaryCells[17][0]?.value;
      totalXTractos.faltaDocumento = e.summaryCells[19][0]?.value;
      totalXTractos.corralon = e.summaryCells[21][0]?.value;
      totalXTractos.total = e.summaryCells[23][0]?.value;
      // console.log("1 ==> "+totalXDisponibilidad.disponiblePor)

      totalOpeT.totalDisponible = totalXTractos.disponible / totalXTractos.total;
      totalOpeT.totalOperadores = totalXTractos.operadores / totalXTractos.total;
      totalOpeT.totalVariacion = totalXTractos.variacion / totalXTractos.total;
      totalOpeT.totalAuxilio = totalXTractos.auxilio / totalXTractos.total;
      totalOpeT.totalNoDisponible = totalXTractos.noDisponible / totalXTractos.total;
      totalOpeT.totalTaller = totalXTractos.taller / totalXTractos.total;
      totalOpeT.totalSiniestrado = totalXTractos.siniestrado / totalXTractos.total;
      totalOpeT.totalRobo = totalXTractos.robo / totalXTractos.total;
      totalOpeT.totalFaltaDocumento = totalXTractos.faltaDocumento / totalXTractos.total;
      totalOpeT.totalCorralon = totalXTractos.corralon / totalXTractos.total;
      
   
      // console.log("2 ==> "+totalOperacion.totalDisponiblePor)


      e.summaryCells[4][0].value = totalOpeT.totalDisponible; 
      e.summaryCells[6][0].value = totalOpeT.totalOperadores;
      e.summaryCells[8][0].value = totalOpeT.totalVariacion;
      e.summaryCells[10][0].value = totalOpeT.totalAuxilio;
      e.summaryCells[12][0].value = totalOpeT.totalNoDisponible;
      e.summaryCells[14][0].value = totalOpeT.totalTaller;
      e.summaryCells[16][0].value = totalOpeT.totalSiniestrado;
      e.summaryCells[18][0].value = totalOpeT.totalRobo;
      e.summaryCells[20][0].value = totalOpeT.totalFaltaDocumento;
      e.summaryCells[22][0].value = totalOpeT.totalCorralon;
      // console.log("4 ==> "+e.summaryCells[3][0].value) 
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

  onCellPreparedResumenT(e: any) {
    if (e.rowType == 'group') {

      e.cellElement.style.fontSize = '12px';
      e.cellElement.style.background = "#DCDCDC";
    }
    if (e.rowType == 'groupFooter') {

      if (e.columnIndex == 3) {
        e.cellElement.style.fontWeight = "bolder";
        e.cellElement.style.fontSize = "15px";
        e.cellElement.style.background = "#cdcbcb";
      }

      if (e.columnIndex == 11) {
        e.cellElement.style.fontWeight = "bolder";
        e.cellElement.style.fontSize = "15px";
        e.cellElement.style.background = "#cdcbcb";
      }

      if (e.columnIndex == 23) {
        e.cellElement.style.fontWeight = "bolder";
        e.cellElement.style.fontSize = "15px";
        e.cellElement.style.background = "#cdcbcb";
      }

      if (e.columnIndex == 24) {
        e.cellElement.style.fontWeight = "bolder";
        e.cellElement.style.fontSize = "15px";
        e.cellElement.style.background = "#cdcbcb";
      }
    }

    if (e.rowType == 'totalFooter') {
   
      e.totalItem.cells.forEach((c: any) => {
        // console.log(c.totalItem.summaryCells)
        totalXT.disponible = c.totalItem.summaryCells[3][0].value;
        totalXT.operadores = c.totalItem.summaryCells[5][0].value;
        totalXT.variacion = c.totalItem.summaryCells[7][0].value;
        totalXT.auxilio = c.totalItem.summaryCells[9][0].value;
        totalXT.noDisponible = c.totalItem.summaryCells[11][0].value;
        totalXT.taller = c.totalItem.summaryCells[13][0].value;
        totalXT.siniestrado = c.totalItem.summaryCells[15][0].value;
        totalXT.robo = c.totalItem.summaryCells[17][0].value;
        totalXT.faltaDocumento = c.totalItem.summaryCells[19][0].value;
        totalXT.corralon = c.totalItem.summaryCells[21][0].value;
        totalXT.total = c.totalItem.summaryCells[23][0].value;

        totalOT.totalDisponible = totalXT.disponible / totalXT.total;
        totalOT.totalOperadores = totalXT.operadores / totalXT.total;
        totalOT.totalVariacion = totalXT.variacion / totalXT.total;
        totalOT.totalAuxilio = totalXT.auxilio / totalXT.total;
        totalOT.totalNoDisponible = totalXT.noDisponible / totalXT.total;
        totalOT.totalTaller = totalXT.taller / totalXT.total;
        totalOT.totalSiniestrado = totalXT.siniestrado / totalXT.total;
        totalOT.totalRobo = totalXT.robo / totalXT.total;
        totalOT.totalFaltaDocumento = totalXT.faltaDocumento / totalXT.total;
        totalOT.totalCorralon = totalXT.corralon / totalXT.total;

        c.totalItem.summaryCells[4][0].value = totalOT.totalDisponible;  
        c.totalItem.summaryCells[6][0].value = totalOT.totalOperadores;  
        c.totalItem.summaryCells[8][0].value = totalOT.totalVariacion;  
        c.totalItem.summaryCells[10][0].value = totalOT.totalAuxilio;  
        c.totalItem.summaryCells[12][0].value = totalOT.totalNoDisponible;  
        c.totalItem.summaryCells[14][0].value = totalOT.totalTaller;  
        c.totalItem.summaryCells[16][0].value = totalOT.totalSiniestrado;  
        c.totalItem.summaryCells[18][0].value = totalOT.totalRobo;  
        c.totalItem.summaryCells[20][0].value = totalOT.totalFaltaDocumento;  
        c.totalItem.summaryCells[22][0].value = totalOT.totalCorralon;  
      });
    }
  }

  customizeTra(e) {
    var gridCell = e.gridCell;

    if (gridCell.rowType === 'data') {

      if (e.gridCell.column.dataField == "disponibles") {
        e.backgroundColor = "#DCDCDC";
        e.fontWeight = "bolder"
        e.font = { bold: true }
      }

      if (e.gridCell.column.dataField == "noDisponible") {
        e.backgroundColor = "#DCDCDC";
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

  onRowPreparedResumenR(e: any) {
    if (e.rowType == 'data') {

      e.cells.forEach((c: any) => {

        if (c.cellElement) {
          if (c.columnIndex == 3) {
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.fontSize = "15px";
            c.cellElement.style.background = "#cdcbcb";
          }

          if (c.columnIndex == 15) {
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.fontSize = "15px";
            c.cellElement.style.background = "#cdcbcb";
          }
        }
      })
    }

    if (e.rowType == 'groupFooter'){

      totalXRemolques.totalUds = e.summaryCells[3][0]?.value;
      totalXRemolques.disponibilidad = e.summaryCells[5][0]?.value;
      totalXRemolques.variacion = e.summaryCells[7][0]?.value;
      totalXRemolques.taller = e.summaryCells[9][0]?.value;
      totalXRemolques.siniestrado = e.summaryCells[11][0]?.value;
      totalXRemolques.noDisponibles = e.summaryCells[13][0]?.value;
      totalXRemolques.total = e.summaryCells[15][0]?.value;
      
      // console.log("1 ==> "+totalXDisponibilidad.disponiblePor)

      totalOpeR.totalTotalUds = totalXRemolques.totalUds / totalXRemolques.total;
      totalOpeR.totalDisponibilidad = totalXRemolques.disponibilidad / totalXRemolques.total;
      totalOpeR.totalVariacion = totalXRemolques.variacion / totalXRemolques.total;
      totalOpeR.totalTaller = totalXRemolques.taller / totalXRemolques.total;
      totalOpeR.totalSiniestrado = totalXRemolques.siniestrado / totalXRemolques.total;
      totalOpeR.totalNoDisponibles = totalXRemolques.noDisponibles / totalXRemolques.total;
      
   
      // console.log("2 ==> "+totalOperacion.totalDisponiblePor)


      e.summaryCells[4][0].value = totalOpeR.totalTotalUds; 
      e.summaryCells[6][0].value = totalOpeR.totalDisponibilidad;
      e.summaryCells[8][0].value = totalOpeR.totalVariacion;
      e.summaryCells[10][0].value = totalOpeR.totalTaller;
      e.summaryCells[12][0].value = totalOpeR.totalSiniestrado;
      e.summaryCells[14][0].value = totalOpeR.totalNoDisponibles;
      // console.log("4 ==> "+e.summaryCells[3][0].value) 
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

  onCellPreparedResumenR(e: any) {
    if (e.rowType == 'group') {

      e.cellElement.style.fontSize = '12px';
      e.cellElement.style.background = "#DCDCDC";
    }
    if (e.rowType == 'groupFooter') {

        if (e.columnIndex == 3) {
          e.cellElement.style.fontWeight = "bolder";
          e.cellElement.style.fontSize = "15px";
          e.cellElement.style.background = "#cdcbcb";
        }

        if (e.columnIndex == 15) {
          e.cellElement.style.fontWeight = "bolder";
          e.cellElement.style.fontSize = "15px";
          e.cellElement.style.background = "#cdcbcb";
        }
      e.cellElement.style.fontSize = '15px';
      // e.cellElement.style.background = "#DCDCDC";
    }

    if (e.rowType == 'totalFooter') {
   
      e.totalItem.cells.forEach((c: any) => {
        // console.log(c.totalItem.summaryCells)
        totalXR.totalUds = c.totalItem.summaryCells[3][0].value;
        totalXR.disponibilidad = c.totalItem.summaryCells[5][0].value;
        totalXR.variacion = c.totalItem.summaryCells[7][0].value;
        totalXR.taller = c.totalItem.summaryCells[9][0].value;
        totalXR.siniestrado = c.totalItem.summaryCells[11][0].value;
        totalXR.noDisponibles = c.totalItem.summaryCells[13][0].value;
        totalXR.total = c.totalItem.summaryCells[15][0].value;

        totalOR.totalTotalUds = totalXR.totalUds / totalXR.total;
        totalOR.totalDisponibilidad = totalXR.disponibilidad / totalXR.total;
        totalOR.totalVariacion = totalXR.variacion / totalXR.total;
        totalOR.totalTaller = totalXR.taller / totalXR.total;
        totalOR.totalSiniestrado = totalXR.siniestrado / totalXR.total;
        totalOR.totalNoDisponibles = totalXR.noDisponibles / totalXR.total;

        c.totalItem.summaryCells[4][0].value = totalOR.totalTotalUds;  
        c.totalItem.summaryCells[6][0].value = totalOR.totalDisponibilidad;  
        c.totalItem.summaryCells[8][0].value = totalOR.totalVariacion;  
        c.totalItem.summaryCells[10][0].value = totalOpeR.totalTaller;  
        c.totalItem.summaryCells[12][0].value = totalOpeR.totalSiniestrado;  
        c.totalItem.summaryCells[14][0].value = totalOpeR.totalNoDisponibles;  
      });
    }
  }

  onRowPreparedResumenD(e: any) {

  }

  onCellPreparedResumenD(e: any) {

  }

  onRowPreparedTractos(e: any) {

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

  onCellPreparedTractos(e: any) {
    if (e.rowType == 'groupFooter') {

      e.cellElement.style.fontSize = '15px';
      e.cellElement.style.background = "#DCDCDC";
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
}
