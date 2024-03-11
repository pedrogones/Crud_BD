import { AuthService } from '../../services/auth.service';
import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { CommonModule } from '@angular/common';
import { Consultas } from '../models/Consultas';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './consultas.component.html',
  styleUrl: './consultas.component.scss'
})
export class ConsultasComponent {

  consultas: Consultas[] = [
    {
      id: 1,
      nomePaciente: 'Pedro Gomes',
      nomeMedico: 'João Marcos',
      dataConsulta: '20/03, 08:30',
      motivoConsulta: 'Consulta Especializada',
    },
    {
      id: 2,
      nomePaciente: 'Victor Gomes',
      nomeMedico: 'João Antônio',
      dataConsulta: '20/03, 09:30',
      motivoConsulta: 'Consulta de Rotina',
    },
    {
      id: 3,
      nomePaciente: 'Cassio Vittori',
      nomeMedico: 'Clauiana',
      dataConsulta: '20/03, 10:30',
      motivoConsulta: 'Consulta de Rotina',
    },
    {
      id: 4,
      nomePaciente: 'João Victor',
      nomeMedico: 'Antônio',
      dataConsulta: '20/03, 11:30',
      motivoConsulta: 'Consulta de Rotina',
    }
  ];


  constructor(private sharedService: SharedService, private http: AuthService) { }

  index() {

  }
  delete(id: number) {
    this.http.delete(id)
  }


  redirectCreate() {
    this.sharedService.create();
  }

  redirectUpdate(id: number) {
    this.sharedService.update(id);
  }

  
}
