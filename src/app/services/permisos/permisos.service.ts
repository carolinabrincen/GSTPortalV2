import { RentContModel } from './../../shared/models/rentabilidad-contable/renta-contable.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URLS } from 'src/app/shared/models/apiURL';
import { AbstractManagerService } from 'src/app/shared/services/abstractManagerService';
import { Permisos } from 'src/app/shared/models/permisos/clientesAsignados.model';

@Injectable({
  providedIn: 'root'
})
export class PermisosService extends AbstractManagerService {

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

  getUsuariosActiivos(){
    return this.get<any>((this.API_URL + API_URLS.GET_USUARIOS_ACTIVOS), this.httpOptions);
  }

  getPermisos(cvetra: number){
    return this.get<any>((this.API_URL + API_URLS.GET_USUARIOS_PERMISOS+cvetra), this.httpOptions);
  }

  getPeriodoActual(){
    return this.get<any>((this.API_URL + API_URLS.GET_PERIODO_ACTUAL), this.httpOptions);
  }

  postCarteraTerceros(periodo: number, compania: number){
    let body = {
      periodo: periodo,
      compania: compania
    }
    console.log(body)
    return this.post<any>((this.API_URL + API_URLS.POST_CARTERA_TERCEROS), body, this.httpOptions);
  }

  postGuardarPermisos(idUsuario: number, idOpciones: Permisos[]){
    let body = {
      idUsuario: idUsuario,
      idOpciones: idOpciones.length == 7 ? [] : idOpciones
    }
    console.log(JSON.stringify(body))
    return this.post<any>((this.API_URL + API_URLS.POST_GUARDAR_PERMISOS), body, this.httpOptions);
  }


}
