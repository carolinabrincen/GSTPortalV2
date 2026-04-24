import { CotizacionModel, VariablesCotizacionModel, DetalleCotizacionModel, NuevaCotizacionModel } from './../../shared/models/cotizador/cotizador.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AbstractManagerService } from 'src/app/shared/services/abstractManagerService';
import { API_URLS } from 'src/app/shared/models/apiURL';


@Injectable({
  providedIn: 'root'
})
export class DisponibilidadAnualService extends AbstractManagerService {

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

  getVariablesCotizacion(idUdn: number, idTipoOperacion: number, clasificacion: string) {
    let body = {
      id_udn: idUdn,
      id_tipo_operacion: idTipoOperacion,
      clasificacion: clasificacion
    };
    console.log('🥧', body);


    return this.post<any>((this.API_URL + API_URLS.POST_COTIZADOR_OBTENER_VARIABLES), body, this.httpOptions);
  }

  getDipPresupuesto(value){
    return this.get<any>((this.API_URL + API_URLS.GET_DISPONIBILIDAD_PRESUPUESTO+value), this.httpOptions);
  }

  getOperador(value){
    return this.get<any>((this.API_URL + API_URLS.GET_DISPONIBILIDAD_OPERADOR+value), this.httpOptions);
  }

  getUTracto(value){
    return this.get<any>((this.API_URL + API_URLS.GET_DISPONIBILIDAD_TRACTO+value), this.httpOptions);
  }

  postDisponiblidad(idArea: number, fecha: string) {
    let body = {
      idArea: idArea,
      fecha: fecha,
    };
    console.log(JSON.stringify(body))
    return this.post<any>((this.API_URL + API_URLS.POST_DISPONIBILIDAD_ANUAL), body, this.httpOptions);
  }

  postDisponiblidadMensual(mes: number, anio: number, idArea: number, idOperacion: number) {
    let body = {
      anio: anio,
      mes: mes,
      idArea: idArea,
      idOperacion: idOperacion
    };
    console.log(JSON.stringify(body))
    return this.post<any>((this.API_URL + API_URLS.POST_DISPONIBILIDAD_MENSUAL), body, this.httpOptions);
  }

  postStatusManual(cveOperador: number, idStatus: number, idUsuario: string, inicio: string, fin: string, observaciones: string) {
    let body = {
      cveOperador:cveOperador,
      idStatus: idStatus,
      idUsuario: idUsuario,
      inicio: inicio,
      fin: fin,
      observaciones: observaciones
    };
    console.log("status")
    console.log(JSON.stringify(body))
    return this.post<any>((this.API_URL + API_URLS.POST_STATUS_MANUAL), body, this.httpOptions);
  }

  postTipoOperacionOpe(cveOperador: number, idTipoOperacion: number, idUsuario: string) {
    let body = {
      cveOperador:cveOperador,
      idTipoOperacion: idTipoOperacion,
      idUsuario: idUsuario,
    };
    console.log("operacion")
    console.log(JSON.stringify(body))
    return this.post<any>((this.API_URL + API_URLS.POST_TIPO_OPERACION_OPERADOR), body, this.httpOptions);
  }

  postTracto(anio: number, mes: number, idArea: number, idOperacion: number, status: string) {
    let body = {
      anio: anio,
      mes: mes,
      idArea: idArea,
      idOperacion: idOperacion,
      status: status
    };
    console.log(body)
    return this.post<any>((this.API_URL + API_URLS.POST_TRACTO), body, this.httpOptions);
  }

  GuardarPresupuesto(idArea: number, area: string, clasificacion: string, tipo: string, cantidad: number) {
    let body = {
      idArea: idArea,
      area: area,
      clasificacion: clasificacion,
      tipo: tipo,
      cantidad: cantidad
    };
    console.log(JSON.stringify(body))
    return this.post<any>((this.API_URL + API_URLS.POST_NUEVO_PRESUPUESTO), body, this.httpOptions);
  }

  EditarPresupuesto(id: number, clasificacion: string, cantidad: number) {
    let body = {
      id: id,
      clasificacion: clasificacion,
      cantidad: cantidad
    };
    console.log(JSON.stringify(body))
    return this.post<any>((this.API_URL + API_URLS.POST_EDITAR_PRESUPUESTO), body, this.httpOptions);
  }

  BorrarPresupuesto(id: number, clasificacion: string) {
    let body = {
      id: id,
      clasificacion: clasificacion,
    };
    console.log(JSON.stringify(body))
    return this.post<any>((this.API_URL + API_URLS.POST_ELIMINAR_PRESUPUESTO), body, this.httpOptions);
  }

 



}
