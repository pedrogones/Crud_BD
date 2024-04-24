import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../../../shared/shared.service';
import { Consultas } from '../../models/Consultas';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { delay } from 'rxjs';
import { DatePickerComponent } from '../../../services/date-picker/date-picker.component';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { AuthUser } from '../../models/AuthUser';
import { PermissionsService } from '../../controller/permissions.service';
import { PacienteService } from '../../../services/pacientesServices/paciente.service';
import { ConsultaRequest } from '../../models/ConsultaRequest';
import { MedicosService } from '../../../services/medicoServices/medicos.service';
import { ConsultasService } from '../../../services/consultasServices/consultas.service';
import { Medico } from '../../models/Medico';
interface paciente{
  nome:string,
  id: number
}
interface medico{
  nome:string,
  id: string,
  especialidade: string,
}
@Component({
  selector: 'app-create',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule, FormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule,],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
  providers: [provideNativeDateAdapter()],
})

export class CreateComponent implements OnInit {

  menuData=false
  dataFilter =''
  paciente:paciente = {
    nome: 'joao pedro',
    id: 7
  }
  hora = '';
  roleUser:any
  pkUser  : any
  medicos: Medico[]=[]
  selectedMedico=''
  onMedicoChange(){}
  ngOnInit(): void {
    this.roleUser = localStorage.getItem('role')
    this.pkUser = localStorage.getItem('chavePrimaria')
    this.medicoService.index().subscribe(
      (data: Medico[]) => { // Certifique-se de que o método index() retorna Medico[]
        this.medicos = data;
      },
      (error) => {
        console.error('Erro ao obter os médicos:', error);
      }
    );
  
  }
  constructor(
   private sharedService: SharedService,
   private medicoService: MedicosService,
   private pacienteService: PacienteService,
   private consultaService: ConsultasService) {
  }
  consultas: Consultas = {
    idConsulta: '',
    cpfPaciente: '',
    crm: '',
    dataConsulta: '',
    motivoConsulta: ''
  }
  pacientes = [
    { nome: 'Joao Gomes', id: 0 },
    { nome: 'Maria Silva', id: 1 },
    { nome: 'José Santos', id: 2 }
];


  validate_inputs(consulta: Consultas): boolean {
    if (consulta.cpfPaciente == '' ||
      consulta.crm == '' ||
      consulta.dataConsulta == '' ||
      consulta.motivoConsulta == ''||
      this.hora=='') {
      return false
    } else {
      return true
    }
  }
  availableTimes = [
    { value: '10:00' },
    { value: '11:00' },
    { value: '13:30'}
  ];
  setHora(hora: string){
    this.selectHour = false;
   this.hora = hora;
  }
  formatDataTodb(hora: string): string {
    const dataConsulta = new Date(this.consultas.dataConsulta);
 // Verifica se a data e a hora são válidas
 if (dataConsulta instanceof Date && hora) {
  // Obtém a data
  const year = dataConsulta.getFullYear();
  const month = (dataConsulta.getMonth() + 1).toString().padStart(2, '0');
  const day = dataConsulta.getDate().toString().padStart(2, '0');

  // Formata a hora
  const [hours, minutes] = hora.split(':');

  // Formata a data e hora juntas
  const dataHoraFormatada = `${year}-${month}-${day}T${hours}:${minutes}:00`;
  return dataHoraFormatada;
}
return '';
} 
 hoje = new Date();
 amanha = new Date();
 setMinDate(){
   this.amanha.setDate(this.hoje.getDate() + 1);
   return this.amanha.toISOString().split('T')[0];
 }
 minDate = this.setMinDate()
  selectHour = false
  backHome() {this.sharedService.home()}

  dataConsulta(data: any) {this.menuData = false;}

  tipoConsulta=""
  save(): void {
    let datayhora = this.formatDataTodb(this.hora);
      this.medicoService.getMedicoPorCrm(this.selectedMedico).subscribe(
        (medico) => {
          this.pacienteService.loadByCpf(this.pkUser).subscribe(
            (paciente) => {
              const consultaRequest: ConsultaRequest = {
                idConsulta:'',
                paciente: paciente,
                medico: medico,
                dataConsulta: datayhora,
                motivoConsulta: this.tipoConsulta
              };
              console.log(consultaRequest)
              // Criar a consulta
              this.consultaService.create(consultaRequest).subscribe(
                (response) => {
                  this.sharedService.openDialog("Consulta criada com Sucesso");
                  this.sharedService.home();
                },
                (error) => {
                  this.sharedService.openDialog("Ocorreu um erro ao criar a consulta. É possível que já haja uma consulta nesse horário!");
                }
              );
            },
            (error) => {
              console.log("Erro ao obter dados do paciente:", error);
            }
          );
        },
        (error) => {
          console.log("Erro ao obter dados do médico:", error);
        }
      );
    }
  


}
