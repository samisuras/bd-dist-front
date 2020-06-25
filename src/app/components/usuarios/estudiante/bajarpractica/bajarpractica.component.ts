import { Component, OnInit, ElementRef } from '@angular/core';
import { EstudianteService } from '../../../../services/estudiante.service'
import { ActivatedRoute } from "@angular/router"
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import {saveAs} from 'file-saver';
@Component({
  selector: 'app-bajarpractica',
  templateUrl: './bajarpractica.component.html',
  styleUrls: ['./bajarpractica.component.css']
})
export class BajarpracticaComponent implements OnInit {

  idpractica
  idprofesor
  idgrupo
  idmateria
  archivo
  constructor(    
    private activatedRoute: ActivatedRoute,
    private estudiante_service: EstudianteService,
    private router: Router,
    private el: ElementRef) { }

  ngOnInit(): void {
    this.estudiante_service.getFileName(this.activatedRoute.snapshot.paramMap.get('idPra'),this.activatedRoute.snapshot.paramMap.get('idPro'),this.activatedRoute.snapshot.paramMap.get('idM'),this.activatedRoute.snapshot.paramMap.get('idG'))
    .subscribe(
      (res: any) => {
        console.log(res)
        this.archivo = res.nombre[0].archivo
        const json = {
          'idpractica':this.activatedRoute.snapshot.paramMap.get('idPra'),
          'idprofesor':this.activatedRoute.snapshot.paramMap.get('idPro'),
          'idgrupo':this.activatedRoute.snapshot.paramMap.get('idG'),
          'idmateria':this.activatedRoute.snapshot.paramMap.get('idM'),
          'archivo': this.archivo,
          'sitio' : sessionStorage.getItem('sitio')
        }

        this.estudiante_service.bajarPractica(json)
        .subscribe(
          (res: any) => {
            console.log(res)
            saveAs(res,this.archivo)
          }
          , (err) => {
            console.log(err)
          }
        )
      }
      , (err) => {
        console.log(err)
      }
    )


    


  }

}
