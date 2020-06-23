import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class JefeDepartamentoService {

  url = 'http://localhost:3300/jefe_departamento/'

  constructor(private httpClient:HttpClient) { }

  public reporteDia(fecha){
    let newUrl = this.url + 'fecha/'+ fecha
    return this.httpClient.get(newUrl)
  }

  public reporteFecha(fecha1,fecha2){
    let newUrl = this.url + 'periodo/'+fecha1+'/'+fecha2
    return this.httpClient.get(newUrl)
  }
}
