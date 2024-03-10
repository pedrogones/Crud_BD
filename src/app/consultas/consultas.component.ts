import { AuthService } from '../../services/auth.service';
import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { CommonModule } from '@angular/common';
import { Consultas } from '../models/Consultas';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
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
