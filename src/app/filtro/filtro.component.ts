import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { PersonaModel } from '../models/persona-model';
import { PersonaService } from '../services/persona.service';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit{
onMostrarPorChange() {
  this.getPersona()
}
  personas: PersonaModel[] = [];
  mostrarPor= "";
  currentPage = 1;
  filtrarNombre = "";
  filtrarEmail= "";
  filtrarApellido = "";
  noResultados: boolean = false;
  totalPages!: number;
  totalItems!:number;
  constructor(private personaService: PersonaService,private cdRef: ChangeDetectorRef) {
    
  }
  ngOnInit(): void {
    this.getPersona()
  }

  private getPersona() {
    this.personaService.getPersonas(this.currentPage, this.mostrarPor).subscribe(
      ( response ) => {
        this.personas = response.response.data;  // Asumiendo que los datos vienen en response.response.data
        this.totalPages = response.response.totalPages;  // Actualizar totalPages
        this.noResultados = this.personas?.length === 0;
        this.totalItems = response.response.totalItems
        console.log(this.totalItems)
      }
    )
  }
  protected onFiltroPalabraChange() {
    this.noResultados = false;
    this.cdRef.detectChanges();
  }
  updateNoResultados(result: boolean) {
    this.noResultados = !result;
  }
  prevPage() {
    if (this.currentPage > 1) {
        this.currentPage--;
        this.getPersona();
    }
}

nextPage() {
    if (this.currentPage < this.totalPages) {
        this.currentPage++;
        this.getPersona();
    }
}
}
