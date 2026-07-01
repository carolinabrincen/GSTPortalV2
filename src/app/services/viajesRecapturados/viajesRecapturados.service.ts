import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AbstractManagerService } from 'src/app/shared/services/abstractManagerService';

@Injectable({ providedIn: 'root' })
export class ViajesRecapturadosService extends AbstractManagerService {

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

  buscarViaje(idArea: number, noViaje: string): Observable<any> {
    return this.get<any>(
      `${this.API_URL}api/Kilometros/BusquedaViaje/${idArea}/${noViaje}`,
      this.httpOptions
    );
  }

  asociarViajes(body: {
    id_area_ant: number;
    no_viaje_ant: number;
    id_area: number;
    no_viaje: number;
    usuario: string;
    clasificacion: string;
  }): Observable<any> {
    console.log(body);
    return this.post<any>(
      `${this.API_URL}api/Kilometros/AsociarViajes`,
      body,
      this.httpOptions
    );
  }

  getAsociados(mes: number, anio: number): Observable<any> {
 
    return this.get<any>(
      `${this.API_URL}api/Kilometros/Asociados?mes=${mes}&anio=${anio}&null=`,
      this.httpOptions
    );

    
  }
}
