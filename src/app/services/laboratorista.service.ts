import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";


@Injectable({
  providedIn: 'root'
})
export class LaboratoristaService{
    url:string = "http://localhost:3300/laboratorista/";

    constructor(private httpClient:HttpClient){}

    public getMateriales(){
      let urlMateriales=this.url+"materiales/"+sessionStorage.getItem("sitio")
      return this.httpClient.get(urlMateriales)
    }

    public getPrestamos(){
      return this.httpClient.get(this.url+"prestamos/"+sessionStorage.getItem("sitio"))
    }

    public getMaterialesPrestamo(idprestamo:string){
      return this.httpClient.get(this.url+"prestamo/"+idprestamo+"/materiales/"+sessionStorage.getItem("sitio"))
    }
}