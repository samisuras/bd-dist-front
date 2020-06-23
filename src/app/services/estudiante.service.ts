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

  public getPreguntasExamen(id:string , examen:string){
    let urlPreguntas = this.url + '/preguntasExamen/estudiante/' + id + '/' + sessionStorage.getItem('sitio') + '/' + examen
    return this.httpClient.get(urlPreguntas)
  }

  public setCalificacionExamen(datos){
    let urlCalificacion = this.url + '/calificacionExamen/estudiante'
    return this.httpClient.post(urlCalificacion,datos)

  }

}
