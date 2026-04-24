import { CotizacionModel, VariablesCotizacionModel, DetalleCotizacionModel, NuevaCotizacionModel } from './../../shared/models/cotizador/cotizador.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AbstractManagerService } from 'src/app/shared/services/abstractManagerService';
import { API_URLS } from 'src/app/shared/models/apiURL';


@Injectable({
  providedIn: 'root'
})
export class LiquidacionService extends AbstractManagerService {

  token: string = sessionStorage.getItem('token')!;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    })
  };

  arrCotizaciones: CotizacionModel[] = [];
  arrPreCotizaciones: CotizacionModel[] = [];
  arrVariables: VariablesCotizacionModel[] = [];
  arrDetalleCotizacion: DetalleCotizacionModel[] = [];
  arrClasificaciones: string[] = [];

  constructor(http: HttpClient,) {
    super(http)
    this.putInterfaceManager(this);
  }

 
  getLiquidacion(fecha: any){
    return this.get<any>((this.API_URL + API_URLS.GET_LIQUIDACION_MENSUALES+fecha), this.httpOptions);
  }

  getObservaciones(cvetra: number){
    return this.get<any>((this.API_URL + API_URLS.GET_OBSERVACIONES+cvetra), this.httpOptions);
  }

  getDetalleOperador(fecha: string, cvetra: number){
    return this.get<any>((this.API_URL + API_URLS.GET_DETALLES_OPERADOR+fecha+'/'+cvetra), this.httpOptions);
  }

  getBajas(fecha: any){
    console.log(fecha)
    return this.get<any>((this.API_URL + API_URLS.GET_MOTIVOS_BAJAS+fecha), this.httpOptions);
  }

  postObservaciones(cvetra: number, idusuario: string, observaciones: string){
    let body = {
      cvetra: cvetra,
      idusuario: idusuario,
      observaciones: observaciones
    }
    console.log(JSON.stringify(body))
    return this.post<any>((this.API_URL + API_URLS.POST_OBSERVACIONES), body, this.httpOptions);
  }
}
