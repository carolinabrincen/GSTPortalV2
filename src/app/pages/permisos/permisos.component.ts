import { Component, OnInit, ViewChild } from '@angular/core';
import { DxSelectBoxComponent, DxFormComponent, DxDataGridComponent} from 'devextreme-angular';
import { Cartera } from '../../shared/models/carteraClientes/cartera';
import { PermisosService } from 'src/app/services/permisos/permisos.service';
import { CarteraInterCompanias } from '../..//shared/models/carteraIntercompanias/carteraIntercompanias.model';
import { CarteraTerceros } from '../../shared/models/carteraIntercompanias/carteraTerceros.model';
import { Permisos } from 'src/app/shared/models/permisos/clientesAsignados.model';

import { StorageService } from '../../shared/services/storage.service';
import themes from 'devextreme/ui/themes';
import notify from 'devextreme/ui/notify';
import { ActivatedRoute, Router } from '@angular/router';
import SelectBox from "devextreme/ui/select_box";
import { DxiDataGridColumn } from 'devextreme-angular/ui/nested/base/data-grid-column-dxi';
import { DxoGridComponent } from 'devextreme-angular/ui/nested';

@Component({
  templateUrl: './permisos.component.html',
  styleUrls: ['./permisos.component.scss'],
})
export class PermisosComponent implements OnInit {

  @ViewChild('selectTracto') selectTracto!: DxSelectBoxComponent;
  @ViewChild(DxFormComponent, { static: false }) form:DxFormComponent;
  @ViewChild("gridPermisos", { static: false }) gridPermisos: DxDataGridComponent;
  
  col: string = '50';

 

  carteraTerceros: CarteraTerceros[] = []
  carteraInfo: any;


  periodoActual: number;

  readonly allowedPageSizes = [5, 10, 20, 50, 100, 'all'];

  loadingVisible = false;


  selectedBoxCartera: number = 0;

  modeSearch: 'true' | 'false' = 'false';

  isVisible = false;

  selectedPeriodo: number = 0;

  modPeriodo: boolean;

  clientes: CarteraInterCompanias[] = []
  selectUsuario: number = 0;

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

  permisosUser: Permisos[]=[]
  
  showClientes: boolean = false;
  validationChecBox: boolean = false;



  usuarios: any[] = [];
  permisosUsuario: any[] = [];


  constructor(
    private permisosService: PermisosService,
    private storageService: StorageService,
    private router: Router,
    private route: ActivatedRoute,
    ) {
      this.allMode = 'allPages';
      this.checkBoxesMode = themes.current().startsWith('material') ? 'always' : 'onClick';
    }



  ngOnInit(): void {
    // this.getCarteraDetalle();
    //this.getPeriodo();
    this.getUsuarios();


  }

  ngAfterViewInit(): void {

  }

  //=================GETS===========================

  getUsuarios(){
    this.permisosService.getUsuariosActiivos().subscribe(data =>{
      this.usuarios = data.data;
      // console.log(this.usuarios)
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

 

  //=================SELECTS========================
  selectedClientes(e: any){
    this.selectUsuario = e.value;
    console.log(this.selectUsuario);
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


  getPermisos(){
    console.log(this.selectUsuario)
    this.permisosService.getPermisos(this.selectUsuario).subscribe(data => {
      
      this.permisosUsuario = data.data;
      // console.log(this.permisosUsuario)




      this.loadingVisible = false;
    })
  }

  postGuardarPerm(){

      if(this.selectUsuario !== undefined){
        var myIdUser = Number(this.selectUsuario)
        // console.log(this.permisosUser)
        this.loadingVisible = true;
        this.permisosService.postGuardarPermisos(myIdUser, this.permisosUser).subscribe(data =>{

          // console.log(data)

          if (data.responseCode === 200) {
            notify({
              message: "El permiso fue exitosa",
              position: {
                my: 'center center',
                at: 'center center',
              },
            }, 'success', 3000);

            this.getPermisos();

            // let element = document.getElementById("select");
            // let instance = SelectBox.getInstance(element) as SelectBox;

            //   // get value
            //   let currentValue = instance.option("value");
            //   // change value
            //   instance.option("value", "");

            //   let areaInter = document.getElementById("areaInter");
            //   let instanceArea = SelectBox.getInstance(areaInter) as SelectBox;
          
             // let current = instanceArea.option("value");
             // instanceArea.option("value", "");


              // this.selectUsuario = undefined
              this.permisosUser = [];

              this.loadingVisible = false;
          }else{
            notify({
              message: "No se puede dar permisos",
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


  getPermisosActivos(e){

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
    if (this.selectUsuario !== undefined) {
      this.loadingVisible = true;
      this.modeSearch = 'true'

      this.getPermisos();
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
    // console.log(e)
    this.modPeriodo = false;
  }


initiallySelectedKeys = [1, 3];
  onSelectionChanged(event){

    //console.log(event)
    // this.permisosUser = event.selectedRowKeys;
    var myAsignacion = new Permisos;
    // var idUsuario = this.storageService.getSession("username")

      if(event.row?.isSelected == true){
        // myAsignacion.idOpciones = event.row.key.id

        this.permisosUser.push(event.row.key.id)
        // console.log(this.permisosUser)
      }

      if(event.row?.isSelected == false){
        //console.log("FALSE ==>")
  
        // Definir variable que tendrá la posición del elemento a borrar
        let borrar = -1;
        // Recorrer arreglo por elemento y posición
        this.permisosUser.forEach((item, index) => {
          if(item == event.key.id) {

              // Si el elemento coincide, actualizar variable
              borrar = index;
              // No hay posibilidad de usar break para cancelar
              // En todo caso, si son muchos elementos, conviene mejor usar un ciclo for
          }
        });
        
        // Borrar el elemento si existe en el arreglo
        if(borrar >= 0) {
          this.permisosUser.splice(borrar, 1);
        }
        // console.log(this.permisosUser);
  
      }
    



  }

  limpiar(){
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.router.onSameUrlNavigation = 'reload';
    this.router.navigate(['./permisos'])
  }

  checkBox(value){
    this.validationChecBox = value.value;
    // if(value.value == true){
    //   this.showClientes = true;
      
    //   let element = document.getElementById("select");
    //   let instance = SelectBox.getInstance(element) as SelectBox;
  
    //   let currentValue = instance.option("value");
    //   instance.option("value", "");

    //   let areaInter = document.getElementById("areaInter");
    //   let instanceArea = SelectBox.getInstance(areaInter) as SelectBox;
  
    //   let current = instanceArea.option("value");
    //   instanceArea.option("value", "");


    //     this.selectCliente = undefined;
    //     this.selectedIdAreaInter = undefined
    //     this.clientesAsignados = [];

    //   console.log(value.value)
    // }else if(value.value == false){

    //   let areaInter = document.getElementById("areaInter");
    //   let instanceArea = SelectBox.getInstance(areaInter) as SelectBox;
  
    //   let current = instanceArea.option("value");
    //   instanceArea.option("value", "");

    //   this.selectedIdAreaInter = undefined
    //   this.clientesAsignados = [];
    //   this.showClientes = false;
    //   console.log(value.value)
    // }
  }

  
  onGridReady(e: any) {
    let indicePermiso = []
    this.permisosUser = [ ]
    var myPermisos = this.permisosUsuario
    for(let i =0; i<myPermisos.length; i++){ 
      if(myPermisos[i].activo == true){
        indicePermiso.push([i]);

        this.permisosUser.push(myPermisos[i].id)
        // console.log(this.permisosUser)
      }
    }
  // console.log('📦 dxGrid completamente renderizado', indicePermiso);


  // Aquí puedes ejecutar lógica dependiente del DOM del grid.
 const keys = this.permisosUsuario.filter(item => item.activo == true).map(item => item.activo);
//   this.gridPermisos.instance.selectRows(keys, false);

this.gridPermisos.instance.selectRowsByIndexes(indicePermiso);
}
}


