import { CotizacionModel, VariablesCotizacionModel, DetalleCotizacionModel, NuevaCotizacionModel } from './../../shared/models/cotizador/cotizador.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AbstractManagerService } from 'src/app/shared/services/abstractManagerService';
import { API_URLS } from 'src/app/shared/models/apiURL';


@Injectable({
  providedIn: 'root'
})
export class CotizadorService extends AbstractManagerService {

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

  getPreCotizaciones() {
    return this.get<any>(this.API_URL + API_URLS.GET_COTIZADOR_OBTENER_PRECOTIZACIONES, this.httpOptions);
  }

  getCotizaciones() {
    return this.get<any>(this.API_URL + API_URLS.GET_COTIZADOR_OBTENER_APROBADAS, this.httpOptions);
  }

  getVariablesCotizacion(idUdn: number, idTipoOperacion: number, clasificacion: string) {
    let body = {
      id_udn: idUdn,
      id_tipo_operacion: idTipoOperacion,
      clasificacion: clasificacion
    };
    console.log('🥧', body);


    return this.post<any>((this.API_URL + API_URLS.POST_COTIZADOR_OBTENER_VARIABLES), body, this.httpOptions);
  }

  postNuevaCotizacion(cotizacion: CotizacionModel) {
    console.log('🥧', cotizacion);
    return this.post<any>((this.API_URL + API_URLS.POST_COTIZADOR_NUEVA_COTIZACION), cotizacion, this.httpOptions);
  }

  postEditarCotizacion(cotizacion: CotizacionModel) {
    console.log(JSON.stringify(cotizacion));
    return this.post<any>((this.API_URL + API_URLS.POST_COTIZADOR_EDITAR_COTIZACION), cotizacion, this.httpOptions);
  }

  postEliminarCotizacion(idCotizacion: number) {
    const cotizacion = {
      idCotizacion: idCotizacion,
      id_ingreso: sessionStorage.getItem("idUsuario")
    }
    return this.post<any>((this.API_URL + API_URLS.POST_COTIZADOR_ELIMINAR_COTIZACION), cotizacion, this.httpOptions);
  }

  postAprobarCotizacion(idCotizacion: number) {
    const cotizacion = {
      idCotizacion: idCotizacion,
      id_ingreso: sessionStorage.getItem("idUsuario")
    }
    return this.post<any>((this.API_URL + API_URLS.POST_COTIZADOR_APROBAR_COTIZACION), cotizacion, this.httpOptions);
  }

  getCotizacion(idCotizacion: number) {
    const cotizacion = {
      idCotizacion: idCotizacion
    }
    return this.get<any>((this.API_URL + API_URLS.GET_COTIZADOR_OBTENER_COTIZACION + idCotizacion) , this.httpOptions);
  }

  getRentabilidad(idUdn: number, tipoOperacion: string) {
    const cotizacion = {
      idCotizacion: idUdn,
      tipoOperacion: tipoOperacion
    }
    return this.get<any>((this.API_URL + API_URLS.GET_COTIZADOR_RENTABILIDAD + idUdn + "/" + tipoOperacion) , this.httpOptions);
  }

  getTiposOperacion(IdUdn: number){
    const cotizacion = {
      IdUdn: IdUdn
    }
    return this.get<any>((this.API_URL + API_URLS.GET_TIPOS_OPERACION_UDN + IdUdn ), this.httpOptions);
  }




}
