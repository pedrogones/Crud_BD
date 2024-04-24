import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Paciente } from '../../app/models/Paciente';
import { Observable, first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PacienteService {

  private readonly apiUrl = "/api/pacientes";
  constructor(private http: HttpClient) { }

  index(): Observable<Paciente[]> {
    return this.http.get<Paciente[]>(`${this.apiUrl}/listar-todos`).pipe(
      first()
    );
  }
  loadByCpf(cpf: any){
    return this.http.get<Paciente>(`${this.apiUrl}/buscar/${cpf}`)
   }
  listarPacientesPorNome(nomePaciente: string): Observable<Paciente[]>{
    return this.http.get<Paciente[]>(`${this.apiUrl}/listar/${nomePaciente}`)
  }

  create(paciente: Partial<Paciente>): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/cadastrar`, paciente, { responseType: 'text' as 'json' as 'json' });
  }
  getPacientePorCpf(cpfPaciente: any):Observable<Paciente>{
    return this.http.get<Paciente>(`${this.apiUrl}/${cpfPaciente}`).pipe(
      first()
    );
  }
  update(paciente: Partial<Paciente>): Observable<Paciente> {
    return this.http.put<Paciente>(`${this.apiUrl}/atualizar/${paciente.cpfPaciente}`, paciente, { responseType: 'text' as 'json' as 'json' });
  }
  delete(cpfPaciente: string): Observable<any> {
    const url = `${this.apiUrl}/deletar/${cpfPaciente}`;
    return this.http.delete(url, { responseType: 'text' as 'json' as 'json' });
  }

}
