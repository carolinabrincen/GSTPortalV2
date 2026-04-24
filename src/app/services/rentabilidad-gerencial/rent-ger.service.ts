import { RentGerModel } from './../../shared/models/rentabilidad-gerencial/renta-geren.model';
import { Injectable } from '@angular/core';
import { AbstractManagerService } from 'src/app/shared/services/abstractManagerService';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URLS } from 'src/app/shared/models/apiURL';

@Injectable({
  providedIn: 'root'
})
export class RentGerService extends AbstractManagerService{

  token: string = sessionStorage.getItem('token')!;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    })
  };

  private arrRentGer: RentGerModel[] = [];

  constructor(http: HttpClient,) {
    super(http)
    this.putInterfaceManager(this);
  }

  getTiposOperacion(){
    return this.get<any>((this.API_URL + API_URLS.GET_TIPOS_OPERACION), this.httpOptions);
  }

  getClientesRutas(anioSel:number, mesSel:number, udnSel:number[], tipoOpSel: number[]){
    let body = {
      anio:anioSel,
      mes: mesSel,
      unidadesNegocio:udnSel,
      tipoOperaciones:tipoOpSel
    };
    console.log('CLIENTES RUTAS:',body);

    return this.post<any>((this.API_URL + API_URLS.POST_CLIENTES_RUTAS), body, this.httpOptions);
  }


  getRentGer(anioSel:number, mesSel:number, udnSel:number[], tipoOpSel: number[], rutaSel: number[], clienteSel: number[]){
    let body = {
      anio:anioSel,
      mes: mesSel,
      unidadesNegocio:udnSel,
      tipoOperaciones:tipoOpSel,
      rutas: rutaSel,
      clientes: clienteSel
    };
    console.log('RENTA - RUTAS:',body);

    return this.post<any>((this.API_URL + API_URLS.POST_RENTABILIDAD_RUTA), body, this.httpOptions);

  }

}

