import { detalleCostosModel } from 'src/app/shared/models/costos/costos.model';
import { costos } from 'src/app/shared/models/costos/costos.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AbstractManagerService } from 'src/app/shared/services/abstractManagerService';
import { API_URLS } from 'src/app/shared/models/apiURL';


@Injectable({
  providedIn: 'root'
})
export class CostosService extends AbstractManagerService {

  token: string = sessionStorage.getItem('token')!;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    })
  };

  arrDetalle: detalleCostosModel[] = [];
  arrCostos: costos[] = [];
  
  constructor(http: HttpClient,) {
    super(http)
    this.putInterfaceManager(this);
  }

  

  
  getCostosMes(mes: number, anio: number) {
    // let body = {
    //   id_udn: idUdn,
    //   id_tipo_operacion: idTipoOperacion,
    //   clasificacion: clasificacion
    // };
    // console.log('🥧', body);


    return this.get<any>((this.API_URL + API_URLS.GET_COSTOS_MES + anio + "/" + mes), this.httpOptions);
  }

 




}