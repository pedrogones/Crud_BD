import { Injectable } from '@angular/core';
import { ConsultasService } from '../../../../services/consultasServices/consultas.service';

export interface Horarios{
  hora:string;
}

@Injectable({
  providedIn: 'root'
})
export class DisponibilidadeHorarioService {

  constructor(private consultaService: ConsultasService) { }

  horariosDisponiveis: string[] = [
    "08:00:00", "08:30:00", "09:00:00", "09:30:00", "10:00:00", "10:30:00",
    "11:00:00", "11:30:00", "14:00:00", "14:30:00", "15:00:00", "15:30:00",
    "16:00:00", "16:30:00"
  ];
  /*
  horariosindisponiveis: string[] = [
    "08:00", "08:30", "09:30", "10:00", "16:30"
  ];
  */
  async obterHorariosDisponiveis(data: string, crmMedico: string) {
    try {
      // Obtém os horários indisponíveis do serviço
      const horariosIndisponiveis = await this.consultaService.horariosIndisponiveis(data, crmMedico).toPromise();
      console.log('Horários Indisponíveis:', horariosIndisponiveis);
      console.log('Horários Disponíveis:', this.horariosDisponiveis);
  
      // Filtra os horários disponíveis
      const horarioConsultas = this.horariosDisponiveis.filter((horario) => {
        if (horariosIndisponiveis) {
          return !horariosIndisponiveis.includes(horario);
        }
        return true; // Se horariosIndisponiveis for undefined, consideramos todos os horários como disponíveis
      });
  
      console.log('Horários para consultas:', horarioConsultas);
      return horarioConsultas;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  /*
  async obterHorariosDisponiveis(data: string, crmMedico: string): Promise<string[]> {
    try {
      const horariosIndisponiveis = await this.consultaService.horariosIndisponiveis(data, crmMedico).toPromise();
      console.log('Horários Indisponíveis:', horariosIndisponiveis);
      console.log('Horários Disponíveis:', this.horariosDisponiveis);
  
      // Filtrar os horários disponíveis
      const horariosDisponiveis = this.horariosDisponiveis.filter(horarioDisponivel => {
        // Verificar se o horário disponível não está presente nos horários indisponíveis
        if(horariosIndisponiveis){return !horariosIndisponiveis.includes(horarioDisponivel);}
      });
  
      console.log('Horários Disponíveis Após Filtragem:', horariosDisponiveis);
      return horariosDisponiveis;
    } catch (error) {
      console.log(error);
      return [];
    }
  }
  */
  
  
  
}
