import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../../../shared/shared.service';
import { Consultas } from '../../models/Consultas';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { Cons, Subject, delay } from 'rxjs';
import { DatePickerComponent } from '../../../services/date-picker/date-picker.component';
import { AuthService } from '../../../services/auth.service';
import { CommonModule } from '@angular/common';
import { AuthUser } from '../../models/AuthUser';
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
  @ViewChild(DatePickerComponent)
  datePickerComponent!: DatePickerComponent<any>;
  exampleHeader = DatePickerComponent;

  //para mudar o layout que será renderizado na tela mude a variavel authUser ára 1 ou 0
  authUser=0;
  menuData=false
  dataFilter =''
  private authUser1: AuthUser = {
    id: 0,
    nome: '',
    role: -1,
    chavePrimaria: '',
    email: '',
    senha: ''
  };

  paciente:paciente = {
    nome: 'joao pedro',
    id: 7
  }
  hora = '';

  ngOnInit(): void {
  }
  minDate = new Date();
  constructor(
    private sharedService: SharedService, private http: AuthService) {
  }
  consultas: Consultas = {
    idConsulta: null,
    nomePaciente: '',
    nomeMedico: '',
    dataConsulta: '',
    motivoConsulta: ''
  }
  pacientes = [
    { nome: 'Joao Gomes', id: 0 },
    { nome: 'Maria Silva', id: 1 },
    { nome: 'José Santos', id: 2 }
];


  validate_inputs(consulta: Consultas): boolean {
    if (consulta.nomePaciente == '' ||
      consulta.nomeMedico == '' ||
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

  formatDataTodb(): any{
    if (this.consultas.dataConsulta instanceof Date) {
      const year = this.consultas.dataConsulta.getUTCFullYear();
      const month = (this.consultas.dataConsulta.getUTCMonth() + 1).toString().padStart(2, '0'); // Mês começa em 0
      const day = this.consultas.dataConsulta.getUTCDate().toString().padStart(2, '0');
      const hours = this.hora.substring(0, 2); // Obtém as horas da string
      const minutes = this.hora.substring(3); // Obtém os minutos da string
      const seconds = this.consultas.dataConsulta.getUTCSeconds().toString().padStart(2, '0');
      const dataConsultaFormatada = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
      return dataConsultaFormatada;
    }
  }
  save(): void {if(this.authUser==1){
    this.consultas.nomePaciente=this.paciente.nome
  }
    if (this.validate_inputs(this.consultas)) {
      this.consultas.dataConsulta =  this.formatDataTodb()
      console.log(this.consultas)
      this.http.create(this.consultas)
      .pipe(
        delay(2000) // Atraso de 2 segundos
      ).subscribe(
        (response: any) => {
         this.sharedService.openDialog("Consulta criada com Sucesso");
          this.sharedService.home();
        },
        error => {
          this.sharedService.openDialog("Ocorreu um erro ao criar a consulta. é possível que já haja uma consulta nesse horário!")
        }
      );
    } else {
     this.sharedService.openDialog('Preencha todos os campos!');
    }
  }
  selectHour = false
  backHome() {
   if(this.authUser==0){
    this.sharedService.home()
   }else if(this.authUser==1){
    this.sharedService.consultas()
   }
  }

  dataConsulta(data: any) {
    this.menuData = false;
   console.log(data)
  }

}
