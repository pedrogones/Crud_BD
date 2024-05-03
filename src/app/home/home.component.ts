import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { Medico } from '../models/Medico';
import { Observable } from 'rxjs';
import { ModalInfoConsultaComponent } from './modal-info-consulta/modal-info-consulta.component';
import { FormsModule } from '@angular/forms';
import { Paciente } from '../models/Paciente';
import { ModalExportReportComponent } from './modal-export-report/modal-export-report.component';
import { ConsultasService } from '../../services/consultasServices/consultas.service';
import { ConsultaRequest } from '../models/ConsultaRequest';
import { MedicosService } from '../../services/medicoServices/medicos.service';
import { MatTableDataSource } from '@angular/material/table';
import { PacienteService } from '../../services/pacientesServices/paciente.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatDialogModule, SharedModule, MatButtonModule, FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  pacientes: Paciente[] = []
  medicos: Medico[] = [];
  roleUser: any;
  pacienteEmpty = false
  medicoEmpty = false
  admEmpty = false
  pkUser: any;
  pacienteLogado!: Paciente;
  dataSource = new MatTableDataSource<ConsultaRequest>();
  consultaIsEmpty = true;
  isContentVisible = false;
  consultas: ConsultaRequest[] = [];
  hoje = new Date();
  minDate = this.getMinDay();
  constructor(public dialog: MatDialog, private sharedService: SharedService, private http: AuthService, private httpConsult: ConsultasService, private medicoService: MedicosService, private pacienteService: PacienteService) { }

  ngOnInit(): void {
    if (typeof localStorage !== 'undefined') {
      this.pkUser = localStorage.getItem('chavePrimaria');
      this.roleUser = Number(localStorage.getItem('role'));
    } else {
      return
    }
    console.log('role: ' + this.roleUser + '\nPrimari key:' + this.pkUser);
    setTimeout(() => {
      this.isContentVisible = true;
      this.index();
    }, 1500);

    if (this.roleUser != 1) {
      this.medicoService.index().subscribe((data: Medico[]) => {
        this.medicos = data;
      }, (error) => {
        console.log(error);
      });
    }
    if (this.roleUser != 0) {
      this.pacienteService.index().subscribe((data: Paciente[]) => {
        this.pacientes = data;
      }, (erro) => {
        console.log(erro)
      }
      )
    }
  }

  dataFilter = ''
  openModal(idConsulta: any) {
    const dialogRef = this.dialog.open(ModalInfoConsultaComponent, {
      data: { idConsulta: idConsulta }
    });
    dialogRef.afterClosed().subscribe(result => {
      this.index();
    });
  }

  buscarConsultasPorRole(role: number) {
    let consultaObservable: Observable<ConsultaRequest[]>;

    switch (role) {
      case 0:
        consultaObservable = this.httpConsult.listarConsultasPorDataECpf(this.minDate, this.pkUser);
        break;
      case 1:
        consultaObservable = this.httpConsult.listarConsultasPorDataECrm(this.minDate, this.pkUser);
        break;
      case 2:
        consultaObservable = this.httpConsult.listarConsultasPorData(this.minDate);
        break;
      default:
        return;
    }

    consultaObservable.subscribe(
      (data: ConsultaRequest[]) => {
        this.consultas = data;
        this.dataSource.data = this.consultas;
        this.consultaIsEmpty = this.consultas.length === 0;

        if (data.length === 0) {
          if (this.roleUser === 0) {
            this.pacienteEmpty = true;
            this.isContentVisible = false;
          } else if (this.roleUser === 1) {
            this.medicoEmpty = true;
            this.isContentVisible = false;
          }else{
            this.admEmpty = true;
            this.isContentVisible = false;
          }
        }
      },
      error => {
        let errorMessage = 'Ocorreu um erro';
        switch (role) {
          case 0:
            this.pacienteEmpty = true;
            break;
          case 1:
            this.medicoEmpty = true;
            break;
          case 2:
            errorMessage = 'Ocorreu um erro ao listar as consultas, tente novamente mais tarde';
            this.openDialog(errorMessage);
            break;
        }
        this.isContentVisible = false;
      }
    );
  }

  menuData = false;
  menuPaciente = false;
  menuMedico = false;

  openSelect() {
    this.menuMedico = true;
  }

  allConsultas(){
    if(this.roleUser==0){
      console.log("deveria estar aq")
      this.httpConsult.listarConsultasPorCpf(this.pkUser).subscribe((data: ConsultaRequest[])=>{
        if (data && data.length > 0) {
          this.consultas = data;
          this.dataSource.data = this.consultas; // Atualiza a fonte de dados da tabela
          this.consultaIsEmpty = false;
          this.pacienteEmpty=false
          this.isContentVisible = true;
        }
      }, (er)=>{
        this.sharedService.openDialog("Não há consultas para esse paciente!")
      })
    } else if(this.roleUser==1){
      this.httpConsult.listarConsultasPorCrm(this.pkUser).subscribe((data: ConsultaRequest[])=>{
        if (data && data.length > 0) {
          this.consultas = data;
          this.dataSource.data = this.consultas; // Atualiza a fonte de dados da tabela
          this.consultaIsEmpty = false;
          this.medicoEmpty=false
          this.isContentVisible = true;
        }
      }, (er)=>{
        console.log(er)
        this.sharedService.openDialog("Não há consultas para esse médico!")
      })
    }else{
      this.httpConsult.index().subscribe((data: ConsultaRequest[])=>{
        if (data && data.length > 0) {
          this.consultas = data;
          this.dataSource.data = this.consultas; // Atualiza a fonte de dados da tabela
          this.consultaIsEmpty = false;
          this.admEmpty=false
          this.isContentVisible = true;
        }
      }, (er)=>{
        console.log(er)
        this.sharedService.openDialog("Não há consultas marcadas!")
      })
    }
  }
  buscarPorMedico(crm: string) {
    this.menuMedico = false;
    if (crm == "") { this.index(); return }
    this.httpConsult.listarConsultasPorCrm_Cpf(crm, this.pkUser).subscribe(
      (data: ConsultaRequest[]) => {
        if (data && data.length > 0) {
          this.consultas = data;
          this.dataSource.data = this.consultas; // Atualiza a fonte de dados da tabela
          this.consultaIsEmpty = true;
          this.admEmpty=false
          this.isContentVisible = true;
        } else {
        this.sharedService.openDialog("Não há consultas com esse médico!")
          this.index();
        }
      },
      error => {
        this.sharedService.openDialog('Ocorreu um erro ao buscar as consultas do médico, tente novamente mais tarde');
      }
    );
  }
  buscarConsultasPorData(data: any) {
    this.dataShowInTemplate = this.dataTemplate(data)
    console.log(data)
    this.menuData = false;
    if (this.roleUser == 2) {
      this.httpConsult.listarConsultasPorData(data).subscribe(
        (data: ConsultaRequest[]) => {
          if (data && data.length > 0) {
            this.consultas = data;
            this.dataSource.data = this.consultas;
            this.consultaIsEmpty = true;
            this.admEmpty = false;
            this.isContentVisible = true;
          } else {
            this.index();
            this.sharedService.openDialog('Não há consultas a data selecionada.');
          }
        }
      );
    } else if (this.roleUser == 0) {
      this.httpConsult.listarConsultasPorDataECpf(data, this.pkUser).subscribe(
        (data: ConsultaRequest[]) => {
          if (data && data.length > 0) {
            this.consultas = data;
            this.dataSource.data = this.consultas;
            this.consultaIsEmpty = true
            this.admEmpty = false;
            this.isContentVisible = true;
          } else {
            this.sharedService.openDialog('Não há consultas na data selecionada.');
          }
        },
        error => {
          console.error('Ocorreu um erro ao listar consultas por data:', error);
          this.sharedService.openDialog('Ocorreu um erro ao listar consultas. Por favor, tente novamente mais tarde.');
        }
      );
    } else {
      this.httpConsult.listarConsultasPorDataECrm(data, this.pkUser).subscribe(
        (data: ConsultaRequest[]) => {
          if (data && data.length > 0) {
            this.consultas = data;
            this.dataSource.data = this.consultas;
            this.consultaIsEmpty = true
            this.medicoEmpty = false;
            this.isContentVisible = true;
          } else {
            this.sharedService.openDialog('Não há consultas na data selecionada.');
          }
        },
        error => {
          console.error('Ocorreu um erro ao listar consultas por data:', error);
          this.sharedService.openDialog('Ocorreu um erro ao listar consultas. Por favor, tente novamente mais tarde.');
        }
      );
    }
  }
  buscarPorPaciente(cpf: any, nome: any) {
    if(this.roleUser==2){
      this.menuPaciente = false;
      this.httpConsult.listarConsultasPaciente(nome).subscribe(
        (data: ConsultaRequest[]) => {
          if (data && data.length > 0) {
            this.consultas = data;
            this.dataSource.data = this.consultas; // Atualiza a fonte de dados da tabela
            this.isContentVisible = true
            this.consultaIsEmpty = false
           if(this.roleUser==1){this.medicoEmpty = false} else{this.admEmpty=false}
          } else {
            this.sharedService.openDialog('Não há consultas com esse paciente.');
          }
        }
      );
    } else if(this.roleUser==1){
      this.menuPaciente = false;
      this.httpConsult.listarConsultasPorCrm_Cpf(this.pkUser, cpf).subscribe(
        (data: ConsultaRequest[]) => {
          if (data && data.length > 0) {
            this.consultas = data;
            this.dataSource.data = this.consultas; // Atualiza a fonte de dados da tabela
            this.isContentVisible = true
            this.consultaIsEmpty = false
           if(this.roleUser==1){this.medicoEmpty = false} else{this.admEmpty=false}
          } else {
            this.sharedService.openDialog('Não há consultas com esse paciente.');
          }
        }
      );

    }
  }
  openModalRelatorio() {
    const dialogRef = this.dialog.open(ModalExportReportComponent);
    dialogRef.afterClosed().subscribe(result => {

    });
  }
  index() {
    this.buscarConsultasPorRole(this.roleUser)
  }
  openDialog(message: string) {
    this.sharedService.openDialog(message)
  }
  delete(id: number) {
  }
  converterData(data: any): string {
    return this.sharedService.converterData(data)
  }

  redirectCreate() {
    this.sharedService.createRole(this.roleUser, this.pkUser);
  }
  redirectUpdate(id: number) {
    this.sharedService.updateRole(id, this.roleUser, this.pkUser);
  }
  getMinDay():string{
    let ano = this.hoje.getFullYear();
    let mes = (this.hoje.getMonth() + 1).toString().padStart(2, '0');
    let dia = this.hoje.getDate().toString().padStart(2, '0');
    return `${ano}-${mes}-${dia}`

   }
  dataTemplate(data: string): string {
    console.log(this.hoje)
    if (!data) {
      const [ano, mes, dia] = this.minDate.split('-');
      return `${dia}/${mes}/${ano}`;
    } else {
      const [ano, mes, dia] = data.split('-');
      return `${dia}/${mes}/${ano}`;
    }
  }
  dataShowInTemplate = this.dataTemplate(this.minDate)

}
