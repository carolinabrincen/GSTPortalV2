import { RentContModel, UnidadesNegocioModel, MesesModel, AniosModel } from './../../shared/models/rentabilidad-contable/renta-contable.model';
import { RentabilidadViajesService } from '../../services/rentabilidadViajes/rentabilidadViajes.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import liquidaciones from 'src/assets/rc02.json';
import dxSelectBox from 'devextreme/ui/select_box';
import { DxSelectBoxComponent } from 'devextreme-angular';
import { type } from 'os';

@Component({

  templateUrl: './rendimientoDiesel.component.html',
  styleUrls: ['./rendimientoDiesel.component.scss']
})
export class RendimientoDieselComponent implements OnInit {



  @ViewChild('rentCont2', {static: false}) gridRentCont: any;
  @ViewChild('selectTracto') selectTracto!: DxSelectBoxComponent;

  liquidaciones: any = liquidaciones;
  fechaInicio: Date = new Date();
  fechaFin: Date = new Date();

  arrRentContItems: RentContModel[] = [];


  col: string = '50';


  arrUnidadesNegocio: UnidadesNegocioModel[] = [];

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
    { idAnio: 2026, anio: "2026" },
    { idAnio: 2025, anio: "2025" },
    { idAnio: 2024, anio: "2024" },
    { idAnio: 2023, anio: "2023" },
    { idAnio: 2022, anio: "2022" },
    { idAnio: 2021, anio: "2021" },
  ];

  readonly allowedPageSizes = [5, 10, 20, 50, 100, 'all'];

  loadingVisible = false;

  rentContServ!: RentabilidadViajesService;

  mesSeleccionado: number = 0;
  anioSeleccionado: number = 0;
  udnSeleccionado: number[] = [];
  tractoSeleccionado: string = '';

  objTracto: any;
  objRentabilidad: any;


  constructor(private rentViajesService: RentabilidadViajesService) {

    this.calcularPorcentajes = this.calcularPorcentajes.bind(this);
    this.calcularPorcentajes = this.calcularPorcentajes.bind(this);
    this.rentContServ = rentViajesService;
    this.getUnidadesNegocio();
  }


  ngOnInit(): void {
  }

  ngAfterViewInit(): void {


  }

  borrarClick = (e: any) =>{
    this.selectTracto.value = '';
  }

  start: 'true' | 'false' = 'false';
  buscarClick = (e: any) => {
    if (this.udnSeleccionado && this.mesSeleccionado && this.anioSeleccionado) {
      this.loadingVisible = true;
      this.getRentabilidad().then(() => {
        this.loadingVisible = false;
        
      });
    }
    this.start = 'true';
    this.gridRentCont.instance.refresh();
  };

  getRentabilidad() {
    const request = new Promise((resolve, reject) => {
      this.rentContServ.postRentabilidadViajes(
        this.anioSeleccionado,
        this.mesSeleccionado,
        this.tractoSeleccionado,
        this.udnSeleccionado).subscribe(res => {
          let array: RentContModel[] = res.data.resumen;

          array.forEach(element => {
            element.inicio = new Date(element.inicio);
            element.fin = new Date(element.fin);
          });
          //console.log(res.data.total)
          this.arrRentContItems = res.data.resumen;
        });
    });
    return request;
  }

  getUnidadesNegocio() {
    this.rentContServ.getUnidadesNegocio().subscribe(res => {
      this.arrUnidadesNegocio = res.data;

    });

  }

  getTractos() {
    if (this.anioSeleccionado && this.mesSeleccionado && this.udnSeleccionado) {
      this.arrTractos = [];
      this.selectTracto.value = '';
      this.rentContServ.getTractos(this.anioSeleccionado, this.mesSeleccionado, this.udnSeleccionado).subscribe(res => {
        this.arrTractos = res.data.tractos;

      });
    }
  }

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

    if (e.rowType == 'totalFooter') {
   
      e.totalItem.cells.forEach((c: any) => {
        console.log(c.totalItem.summaryCells)
        //  console.log(c.totalItem.summaryCells)

         // //console.log(e.summaryCells)
      // let ingresoTotal = c.totalItem.summaryCells[12][0].value;
      // let margenUtilidad = c.totalItem.summaryCells[13][0].value;
      
      let kilometros = c.totalItem.summaryCells[9][0].value;
      let ltsDisel = c.totalItem.summaryCells[10][0].value;

      // let combustible = c.totalItem.summaryCells[19][0].value;
      // let casetas = c.totalItem.summaryCells[21][0].value;
      // let sueldosLiquidacion = c.totalItem.summaryCells[23][0].value;
      // let otros = c.totalItem.summaryCells[25][0].value;
      // let costosDirectos = c.totalItem.summaryCells[27][0].value;
      // let sueldoBase = c.totalItem.summaryCells[29][0].value;
      // let cargaSocial = c.totalItem.summaryCells[31][0].value;
      // let fijoMtto = c.totalItem.summaryCells[33][0].value;
      // let varMtto = c.totalItem.summaryCells[35][0].value;
      // let fijoTrans = c.totalItem.summaryCells[37][0].value;
      // let varTrans = c.totalItem.summaryCells[39][0].value;
      // let ctosAdicionales = c.totalItem.summaryCells[41][0].value;


      // //Porcentajes Margen utilidad
      // if(c.totalItem.summaryCells[14][0] !== undefined){
      //   ingresoTotal === 0 ? c.totalItem.summaryCells[14][0].value = 0 : c.totalItem.summaryCells[14][0].value = margenUtilidad/ingresoTotal;
      // }
      // //Rendimiento
      if(c.totalItem.summaryCells[11][0] !== undefined){
        kilometros === 0 ? c.totalItem.summaryCells[11][0].value = 0 : c.totalItem.summaryCells[11][0].value = kilometros/ltsDisel;
        //console.log(ltsDisel/kilometros)
      }

      //Combustible
      // if(c.totalItem.summaryCells[20][0] !== undefined){
      //   ingresoTotal === 0 ? c.totalItem.summaryCells[20][0].value = 0 : c.totalItem.summaryCells[20][0].value = combustible/ingresoTotal;
      // }

      // //Casetas
      // if(c.totalItem.summaryCells[22][0] !== undefined){
      //   ingresoTotal === 0 ? c.totalItem.summaryCells[22][0].value = 0 : c.totalItem.summaryCells[22][0].value = casetas/ingresoTotal;
      // }

      // //Sueldos Liq
      // if(c.totalItem.summaryCells[24][0] !== undefined){
      //   ingresoTotal === 0 ? c.totalItem.summaryCells[24][0].value = 0 : c.totalItem.summaryCells[24][0].value = sueldosLiquidacion/ingresoTotal;
      // }

      // //Otros
      // if(c.totalItem.summaryCells[26][0] !== undefined){
      //   ingresoTotal === 0 ? c.totalItem.summaryCells[26][0].value = 0 : c.totalItem.summaryCells[26][0].value = otros/ingresoTotal;
      // }

      // //costosDirectos
      // if(c.totalItem.summaryCells[28][0] !== undefined){
      // ingresoTotal === 0 ? c.totalItem.summaryCells[28][0].value = 0 : c.totalItem.summaryCells[28][0].value = costosDirectos/ingresoTotal;

      // }
      // //sueldoBAse
      // if(c.totalItem.summaryCells[30][0] !== undefined){
      //   ingresoTotal === 0 ? c.totalItem.summaryCells[30][0].value = 0 : c.totalItem.summaryCells[30][0].value = sueldoBase/ingresoTotal;
      // }

      // //Carga Social
      // if(c.totalItem.summaryCells[32][0] !== undefined){
      //   ingresoTotal === 0 ? c.totalItem.summaryCells[32][0].value = 0 : c.totalItem.summaryCells[32][0].value = cargaSocial/ingresoTotal;
      // }

      // //Fijo Mtto
      // if(c.totalItem.summaryCells[34][0] !== undefined){
      //   ingresoTotal === 0 ? c.totalItem.summaryCells[34][0].value = 0 : c.totalItem.summaryCells[34][0].value = fijoMtto/ingresoTotal;
      // }

      // //Variable Mtto
      // if(c.totalItem.summaryCells[36][0] !== undefined){
      //   ingresoTotal === 0 ? c.totalItem.summaryCells[36][0].value = 0 : c.totalItem.summaryCells[36][0].value = varMtto/ingresoTotal;
      // }

      // //fijo Transportacion
      // if(c.totalItem.summaryCells[38][0] !== undefined){
      //   ingresoTotal === 0 ? c.totalItem.summaryCells[38][0].value = 0 : c.totalItem.summaryCells[38][0].value = fijoTrans/ingresoTotal;
      // }

      // //variable Transportacion
      // if(c.totalItem.summaryCells[40][0] !== undefined){
      //   ingresoTotal === 0 ? c.totalItem.summaryCells[40][0].value = 0 : c.totalItem.summaryCells[40][0].value = varTrans/ingresoTotal;
      // }

      // //Costso Adicionales
      // if(c.totalItem.summaryCells[42][0] !== undefined){
      //   ingresoTotal === 0 ? c.totalItem.summaryCells[42][0].value = 0 : c.totalItem.summaryCells[42][0].value = ctosAdicionales/ingresoTotal;
      // }


      })
    }
}

  valueData: number = 0;
  onRowPrepared(e: any) {
    if (e.rowType == 'data') {
      e.cells.forEach((c: any) => {

        if (c.cellElement) {
          //poner en rojo negativos
          if (c.value && c.value.toString().startsWith('-')) {
            c.cellElement.style.color = "red";
          }

          //porcentaje de combistuble > .25 en rojo
          // if (c.columnIndex == 16 && c.value >= .25) {
          //   c.cellElement.style.color = "red";
          // }
        }
      });
    }

    if (e.rowType == 'group') {
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
      console.log(e.summaryCells)
      // let ingresoTotal = e.summaryCells[12][0].value;
      // let margenUtilidad = e.summaryCells[13][0].value;
      let kilometros = e.summaryCells[9][0].value;
      let ltsDisel = e.summaryCells[10][0].value;
      // let combustible = e.summaryCells[19][0].value;
      // let casetas = e.summaryCells[21][0].value;
      // let sueldosLiquidacion = e.summaryCells[23][0].value;
      // let otros = e.summaryCells[25][0].value;
      // let costosDirectos = e.summaryCells[27][0].value;
      // let sueldoBase = e.summaryCells[29][0].value;
      // let cargaSocial = e.summaryCells[31][0].value;
      // let fijoMtto = e.summaryCells[33][0].value;
      // let varMtto = e.summaryCells[35][0].value;
      // let fijoTrans = e.summaryCells[37][0].value;
      // let varTrans = e.summaryCells[39][0].value;
      // let ctosAdicionales = e.summaryCells[41][0].value;


      //Porcentajes Margen utilidad
      // ingresoTotal === 0 ? e.summaryCells[14][0].value = 0 : e.summaryCells[14][0].value = margenUtilidad/ingresoTotal;
      //Rendimiento
      ltsDisel === 0 ? e.summaryCells[11][0].value = 0 : e.summaryCells[11][0].value = kilometros/ltsDisel;
      //Combustible
      // ingresoTotal === 0 ? e.summaryCells[20][0].value = 0 : e.summaryCells[20][0].value = combustible/ingresoTotal;
      // //Casetas
      // ingresoTotal === 0 ? e.summaryCells[22][0].value = 0 : e.summaryCells[22][0].value = casetas/ingresoTotal;
      // //Sueldos Liq
      // ingresoTotal === 0 ? e.summaryCells[24][0].value = 0 : e.summaryCells[24][0].value = sueldosLiquidacion/ingresoTotal;
      // //Otros
      // ingresoTotal === 0 ? e.summaryCells[26][0].value = 0 : e.summaryCells[26][0].value = otros/ingresoTotal;
      // //costosDirectos
      // ingresoTotal === 0 ? e.summaryCells[28][0].value = 0 : e.summaryCells[28][0].value = costosDirectos/ingresoTotal;
      // //sueldoBAse
      // ingresoTotal === 0 ? e.summaryCells[30][0].value = 0 : e.summaryCells[30][0].value = sueldoBase/ingresoTotal;
      // //Carga Social
      // ingresoTotal === 0 ? e.summaryCells[32][0].value = 0 : e.summaryCells[32][0].value = cargaSocial/ingresoTotal;
      // //Fijo Mtto
      // ingresoTotal === 0 ? e.summaryCells[34][0].value = 0 : e.summaryCells[34][0].value = fijoMtto/ingresoTotal;
      // //Variable Mtto
      // ingresoTotal === 0 ? e.summaryCells[36][0].value = 0 : e.summaryCells[36][0].value = varMtto/ingresoTotal;
      // //fijo Transportacion
      // ingresoTotal === 0 ? e.summaryCells[38][0].value = 0 : e.summaryCells[38][0].value = fijoTrans/ingresoTotal;
      // //variable Transportacion
      // ingresoTotal === 0 ? e.summaryCells[40][0].value = 0 : e.summaryCells[40][0].value = varTrans/ingresoTotal;
      // //Costso Adicionales
      // ingresoTotal === 0 ? e.summaryCells[42][0].value = 0 : e.summaryCells[42][0].value = ctosAdicionales/ingresoTotal;


      if (e.groupIndex === 1) {
        //e.summaryCells[5][0].displayFormat = 'SUBTOTAL TRACTO';
       // console.log('🌲', e);

      }
      if (e.groupIndex === 0) {
        //e.summaryCells[5][0].displayFormat = 'SUBTOTAL ' + e.key[0];
        //e.rowElement.style.backgroundColor = '#dcdcdc';
      }





    }

    if (e.rowType == 'totalFooter') {
      //console.log(e.summaryCells)

      // let kilometros = e.summaryCells[16][0].value;
      // let ltsDisel = e.summaryCells[17][0].value;

      // // //Rendimiento
      // kilometros === 0 ? e.summaryCells[18][0].value = 0 : e.summaryCells[18][0].value = ltsDisel/kilometros;


      e.rowElement.style.backgroundColor = '#f5f5f5';
      e.rowElement.style.color = 'red';

      e.cells.forEach((c: any) => {

        if (c.cellElement) {
          //poner en rojo negativos
          if (c.summaryCells && c.summaryCells[7][0].value.toString().startsWith('-')) {
            c.cellElement.style.color = "red";
          }

          //negrita columna margen utilidad
          if (c.columnIndex == 5  || c.columnIndex == 6  ||
              c.columnIndex == 7  || c.columnIndex == 8  ||
              c.columnIndex == 23 || c.columnIndex == 24 ||
              c.columnIndex == 37 || c.columnIndex == 38) {
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.fontSize = "14px";
            c.cellElement.style.background = "#f5f5f5";
            c.cellElement.style.color = "red";
          }

          //porcentaje de combistuble > .25 en rojo
          if (c.columnIndex == 16 && c.value >= .25) {
            c.cellElement.style.color = "red";
          }
        }



      });


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

  //Manejadores de Eventos
  seleccionarMes(e: any) {
    this.mesSeleccionado = e.value;

    this.getTractos();

  }
  seleccionarAnio(e: any) {
    this.anioSeleccionado = e.value;

    this.getTractos();

  }

  seleccionarUDN(e: any) {
    this.udnSeleccionado = [];
    this.udnSeleccionado = e.value;


    this.getTractos();
  }

  seleccionarTracto(e: any) {
    this.tractoSeleccionado = e.value;

  }



  mostrarporcentaje(e: any): any{
    let valor = 0
    if(this.start == 'true'){
      valor = e
    }

    //console.log(valor)
    return valor;
  }

  separatorIV(value){
    
    var result = 0;
    result = value * 100;
    
    var round = Math.round(result)
  
    return round+" %";
  }
}

