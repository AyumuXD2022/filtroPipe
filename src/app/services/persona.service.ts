import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonaService {

  constructor(private http:HttpClient) { }

  getPersonas(currentPage:number,limit:string):Observable<any>{
    const urlBackend = `http://localhost:5001/api/get/personas?page=${currentPage}&limit=${limit}`;
    return this.http.get<any>(urlBackend);
  }
}
