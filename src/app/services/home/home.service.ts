import { RentContModel } from './../../shared/models/rentabilidad-contable/renta-contable.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URLS } from 'src/app/shared/models/apiURL';
import { AbstractManagerService } from 'src/app/shared/services/abstractManagerService';

@Injectable({
  providedIn: 'root'
})
export class HomeService extends AbstractManagerService {

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

  // getCompanias(){
  //   return this.get<any>((this.API_URL + API_URLS.GET_COSTOS_COMPANIAS), this.httpOptions);
  // }

  actualizarMacrociclo(){
    return this.post<any>((this.API_URL + API_URLS.POST_ACTUALIZAR_MACROCICLO), "", this.httpOptions);
  }


}
