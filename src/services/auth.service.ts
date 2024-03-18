import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cons, Head, Observable, Subject, catchError, delay, first, tap } from 'rxjs';
import { Consultas } from '../app/models/Consultas';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly apiUrl = "/api/consultas";
  constructor(private http: HttpClient) { }

  index(): Observable<Consultas[]> {
    return this.http.get<Consultas[]>(`${this.apiUrl}/all`).pipe(
      first()
    );
  }
  searchByName(nomePaciente: string): Observable<Consultas[]>{
    return this.http.get<Consultas[]>(`${this.apiUrl}/paciente/${nomePaciente}`)
  }
  searchByMedico(nomeMedico: string): Observable<Consultas[]>{
    return this.http.get<Consultas[]>(`${this.apiUrl}/medico/${nomeMedico}`)
  }
//add coment
  create(consulta: Partial<Consultas>): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/create`, consulta, { responseType: 'text' as 'json' as 'json' });
  }
  delete(id: number): Observable<any> {
    const url = `${this.apiUrl}/delete/${id}`;
    return this.http.delete(url, { responseType: 'text' as 'json' as 'json' });
  }

  update(consulta: Partial<Consultas>): Observable<Consultas> {
    const url = `${this.apiUrl}/${consulta.idConsulta}`;
    return this.http.put<Consultas>(`${this.apiUrl}/update/${consulta.idConsulta}`, consulta, { responseType: 'text' as 'json' as 'json' });
  }
  loadByID(_id: number){
    return this.http.get<Consultas>(`${this.apiUrl}/${_id}`)
   }

}

