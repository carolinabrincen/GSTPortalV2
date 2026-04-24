import { Component, OnInit, ViewChild, LOCALE_ID } from '@angular/core';
import { DxSelectBoxComponent, DxFormComponent} from 'devextreme-angular';
import { MetricaCobranzaService } from 'src/app/services/metricaCobranza/metricaCobranza.service';

import { StorageService } from '../../shared/services/storage.service';
import { ActivatedRoute, Router } from '@angular/router';

import { MetricaCobranzaModel } from 'src/app/shared/models/metricaCobranza/metricaCobranza.model';

import { DecimalPipe } from '@angular/common';

@Component({
  templateUrl: './metricaCobranza.component.html',
  styleUrls: ['./metricaCobranza.component.scss'],
  providers: [
    { provide: LOCALE_ID, useValue: "es-MX" }, //replace "en-US" with your locale
    //otherProviders...
  ]
})
export class MetricaCobranzaComponent implements OnInit {

  @ViewChild('selectTracto') selectTracto!: DxSelectBoxComponent;
  @ViewChild(DxFormComponent, { static: false }) form:DxFormComponent;
  
  col: string = '50';

  loadingVisible = false;

  isVisible = false;
  
  graficaMC: any[] = [];
  graficaMCIntercompania: any[] = [];
  metricaCombranza: any[] = [];
  metricaCombranzaIntercompania: any[] = [];

  graficaPT: any[] = [];
  pendienteTimbrar: any[] = [];

  graficaPCC: any[] = [];
  pendienteCartaCobro: any[] = [];

  graficaCCC: any[] = [];
  conCartaCobro: any[] = [];

  graficaIngreso: any[] = [];
  graficaIngresoIntercompania: any[] = [];

  colorBar: string = ""

  pipe = new DecimalPipe('es-MX');

    screen = (window.innerWidth > 0) ? window.innerWidth : screen.width;
  
  constructor(
    private metricaCobranzaService: MetricaCobranzaService,
    private storageService: StorageService,
    private router: Router,
    private route: ActivatedRoute,
    ) {
      this.calcularPorcentajes = this.calcularPorcentajes.bind(this);

      
    }



  ngOnInit(): void {
    this.getMetricaCobranza();
  }

  ngAfterViewInit(): void {}

  //=================GETS===========================

  getMetricaCobranza(){
    this.loadingVisible = true;

    this.metricaCobranzaService.getMetricaCobranza().subscribe(data =>{

      if(data !== null){
      const orderdata: MetricaCobranzaModel[] = data.data.metricaCartera;
      let metricaC = [];
      metricaC.push(orderdata[0],orderdata[1],orderdata[11],orderdata[2],orderdata[3],orderdata[4],
                       orderdata[5],orderdata[6],orderdata[7],orderdata[8],orderdata[9],orderdata[10],
                       orderdata[12]);

      this.metricaCombranza = metricaC;

      const orderdataIntercompania: MetricaCobranzaModel[] = data.data.metricaCarteraGastosIntercompanias;
      let metricaCIntercompania = [];
      metricaCIntercompania.push(orderdataIntercompania[0],orderdataIntercompania[1],orderdataIntercompania[2],orderdataIntercompania[3],
                                 orderdataIntercompania[4],orderdataIntercompania[6],);                 

      this.metricaCombranzaIntercompania = metricaCIntercompania

      this.graficaMC = data.data.metricaCartera.filter((word) => word.clasificacion !== "");
      this.graficaMCIntercompania = data.data.metricaCarteraGastosIntercompanias.filter((word) => word.clasificacion !== "");

      const orderGPT: any[] = data.data.pendientesTimbrar;
      let gpt = [];
      gpt.push(orderGPT[4],orderGPT[5],orderGPT[6],orderGPT[7],orderGPT[0],orderGPT[1],orderGPT[2],orderGPT[3])
      
      let filterGPT = []
      
      filterGPT = gpt.filter((word) => word.clasificacion !== "Con Evidencia")

      this.graficaPT = filterGPT.filter((word) => word.clasificacion !== "");

      let filterPT = []
      filterPT =  data.data.pendientesTimbrar.filter((word) => word.clasificacion !== "Con Evidencia");

      this.pendienteTimbrar = filterPT.filter((word) => word.clasificacion !== "");

      this.graficaPCC = data.data.pendientesCartaCobro.filter((word) => word.clasificacion !== "");
      this.pendienteCartaCobro = data.data.pendientesCartaCobro.filter((word) => word.clasificacion !== "");

      this.graficaCCC = data.data.conCartaCobro.filter((word) => word.clasificacion !== "");
      this.conCartaCobro = data.data.conCartaCobro

      this.graficaIngreso = data.data.total;
      this.graficaIngresoIntercompania = data.data.totalGastosIntercompanias;

      var myGII = data.data.totalGastosIntercompanias;

      for(let i =0; i<myGII.length; i++){
        myGII[i].region = "GASTOS INTERCOMPAÑIA"

      }
      
      
        

      this.loadingVisible = false;
      }
    })
  }

  Actuaizar(e){
    this.metricaCombranza = [];
    this.graficaMC = [];
    this.graficaPT = [];
    this.pendienteTimbrar = [];
    this.graficaPCC = [];
    this.pendienteCartaCobro = [];
    this.graficaCCC = [];
    this.conCartaCobro = [];
    this.graficaIngreso = [];

    this.getMetricaCobranza();
  }

  calcularPorcentajes(options: any) {
    // //
    // if (options.summaryProcess === 'calculate') {
    //   if (options.name === 'grupMargenUtilidaPor') {
    //     options.totalValue = .17;
    //   }
    // }
  }

  // customizeLabel = (point) =>{
  //   console.log(point)
  //   return `$${parseFloat(point.valueText).toFixed(2)}`;
  // }
  
 

  onShown() {
    // setTimeout(() => {
    //   this.loadingVisible = false;
    // }, 3000);
  }

  onHidden() {
  }


  onRowPreparedMC(e){
    if (e.rowType == 'group') {
      if (e.groupIndex == 0) {
        e.rowElement.style.backgroundColor = '#dcdcdc';
        e.rowElement.style.color = "black";
        e.rowElement.style.fontWeight = "bolder";
      }
      else {
        e.rowElement.style.backgroundColor = '#dcdcdc';
        e.rowElement.style.color = "black";
        e.rowElement.style.fontWeight = "bolder";
      }
    }

  }

  onCellPreparedMC(e){
    if (e.rowType == 'data') {
      e.cellElement.style.size = "5px";
      if (e.data.tipo == "Total Pendiente Timbrar" ||
        e.data.tipo == "Total" ||
        e.data.tipo == "Total Cartera")
        {
          e.cellElement.style.fontWeight = "bolder";
          e.cellElement.style.fontSize = "14px";
          
        
        e.cellElement.style.background = "#ff9460";
        e.cellElement.style.color = "black";
        }
    }

    if (e.rowType == 'group'){

      e.cellElement.style.fontSize = '12px';
      e.cellElement.style.background = "#DCDCDC";
    }

    if (e.rowType == 'totalFooter') {
      e.totalItem.cells.forEach((c: any) => {
        if (c.cellElement) {
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.fontSize = "14px";
            c.cellElement.style.background = "#ff9460";
            c.cellElement.style.color = "black"; 
        }   
      });
    }
  }

  customizeExport(e) {  
    var gridCell = e.gridCell;
    if (gridCell.rowType === 'data') {
     

      if(gridCell.data.tipo == 'Total Pendiente Timbrar' ||
        gridCell.data.tipo == 'Total Cartera' ||
        gridCell.data.tipo == 'Total Cartera'){

          e.backgroundColor = "#FD9460";
          e.font = {bold: true}
      }

    }
  }


  onRowPreparedPT(e){
    if (e.rowType == 'group') {
      if (e.groupIndex == 0) {
        e.rowElement.style.backgroundColor = '#dcdcdc';
        e.rowElement.style.color = "black";
        e.rowElement.style.fontWeight = "bolder";
      }
      else {
        e.rowElement.style.backgroundColor = '#dcdcdc';
        e.rowElement.style.color = "black";
        e.rowElement.style.fontWeight = "bolder";
      }
    }

  }

  onCellPreparedPT(e){
    // if (e.rowType == 'data') {
    //   e.cellElement.style.size = "5px";
    //   if (e.data.tipo == "Total Pendiente Timbrar" ||
    //     e.data.tipo == "Total" ||
    //     e.data.tipo == "Total Cartera")
    //     {
    //       e.cellElement.style.fontWeight = "bolder";
    //       e.cellElement.style.fontSize = "14px";
          
        
    //     e.cellElement.style.background = "#ff9460";
    //     e.cellElement.style.color = "black";
    //     }
    // }

    if (e.rowType == 'group'){

      e.cellElement.style.fontSize = '12px';
      e.cellElement.style.background = "#DCDCDC";
    }

    if (e.rowType == 'totalFooter') {
      e.totalItem.cells.forEach((c: any) => {
        if (c.cellElement) {
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.fontSize = "14px";
            c.cellElement.style.background = "#ff9460";
            c.cellElement.style.color = "black"; 
        }   
      });
    }
  }

  customizeExportPT(e) {  
    var gridCell = e.gridCell;
    // if (gridCell.rowType === 'data') {
     

    //   if(gridCell.data.tipo == 'Total Pendiente Timbrar' ||
    //     gridCell.data.tipo == 'Total Cartera' ||
    //     gridCell.data.tipo == 'Total Cartera'){

    //       e.backgroundColor = "#FD9460";
    //       e.font = {bold: true}
    //   }

    // }
  }


  onRowPreparedPCC(e){
    if (e.rowType == 'group') {
      if (e.groupIndex == 0) {
        e.rowElement.style.backgroundColor = '#dcdcdc';
        e.rowElement.style.color = "black";
        e.rowElement.style.fontWeight = "bolder";
      }
      else {
        e.rowElement.style.backgroundColor = '#dcdcdc';
        e.rowElement.style.color = "black";
        e.rowElement.style.fontWeight = "bolder";
      }
    }

  }

  onCellPreparedPCC(e){
    // if (e.rowType == 'data') {
    //   e.cellElement.style.size = "5px";
    //   if (e.data.tipo == "Total Pendiente Timbrar" ||
    //     e.data.tipo == "Total" ||
    //     e.data.tipo == "Total Cartera")
    //     {
    //       e.cellElement.style.fontWeight = "bolder";
    //       e.cellElement.style.fontSize = "14px";
          
        
    //     e.cellElement.style.background = "#ff9460";
    //     e.cellElement.style.color = "black";
    //     }
    // }

    if (e.rowType == 'group'){

      e.cellElement.style.fontSize = '12px';
      e.cellElement.style.background = "#DCDCDC";
    }

    if (e.rowType == 'totalFooter') {
      e.totalItem.cells.forEach((c: any) => {
        if (c.cellElement) {
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.fontSize = "14px";
            c.cellElement.style.background = "#ff9460";
            c.cellElement.style.color = "black"; 
        }   
      });
    }
  }

  customizeExportPCC(e) {  
    var gridCell = e.gridCell;
    // if (gridCell.rowType === 'data') {
     

    //   if(gridCell.data.tipo == 'Total Pendiente Timbrar' ||
    //     gridCell.data.tipo == 'Total Cartera' ||
    //     gridCell.data.tipo == 'Total Cartera'){

    //       e.backgroundColor = "#FD9460";
    //       e.font = {bold: true}
    //   }

    // }
  }


  onRowPreparedCCC(e){
    if (e.rowType == 'group') {
      if (e.groupIndex == 0) {
        e.rowElement.style.backgroundColor = '#dcdcdc';
        e.rowElement.style.color = "black";
        e.rowElement.style.fontWeight = "bolder";
      }
      else {
        e.rowElement.style.backgroundColor = '#dcdcdc';
        e.rowElement.style.color = "black";
        e.rowElement.style.fontWeight = "bolder";
      }
    }

  }

  onCellPreparedCCC(e){
    if (e.rowType == 'data') {
      e.cellElement.style.size = "5px";
      if (e.data.tipo == "Total Pendiente Timbrar" ||
        e.data.tipo == "Total" ||
        e.data.tipo == "Total Cartera")
        {
          e.cellElement.style.fontWeight = "bolder";
          e.cellElement.style.fontSize = "14px";
          
        
        e.cellElement.style.background = "#ff9460";
        e.cellElement.style.color = "black";
        }
    }

    if (e.rowType == 'group'){

      e.cellElement.style.fontSize = '12px';
      e.cellElement.style.background = "#DCDCDC";
    }

    if (e.rowType == 'totalFooter') {
      e.totalItem.cells.forEach((c: any) => {
        if (c.cellElement) {
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.fontSize = "14px";
            c.cellElement.style.background = "#ff9460";
            c.cellElement.style.color = "black"; 
        }   
      });
    }
  }

  customizeExportCCC(e) {  
    var gridCell = e.gridCell;
    if (gridCell.rowType === 'data') {
     

      if(gridCell.data.tipo == 'Total Pendiente Timbrar' ||
        gridCell.data.tipo == 'Total Cartera' ||
        gridCell.data.tipo == 'Total Cartera'){

          e.backgroundColor = "#FD9460";
          e.font = {bold: true}
      }

    }
  }

  customizeLabel = (pointInfo) => {
    const value = parseFloat(pointInfo.valueText);
    const formattedValue = new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        minimumFractionDigits: 2
    }).format(value);
    return formattedValue;
  };

  customizeLabelDonut(point) {
    return `${point.argumentText}   :    $ ${point.valueText}`;
  }

  customizeSeries(valueFromNameField: number) {
    return valueFromNameField === 2009
      ? { type: 'line', label: { visible: true }, color: '#ff3f7a' } : {};
  }



formatPesosMX(value){
  
  var myvalue = Math.trunc(value);

  var myFormat = myvalue.toString().split(".");
  myFormat[0] = myFormat[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  

  return '$ '+myFormat.join("");
}


calculateTotal(pieChart) {
  const totalValue = pieChart.getAllSeries()[0].getVisiblePoints().reduce((s, p) => s + p.originalValue, 0);

  var myvalue = Math.trunc(totalValue);

  var myFormat = myvalue.toString().split(".");
  myFormat[0] = myFormat[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  

  return '$ '+myFormat.join("");

}

perosnalizeStyle(value){
  //console.log(value)

  if(value.index == 0){
    value.color = "red"
  }else if(value.index == 1){
    value.color = "blue"
  }else if(value.index == 2){
    value.color = "green"
  }
}

style(event){
  //console.log(event)
}



}


