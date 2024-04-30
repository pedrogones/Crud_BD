import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../../../shared/shared.service';
import { Consultas } from '../../models/Consultas';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { PermissionsService } from '../../controller/permissions.service';
import { PacienteService } from '../../../services/pacientesServices/paciente.service';
import { ConsultaRequest } from '../../models/ConsultaRequest';
import { MedicosService } from '../../../services/medicoServices/medicos.service';
import { ConsultasService } from '../../../services/consultasServices/consultas.service';
import { Medico } from '../../models/Medico';
import { DisponibilidadeHorarioService } from './Service/disponibilidade-horario.service';
import { Paciente } from '../../models/Paciente';
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
  availableTimes: any;
  menuData=false
  dataFilter =''
  hora = '';
  roleUser:any
  pkUser  : any
  medicos: Medico[]=[]
  paciente!:Paciente;
  selectedMedico=''
  constructor(
   private sharedService: SharedService,
   private medicoService: MedicosService,
   private pacienteService: PacienteService,
   private consultaService: ConsultasService,
   private horarioService: DisponibilidadeHorarioService) {
  }
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

    this.pacienteService.loadByCpf(this.pkUser).subscribe(
      (paciente: Paciente) => {
        this.paciente = paciente
        console.log(paciente)
      },
      (error) => {
        console.log("Erro ao obter dados do paciente:", error);
      }
    );
  }
  consultas: Consultas = {
    idConsulta: '',
    cpfPaciente: '',
    crm: '',
    dataConsulta: '',
    motivoConsulta: ''
  }
  validate_inputs(consulta: Consultas): boolean {
    if (this.selectedMedico == '' ||
      this.dataFilter == '' ||
      consulta.dataConsulta == '' ||
      consulta.motivoConsulta == ''||
      this.hora=='') {
      return false
    } else {
      return true
    }
  }
  onMedicoChange(data: any, crm:any){
    this.obterHorariosDisponiveis(data, crm)
  }

  async obterHorariosDisponiveis(data: string, crmMedico: string) {
      try {
        const availableTimesWithSeconds = await this.horarioService.obterHorariosDisponiveis(data, crmMedico);
        const availableTimes = availableTimesWithSeconds.map(time => time.substring(0, 5));
        this.availableTimes = availableTimes;
      } catch (error) {
        console.log(error);
      }
  }
  setHora(hora: string){
    this.selectHour = false;
    this.hora = hora;
  }
  formatDataTodb(hora: string): string {
    if (this.consultas.dataConsulta && hora) {
      const [ano, mes, dia] = this.consultas.dataConsulta.split('-');
      const [horas, minutos] = hora.split(':');
      const dataHoraFormatada = `${ano}-${mes}-${dia}T${horas}:${minutos}:00`;
      return dataHoraFormatada;
    } else {
      console.log('Data e/ou hora inválidas.');
      return '';
    }
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
              const consultaRequest: ConsultaRequest = {
                idConsulta:'',
                paciente: this.paciente,
                medico: medico,
                dataConsulta: datayhora,
                motivoConsulta: this.tipoConsulta,
                valorConsulta:0
              };
              console.log(consultaRequest)
              this.consultaService.create(consultaRequest).subscribe(
                (response) => {
                  this.sharedService.openDialog("Consulta criada com Sucesso");
                  this.sharedService.consultas();
                },
                (error) => {
                  this.sharedService.openDialog("Ocorreu um erro ao criar a consulta. É possível que já haja uma consulta nesse horário!");
                }
              );
        },
        (error) => {
          console.log("Erro ao obter dados do médico:", error);
        }
      );
    }
    consultaValue(): any {
      const paciente = this.paciente;
      let valorConsulta = 100;
      if (paciente.flamengo) {
        valorConsulta -= 5;
      }
      if (paciente.souza) {
        valorConsulta -= 5;
      }
      if (paciente.onepiece) {
        valorConsulta -= 5;
      }
      return valorConsulta;
    }
}
