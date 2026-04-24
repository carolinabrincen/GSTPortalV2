import { IngresosDModel } from 'src/app/shared/models/ingresos/ingresosD.models';
import { DetalleModel } from 'src/app/shared/models/ingresos/detalle.models';
import { Injectable } from '@angular/core';
import { RentGerModel } from './../../shared/models/rentabilidad-gerencial/renta-geren.model';
import { AbstractManagerService } from 'src/app/shared/services/abstractManagerService';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { API_URLS } from 'src/app/shared/models/apiURL';

@Injectable({
  providedIn: 'root'
})
export class IngresosService extends AbstractManagerService{

  arrIngresos: IngresosDModel[] = [];
  arrDetalle: DetalleModel[] = [];

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

  
  
}
