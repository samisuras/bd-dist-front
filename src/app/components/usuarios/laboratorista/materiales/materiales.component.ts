import { Component, OnInit } from '@angular/core';
import { LaboratoristaService } from "../../../../services/laboratorista.service";

@Component({
  selector: 'app-materiales',
  templateUrl: './materiales.component.html',
  styleUrls: ['./materiales.component.css']
})
export class MaterialesComponent implements OnInit {
  nombre:string=''
  original:Array<any>
  copia:Array<any>

  constructor(private laboratoristaService:LaboratoristaService) { }

  ngOnInit() {
    this.laboratoristaService.getMateriales().subscribe(
      (res:any)=>{
        this.original = res.materiales
        this.copia=res.materiales
        console.log(this.original)
        console.log(this.copia)
      },
      (err) =>{
        console.log(err)
      }
    )
  }

  searchIndex(material:any){
    return this.original.findIndex(x=>x.idproducto==material.idproducto)+1;
  }

  buscarMateriales(nombre:any){
    this.nombre=nombre.target.value
    console.log(this.nombre)
    this.copia=[]
    if(this.nombre.length>0){
      this.nombre=this.nombre.toLowerCase()
      for(let material of this.original){
        if(material.nombre.toLowerCase().indexOf(this.nombre)>=0){
          this.copia.push(material)
        }
      }
    }
    else{
      for(let material of this.original){
        this.copia.push(material)
      }
    }
  }
  
  busqueda(){
    this.copia=[]
    if(this.nombre.length>0){
      this.nombre=this.nombre.toLowerCase()
      for(let material of this.original){
        if(material.nombre.toLowerCase().indexOf(this.nombre)>=0){
          this.copia.push(material)
        }
      }
    }
    else{
      for(let material of this.original){
        this.copia.push(material)
      }
    }
  }
}
