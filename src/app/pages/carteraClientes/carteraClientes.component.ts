import { Component, OnInit, ViewChild } from '@angular/core';
import { DxSelectBoxComponent, DxFormComponent, DxDataGridComponent} from 'devextreme-angular';

import { Cartera } from '../../shared/models/carteraClientes/cartera';
import { CarteraClientes } from '../..//shared/models/carteraClientes/carteraClientes';
import { Detalle } from '../../shared/models/carteraClientes/detalle';

import { CarteraClientesService } from '../../services/carteraClientes/carteraCliente.service';
import { StorageService } from '../../shared/services/storage.service';
import notify from 'devextreme/ui/notify';

import { Totales, Total } from '../../shared/models/carteraClientes/totales';

import { Workbook } from 'exceljs';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { saveAs} from 'file-saver-es';
import { ActivatedRoute, Router } from '@angular/router';

import deMessages from "devextreme/localization/messages/es.json";
import { locale, loadMessages } from "devextreme/localization";

const totales = new Totales;
const total = new Total;
@Component({
  templateUrl: './carteraClientes.component.html',
  styleUrls: ['./carteraClientes.component.scss'],
})
export class CarteraClientesComponent implements OnInit {

  @ViewChild('selectTracto') selectTracto!: DxSelectBoxComponent;
  @ViewChild(DxFormComponent, { static: false }) form:DxFormComponent;
  
  @ViewChild('gridCartera', { static: false }) gridCartera: DxDataGridComponent;
  @ViewChild('gridSinCart', { static: false }) gridSinCart: DxDataGridComponent;
  @ViewChild('gridInter', { static: false }) gridInter: DxDataGridComponent;
  @ViewChild('gridInerSinCart', { static: false }) gridInerSinCart: DxDataGridComponent;

  @ViewChild('gridCliCartInt', { static: false }) gridCliCartInt: DxDataGridComponent;

  @ViewChild('gridDetalle', { static: false }) gridDetalle: DxDataGridComponent;

  @ViewChild('grid1', { static: false }) grid1: DxDataGridComponent;
  @ViewChild('grid2', { static: false }) grid2: DxDataGridComponent;
  @ViewChild('grid3', { static: false }) grid3: DxDataGridComponent;
  @ViewChild('grid4', { static: false }) grid4: DxDataGridComponent;
  @ViewChild('grid5', { static: false }) grid5: DxDataGridComponent;
  @ViewChild('grid6', { static: false }) grid6: DxDataGridComponent;

  col: string = '50';

  boxCartera: Cartera[] = [
    { id: 0, cartera: 'GST CONSOLIDADO'},
    { id: 1, cartera: "TRANSPORTES BONAMPAK S.A. DE C.V." },
    { id: 2, cartera: "AUTOTRANSPORTE MACUSPANA S.A. DE C.V." },
    { id: 3, cartera: "TRANSPORTADORA ESPECIALIZADA INDUSTRIAL S.A. DE C.V." },
    { id: 4, cartera: "TRANSPORTES DE CARGA GEMINIS S.A. DE C.V." },
    { id: 5, cartera: "GST FLETES Y SERVICIOS S.A. DE C.V." },

  ];

  carteraClientes: CarteraClientes[] = [];
  sinCartera: CarteraClientes[] = [];
  carteraMI: CarteraClientes[] = [];
  carteraInterSinC: CarteraClientes[] = [];
  carteraInfo: any;
  avance1: any[] = [];
  avance2: any[] = [];
  avance3: any[] = [];
  avance4: any[] = [];
  avance5: any[] = [];
  avance6: any[] = [];

  detalle: Detalle[] = [];

  numRowsCarClien: number = 0;
  numRowsSinCart: number = 0;
  numRowsMI: number = 0;
  numRowsIntSinCart: number = 0;

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

  periodoActual: number;

  readonly allowedPageSizes = [5, 10, 20, 50, 100, 'all'];

  loadingVisible = false;


  selectedBoxCartera: number = 0;

  modeSearch: 'true' | 'false' = 'false';

  isVisible = false;

  selectedPeriodo: number = 0;

  modPeriodo: boolean;
  modPassword: boolean;

  buttonOptions: any = {
    text: 'Guardar',
    type: 'success',
    useSubmitBehavior: true,

  };

  buttonActualizacion: any = {
    text: 'Actualizar',
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

  formActualizacion: any = {
    contrasenia: "",

  }

  buttonOptionsCancelar: any
  bolFormSoloLectura = false;
  
  passwordOptions: any = {
    mode: 'password',
    // onValueChanged: () => {
    //   let editor = this.form.instance.getEditor('ConfirmPassword');
    //   if (editor.option('value')) {
    //     let instance = Validator.getInstance(editor.element()) as Validator;
    //     instance.validate();
    //   }
    // },
    buttons: [
      {
        name: 'password',
        location: 'after',
        options: {
          icon: 'assets/ojo.png',
          type: 'default',
          onClick: () => this.changePasswordMode('Contraseña'),
        },
      },
    ],
  };

  changePasswordMode = (name) => {
    let editor = this.form.instance.getEditor(name);
    editor.option(
      'mode',
      editor.option('mode') === 'text' ? 'password' : 'text',
    );
  };

  
  constructor(
    private carteraClientesService: CarteraClientesService,
    private storageService: StorageService,
    private router: Router,
    ) {

      const that = this;

        this.buttonOptionsCancelar= {
          text: 'Cancelar',
          type: 'danger',
          onClick(e: any) {
            that.modPeriodo = false;
          },
        };

        loadMessages(deMessages);
        locale(navigator.language);
      }



  ngOnInit(): void {
    this.getPeriodo();
    this.getUserName();
  }

  ngAfterViewInit(): void {}

  //=================GETS===========================
  getPeriodo(){
    this.carteraClientesService.getPeriodoActual().subscribe(data => {
      this.periodoActual = data.data;
     // console.log(data)
    })
  }

  //=================SELECTS========================
  printValue = "";
  selectBoxCartera(e: any) {
    this.selectedBoxCartera = e.value;
    console.log(this.selectedBoxCartera)
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

  printPeriodo = ""
  printPAvance = "";
  seleccionarPeriodo(e: any) {
    this.selectedPeriodo = e.value

    if(this.selectedPeriodo == 202307){
      this.printPeriodo = "SALDOS DE CARTERA DEL PERIODO JULIO 2023"
      this.printPAvance = "31 DE JUIO DEL 2023"
    }
    if(this.selectedPeriodo  == 202308){
      this.printPeriodo = "SALDOS DE CARTERA DEL PERIODO AGOSTO 2023"
      this.printPAvance = "31 DE AGOSTO DEL 2023"
    }
    if(this.selectedPeriodo == 202309){
      this.printPeriodo = "SALDOS DE CARTERA DEL PERIODO SEPTIEMBRE 2023"
      this.printPAvance = "30 DE SEPTIEMBRE DEL 2023"
    }
    if(this.selectedPeriodo == 202310){
      this.printPeriodo = "SALDOS DE CARTERA DEL PERIODO OCTUBRE 2023"
      this.printPAvance = "31 DE OCTUBRE DEL 2023"
    }
    if(this.selectedPeriodo == 202311){
      this.printPeriodo = "SALDOS DE CARTERA DEL PERIODO NOVIEMBRE 2023"
      this.printPAvance = "30 DE NOVIEMBRE DEL 2023"
    }
    if(this.selectedPeriodo == 202312){
      this.printPeriodo = "SALDOS DE CARTERA DEL PERIODO DICIEMBRE 2023"
      this.printPAvance = "31 DE DICIEMBRE DEL 2023"
    }
    if(this.selectedPeriodo == 202401){
      this.printPeriodo = "SALDOS DE CARTERA DEL PERIODO ENERO 2024"
      this.printPAvance = "31 DE ENERO DEL 2024"
    }
    if(this.selectedPeriodo == 202402){
      this.printPeriodo = "SALDOS DE CARTERA DEL PERIODO FEBRERO 2024"
      this.printPAvance = "29 DE FEBRERO DEL 2024"
    }
    if(this.selectedPeriodo == 202403){
      this.printPeriodo = "SALDOS DE CARTERA DEL PERIODO MARZO 2024"
      this.printPAvance = "31 DE MARZO DEL 2024"
    }
    if(this.selectedPeriodo == 202404){
      this.printPeriodo = "SALDOS DE CARTERA DEL PERIODO ABRIL 2024"
      this.printPAvance = "30 DE ABRIL DEL 2024"
    }
    if(this.selectedPeriodo == 202405){
      this.printPeriodo = "SALDOS DE CARTERA DEL PERIODO MAYO 2024"
      this.printPAvance = "31 DE MAYO DEL 2024"
    }
    if(this.selectedPeriodo == 202406){
      this.printPeriodo = "SALDOS DE CARTERA DEL PERIODO JUNIO 2024"
      this.printPAvance = "30 DE JUNIO DEL 2024"
    }
    if(this.selectedPeriodo == 202407){
      this.printPeriodo = "SALDOS DE CARTERA DEL PERIODO JULIO 2024"
      this.printPAvance = "31 DE JULIO DEL 2024"
    }
    if(this.selectedPeriodo == 202408){
      this.printPeriodo = "SALDOS DE CARTERA DEL PERIODO AGOSTO 2024"
      this.printPAvance = "31 DE AGOSTO DEL 2024"
    }
    if(this.selectedPeriodo == 202409){
      this.printPeriodo = "SALDOS DE CARTERA DEL PERIODO SEPTIEMBRE 2024"
      this.printPAvance = "30 DE SEPTIEMBRE DEL 2024"
    }
    if(this.selectedPeriodo == 202410){
      this.printPeriodo = "SALDOS DE CARTERA DEL PERIODO OCTUBRE 2024"
      this.printPAvance = "31 DE OCTUBRE DEL 2024"
    }
    if(this.selectedPeriodo == 202411){
      this.printPeriodo = "SALDOS DE CARTERA DEL PERIODO NOVIEMBRE 2024"
      this.printPAvance = "30 DE NOVIEMBRE DEL 2024"
    }
    if(this.selectedPeriodo == 202412){
      this.printPeriodo = "SALDOS DE CARTERA DEL PERIODO DICIEMBRE 2024"
      this.printPAvance = "31 DE DICIEMBRE DEL 2024"
    }
    if(this.selectedPeriodo == 202501){
      this.printPeriodo = "SALDOS DE CARTERA DEL PERIODO ENERO 2025"
      this.printPAvance = "31 DE ENERO DEL 2025"
    }
    if(this.selectedPeriodo == 202502){
      this.printPeriodo = "SALDOS DE CARTERA DEL PERIODO FEBRERO 2025"
      this.printPAvance = "28 DE FEBRERO DEL 2025"
    }
    if(this.selectedPeriodo == 202503){
      this.printPeriodo = "SALDOS DE CARTERA DEL PERIODO MARZO 2025"
      this.printPAvance = "31 DE MARZO DEL 2025"
    }
    if(this.selectedPeriodo == 202504){
      this.printPeriodo = "SALDOS DE CARTERA DEL PERIODO ABRIL 2025"
      this.printPAvance = "30 DE ABRIL DEL 2025"
    }
    if(this.selectedPeriodo == 202505){
      this.printPeriodo = "SALDOS DE CARTERA DEL PERIODO MAYO 2025"
      this.printPAvance = "31 DE MAYO DEL 2025"
    }
    if(this.selectedPeriodo == 202506){
      this.printPeriodo = "SALDOS DE CARTERA DEL PERIODO JUNIO 2025"
      this.printPAvance = "30 DE JUNIO DEL 2025"
    }
    if(this.selectedPeriodo == 202507){
      this.printPeriodo = "SALDOS DE CARTERA DEL PERIODO JULIO 2025"
      this.printPAvance = "31 DE JULIO DEL 2025"
    }
    if(this.selectedPeriodo == 202508){
      this.printPeriodo = "SALDOS DE CARTERA DEL PERIODO AGOSTO 2025"
      this.printPAvance = "31 DE AGOSTO DEL 2025"
    }
    if(this.selectedPeriodo == 202509){
      this.printPeriodo = "SALDOS DE CARTERA DEL PERIODO SEPTIEMBRE 2025"
      this.printPAvance = "30 DE SEPTIEMBRE DEL 2025"
    }
    if(this.selectedPeriodo == 202510){
      this.printPeriodo = "SALDOS DE CARTERA DEL PERIODO OCTUBRE 2025"
      this.printPAvance = "31 DE OCTUBRE DEL 2025"
    }
    if(this.selectedPeriodo == 202511){
      this.printPeriodo = "SALDOS DE CARTERA DEL PERIODO NOVIEMBRE 2025"
      this.printPAvance = "30 DE NOVIEMBRE DEL 2025"
    }
    if(this.selectedPeriodo == 202512){
      this.printPeriodo = "SALDOS DE CARTERA DEL PERIODO DICIEMBRE 2025"
      this.printPAvance = "31 DE DICIEMBRE DEL 2025"
    }
    if(this.selectedPeriodo == 202601){
      this.printPeriodo = "SALDOS DE CARTERA DEL PERIODO ENERO 2026"
      this.printPAvance = "31 DE ENERO DEL 2026"
    }
    if(this.selectedPeriodo == 202602){
      this.printPeriodo = "SALDOS DE CARTERA DEL PERIODO FEBRERO 2026"
      this.printPAvance = "28 DE FEBRERO DEL 2026"
    }
    if(this.selectedPeriodo == 202603){
      this.printPeriodo = "SALDOS DE CARTERA DEL PERIODO MARZO 2026"
      this.printPAvance = "31 DE MARZO DEL 2026"
    }

    if(this.selectedPeriodo == 202604){
      this.printPeriodo = "SALDOS DE CARTERA DEL PERIODO ABRIL 2026"
      this.printPAvance = "30 DE ABRIL DEL 2026"
    }

    if(this.selectedPeriodo == 202605){
      this.printPeriodo = "SALDOS DE CARTERA DEL PERIODO MAYO 2026"
      this.printPAvance = "31 DE MAYO DEL 2026"
    }
    if(this.selectedPeriodo == 202606){
      this.printPeriodo = "SALDOS DE CARTERA DEL PERIODO JUNIO 2026"
      this.printPAvance = "30 DE JUNIO DEL 2026"
    }


  }

  clientes3 = [];
  cliente4 = [];
  postCarteraCliente(){
    let myUserLogued = this.storageService.getSession("username")

    var myTipo = 0;
    this.loadingVisible = true;
    this.myTotal = [];
    this.clientes3 = [];
    this.cliente4 = [];
    this.carteraClientesService.postCarteraCliente(this.selectedPeriodo, this.selectedBoxCartera, myTipo, myUserLogued).subscribe(data => {
      
      //console.log(data.data)
      if(data.data != undefined || data.data != null){

        var conCarta = new Intl.NumberFormat().format(data.data.facturasConCarta);
        var sinCarta = new Intl.NumberFormat().format(data.data.facturasSinCarta);
        var total = new Intl.NumberFormat().format(data.data.facturasTotal);

        data.data.facturasConCarta = conCarta;
        data.data.facturasSinCarta = sinCarta;
        data.data.facturasTotal = total;
        
      }

      this.carteraClientes = data.data.carteraMensual;
      this.sinCartera = data.data.sinCartaTerceros;
      this.carteraMI = data.data.carteraMensualIntercompanias;
      this.carteraInterSinC = data.data.sinCartaIntercompanias;


      this.numRowsCarClien = this.carteraClientes?.length;
      this.numRowsSinCart = this.sinCartera?.length;
      this.numRowsMI = this.carteraMI?.length;
      this.numRowsIntSinCart = this.carteraInterSinC?.length;

      var myInter = this.carteraMI;
      for(var i = 0; i<myInter?.length; i ++){
        var myData = new CarteraClientes;

        myData.cliente = myInter[i].cliente;
        this.clientes3.push(myData)
      }

      if(this.clientes3?.length !== 0){
        var hash = {};
        this.clientes3 = this.clientes3.filter(function(current) {
          var exists = !hash[current.cliente];
          hash[current.cliente] = true;
          return exists;
        });
      }

      var myInterSC = this.carteraInterSinC;
      for(var i = 0; i<myInterSC?.length; i ++){
        var myData = new CarteraClientes;

        myData.cliente = myInter[i].cliente;
        this.cliente4.push(myData)
      }

      if(this.cliente4.length !== 0){
        var hash = {};
        this.cliente4 = this.cliente4.filter(function(current) {
          var exists = !hash[current.cliente];
          hash[current.cliente] = true;
          return exists;
        });
      }

      this.carteraInfo = data.data

      this.avance1.push(data.data.avanceCartera1);
      this.avance2.push(data.data.avanceCartera2);
      this.avance3.push(data.data.avanceCartera3);
      this.avance4.push(data.data.avanceCartera4);
      this.avance5.push(data.data.avanceCartera5);
      this.avance6.push(data.data.avanceCartera6);

      this.detalle = data.data.detalleCartera;
      console.log(data.data.detalleCartera)

      this.loadingVisible = false;
    })
  }

  calcularGrid1(value): number{
    return value +++ 9
  }

  calcularGridSinC(value): number{

    var totalGrid1 = this.calcularGrid1(this.numRowsCarClien)

    var totalgrid2 = totalGrid1 + value;
    return totalgrid2 +++ 5

  }
  calcularGrid2(value): number{

    var totalGrid1 = this.calcularGridSinC(this.numRowsSinCart);
    
    var totalgrid2 = totalGrid1 + value;

    var totalAgrup3 = this.clientes3.length

    var totalFin = totalgrid2 +  totalAgrup3;

    return totalFin +++5


    // return totalFin;
  }
  calcularGridIntSinCart(value): number{
    var totalGrid1 = this.calcularGrid2(this.numRowsMI);

    var totalgrid2 = totalGrid1 + value;

    var totalAgrup4 = this.cliente4.length

    var totalFin = totalgrid2  + totalAgrup4;
    console.log(totalFin)
    if(this.selectedBoxCartera == 0){
        if(totalFin <=389){
          var size = 16
        }else{
          var size = 30
        }
        
    }else if(this.selectedBoxCartera == 1){
      var size = 8
    }else if(this.selectedBoxCartera == 3){
      var size = 9
    }else if(this.selectedBoxCartera == 4){
      var size = 7
    }else{
      var size = 5
    }

    return totalFin +++size


    


    // return totalFin;
  }

  username: string
  getUserName(){
    this.username = this.storageService.getSession("username");

    //console.log(this.username)
  }

  guardarCotizacionClick(e) {
    e.preventDefault();

    this.loadingVisible = true;

    this.carteraClientesService.postCierreCartera(this.username, this.formCierre.Contraseña).subscribe(data =>{
      //console.log(data)

      if (data.responseCode === 200) {

        if(data.data == "¡Cierre exitoso!"){
          notify({
            message: data.data,
            position: {
              my: 'center center',
              at: 'center center',
            },
          }, 'success', 3000);
  

          // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          // this.router.onSameUrlNavigation = 'reload';
          // this.router.navigate(['./cartera-clientes'])

          this.modPeriodo = false;
          this.bolFormSoloLectura = false;
          this.loadingVisible = false;
          
        }else if(data.data == "¡Usuario inválido o contraseña incorrecta!"){
          notify({
            message: data.data,
            position: {
              my: 'center center',
              at: 'center center',
            },
          }, 'warning', 3000);

          this.loadingVisible = false;
        }
        
        
      } else {
        notify({
          message: "No se puedo completar el cierre",
          position: {
            my: 'center center',
            at: 'center center',
          },
        }, 'error', 3000);

        this.loadingVisible = false;
      }
    })
   
  }

  ActualizarCartera(e) {
    e.preventDefault();

    this.loadingVisible = true;

    // this.carteraClientesService.postCierreCartera(this.username, this.formCierre.Contraseña).subscribe(data =>{
    //   ////console.log(data)

    //   if (data.responseCode === 200) {

    //     if(data.data == "¡Cierre exitoso!"){
    //       notify({
    //         message: data.data,
    //         position: {
    //           my: 'center center',
    //           at: 'center center',
    //         },
    //       }, 'success', 3000);
  

    //       // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    //       // this.router.onSameUrlNavigation = 'reload';
    //       // this.router.navigate(['./cartera-clientes'])

    //       this.modPeriodo = false;
    //       this.bolFormSoloLectura = false;
    //       this.loadingVisible = false;
          
    //     }else if(data.data == "¡Usuario inválido o contraseña incorrecta!"){
    //       notify({
    //         message: data.data,
    //         position: {
    //           my: 'center center',
    //           at: 'center center',
    //         },
    //       }, 'warning', 3000);

    //       this.loadingVisible = false;
    //     }
        
        
    //   } else {
    //     notify({
    //       message: "No se puedo completar el cierre",
    //       position: {
    //         my: 'center center',
    //         at: 'center center',
    //       },
    //     }, 'error', 3000);

    //     this.loadingVisible = false;
    //   }
    // })
   
  }

  Actualizar(){
    //Testeando para contraseña Primera opcion
      //this.modPassword = true; 
    //===================Testeando por usuario segunda opcion============================
  
    let myUserLogued = this.storageService.getSession("username")
    


    if(myUserLogued == "MARCOS" || myUserLogued == "alejandra.vazquezc"){

      this.avance1 = [];
      this.avance2 = [];
      this.avance3 = [];
      this.avance4 = [];
      this.avance5 = [];
      this.avance6 = [];
      this.myTotal = [];
      
      var myTipo = 1;

      this.loadingVisible = true;


      this.carteraClientesService.postActualizacionCartera(this.selectedPeriodo, this.selectedBoxCartera, myTipo, myUserLogued).subscribe(data =>{
            ////console.log(data)

            if (data.responseCode === 200) {

                    if(data.data != undefined || data.data != null){

                      var conCarta = new Intl.NumberFormat().format(data.data.facturasConCarta);
                      var sinCarta = new Intl.NumberFormat().format(data.data.facturasSinCarta);
                      var total = new Intl.NumberFormat().format(data.data.facturasTotal);

                      data.data.facturasConCarta = conCarta;
                      data.data.facturasSinCarta = sinCarta;
                      data.data.facturasTotal = total;
                      
                    }

                  ////console.log(data.data)

                    this.carteraClientes = data.data.carteraMensual;
                    this.carteraClientes.sort((a, b) => (a.cliente < b.cliente ? -1 : 1));
                    this.sinCartera = data.data.sinCartaTerceros;
                    this.carteraMI = data.data.carteraMensualIntercompanias;
                    this.carteraInterSinC = data.data.sinCartaIntercompanias;

                    this.carteraInfo = data.data

                    this.avance1.push(data.data.avanceCartera1);
                    this.avance2.push(data.data.avanceCartera2);
                    this.avance3.push(data.data.avanceCartera3);
                    this.avance4.push(data.data.avanceCartera4);
                    this.avance5.push(data.data.avanceCartera5);
                    this.avance6.push(data.data.avanceCartera6);

                    this.detalle = data.data.detalleCartera;

                    notify({
                      message: "Actualizacion Exitosa",
                      position: {
                        my: 'center center',
                        at: 'center center',
                      },
                    }, 'success', 3000);

                this.loadingVisible = false;
        
          }
      })
    }else{

      notify({
        message: "No esta autorizado para actualizar",
        position: {
          my: 'center center',
          at: 'center center',
        },
      }, 'error', 3000);

      this.loadingVisible = false;
    
    }

    // this.avance1 = [];
    // this.avance2 = [];
    // this.avance3 = [];
    // this.avance4 = [];
    // this.avance5 = [];
    // this.avance6 = [];
    // var myTipo = 1
    // this.loadingVisible = true;
    // this.myTotal = [];
    // this.carteraClientesService.postCarteraCliente(this.selectedPeriodo, this.selectedBoxCartera, myTipo).subscribe(data => {
      

    //   if(data.data != undefined || data.data != null){

    //     var conCarta = new Intl.NumberFormat().format(data.data.facturasConCarta);
    //     var sinCarta = new Intl.NumberFormat().format(data.data.facturasSinCarta);
    //     var total = new Intl.NumberFormat().format(data.data.facturasTotal);

    //     data.data.facturasConCarta = conCarta;
    //     data.data.facturasSinCarta = sinCarta;
    //     data.data.facturasTotal = total;
        
    //   }

    //  ////console.log(data.data)

    //   this.carteraClientes = data.data.carteraMensual;
    //   this.carteraClientes.sort((a, b) => (a.cliente < b.cliente ? -1 : 1));
    //   this.sinCartera = data.data.sinCartaTerceros;
    //   this.carteraMI = data.data.carteraMensualIntercompanias;
    //   this.carteraInterSinC = data.data.sinCartaIntercompanias;

    //   this.carteraInfo = data.data

    //   this.avance1.push(data.data.avanceCartera1);
    //   this.avance2.push(data.data.avanceCartera2);
    //   this.avance3.push(data.data.avanceCartera3);
    //   this.avance4.push(data.data.avanceCartera4);
    //   this.avance5.push(data.data.avanceCartera5);
    //   this.avance6.push(data.data.avanceCartera6);

    //   this.detalle = data.data.detalleCartera;

    //   this.loadingVisible = false;
    // })
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

      this.avance1 = [];
      this.avance2 = [];
      this.avance3 = [];
      this.avance4 = [];
      this.avance5 = [];
      this.avance6 = [];

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
/*===============================================GRID 1 CARTERA CLIENTE==================================================*/
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

    if(e.rowType == 'totalFooter'){
      ////console.log(e.summaryCells)
      if(e.summaryCells[1].length !== 0){
      totales.sinCarta =  e.summaryCells[1][0].value
      }
      if(e.summaryCells[2].length !== 0){
      totales.corriente =  e.summaryCells[2][0].value
      }
      if(e.summaryCells[3].length !== 0){
      totales.unoA30 = e.summaryCells[3][0].value
      }
      if(e.summaryCells[4].length !== 0){
      totales.tre1A60 = e.summaryCells[4][0].value
      }
      if(e.summaryCells[5].length !== 0){
      totales.ses0A90 = e.summaryCells[5][0].value
      }
      if(e.summaryCells[6].length !== 0){
      totales.mas90 = e.summaryCells[6][0].value
      }
      if(e.summaryCells[7].length !== 0){
      totales.total = e.summaryCells[7][0].value
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
/*===============================================GRID 2 SIN CARTERA=======================================================*/
  onRowPreparedSinC(e: any){
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

  onCellPreparedSinC(e: any){
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
/*===============================================GRID 3 CARTERA INTERCOMPANIAS============================================*/
  myTotal: any[] = [];
  onRowPreparedCMI(e: any){
    
    if (e.rowType == 'group') {
      ////console.log(e.key)
      if (e.groupIndex == 0) {
        e.rowElement.style.backgroundColor = 'black';
        e.rowElement.style.color = "black";
        e.rowElement.style.fontWeight = "bolder";
      }
    }


    if(e.rowType == 'totalFooter'){
      if(e.summaryCells[2].length !== 0){
        total.sinCarta = totales.sinCarta + e.summaryCells[2][0].value
      }
      if(e.summaryCells[3].length !== 0){
        total.corriente = totales.corriente + e.summaryCells[3][0].value
      }
      if(e.summaryCells[4].length !== 0){
        total.unoA30 = totales.unoA30 + e.summaryCells[4][0].value
      }
      if(e.summaryCells[5].length !== 0){
        total.tre1A60 = totales.tre1A60 + e.summaryCells[5][0].value
      }
      if(e.summaryCells[6].length !== 0){
        total.ses0A90 = totales.ses0A90 + e.summaryCells[6][0].value
      }
      if(e.summaryCells[7].length !== 0){
        total.mas90 = totales.mas90 + e.summaryCells[7][0].value
      }
      if(e.summaryCells[8].length !== 0){
        total.total = totales.total + e.summaryCells[8][0].value
      }

      if(total.corriente !==undefined){
        var myTotales = new Total;

        myTotales.intercompania = "SUMA TOTAL CARTERA"
        myTotales.sinCarta = total.sinCarta;
        myTotales.corriente = total.corriente;
        myTotales.unoA30 = total.unoA30;
        myTotales.tre1A60 = total.tre1A60;
        myTotales.ses0A90 = total.ses0A90;
        myTotales.mas90 = total.mas90;
        myTotales.total = total.total;
        
        this.myTotal.push(myTotales);
        ////console.log(this.myTotal)
      }

      if(this.myTotal.length !== 0){
        this.myTotal.sort((a, b) => (a.corriente > b.corriente ? -1 : 1));
      }
    }
  }

  onCellPreparedCMI(e: any){
    if (e.rowType == 'group'){

      e.cellElement.style.fontSize = '12px';
      e.cellElement.style.background = "#DCDCDC";
    }

    if (e.rowType == 'totalFooter') {
      e.totalItem.cells.forEach((c: any) => {
        if (c.cellElement) {
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.fontSize = "15px";
            c.cellElement.style.background = "#ff9460";
            c.cellElement.style.color = "black"; 
        }   
      });
    }
  }
/*================================================GRID 4 SIN CARTERA INTERCOMPAÑIAS=======================================*/
  onRowPreparedISC(e: any){
    if (e.rowType == 'group') {
      if (e.groupIndex == 0) {
        e.rowElement.style.backgroundColor = 'black';
        e.rowElement.style.color = "black";
        e.rowElement.style.fontWeight = "bolder";
      }
    }
  }

  onCellPreparedISC(e: any){
    if (e.rowType == 'group'){

      e.cellElement.style.fontSize = '12px';
      e.cellElement.style.background = "#DCDCDC";
    }

    if (e.rowType == 'totalFooter') {
      e.totalItem.cells.forEach((c: any) => {
        if (c.cellElement) {
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.fontSize = "15px";
            c.cellElement.style.background = "#ff9460";
            c.cellElement.style.color = "black"; 
        }   
      });
    }
  }
/*================================================GRID 5 TOTAL CARTERA CIENTE Y CARTERA INTER==============================*/
  onRowPreparedCCI(e: any){
    if(e.rowType === 'data'){
      e.cells.forEach((c: any) => {

        if (c.cellElement) {
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.fontSize = "15px";
            c.cellElement.style.background = "#FF9460";
        }
      });
    }
  }
  onCellPreparedCCI(e: any){

  }

  onRowPreparedA(e: any){
    if (e.rowType == 'data') {

      e.cells.forEach((c: any) => {
  
        if (c.value && c.value.toString().startsWith('-')) {
          c.cellElement.style.color = "red";
        }
  
        if (c.cellElement) {
          if(c.columnIndex == 1){
            // c.cellElement.style.fontWeight = "bolder";
            // c.cellElement.style.fontSize = "15px";
            c.cellElement.style.background = "#b5e6b5";
          }
          if(c.columnIndex == 3){
            // c.cellElement.style.fontWeight = "bolder";
            // c.cellElement.style.fontSize = "15px";
            c.cellElement.style.background = "#b5e6b5";
          }
          if(c.columnIndex == 4){
            // c.cellElement.style.fontWeight = "bolder";
            // c.cellElement.style.fontSize = "15px";
            c.cellElement.style.background = "#b5e6b5";
          }
        }
      });
    }
    ////console.log(e)
  }

  onCellPreparedA(e: any){
    ////console.log(e)
    
  }

  onRowPreparedAT(e: any){
    if (e.rowType == 'data') {

      e.cells.forEach((c: any) => {
  
        if (c.cellElement) {
          if(c.columnIndex == 3){
            // c.cellElement.style.fontWeight = "bolder";
            // c.cellElement.style.fontSize = "15px";
            c.cellElement.style.background = "#b5e6b5";
          }
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

  exportGrids(e) {
    const context = this;
    const workbook = new Workbook();

    const carteraSheet = workbook.addWorksheet('CARTERA DE CLIENTES');

    var totalGrid2 = this.calcularGridIntSinCart(this.numRowsIntSinCart);

    function setAlternatingRowsBackground(gridCell, excelCell) {

      if (gridCell.rowType === 'data') {
      if(gridCell.column.caption == "Total"){
          excelCell.fill = {
            type: 'pattern', pattern: 'solid', fgColor: { argb: 'D3D3D3' }, bgColor: { argb: 'D3D3D3' },
          };
        }
      }

      if (gridCell.rowType === 'header') {

          excelCell.fill = {
            type: 'pattern', pattern: 'solid', fgColor: { argb: 'D3D3D3' }, bgColor: { argb: 'D3D3D3' },
        }
      }
  
  
      if (gridCell.rowType === 'totalFooter') {
        if(gridCell.column.caption !== "Nombre de cliente" && gridCell.column.caption !== "Intercompañia"){
  
          var currency = excelCell._value.model.value;
          var number = Number(currency.replace(/[^0-9.-]+/g,""));
          
          excelCell._value.model.value = number;
          
       }


          excelCell.fill = {
            type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF9460' }, bgColor: { argb: 'FF9460' },
          };
      }

      if (gridCell.rowType === 'group') {
        ////console.log(gridCell)
          excelCell.fill = {
            type: 'pattern', pattern: 'solid', fgColor: { argb: 'D3D3D3' }, bgColor: { argb: 'D3D3D3' },
        }
      }
    }

    function setAlternatingRowsBackground3(gridCell, excelCell) {
      if (gridCell.rowType === 'data') {

        var totalFin = totalGrid2 +1;
        var myPosition = 'B'+totalFin.toString();
  
          excelCell.fill = {
            type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF9460', }, bgColor: { argb: 'FF9460' }, bold: true
          };
        
      }

      if (gridCell.rowType === 'header') {

        excelCell.fill = {
          type: 'pattern', pattern: 'solid', fgColor: { argb: 'D3D3D3' }, bgColor: { argb: 'D3D3D3' },
      }
    }
    }

    carteraSheet.columns = [
      { width: 10 }, { width: 35 }, { width: 18 }, { width: 18 }, { width: 18 }, { width: 18 }, { width: 18 },{ width: 18 }
    ];

    carteraSheet.views = [{state: 'normal'}];

    exportDataGrid({
      worksheet: carteraSheet,
      component: context.gridCartera.instance,
      keepColumnWidths: false,
      topLeftCell: { row: 4, column: 2 },
      customizeCell: ({ gridCell, excelCell }) => {
        setAlternatingRowsBackground(gridCell, excelCell);
      },
    }).then(() => exportDataGrid({
      worksheet: carteraSheet,
      component: context.gridSinCart.instance,
      keepColumnWidths: false,
      topLeftCell: { row: this.calcularGrid1(this.numRowsCarClien), column: 2 },
      customizeCell: ({ gridCell, excelCell }) => {
        setAlternatingRowsBackground(gridCell, excelCell);
      },
    })).then(() => exportDataGrid({
      worksheet: carteraSheet,
      component: context.gridInter.instance,
      keepColumnWidths: false,
      topLeftCell: { row: this.calcularGridSinC(this.numRowsSinCart), column: 2 },
      customizeCell: ({ gridCell, excelCell }) => {
        setAlternatingRowsBackground(gridCell, excelCell);
      },
    })).then(() => exportDataGrid({
      worksheet: carteraSheet,
      component: context.gridInerSinCart.instance,
      keepColumnWidths: false,
      topLeftCell: { row: this.calcularGrid2(this.numRowsMI), column: 2 },
      customizeCell: ({ gridCell, excelCell }) => {
        setAlternatingRowsBackground(gridCell, excelCell);
      },
    })).then(() => exportDataGrid({
      worksheet: carteraSheet,
      component: context.gridCliCartInt.instance,
      keepColumnWidths: false,
      topLeftCell: { row: this.calcularGridIntSinCart(this.numRowsIntSinCart), column: 2 },
      customizeCell: ({ gridCell, excelCell }) => {
        setAlternatingRowsBackground3(gridCell, excelCell);
      },
    })).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Cartera Cliente.xlsx');
      });
    });
  }

  exportGridsAva(e) {
    const context = this;
    const workbook = new Workbook();


    const carteraAvance = workbook.addWorksheet('% DE AVANCE');

    carteraAvance.getRow(2).getCell(2).value = '% DE AVANCE';
    carteraAvance.getRow(2).getCell(2).font = { bold: true, size: 16, underline: 'double' };

    carteraAvance.getRow(4).getCell(4).value = 'GST FLETES Y SERVICIOS, S.A. DE C.V.';
    carteraAvance.getRow(4).getCell(4).font = { bold: true, size: 16,};

    carteraAvance.getRow(5).getCell(4).value = this.printPAvance;
    carteraAvance.getRow(5).getCell(4).font = { bold: true, size: 16};

    function setAlterRowsBackAvance(gridCell, excelCell){
      ////console.log(gridCell)
      if (gridCell.rowType === 'data') {

        if(excelCell.address !== 'B8' && excelCell.address !== 'B11'){
          var x = Math.round(excelCell.value)
          var myvalue = Math.trunc(x);
      
          var myFormat = myvalue.toString().split(".");
          myFormat[0] = myFormat[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

          excelCell.value = '$ '+myFormat;

          if(gridCell.column.dataField == "sinCartera1a30"){
            excelCell.fill = {
              type: 'pattern', pattern: 'solid', fgColor: { argb: 'b5e6b5' }, bgColor: { argb: 'b5e6b5' },
            };
          }

          if(gridCell.column.dataField == "corriente"){
            excelCell.fill = {
              type: 'pattern', pattern: 'solid', fgColor: { argb: 'b5e6b5' }, bgColor: { argb: 'b5e6b5' },
            };
          }

          if(gridCell.column.dataField == "de1a30"){
            excelCell.fill = {
              type: 'pattern', pattern: 'solid', fgColor: { argb: 'b5e6b5' }, bgColor: { argb: 'b5e6b5' },
            };
          }
        }

      }

      if (gridCell.rowType === 'header') {
        excelCell.fill = {
          type: 'pattern', pattern: 'solid', fgColor: { argb: 'D3D3D3' }, bgColor: { argb: 'D3D3D3' },
        };
      }
    }

    function setAlterRowsBackAvance2(gridCell, excelCell){
      ////console.log(gridCell)
      if (gridCell.rowType === 'data') {

          if(gridCell.column.dataField == "sinCartera1a30"){
            excelCell.fill = {
              type: 'pattern', pattern: 'solid', fgColor: { argb: 'b5e6b5' }, bgColor: { argb: 'b5e6b5' },
            };
          }

          if(gridCell.column.dataField == "corriente"){
            excelCell.fill = {
              type: 'pattern', pattern: 'solid', fgColor: { argb: 'b5e6b5' }, bgColor: { argb: 'b5e6b5' },
            };
          }

          if(gridCell.column.dataField == "de1a30"){
            excelCell.fill = {
              type: 'pattern', pattern: 'solid', fgColor: { argb: 'b5e6b5' }, bgColor: { argb: 'b5e6b5' },
            };
          }
        

      }
    }

    carteraAvance.columns = [
      { width: 10 }, { width: 25 }, { width: 18 }, { width: 18 }, { width: 18 }, { width: 18 }, { width: 18 },{ width: 18 }
    ];

    exportDataGrid({
      worksheet: carteraAvance,
      component: context.grid1.instance,
      topLeftCell: { row: 7, column: 2 },
      customizeCell: ({ gridCell, excelCell }) => {
        setAlterRowsBackAvance(gridCell, excelCell);
      },
    }).then(() => exportDataGrid({
      worksheet: carteraAvance,
      component: context.grid2.instance,
      topLeftCell: { row: 9, column: 2 },
      customizeCell: ({ gridCell, excelCell }) => {
        setAlterRowsBackAvance2(gridCell, excelCell);
      },
    })).then(() => exportDataGrid({
      worksheet: carteraAvance,
      component: context.grid3.instance,
      topLeftCell: { row: 10, column: 2 },
      customizeCell: ({ gridCell, excelCell }) => {
        setAlterRowsBackAvance2(gridCell, excelCell);
      },
    })).then(() => exportDataGrid({
      worksheet: carteraAvance,
      component: context.grid4.instance,
      topLeftCell: { row: 11, column: 2 },
      customizeCell: ({ gridCell, excelCell }) => {
        setAlterRowsBackAvance(gridCell, excelCell);
      },
    })).then(() => exportDataGrid({
      worksheet: carteraAvance,
      component: context.grid5.instance,
      topLeftCell: { row: 12, column: 2 },
      customizeCell: ({ gridCell, excelCell }) => {
        setAlterRowsBackAvance2(gridCell, excelCell);
      },
    })).then(() => exportDataGrid({
      worksheet: carteraAvance,
      component: context.grid6.instance,
      topLeftCell: { row: 13, column: 2 },
      customizeCell: ({ gridCell, excelCell }) => {
        setAlterRowsBackAvance2(gridCell, excelCell);
      },
    })).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Cartera Cliente.xlsx');
      });
    });

    /**
     *
     */
  }

  exportGridsDetll(e) {
    const context = this;
    const workbook = new Workbook();


    const carteraDetalle = workbook.addWorksheet('DETALLE');

    function setAlterRowsBackDetalle(gridCell, excelCell){
      ////console.log(gridCell)
      if (gridCell.rowType === 'data') {


      }

      if (gridCell.rowType === 'header') {
        excelCell.fill = {
          type: 'pattern', pattern: 'solid', fgColor: { argb: 'D3D3D3' }, bgColor: { argb: 'D3D3D3' },
        };
      }

      if (gridCell.rowType === 'groupFooter') {

        if(gridCell.column.caption === "TOTAL INTEGRADO"){
          
          // var monto = excelCell._value.model.value;
          // var montoFormat = monto.replace(/[$.]/g,'');
          // //console.log(montoFormat)

          var currency = excelCell._value.model.value;
          var number = Number(currency.replace(/[^0-9.-]+/g,""));

          excelCell._value.model.value = number;
          
        }
        
        ////console.log(gridCell)
          excelCell.fill = {
            type: 'pattern', pattern: 'solid', fgColor: { argb: 'D3D3D3' }, bgColor: { argb: 'D3D3D3' },
        }
      }


      if (gridCell.rowType === 'totalFooter') {
        if(gridCell.column.caption === "TOTAL INTEGRADO"){
          // //console.log(excelCell._value.model.value)
          // var monto = excelCell._value.model.value;
          // var montoFormat = monto.replace(/[$.]/g,'');
          // //console.log(montoFormat)
          
          var currency = excelCell._value.model.value;
          var number = Number(currency.replace(/[^0-9.-]+/g,""));

          excelCell._value.model.value = number;
          
        }
        
        excelCell.fill = {
          type: 'pattern', pattern: 'solid', fgColor: { argb: 'FF9460' }, bgColor: { argb: 'FF9460' },
        };
      }

     

    }

  
    // carteraDetalle.columns = [
    //   { width: 10 }, { width: 25 }, { width: 18 }, { width: 18 }, { width: 18 }, { width: 18 }, { width: 18 },{ width: 18 }
    // ];

    exportDataGrid({
      worksheet: carteraDetalle,
      component: context.gridDetalle.instance,
      topLeftCell: { row: 2, column: 2 },
      customizeCell: ({ gridCell, excelCell }) => {
        setAlterRowsBackDetalle(gridCell, excelCell);
      },
    }).then(() => {
      workbook.xlsx.writeBuffer().then((buffer) => {
        saveAs(new Blob([buffer], { type: 'application/octet-stream' }), 'Detalle.xlsx');
      });
    });

    /**
     *
     */
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
    
    return myFormat.join("");
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

  customizeTotal(data){
    data = "Suma total de cartera"
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

  tabAvance(value){
    value.event.isTrusted = true;
  }
}


