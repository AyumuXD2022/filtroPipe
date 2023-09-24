import { Pipe, PipeTransform } from '@angular/core';
import { PersonaModel } from '../models/persona-model';

@Pipe({
  name: 'filterPersona'
})
export class FilterPersonaPipe implements PipeTransform {

  transform(personas: PersonaModel[], filtrarNombre: string, filtrarEmail: string, filtrarApellido:string, callback: (result: boolean) => void): PersonaModel[] {
    if (!personas || (!filtrarNombre && !filtrarEmail && !filtrarApellido)) {
      callback(true);
      return personas;
    }
    const result = personas.filter(persona => {
      const matchNombre = filtrarNombre ? persona.nombre.toLowerCase().includes(filtrarNombre.toLowerCase()) : true;
      const matchEmail = filtrarEmail ? persona.email.toLowerCase().includes(filtrarEmail.toLowerCase()) : true;
      const matchApellido = filtrarApellido ? persona.apellido.toLowerCase().includes(filtrarApellido.toLowerCase()) : true;
      return matchNombre && matchEmail && matchApellido;
    });
    callback(result.length > 0);
    return result;
  }
}
