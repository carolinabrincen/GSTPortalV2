import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { API_URLS } from 'src/app/shared/models/apiURL';
import { AbstractManagerService } from 'src/app/shared/services/abstractManagerService';

@Injectable({
  providedIn: 'root'
})
export class KilometrosService extends AbstractManagerService {

  token: string = sessionStorage.getItem('token')!;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.token
      // 'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJTSUFOQ09SQWNjZXNzVG9rZW4iLCJqdGkiOiIwZDliZTU2Zi05MDU2LTQ4Y2UtYjc2Ni1mNjUxM2M3MzA5MTEiLCJpYXQiOiIyLzYvMjAyMiA1OjEwOjUzIFBNIiwiSWQiOiJBRE9MRlZBMiIsIk5vbWJyZSI6IkFET0xGTyBWQVpRVUVaIENBU1RFTExBTk9TIiwiZXhwIjoxNjQ0MjUzODUzLCJpc3MiOiJTaWFuY29yQXBpU2VydmVyIiwiYXVkIjoiU2lhbmNvckZyb250Q2xpZW50cyJ9.ePqKVjb8mz-gxYmXzM5F9CsvY0rgwlUk_rLP7IvEXHw'
    })
  };

  constructor(http: HttpClient,) {
    super(http)
    this.putInterfaceManager(this);
  }

  getKmsActuales(){
    return this.get<any>((this.API_URL + API_URLS.GET_KMS_ACTUALES), this.httpOptions);
  }

  getKmsActualesMAnt(){
    return this.get<any>((this.API_URL + API_URLS.GET_KMS_ACTUALES_MANT), this.httpOptions);
  }

  

}