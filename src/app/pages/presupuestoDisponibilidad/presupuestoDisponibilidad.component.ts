import {NgModule, Component, ViewChild, enableProdMode, ChangeDetectionStrategy, ChangeDetectorRef,AfterViewInit, OnInit} from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
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
import { DisponibilidadAnualService } from '../../services/disponibilidadAnual/disponibilidadAnual.service';

import notify from 'devextreme/ui/notify';

import { Workbook } from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { saveAs } from 'file-saver-es';
import { group } from 'console';

const totalesPor  = new TotalPorcentajes;
const totalesPorGr  = new TotalPorcentajes;

const groupName = new Modelos;

@Component({
  templateUrl: './presupuestoDisponibilidad.component.html',
  styleUrls: ['./presupuestoDisponibilidad.component.scss'],
  providers: [UnidadesService,ServiceSales, CurrencyPipe, Service],
})

export class presupuestoDisponibilidadComponent implements OnInit {
  @ViewChild("gridPresupuesto", { static: false }) gridPresupuesto: any = DxDataGridComponent;

  //loading
  loadingVisible = false;

  isVisible = false;

  disponiblidadPresupuesto: any[] = [];
  states: any[];

  ciudad=[
    {idArea: 1, area: 'ORIZABA'},
    {idArea: 2, area: 'GUADALAJARA'},
    {idArea: 4, area: 'MEXICALI'},
    {idArea: 5, area: 'HERMOSILLO'},
    {idArea: 8, area: 'CUAUTITLAN'},
    {idArea: 9, area: 'TULTITLAN'},
  ]

  tipoOp=[
    {tipo: 'CAJA SECA'},
    {tipo: 'ENCORTINADO'},
    {tipo: 'TOLVA GRANEL'},
    {tipo: 'GRADO ALIMENT'},
    {tipo: 'GONDOLA'},
    {tipo: 'PATIO'},
    {tipo: 'INSTRUCTOR'},   
    {tipo: 'PRUEBA'},   
  ]

  clasificacion=[
    {clasificacion: 'POP'},
    {clasificacion: 'OPR'},
  ]

  periodo=[
    {periodo: 2024}
  ]

  filtros= [
    {value: 'POP'},
    {value: 'OPR'}
  ]

  positionOf: string = '#myDiv';

  selectedFiltro: any;
  selectedIdArea: any;

  modEditar: boolean = false;
  modBorrar: boolean = false;

  formPresupuesto: any = {
    area: "",
    tipo: "",
    clasificacion: "",
    cantidad: "",
  }

  bolFormSoloLectura = false;
  buttonOptionsCancelar: any

  buttonCancelarDlt: any

  buttonOptions: any = {
    text: 'Actualizar',
    type: 'success',
    useSubmitBehavior: true,
  };

  buttonBorrar: any = {
    text: 'Eliminar',
    type: 'danger',
    useSubmitBehavior: true,
  };

  

  getDataValue: any;
  getValueDelete: any
  constructor( private disponibilidadService: DisponibilidadAnualService) {
    
    const that = this;
    this.buttonOptionsCancelar= {
      text: 'Cancelar',
      type: 'danger',
      onClick(e: any) {
        that.modEditar = false;
      },
    };

    this.buttonCancelarDlt= {
      text: 'Cancelar',
      type: 'default',
      onClick(e: any) {
        that.modBorrar = false;
      },
    };

    // this.buttonGuardar= {
    //   text: 'Guardar',
    //   type: 'success',
    //   onClick(e: any) {
    //     alert("hola")
    //   },
    // };
  }

  moreInfoButtonOptions: Record<string, unknown>;

  emailButtonOptions: Record<string, unknown>;

  closeButtonOptions: Record<string, unknown>;

  ngOnInit(): void {

  }

  selectFiltro(value: any){
    this.selectedFiltro = value.value
    console.log(this.selectedFiltro)
  }

  getDispPresupuesto(){
    this.disponibilidadService.getDipPresupuesto(this.selectedFiltro).subscribe(data =>{
      this.disponiblidadPresupuesto = data.data;
      console.log(this.disponiblidadPresupuesto)
      this.loadingVisible = false;
    })
  }

  buscarClick = (e: any) => {
    // if (this.selectedPeriodo !==  0 && this.selectedBoxCartera !== undefined) {
      this.loadingVisible = true;

      this.getDispPresupuesto();
    // }

  };

  GuardarPresupuesto(value) {
    var myData = value.changes[0].data;

    console.log(value)

    if(myData.area == 'ORIZABA'){
      this.selectedIdArea = 1;
    }else if(myData.area == 'GUADALAJARA'){
      this.selectedIdArea = 2;
    }else if(myData.area == 'MEXICALI'){
      this.selectedIdArea = 4;
    }else if(myData.area == 'HERMOSILLO'){
      this.selectedIdArea = 5;
    }else if(myData.area == 'CUAUTITLAN'){
      this.selectedIdArea = 8;
    }else if(myData.area == 'TULTITLAN'){
      this.selectedIdArea = 9;
    }

    this.loadingVisible = true;

    this.disponibilidadService.GuardarPresupuesto(this.selectedIdArea, myData.area, myData.clasificacion, myData.tipo, myData.cantidad).subscribe(data =>{
      console.log(data)

      if (data.responseCode === 200) {

          notify({
            message: data.responseText,
            position: {
              my: 'center center',
              at: 'center center',
            },
          }, 'success', 3000);
  
          this.modEditar = false;
          this.bolFormSoloLectura = false;
          this.loadingVisible = false;
        }else {
        notify({
          message: "No se pudo completar la edicion",
          position: {
            my: 'center center',
            at: 'center center',
          },
        }, 'error', 3000);

        this.loadingVisible = false;
      }
    })
   
  }

  EditarPresupuesto(value) {
    value.preventDefault();
    console.log(this.formPresupuesto)
    this.loadingVisible = true;

    this.disponibilidadService.EditarPresupuesto(this.getDataValue.id, this.getDataValue.clasificacion, this.formPresupuesto.cantidad).subscribe(data =>{
      console.log(data)

      if (data.responseCode === 200) {

          notify({
            message: data.responseText,
            position: {
              my: 'center center',
              at: 'center center',
            },
          }, 'success', 3000);
  
          this.modEditar = false;
          this.loadingVisible = false;
          this.bolFormSoloLectura = false;
        }else {
        notify({
          message: "No se pudo completar la edicion",
          position: {
            my: 'center center',
            at: 'center center',
          },
        }, 'error', 3000);

        this.loadingVisible = false;
      }
    })
   
  }

  BorrarPresupuesto(value) {
    value.preventDefault();

    this.loadingVisible = true;

    this.disponibilidadService.BorrarPresupuesto(this.getValueDelete.id, this.getValueDelete.clasificacion).subscribe(data =>{
      console.log(data)

      if (data.responseCode === 200) {

          notify({
            message: data.responseText,
            position: {
              my: 'center center',
              at: 'center center',
            },
          }, 'success', 3000);
  
          this.modEditar = false;
          this.loadingVisible = false;
          this.bolFormSoloLectura = false;
        }else {
        notify({
          message: "No se pudo completar la edicion",
          position: {
            my: 'center center',
            at: 'center center',
          },
        }, 'error', 3000);

        this.loadingVisible = false;
      }
    })
   
  }

  editar(value){
    this.getDataValue = value.data
    // console.log(this.getDataValue)
    
    const clonedItem = value.data;
    this.formPresupuesto = clonedItem;

    this.modEditar = true; 
  }

  borrar(value){
    this.getValueDelete = value.data
    console.log(value)

    this.modBorrar = true;
  }

  saveButton = () => {
    this.gridPresupuesto.instance.saveEditData();
    this.gridPresupuesto.instance.refresh();
  }

  cancelButton = () => {
    // this.mainGrid.instance.cancelEditData();
  }
}
