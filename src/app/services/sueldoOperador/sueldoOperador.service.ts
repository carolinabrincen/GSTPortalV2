import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AbstractManagerService } from 'src/app/shared/services/abstractManagerService';
import { API_URLS } from 'src/app/shared/models/apiURL';
import { ActualizarAutorizacionesRequest } from 'src/app/pages/sueldoOperador/informacionBase.model';

@Injectable({ providedIn: 'root' })
export class SueldoOperadorService extends AbstractManagerService {

  token: string = sessionStorage.getItem('token')!;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
    })
  };

  constructor(http: HttpClient) {
    super(http);
  }

  getInformacionBase(anio: number, mes: string): Observable<any> {
    return this.get<any>(
      `${this.API_URL}api/liquidaciones/informacion-base?anio=${anio}&mes=${mes}`,
      this.httpOptions
    );
  }

  getDetalleLiquidacion(anio: number, mes: string): Observable<any> {
    return this.get<any>(
      `${this.API_URL}api/liquidaciones/detalle?anio=${anio}&mes=${mes}`,
      this.httpOptions
    );
  }

  actualizarAutorizaciones(request: ActualizarAutorizacionesRequest): Observable<any> {
    return this.put<any>(
      `${this.API_URL}${API_URLS.PUT_SUELDO_GARANTIA_AUTORIZACIONES}`,
      request,
      this.httpOptions
    );
  }
}
