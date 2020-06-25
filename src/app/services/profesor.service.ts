import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Ptor } from 'protractor';

@Injectable({
  providedIn: 'root'
})
export class ProfesorService {

  url:string = "http://localhost:3300/profesor";

  constructor(private httpClient:HttpClient) { }

  public getMaterias(id:string){
    let urlMaterias = this.url + "/materias/profesor/" + id + '/' + sessionStorage.getItem('sitio')
    return this.httpClient.get(urlMaterias)
  }

  public getGrupos(idusuario:string,idmateria:string){
    let urlGrupos = this.url + '/grupos/' + idusuario + '/' + idmateria +'/' +sessionStorage.getItem('sitio')
    return this.httpClient.get(urlGrupos)
  }

  public crearPractica(formData:FormData){
    console.log(formData)
    console.log(formData.get('file'))
    return this.httpClient.post(this.url + '/practica/crear',formData)
  }

  public getPracticas(json){
    let urlPracticas = this.url+'/practicas/'+json.idprofesor+'/'+json.idmateria+'/'+json.idgrupo+'/'+sessionStorage.getItem('sitio')
    return this.httpClient.get(urlPracticas)
  }

  public getPracticasAlumnos(idpractica){
    let urlPracticasAlumnos = this.url + '/practicasDeAlumnos/'+idpractica+'/'+sessionStorage.getItem('sitio');
    return this.httpClient.get(urlPracticasAlumnos)
  }

  public calificarPractica(practica){
    let data = {
      practica: practica,
      sitio: sessionStorage.getItem('sitio')
    }
    let urlCalificar = this.url + '/calificarPractica';
    return this.httpClient.post(urlCalificar,data)
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
    let urlGetExamenes = this.url + '/examenes/'+ data.idprofesor+'/'+data.idmateria+'/'+data.idgrupo+'/'+sessionStorage.getItem('sitio')
    return this.httpClient.get(urlGetExamenes)
  }

  public getExamenesAlumnos(idExamen:any){
    let newUrl = this.url + '/examenes_alumnos/' + idExamen+'/'+sessionStorage.getItem('sitio')
    return this.httpClient.get(newUrl)
  }

  public actualizarNotas(json:any){
    let newUrl = this.url +'/actualizarNotas'
    return this.httpClient.put(newUrl,json)
  }

  public getArchivoPractica(idusuario,idpractica,archivo){
    let newUrl = this.url +'/practicas/archivo/obtener/'+idusuario+'/'+idpractica+'/'+archivo
    return this.httpClient.get(newUrl, {responseType: "blob"})
  }
}
