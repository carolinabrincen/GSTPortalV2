import { Observable, throwError } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import {IManagerService} from 'src/app/shared/services/iManagerService';

import {environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import {  timer } from 'rxjs';
import {  catchError, delayWhen, retry, retryWhen, scan } from 'rxjs/operators';

export abstract class AbstractManagerService{
   
    protected readonly API_URL:string;

    private iservice: IManagerService | undefined;

    // protected toastService : ManagerToastService;
//Aqui modifique
    public http: HttpClient;

    constructor(http: HttpClient){
      //  this.toastService = 'toast';
       this.API_URL = 'http://10.9.0.234/PortalGST2/';
     // this.API_URL = 'http://10.9.0.234/PortalGST/';
     // this.API_URL = 'http://localhost:44361';
      //this.API_URL = 'https://localhost:44361/';

       this.http = http;
    }

    /**
     * Agregamos la interfaz que maneja los errores perzonalizados
     * @param iservice
     */
    protected putInterfaceManager(iservice : IManagerService){
      this.iservice = iservice;
    }

    /**
     * Obtiene el header JSON para enviar a través de una petición HTTP
     */
    protected get getJsonHeaders(){
      return {
        headers:  new HttpHeaders({
          'Content-Type': 'application/json'
      
        })
      }
    }

    protected get getJsonHeadersWithToken(){
      
      return {
        headers:  new HttpHeaders({
          'Content-Type': 'application/json', 
          'Authorization': 'Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJwYXNzLFJPVkc3OTEyMTg5SzcsNjIyNTNBMjBEQkVERDM2REY3M0VFMDQ0QzhFQzZDMkIiLCJpYXQiOjE2MDM5OTM3OTYsImV4cCI6MTYwNDA4MDE5Nn0.HEsm7NK7Cbc-AdvQKi2zYtsLnl859hdzBkxZ0yr0wNQz3qW-7Xwk_eMI5LJbvXwI1W7DIsqRdsYSVzTk5Op5Qg'
      
        })
      }
    }

    /**
     * Obtiene la estructura JSON de un modelo
     */
    protected getJson(modelo : any){
      return JSON.stringify(modelo);
    }

    /**
     * 
     * @param url      URL del Api (ejemplo: dns.xx.xx:8080/usuarios)
     * @param modelo   Modelo que se enviara
     * @param header   json, text, multipart (etc)
     */
    //Modifique acá catchError(err=> this.handleErrorMaster(err)
    protected post<T>(url:string, modelo: any, header: any): Observable<any>{
      return this.http.post<T>( url, modelo, header );
        
        /*pipe(
            retryWhen (err => err.pipe(
                scan(retryCount => {
                    if(retryCount > 3) this.handleErrorMaster(err);
                    else{
                        retryCount ++;
                        return retryCount;
                    }
                },0), 
                delayWhen(() => timer(5000))
            ))
        );*/
    }
//catchError(err=> this.handleErrorMaster(err)
    protected put<T>(url: string, modelo:any, header:any): Observable<any>{
      return this.http.put<T>(url, modelo, header).pipe(retry(3))
    }

    protected get<T>(url:string, header:any):Observable<any>{
      return this.http.get<T>(url, header); 
    }
  //,catchError(err=> this.handleErrorMaster(err)
    protected delete<T>(url:string, header:any):Observable<any>{
      return this.http.delete<T>(url, header).pipe(retry(3))
    }

    // protected handleErrorMaster(error) {
    //   let errorMessage = '';
    //   console.error("ERROR >"+ error);

    //   //Manejamos tentativamente el error ERR_CONNECTION_REFUSED TODO
    //   if(error.status == 0){ 
    //     errorMessage = 'No hay conexión con el servidor! Contacte al proveedor.';
    //     this.toastService.errorMsg(errorMessage);
    //     return throwError(errorMessage);
    //   }

    //   if(this.iservice == null){
    //     return throwError(errorMessage);
    //   }else{
    //     //Creamos el trigger para mandar mensajes personalizados
    //     this.iservice.handleError(error);
    //   }
    // }

} 