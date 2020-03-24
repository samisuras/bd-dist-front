import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = 'http://localhost:3300/login/user'
  usuario = {};

  constructor(private http:HttpClient) { }

  public logIn(datos){
    return this.http.post(this.url,datos)
  }

}
