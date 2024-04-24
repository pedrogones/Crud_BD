import { Injectable } from '@angular/core';
import { Medico } from '../../app/models/Medico';
import { HttpClient } from '@angular/common/http';
import { Observable, first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MedicosService {
  private readonly apiUrl = "/api/medicos";
  constructor(private http: HttpClient) { }

  index(): Observable<Medico[]> {
    return this.http.get<Medico[]>(`${this.apiUrl}/listar-todos`).pipe(
      first()
    );
  }

  listarMedicosPorNome(nomeMedico: string): Observable<Medico[]>{
    return this.http.get<Medico[]>(`${this.apiUrl}/listar/${nomeMedico}`)
  }

  create(medico: Partial<Medico>): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/cadastrar`, medico, { responseType: 'text' as 'json' as 'json' });
  }

  getMedicoPorCrm(crm: string): Observable<Medico> {
    const url = `${this.apiUrl}/buscar?crm=${crm}`;
    return this.http.get<Medico>(url);
  }

  updateMedico(crmMedico: string, medico: Medico): Observable<any> {
    const url = `${this.apiUrl}/atualizar?crm=${crmMedico}`;
    return this.http.put(url, medico, { responseType: 'text' as 'json' as 'json' });
  }

  deleteMedico(crmMedico: string): Observable<any> {
    const url = `${this.apiUrl}/deletar?crm=${crmMedico}`;
    return this.http.delete(url);
  }

}
