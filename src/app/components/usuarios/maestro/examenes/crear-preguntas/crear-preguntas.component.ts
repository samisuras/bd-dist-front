import { Component, OnInit } from '@angular/core';
import { ProfesorService } from "../../../../../services/profesor.service";
import { ActivatedRoute } from "@angular/router";
import { Pregunta } from "./pregunta.interfaz";
import { FormBuilder } from "@angular/forms";

@Component({
  selector: 'app-crear-preguntas',
  templateUrl: './crear-preguntas.component.html',
  styleUrls: ['./crear-preguntas.component.css']
})
export class CrearPreguntasComponent implements OnInit {

  idExamen;
  nombreExamen;
  preguntas:Array<Pregunta> = [];
  preguntaForm;
  contadorPregunta:number = 0;
  ModoEditar:boolean = false;
  indexG

  constructor(private profesorService:ProfesorService,private activatedRoute:ActivatedRoute,private formBuilder:FormBuilder) {
    this.preguntaForm = formBuilder.group({
      pregunta: '',
      opcion1: '',
      opcion2: '',
      opcion3: '',
      opcion4: ''
    })
  }

  ngOnInit() {
    this.activatedRoute.queryParams
    .subscribe(params => {
      // Defaults to 0 if no query param provided.
      console.log(params)
      this.idExamen = params.idexamen;
      this.nombreExamen = params.nombre
    });
    console.log(this.preguntas)
  }

  onSubmit(formData:Pregunta){
    //this.preguntas.push(formData)
    console.log(formData)
    var radios:any = document.querySelectorAll('input[type="radio"]:checked');
    var value = radios.length>0? radios[0].value: null;
    let radioPos = '';
    switch (value) {
      case 'opcion1':
        formData.respuesta = formData.opcion1
        radioPos = 'opcion1';
        break;
      case 'opcion2':
        formData.respuesta = formData.opcion2
        radioPos = 'opcion2';
        break;
      case 'opcion3': 
        formData.respuesta = formData.opcion3
        radioPos = 'opcion3';
        break;
      case 'opcion4':
        formData.respuesta = formData.opcion4
        radioPos = 'opcion4';
        break;
      default:
        break;
    }
    formData.idpregunta = this.preguntas.length
    this.preguntas.push({
      idpregunta: this.contadorPregunta,
      pregunta: formData.pregunta,
      respuesta: formData.respuesta,
      opcion1: formData.opcion1,
      opcion2: formData.opcion2,
      opcion3: formData.opcion3,
      opcion4: formData.opcion4,
      radioRes: radioPos
    })
    this.contadorPregunta++;
    console.log(this.preguntas)
    this.preguntaForm.reset()
  }

  borrarPregunta(index){
    console.log(index)
    this.preguntas = this.preguntas.filter(pregunta => pregunta.idpregunta != index)
    console.log(this.preguntas)
  }

  editar(index){
    let pregunta  = this.preguntas.find((pregunta) => pregunta.idpregunta == index)
    this.preguntaForm = this.formBuilder.group(pregunta)
    this.ModoEditar = true
    let radio:any = document.getElementById(pregunta.radioRes.toString())
    radio.checked=true
    this.indexG = index
  }

  guardarCambios(formData){
    console.log(formData)
    for (let i = 0; i < this.preguntas.length; i++) {
      if(this.preguntas[i].idpregunta == this.indexG){
        var radios:any = document.querySelectorAll('input[type="radio"]:checked');
        var value = radios.length>0? radios[0].value: null;
        let radioPos = '';
        switch (value) {
          case 'opcion1':
            formData.respuesta = formData.opcion1
            radioPos = 'opcion1';
            break;
          case 'opcion2':
            formData.respuesta = formData.opcion2
            radioPos = 'opcion2';
            break;
          case 'opcion3': 
            formData.respuesta = formData.opcion3
            radioPos = 'opcion3';
            break;
          case 'opcion4':
            formData.respuesta = formData.opcion4
            radioPos = 'opcion4';
            break;
          default:
            break;
        }
        this.preguntas[i] = {
          idpregunta: this.indexG,
          pregunta: formData.pregunta,
          respuesta: formData.respuesta,
          opcion1: formData.opcion1,
          opcion2: formData.opcion2,
          opcion3: formData.opcion3,
          opcion4: formData.opcion4,
          radioRes: radioPos
        }
        break;
      }
    }
    console.log(this.preguntas)
  }

  anadirPregunta(){
    this.ModoEditar = false
    this.preguntaForm.reset()
  }

  crearExamen(){
    //Enviar a profesor Service las preguntas
  }
}
