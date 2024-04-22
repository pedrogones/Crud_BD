import { AuthService } from './../../services/auth.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { CommonModule } from '@angular/common';
import { Consultas } from '../models/Consultas';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { AuthUser } from '../models/AuthUser';
import { Medico } from '../models/Medico';
import { delay } from 'rxjs';
import { ModalInfoConsultaComponent } from './modal-info-consulta/modal-info-consulta.component';
import { FormsModule } from '@angular/forms';
import { Paciente } from '../models/Paciente';
import { ActivatedRoute } from '@angular/router';
import { PermissionsService } from '../controller/permissions.service';
import { ModalExportReportComponent } from './modal-export-report/modal-export-report.component';
import { ModalHistoryComponent } from './modal-history/modal-history.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatDialogModule, SharedModule, MatButtonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {

  authUser: AuthUser={
    id: 0,
    nome: '',
    role: 5,
    chavePrimaria:'111.111.111-11'
  }
  pacientes:Paciente[]=[{
    idPaciente: 1,
    nome: 'Pedro Krl',
    cpf: '123.123.123-21',
    role: 0
  },{
    idPaciente: 2,
    nome: 'HAbudabu aspin',
    cpf: '234.522.123-21',
    role: 0
  },
  {
    idPaciente: 8,
    nome: 'Prasputin',
    cpf: '635.045.123-21',
    role: 0
  }]
  medicos:Medico[]=[{
    idMedico:1,
  nome: 'Joao Gomes',
  email: 'string',
  senha: 'string',
  especialidade: 'string',
  role: 1,
  crm: '12312/PB'
  },
  {
    idMedico:2,
    nome: 'Pedro Gomes',
    email: 'string',
    senha: 'string',
    especialidade: 'asdasd',
    role: 1,
    crm: '12222/PB'
    }
]
  consultaIsEmpty = true;
  isContentVisible = false
  ngOnInit(): void {
    this.authUser.role = this.role.getRole()
    this.authUser.chavePrimaria = this.role.getChavePrimaria()
    console.log('role: '+this.authUser.role+'\nPrimari key:'+this.authUser.chavePrimaria)


    setTimeout(() => {
      this.isContentVisible = true; // Define como true após o atraso de 5 segundos
      this.index();
    }, 1500);

  }
  constructor(private role: PermissionsService, public dialog: MatDialog, private sharedService: SharedService, private http: AuthService, private cdr: ChangeDetectorRef) { }

  consultas: Consultas[] = [];
  openModal(idConsulta: any) {
    const dialogRef = this.dialog.open(ModalInfoConsultaComponent, {
      data: { idConsulta: idConsulta } // Passa o idConsulta como dado para a modal
    });
    dialogRef.afterClosed().subscribe(result => {
      this.index();
    });
  }
  index() {
   this.buscarConsultasPorRole(this.authUser.role)
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
    this.sharedService.create();
  }
  redirectUpdate(id: number) {
    this.sharedService.update(id);
  }
  //permissions
  /*
  *
   * nesta section vamos tratar as permissões
   * 0 -> Paciente
   * 1 -> Médico
   * 2 - > Administrador
   *
  */
 pacienteEmpty = false;
 medicoEmpty = false
 dataFilter= new Date()
  buscarConsultasPorRole(role: number) {
    console.log(this.sharedService.formatData(this.dataFilter))
    let consultaObservable;
    if (role === 0) {
      consultaObservable = this.http.consultasPorDataPaciente(this.authUser.chavePrimaria, this.dataFilter);
    } else if(role === 1){
      consultaObservable = this.http.consultasPorDataMedico(this.authUser.chavePrimaria, this.dataFilter)
    } else if (role === 2) {
      //Vamos usar esse: consultaObservable = this.http.consultasPorData(this.dataFilter);
      consultaObservable = this.http.index();
    } else {
      return;
    }
    consultaObservable.subscribe(
      (data: Consultas[]) => {
        this.consultas = data;
        this.consultaIsEmpty = this.consultas.length === 0;
        delay(3000); // Talvez você queira remover isso, pois pode não fazer sentido aqui
      },
      error => {
        let errorMessage;
        switch (role) {
          case 0:
            this.pacienteEmpty=true
            this.isContentVisible=false
            break;
          case 1:
            this.medicoEmpty=true
            this.isContentVisible=false
           break;
          case 2:
            errorMessage = 'Ocorreu um erro ao listar as consultas, tente novamente mais tarde';
            this.openDialog(errorMessage);
            break;
          default:
            errorMessage = 'Ocorreu um erro, tente novamente mais tarde';
            break;
          }
      }
    );
  }
  menuData = false
  menuPaciente = false
  //filtrar as consultas por medico selecionado
  menuMedico = false;
  openSelect(){
    this.menuMedico = true
  }

  hoje = new Date()
  minDate = this.hoje.toISOString().split('T')[0];
  buscarPorMedico(crm: string) {
    this.menuMedico = false;
    this.http.consultasPorDataMedico(crm, this.dataFilter).subscribe(
      (data: Consultas[]) => {
        this.consultas = data;
      },
      error => {
        this.openDialog('Ocorreu um erro ao buscar as consultas do médico, tente novamente mais tarde');
      }
    );
  }

  buscarConsultasPorData(data: any) {
    this.menuData = false;
    this.http.consultasPorDataPaciente(this.authUser.chavePrimaria, data).subscribe(
      (data: Consultas[]) => {
        this.consultas = data;
      },
      error => {
        this.openDialog('Ocorreu um erro ao buscar as consultas por data, tente novamente mais tarde');
      }
    );
  }

  buscarPorPaciente(cpf: any) {
    this.menuPaciente = false;
    this.http.consultasPorPaciente(cpf).subscribe(
      (data: Consultas[]) => {
        this.consultas = data;
      },
      error => {
        this.openDialog('Ocorreu um erro ao buscar as consultas do paciente, tente novamente mais tarde');
      }
    );
  }
  openModalRelatorio(){
    const dialogRef = this.dialog.open(ModalExportReportComponent);
    dialogRef.afterClosed().subscribe(result => {

    });
  }
  openModalHistorico(){
    const dialogRef = this.dialog.open(ModalHistoryComponent);
    dialogRef.afterClosed().subscribe(result => {

    });
  }

}
