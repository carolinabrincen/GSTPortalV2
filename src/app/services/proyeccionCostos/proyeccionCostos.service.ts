import { RentContModel } from './../../shared/models/rentabilidad-contable/renta-contable.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URLS } from 'src/app/shared/models/apiURL';
import { AbstractManagerService } from 'src/app/shared/services/abstractManagerService';

@Injectable({
  providedIn: 'root'
})
export class ProyeccionCostosService extends AbstractManagerService {

  token: string = sessionStorage.getItem('token')!;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    })
  };

  constructor(http: HttpClient,) {
    super(http)
    this.putInterfaceManager(this);
  }

  getUnidadesNegocio(){
    return this.get<any>((this.API_URL + API_URLS.GET_UNIDADES_NEOGCIO), this.httpOptions);
  }

  getTPS(anio: number){

    return this.get<any>((this.API_URL + API_URLS.GET_TPS+ anio), this.httpOptions);
  }

  getCompanias(){
    return this.get<any>((this.API_URL + API_URLS.GET_COSTOS_COMPANIAS), this.httpOptions);
  }


  postProyeccionCostos(periodo: number, clasificacion: string){
    let body = {
      periodo: periodo,
      clasificacion: clasificacion
    }
    console.log(body)
    return this.post<any>((this.API_URL + API_URLS.POST_PROYECCION_COSTOS), body, this.httpOptions);
  }



  postUnidadesNegocio(id:number[]){
    //let body = {
      var myId = id.length == 7 ? []: id
    //}
    console.log(myId)
    return this.post<any>((this.API_URL + API_URLS.POST_COSTOS_UDN), myId, this.httpOptions);
  }

  postCATPS(periodo: number, clasificacion: string){
    let body = {
      periodo: periodo,
      clasificacion: clasificacion
    }
    console.log(body)
    return this.post<any>((this.API_URL + API_URLS.POST_CA_TPS), body, this.httpOptions);
  }

  postDetalleTPS(periodo: number, compania: string, udn: string, renglon: number){
    let body = {
      periodo: periodo,
      compania: compania,
      udn: udn,
      renglon: renglon
    }
    console.log(body)
    return this.post<any>((this.API_URL + API_URLS.POST_DETALLE_TPS), body, this.httpOptions);
  }

  postCACostos(periodo: number, clasificacion: string){
    let body = {
      periodo: periodo,
      clasificacion: clasificacion
    }
    console.log(body)
    return this.post<any>((this.API_URL + API_URLS.POST_CA_COSTOS), body, this.httpOptions);
  }

  postCAAuxiliar(periodo: number, compania: string, udn: string){
    let body = {
      periodo: periodo,
      compania: compania,
      udn: udn
    }
    console.log(body)
    return this.post<any>((this.API_URL + API_URLS.POST_CA_AUXILIAR), body, this.httpOptions);
  }

  postEdoResult(anio: number, idCompania: number, idArea: number, mes: number, clasificacion: number){
    let body = {
      anio: anio,
      idCompania: idCompania,
      idArea: idArea,//area: area,
      mes: mes,
      clasificacion: clasificacion
    }
    console.log(body)
    return this.post<any>((this.API_URL + API_URLS.POST_RESULT_COSTO_ANUAL), body, this.httpOptions);
  }

  postDetalleCuenta(anio: number, idCompania: number, idArea: number, mes: number, periodo: number, idCuenta: string){
    let body = {
      anio: anio,
      idCompania: idCompania,
      idArea: idArea,
      mes: mes,
      periodo: periodo,
      idCuenta: idCuenta
    }
    console.log(body)
    return this.post<any>((this.API_URL + API_URLS.POST_DETALLE_CUENTA), body, this.httpOptions);
  }


}
