import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consultas } from '../app/models/Consultas';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl:any // Exemplo de URL base com caminho para as Consultas

  constructor(private http: HttpClient) { }

  index(): Observable<Consultas[]> {
    return this.http.get<Consultas[]>(`${this.apiUrl}`);
  }

  create(consulta: Consultas): Observable<Consultas> {
    return this.http.post<Consultas>(`${this.apiUrl}`, consulta);
  }

  delete(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }

  update(id: number, updatedConsulta: Consultas): Observable<Consultas> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<Consultas>(url, updatedConsulta);
  }
}

