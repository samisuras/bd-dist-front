import { Component, OnInit } from '@angular/core';
import { DataSharingService } from "../../services/data-sharing.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  rol: string;

  constructor(private dataSharingService:DataSharingService, private router:Router) { 
    //escuchamos los cambios
    this.dataSharingService.isUserLoggedIn.subscribe( value => {
      this.rol = sessionStorage.getItem("rol");
    });
  }

  ngOnInit() {
  }

  cerrarSesion(){
    this.router.navigate(['/'])
    sessionStorage.clear()
    location.reload()
    this.router.navigate(['/'])
  }

}
