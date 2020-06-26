import { Component, OnInit } from '@angular/core';
import { DataSharingService } from "../../services/data-sharing.service";
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  rol: string;

  constructor(private dataSharingService:DataSharingService) { 
    //escuchamos los cambios
    this.dataSharingService.isUserLoggedIn.subscribe( value => {
      this.rol = sessionStorage.getItem("rol");
    });
  }

  ngOnInit() {
  }

  cerrarSesion(){
    sessionStorage.clear()
    location.reload()
  }

}
