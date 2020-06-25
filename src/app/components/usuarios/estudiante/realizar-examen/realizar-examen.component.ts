import { Component, OnInit } from '@angular/core';
import { EstudianteService } from '../../../../services/estudiante.service'
import { ActivatedRoute } from "@angular/router"
import { Router } from "@angular/router";


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
  fecha
  hora
  constructor(
    private activatedRoute: ActivatedRoute,
    private estudiante_service: EstudianteService,
    private router: Router
  ) { }


  radioChange(event: any) {
    this.seleccionado[event.target.id] = event.target.value;
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
  verificarFechas(fechaExamen, horaExamen) {
    var f = new Date()
    var mes
    var fechaActual
    if ((f.getMonth() + 1) < 10) {
      mes = "0" + (f.getMonth() + 1)
      fechaActual = f.getFullYear() + "-" + mes + "-" + f.getDate()
    }
    else {
      fechaActual = f.getFullYear() + "-" + (f.getMonth() + 1) + "-" + f.getDate()
    }

    if (fechaActual < fechaExamen) {
      return true;
    }
    else {
      return false;
    }
  }
  ngOnInit() {
    var res = confirm("Al iniciar el examen ya no podra regresar, se pondrá una calificación de 0 automáticamente, es decir no podras volver a intentarlo una vez que inicies. Seguro que quieres comenzar?");
    if (res == true) {
      this.idExamen = this.activatedRoute.snapshot.paramMap.get('id')
      this.estudiante_service.getPreguntasExamen(sessionStorage.getItem('id'), this.idExamen)
        .subscribe(
          (res: any) => {
            if (res.preguntas.length > 0) {
              this.fecha = res.preguntas[0].fecha
              this.hora = res.preguntas[0].hora
              this.idexamen = res.idexamen
              
              if (this.verificarFechas(this.fecha, this.hora) == true) {
                
                this.preguntas = res.preguntas
                console.log(this.preguntas)
                this.total = this.preguntas.length
                this.nombreExamen = res.preguntas[0].nombre
                this.seleccionado = []
                this.tiempo = this.total * 60 //tiempo en segundos
                for (let i = 0; i < this.preguntas.length; i++) {
                  this.seleccionado.push(null)
                }
                this.timeLeft = this.tiempo //timepo del examen
                this.setCalificacion(false) //setear calificacion 0
                this.startTimer()
              }
              else {
                alert("El exámen ya no está disponible");
                this.setCalificacion(false) //setear calificacion 0
                this.router.navigate(['/verMaterias'])
              }

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
    else {
      this.router.navigate(['/verMaterias'])

    }


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
  rellenarRespuestas() {
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
    this.setCalificacion(true)
  }

  setCalificacion(bandera) {
    if (bandera == true) {
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
          },
          (error) => console.log(error)
        )
    }
    else {
      const data = {
        'idExamen': this.idexamen,
        'idAlumno': sessionStorage.getItem('id'),
        'sitio': sessionStorage.getItem('sitio'),
        'calificacion': 0
      }
      console.log(data)

      this.estudiante_service.setCalificacionExamen(data)
        .subscribe(
          (res: any) => {
            console.log(res)
          },
          (error) => console.log(error)
        )
    }

  }
}

