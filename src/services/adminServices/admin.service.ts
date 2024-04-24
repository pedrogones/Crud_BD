import { Injectable } from '@angular/core';
import { Admin } from '../../app/models/Admin';
import { HttpClient } from '@angular/common/http';
import { Observable, first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  private readonly apiUrl = "/api/admins";
  constructor(private http: HttpClient) { }

  loadByCpf(cpf: any){
    return this.http.get<Admin>(`${this.apiUrl}/buscar/${cpf}`)
   }

  create(admin: Partial<Admin>): Observable<string> {
    return this.http.post<string>(`${this.apiUrl}/cadastrar`, admin, { responseType: 'text' as 'json' as 'json' });
  }
  getadmi(cpfadmin: any):Observable<Admin[]>{
    return this.http.get<Admin[]>(`${this.apiUrl}/buscar/${cpfadmin}`).pipe(
      first()
    );
  }
  update(admin: Partial<Admin>): Observable<Admin> {
    return this.http.put<Admin>(`${this.apiUrl}/atualizar/${admin.cpfAdmin}`, admin, { responseType: 'text' as 'json' as 'json' });
  }
  delete(cpfAdm: string): Observable<any> {
    const url = `${this.apiUrl}/deletar/${cpfAdm}`;
    return this.http.delete(url, { responseType: 'text' as 'json' as 'json' });
  }
}
