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
  getConsultasPaciente(cpfPaciente: any):Observable<Consultas[]>{
    return this.http.get<Consultas[]>(`${this.apiUrl}/${cpfPaciente}`).pipe(
      first()
    );
  }
  update(consulta: Partial<Consultas>): Observable<Consultas> {
    const url = `${this.apiUrl}/${consulta.idConsulta}`;
    return this.http.put<Consultas>(`${this.apiUrl}/update/${consulta.idConsulta}`, consulta, { responseType: 'text' as 'json' as 'json' });
  }
  loadByID(_id: any){
    return this.http.get<Consultas>(`${this.apiUrl}/${_id}`)
   }

   photoProfile(name: string): string {
    const trimmedName = name.trim();
    const initials = trimmedName.split(' ').map(segment => segment.charAt(0)).join('');
    const apiUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(initials)}&background=random&color=ffffff&size=200&rounded=true&bold=true&format=svg&length=1&uppercase=true`;
    return apiUrl;
  }



  /**
   * Fazer os metodos de filtro:
   * consultasPorData(data: date){} // retorna todas as data do dia
   * ConsultasPorDataPaciente(cpf: string, data: date){} // retorna todas consultas do paciente x na data y
   * ConsultasPorDataMedico(crm: string, data: date){} // retorna todas consultas do medico x na data y
   * ConsultasPorMedicoPaciente(cpf: string, crm: string){}// retorna todas consultas do medico x do paciente y
   * ConsultasPorMedicoAdm(crm: string){} // retorna todas consultas do medico x
   * ConsultasPorPaciente(cpf: string){} // retorna todas consultas do paciente x
   */
  consultasPorData(data: any):Observable<Consultas[]>{
    return this.http.get<Consultas[]>(`${this.apiUrl}/consultas/${data}`)
  } // retorna todas as data do dia
  consultasPorDataPaciente(cpf: any, data: any):Observable<Consultas[]>{
    return this.http.get<Consultas[]>(`${this.apiUrl}/consultas/${cpf}&${data}`)
  }
  consultasPorDataMedico(crm: any, data: any):Observable<Consultas[]>{
    return this.http.get<Consultas[]>(`${this.apiUrl}/consultas/${crm}&${data}`)
  }
  consultasPorMedicoPaciente(cpf: any, crm: any):Observable<Consultas[]>{
    return this.http.get<Consultas[]>(`${this.apiUrl}/consultas/${cpf}&${crm}`)
  }
  consultasPorMedicoAdm(crm: any):Observable<Consultas[]>{
    return this.http.get<Consultas[]>(`${this.apiUrl}/consultas/${crm}`)
  }
  consultasPorPaciente(cpf: any):Observable<Consultas[]>{
    return this.http.get<Consultas[]>(`${this.apiUrl}/consultas/${cpf}`)
  }
}

