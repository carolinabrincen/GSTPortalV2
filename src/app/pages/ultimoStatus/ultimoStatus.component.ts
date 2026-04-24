import { ReportsPDFService } from './../../shared/reports/reports-pdf.service';
import { CotizadorService } from './../../services/cotizador/cotizador.service';
import { Component, OnInit } from '@angular/core';

import { RentContService } from 'src/app/services/rentabilidad-contable/rent-cont.service';
import { RentGerService } from 'src/app/services/rentabilidad-gerencial/rent-ger.service';
import { IUser } from 'src/app/shared/services';

import { UltimoStatusService } from 'src/app/services/ultimoStatus/ultimoStatus.service';
import { NgZone } from '@angular/core';
import { UltimoStausModel, NewResOp } from 'src/app/shared/models/ultimoStatus/ultimoStatus';

import * as L from 'leaflet';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-ultimoStatus',
  templateUrl: './ultimoStatus.component.html',
  styleUrls: ['./ultimoStatus.component.scss']
})
export class UltimoStatusComponent implements OnInit {

  private _user: IUser | null = null;
   private map;

  intervalId: any;
  viajesCargados: any[] = [];
  viajesVacios: any[] = [];
  enEsperaViaje: any[] = [];
  sinViajes: any[] = [];
  tractoPatio : any[] = [];
  tractoTaller : any[] = [];
  tractoSiniestro : any[] = [];
  resumenOperaciones : any[] = [];
  detalleVC: any[] = [];
  detalleVV: any[] = [];
  detalleSV: any[] = [];
  
  disponible: any;
  noDisponible: any;

  cardsUS: UltimoStausModel[] = []

  readonly allowedPageSizes = [5, 10, 20, 50];

  bolFormSoloLectura = false;

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

  operacion: any[] = [
    {id: 0, operacion: 'TODOS'},
    {id: 4, operacion: 'CAJA SECA'},
    {id: 9, operacion: 'ENCORTINADO'},
    {id: 10, operacion: 'GONDOLA'},
    {id: 8, operacion: 'GRADO ALIMENT'},
    {id: 11, operacion: 'TOLVA GRANEL'},
  ];

  selectedUdn: number = 0;
  selectedOperacion: number = 0;
  loadingVisible = false;

  modViajeC: boolean = false;
  modViajeV: boolean = false;
  modSinV: boolean = false;
  modMapa: boolean = false;

  tiempoTotal: string= ""

  totalViajes: number = 0;
  totalCargados: number = 0;
  totalVacios: number = 0;
  totalEnEsperaViaje: number = 0;
  totalSinViaje: number = 0;
  totalPatio : number = 0;
  totalTaller : number = 0;
  totalSiniesto : number = 0;

  markerGroup: any;

  myudnV = 0;
  myudnVV = 0;
  myudnSV = 0;

  myColor = "#000000ff"

  getVC: any = {
    ciclo: "",
    clasificacion: "",
    cliente: "",
    despacho: "",
    destinatario: "",
    f_ini_status: "",
    finViaje: "",
    idArea: 0,
    id_usuario: "",
    nombre_status_viaje: "",
    noviaje: 0,
    operacion: "",
    operador: "",
    periodo: 0,
    remitente: "",
    ruta: "",
    tiempo: "",
    tipoViaje: "",
    tracto: "",
    udN: "",
  };

  getVV: any = {
    ciclo: "",
    clasificacion: "",
    cliente: "",
    despacho: "",
    destinatario: "",
    f_ini_status: "",
    finViaje: "",
    idArea: 0,
    id_usuario: "",
    nombre_status_viaje: "",
    noviaje: 0,
    operacion: "",
    operador: "",
    periodo: 0,
    remitente: "",
    ruta: "",
    tiempo: "",
    tipoViaje: "",
    tracto: "",
    udN: "",
  };

  getEV: any = {
    ciclo: "",
    clasificacion: "",
    cliente: "",
    despacho: "",
    destinatario: "",
    f_ini_status: "",
    finViaje: "",
    idArea: 0,
    id_usuario: "",
    nombre_status_viaje: "",
    noviaje: 0,
    operacion: "",
    operador: "",
    periodo: 0,
    remitente: "",
    ruta: "",
    tiempo: "",
    tipoViaje: "",
    tracto: "",
    udN: "",
  };

  getSV: any = {
    ciclo: "",
    clasificacion: "",
    cliente: "",
    despacho: "",
    destinatario: "",
    f_ini_status: "",
    finViaje: "",
    idArea: 0,
    id_usuario: "",
    nombre_status_viaje: "",
    noviaje: 0,
    operacion: "",
    operador: "",
    periodo: 0,
    remitente: "",
    ruta: "",
    tiempo: "",
    tipoViaje: "",
    tracto: "",
    udN: "",
  };

  getPatio: any = {
    ciclo: "",
    clasificacion: "",
    cliente: "",
    despacho: "",
    destinatario: "",
    f_ini_status: "",
    finViaje: "",
    idArea: 0,
    id_usuario: "",
    nombre_status_viaje: "",
    noviaje: 0,
    operacion: "",
    operador: "",
    periodo: 0,
    remitente: "",
    ruta: "",
    tiempo: "",
    tipoViaje: "",
    tracto: "",
    udN: "",
  };

   getTaller: any = {
    ciclo: "",
    clasificacion: "",
    cliente: "",
    despacho: "",
    destinatario: "",
    f_ini_status: "",
    finViaje: "",
    idArea: 0,
    id_usuario: "",
    nombre_status_viaje: "",
    noviaje: 0,
    operacion: "",
    operador: "",
    periodo: 0,
    remitente: "",
    ruta: "",
    tiempo: "",
    tipoViaje: "",
    tracto: "",
    udN: "",
  };

   getSiniestro: any = {
    ciclo: "",
    clasificacion: "",
    cliente: "",
    despacho: "",
    destinatario: "",
    f_ini_status: "",
    finViaje: "",
    idArea: 0,
    id_usuario: "",
    nombre_status_viaje: "",
    noviaje: 0,
    operacion: "",
    operador: "",
    periodo: 0,
    remitente: "",
    ruta: "",
    tiempo: "",
    tipoViaje: "",
    tracto: "",
    udN: "",
  };


  constructor(
    private cotizadorService: CotizadorService,
    private renContService: RentContService,
    private renGerService: RentGerService,
    private pdfReport: ReportsPDFService,
    private ultimoStService: UltimoStatusService,
    private ngZone: NgZone
  ) {
    const that = this;
    
  

  }

  ngOnInit(): void {
    
  }

  ngAfterViewInit(): void {
    this.initMap();
  }

  private initMap(): void {

  this.map = L.map('map', {
    center: [ 24.4545022,-100.9452497],
    zoom: 5,
    minZoom: 5,
    //maxZoom :14,
    
  });

  const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', 
  {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  });

  tiles.addTo(this.map);
  // this.map.pm.addControls({
  //   position: 'topleft',
  //   drawCircle: false,
  //   drawCircleMarker: false,
  //   drawRectangle: false,
  //   drawPolyline: false,
  //   drawMarker: false,
  //   dragend: false,
  //   edit: {
  //     featureGroup: drawnItems
  //   },
  
  // });

  var drawnItems = new L.FeatureGroup();
  this.map.addLayer(drawnItems);

  // get json
  var json = drawnItems.toGeoJSON();

  //alert("print test json"+json);
  this.map.on("pm:create", e => {
    
    //console.log(e.shape);
    //console.log(e);
    this.map.addLayer(e.layer);
    
    
  });


// this.map.on('pm:drawstart', ({ workingLayer }) => {
//   workingLayer.on('pm:vertexadded', e => {
//   this.polygono = e.workingLayer._latlngs;
//   this._storage.setLocal("key_poligono", this.polygono);
//   this.mypolygono = JSON.stringify(this._storage.getLocal("key_poligono"));
//   //console.log("this my print poligon"+this.mypolygono);

//   return this.mypolygono;
// });
// });

}


  // //#region :::: GETTERS ::::
  getUltmoSta() {

    this.ultimoStService.getUltimoSt(this.selectedUdn, this.selectedOperacion).subscribe(res => {
      var myResumenO = res?.data?.resumenOperacion;
      let sumaCol = 0;
      let totalOp = 0;
      let newResumen = [];

    //  console.log(res.data)
      this.viajesCargados = res?.data?.enViajeCargado.sort((a, b) => (a.f_ini_status < b.f_ini_status ? -1 : 1));
      this.viajesVacios = res?.data?.enViajeVacio.sort((a, b) => (a.f_ini_status < b.f_ini_status ? -1 : 1));
      this.enEsperaViaje = res?.data?.esperaViaje.sort((a, b) => (a.f_ini_status < b.f_ini_status ? -1 : 1));
      this.sinViajes = res?.data?.sinViaje.sort((a, b) => (a.f_ini_status < b.f_ini_status ? -1 : 1));
      this.tractoPatio = res?.data?.enPatio.sort((a, b) => (a.f_ini_status < b.f_ini_status ? -1 : 1));
      this.tractoTaller = res?.data?.taller.sort((a, b) => (a.f_ini_status < b.f_ini_status ? -1 : 1));
      this.tractoSiniestro = res?.data?.siniestrado.sort((a, b) => (a.f_ini_status < b.f_ini_status ? -1 : 1));


      myResumenO.forEach((data: any) => {

        sumaCol = data.vc + data.vv + data.sv + data.ev;
        totalOp = data.vc / sumaCol; 


        var myNewResO = new NewResOp;
        
        myNewResO.operacion = data.operacion;
        myNewResO.patio = data.patio;
        myNewResO.siniestro = data.siniestro;
        myNewResO.sv = data.sv;
        myNewResO.taller = data.taller;
        myNewResO.total = data.total;
        myNewResO.vc = data.vc;
        myNewResO.ev = data.ev;
        myNewResO.vv = data.vv
        myNewResO.totalSuma = sumaCol;
        myNewResO.porcentaje = totalOp;
        
        newResumen.push(myNewResO);
        
      })   
      
      this.resumenOperaciones = newResumen.sort((a, b) => (a.operacion < b.operacion ? -1 : 1));
      //console.log(this.resumenOperaciones)


      if(res.data !== undefined){
        this.totalViajes = this.viajesCargados?.length + this.viajesVacios?.length+ this.enEsperaViaje.length + this.sinViajes?.length + this.tractoPatio?.length +this.tractoTaller?.length + this.tractoSiniestro?.length;

        this.totalCargados = this.viajesCargados?.length;
        this.totalVacios = this.viajesVacios?.length;
        this.totalEnEsperaViaje = this.enEsperaViaje?.length;
        this.totalSinViaje = this.sinViajes?.length;
        this.totalPatio = this.tractoPatio?.length;
        this.totalTaller = this.tractoTaller?.length;
        this.totalSiniesto = this.tractoSiniestro?.length;

        let sumaTotal = this.viajesCargados.length + this.viajesVacios.length +this.enEsperaViaje.length+ this.sinViajes.length;
        let totalOperacion = this.viajesCargados.length / sumaTotal;


        let sumaND = this.tractoPatio.length + this.tractoTaller.length + this.tractoSiniestro.length;
        this.disponible = 'Disponible: '+sumaTotal;
        this.noDisponible = 'No Disponible: '+sumaND;

        if(totalOperacion > 0.95){
          this.myColor = "#03af4b"
        }else if(totalOperacion > 0.90 && totalOperacion < 0.95){
          this.myColor = "#ffd966"
        } else if(totalOperacion < 0.90){
          this.myColor = "#dd0f0f"
        }

        if(this.totalViajes !== 0){
          this.cardsUS = [
            {tipo: 'Total', total: this.totalViajes, color: '#bdd7ee'},
            {tipo: 'Cargados', total: this.totalCargados , color: this.myColor},
            {tipo: 'Vacios', total: this.totalVacios , color: '#f8cbad'},
            {tipo: 'Programado', total: this.totalEnEsperaViaje , color: '#d9d9d9'},
            {tipo: 'Sin Viajes', total: this.totalSinViaje , color: '#d9d9d9'},
            {tipo: 'En Patio', total: this.totalPatio , color: '#d9d9d9'},
            {tipo: 'Taller', total: this.totalTaller , color: '#d9d9d9'},
            {tipo: 'Siniestrado', total: this.totalSiniesto , color: '#d9d9d9'},
          ]
      
        } 

        // var x = document.getElementById('pick');
        // console.log(x)
      }

      // console.log(this.cardsUS);

      this.loadingVisible = false;
    });
  }

  getDetalleV() {

    if(this.getVC.udN == "TODOS"){
      this.myudnV = 0;
    }else if(this.getVC.udN == "ORIZABA"){
      this.myudnV = 1;
    }else if(this.getVC.udN == "GUADALAJARA"){
      this.myudnV = 2;
    }else if(this.getVC.udN == "RAMOS ARIZPE"){
      this.myudnV = 3;
    }else if(this.getVC.udN == "MEXICALI"){
      this.myudnV = 4;
    }else if(this.getVC.udN == "HERMOSILLO"){
      this.myudnV = 5;
    }else if(this.getVC.udN == "CUAUTITLAN"){
      this.myudnV = 8;
    }else if(this.getVC.udN == "TULTITLAN"){
      this.myudnV = 9;
    }

    this.ultimoStService.getDetalleViaje(this.myudnV, this.getVC.noviaje).subscribe(res => {
      this.detalleVC = res?.data?.bitacoraPorViaje.sort((a, b) => (a.f_ini_status < b.f_ini_status ? -1 : 1));;
    //   console.log(res.data)
      this.tiempoTotal = res?.data?.tiempoTotal;
      this.loadingVisible = false;
    });
  }

  getDetalleVV() {
    
    if(this.getVV.udN == "TODOS"){
      this.myudnVV = 0;
    }else if(this.getVV.udN == "ORIZABA"){
      this.myudnVV = 1;
    }else if(this.getVV.udN == "GUADALAJARA"){
      this.myudnVV = 2;
    }else if(this.getVV.udN == "RAMOS ARIZPE"){
      this.myudnVV = 3;
    }else if(this.getVV.udN == "MEXICALI"){
      this.myudnVV = 4;
    }else if(this.getVV.udN == "HERMOSILLO"){
      this.myudnVV = 5;
    }else if(this.getVV.udN == "CUAUTITLAN"){
      this.myudnVV = 8;
    }else if(this.getVV.udN == "TULTITLAN"){
      this.myudnVV = 9;
    }

    this.ultimoStService.getDetalleViajeVV(this.myudnVV, this.getVV.noviaje).subscribe(res => {
      this.detalleVV = res?.data?.bitacoraPorViaje.sort((a, b) => (a.f_ini_status < b.f_ini_status ? -1 : 1));;
      // console.log(res?.data)
      this.tiempoTotal = res?.data?.tiempoTotal;
      this.loadingVisible = false;
    });
  }

  getDetalleSV() {
    if(this.getSV.udN == "TODOS"){
      this.myudnSV = 0;
    }else if(this.getSV.udN == "ORIZABA"){
      this.myudnSV = 1;
    }else if(this.getSV.udN == "GUADALAJARA"){
      this.myudnSV = 2;
    }else if(this.getSV.udN == "RAMOS ARIZPE"){
      this.myudnSV = 3;
    }else if(this.getSV.udN == "MEXICALI"){
      this.myudnSV = 4;
    }else if(this.getSV.udN == "HERMOSILLO"){
      this.myudnSV = 5;
    }else if(this.getSV.udN == "CUAUTITLAN"){
      this.myudnSV = 8;
    }else if(this.getSV.udN == "TULTITLAN"){
      this.myudnSV = 9;
    }

    this.ultimoStService.getDetalleViajeSV(this.myudnSV, this.getSV.noviaje).subscribe(res => {
      // console.log(res?.data)
      this.detalleSV = res?.data?.bitacoraPorViaje.sort((a, b) => (a.f_ini_status < b.f_ini_status ? -1 : 1));;
      
      this.tiempoTotal = res?.data?.tiempoTotal;
      this.loadingVisible = false;
    });
  }

  selectUdn(value: any){
    this.selectedUdn = value.value;
    //console.log(this.selectedUdn)
  }
  selectOperacion(value: any){
    this.selectedOperacion = value.value;
  }

  buttonVer(data){
    this.myudnV = 0;
    this.detalleVC = []

    var date = new Date(data.row.data.despacho);
    data.row.data.despacho = (((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' +  date.getFullYear())

    this.getVC = {
    ciclo: "",
    clasificacion: "",
    cliente: "",
    despacho: "",
    destinatario: "",
    f_ini_status: "",
    finViaje: "",
    idArea: 0,
    id_usuario: "",
    nombre_status_viaje: "",
    noviaje: 0,
    operacion: "",
    operador: "",
    periodo: 0,
    remitente: "",
    ruta: "",
    tiempo: "",
    tipoViaje: "",
    tracto: "",
    udN: "",
  };

    this.getVC = data.row.data;
  //  console.log(this.getVC);

    if(this.getVC !== undefined){
      this.loadingVisible = true;
      this.getDetalleV();
    this.modViajeC = true;
    }

  }

  buttonVerVV(data){
    this.myudnVV = 0;
    this.detalleVV = []
    var date = new Date(data.row.data.despacho);
    data.row.data.despacho = (((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' +  date.getFullYear())


    this.getVV = {
    ciclo: "",
    clasificacion: "",
    cliente: "",
    despacho: "",
    destinatario: "",
    f_ini_status: "",
    finViaje: "",
    idArea: 0,
    id_usuario: "",
    nombre_status_viaje: "",
    noviaje: 0,
    operacion: "",
    operador: "",
    periodo: 0,
    remitente: "",
    ruta: "",
    tiempo: "",
    tipoViaje: "",
    tracto: "",
    udN: "",
  };

    this.getVV = data.row.data;
    //console.log(this.getVV)

    if(this.getVV !== undefined){
      this.loadingVisible = true;
      this.getDetalleVV();
    this.modViajeV = true;
    }

  }

  buttonVerSV(data){
      this.myudnSV = 0;
    this.detalleSV = []

    var date = new Date(data.row.data.despacho);
    data.row.data.despacho = (((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' +  date.getFullYear())

    var date = new Date(data.row.data.finViaje);
    data.row.data.finViaje = (((date.getDate() > 9) ? date.getDate() : ('0' + date.getDate())) + '/' + ((date.getMonth() > 8) ? (date.getMonth() + 1) : ('0' + (date.getMonth() + 1))) + '/' +  date.getFullYear())

    this.getSV = {
    ciclo: "",
    clasificacion: "",
    cliente: "",
    despacho: "",
    destinatario: "",
    f_ini_status: "",
    finViaje: "",
    idArea: 0,
    id_usuario: "",
    nombre_status_viaje: "",
    noviaje: 0,
    operacion: "",
    operador: "",
    periodo: 0,
    remitente: "",
    ruta: "",
    tiempo: "",
    tipoViaje: "",
    tracto: "",
    udN: "",
  };

    this.getSV = data.row.data;
    //console.log(this.getSV);

    if(this.getSV !== undefined){
      this.loadingVisible = true;
      this.getDetalleSV();
    this.modSinV = true;
    }

  }

  openMapa(value){
    let latitud = 0;
    let longitud = 0;
    let detalle = undefined;

    if (this.map.hasLayer(this.markerGroup)) {
      this.map.removeLayer(this.markerGroup);
      this.markerGroup.clearLayers();
    }

    this.loadingVisible = true;
    this.ultimoStService.getLatLong(value.data.tracto).subscribe(data => {
       latitud = data?.data?.poslat;
       longitud = data?.data?.poslon;
       detalle = data?.data;
        console.log(data)
       if(data.data !== null){
        console.log("ENTRE")
        setTimeout(() => {
          this.map.invalidateSize()
          this.markerGroup = L.layerGroup().addTo(this.map);
          L.marker([latitud, longitud]).bindTooltip(detalle.posicion,{permanent: true, direction: 'top'}).addTo(this.markerGroup);
          this.map.flyTo([latitud, longitud], 10);
        },1 );

        this.modMapa = true;
      }else if(data.data == null){
                console.log("ENTRE else")
        notify({
                message: "No hay posición",
                position: {
                  my: 'center center',
                  at: 'center center',
                },
              }, 'warning', 3000);
      }
      
      this.loadingVisible = false;
    })

    
  }

  openModal(): void {
  const dialog = document.getElementById("myDialog") as HTMLDialogElement;
  dialog.showModal();
  }

  getViajesCargados(value: any){

  }


   buscarClick = (e: any) => {
    if (this.selectedUdn !==  undefined) {
          this.cardsUS = [];
      this.loadingVisible = true;
      
      if (this.intervalId) {
        //console.log("INTERVAL ID: " + this.intervalId);
        clearInterval(this.intervalId);
      }
  
      this.getUltmoSta();

      this.actualizarIntervalo();
    }

    

  };

  actualizarIntervalo() {


    this.ngZone.run(() => {

    this.intervalId = setInterval(() => {
        //console.log('Interval ejecutado');
        this.getUltmoSta();
      }, 600000);
    });
     
  }

  detenerIntervalo() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }

  ngOnDestroy(): void {
    // Por seguridad, detenerlo al destruir el componente
    this.detenerIntervalo();
  }

   onShown() {
    // setTimeout(() => {
    //   this.loadingVisible = false;
    // }, 3000);
  }

  onHidden() {
  }

 
  calcularPorcentajes(options: any) {
    // //
    // if (options.summaryProcess === 'calculate') {
    //   if (options.name === 'grupMargenUtilidaPor') {
    //     options.totalValue = .17;
    //   }
    // }
  }

  onRowPreparedD(e){
    if (e.rowType == 'data') {

      e.cells.forEach((c: any) => {

      if (c.cellElement) {
  
        if(c.columnIndex == 0){
            if(c.cellElement?.style !== undefined){
              c.cellElement.style.color = "#a9d08e";
            }
        }
      }
      });
    }
  }

  onRowPreparedND(e){
    if (e.rowType == 'data') {

      e.cells.forEach((c: any) => {

      if (c.cellElement) {
  
        if(c.columnIndex == 0){
            if(c.cellElement?.style !== undefined){
              c.cellElement.style.color = "#ffd966";
            }
        }
      }
      });
    }
  }

  onRowPrepared(e){

    if(e.rowType == 'header'){
      e.cells.forEach((c: any) => {

        if (c.cellElement) {
          // c.cellElement.style.fontSize = "18px";
          // c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.color = "#000000" 
          c.cellElement.style.background = "white"
          
          //console.log(c)
          if(c.columnIndex == 2){
            c.cellElement.style.background = "#a9d08e";
            c.cellElement.style.fontSize = "12px";
            c.cellElement.style.fontWeight = "bolder";
          }

          if( c.column.caption == "Cargados" || c.column.caption == "Vacíos" || c.column.caption == "Programado" || c.column.caption == "Sin Viajes"){
            c.cellElement.style.background = "#a9d08e";
            c.cellElement.style.fontSize = "10px";
          }

          if(c.columnIndex == 6){
            c.cellElement.style.background = "#ffd966";
            c.cellElement.style.fontSize = "12px";
            c.cellElement.style.fontWeight = "bolder";
          } 
          if(c.column.caption == "Patio" || c.column.caption == "Taller" || c.column.caption == "Siniestrado"){
            c.cellElement.style.background = "#ffd966";
            c.cellElement.style.fontSize = "10px";
            // c.cellElement.style.fontWeight = "bolder";

          }
        }
      })
     // console.log(e)
    }
    
  if (e.rowType == 'data') {

    e.cells.forEach((c: any) => {

    if (c.cellElement) {
  
      if(c.columnIndex == 0){
          
        //console.log(c.data)
        if(c.cellElement?.style !== undefined){
          c.cellElement.style.fontSize = "10px";
        }

      
      }

      if(c.columnIndex == 2){

        if (c.data.porcentaje > 0.95) {
          if(c.cellElement?.style !== undefined){
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.color = "#03af4b";
          }
        }

        if (c.data.porcentaje > 0.90 && c.data.porcentaje < 0.95) {
          if(c.cellElement?.style !== undefined){
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.color = "#ffd966";
          }
        }

        if (c.data.porcentaje < 0.90) {
          if(c.cellElement?.style !== undefined){
            c.cellElement.style.fontWeight = "bolder";
            c.cellElement.style.color = "#dd0f0f";
          }
        }

      }
    }
    });
  }
  }
  onCellPrepared(e){}
  
  onRowPreparedVC(e){

    if(e.rowType == 'header'){
      e.cells.forEach((c: any) => {

        if (c.cellElement) {
          // c.cellElement.style.fontSize = "18px";
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.color = "#000000"

          if(c.columnIndex == 4 || c.columnIndex == 5 || c.columnIndex == 6 || c.columnIndex == 7 || c.columnIndex == 8 || c.columnIndex == 9
            || c.columnIndex == 10 || c.columnIndex == 11 || c.columnIndex == 12 || c.columnIndex == 13 || c.columnIndex == 14 || c.columnIndex == 15
          ){
            c.cellElement.style.background = "#DCDCDC";
            // c.cellElement.style.fontSize = "18px";
            c.cellElement.style.fontWeight = "bolder";

          }
        }
      })
     // console.log(e)
    }
    
  if (e.rowType == 'data') {

    e.cells.forEach((c: any) => {

    if (c.cellElement) {
      if(c.columnIndex == 0 || c.columnIndex == 2 || c.columnIndex == 3 || c.columnIndex == 4 || c.columnIndex == 16){
          if(c.cellElement?.style !== undefined){
            c.cellElement.style.color = "#001029"
            c.cellElement.style.fontWeight = "bolder";
          }
      }

      if(c.columnIndex == 1){
          

      if (c.data.clasificacion == "12 Hrs.") {
        //console.log(c.data)
        if(c.cellElement?.style !== undefined){
          c.cellElement.style.fontWeight = "bolder";
          // c.cellElement.style.fontSize = "15px";
          // c.cellElement.style.color = "white"
          c.cellElement.style.background = "#a9d08e";
        }

      }
      

      if (c.data.clasificacion == "24 Hrs.") {
        if(c.cellElement?.style !== undefined){
          c.cellElement.style.fontWeight = "bolder";
          // c.cellElement.style.fontSize = "15px";
          // c.cellElement.style.color = "white"
          c.cellElement.style.background = "#ffd966";
        }

      }

      if (c.data.clasificacion == "25+ Hrs.") {
        if(c.cellElement?.style !== undefined){
          c.cellElement.style.fontWeight = "bolder";
          // c.cellElement.style.fontSize = "15px";
          // c.cellElement.style.color = "white"
          c.cellElement.style.background = "#ff5050";
        }

      }
      }
    }
    });
  }
  }
  onCellPreparedVC(e){
  }
  customizeVC(e) {  
    var gridCell = e.gridCell;
    if(gridCell.rowType == 'data'){
      
      if(gridCell.column.dataField == 'clasificacion'){
      if(gridCell.data.clasificacion == "12 Hrs." ){
      //  console.log(e)
        e.backgroundColor = "#a9d08e";
        e.fontWeight = "bolder"  
        e.font = {bold: true}
      }

      if(gridCell.data.clasificacion == "24 Hrs." ){
          e.backgroundColor = "#ffd966";
          e.fontWeight = "bolder"  
          e.font = {bold: true}
      }

      if(gridCell.data.clasificacion == "25+ Hrs." ){

          e.backgroundColor = "#ff5050";
          e.fontWeight = "bolder"  
          e.font = {bold: true}
      }
      }
    }

    
  //   if (gridCell.rowType === 'group') {
      
  //     e.backgroundColor = "#DCDCDC";
  //     e.fontWeight = "bolder"
  //     e.font = {bold: true}

  // }

  // if (gridCell.rowType === 'totalFooter') {
      
  //   e.backgroundColor = "#ff9460";
  //   e.fontWeight = "bolder"
  //   e.font = {bold: true}

  // }
  }

  onRowPreparedVV(e){

    if(e.rowType == 'header'){
      e.cells.forEach((c: any) => {

        if (c.cellElement) {
          // c.cellElement.style.fontSize = "18px";
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.color = "#000000"

          if(c.columnIndex == 4 || c.columnIndex == 5 || c.columnIndex == 6 || c.columnIndex == 7 || c.columnIndex == 8 || c.columnIndex == 9
            || c.columnIndex == 10 || c.columnIndex == 11 || c.columnIndex == 12
          ){
            c.cellElement.style.background = "#DCDCDC";
                      // c.cellElement.style.fontSize = "18px";
          c.cellElement.style.fontWeight = "bolder";

          }
        }
      })
      //console.log(e)
    }

  if (e.rowType == 'data') {

    e.cells.forEach((c: any) => {

    if (c.cellElement) {
      if(c.columnIndex == 0 || c.columnIndex == 2 || c.columnIndex == 3 || c.columnIndex == 4 || c.columnIndex == 13){
          if(c.cellElement?.style !== undefined){
            c.cellElement.style.color = "#001029"
            c.cellElement.style.fontWeight = "bolder";
          }
      }


      if(c.columnIndex == 1){
          
        //console.log(c.data.clasificacion)
      if (c.data.clasificacion == "12 Hrs.") {
        if(c.cellElement?.style !== undefined){
          c.cellElement.style.fontWeight = "bolder";
          // c.cellElement.style.fontSize = "15px";
          // c.cellElement.style.color = "white"
          c.cellElement.style.background = "#a9d08e";
        }

      }
      

      if (c.data.clasificacion == "24 Hrs.") {
        if(c.cellElement?.style !== undefined){
          c.cellElement.style.fontWeight = "bolder";
          // c.cellElement.style.fontSize = "15px";
          // c.cellElement.style.color = "white"
          c.cellElement.style.background = "#ffd966"
        }

      }

      if (c.data.clasificacion == "25+ Hrs.") {
        if(c.cellElement?.style !== undefined){
          c.cellElement.style.fontWeight = "bolder";
          // c.cellElement.style.fontSize = "15px";
          // c.cellElement.style.color = "white"
          c.cellElement.style.background = "#ff5050";
        }

      }
      }
    }
    });
  }
  }
  onCellPreparedVV(e){
  }
  customizeVV(e) {  
    var gridCell = e.gridCell;
    if(gridCell.rowType == 'data'){
      
      if(gridCell.column.dataField == 'clasificacion'){
      if(gridCell.data.clasificacion == "12 Hrs." ){
      //  console.log(e)
        e.backgroundColor = "#a9d08e";
        e.fontWeight = "bolder"  
        e.font = {bold: true}
      }

      if(gridCell.data.clasificacion == "24 Hrs." ){
          e.backgroundColor = "#ffd966";
          e.fontWeight = "bolder"  
          e.font = {bold: true}
      }

      if(gridCell.data.clasificacion == "25+ Hrs." ){

          e.backgroundColor = "#ff5050";
          e.fontWeight = "bolder"  
          e.font = {bold: true}
      }
      }
    }
  }

  onRowPreparedEV(e){

    if(e.rowType == 'header'){
      e.cells.forEach((c: any) => {

        if (c.cellElement) {
          // c.cellElement.style.fontSize = "18px";
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.color = "#000000"

          if(c.columnIndex == 4 || c.columnIndex == 5 || c.columnIndex == 6 || c.columnIndex == 7 || c.columnIndex == 8 || c.columnIndex == 9
            || c.columnIndex == 10 || c.columnIndex == 11 || c.columnIndex == 12
          ){
            c.cellElement.style.background = "#DCDCDC";
                      // c.cellElement.style.fontSize = "18px";
          c.cellElement.style.fontWeight = "bolder";

          }
        }
      })
      //console.log(e)
    }

  if (e.rowType == 'data') {

    e.cells.forEach((c: any) => {

    if (c.cellElement) {
      if(c.columnIndex == 0 || c.columnIndex == 2 || c.columnIndex == 10){
          if(c.cellElement?.style !== undefined){
            c.cellElement.style.color = "#001029"
            c.cellElement.style.fontWeight = "bolder";
          }
      }


      if(c.columnIndex == 1){
          
        //console.log(c.data.clasificacion)
      if (c.data.clasificacion == "12 Hrs.") {
        if(c.cellElement?.style !== undefined){
          c.cellElement.style.fontWeight = "bolder";
          // c.cellElement.style.fontSize = "15px";
          // c.cellElement.style.color = "white"
          c.cellElement.style.background = "#a9d08e";
        }

      }
      

      if (c.data.clasificacion == "24 Hrs.") {
        if(c.cellElement?.style !== undefined){
          c.cellElement.style.fontWeight = "bolder";
          // c.cellElement.style.fontSize = "15px";
          // c.cellElement.style.color = "white"
          c.cellElement.style.background = "#ffd966"
        }

      }

      if (c.data.clasificacion == "25+ Hrs.") {
        if(c.cellElement?.style !== undefined){
          c.cellElement.style.fontWeight = "bolder";
          // c.cellElement.style.fontSize = "15px";
          // c.cellElement.style.color = "white"
          c.cellElement.style.background = "#ff5050";
        }

      }
      }
    }
    });
  }
  }
  onCellPreparedEV(e){
  }
  customizeEV(e) {  
    var gridCell = e.gridCell;
    if(gridCell.rowType == 'data'){
      
      if(gridCell.column.dataField == 'clasificacion'){
      if(gridCell.data.clasificacion == "12 Hrs." ){
      //  console.log(e)
        e.backgroundColor = "#a9d08e";
        e.fontWeight = "bolder"  
        e.font = {bold: true}
      }

      if(gridCell.data.clasificacion == "24 Hrs." ){
          e.backgroundColor = "#ffd966";
          e.fontWeight = "bolder"  
          e.font = {bold: true}
      }

      if(gridCell.data.clasificacion == "25+ Hrs." ){

          e.backgroundColor = "#ff5050";
          e.fontWeight = "bolder"  
          e.font = {bold: true}
      }
      }
    }
  }

  onRowPreparedSV(e){

    if(e.rowType == 'header'){
      e.cells.forEach((c: any) => {

        if (c.cellElement) {
          // c.cellElement.style.fontSize = "18px";
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.color = "#000000"

          if(c.columnIndex == 4 || c.columnIndex == 5 || c.columnIndex == 6 || c.columnIndex == 7 || c.columnIndex == 8 || c.columnIndex == 9
            || c.columnIndex == 10 || c.columnIndex == 11 || c.columnIndex == 12 || c.columnIndex == 13 || c.columnIndex == 14
            || c.columnIndex == 15 || c.columnIndex == 16 || c.columnIndex == 17
          ){
            c.cellElement.style.background = "#DCDCDC";
                      // c.cellElement.style.fontSize = "18px";
          c.cellElement.style.fontWeight = "bolder";

          }
        }
      })
    }

  if (e.rowType == 'data') {

    e.cells.forEach((c: any) => {

    if (c.cellElement) {


      if(c.columnIndex == 0 || c.columnIndex == 2 || c.columnIndex == 7){
          if(c.cellElement?.style !== undefined){
            c.cellElement.style.color = "#001029"
            c.cellElement.style.fontWeight = "bolder";
          }
      }

      if(c.columnIndex == 1){
          
      if (c.data.clasificacion == "12 Hrs.") {
        if(c.cellElement?.style !== undefined){
          c.cellElement.style.fontWeight = "bolder";
          // c.cellElement.style.fontSize = "15px";
          // c.cellElement.style.color = "white"
          c.cellElement.style.background = "#a9d08e";
        }

      }
      

      if (c.data.clasificacion == "24 Hrs.") {
        if(c.cellElement?.style !== undefined){
          c.cellElement.style.fontWeight = "bolder";
          // c.cellElement.style.fontSize = "15px";
          // c.cellElement.style.color = "white"
          c.cellElement.style.background = "#ffd966";
        }

      }

      if (c.data.clasificacion == "25+ Hrs.") {
        if(c.cellElement?.style !== undefined){
          c.cellElement.style.fontWeight = "bolder";
          // c.cellElement.style.fontSize = "15px";
          // c.cellElement.style.color = "white"
          c.cellElement.style.background = "#ff5050";
        }

      }
      }
      



    }
    });
  }
  }
  onCellPreparedSV(e){}

   onRowPreparedTaller(e){

    if(e.rowType == 'header'){
      e.cells.forEach((c: any) => {

        if (c.cellElement) {
          
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.color = "#000000"

          if(c.columnIndex == 4 || c.columnIndex == 5 || c.columnIndex == 6 || c.columnIndex == 7 || c.columnIndex == 8 || c.columnIndex == 9
            || c.columnIndex == 10 || c.columnIndex == 11 || c.columnIndex == 12 || c.columnIndex == 13 || c.columnIndex == 14
            || c.columnIndex == 15 || c.columnIndex == 16 || c.columnIndex == 17 || c.columnIndex == 18 || c.columnIndex == 19
          ){
            c.cellElement.style.background = "#DCDCDC";
                      // c.cellElement.style.fontSize = "18px";
          c.cellElement.style.fontWeight = "bolder";

          }
        }
      })
    }

  if (e.rowType == 'data') {

    e.cells.forEach((c: any) => {

    if (c.cellElement) {


      if(c.columnIndex == 0 || c.columnIndex == 2 ||  c.columnIndex == 7){
          if(c.cellElement?.style !== undefined){
            c.cellElement.style.color = "#001029"
            c.cellElement.style.fontWeight = "bolder";
          }
      }

      if(c.columnIndex == 1){
          
      if (c.data.clasificacion == "12 Hrs.") {
        if(c.cellElement?.style !== undefined){
          c.cellElement.style.fontWeight = "bolder";
          // c.cellElement.style.fontSize = "15px";
          // c.cellElement.style.color = "white"
          c.cellElement.style.background = "#a9d08e";
        }

      }
      

      if (c.data.clasificacion == "24 Hrs.") {
        if(c.cellElement?.style !== undefined){
          c.cellElement.style.fontWeight = "bolder";
          // c.cellElement.style.fontSize = "15px";
          // c.cellElement.style.color = "white"
          c.cellElement.style.background = "#ffd966";
        }

      }

      if (c.data.clasificacion == "25+ Hrs.") {
        if(c.cellElement?.style !== undefined){
          c.cellElement.style.fontWeight = "bolder";
          // c.cellElement.style.fontSize = "15px";
          // c.cellElement.style.color = "white"
          c.cellElement.style.background = "#ff5050";
        }

      }
      }
      



    }
    });
  }
  }

  onRowPreparedSiniestro(e){

    if(e.rowType == 'header'){
      e.cells.forEach((c: any) => {

        if (c.cellElement) {
          
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.color = "#000000"

          if(c.columnIndex == 4 || c.columnIndex == 5 || c.columnIndex == 6 || c.columnIndex == 7 || c.columnIndex == 8 || c.columnIndex == 9
            || c.columnIndex == 10 || c.columnIndex == 11 || c.columnIndex == 12 || c.columnIndex == 13 || c.columnIndex == 14
            || c.columnIndex == 15 || c.columnIndex == 16 || c.columnIndex == 17 || c.columnIndex == 18 || c.columnIndex == 19
          ){
            c.cellElement.style.background = "#DCDCDC";
                      // c.cellElement.style.fontSize = "18px";
          c.cellElement.style.fontWeight = "bolder";

          }
        }
      })
    }

  if (e.rowType == 'data') {

    e.cells.forEach((c: any) => {

    if (c.cellElement) {


      if(c.columnIndex == 0 || c.columnIndex == 2 ||  c.columnIndex == 19){
          if(c.cellElement?.style !== undefined){
            c.cellElement.style.color = "#001029"
            c.cellElement.style.fontWeight = "bolder";
          }
      }

      if(c.columnIndex == 1){
          
      if (c.data.clasificacion == "12 Hrs.") {
        if(c.cellElement?.style !== undefined){
          c.cellElement.style.fontWeight = "bolder";
          // c.cellElement.style.fontSize = "15px";
          // c.cellElement.style.color = "white"
          c.cellElement.style.background = "#a9d08e";
        }

      }
      

      if (c.data.clasificacion == "24 Hrs.") {
        if(c.cellElement?.style !== undefined){
          c.cellElement.style.fontWeight = "bolder";
          // c.cellElement.style.fontSize = "15px";
          // c.cellElement.style.color = "white"
          c.cellElement.style.background = "#ffd966";
        }

      }

      if (c.data.clasificacion == "25+ Hrs.") {
        if(c.cellElement?.style !== undefined){
          c.cellElement.style.fontWeight = "bolder";
          // c.cellElement.style.fontSize = "15px";
          // c.cellElement.style.color = "white"
          c.cellElement.style.background = "#ff5050";
        }

      }
      }
      



    }
    });
  }
  }


   onCellPreparedTaller(e){
  }
  customizeSV(e) {  
    var gridCell = e.gridCell;
    if(gridCell.rowType == 'data'){
      
      if(gridCell.column.dataField == 'clasificacion'){
      if(gridCell.data.clasificacion == "12 Hrs." ){
      //  console.log(e)
        e.backgroundColor = "#a9d08e";
        e.fontWeight = "bolder"  
        e.font = {bold: true}
      }

      if(gridCell.data.clasificacion == "24 Hrs." ){
          e.backgroundColor = "#ffd966";
          e.fontWeight = "bolder"  
          e.font = {bold: true}
      }

      if(gridCell.data.clasificacion == "25+ Hrs." ){

          e.backgroundColor = "#ff5050";
          e.fontWeight = "bolder"  
          e.font = {bold: true}
      }
      }
    }
  }


  
  onRowPreparedDVC(e){

    if(e.rowType == 'header'){
      e.cells.forEach((c: any) => {

        if (c.cellElement) {
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.color = "#000000"
          c.cellElement.style.background = "#DCDCDC";
        }
      })
    }

 if (e.rowType == 'data') {

    e.cells.forEach((c: any) => {

    if (c.cellElement) {
      if(c.columnIndex == 0){
          if(c.cellElement?.style !== undefined){
            c.cellElement.style.color = "#001029"
            c.cellElement.style.fontWeight = "bolder";
          }
      }

      if(c.columnIndex == 0){
          

      if (c.data.clasificacion == "12 Hrs.") {
        if(c.cellElement?.style !== undefined){
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.background = "#a9d08e";
        }

      }
      

      if (c.data.clasificacion == "24 Hrs.") {
        if(c.cellElement?.style !== undefined){
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.background = "#ffd966";
        }

      }

      if (c.data.clasificacion == "25+ Hrs.") {
        if(c.cellElement?.style !== undefined){
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.background = "#ff5050";
        }

      }
      }
    }
    });
  }
  }
  onCellPreparedDVC(e){
  }
  customizeDVC(e) {  
    var gridCell = e.gridCell;
    if(gridCell.rowType == 'data'){
      
      if(gridCell.column.dataField == 'clasificacion'){
      if(gridCell.data.clasificacion == "12 Hrs." ){
      //  console.log(e)
        e.backgroundColor = "#a9d08e";
        e.fontWeight = "bolder"  
        e.font = {bold: true}
      }

      if(gridCell.data.clasificacion == "24 Hrs." ){
          e.backgroundColor = "#ffd966";
          e.fontWeight = "bolder"  
          e.font = {bold: true}
      }

      if(gridCell.data.clasificacion == "25+ Hrs." ){

          e.backgroundColor = "#ff5050";
          e.fontWeight = "bolder"  
          e.font = {bold: true}
      }
      }
    }
  }





   customizeTooltip = ({ valueText }: { valueText: number }) => ({
    text: Math.abs(valueText),
  });

  abs(value: number): number {
    return Math.abs(value);
  }
  

}
