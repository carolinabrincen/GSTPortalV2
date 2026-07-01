import { Component, OnInit, ViewChild } from '@angular/core';
import { DxSelectBoxComponent, DxFormComponent} from 'devextreme-angular';
import { Cartera } from '../../shared/models/carteraClientes/cartera';
import { CarteraInterCompaniasService } from '../../services/carteraInterCompanias/carteraInterCompanias.service'
import { CarteraInterCompanias } from '../..//shared/models/carteraIntercompanias/carteraIntercompanias.model';
import { CarteraTerceros } from '../../shared/models/carteraIntercompanias/carteraTerceros.model';
import { ClientesAsignados } from '../../shared/models/carteraIntercompanias/clientesAsignados.model';

import { StorageService } from '../../shared/services/storage.service';
import themes from 'devextreme/ui/themes';
import notify from 'devextreme/ui/notify';
import { ActivatedRoute, Router } from '@angular/router';
import SelectBox from "devextreme/ui/select_box";

@Component({
  templateUrl: './carteraInterCompanias.component.html',
  styleUrls: ['./carteraInterCompanias.component.scss'],
})
export class CarteraInterCompaniasComponent implements OnInit {

  @ViewChild('selectTracto') selectTracto!: DxSelectBoxComponent;
  @ViewChild(DxFormComponent, { static: false }) form:DxFormComponent;
  
  col: string = '50';

  boxCartera: Cartera[] = [
    { id: 0, cartera: 'GST CONSOLIDADO'},
    { id: 1, cartera: "TRANSPORTES BONAMPAK S.A. DE C.V." },
    { id: 2, cartera: "AUTOTRANSPORTE MACUSPANA S.A. DE C.V." },
    { id: 3, cartera: "TRANSPORTADORA ESPECIALIZADA INDUSTRIAL S.A. DE C.V." },
    { id: 4, cartera: "TRANSPORTES DE CARGA GEMINIS S.A. DE C.V." },
    { id: 5, cartera: "GST FLETES Y SERVICIOS S.A. DE C.V." },

  ];

  carteraTerceros: CarteraTerceros[] = []
  carteraInfo: any;

  periodo: any[] = [
     { id: 202606, periodo: 202606 },
    { id: 202605, periodo: 202605 },
    { id: 202604, periodo: 202604 },
    { id: 202603, periodo: 202603 },
    { id: 202602, periodo: 202602 },
    { id: 202601, periodo: 202601 },
    { id: 202512, periodo: 202512 },
    { id: 202511, periodo: 202511 },
    { id: 202510, periodo: 202510 },
    { id: 202509, periodo: 202509 },
    { id: 202508, periodo: 202508 },
    { id: 202507, periodo: 202507 },
    { id: 202506, periodo: 202506 },
    { id: 202505, periodo: 202505 },
    { id: 202504, periodo: 202504 },
    { id: 202503, periodo: 202503 },
    { id: 202502, periodo: 202502 },
    { id: 202501, periodo: 202501 },
    { id: 202412, periodo: 202412 },
    { id: 202411, periodo: 202411 },
    { id: 202410, periodo: 202410 },
    { id: 202409, periodo: 202409 },
    { id: 202408, periodo: 202408 },
    { id: 202407, periodo: 202407 },
    { id: 202406, periodo: 202406 },
    { id: 202405, periodo: 202405 },
    { id: 202404, periodo: 202404 },
    { id: 202403, periodo: 202403 },
    { id: 202402, periodo: 202402 },
    { id: 202401, periodo: 202401 },
    { id: 202312, periodo: 202312 },
    { id: 202311, periodo: 202311 },
    { id: 202310, periodo: 202310 },
    { id: 202309, periodo: 202309 },
    { id: 202308, periodo: 202308 },
    { id: 202307, periodo: 202307 },
  ];

  areaInter: any[] = [
    {idArea: 1, nombre: 'TBK ORI' },
    {idArea: 2, nombre: 'TBK GDL' },
    {idArea: 3, nombre: 'TBK RAMOS' },
    {idArea: 4, nombre: 'TBK MEX' },
    {idArea: 5, nombre: 'TBK HER' },
    {idArea: 6, nombre: 'TBK PAZ' },
    {idArea: 7, nombre: 'ATM' },
    {idArea: 8, nombre: 'TEISA' },
    {idArea: 9, nombre: 'GEMINIS' },
    {idArea: 10, nombre: 'GST' },

  ]

  periodoActual: number;

  readonly allowedPageSizes = [5, 10, 20, 50, 100, 'all'];

  loadingVisible = false;


  selectedBoxCartera: number = 0;

  modeSearch: 'true' | 'false' = 'false';

  isVisible = false;

  selectedPeriodo: number = 0;

  modPeriodo: boolean;

  clientes: CarteraInterCompanias[] = []
  selectCliente: number;

  selectedIdAreaInter: number;
  selectedAreaInter: string;

  buttonOptions: any = {
    text: 'Guardar',
    type: 'success',
    useSubmitBehavior: true,

  };

  buttonOptionsVariables: any;
  buttonOptionsPre: any;
  positionOf: string = '#myDiv';

  formCierre: any = {
    usuario: "",
    contrasenia: "",

  }
  

  allMode: string;
  checkBoxesMode: string;

  clientesAsignados: ClientesAsignados[]=[]
  
  showClientes: boolean = false;
  validationChecBox: boolean = false;

  constructor(
    private carteaInterService: CarteraInterCompaniasService,
    private storageService: StorageService,
    private router: Router,
    private route: ActivatedRoute,
    ) {
      this.allMode = 'allPages';
      this.checkBoxesMode = themes.current().startsWith('material') ? 'always' : 'onClick';
    }



  ngOnInit(): void {
    // this.getCarteraDetalle();
    this.getPeriodo();
    this.getClientes();


  }

  ngAfterViewInit(): void {}

  //=================GETS===========================

  getClientes(){
    this.carteaInterService.getCarteraClientes().subscribe(data =>{
      //console.log(data.data)
      this.clientes = data.data;
    })
  }

  // getCarteraDetalle(){
  //   const request = new Promise((resolve, reject) => {
  //     this.carteaInterService.getCarteraDetalle().subscribe(data => {
  //       this.detalle = data.data;
  //       //console.log(this.detalle)
  //       this.loadingVisible = false;
  //     })
  //   });
  //   return request;
  // }

  getPeriodo(){
    this.carteaInterService.getPeriodoActual().subscribe(data => {
      this.periodoActual = data.data;
      //console.log(data)
    })
  }

  //=================SELECTS========================
  printValue = "";
  selectBoxCartera(e: any) {
    this.selectedBoxCartera = e.value;
    if(e.value == 0){
      this.printValue = this.boxCartera[0].cartera
    }
    if(e.value == 1){
      this.printValue = this.boxCartera[1].cartera
    }
    if(e.value == 2){
      this.printValue = this.boxCartera[2].cartera
    }
    if(e.value == 3){
      this.printValue = this.boxCartera[3].cartera
    }
    if(e.value == 4){
      this.printValue = this.boxCartera[4].cartera
    }
    if(e.value == 5){
      this.printValue = this.boxCartera[5].cartera
    }

  }

  seleccionarPeriodo(e: any) {
    this.selectedPeriodo = e.value
  }

  selectedClientes(e: any){
    this.selectCliente = e.value
  }

  selectAreaInter(e: any){
    this.selectedIdAreaInter = e.value;

    if(e.value == 1){this.selectedAreaInter = "TBK ORI";}
    if(e.value == 2){this.selectedAreaInter = "TBK GDL";}
    if(e.value == 3){this.selectedAreaInter = "TBK RAMOS";}
    if(e.value == 4){this.selectedAreaInter = "TBK MEX";}
    if(e.value == 5){this.selectedAreaInter = "TBK HER";}
    if(e.value == 6){this.selectedAreaInter = "TBK PAZ";}
    if(e.value == 7){this.selectedAreaInter = "ATM";}
    if(e.value == 8){this.selectedAreaInter = "TEISA";}
    if(e.value == 9){this.selectedAreaInter = "GEMINIS";}
    if(e.value == 10){this.selectedAreaInter = "GST";}
  }


  postCarteraCliente(){
    this.carteaInterService.postCarteraTerceros(this.selectedPeriodo, this.selectedBoxCartera).subscribe(data => {
      
      this.carteraTerceros = data.data;
      console.log(this.carteraTerceros)
      // this.carteraTerceros.sort((a, b) => (a.cliente < b.cliente ? -1 : 1));
      
      // this.carteraInfo = data.data

      this.loadingVisible = false;
    })
  }

  postAsignarCliente(){

    if(this.validationChecBox == false){
      if(this.selectCliente !== undefined && this.selectedIdAreaInter !== undefined){
        console.log(this.clientesAsignados)
        this.loadingVisible = true;
        this.carteaInterService.postAsignarCliente(this.clientesAsignados).subscribe(data =>{

          console.log(data)

          if (data.responseCode === 200) {
            notify({
              message: "La asignación fue exitosa",
              position: {
                my: 'center center',
                at: 'center center',
              },
            }, 'success', 3000);

            this.postCarteraCliente();

            let element = document.getElementById("select");
            let instance = SelectBox.getInstance(element) as SelectBox;

              // get value
              let currentValue = instance.option("value");
              // change value
              instance.option("value", "");

              let areaInter = document.getElementById("areaInter");
              let instanceArea = SelectBox.getInstance(areaInter) as SelectBox;
          
              let current = instanceArea.option("value");
              instanceArea.option("value", "");


              this.selectCliente = undefined
              this.clientesAsignados = [];

              this.loadingVisible = false;
          }else{
            notify({
              message: "No se puedo asignar el cliente, intente mas tarde",
              position: {
                my: 'center center',
                at: 'center center',
              },
            }, 'error', 3000);

            this.loadingVisible = false;
          }

        })
      }else{
        notify({
          message: "Porfavor seleccione los campos necesarios",
          position: {
            my: 'center center',
            at: 'center center',
          },
        }, 'warning', 3000);
      }
    }else if(this.validationChecBox ==true){
      if(this.selectedIdAreaInter !== undefined){
        console.log(this.clientesAsignados)
        this.loadingVisible = true;
        this.carteaInterService.postAsignarCliente(this.clientesAsignados).subscribe(data =>{

          console.log(data)

          if (data.responseCode === 200) {
            notify({
              message: "La asignación fue exitosa",
              position: {
                my: 'center center',
                at: 'center center',
              },
            }, 'success', 3000);

            this.postCarteraCliente();

            let element = document.getElementById("select");
            let instance = SelectBox.getInstance(element) as SelectBox;

              // get value
              let currentValue = instance.option("value");
              // change value
              instance.option("value", "");

              let areaInter = document.getElementById("areaInter");
              let instanceArea = SelectBox.getInstance(areaInter) as SelectBox;
          
              let current = instanceArea.option("value");
              instanceArea.option("value", "");

              this.selectCliente = undefined
              this.clientesAsignados = [];

              this.loadingVisible = false;
          }else{
            notify({
              message: "No se puedo asignar el cliente, intente mas tarde",
              position: {
                my: 'center center',
                at: 'center center',
              },
            }, 'error', 3000);

            this.loadingVisible = false;
          }

        })
      }else{
        notify({
          message: "Porfavor seleccione los campos necesarios",
          position: {
            my: 'center center',
            at: 'center center',
          },
        }, 'warning', 3000);
      }
    }
  }


  ActuaizarDetalle(){
    // this.getCarteraDetalle();
    this.loadingVisible = true;
  }

  callCostosAnuales() {
    const request = new Promise((resolve, reject) => {
      // this.getCATPS();
      // this.getCACostos();
      // this.getCAAuxiliar();
    });
    return request;
  }

  borrarClick = (e: any) =>{
    this.selectTracto.value = '';
  }

  
  buscarClick = (e: any) => {
    if (this.selectedPeriodo !==  0 && this.selectedBoxCartera !== undefined) {
      this.loadingVisible = true;
      this.modeSearch = 'true'

      this.postCarteraCliente();
    }

  };

  onShown() {
    // setTimeout(() => {
    //   this.loadingVisible = false;
    // }, 3000);
  }

  onHidden() {
  }

  onRowPreparedCC(e: any){
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

  onCellPreparedCC(e: any){
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

//====================personalize style excel========================================
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

//==================Formato a la data de la grafica==================================
  formatSliderTooltip (value) {
    
    return Intl.NumberFormat('es-MX',{style:'currency',currency:'MXN'}).format(value);
  }

//==================Formato solo comas===============================================  
  separator(value) {
    var myvalue = Math.trunc(value);

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

  customizeDateDetalle(data) {
    data = "TOTAL"
    return data;
  }

  separatorcon(value) {
    var myvalue = Math.trunc(value);

    var myFormat = myvalue.toString().split(".");
    myFormat[0] = myFormat[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    

    return '$ '+myFormat.join("");
  }

  changePeriodoClick() {
    this.modPeriodo = true;
  }

  Cancelar(e){
    console.log(e)
    this.modPeriodo = false;
  }



  onSelectionChanged(event){
    //console.log(event)
    var myAsignacion = new ClientesAsignados;
    var idUsuario = this.storageService.getSession("username")

    if(this.validationChecBox == false){
      if(event.row?.isSelected == true){
        //console.log("TRUE ==>")
        //console.log(event)

        myAsignacion.idModifico = idUsuario;
        myAsignacion.idCliente = this.selectCliente;
        myAsignacion.idCompania = event.row.data.iD_AREA;
        myAsignacion.documento = event.row.data.documento;
        myAsignacion.idAreaCliente = this.selectedIdAreaInter;
        myAsignacion.areaCliente = this.selectedAreaInter;

        this.clientesAsignados.push(myAsignacion)
        console.log(this.clientesAsignados)
      }

      if(event.row?.isSelected == false){
        //console.log("FALSE ==>")
  
        // Definir variable que tendrá la posición del elemento a borrar
        let borrar = -1;
        // Recorrer arreglo por elemento y posición
        this.clientesAsignados.forEach((item, index) => {
          if(item.documento == event.row.data.documento) {
              // Si el elemento coincide, actualizar variable
              borrar = index;
              // No hay posibilidad de usar break para cancelar
              // En todo caso, si son muchos elementos, conviene mejor usar un ciclo for
          }
        });
        
        // Borrar el elemento si existe en el arreglo
        if(borrar >= 0) {
          this.clientesAsignados.splice(borrar, 1);
        }
        console.log(this.clientesAsignados);
  
      }
    }else if(this.validationChecBox == true){
      if(event.row?.isSelected == true){
        //console.log("TRUE ==>")
        //console.log(event)

        myAsignacion.idModifico = idUsuario;
        myAsignacion.idCliente = 0;
        myAsignacion.idCompania = event.row.data.iD_AREA;
        myAsignacion.documento = event.row.data.documento;
        myAsignacion.idAreaCliente = this.selectedIdAreaInter;
        myAsignacion.areaCliente = this.selectedAreaInter;

        this.clientesAsignados.push(myAsignacion)
        console.log(this.clientesAsignados)
      }

      if(event.row?.isSelected == false){
        //console.log("FALSE ==>")
  
        // Definir variable que tendrá la posición del elemento a borrar
        let borrar = -1;
        // Recorrer arreglo por elemento y posición
        this.clientesAsignados.forEach((item, index) => {
          if(item.documento == event.row.data.documento) {
              // Si el elemento coincide, actualizar variable
              borrar = index;
              // No hay posibilidad de usar break para cancelar
              // En todo caso, si son muchos elementos, conviene mejor usar un ciclo for
          }
        });
        
        // Borrar el elemento si existe en el arreglo
        if(borrar >= 0) {
          this.clientesAsignados.splice(borrar, 1);
        }
        console.log(this.clientesAsignados);
  
      }
    }



  }

  limpiar(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./carteraInterCompanias'])
  }

  checkBox(value){
    this.validationChecBox = value.value;
    if(value.value == true){
      this.showClientes = true;
      
      let element = document.getElementById("select");
      let instance = SelectBox.getInstance(element) as SelectBox;
  
      let currentValue = instance.option("value");
      instance.option("value", "");

      let areaInter = document.getElementById("areaInter");
      let instanceArea = SelectBox.getInstance(areaInter) as SelectBox;
  
      let current = instanceArea.option("value");
      instanceArea.option("value", "");


        this.selectCliente = undefined;
        this.selectedIdAreaInter = undefined
        this.clientesAsignados = [];

      console.log(value.value)
    }else if(value.value == false){

      let areaInter = document.getElementById("areaInter");
      let instanceArea = SelectBox.getInstance(areaInter) as SelectBox;
  
      let current = instanceArea.option("value");
      instanceArea.option("value", "");

      this.selectedIdAreaInter = undefined
      this.clientesAsignados = [];
      this.showClientes = false;
      console.log(value.value)
    }
  }
}


