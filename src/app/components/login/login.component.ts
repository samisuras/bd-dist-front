import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
import { LoginService } from "../../services/login.service";
import { DataSharingService } from "../../services/data-sharing.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  signInForm;
  constructor(
    private formBuilder:FormBuilder, private loginService:LoginService,
    private dataSharingService:DataSharingService, private router:Router
  ) {
    this.signInForm = this.formBuilder.group({
      id: '',
      password: ''
    });
   }

  ngOnInit() {
  }

  onSubmit(signInData) {
    //Procesamiento de la data enviar y checar
    console.log(signInData);
    this.loginService.logIn(signInData).subscribe(
      (res:any) =>{
        console.log(res)
        sessionStorage.setItem('id',res.usuario.idusuario);
        sessionStorage.setItem('rol',res.rol);
        sessionStorage.setItem('sitio',res.sitio)
        //emitimos evento de logueo
        this.dataSharingService.isUserLoggedIn.next(true);
        this.router.navigate(['']);
      },
      (error) => {
        console.log("error")
      }
    );
    //this.signInForm.reset();
  }

}
