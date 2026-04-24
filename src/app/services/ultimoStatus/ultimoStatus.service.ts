import { CotizacionModel, VariablesCotizacionModel, DetalleCotizacionModel, NuevaCotizacionModel } from './../../shared/models/cotizador/cotizador.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AbstractManagerService } from 'src/app/shared/services/abstractManagerService';
import { API_URLS } from 'src/app/shared/models/apiURL';


@Injectable({
  providedIn: 'root'
})
export class UltimoStatusService extends AbstractManagerService {

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

  getClasificaciones() {
    this.arrClasificaciones = [];
    this.arrClasificaciones.push("CAJA SECA", "FULL (VARIOS)", "SENCILLOS");
    return this.arrClasificaciones;
  }


  getUltimoSt(idArea, idOperacion) {
    return this.get<any>(this.API_URL + API_URLS.GET_ULTIMO_STATUS+idArea+'/'+idOperacion, this.httpOptions);
  }

  getDetalleViaje(idArea: number, noViaje: number) {
    console.log(idArea, noViaje)
    return this.get<any>(this.API_URL + API_URLS.GET_DETALLE_VIAJE+idArea+'/'+noViaje, this.httpOptions);
  }

  getDetalleViajeVV(idArea: number, noViaje: number) {
    console.log(idArea, noViaje)
    return this.get<any>(this.API_URL + API_URLS.GET_DETALLE_VIAJE+idArea+'/'+noViaje, this.httpOptions);
  }

  getDetalleViajeSV(idArea: number, noViaje: number) {
    console.log(idArea, noViaje)
    return this.get<any>(this.API_URL + API_URLS.GET_DETALLE_VIAJE+idArea+'/'+noViaje, this.httpOptions);
  }

  getLatLong(tracto: number) {
    return this.get<any>(this.API_URL + API_URLS.GET_ULTIMA_POSICION+tracto, this.httpOptions);
  }

  postAprobarCotizacion(idCotizacion: number) {
    const cotizacion = {
      idCotizacion: idCotizacion,
      id_ingreso: sessionStorage.getItem("idUsuario")
    }
    return this.post<any>((this.API_URL + API_URLS.POST_COTIZADOR_APROBAR_COTIZACION), cotizacion, this.httpOptions);
  }

  getTiposOperacion(IdUdn: number){
    const cotizacion = {
      IdUdn: IdUdn
    }
    return this.get<any>((this.API_URL + API_URLS.GET_TIPOS_OPERACION_UDN + IdUdn ), this.httpOptions);
  }




}
