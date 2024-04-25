import { Injectable } from '@angular/core';
import { Consultas } from '../../app/models/Consultas';
import { HttpClient } from '@angular/common/http';
import { Observable, first, map } from 'rxjs';
import { ConsultaRequest } from '../../app/models/ConsultaRequest';
import { Horarios } from '../../app/models/Horarios';


@Injectable({
  providedIn: 'root'
})

export class ConsultasService {

    private readonly apiUrl = "/api/consultas";
    constructor(private http: HttpClient) { }

    create(consulta: Partial<ConsultaRequest>): Observable<string> {
      return this.http.post<string>(`${this.apiUrl}/create`, consulta, { responseType: 'text' as 'json' as 'json' });
    }
    loadById(id: any){
      console.log(id)
      return this.http.get<ConsultaRequest>(`${this.apiUrl}/${id}`)
    }
    listarConsultasPaciente(nomePaciente: string): Observable<ConsultaRequest[]>{
      return this.http.get<ConsultaRequest[]>(`${this.apiUrl}/listar/paciente/${nomePaciente}`)
    }

    horariosIndisponiveis(data: string, crm: string): Observable<string[]> {
      const params = { data, crm };
      console.log(crm, data)
      return this.http.get<string[]>(`${this.apiUrl}/horarios-indisponiveis`, { params });
    }  
    listarConsultasMedico(nomeMedico: string): Observable<ConsultaRequest[]>{
      
      return this.http.get<ConsultaRequest[]>(`${this.apiUrl}/medico/${nomeMedico}`)
    }
    listarConsultasPorCrm(crmMedico: string): Observable<ConsultaRequest[]> {
      return this.http.get<ConsultaRequest[]>(`${this.apiUrl}/medico?crm=${crmMedico}`);
    }
    
    listarConsultasPorData(data: string): Observable<ConsultaRequest[]> {
      return this.http.get<ConsultaRequest[]>(`${this.apiUrl}/data?data=${data}`);
    }
    listarConsultasPorCpf(cpf: string): Observable<ConsultaRequest[]> {
      return this.http.get<ConsultaRequest[]>(`${this.apiUrl}/paciente/${cpf}`);
    }
    index(): Observable<ConsultaRequest[]> {
      return this.http.get<ConsultaRequest[]>(`${this.apiUrl}/all`).pipe(
        first()
      );
    }
    delete(idConsulta: string): Observable<any> {
      console.log("Id:"+ idConsulta)
      const url = `${this.apiUrl}/delete/${idConsulta}`;
      return this.http.delete(url, { responseType: 'text' as 'json' as 'json' });
    }

    //retirei
    update(paciente: Partial<Consultas>): Observable<Consultas> {
      return this.http.put<Consultas>(`${this.apiUrl}/atualizar/${paciente.cpfPaciente}`, paciente, { responseType: 'text' as 'json' as 'json' });
    }

  }

