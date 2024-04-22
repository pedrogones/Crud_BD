import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Consultas } from '../../models/Consultas';
import { SharedService } from '../../../shared/shared.service';
import { AuthService } from '../../../services/auth.service';
import { Paciente } from '../../models/Paciente';
import { FormsModule } from '@angular/forms';
import { Medico } from '../../models/Medico';

@Component({
  selector: 'app-modal-history',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './modal-history.component.html',
  styleUrl: './modal-history.component.scss'
})
export class ModalHistoryComponent implements OnInit{

  constructor(private http: AuthService, private sharedService: SharedService) {

  }
  authUser=0
  pacienteSelect = ''
  pacientes: Paciente[]=[{
    idPaciente: 1,
    nome: 'Pedro asda',
    cpf: '123.123.123-23',
    role: 2
  },
  {
    idPaciente: 2,
    nome: 'Joao Vistor',
    cpf: '123.422.434-23',
    role: 2
  },
  {
    idPaciente: null,
    nome: 'Cssio vitori',
    cpf: '156.567.999-23',
    role: 2
  }
]
  showContent = false
  ngOnInit(): void {
    let observable;
      observable = this.http.index()
      observable.subscribe((data: Consultas[]) => {
        this.consultas = data
      this.showContent = true})
  }

  formatHora(data: any){
    return  this.sharedService.converterData(data)
  }
  formatDate(data:any){
    return this.sharedService.dateRigthFormat(data)
  }

  consultas: Consultas[] = [];
  medicoSelect = '';
medicos: Medico[] = [
  {
    idMedico: 1,
    nome: 'Dr. José Silva',
    especialidade: 'Cardiologia',
    email: '',
    senha: '',
    role: 0,
    crm: ''
  },
  {
    idMedico: 2,
    nome: 'Dra. Maria Oliveira',
    especialidade: 'Pediatria',
    email: '',
    senha: '',
    role: 0,
    crm: ''
  },
  // Adicione outros médicos conforme necessário
];
}
