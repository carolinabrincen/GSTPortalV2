import { NgModule, Component, ViewChild, enableProdMode, ChangeDetectionStrategy, ChangeDetectorRef, AfterViewInit, OnInit } from '@angular/core';
import { UnidadesService } from 'src/app/services/unidades/unidades.services';
import DataGrid from "devextreme/ui/data_grid";
import { IngresosModel } from 'src/app/shared/models/ingresos/ingresos.models';

import { DxDataGridComponent, } from 'devextreme-angular';
import { CurrencyPipe, NumberFormatStyle } from '@angular/common';
import { DxChartComponent, } from 'devextreme-angular';
import { ServiceSales } from '../tasks/app.serviceSales';
import { AniosModel } from './../../shared/models/rentabilidad-contable/renta-contable.model';
import { Service } from '../../shared/models/ingresos/ingreso.service'
import { TotalPorcentajes } from '../../shared/models/ingresos/totalporcentajes.model'
import { ModeloGrafica } from '../../shared/models/ingresos/modeloGrafica.model';
import { Modelos } from '../../shared/models/ingresos/modelos.model';
import { PagosService } from 'src/app/services/pagos/pagos.service';
import { TotalesDia } from 'src/app/shared/models/pagos/totalesDia.model';
import notify from 'devextreme/ui/notify';

import { Workbook } from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { saveAs } from 'file-saver-es';
import { group } from 'console';

const totalesDia =new TotalesDia; 

@Component({
  templateUrl: './pagos.component.html',
  styleUrls: ['./pagos.component.scss'],
  providers: [UnidadesService, ServiceSales, CurrencyPipe, Service],
})

export class PagosComponent implements OnInit {

  @ViewChild(DxChartComponent, { static: false }) chart: any;


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


  constructor(
    private pagosService: PagosService,
    private service: ServiceSales,
    private currencyPipe: CurrencyPipe,
    testService: Service
  ) {

    this.customizeTooltip = this.customizeTooltip.bind(this);
    this.calcularPorcentajes = this.calcularPorcentajes.bind(this);
    this.formFilter
  }

  ngOnInit(): void {
    // this.getDisponiblidadAnual();
  }

  getPagos() {
    console.log(this.formFilter.Fecha.toISOString())
    this.loadingVisible = true;
    this.pagosService.getPagos(this.formFilter.Fecha.toISOString()).subscribe((response) => {
    
      this.pagos = response?.data;
      this.pagosXDia = response?.data?.pagoXDia;      
      this.pagosXMes = response?.data?.pagoXMes
      this.pagosDetalleP = response?.data?.detallePagos;

      this.graficaPXMesResumen = response.data.pagoXMesResumen;
      //this.graficaPXClasificado = response.data.pagoXMesClasificado
      // console.log(response.data)

      var mytotal
      var myGrafica = [
        {total: 0, vencido: 0, corriente: 0, dia: 0}
      ]
      
      myGrafica = response.data.pagoXMesClasificado

      for(let i =0; i<myGrafica.length; i++){ 
       mytotal  = myGrafica[i].vencido + myGrafica[i].corriente;
       myGrafica[i].total = mytotal;
      //console.log(myGrafica[i])

      }

      this.graficaPXClasificado = myGrafica;

     


      this.loadingVisible = false;
    })
  }

  /*======================SELECTE FUNCIONS================================================*/

  buscarClick = (e: any) => {
    if (this.formFilter.Fecha !== "") {

      this.pagos = [];
      this.pagosXDia = [];
      this.pagosXMes = [];
      this.pagosDetalleP = [];
      this.graficaPXMesResumen = [];
      this.graficaPXClasificado = [];

      this.getPagos();
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

/**=========================PAGOS POR DIA=========================================== */
  onRowPreparedPXD(e: any){
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

  onCellPreparedPXD(e: any){
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

  onCellPreparedPXM(e: any){

    if (e.rowType == 'totalFooter') {

      e.totalItem.cells.forEach((c: any) => {

        //console.log(e.totalItem.summaryCells)

        if(c.totalItem.summaryCells[1][0]?.value != undefined){
        
          totalesDia.pagadoMes = c.totalItem.summaryCells[1][0].value;
          totalesDia.pagadoVencido = c.totalItem.summaryCells[2][0].value;
          totalesDia.pagadoCorriente = c.totalItem.summaryCells[4][0].value;


          //totalesDia.operacionVencido = totalesDia.pagadoVencido / totalesDia.pagadoMes;
          //totalesDia.operacionCorriente = totalesDia.pagadoCorriente / totalesDia.pagadoMes;

          totalesDia.totalVencido = totalesDia.pagadoVencido / totalesDia.pagadoMes;//totalesDia.operacionVencido * 100;
          totalesDia.totalCorriente = totalesDia.pagadoCorriente / totalesDia.pagadoMes;//totalesDia.operacionCorriente * 100;
        }

        // if(c.totalItem.summaryCells[5][0]?.value != undefined){
          c.totalItem.summaryCells[3][0].value = totalesDia.totalVencido;
          c.totalItem.summaryCells[5][0].value = totalesDia.totalCorriente;

         
        // }


        if (c.cellElement) {
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.fontSize = "16px";
            c.cellElement.style.background = "#ff9460";
            c.cellElement.style.color = "black"; 
        }   
      });
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
