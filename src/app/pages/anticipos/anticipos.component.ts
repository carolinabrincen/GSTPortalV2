import { Component, OnInit, ViewChild } from '@angular/core';
import { DxSelectBoxComponent, DxFormComponent, DxDataGridComponent} from 'devextreme-angular';

import { Cartera } from '../../shared/models/carteraClientes/cartera';
import { CarteraClientes } from '../..//shared/models/carteraClientes/carteraClientes';
import { Detalle } from '../../shared/models/carteraClientes/detalle';

import { AnticiposService } from 'src/app/services/anticipos/anticipos.service';
import { StorageService } from '../../shared/services/storage.service';
import notify from 'devextreme/ui/notify';

import { Totales, Total } from '../../shared/models/carteraClientes/totales';

import { Workbook } from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { saveAs} from 'file-saver-es';
import { ActivatedRoute, Router } from '@angular/router';

import deMessages from "devextreme/localization/messages/es.json";
import { locale, loadMessages } from "devextreme/localization";
import { Anticipos, AllAnticipos } from 'src/app/shared/models/anticipos/anticipos';

const totales = new Totales;
const total = new Total;

const totalAnticipos = new Anticipos;

@Component({
  templateUrl: './anticipos.component.html',
  styleUrls: ['./anticipos.component.scss'],
})
export class AnticiposComponent implements OnInit {
  @ViewChild('Ant1', { static: false }) grid1: DxDataGridComponent;
  @ViewChild('Ant2', { static: false }) grid2: DxDataGridComponent;

  operador: any[] = [];
  anticipos: any[] = [];
  rembolsos: any[] = [];
  detalleAB: any[] = [];
  detalleAC: any[] = [];
  detalleLB: any[] = [];
  detalleLC: any[] = [];
  detalleLSCB: any[] = [];
  detalleLSCC: any[] = [];
  detalleReembolso: any[] = [];


  readonly allowedPageSizes = [5, 10, 20, 50, 100, 'all'];

  searchModeOption = 'contains';
  searchExprOption = 'nombre';
   searchExprOptionItems = [{
    name: "'nombre'",
    value: 'nombre',
  }, {
    name: "['nombre', 'Category']",
    value: ['nombre', 'Category'],
  }];
   searchTimeoutOption = 200;
   minSearchLengthOption = 0;
   showDataBeforeSearchOption = false;

  loadingVisible = false;

  isVisible = false;

  selectedOperador: string = "";

  classBancos = "Bancos";
  classCajas = "Cajas";

  modRembolso: boolean = false;
  modDetalleAB: boolean = false;
  modDetalleAC: boolean = false;
  modDetalleLB: boolean = false;
  modDetalleLC: boolean = false;
  modDetalleLSCB: boolean = false;
  modDetalleLSCC: boolean = false;
  
  constructor(
    private anticiposService: AnticiposService,
    private storageService: StorageService,
    private router: Router,
    ) {

      const that = this;
        loadMessages(deMessages);
        locale(navigator.language);
      }



  ngOnInit(): void {
      this.getOperador();
  }

  ngAfterViewInit(): void {}

  //=================GETS===========================
  getOperador(){
    var value
    this.loadingVisible = true;
    this.anticiposService.getOperador(value).subscribe(data => {
     this.operador = data.data;
     this.operador.sort((a, b) => (a.nombre < b.nombre ? -1 : 1))
     //console.log(this.operador)
     this.loadingVisible = false;
    })
  }

  getAnticipos(){  
    this.loadingVisible = true;
    this.anticiposService.getAnticipos(this.selectedOperador).subscribe(data => {
      //console.log(data.data)
      if(data !== null){
      var myAnti = [];
      myAnti.push(data?.data?.anticipos);


      for(let i =0; i<myAnti.length; i++){

        var myCalculo = myAnti[i]?.liqReembolso - myAnti[i]?.reemAbonos;
        var myDiferencia = myCalculo + myAnti[i]?.reemCargos;

        var myAnticipos = new AllAnticipos;
        myAnticipos = myAnti[i];

        myAnticipos.diferencia = myDiferencia;
        myAnticipos.clasificacionB = "Bancos",
        myAnticipos.clasificacionC = "Caja"
        this.anticipos.push(myAnticipos);
        
        //console.log(this.anticipos)
      }

      // this.anticipos.push(data?.data?.anticipos);

      this.rembolsos.push(data?.data?.anticipos);

      this.detalleAB = data?.data?.detalleAnticiposBanco;
      this.detalleAC = data?.data?.detalleAnticiposCaja;
      this.detalleLB = data?.data?.detalleLiquidacionBanco;
      this.detalleLC = data?.data?.detalleLiquidacionCaja;
      this.detalleLSCB = data?.data?.detalleLiquidadoSinContabilizarBanco;
      this.detalleLSCC = data?.data?.detalleLiquidadoSinContabilizarCaja;

      this.detalleReembolso = data?.data?.detalleReembolso;
      
       totalAnticipos.suma_Total = data.data.anticipos.suma_Total;
       totalAnticipos.suma_PorLiquidar = data.data.anticipos.suma_PorLiquidar;
       totalAnticipos.suma_AntSinLquidar = data.data.anticipos.suma_AntSinLquidar;




      this.loadingVisible = false;
    }
    })
  }

  //=================SELECTS========================
 

  printOperador: any;
  seleccionarPeriodo(e: any) {
    this.selectedOperador = e.value


     var myOperador = this.operador;
     for(let i =0; i<myOperador.length; i++){
        if(this.selectedOperador !== ""){
          if(this.selectedOperador == myOperador[i].cvetra){
            this.printOperador = myOperador[i]
            //console.log(this.printOperador)
          }
        }
     } 

    // this.printOperador = e.component._changedValue;

  }

  verAnticipoB(value){
    this.modDetalleAB = true;
  }
  verLiquidacionB(value){
    this.modDetalleLB = true;
  }
  verLSCB(value){
    this.modDetalleLSCB = true;
  }

  verAnticipoC(value){
    this.modDetalleAC = true;
  }
  verLiquidacionC(value){
    this.modDetalleLC = true;
  }
  verLSCC(value){
    this.modDetalleLSCC = true;
  }

  verRembolso(value){
    this.modRembolso = true
  }
 

  ActualizarCartera() {
  
   
  }
  
  buscarClick = (e: any) => {
    if (this.selectedOperador !== "") {
      this.anticipos = [];
      this.rembolsos = [];

      this.loadingVisible = true;
      this.getAnticipos()

    }

  };

  onShown() {
    // setTimeout(() => {
    //   this.loadingVisible = false;
    // }, 3000);
  }

  onHidden() {
  }
/*===============================================GRIDS==================================================*/
  onRowPreparedB(e: any){

    if (e.rowType == 'data') {
       e.cells.forEach((c: any) => {

      if (c.cellElement) {
        if(c.columnIndex == 1){
          if(c.cellElement?.style !== undefined){
            c.cellElement.style.color = "red";
          }
        }

        if(c.columnIndex == 2){
          if(c.cellElement?.style !== undefined){
            c.cellElement.style.color = "red";
          }
        }

        if(c.columnIndex == 9){
          if(c.cellElement?.style !== undefined){
            c.cellElement.style.color = "red";
          }
        }
      }
    });
    }

    if (e.rowType == 'group') {}

    if(e.rowType == 'totalFooter'){}
  }

  onCellPreparedB(e: any){
    // if (e.rowType == 'totalFooter') {
    //   e.totalItem.cells.forEach((c: any) => {
    //     if (c.cellElement) {
    //         c.cellElement.style.fontWeight = "bolder";
    //         c.cellElement.style.fontSize = "16px";
    //         c.cellElement.style.background = "#ff9460";
    //         c.cellElement.style.color = "black"; 
    //     }   
    //   });
    // }
  }

  onRowPreparedCaj(e: any){
      if (e.rowType == 'data') {
       e.cells.forEach((c: any) => {

      if (c.cellElement) {
        if(c.columnIndex == 1){
          if(c.cellElement?.style !== undefined){
            c.cellElement.style.color = "red";
          }
        }

        if(c.columnIndex == 2){
          if(c.cellElement?.style !== undefined){
            c.cellElement.style.color = "red";
          }
        }

        if(c.columnIndex == 9){
          if(c.cellElement?.style !== undefined){
            c.cellElement.style.color = "red";
          }
        }
      }
    });
    }

    
  }
  onCellPreparedCaj(e: any){
    if(e.rowType == 'totalFooter'){
      e.totalItem.cells.forEach((c: any) => { 

        if (c.cellElement) {
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.fontSize = "16px";
            c.cellElement.style.background = "#ff9460";
            c.cellElement.style.color = "black"; 
        }
         
        var sumaAntSinLiq = totalAnticipos.suma_AntSinLquidar.toString().split(".");
        sumaAntSinLiq[0] = sumaAntSinLiq[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        
        c.totalItem.summaryCells[7][0] = {'value': '$ '+sumaAntSinLiq};

        var sumaPorLiq = totalAnticipos.suma_PorLiquidar.toString().split(".");
        sumaPorLiq[0] = sumaPorLiq[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        c.totalItem.summaryCells[9][0] = {'value': '$ '+sumaPorLiq};

        var sumaTotal = totalAnticipos.suma_Total.toString().split(".");
        sumaTotal[0] = sumaTotal[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        c.totalItem.summaryCells[10][0] = {'value': '$ '+sumaTotal};

      })
    }
  }
  onRowPreparedRem(e: any){}
  onCellPreparedRem(e: any){}
//====================personalize style excel========================================
  exportGridsAva(e) {
    const context = this;
    const workbook = new Workbook();


    const carteraAvance = workbook.addWorksheet('Anticipos');

    carteraAvance.getRow(2).getCell(2).value = 'Anticipos';
    carteraAvance.getRow(2).getCell(2).font = { bold: true, size: 16, underline: 'double' };

    carteraAvance.getRow(4).getCell(2).value = 'Operador: '+this.printOperador.nombre;
    carteraAvance.getRow(4).getCell(2).font = { bold: true, size: 16,};

    carteraAvance.getRow(6).getCell(2).value = 'Clave Trabajador: '+this.printOperador.cvetra;
    carteraAvance.getRow(6).getCell(2).font = { bold: true, size: 16,};

    carteraAvance.getRow(6).getCell(4).value = 'Status:'+this.printOperador.status;
    carteraAvance.getRow(6).getCell(4).font = { bold: true, size: 16};

    carteraAvance.getRow(8).getCell(2).value = 'Nombre: '+this.printOperador.nombre;
    carteraAvance.getRow(8).getCell(2).font = { bold: true, size: 16};

    const dateString = this.printOperador.alta;
    const formattedDate = dateString.slice(0, 10);

    carteraAvance.getRow(10).getCell(2).value = 'Alta: '+formattedDate;
    carteraAvance.getRow(10).getCell(2).font = { bold: true, size: 16};

    const datebaja = this.printOperador.baja;
    const formattedBaja = datebaja.slice(0, 10);

    carteraAvance.getRow(10).getCell(4).value = 'Baja: '+formattedBaja;
    carteraAvance.getRow(10).getCell(4).font = { bold: true, size: 16};

    function setAlterRowsBackAvance(gridCell, excelCell){
      //console.log(gridCell)
      if (gridCell.rowType === 'data') {
        if(excelCell.address !== 'B16' && excelCell.address !== 'E16'&& excelCell.address !== 'H16' && excelCell.address !== 'J16'){
          
          // var x = Math.round(excelCell.value)
          // var myvalue = Math.trunc(x);
      
          var myFormat = excelCell?.value.toString().split(".");
          myFormat[0] = myFormat[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

          excelCell.value = '$ '+myFormat;
        }

        if(gridCell.column.dataField === 'antBanPagado' || gridCell.column.dataField === 'antBanContabilizado' || gridCell.column.dataField === 'total_renglon1'){
          //console.log(excelCell)
          // excelCell.fill = {
          //     type: 'pattern', pattern: 'solid', fgColor: { argb: 'b5e6b5' }, bgColor: { argb: 'b5e6b5' },
          //   };
        }
      }

      if (gridCell.rowType === 'header') {

        excelCell.fill = {
          type: 'pattern', pattern: 'solid', fgColor: { argb: 'D3D3D3' }, bgColor: { argb: 'D3D3D3' },
        };
      }

    }

    function setAlterRowsBackAvance2(gridCell, excelCell){
      //console.log(gridCell)
       if (gridCell.rowType === 'data') {

         if(excelCell.address !== 'B17' && excelCell.address !== 'E17'&& excelCell.address !== 'H17' && excelCell.address !== 'J17'){
          
          // var x = Math.round(excelCell.value)
          // var myvalue = Math.trunc(x);
      
          var myFormat = excelCell?.value.toString().split(".");
          myFormat[0] = myFormat[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

          excelCell.value = '$ '+myFormat;
        }

        if(gridCell.column.dataField === 'antCajaPagado' || gridCell.column.dataField === 'antCajaContabilizado' || gridCell.column.dataField === 'total_renglon2'){

        }
        

      }
            
      if (gridCell.rowType === 'totalFooter') {

      if(gridCell.column.dataField === "cajLiqSinContabilizar"){
        var sumaAntSinLiq = totalAnticipos.suma_AntSinLquidar.toString().split(".");
        sumaAntSinLiq[0] = sumaAntSinLiq[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
        
          excelCell._value.model.value = '$ '+sumaAntSinLiq;
      }
      if(gridCell.column.dataField === "total_renglon2"){
         var sumaPorLiq = totalAnticipos.suma_PorLiquidar.toString().split(".");
        sumaPorLiq[0] = sumaPorLiq[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

          excelCell._value.model.value = '$ '+sumaPorLiq;
      }              
      if(gridCell.column.dataField === "antCajaTotal"){
         var sumaTotal = totalAnticipos.suma_Total.toString().split(".");
        sumaTotal[0] = sumaTotal[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

          excelCell._value.model.value = '$ '+sumaTotal;
      }

          excelCell.fill = {
            type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF9460' }, bgColor: { argb: 'FF9460' },
          };
      }

    }

    carteraAvance.columns = [
      { width: 10 }, { width: 25 }
    ];

    exportDataGrid({
      worksheet: carteraAvance,
      component: context.grid1.instance,
      topLeftCell: { row: 14, column: 2 },
      customizeCell: ({ gridCell, excelCell }) => {
        setAlterRowsBackAvance(gridCell, excelCell);
      },
    }).then(() => exportDataGrid({
      worksheet: carteraAvance,
      component: context.grid2.instance,
      topLeftCell: { row: 17, column: 2 },
      customizeCell: ({ gridCell, excelCell }) => {
        setAlterRowsBackAvance2(gridCell, excelCell);
      },
    })).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Anticipos.xlsx');
      });
    });

    /**
     *
     */
  }


customizeCAER(e) {  
    var gridCell = e.gridCell;
    if (gridCell.rowType === 'data') {

      if(e.gridCell.column.caption == "Total"){
        e.backgroundColor = "#DCDCDC";
      }

    }

    if (gridCell.rowType === 'header') {
      e.backgroundColor = "#DCDCDC";
    }


  if (gridCell.rowType === 'totalFooter') {
      
    e.backgroundColor = "#ff9460";
    e.fontWeight = "bolder"
    e.font = {bold: true}

  }
  }

  onRowPreparedD(e){

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

  onCellPreparedD(e){
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

  onRowPreparedDAB(e: any){
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
  onCellPreparedDAB(e: any){
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
  
//==================Formato a la data de la grafica==================================
  formatSliderTooltip (value) {
    
    return Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(value);
  }

//==================Formato solo comas===============================================  
  separator(value) {
    var x = Math.round(value)

    var myvalue = Math.trunc(x);

    var myFormat = myvalue.toString().split(".");
    myFormat[0] = myFormat[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
    return '$ '+myFormat.join("");
  }

  formatMoneda(value) {
    var x = Math.round(value)

    var myvalue = Math.trunc(x);

    var myFormat = myvalue.toString().split(".");
    myFormat[0] = myFormat[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    
    return '$ '+myFormat.join("");
  }

  customizeColumns(columns) {
    columns[0].width = 70;
  }

  customizeDate(data) {
    data = "SUMA TERCEROS"
    return data;
  }

  CustomizeSinCart(data){
    data = "SUMA TERCEROS SIN CARTA COBRO";
    return data;
  }

  customizeIC(data){
    data = "SUMA INTERCOMPAÑÍAS "
    return data;
  }

  customizeISC(data){
    data = "SUMA INTERCOMPAÑÍAS SIN CARTA COBRO "
    return data;
  }

  customizeBancos(data){
    data = "Bancos"
    return data;
  }
  customizeCajas(data) {
    data = "Cajas"
    return data;
  }

  separatorcon(value) {
    var myvalue = Math.trunc(value);

    var myFormat = myvalue.toString().split(".");
    myFormat[0] = myFormat[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    

    return '$ '+myFormat.join("");
  }

  tabAvance(value){
    value.event.isTrusted = true;
  }

   calcularPorcentajes(options: any) {
    // //
    // if (options.summaryProcess === 'calculate') {
    //   if (options.name === 'grupMargenUtilidaPor') {
    //     options.totalValue = .17;
    //   }
    // }
  }
}


