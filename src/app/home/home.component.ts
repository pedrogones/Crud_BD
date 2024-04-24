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
import { Observable, delay } from 'rxjs';
import { ModalInfoConsultaComponent } from './modal-info-consulta/modal-info-consulta.component';
import { FormsModule } from '@angular/forms';
import { Paciente } from '../models/Paciente';
import { PermissionsService } from '../controller/permissions.service';
import { ModalExportReportComponent } from './modal-export-report/modal-export-report.component';
import { ConsultasService } from '../../services/consultasServices/consultas.service';
import { ConsultaRequest } from '../models/ConsultaRequest';
import { MedicosService } from '../../services/medicoServices/medicos.service';
import { error, log } from 'console';
import { MatTableDataSource } from '@angular/material/table';
import { PacienteService } from '../../services/pacientesServices/paciente.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatDialogModule, SharedModule, MatButtonModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {
  pacientes:Paciente[]=[]
  medicos: Medico[] = [];
  roleUser: any;
  pacienteEmpty=false
  medicoEmpty=false
  pkUser: any;
  pacienteLogado!: Paciente;
  dataSource = new MatTableDataSource<ConsultaRequest>();
  displayedColumns: string[] = ['idConsulta', 'nomePaciente', 'nomeMedico', 'dataConsulta', 'motivoConsulta'];
  consultaIsEmpty = true;
  isContentVisible = false;
  consultas: ConsultaRequest[] = [];

  constructor( public dialog: MatDialog, private sharedService: SharedService, private http: AuthService, private httpConsult: ConsultasService, private medicoService: MedicosService, private pacienteService: PacienteService) { }

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

    if(this.roleUser!=1){
      this.medicoService.index().subscribe((data: Medico[]) => {
        this.medicos = data;
      }, (error) => {
        console.log(error);
      });
    }
    if(this.roleUser!=0){
      this.pacienteService.index().subscribe((data: Paciente[])=>{
        this.pacientes = data;
      },(erro)=>{
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
replaceSpaceString(nome: string): string {
  return nome.replace(/\s+/g, '_');
}
  buscarConsultasPorRole(role: number) {
    let consultaObservable: Observable<ConsultaRequest[]>;
    if (role === 0) {
      consultaObservable = this.httpConsult.listarConsultasPaciente(this.pkUser);
    } else if (role === 1) {
      consultaObservable = this.httpConsult.listarConsultasPorCrm(this.pkUser);
    } else if (role === 2) {
      consultaObservable = this.httpConsult.index();
    } else {
      return;
    }
    consultaObservable.subscribe(
      (data: ConsultaRequest[]) => {
        this.consultas = data;
        this.dataSource.data = this.consultas;
        this.consultaIsEmpty = this.consultas.length === 0;
        if (data.length === 0) {
         if(this.roleUser==0){
          this.pacienteEmpty = true;
          this.isContentVisible = false;
          this.sharedService.openDialog('Nenhuma consulta encontrada!');
         } else if(this.roleUser==1){
            this.medicoEmpty = true;
            this.isContentVisible = false;
            this.sharedService.openDialog('Nenhuma consulta encontrada!');
           }
        }        delay(3000); // Talvez você queira fazer algo diferente com o atraso aqui.
      },
      error => {
        let errorMessage;
        switch (role) {
          case 0:
            this.pacienteEmpty = true;
            this.isContentVisible = false;
            break;
          case 1:
            this.medicoEmpty = true;
            this.isContentVisible = false;
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
  menuData = false;
  menuPaciente = false;
  menuMedico = false;

  openSelect() {
    this.menuMedico = true;
  }

  hoje = new Date();
  minDate = this.hoje.toISOString().split('T')[0];

  buscarPorMedico(nome: string) {
    this.menuMedico = false;
    if(nome==""){ this.index(); return}
    this.httpConsult.listarConsultasMedico(nome).subscribe(
      (data: ConsultaRequest[]) => {
        if (data && data.length > 0) {
          this.consultas = data;
          this.dataSource.data = this.consultas; // Atualiza a fonte de dados da tabela
          this.consultaIsEmpty = false;
        } else {
          this.index();
          this.sharedService.openDialog('Não há consultas para o médico selecionado.');
        }
      },
      error => {
        this.sharedService.openDialog('Ocorreu um erro ao buscar as consultas do médico, tente novamente mais tarde');
      }
    );
  }
  
  buscarConsultasPorData(data: any) {
   console.log(data)
    this.menuData = false;
    this.httpConsult.listarConsultasPorData(data).subscribe(
      (data: ConsultaRequest[]) => {
        if (data && data.length > 0) {
          this.consultas = data;
          this.dataSource.data = this.consultas;
          this.consultaIsEmpty = false;
        } else {
          this.index();
          this.sharedService.openDialog('Não há consultas para o médico selecionado.');
        }
      }
    );
   
  }

  buscarPorPaciente(nome: any) {
    this.menuPaciente = false;
    this.httpConsult.listarConsultasPaciente(nome).subscribe(
      (data: ConsultaRequest[]) => {
        if (data && data.length > 0) {
          this.consultas = data;
          this.dataSource.data = this.consultas; // Atualiza a fonte de dados da tabela
          this.consultaIsEmpty = false;
        } else {
          this.index();
          this.sharedService.openDialog('Não há consultas.');
        }
      }
    );
  }
  openModalRelatorio(){
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

}
