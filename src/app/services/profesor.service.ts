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

  public crearPractica(formData:FormData){
    console.log(formData)
    console.log(formData.get('file'))
    return this.httpClient.post(this.url + '/practica/crear',formData)
  }

  public getPracticas(json){
    let urlPracticas = this.url+'/practicas/'+json.idprofesor+'/'+json.idmateria+'/'+json.idgrupo
    return this.httpClient.get(urlPracticas)
  }

  public getPracticasAlumnos(idpractica){
    let urlPracticasAlumnos = this.url + '/practicasDeAlumnos/'+idpractica;
    return this.httpClient.get(urlPracticasAlumnos)
  }

  public calificarPractica(practica){
    let urlCalificar = this.url + '/calificarPractica';
    return this.httpClient.post(urlCalificar,practica)
  }

  public crearExamen(examen){
    let urlCrearExamen = this.url + '/crearExamen';
    return this.httpClient.post(urlCrearExamen,examen)
  }

  public crearExamenConPreguntas(data){
    //data contendra las preguntas y el id examen
    let urlCrearExamConPreguntas = this.url + '/crearPreguntasExamen';
    return this.httpClient.post(urlCrearExamConPreguntas,data)
  }

  public getExamenes(data:any){
    let urlGetExamenes = this.url + '/examenes/'+ data.idprofesor+'/'+data.idmateria+'/'+data.idgrupo
    return this.httpClient.get(urlGetExamenes)
  }

  public getExamenesAlumnos(idExamen:any){
    let newUrl = this.url + '/examenes_alumnos/' + idExamen
    return this.httpClient.get(newUrl)
  }

  public actualizarNotas(json:any){
    let newUrl = this.url +'/actualizarNotas'
    return this.httpClient.put(newUrl,json)
  }
}
