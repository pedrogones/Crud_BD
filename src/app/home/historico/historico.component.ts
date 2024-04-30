import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConsultasService } from '../../../services/consultasServices/consultas.service';
import { SharedService } from '../../../shared/shared.service';
import { ConsultaRequest } from '../../models/ConsultaRequest';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { Consultas } from '../../models/Consultas';
import { Medico } from '../../models/Medico';
import { Paciente } from '../../models/Paciente';
import { PacienteService } from '../../../services/pacientesServices/paciente.service';
import { MedicosService } from '../../../services/medicoServices/medicos.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-historico',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './historico.component.html',
  styleUrl: './historico.component.scss'
})
export class HistoricoComponent {
  role: any;
  pkUser: any;

  constructor(
    private http: AuthService,
    private sharedService: SharedService,
    private consultasService: ConsultasService,
    private pacienteService: PacienteService,
    private medicosService: MedicosService
  ) {}

  pacienteSelect = '';
  pacientes: Paciente[] = [];
  showContent = false;

  dataSource = new MatTableDataSource<ConsultaRequest>();
  displayedColumns: string[] = ['dataConsulta', 'nomePaciente', 'nomeMedico', 'motivoConsulta'];

  ngOnInit(): void {
    this.role = localStorage.getItem('role');
    this.pkUser = localStorage.getItem('chavePrimaria');
    this.loadConsultas();
  }

  formatHora(data: any) {
    return this.sharedService.converterData(data);
  }

  formatDate(data: any) {
    return this.sharedService.dateRigthFormat(data);
  }

  loadConsultas() {
    let observable;
    if (this.role == 0) {
      this.loadMedicos();
      observable = this.consultasService.listarConsultasPorCpf(this.pkUser);
      observable.subscribe(
        (data: ConsultaRequest[]) => {
          this.consultas = data;
          this.dataSource.data = this.consultas;
          this.showContent = true;
        },
        (er) => {
          console.log(er);
        }
      );
    } else if (this.role == 1) {
      this.loadPacientes();
      observable = this.consultasService.listarConsultasPorCrm(this.pkUser);
      observable.subscribe(
        (data: ConsultaRequest[]) => {
          this.consultas = data;
          this.dataSource.data = this.consultas;
          this.showContent = true;
        },
        (er) => {
          console.log(er);
        }
      );
    } else {
      this.loadMedicos();
      this.loadPacientes();
      observable = this.consultasService.index();
      observable.subscribe(
        (data: ConsultaRequest[]) => {
          this.consultas = data;
          this.dataSource.data = this.consultas;
          this.showContent = true;
        },
        (er) => {
          console.log(er);
        }
      );
    }
  }

  loadPacientes() {
    this.pacienteService.index().subscribe(
      (data: Paciente[]) => {
        this.pacientes = data;
      },
      (er) => {
        console.log(er);
      }
    );
  }

  loadMedicos() {
    this.medicosService.index().subscribe(
      (data: Medico[]) => {
        this.medicos = data;
      },
      (er) => {
        console.log(er);
      }
    );
  }
  loadByPaciente(nome: string) {
    this.medicoSelect=''
    this.consultasService.listarConsultasPaciente(nome).subscribe(
      (data: ConsultaRequest[]) => {
        if (data && data.length > 0) {
          this.consultas = data;
          this.dataSource.data = this.consultas;
        } else {
          this.loadConsultas();
          this.sharedService.openDialog('Não há historico com o paciente selecionado.');
        }
      },
      error => {
        this.sharedService.openDialog('Ocorreu um erro ao buscar  o historico, tente novamente mais tarde');
      }
    );
    nome=''
  }
  
  loadByMedico(nome: string) {
    this.pacienteSelect=''
    this.consultasService.listarConsultasMedico(nome).subscribe(
      (data: ConsultaRequest[]) => {
        if (data && data.length > 0) {
          this.consultas = data;
          this.dataSource.data = this.consultas;
        } else {
          this.loadConsultas();
          this.sharedService.openDialog('Não há historico com o médico selecionado.');
        }
      },
      error => {
        this.sharedService.openDialog('Ocorreu um erro ao buscar  o historico, tente novamente mais tarde');
      }
    );
    nome=''
  }
  
  consultas!: ConsultaRequest[];
  medicoSelect = '';
  medicos!: Medico[];
}
