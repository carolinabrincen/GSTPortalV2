import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AbstractManagerService } from 'src/app/shared/services/abstractManagerService';
import { API_URLS } from 'src/app/shared/models/apiURL';
import { IUser } from 'src/app/shared/services';

export class Sale {
  id: number | undefined;
  region: string | undefined;
  country: string| undefined;
  city: string | undefined;
  amount: number| undefined;
  date: Date| undefined;
}

export class Indicador {
    id: number | undefined;
    unidadNegocio: string | undefined;
    tipoOperacion: string | undefined;
    enero: number| undefined;
    febrero: number| undefined;
    marzo: number| undefined;
    abril: number| undefined;
    mayo: number| undefined;
    junio: number| undefined;
    julio: number| undefined;
    agosto: number| undefined;
    septiembre: number| undefined;
    octubre: number| undefined;
    noviembre: number| undefined;
    diciembre: number| undefined;
  }

  export class IndicadorGrafica {
    id: number | undefined;
    mes: string | undefined;
    cajaSeca: number| undefined;
    encortinado: number| undefined;
    gondola: number| undefined;
    gradoAliment: number| undefined;
    granel: number| undefined;
    otro: number| undefined;
    tolvaAcero: number| undefined;
  }

@Injectable()
export class ServiceSales extends AbstractManagerService{

  user!: IUser;
  token: string = sessionStorage.getItem('token')!;

  //  httpOptions = {headers: new HttpHeaders({'Content-Type': 'application/json'})};
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json', 
      'Authorization': 'Bearer ' + this.token
      
    })
  };

  cadena: string | undefined; 

  constructor(private router: Router, http: HttpClient) { 
    super(http);
 }

  // getSales() {
  //   return sales;
  // }
  
/*============================================================================
==================================Periodo 2023================================
==============================================================================*/
  getIndicadores(Anio: number, UnidadNegocio: number) {
      
    return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES + '/' + Anio + '/'+ UnidadNegocio),this.httpOptions);    
    
  }

  getIngresosDetalladosMensual( ) {
    
    return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_DETALLADO_enero),this.httpOptions);    
    
    
  }
  getIngresosDetalladosMensualFeb( ) {
    
    return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_DETALLADO_febrero),this.httpOptions);    
    
  }
  getIngresosDetalladosMensualMar( ) {
    
    return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_DETALLADO_marzo),this.httpOptions);    
    
  }
  getIngresosDetalladosMensualAbr( ) {
    
    return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_DETALLADO_abril),this.httpOptions);    
    
  }
  getIngresosDetalladosMensualMay( ) {
    
    return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_DETALLADO_mayo),this.httpOptions);    
    
  }
  getIngresosDetalladosMensualJun( ) {
    
    return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_DETALLADO_junio),this.httpOptions);    
    
  }
  getIngresosDetalladosMensualJul( ) {
    
    return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_DETALLADO_julio),this.httpOptions);    
    
  }  
  getIngresosDetalladosMensualAgo( ) {
    
    return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_DETALLADO_agosto),this.httpOptions);    
    
  }
  getIngresosDetalladosMensualSep( ) {
    
    return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_DETALLADO_septiembre),this.httpOptions);    
    
  }
  getIngresosDetalladosMensualOct( ) {
    
    return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_DETALLADO_octubre),this.httpOptions);    
    
  }
  getIngresosDetalladosMensualNov( ) {
    
    return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_DETALLADO_noviembre),this.httpOptions);    
    
  }
  getIngresosDetalladosMensualDic( ) {
    
    return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_DETALLADO_diciembre),this.httpOptions);    
    
  }
  
/*============================================================================
==================================Periodo 2024================================
==============================================================================*/
  getIndicadores2024(Anio: number, UnidadNegocio: number) {
      
    return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_2024 + '/' + Anio + '/'+ UnidadNegocio),this.httpOptions);    
    
  }

  getIngresosDetalladosMensualEne2024( ) {
    
    return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_DETALLADO_enero2024),this.httpOptions);    
    
  }
  getIngresosDetalladosMensualFeb2024( ) {
    
    return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_DETALLADO_febrero2024),this.httpOptions);    
    
  }
  getIngresosDetalladosMensualMar2024( ) {
    
    return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_DETALLADO_marzo2024),this.httpOptions);    
    
  }
  getIngresosDetalladosMensualAbr2024( ) {
    
    return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_DETALLADO_abril2024),this.httpOptions);    
    
  }
  getIngresosDetalladosMensualMay2024( ) {
    
    return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_DETALLADO_mayo2024),this.httpOptions);    
    
  }
  getIngresosDetalladosMensualJun2024( ) {
    
    return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_DETALLADO_junio2024),this.httpOptions);    
    
  }
  getIngresosDetalladosMensualJul2024( ) {
    
    return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_DETALLADO_julio2024),this.httpOptions);    
    
  }
  getIngresosDetalladosMensualAgo2024( ) {
    
    return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_DETALLADO_agosto2024),this.httpOptions);    
    
  }
  getIngresosDetalladosMensualSep2024( ) {
    
    return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_DETALLADO_septiembre2024),this.httpOptions);    
    
  }
  getIngresosDetalladosMensualOct2024( ) {
    
    return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_DETALLADO_octubre2024),this.httpOptions);    
    
  }
  getIngresosDetalladosMensualNov2024( ) {
    
    return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_DETALLADO_noviembre2024),this.httpOptions);    
    
  }
  getIngresosDetalladosMensualDic2024( ) {
    
    return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_DETALLADO_diciembre2024),this.httpOptions);    
    
  }
  
/*============================================================================
==================================Periodo 2025================================
==============================================================================*/
  getIndicadores2025(Anio: number, UnidadNegocio: number) {
      
    return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_2025 ),this.httpOptions);    
    
  }

  getIngresosDetalladosMensualEne2025( ) {
    
    return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_DETALLADO_enero2025),this.httpOptions);    
    
  }
  getIngresosDetalladosMensualFeb2025( ) {
    
    return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_DETALLADO_febrero2025),this.httpOptions);    
    
  }
  getIngresosDetalladosMensualMar2025( ) {
    
    return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_DETALLADO_marzo2025),this.httpOptions);    
    
  }
  getIngresosDetalladosMensualAbr2025( ) {
    
    return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_DETALLADO_abril2025),this.httpOptions);    
    
  }
  getIngresosDetalladosMensualMay2025( ) {
    
    return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_DETALLADO_mayo2025),this.httpOptions);    
    
  }
  getIngresosDetalladosMensualJun2025( ) {
    
    return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_DETALLADO_junio2025),this.httpOptions);    
    
  }
  getIngresosDetalladosMensualJul2025( ) {
    
    return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_DETALLADO_julio2025),this.httpOptions);    
    
  }
  getIngresosDetalladosMensualAgo2025( ) {
    
    return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_DETALLADO_agosto2025),this.httpOptions);    
    
  }
  getIngresosDetalladosMensualSep2025( ) {
    
    return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_DETALLADO_septiembre2025),this.httpOptions);    
    
  }
  getIngresosDetalladosMensualOct2025( ) {
    
    return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_DETALLADO_octubre2025),this.httpOptions);    
    
  }
  getIngresosDetalladosMensualNov2025( ) {
    
    return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_DETALLADO_noviembre2025),this.httpOptions);    
    
  }
  getIngresosDetalladosMensualDic2025( ) {
    
    return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_DETALLADO_diciembre2025),this.httpOptions);    
    
  }

/*============================================================================
==================================Periodo 2026================================
==============================================================================*/
  getIndicadores2026(Anio: number, UnidadNegocio: number) {
      
    return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_2026 ),this.httpOptions);    
    
  }

  getIngresosDetalladosMensualEne2026( ) {
    
    return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_DETALLADO_enero2026),this.httpOptions);    
    
  }
  getIngresosDetalladosMensualFeb2026( ) {
    
    return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_DETALLADO_febrero2026),this.httpOptions);    
    
  }
  getIngresosDetalladosMensualMar2026( ) {
    
    return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_DETALLADO_marzo2026),this.httpOptions);    
    
  }
   getIngresosDetalladosMensualAbr2026( ) {
    
     return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_DETALLADO_abril2026),this.httpOptions);    
    
   }
   getIngresosDetalladosMensualMay2026( ) {
    
     return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_DETALLADO_mayo2026),this.httpOptions);    
    
   }
  // getIngresosDetalladosMensualJun2026( ) {
    
  //   return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_DETALLADO_junio2026),this.httpOptions);    
    
  // }
  // getIngresosDetalladosMensualJul2026( ) {
    
  //   return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_DETALLADO_julio2026),this.httpOptions);    
    
  // }
  // getIngresosDetalladosMensualAgo2026( ) {
    
  //   return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_DETALLADO_agosto2026),this.httpOptions);    
    
  // }
  // getIngresosDetalladosMensualSep2026( ) {
    
  //   return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_DETALLADO_septiembre2026),this.httpOptions);    
    
  // }
  // getIngresosDetalladosMensualOct2026( ) {
    
  //   return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_DETALLADO_octubre2026),this.httpOptions);    
    
  // }
  // getIngresosDetalladosMensualNov2026( ) {
    
  //   return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_DETALLADO_noviembre2026),this.httpOptions);    
    
  // }
  // getIngresosDetalladosMensualDic2026( ) {
    
  //   return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_DETALLADO_diciembre2026),this.httpOptions);    
    
  // }



  getIndicadoresGrafica(Anio: number, UnidadNegocio: number) {
    return this.get<any>((this.API_URL + API_URLS.GET_INGRESOS_ANUALES_CHART + '/' + Anio + '/'+ UnidadNegocio),this.httpOptions);    
  }

  getKms(Anio: number, UnidadNegocio: number) {
    
    return this.get<any>((this.API_URL + API_URLS.GET_KMS_ANUALES + '/' + Anio + '/'+ UnidadNegocio),this.httpOptions);    
    
  }

  getKmsGrafica(Anio: number, UnidadNegocio: number) {
    return this.get<any>((this.API_URL + API_URLS.GET_KMS_ANUALES_CHART + '/' + Anio + '/'+ UnidadNegocio),this.httpOptions);    
  }

  getViajes(Anio: number, UnidadNegocio: number) {
    
    return this.get<any>((this.API_URL + API_URLS.GET_VIAJES_ANUALES + '/' + Anio + '/'+ UnidadNegocio),this.httpOptions);    
    
  }

  getViajesGrafica(Anio: number, UnidadNegocio: number) {
    return this.get<any>((this.API_URL + API_URLS.GET_VIAJES_ANUALES_CHART + '/' + Anio + '/'+ UnidadNegocio),this.httpOptions);    
  }

  getToneladas(Anio: number, UnidadNegocio: number) {
    
    return this.get<any>((this.API_URL + API_URLS.GET_TONELADAS_ANUALES + '/' + Anio + '/'+ UnidadNegocio),this.httpOptions);    
    
  }

  getToneladasGrafica(Anio: number, UnidadNegocio: number) {
    return this.get<any>((this.API_URL + API_URLS.GET_TONELADAS_ANUALES_CHART + '/' + Anio + '/'+ UnidadNegocio),this.httpOptions);    
  }

  getReporte() {

    return this.post<any>((this.API_URL + API_URLS.GET_Rentabilidad_Contable), JSON.stringify('{"anio": 2022, "mes": 1,"idTracto": "","unidadesNegocio": [1]}'),this.httpOptions);    
  }
}
