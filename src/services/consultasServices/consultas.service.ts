import { Injectable } from '@angular/core';
import { Consultas } from '../../app/models/Consultas';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, first, map } from 'rxjs';
import { ConsultaRequest } from '../../app/models/ConsultaRequest';

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
      console.log(`${this.apiUrl}/listar/paciente/${nomePaciente}`)
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
    listarConsultasPorCrm_Cpf(crm:String, cpf:string): Observable<ConsultaRequest[]>{
      console.log(`${this.apiUrl}/paciente-medico?cpfPaciente=${cpf}&crm=${crm}`)
      return this.http.get<ConsultaRequest[]>(`${this.apiUrl}/paciente-medico?cpfPaciente=${cpf}&crm=${crm}`);
    }
    listarConsultasPorData(data: string): Observable<ConsultaRequest[]> {
      return this.http.get<ConsultaRequest[]>(`${this.apiUrl}/data?data=${data}`);
    }
    listarConsultasPorDataECpf(data: string, cpfPaciente: string): Observable<ConsultaRequest[]> {
      const url = `${this.apiUrl}/paciente/dia?data=${data}&cpfPaciente=${cpfPaciente}`;
      return this.http.get<ConsultaRequest[]>(url);
    }
    listarConsultasPorDataECrm(data: string, crm: string): Observable<ConsultaRequest[]> {
      const url = `${this.apiUrl}/medico/dia?data=${data}&crm=${crm}`;
      console.log(url)
      return this.http.get<ConsultaRequest[]>(url);
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

    gerarRelatorio(): Observable<Blob> {
      // Define os cabeçalhos para indicar que a resposta é um arquivo para download
      const headers = new HttpHeaders({
        'Content-Type': 'application/octet-stream',
      });

      // Faz a solicitação HTTP para o endpoint de exportação de tabela
      return this.http.get(`${this.apiUrl}/exportar-tabela`, {
        responseType: 'blob', // Tipo de resposta é um blob (arquivo)
        headers: headers, // Adiciona os cabeçalhos definidos
      });
    }
    gerarRelatorioPorDatas(dataInicio: string, dataFim: string, crm: string): Observable<Blob> {
      const headers = new HttpHeaders({
        'Content-Type': 'application/octet-stream',
      });

    console.log("API: "+`${this.apiUrl}/medico/exportar-tabela`)
      return this.http.get(`${this.apiUrl}/medico/exportar-tabela`, {
        responseType: 'blob', // Tipo de resposta é um blob (arquivo)
        headers: headers, // Adiciona os cabeçalhos definidos
        params: {
          dataInicio: dataInicio,
          dataFim: dataFim,
          crm: crm,
        },
      });
    }
  }

