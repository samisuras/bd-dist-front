import { Component, OnInit } from '@angular/core';
import { EstudianteService } from '../../../../services/estudiante.service'
import { ActivatedRoute } from "@angular/router"


@Component({
  selector: 'app-realizar-examen',
  templateUrl: './realizar-examen.component.html',
  styleUrls: ['./realizar-examen.component.css']
})
export class RealizarExamenComponent implements OnInit {
  seleccionado: any
  json: any
  preguntas
  idExamen
  nombreExamen
  respuesta: any
  contestadas = 0
  total
  completas = false
  calificacion = false
  calFinal = 0
  idexamen
  tiempo

  timeLeft: number = 0;
  interval;
  constructor(
    private activatedRoute: ActivatedRoute,
    private estudiante_service: EstudianteService,
  ) { }


  radioChange(event: any) {
    this.seleccionado[event.target.id - 1] = event.target.value;
    console.log(this.seleccionado)
    this.contestadas = this.verificarContestadas()

  }


  startTimer() {
    this.interval = setInterval(() => {
      if (this.timeLeft > 0) {
        this.timeLeft--;
      } else {
        this.rellenarRespuestas()
        this.pauseTimer()
        this.submit()
      }
    }, 1000)
  }
  pauseTimer() {
    clearInterval(this.interval);
  }
  ngOnInit() {
    this.idExamen = this.activatedRoute.snapshot.paramMap.get('id')
    this.estudiante_service.getPreguntasExamen(sessionStorage.getItem('id'), this.idExamen)
      .subscribe(
        (res: any) => {
          if (res.preguntas.length > 0) {
            this.idexamen = res.idexamen
            this.preguntas = res.preguntas
            this.total = this.preguntas.length
            this.nombreExamen = res.preguntas[0].nombre
            this.seleccionado = []
            this.tiempo = this.total * 60 //tiempo en segundos
            for (let i = 0; i < this.preguntas.length; i++) {
              this.seleccionado.push(null)
            }
            this.timeLeft = this.tiempo //timepo del examen 
            this.startTimer()
          }
          else {
            this.total = 0
          }

        }
        , (err) => {
          console.log(err)
        }
      )
  }

  submit() {
    if (this.verificarRespuestas() == true) {
      console.log(this.seleccionado)
      this.verificarRespuestasCorrectas()

    }
    else {
      alert("Debes de contestar todas las preguntas!")
    }
  }
  rellenarRespuestas(){
    for (let i = 0; i < this.seleccionado.length; i++) {
      if (this.seleccionado[i] == null) {
        this.seleccionado[i] = "termino el tiempo"
      }
    }
  }
  verificarRespuestas() {
    for (let i = 0; i < this.seleccionado.length; i++) {
      if (this.seleccionado[i] == null) {
        return false;
      }
    }
    return true;
  }

  verificarContestadas() {
    let num = 0
    for (let i = 0; i < this.seleccionado.length; i++) {
      if (this.seleccionado[i] != null) {
        num++;
      }
    }
    if (num == this.total) {
      this.completas = true;
    }
    return num;
  }

  verificarRespuestasCorrectas() {
    var respuestas = []
    for (let i = 0; i < this.preguntas.length; i++) {
      respuestas.push(this.preguntas[i].respuesta)
    }
    var aciertos = 0
    for (let j = 0; j < this.preguntas.length; j++) {
      if (this.seleccionado[j] == respuestas[j]) {
        aciertos++;
      }
    }

    var pregunta = 10 / this.total;
    this.calFinal = pregunta * aciertos;
    this.calificacion = true;
    this.setCalificacion()
  }

  setCalificacion() {
    const data = {
      'idExamen': this.idexamen,
      'idAlumno': sessionStorage.getItem('id'),
      'sitio': sessionStorage.getItem('sitio'),
      'calificacion': this.calFinal
    }

    this.estudiante_service.setCalificacionExamen(data)
      .subscribe(
        (res: any) => {
          console.log(res)
          //this.router.navigate(['/crearPreguntas'],{ queryParams: {idexamen: res.idexamen,nombre: formData.nombre}})
        },
        (error) => console.log(error)
      )
  }
}
