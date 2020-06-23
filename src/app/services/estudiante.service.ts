import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class EstudianteService {

  url:string = "http://localhost:3300/estudiante";

  constructor(private httpClient:HttpClient) { }

  public getMateriasAlumno(id:string){
    let urlMaterias = this.url + '/verMaterias/estudiante/' + id + '/' + sessionStorage.getItem('sitio')
    return this.httpClient.get(urlMaterias)
  }

  public getExamenesAlumno(id:string , materia:string){
    let urlExamenes = this.url + '/verExamenes/estudiante/' + id + '/' + sessionStorage.getItem('sitio') + '/' + materia
    return this.httpClient.get(urlExamenes)
  }

  public getPracticasAlumno(id:string , materia:string){
    let urlPracticas = this.url + '/verPracticas/estudiante/' + id + '/' + sessionStorage.getItem('sitio') + '/' + materia
    return this.httpClient.get(urlPracticas)
  }

}
