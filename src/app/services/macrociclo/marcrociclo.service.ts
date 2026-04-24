import { RentContModel } from './../../shared/models/rentabilidad-contable/renta-contable.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URLS } from 'src/app/shared/models/apiURL';
import { AbstractManagerService } from 'src/app/shared/services/abstractManagerService';
import { ClientesAsignados } from '../../shared/models/carteraIntercompanias/clientesAsignados.model';

@Injectable({
  providedIn: 'root'
})
export class MarcroCicloService extends AbstractManagerService {

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

  // getCarteraClientes(){
  //   return this.get<any>((this.API_URL + API_URLS.GET_CARTERA_CLIENTES), this.httpOptions);
  // }

  getUnidadesNegocio(){
    return this.get<any>((this.API_URL + API_URLS.GET_UNIDADES_NEOGCIO), this.httpOptions);
  }

  getMacroCicloCajaSeca(){
    return this.get<any>((this.API_URL + API_URLS.GET_MACRO_CICLO_CAJA_SECA), this.httpOptions);
  }

  postMacrociclo(idArea: number, operacion: string, estados: any[]){
    let body = {
      idArea: idArea,
      operacion: operacion,
      estados: estados,
    }
    console.log(body)
    return this.post<any>((this.API_URL + API_URLS.POST_MACROCICLO), body, this.httpOptions);
  }

  postMacrocicloDetalle(idArea: number, ciclo: number){
    let body = {
      idArea: idArea,
      ciclo: ciclo,
    }
     console.log(body)
    return this.post<any>((this.API_URL + API_URLS.POST_MACROCICLO_DETALLE), body, this.httpOptions);
  }

  postClienteRutaOri(idArea: number, operacion: string){
    let body = {
      idArea: idArea,
      operacion: operacion,
    }
     console.log(body)
    return this.post<any>((this.API_URL + API_URLS.POST_CLIENTE_RUTA_ORIGEN), body, this.httpOptions);
  }

  postRutaDestino(idArea: number, operacion: string, rutaOrigen: string){
    let body = {
      idArea: idArea,
      operacion: operacion,
      rutaOrigen: rutaOrigen
    }
     console.log(body)
    return this.post<any>((this.API_URL + API_URLS.POST_RUTA_DESTINO), body, this.httpOptions);
  }

  postRutas(area: string, operacion: string, operador: string, cliente: string, origen: string, destino: string, periodo: number){
    let body = {
      area: area,
      operacion: operacion,
      operador: operador,
      cliente: cliente,
      origen: origen,
      destino: destino,
      periodo: periodo
    }
     console.log(body)
    return this.post<any>((this.API_URL + API_URLS.POST_RUTAS), body, this.httpOptions);
  }


}
