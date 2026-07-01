import { Component, OnInit } from '@angular/core';
import { ServiceSales } from '../tasks/app.serviceSales';
import { IngresosDModel } from 'src/app/shared/models/ingresos/ingresosD.models';
import { DetalleModel } from 'src/app/shared/models/ingresos/detalle.models';

@Component({
  
  templateUrl: './ingresos-detallados.component.html',
  styleUrls: ['./ingresos-detallados.component.scss'],
  providers: [ServiceSales]
})
export class IngresosDetalladosComponent implements OnInit {

  arrIngresos: IngresosDModel[] = [];
  arrDetalle: DetalleModel[] = [];
  arrIngresosFeb: IngresosDModel[] = [];
  arrDetalleFeb: DetalleModel[] = [];
  arrIngresosMarzo: IngresosDModel[] = [];
  arrDetalleMarzo: DetalleModel[] = [];
  arrIngresosAbril: IngresosDModel[] = [];
  arrDetalleAbril: DetalleModel[] = [];
  arrIngresosMayo: IngresosDModel[] = [];
  arrDetalleMayo: DetalleModel[] = [];
  arrIngresosJunio: IngresosDModel[] = [];
  arrDetalleJunio: DetalleModel[] = [];
  arrIngresosJulio: IngresosDModel[] = [];
  arrDetalleJulio: DetalleModel[] = [];
  arrIngresosAgosto: IngresosDModel[] = [];
  arrDetalleAgosto: DetalleModel[] = [];
  arrIngresosSeptiembre: IngresosDModel[] = [];
  arrDetalleSeptiembre: DetalleModel[] = [];
  arrIngresosOctubre: IngresosDModel[] = [];
  arrDetalleOctubre: DetalleModel[] = [];
  arrIngresosNoviembre: IngresosDModel[] = [];
  arrDetalleNoviembre: DetalleModel[] = [];
  arrIngresosDiciembre: IngresosDModel[] = [];
  arrDetalleDiciembre: DetalleModel[] = [];

/*===================Detalles anuales 2024===========================*/
  arrIngresosEne2024: IngresosDModel[] = [];
  arrDetalleEne2024: DetalleModel[] = [];
  arrIngresosFeb2024: IngresosDModel[] = [];
  arrDetalleFeb2024: DetalleModel[] = [];
  arrIngresosMar2024: IngresosDModel[] = [];
  arrDetalleMar2024: DetalleModel[] = [];
  arrIngresosAbr2024: IngresosDModel[] = [];
  arrDetalleAbr2024: DetalleModel[] = [];
  arrIngresosMay2024: IngresosDModel[] = [];
  arrDetalleMay2024: DetalleModel[] = [];
  arrIngresosJun2024: IngresosDModel[] = [];
  arrDetalleJUN2024: DetalleModel[] = [];
  arrIngresosJul2024: IngresosDModel[] = [];
  arrDetalleJul2024: DetalleModel[] = [];
  arrIngresosAgo2024: IngresosDModel[] = [];
  arrDetalleAgo2024: DetalleModel[] = [];
  arrIngresosSep2024: IngresosDModel[] = [];
  arrDetalleSep2024: DetalleModel[] = [];
  arrIngresosOct2024: IngresosDModel[] = [];
  arrDetalleOct2024: DetalleModel[] = [];
  arrIngresosNov2024: IngresosDModel[] = [];
  arrDetalleNov2024: DetalleModel[] = [];
  arrIngresosDic2024: IngresosDModel[] = [];
  arrDetalleDic2024: DetalleModel[] = [];

  /*===================Detalles anuales 2025===========================*/
  arrIngresosEne2025: IngresosDModel[] = [];
  arrDetalleEne2025: DetalleModel[] = [];
  arrIngresosFeb2025: IngresosDModel[] = [];
  arrDetalleFeb2025: DetalleModel[] = [];
  arrIngresosMar2025: IngresosDModel[] = [];
  arrDetalleMar2025: DetalleModel[] = [];
  arrIngresosAbr2025: IngresosDModel[] = [];
  arrDetalleAbr2025: DetalleModel[] = [];
  arrIngresosMay2025: IngresosDModel[] = [];
  arrDetalleMay2025: DetalleModel[] = [];
  arrIngresosJun2025: IngresosDModel[] = [];
  arrDetalleJun2025: DetalleModel[] = [];
  arrIngresosJul2025: IngresosDModel[] = [];
  arrDetalleJul2025: DetalleModel[] = [];
  arrIngresosAgo2025: IngresosDModel[] = [];
  arrDetalleAgo2025: DetalleModel[] = [];
  arrIngresosSep2025: IngresosDModel[] = [];
  arrDetalleSep2025: DetalleModel[] = [];
  arrIngresosOct2025: IngresosDModel[] = [];
  arrDetalleOct2025: DetalleModel[] = [];
  arrIngresosNov2025: IngresosDModel[] = [];
  arrDetalleNov2025: DetalleModel[] = [];
  arrIngresosDic2025: IngresosDModel[] = [];
  arrDetalleDic2025: DetalleModel[] = [];

  /*===================Detalles anuales 2026===========================*/
  arrIngresosEne2026: IngresosDModel[] = [];
  arrDetalleEne2026: DetalleModel[] = [];
  arrIngresosFeb2026: IngresosDModel[] = [];
  arrDetalleFeb2026: DetalleModel[] = [];
  arrIngresosMar2026: IngresosDModel[] = [];
  arrDetalleMar2026: DetalleModel[] = [];
  arrIngresosAbr2026: IngresosDModel[] = [];
  arrDetalleAbr2026: DetalleModel[] = [];
  arrIngresosMay2026: IngresosDModel[] = [];
  arrDetalleMay2026: DetalleModel[] = [];
  arrIngresosJun2026: IngresosDModel[] = [];
  arrDetalleJun2026: DetalleModel[] = [];
  arrIngresosJul2026: IngresosDModel[] = [];
  arrDetalleJul2026: DetalleModel[] = [];
  arrIngresosAgo2026: IngresosDModel[] = [];
  arrDetalleAgo2026: DetalleModel[] = [];
  arrIngresosSep2026: IngresosDModel[] = [];
  arrDetalleSep2026: DetalleModel[] = [];
  arrIngresosOct2026: IngresosDModel[] = [];
  arrDetalleOct2026: DetalleModel[] = [];
  arrIngresosNov2026: IngresosDModel[] = [];
  arrDetalleNov2026: DetalleModel[] = [];
  arrIngresosDic2026: IngresosDModel[] = [];
  arrDetalleDic2026: DetalleModel[] = [];

  loadingVisible = false;

  constructor(private ingresosService: ServiceSales) 
  {
    // this.ingresosService.getIngresosDetalladosMensual().subscribe(res => {
      
    //   this.arrIngresos = res.data.resumen;
    //   this.arrDetalle = res.data.detalle;
      
    // });

  }

  ngOnInit(): void {
    this.getIDMDEnero2026();
    this.getIDMDFebrero2026();
    this.getIDMDMarzo2026();
     this.getIDMDAbril2026();
     this.getIDMDMayo2026();
     this.getIDMDJunio2026();
    // this.getIDMDJulio2026();
    // this.getIDMDAgosto2026();
    // this.getIDMDSeptiembre2026();
    // this.getIDMDOctubre2026();
    // this.getIDMDNoviembre2026();
    // this.getIDMDDiciembre2026();
  }

/*=======================LLamadas GET 2023==========================*/
  getIDMMarzo(){
    this.ingresosService.getIngresosDetalladosMensualMar().subscribe(res => {
      
      const orderIngreso: IngresosDModel[] = res.data.resumen;
      let neworderIngresoM = [];
      neworderIngresoM.push(orderIngreso[0],orderIngreso[1],
                        orderIngreso[2],orderIngreso[4],orderIngreso[5],orderIngreso[3],
                        orderIngreso[6],orderIngreso[7],
                        orderIngreso[8],orderIngreso[9],
                        orderIngreso[10],orderIngreso[11],
                        orderIngreso[12],orderIngreso[13],
                        orderIngreso[14],orderIngreso[15]);
 
      this.arrIngresosMarzo = neworderIngresoM;

      this.arrDetalleMarzo = res.data.detalle;
    });
  }
  getIDMAbril(){
    this.ingresosService.getIngresosDetalladosMensualAbr().subscribe(res => {

      const orderIngreso: IngresosDModel[] = res.data.resumen;
      let neworderIngresoA = [];
      neworderIngresoA.push(orderIngreso[0],orderIngreso[1],
                        orderIngreso[2],orderIngreso[3],
                        orderIngreso[4],orderIngreso[5],
                        orderIngreso[6],orderIngreso[7],
                        orderIngreso[8],orderIngreso[10],orderIngreso[9],orderIngreso[11],orderIngreso[12],
                        orderIngreso[13],orderIngreso[14],
                        orderIngreso[15],orderIngreso[16]);

      this.arrIngresosAbril = neworderIngresoA;

      this.arrDetalleAbril = res.data.detalle;
    });
  }
  getIDMMayo(){
    this.ingresosService.getIngresosDetalladosMensualMay().subscribe(res => {

      const orderIngreso: IngresosDModel[] = res.data.resumen;
      let neworderIngresoMY = [];
      neworderIngresoMY.push(orderIngreso[0],orderIngreso[1],
                        orderIngreso[2],orderIngreso[3],
                        orderIngreso[4],orderIngreso[5],
                        orderIngreso[6],orderIngreso[7],
                        orderIngreso[8],orderIngreso[10],orderIngreso[9],orderIngreso[11],orderIngreso[12],
                        orderIngreso[13],orderIngreso[14],orderIngreso[15],
                        orderIngreso[16],orderIngreso[17]);

      this.arrIngresosMayo = neworderIngresoMY;

      this.arrDetalleMayo = res.data.detalle;
    });
  }
  getIDMJunio(){
    this.ingresosService.getIngresosDetalladosMensualJun().subscribe(res => {

      const orderIngreso: IngresosDModel[] = res.data.resumen;
      let neworderIngresoJN = [];
      neworderIngresoJN.push(orderIngreso[0],orderIngreso[1],
                        orderIngreso[2],orderIngreso[3],orderIngreso[4],
                        orderIngreso[5],
                        orderIngreso[6],
                        orderIngreso[7],orderIngreso[9],orderIngreso[8],orderIngreso[10],orderIngreso[11],
                        orderIngreso[12],orderIngreso[13],orderIngreso[14],
                        orderIngreso[15],orderIngreso[16]);

      this.arrIngresosJunio = neworderIngresoJN;

      this.arrDetalleJunio = res.data.detalle;
    });
  }
  getIDMJulio(){
    this.ingresosService.getIngresosDetalladosMensualJul().subscribe(res => {

      const orderIngreso: IngresosDModel[] = res.data.resumen;
      let neworderIngresoJL = [];
      neworderIngresoJL.push(orderIngreso[0],orderIngreso[1],
                        orderIngreso[2],orderIngreso[3],orderIngreso[4],
                        orderIngreso[5],
                        orderIngreso[6],orderIngreso[7],
                        orderIngreso[8],orderIngreso[10],orderIngreso[9],orderIngreso[11],
                        orderIngreso[12],orderIngreso[13],
                        orderIngreso[14],orderIngreso[15]);

      this.arrIngresosJulio = res.data.resumen;

      this.arrDetalleJulio = res.data.detalle;

      //this.loadingVisible = false;
    });
  }
  getIDMAgosto(){
    this.ingresosService.getIngresosDetalladosMensualAgo().subscribe(res => {

      // const orderIngreso: IngresosDModel[] = res.data.resumen;
      // let neworderIngresoAG = [];
      // neworderIngresoAG.push(orderIngreso[0],orderIngreso[1],
      //                   orderIngreso[2],orderIngreso[3],orderIngreso[4],
      //                   orderIngreso[5],orderIngreso[6],
      //                   orderIngreso[7], orderIngreso[8],
      //                   orderIngreso[9],orderIngreso[11],orderIngreso[10],orderIngreso[12],
      //                   orderIngreso[13],orderIngreso[14],
      //                   orderIngreso[15],orderIngreso[16]);
      //                   console.log(res.data.resumen)
      this.arrIngresosAgosto = res.data.resumen;
     

      this.arrDetalleAgosto = res.data.detalle;

      //this.loadingVisible = false;
    });
  }
  getIDMSeptiembre(){
    this.ingresosService.getIngresosDetalladosMensualSep().subscribe(res => {

      this.arrIngresosSeptiembre = res.data.resumen;
  
      this.arrDetalleSeptiembre = res.data.detalle;

      //this.loadingVisible = false;
    });
  }
  getIDMOctubre(){
    this.loadingVisible = true;
    this.ingresosService.getIngresosDetalladosMensualOct().subscribe(res => {

      this.arrIngresosOctubre = res.data.resumen;
  
      this.arrDetalleOctubre = res.data.detalle;

      this.loadingVisible = false;
    });
  }
  getIDMNoviembre(){
    this.loadingVisible = true;
    this.ingresosService.getIngresosDetalladosMensualNov().subscribe(res => {

      this.arrIngresosNoviembre = res.data.resumen;
      this.arrDetalleNoviembre = res.data.detalle;
      //console.log(this.arrDetalleNoviembre)

      this.loadingVisible = false;
    });
  }
  getIDMDiciembre(){
    this.loadingVisible = true;
    this.ingresosService.getIngresosDetalladosMensualDic().subscribe(res => {

      this.arrIngresosDiciembre = res.data.resumen;
      this.arrDetalleDiciembre = res.data.detalle;
      //console.log(this.arrIngresosDiciembre)

      this.loadingVisible = false;
    });
  }

 /*=======================LLamadas GET 2024==========================*/
  getIDMDEnero2024(){
    //console.log("entre")
    this.loadingVisible = true;
    this.ingresosService.getIngresosDetalladosMensualEne2024().subscribe(res => {
      //console.log("entre 2")
      this.arrIngresosEne2024 = res.data.resumen;
      this.arrDetalleEne2024 = res.data.detalle;
      //console.log(this.arrIngresosEne2024)

      this.loadingVisible = false;
    });
  }
  getIDMDFebrero2024(){
    this.loadingVisible = true;
    this.ingresosService.getIngresosDetalladosMensualFeb2024().subscribe(res => {
      this.arrIngresosFeb2024 = res.data.resumen;
      this.arrDetalleFeb2024 = res.data.detalle;
     // console.log(this.arrIngresosFeb2024)

      this.loadingVisible = false;
    });
  }
  getIDMDMarzo2024(){
    this.loadingVisible = true;
    this.ingresosService.getIngresosDetalladosMensualMar2024().subscribe(res => {
      this.arrIngresosMar2024 = res.data.resumen;
      this.arrDetalleMar2024 = res.data.detalle;
      //console.log(this.arrIngresosMar2024)

      this.loadingVisible = false;
    });
  }
  getIDMDAbril2024(){
    this.loadingVisible = true;
    this.ingresosService.getIngresosDetalladosMensualAbr2024().subscribe(res => {
      this.arrIngresosAbr2024 = res.data.resumen;
      this.arrDetalleAbr2024 = res.data.detalle;

      this.loadingVisible = false;
    });
  }
  getIDMDMayo2024(){
    this.ingresosService.getIngresosDetalladosMensualMay2024().subscribe(res => {
      this.arrIngresosMay2024 = res.data.resumen;
      this.arrDetalleMay2024 = res.data.detalle;

    });
  }
  getIDMDJunio2024(){
    this.ingresosService.getIngresosDetalladosMensualJun2024().subscribe(res => {
      this.arrIngresosJun2024 = res.data.resumen;
      this.arrDetalleJUN2024 = res.data.detalle;
    });
  }
  getIDMDJulio2024(){
    this.ingresosService.getIngresosDetalladosMensualJul2024().subscribe(res => {
      this.arrIngresosJul2024 = res.data.resumen;
      this.arrDetalleJul2024 = res.data.detalle;
     //console.log(this.arrIngresosJul2024)
    });
  }
  getIDMDAgosto2024(){
    this.ingresosService.getIngresosDetalladosMensualAgo2024().subscribe(res => {
      this.arrIngresosAgo2024 = res.data.resumen;
      this.arrDetalleAgo2024 = res.data.detalle;
    // console.log(this.arrIngresosAgo2024)
    });
  }
  getIDMDSeptiembre2024(){
    this.ingresosService.getIngresosDetalladosMensualSep2024().subscribe(res => {
      this.arrIngresosSep2024 = res.data.resumen;
      this.arrDetalleSep2024 = res.data.detalle;
     //console.log(this.arrIngresosSep2024)
    });
  }
  getIDMDOctubre2024(){
    this.ingresosService.getIngresosDetalladosMensualOct2024().subscribe(res => {
      this.arrIngresosOct2024 = res.data.resumen;
      this.arrDetalleOct2024 = res.data.detalle;
    //  console.log(this.arrIngresosOct2024)
    });
  }
  getIDMDNoviembre2024(){
    this.ingresosService.getIngresosDetalladosMensualNov2024().subscribe(res => {
      this.arrIngresosNov2024 = res.data.resumen;
      this.arrDetalleNov2024 = res.data.detalle;
    //  console.log(this.arrIngresosNov2024)
    });
  }
  getIDMDDiciembre2024(){
    this.ingresosService.getIngresosDetalladosMensualDic2024().subscribe(res => {
      this.arrIngresosDic2024 = res.data.resumen;
      this.arrDetalleDic2024 = res.data.detalle;
     //console.log(this.arrIngresosDic2024)
    });
  }

  /*=======================LLamadas GET 2025==========================*/
  getIDMDEnero2025(){
    //this.loadingVisible = true;
    this.ingresosService.getIngresosDetalladosMensualEne2025().subscribe(res => {
      this.arrIngresosEne2025 = res.data.resumen;
      this.arrDetalleEne2025 = res.data.detalle;

      //this.loadingVisible = false;
    });
  }
  getIDMDFebrero2025(){
  //  this.loadingVisible = true;
    this.ingresosService.getIngresosDetalladosMensualFeb2025().subscribe(res => {
      this.arrIngresosFeb2025 = res.data.resumen;
      this.arrDetalleFeb2025 = res.data.detalle;

    //  this.loadingVisible = false;
    });
  }
  getIDMDMarzo2025(){
   // this.loadingVisible = true;
    this.ingresosService.getIngresosDetalladosMensualMar2025().subscribe(res => {
      this.arrIngresosMar2025 = res.data.resumen;
      this.arrDetalleMar2025 = res.data.detalle;
      //console.log(this.arrIngresosMar2025)
     // this.loadingVisible = false;
    });
  }
  getIDMDAbril2025(){
    //this.loadingVisible = true;
    this.ingresosService.getIngresosDetalladosMensualAbr2025().subscribe(res => {
      this.arrIngresosAbr2025 = res.data.resumen;
      this.arrDetalleAbr2025 = res.data.detalle;
      //console.log(this.arrIngresosMar2025)
      //this.loadingVisible = false;
    });
  }
  getIDMDMayo2025(){
    this.loadingVisible = true;
    this.ingresosService.getIngresosDetalladosMensualMay2025().subscribe(res => {
      this.arrIngresosMay2025 = res.data.resumen;
      this.arrDetalleMay2025 = res.data.detalle;
   //   console.log(this.arrDetalleMay2025)
      this.loadingVisible = false;
    });
  }
  getIDMDJunio2025(){
    this.loadingVisible = true;
    this.ingresosService.getIngresosDetalladosMensualJun2025().subscribe(res => {
      this.arrIngresosJun2025 = res.data.resumen;
      this.arrDetalleJun2025 = res.data.detalle;
      //console.log(this.arrDetalleMay2025)
      this.loadingVisible = false;
    });
  }
  getIDMDJulio2025(){
    this.loadingVisible = true;
    this.ingresosService.getIngresosDetalladosMensualJul2025().subscribe(res => {
      this.arrIngresosJul2025 = res.data.resumen;
      this.arrDetalleJul2025 = res.data.detalle;
      //console.log(this.arrDetalleMay2025)
      this.loadingVisible = false;
    });
  }
  getIDMDAgosto2025(){
    this.loadingVisible = true;
    this.ingresosService.getIngresosDetalladosMensualAgo2025().subscribe(res => {
      this.arrIngresosAgo2025 = res.data.resumen;
      this.arrDetalleAgo2025 = res.data.detalle;
      // console.log(this.arrDetalleAgo2025)
      this.loadingVisible = false;
    });
  }
  getIDMDSeptiembre2025(){
    this.loadingVisible = true;
    this.ingresosService.getIngresosDetalladosMensualSep2025().subscribe(res => {
      this.arrIngresosSep2025 = res.data.resumen;
      this.arrDetalleSep2025 = res.data.detalle;
      //console.log(this.arrIngresosSep2025)
      this.loadingVisible = false;
    });
  }
  getIDMDOctubre2025(){
    this.loadingVisible = true;
    this.ingresosService.getIngresosDetalladosMensualOct2025().subscribe(res => {
      this.arrIngresosOct2025 = res.data.resumen;
      this.arrDetalleOct2025 = res.data.detalle;
      //console.log(this.arrIngresosOct2025)
      this.loadingVisible = false;
    });
  }
  getIDMDNoviembre2025(){
    this.loadingVisible = true;
    this.ingresosService.getIngresosDetalladosMensualNov2025().subscribe(res => {
      this.arrIngresosNov2025 = res.data.resumen;
      this.arrDetalleNov2025 = res.data.detalle;
      //console.log("NOVIEMBRE !!!!!! ",res.data)
      this.loadingVisible = false;
    });
  }
  getIDMDDiciembre2025(){
    this.loadingVisible = true;
    this.ingresosService.getIngresosDetalladosMensualDic2025().subscribe(res => {
      this.arrIngresosDic2025 = res.data.resumen;
      this.arrDetalleDic2025 = res.data.detalle;
      //console.log("NOVIEMBRE !!!!!! ",res.data)
      this.loadingVisible = false;
    });
  }

  /*=======================LLamadas GET 2026==========================*/
  getIDMDEnero2026(){
    this.loadingVisible = true;
    this.ingresosService.getIngresosDetalladosMensualEne2026().subscribe(res => {
      this.arrIngresosEne2026 = res.data.resumen;
      this.arrDetalleEne2026 = res.data.detalle;
      //console.log(this.arrIngresosEne2026)
      this.loadingVisible = false;
    });
  }
  getIDMDFebrero2026(){
    //this.loadingVisible = true;
    this.ingresosService.getIngresosDetalladosMensualFeb2026().subscribe(res => {
      this.arrIngresosFeb2026 = res.data.resumen;
      this.arrDetalleFeb2026 = res.data.detalle;
      //console.log(this.arrIngresosFeb2026)
      //this.loadingVisible = false;
    });
  }

  getIDMDMarzo2026(){
   // this.loadingVisible = true;
    this.ingresosService.getIngresosDetalladosMensualMar2026().subscribe(res => {
      this.arrIngresosMar2026 = res.data.resumen;
      this.arrDetalleMar2026 = res.data.detalle;
      console.log(this.arrIngresosMar2025)
     // this.loadingVisible = false;
    });
  }
   getIDMDAbril2026(){
     //this.loadingVisible = true;
     this.ingresosService.getIngresosDetalladosMensualAbr2026().subscribe(res => {
       this.arrIngresosAbr2026 = res.data.resumen;
       this.arrDetalleAbr2026 = res.data.detalle;
       //console.log(this.arrIngresosMar2025)
       //this.loadingVisible = false;
     });
   }
   getIDMDMayo2026(){
     this.loadingVisible = true;
     this.ingresosService.getIngresosDetalladosMensualMay2026().subscribe(res => {
       this.arrIngresosMay2026 = res.data.resumen;
       this.arrDetalleMay2026 = res.data.detalle;
  //  //   console.log(this.arrDetalleMay2025)
       this.loadingVisible = false;
     });
   }
   getIDMDJunio2026(){
     this.loadingVisible = true;
     this.ingresosService.getIngresosDetalladosMensualJun2026().subscribe(res => {
       this.arrIngresosJun2026 = res.data.resumen;
     this.arrDetalleJun2026 = res.data.detalle;
       //console.log(this.arrDetalleMay2025)
       this.loadingVisible = false;
     });
   }
  // getIDMDJulio2026(){
  //   this.loadingVisible = true;
  //   this.ingresosService.getIngresosDetalladosMensualJul2026().subscribe(res => {
  //     this.arrIngresosJul2026 = res.data.resumen;
  //     this.arrDetalleJul2026 = res.data.detalle;
  //     //console.log(this.arrDetalleMay2025)
  //     this.loadingVisible = false;
  //   });
  // }
  // getIDMDAgosto2026(){
  //   this.loadingVisible = true;
  //   this.ingresosService.getIngresosDetalladosMensualAgo2026().subscribe(res => {
  //     this.arrIngresosAgo2026 = res.data.resumen;
  //     this.arrDetalleAgo2026 = res.data.detalle;
  //     // console.log(this.arrDetalleAgo2025)
  //     this.loadingVisible = false;
  //   });
  // }
  // getIDMDSeptiembre2026(){
  //   this.loadingVisible = true;
  //   this.ingresosService.getIngresosDetalladosMensualSep2026().subscribe(res => {
  //     this.arrIngresosSep2026 = res.data.resumen;
  //     this.arrDetalleSep2026 = res.data.detalle;
  //     //console.log(this.arrIngresosSep2025)
  //     this.loadingVisible = false;
  //   });
  // }
  // getIDMDOctubre2026(){
  //   this.loadingVisible = true;
  //   this.ingresosService.getIngresosDetalladosMensualOct2026().subscribe(res => {
  //     this.arrIngresosOct2026 = res.data.resumen;
  //     this.arrDetalleOct2026 = res.data.detalle;
  //     //console.log(this.arrIngresosOct2025)
  //     this.loadingVisible = false;
  //   });
  // }
  // getIDMDNoviembre2026(){
  //   this.loadingVisible = true;
  //   this.ingresosService.getIngresosDetalladosMensualNov2026().subscribe(res => {
  //     this.arrIngresosNov2026 = res.data.resumen;
  //     this.arrDetalleNov2026 = res.data.detalle;
  //     //console.log("NOVIEMBRE !!!!!! ",res.data)
  //     this.loadingVisible = false;
  //   });
  // }
  // getIDMDDiciembre2026(){
  //   this.loadingVisible = true;
  //   this.ingresosService.getIngresosDetalladosMensualDic2026().subscribe(res => {
  //     this.arrIngresosDic2026 = res.data.resumen;
  //     this.arrDetalleDic2026 = res.data.detalle;
  //     //console.log("NOVIEMBRE !!!!!! ",res.data)
  //     this.loadingVisible = false;
  //   });
  // }

  Actualizar(e: any){
    this.loadingVisible = true;
    this.getIDMDEnero2026();
    // this.getIDMDFebrero2026();
    // this.getIDMDMarzo2026();
    // this.getIDMDAbril2026();
    // this.getIDMDMayo2026();
    // this.getIDMDJunio2026();
    // this.getIDMDJulio2026();
    // this.getIDMDAgosto2026();
    // this.getIDMDSeptiembre2026();
    // this.getIDMDOctubre2026();
    // this.getIDMDNoviembre2026();
    // this.getIDMDDiciembre2026();
  }

  getData2025(e: any){
    this.getIDMDEnero2025();
    this.getIDMDFebrero2025();
    this.getIDMDMarzo2025();
    this.getIDMDAbril2025();
    this.getIDMDMayo2025();
    this.getIDMDJunio2025();
    this.getIDMDJulio2025();
    this.getIDMDAgosto2025();
    this.getIDMDSeptiembre2025();
    this.getIDMDOctubre2025();
    this.getIDMDNoviembre2025();
    this.getIDMDDiciembre2025();
  }

  getData2024(e: any){
    this.getIDMDEnero2024();
    this.getIDMDFebrero2024();
    this.getIDMDMarzo2024();
    this.getIDMDAbril2024();
    this.getIDMDMayo2024();
    this.getIDMDJunio2024();
    this.getIDMDJulio2024();
    this.getIDMDAgosto2024();
    this.getIDMDSeptiembre2024();
    this.getIDMDOctubre2024();
    this.getIDMDNoviembre2024();
    this.getIDMDDiciembre2024();
  }

  getData2023(e: any){
    this.getIDMMarzo();
    this.getIDMAbril();
    this.getIDMMayo();
    this.getIDMJunio();
    this.getIDMJulio();
    this.getIDMAgosto();
    this.getIDMSeptiembre();
    this.getIDMOctubre();
    this.getIDMNoviembre();
    this.getIDMDiciembre();
  }



  onRowPrepared(e: any) {
    
    if (e.rowType == 'data') {

      e.cells.forEach((c: any) => {

        // if (c.value && c.value.toString().startsWith('-')) {
        //   c.cellElement.style.color = "red";
        // }

        if (c.cellElement) {
          // if (c.columnIndex == 15){
          //   c.cellElement.style.fontWeight = "bolder";
          //   c.cellElement.style.fontSize = "15px";
          //   c.cellElement.style.background = "#f5f5f5";
          // }
        }
      });
    }

    if (e.rowType == 'group') {


      e.cells.forEach((c: any) => {

          //poner en rojo negativos
          if (c.summaryCells && c.summaryCells[6][0].value.toString().startsWith('-')) {
            c.cellElement.style.color = "red";
          }

          //negrita columna margen utilidad
          if (c.columnIndex == 9  || c.columnIndex == 12) {
            //c.cellElement.style.fontWeight = "bolder";
            //c.cellElement.style.fontSize = "14px";
            //c.cellElement.style.background = "#f5f5f5";
            //c.cellElement.style.color = "red";
          }

          
      });

    }
  }

onRowPreparedOct(e: any) {
    
  if (e.rowType == 'data') {

    e.cells.forEach((c: any) => {

      if (c.value && c.value.toString().startsWith('-')) {
        if(c.cellElement?.style !== undefined){
          c.cellElement.style.color = "red";
        }

      }

      if (c.cellElement) {
        if(c.columnIndex == 2){
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.fontSize = "15px";
        }

        if(c.columnIndex == 3){
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.fontSize = "15px";
        }

        if(c.columnIndex == 4){
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.fontSize = "15px";
        }

        if(c.columnIndex == 5){
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.fontSize = "15px";
        }

        if(c.columnIndex == 6){
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.fontSize = "15px";
        }

        if(c.columnIndex == 7){
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.fontSize = "15px";
          c.cellElement.style.background = "#cdcbcb";
        }

        if(c.columnIndex == 11){
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.fontSize = "15px";
          c.cellElement.style.background = "#cdcbcb";
        }

        if (c.columnIndex == 16){
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.fontSize = "15px";
          c.cellElement.style.background = "#cdcbcb";
        }


      }
    });
  }

  if (e.rowType == 'totalFooter') {
    e.cells.forEach((c: any) => {

      if(c.columnIndex == 7){
        c.cellElement.style.fontWeight = "bolder";
        c.cellElement.style.fontSize = "15px";
        // c.cellElement.style.background = "#cdcbcb";
      }

      if(c.columnIndex == 11){
        c.cellElement.style.fontWeight = "bolder";
        c.cellElement.style.fontSize = "15px";
        // c.cellElement.style.background = "#cdcbcb";
      }

      if(c.columnIndex == 16){
        c.cellElement.style.fontWeight = "bolder";
        c.cellElement.style.fontSize = "15px";
        // c.cellElement.style.background = "#cdcbcb";
      }


    });
  }

}

onCellPreparedOct(e: any){

  if (e.rowType === 'groupFooter'){

    e.cellElement.style.background = "#cdcbcb";

    if(e.columnIndex == 2){
      e.cellElement.style.fontWeight = "bolder";
      e.cellElement.style.fontSize = "15px";

      if (e.row.summaryCells[2][0].value.toString().startsWith('-')) {
        e.cellElement.querySelector(".dx-datagrid-summary-item").style.color = '#ff0000';
        }
    }

    if(e.columnIndex == 3){
      e.cellElement.style.fontWeight = "bolder";
      e.cellElement.style.fontSize = "15px";
    }

    if(e.columnIndex == 4){
      e.cellElement.style.fontWeight = "bolder";
      e.cellElement.style.fontSize = "15px";

      if (e.row.summaryCells[4][0].value.toString().startsWith('-')) {
        e.cellElement.querySelector(".dx-datagrid-summary-item").style.color = '#ff0000';
      }
    }

    if(e.columnIndex == 5){
      e.cellElement.style.fontWeight = "bolder";
      e.cellElement.style.fontSize = "15px";

      if (e.row.summaryCells[5][0].value.toString().startsWith('-')) {
        e.cellElement.querySelector(".dx-datagrid-summary-item").style.color = '#ff0000';
      }
    }

    if(e.columnIndex == 6){
      e.cellElement.style.fontWeight = "bolder";
      e.cellElement.style.fontSize = "15px";

      if (e.row.summaryCells[6][0].value.toString().startsWith('-')) {
        e.cellElement.querySelector(".dx-datagrid-summary-item").style.color = '#ff0000';
      }
    }

    if(e.columnIndex == 7){
      e.cellElement.style.fontWeight = "bolder";
      e.cellElement.style.fontSize = "15px";
      e.cellElement.style.background = "#cdcbcb";
      e.cellElement.style.color = "#ff0000";

      if (e.row.summaryCells[7][0].value.toString().startsWith('-')) {
      e.cellElement.querySelector(".dx-datagrid-summary-item").style.color = '#ff0000';
      }
    }

    if(e.columnIndex == 8){
      e.cellElement.style.fontWeight = "bolder";
      e.cellElement.style.fontSize = "15px";
    }

    if(e.columnIndex == 9){
      e.cellElement.style.fontWeight = "bolder";
      e.cellElement.style.fontSize = "15px";
    }

    if(e.columnIndex == 10){
      e.cellElement.style.fontWeight = "bolder";
      e.cellElement.style.fontSize = "15px";
    }

    if(e.columnIndex == 11){
      e.cellElement.style.fontWeight = "bolder";
      e.cellElement.style.fontSize = "15px";
      e.cellElement.style.background = "#cdcbcb";
    }

    if(e.columnIndex == 12){
      if (e.row.summaryCells[12][0].value.toString().startsWith('-')) {
        e.cellElement.querySelector(".dx-datagrid-summary-item").style.color = '#ff0000';
      }
    }

    if(e.columnIndex == 14){
      if (e.row.summaryCells[14][0].value.toString().startsWith('-')) {
        e.cellElement.querySelector(".dx-datagrid-summary-item").style.color = '#ff0000';
      }
    }

    if(e.columnIndex == 16){
      if (e.row.summaryCells[16][0].value.toString().startsWith('-')) {
        e.cellElement.querySelector(".dx-datagrid-summary-item").style.color = '#ff0000';
      }

      e.cellElement.style.fontWeight = "bolder";
      e.cellElement.style.fontSize = "15px";
      e.cellElement.style.background = "#cdcbcb";
    }    
    
  }

  if (e.rowType == 'totalFooter') {
    if(e.columnIndex == 2){
      e.cellElement.style.fontWeight = "bolder";
      e.cellElement.style.fontSize = "15px";

      if (e.summaryItems[0].value.toString().startsWith('-')) {
        e.cellElement.querySelector(".dx-datagrid-summary-item").style.color = '#ff0000';
     }
    }

    if(e.columnIndex == 3){
      e.cellElement.style.fontWeight = "bolder";
      e.cellElement.style.fontSize = "15px";
    } 

    if(e.columnIndex == 4){
      e.cellElement.style.fontWeight = "bolder";
      e.cellElement.style.fontSize = "15px";

      if (e.summaryItems[0].value.toString().startsWith('-')) {
         e.cellElement.querySelector(".dx-datagrid-summary-item").style.color = '#ff0000';
      }
    }

    if(e.columnIndex == 5){
      e.cellElement.style.fontWeight = "bolder";
      e.cellElement.style.fontSize = "15px";

      if (e.summaryItems[0].value.toString().startsWith('-')) {
         e.cellElement.querySelector(".dx-datagrid-summary-item").style.color = '#ff0000';
      }
    }

    if(e.columnIndex == 6){
      e.cellElement.style.fontWeight = "bolder";
      e.cellElement.style.fontSize = "15px";

      if (e.summaryItems[0].value.toString().startsWith('-')) {
         e.cellElement.querySelector(".dx-datagrid-summary-item").style.color = '#ff0000';
      }
    }

    if(e.columnIndex == 7){
      if (e.summaryItems[0].value.toString().startsWith('-')) {
        e.cellElement.querySelector(".dx-datagrid-summary-item").style.color = '#ff0000';
     }
     
      e.cellElement.style.fontWeight = "bolder";
      e.cellElement.style.fontSize = "15px";
    }

    if(e.columnIndex == 8){
      e.cellElement.style.fontWeight = "bolder";
      e.cellElement.style.fontSize = "15px";
    }

    if(e.columnIndex == 9){
      e.cellElement.style.fontWeight = "bolder";
      e.cellElement.style.fontSize = "15px";
    }

    if(e.columnIndex == 10){
      e.cellElement.style.fontWeight = "bolder";
      e.cellElement.style.fontSize = "15px";
    }

    if(e.columnIndex == 11){
      e.cellElement.style.fontWeight = "bolder";
      e.cellElement.style.fontSize = "15px";
    }

    if(e.columnIndex == 12){
      if (e.summaryItems[0].value.toString().startsWith('-')) {
         e.cellElement.querySelector(".dx-datagrid-summary-item").style.color = '#ff0000';
      }
    }

    if(e.columnIndex == 14){
      if (e.summaryItems[0].value.toString().startsWith('-')) {
         e.cellElement.querySelector(".dx-datagrid-summary-item").style.color = '#ff0000';
      }
    }

    if(e.columnIndex == 16){
      if (e.summaryItems[0].value.toString().startsWith('-')) {
         e.cellElement.querySelector(".dx-datagrid-summary-item").style.color = '#ff0000';
      }
    }


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

customizeOct(e) {  
  var gridCell = e.gridCell;
  if (gridCell.rowType === 'data') {

    if(e.gridCell.column.dataField !== 'tipoOperacion'){
      var x = Math.round(e.value)

      var myvalue = Math.trunc(x);
      var myFormat = myvalue.toString().split(".");
      myFormat[0] = myFormat[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      e.value = '$ '+myFormat;
    }

    if(e.gridCell.column.dataField == "facturadoProvision"){
      e.fontWeight = "bolder"
      e.font = {bold: true}

      if(e.gridCell.value.toString().startsWith('-')){
        e.font.color = '#ff0000'
      }
    }

    if(e.gridCell.column.dataField == "refacturado"){
      e.fontWeight = "bolder"
      e.font = {bold: true}
    }

    if(e.gridCell.column.dataField == "cancelacionProvision"){
      e.fontWeight = "bolder"
      e.font = {bold: true}

      if(e.gridCell.value.toString().startsWith('-')){
        e.font.color = '#ff0000'
      }
    }

    if(e.gridCell.column.dataField == "maSolicitudCancelacion"){
      e.fontWeight = "bolder"
      e.font = {bold: true}

      if(e.gridCell.value.toString().startsWith('-')){
        e.font.color = '#ff0000'
      }
    }

    if(e.gridCell.column.dataField == "maCancelacionOtros"){
      e.fontWeight = "bolder"
      e.font = {bold: true}

      if(e.gridCell.value.toString().startsWith('-')){
        e.font.color = '#ff0000'
      }
    }

    if(e.gridCell.column.dataField == "maTotal"){
      e.backgroundColor = "#DCDCDC";
      e.fontWeight = "bolder"
      e.font = {bold: true}

      if(e.gridCell.value.toString().startsWith('-')){
        e.font.color = '#ff0000'
      }
    }

    if(e.gridCell.column.dataField == "totalFlete"){
      e.backgroundColor = "#DCDCDC";
    }

    if(e.gridCell.column.dataField == "maTotal2"){
      if(e.gridCell.value.toString().startsWith('-')){
        e.font.color = '#ff0000'
      }
    }

    if(e.gridCell.column.dataField == "notasCredito"){
      if(e.gridCell.value.toString().startsWith('-')){
        e.font.color = '#ff0000'
      }
    }

    if(e.gridCell.column.dataField == "total"){
      e.backgroundColor = "#DCDCDC";
    }
  }

  if (gridCell.rowType === 'groupFooter') {
    
    e.backgroundColor = "#DCDCDC";
    e.fontWeight = "bolder"
    e.font = {bold: true}

    if(e.gridCell.column.dataField == "facturadoProvision"){
      if(e.gridCell.value.toString().startsWith('-')){
        e.font.color = '#ff0000'
      }
    }

    if(e.gridCell.column.dataField == "cancelacionProvision"){
      if(e.gridCell.value.toString().startsWith('-')){
        e.font.color = '#ff0000'
      }
    }

    if(e.gridCell.column.dataField == "maSolicitudCancelacion"){
      if(e.gridCell.value.toString().startsWith('-')){
        e.font.color = '#ff0000'
      }
    }

    if(e.gridCell.column.dataField == "maCancelacionOtros"){
      if(e.gridCell.value.toString().startsWith('-')){
        e.font.color = '#ff0000'
      }
    }

    if(e.gridCell.column.dataField == "maTotal"){
      e.backgroundColor = "#DCDCDC";

      if(e.gridCell.value.toString().startsWith('-')){
        e.font.color = '#ff0000'
      }
    }

    if(e.gridCell.column.dataField == "maTotal2"){
      if(e.gridCell.value.toString().startsWith('-')){
        e.font.color = '#ff0000'
      }
    }

    if(e.gridCell.column.dataField == "notasCredito"){
      if(e.gridCell.value.toString().startsWith('-')){
        e.font.color = '#ff0000'
      }
    }

  }

  if (gridCell.rowType === 'totalFooter') {
      
    e.backgroundColor = "#ff9460";
    e.fontWeight = "bolder"
    e.font = {bold: true}

    if(e.gridCell.column.dataField == "facturadoProvision"){
      if(e.gridCell.value.toString().startsWith('-')){
        e.font.color = '#ff0000'
      }
    }

    if(e.gridCell.column.dataField == "cancelacionProvision"){
      if(e.gridCell.value.toString().startsWith('-')){
        e.font.color = '#ff0000'
      }
    }

    if(e.gridCell.column.dataField == "maSolicitudCancelacion"){
      if(e.gridCell.value.toString().startsWith('-')){
        e.font.color = '#ff0000'
      }
    }

    if(e.gridCell.column.dataField == "maCancelacionOtros"){
      if(e.gridCell.value.toString().startsWith('-')){
        e.font.color = '#ff0000'
      }
    }

    if(e.gridCell.column.dataField == "maTotal"){
      // e.backgroundColor = "#DCDCDC";

      if(e.gridCell.value.toString().startsWith('-')){
        e.font.color = '#ff0000'
      }
    }

    if(e.gridCell.column.dataField == "maTotal2"){
      if(e.gridCell.value.toString().startsWith('-')){
        e.font.color = '#ff0000'
      }
    }

    if(e.gridCell.column.dataField == "notasCredito"){
      if(e.gridCell.value.toString().startsWith('-')){
        e.font.color = '#ff0000'
      }
    }
  }
}

onRowPreparedSep(e: any) {
    
  if (e.rowType == 'data') {

    e.cells.forEach((c: any) => {

      if (c.value && c.value.toString().startsWith('-')) {
        if(c.cellElement?.style !== undefined){
          c.cellElement.style.color = "red";
        }

      }

      if (c.cellElement) {
        if(c.columnIndex == 2){
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.fontSize = "15px";
        }

        if(c.columnIndex == 3){
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.fontSize = "15px";
        }

        if(c.columnIndex == 4){
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.fontSize = "15px";
        }

        if(c.columnIndex == 5){
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.fontSize = "15px";
        }

        if(c.columnIndex == 6){
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.fontSize = "15px";
        }

        if(c.columnIndex == 7){
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.fontSize = "15px";
        }

        if(c.columnIndex == 8){
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.fontSize = "15px";
          c.cellElement.style.background = "#cdcbcb";
        }

        if(c.columnIndex == 13){
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.fontSize = "15px";
          c.cellElement.style.background = "#cdcbcb";
        }

        if (c.columnIndex == 18){
          c.cellElement.style.fontWeight = "bolder";
          c.cellElement.style.fontSize = "15px";
          c.cellElement.style.background = "#cdcbcb";
        }


      }
    });
  }

  if (e.rowType == 'totalFooter') {
    e.cells.forEach((c: any) => {

      if(c.columnIndex == 8){
        c.cellElement.style.fontWeight = "bolder";
        c.cellElement.style.fontSize = "15px";
        // c.cellElement.style.background = "#cdcbcb";
      }

      if(c.columnIndex == 13){
        c.cellElement.style.fontWeight = "bolder";
        c.cellElement.style.fontSize = "15px";
        // c.cellElement.style.background = "#cdcbcb";
      }

      if(c.columnIndex == 18){
        c.cellElement.style.fontWeight = "bolder";
        c.cellElement.style.fontSize = "15px";
        // c.cellElement.style.background = "#cdcbcb";
      }


    });
  }

}

onCellPreparedSep(e: any){

  if (e.rowType === 'groupFooter'){

    e.cellElement.style.background = "#cdcbcb";

    if(e.columnIndex == 2){
      e.cellElement.style.fontWeight = "bolder";
      e.cellElement.style.fontSize = "15px";

      if (e.row.summaryCells[2][0].value.toString().startsWith('-')) {
        e.cellElement.querySelector(".dx-datagrid-summary-item").style.color = '#ff0000';
      }
    }

    if(e.columnIndex == 3){
      e.cellElement.style.fontWeight = "bolder";
      e.cellElement.style.fontSize = "15px";

      if (e.row.summaryCells[3][0].value.toString().startsWith('-')) {
        e.cellElement.querySelector(".dx-datagrid-summary-item").style.color = '#ff0000';
      }
    }

    if(e.columnIndex == 4){
      e.cellElement.style.fontWeight = "bolder";
      e.cellElement.style.fontSize = "15px";

      if (e.row.summaryCells[4][0].value.toString().startsWith('-')) {
        e.cellElement.querySelector(".dx-datagrid-summary-item").style.color = '#ff0000';
      }
    }

    if(e.columnIndex == 5){
      e.cellElement.style.fontWeight = "bolder";
      e.cellElement.style.fontSize = "15px";

      if (e.row.summaryCells[5][0].value.toString().startsWith('-')) {
        e.cellElement.querySelector(".dx-datagrid-summary-item").style.color = '#ff0000';
      }
    }

    if(e.columnIndex == 6){
      e.cellElement.style.fontWeight = "bolder";
      e.cellElement.style.fontSize = "15px";

      if (e.row.summaryCells[6][0].value.toString().startsWith('-')) {
        e.cellElement.querySelector(".dx-datagrid-summary-item").style.color = '#ff0000';
      }
    }

    if(e.columnIndex == 8){
      e.cellElement.style.fontWeight = "bolder";
      e.cellElement.style.fontSize = "15px";
      e.cellElement.style.background = "#cdcbcb";
      e.cellElement.style.color = "#ff0000";

      if (e.row.summaryCells[8][0].value.toString().startsWith('-')) {
      e.cellElement.querySelector(".dx-datagrid-summary-item").style.color = '#ff0000';
      }
    }

    if(e.columnIndex == 9){
      e.cellElement.style.fontWeight = "bolder";
      e.cellElement.style.fontSize = "15px";
    }

    if(e.columnIndex == 10){
      e.cellElement.style.fontWeight = "bolder";
      e.cellElement.style.fontSize = "15px";
    }

    if(e.columnIndex == 11){
      e.cellElement.style.fontWeight = "bolder";
      e.cellElement.style.fontSize = "15px";
    }

    if(e.columnIndex == 13){
      e.cellElement.style.fontWeight = "bolder";
      e.cellElement.style.fontSize = "15px";
      e.cellElement.style.background = "#cdcbcb";
    }

    if(e.columnIndex == 14){
      if (e.row.summaryCells[14][0].value.toString().startsWith('-')) {
        e.cellElement.querySelector(".dx-datagrid-summary-item").style.color = '#ff0000';
      }
    }

    if(e.columnIndex == 16){
      if (e.row.summaryCells[16][0].value.toString().startsWith('-')) {
        e.cellElement.querySelector(".dx-datagrid-summary-item").style.color = '#ff0000';
      }
    }

    if(e.columnIndex == 18){
      if (e.row.summaryCells[18][0].value.toString().startsWith('-')) {
        e.cellElement.querySelector(".dx-datagrid-summary-item").style.color = '#ff0000';
      }

      e.cellElement.style.fontWeight = "bolder";
      e.cellElement.style.fontSize = "15px";
      e.cellElement.style.background = "#cdcbcb";
    }    
    
  }

  if (e.rowType == 'totalFooter') {
    if(e.columnIndex == 2){
      e.cellElement.style.fontWeight = "bolder";
      e.cellElement.style.fontSize = "15px";

      if (e.summaryItems[0].value.toString().startsWith('-')) {
        e.cellElement.querySelector(".dx-datagrid-summary-item").style.color = '#ff0000';
     }
    }

    if(e.columnIndex == 3){
      e.cellElement.style.fontWeight = "bolder";
      e.cellElement.style.fontSize = "15px";
    
      if (e.summaryItems[0].value.toString().startsWith('-')) {
        e.cellElement.querySelector(".dx-datagrid-summary-item").style.color = '#ff0000';
     }
    } 

    if(e.columnIndex == 4){
      e.cellElement.style.fontWeight = "bolder";
      e.cellElement.style.fontSize = "15px";

      if (e.summaryItems[0].value.toString().startsWith('-')) {
         e.cellElement.querySelector(".dx-datagrid-summary-item").style.color = '#ff0000';
      }
    }

    if(e.columnIndex == 5){
      e.cellElement.style.fontWeight = "bolder";
      e.cellElement.style.fontSize = "15px";

      if (e.summaryItems[0].value.toString().startsWith('-')) {
         e.cellElement.querySelector(".dx-datagrid-summary-item").style.color = '#ff0000';
      }
    }

    if(e.columnIndex == 6){
      e.cellElement.style.fontWeight = "bolder";
      e.cellElement.style.fontSize = "15px";

      if (e.summaryItems[0].value.toString().startsWith('-')) {
         e.cellElement.querySelector(".dx-datagrid-summary-item").style.color = '#ff0000';
      }
    }

    if(e.columnIndex == 8){
      if (e.summaryItems[0].value.toString().startsWith('-')) {
        e.cellElement.querySelector(".dx-datagrid-summary-item").style.color = '#ff0000';
     }
     
      e.cellElement.style.fontWeight = "bolder";
      e.cellElement.style.fontSize = "15px";
    }

    if(e.columnIndex == 9){
      e.cellElement.style.fontWeight = "bolder";
      e.cellElement.style.fontSize = "15px";
    }

    if(e.columnIndex == 10){
      e.cellElement.style.fontWeight = "bolder";
      e.cellElement.style.fontSize = "15px";
    }

    if(e.columnIndex == 11){
      e.cellElement.style.fontWeight = "bolder";
      e.cellElement.style.fontSize = "15px";
    }

    if(e.columnIndex == 13){
      e.cellElement.style.fontWeight = "bolder";
      e.cellElement.style.fontSize = "15px";
    }

    if(e.columnIndex == 14){
      if (e.summaryItems[0].value.toString().startsWith('-')) {
         e.cellElement.querySelector(".dx-datagrid-summary-item").style.color = '#ff0000';
      }
    }

    if(e.columnIndex == 16){
      if (e.summaryItems[0].value.toString().startsWith('-')) {
         e.cellElement.querySelector(".dx-datagrid-summary-item").style.color = '#ff0000';
      }
    }

    if(e.columnIndex == 18){
      if (e.summaryItems[0].value.toString().startsWith('-')) {
         e.cellElement.querySelector(".dx-datagrid-summary-item").style.color = '#ff0000';
      }
    }


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

customizeSep(e) {  
  var gridCell = e.gridCell;
  if (gridCell.rowType === 'data') {

    if(e.gridCell.column.dataField !== 'tipoOperacion'){
      var x = Math.round(e.value)

      var myvalue = Math.trunc(x);
      var myFormat = myvalue.toString().split(".");
      myFormat[0] = myFormat[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");

      e.value = '$ '+myFormat;
    }

    if(e.gridCell.column.dataField == "facturadoProvision"){
      e.fontWeight = "bolder"
      e.font = {bold: true}

      if(e.gridCell.value.toString().startsWith('-')){
        e.font.color = '#ff0000'
      }
    }

    if(e.gridCell.column.dataField == "refacturado"){
      e.fontWeight = "bolder"
      e.font = {bold: true}
    }

    if(e.gridCell.column.dataField == "cancelacionProvision"){
      e.fontWeight = "bolder"
      e.font = {bold: true}

      if(e.gridCell.value.toString().startsWith('-')){
        e.font.color = '#ff0000'
      }
    }

    if(e.gridCell.column.dataField == "cancelacionProvisionOtrosIngresos"){
      e.fontWeight = "bolder"
      e.font = {bold: true}

      if(e.gridCell.value.toString().startsWith('-')){
        e.font.color = '#ff0000'
      }
    }

    if(e.gridCell.column.dataField == "maSolicitudCancelacion"){
      e.fontWeight = "bolder"
      e.font = {bold: true}

      if(e.gridCell.value.toString().startsWith('-')){
        e.font.color = '#ff0000'
      }
    }

    if(e.gridCell.column.dataField == "maCancelacionOtros"){
      e.fontWeight = "bolder"
      e.font = {bold: true}

      if(e.gridCell.value.toString().startsWith('-')){
        e.font.color = '#ff0000'
      }
    }

    if(e.gridCell.column.dataField == "maTotal"){
      e.backgroundColor = "#DCDCDC";
      e.fontWeight = "bolder"
      e.font = {bold: true}

      if(e.gridCell.value.toString().startsWith('-')){
        e.font.color = '#ff0000'
      }
    }

    if(e.gridCell.column.dataField == "totalFlete"){
      e.backgroundColor = "#DCDCDC";
    }

    if(e.gridCell.column.dataField == "maTotal2"){
      if(e.gridCell.value.toString().startsWith('-')){
        e.font.color = '#ff0000'
      }
    }

    if(e.gridCell.column.dataField == "notasCredito"){
      if(e.gridCell.value.toString().startsWith('-')){
        e.font.color = '#ff0000'
      }
    }

    if(e.gridCell.column.dataField == "total"){
      e.backgroundColor = "#DCDCDC";

      if(e.gridCell.value.toString().startsWith('-')){
        e.font.color = '#ff0000'
      }
    }
  }

  if (gridCell.rowType === 'groupFooter') {
    
    e.backgroundColor = "#DCDCDC";
    e.fontWeight = "bolder"
    e.font = {bold: true}

    if(e.gridCell.column.dataField == "facturadoProvision"){
      if(e.gridCell.value.toString().startsWith('-')){
        e.font.color = '#ff0000'
      }
    }

    if(e.gridCell.column.dataField == "cancelacionProvision"){
      if(e.gridCell.value.toString().startsWith('-')){
        e.font.color = '#ff0000'
      }
    }

    if(e.gridCell.column.dataField == "cancelacionProvisionOtrosIngresos"){
      if(e.gridCell.value.toString().startsWith('-')){
        e.font.color = '#ff0000'
      }
    }

    if(e.gridCell.column.dataField == "maSolicitudCancelacion"){
      if(e.gridCell.value.toString().startsWith('-')){
        e.font.color = '#ff0000'
      }
    }

    if(e.gridCell.column.dataField == "maCancelacionOtros"){
      if(e.gridCell.value.toString().startsWith('-')){
        e.font.color = '#ff0000'
      }
    }

    if(e.gridCell.column.dataField == "maTotal"){
      e.backgroundColor = "#DCDCDC";

      if(e.gridCell.value.toString().startsWith('-')){
        e.font.color = '#ff0000'
      }
    }

    if(e.gridCell.column.dataField == "maTotal2"){
      if(e.gridCell.value.toString().startsWith('-')){
        e.font.color = '#ff0000'
      }
    }

    if(e.gridCell.column.dataField == "notasCredito"){
      if(e.gridCell.value.toString().startsWith('-')){
        e.font.color = '#ff0000'
      }
    }

    if(e.gridCell.column.dataField == "total"){
      if(e.gridCell.value.toString().startsWith('-')){
        e.font.color = '#ff0000'
      }
    }

  }

  if (gridCell.rowType === 'totalFooter') {
      
    e.backgroundColor = "#ff9460";
    e.fontWeight = "bolder"
    e.font = {bold: true}

    if(e.gridCell.column.dataField == "facturadoProvision"){
      if(e.gridCell.value.toString().startsWith('-')){
        e.font.color = '#ff0000'
      }
    }

    if(e.gridCell.column.dataField == "cancelacionProvision"){
      if(e.gridCell.value.toString().startsWith('-')){
        e.font.color = '#ff0000'
      }
    }

    if(e.gridCell.column.dataField == "cancelacionProvisionOtrosIngresos"){
      if(e.gridCell.value.toString().startsWith('-')){
        e.font.color = '#ff0000'
      }
    }

    if(e.gridCell.column.dataField == "maSolicitudCancelacion"){
      if(e.gridCell.value.toString().startsWith('-')){
        e.font.color = '#ff0000'
      }
    }

    if(e.gridCell.column.dataField == "maCancelacionOtros"){
      if(e.gridCell.value.toString().startsWith('-')){
        e.font.color = '#ff0000'
      }
    }

    if(e.gridCell.column.dataField == "maTotal"){
      // e.backgroundColor = "#DCDCDC";

      if(e.gridCell.value.toString().startsWith('-')){
        e.font.color = '#ff0000'
      }
    }

    if(e.gridCell.column.dataField == "maTotal2"){
      if(e.gridCell.value.toString().startsWith('-')){
        e.font.color = '#ff0000'
      }
    }

    if(e.gridCell.column.dataField == "notasCredito"){
      if(e.gridCell.value.toString().startsWith('-')){
        e.font.color = '#ff0000'
      }
    }

    if(e.gridCell.column.dataField == "total"){
      if(e.gridCell.value.toString().startsWith('-')){
        e.font.color = '#ff0000'
      }
    }
  }
}

formating(value){
  var myvalue = Math.trunc(value);

  var myFormat = myvalue.toString().split(".");
  myFormat[0] = myFormat[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  

  return "$ "+myFormat.join("");
}

}