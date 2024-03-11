import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Consultas } from '../app/models/Consultas';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = "http://localhost:8080/api/consultas"


  constructor(private http: HttpClient) { }
 
  index(): Observable<Consultas[]> {
    console.log("chegou")
    return this.http.get<Consultas[]>(`${this.apiUrl}/all`);
  }

  create(consulta: Partial<Consultas>): Observable<Consultas> {
    const  headers = new HttpHeaders()
    .set("Content-type", 'application/json');
    return this.http.post<Consultas>(`${this.apiUrl}/create`, consulta, {headers});
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

