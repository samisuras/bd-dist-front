import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  url:string = "http://localhost:3300/profesor";

  constructor(private httpClient:HttpClient) { }

  public getMaterias(id:string){
    let urlMaterias = this.url + "/materias/" + id
    return this.httpClient.get(urlMaterias)
  }

  public getGrupos(idusuario:string,idmateria:string){
    let urlGrupos = this.url + '/grupos/' + idusuario + '/' + idmateria
    return this.httpClient.get(urlGrupos)
  }
}
