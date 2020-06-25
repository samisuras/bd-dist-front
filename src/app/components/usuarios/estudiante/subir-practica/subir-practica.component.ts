import { Component, OnInit, ElementRef } from '@angular/core';
import { EstudianteService } from '../../../../services/estudiante.service'
import { ActivatedRoute } from "@angular/router"
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
  selector: 'app-subir-practica',
  templateUrl: './subir-practica.component.html',
  styleUrls: ['./subir-practica.component.css']
})
export class SubirPracticaComponent implements OnInit {
  fileToUpload: File = null;
  idpractica
  idalumno
  constructor(    
    private activatedRoute: ActivatedRoute,
    private estudiante_service: EstudianteService,
    private router: Router,
    private el: ElementRef) { }

  ngOnInit() {
    this.idpractica = this.activatedRoute.snapshot.paramMap.get('idP')
    this.idalumno = this.activatedRoute.snapshot.paramMap.get('idA')

  }
  handleFileInput(files: FileList) {
    this.fileToUpload = files.item(0);
  }
  onSubmit() {
    
    const data = {
      nombreArchivo: '',
      idpractica: this.idpractica,
      idAlumno: this.idalumno,
      sitio: sessionStorage.getItem('sitio')
    }

    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#archivo');
    let fileCount: number = inputEl.files.length;
    let jsonData = new FormData();
    if (fileCount > 0) { // a file was selected
      for (let i = 0; i < fileCount; i++) {
        jsonData.append('file', inputEl.files.item(i));
      }
      data.nombreArchivo = inputEl.files.item(0).name
      let stringJSON:string = JSON.stringify(data);
      jsonData.append('form',stringJSON)

      this.estudiante_service.subirPractica(jsonData)
      .subscribe(
        (res: any) => {
          console.log("sos")

        }
        , (err) => {
          console.log(err)
        }
      )
      
      this.router.navigate(['/verMaterias'])

    }
  }
}
