import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../../../shared/shared.service';
import { Consultas } from '../../models/Consultas';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { Subject, delay } from 'rxjs';
import { DatePickerComponent } from '../../../services/date-picker/date-picker.component';
<<<<<<< HEAD
import { AuthService } from '../../../services/auth.service';
=======
import { CommonModule } from '@angular/common';
>>>>>>> 49dce922ad689bb2196d2c67f478315e6fc3f2a1

@Component({
  selector: 'app-create',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ CommonModule,FormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule,],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss',
  providers: [provideNativeDateAdapter()],
})
export class CreateComponent implements OnInit {
  @ViewChild(DatePickerComponent)
  datePickerComponent!: DatePickerComponent<any>;
  exampleHeader = DatePickerComponent;

  hora = '08:00';

  ngOnInit(): void {
  }
  hora!: string;
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

  validate_inputs(consulta: Consultas):boolean{
    if(consulta.nomePaciente==''||
    consulta.nomeMedico==''||
    consulta.dataConsulta==''||
    consulta.motivoConsulta==''){
      return false
    }else{
      return true
    }
  }
  save(): void {
    if (this.consultas.dataConsulta instanceof Date) {
<<<<<<< HEAD
      // Obtendo os componentes da data
const year = this.consultas.dataConsulta.getUTCFullYear();
const month = (this.consultas.dataConsulta.getUTCMonth() + 1).toString().padStart(2, '0'); // Mês começa em 0
const day = this.consultas.dataConsulta.getUTCDate().toString().padStart(2, '0');
const seconds = this.consultas.dataConsulta.getUTCSeconds().toString().padStart(2, '0');

// Construindo a string no formato desejado
const dataConsultaFormatada = `${year}-${month}-${day}T${this.hora}:${seconds}`;

      // Atualizar a propriedade dataConsulta
      this.consultas.dataConsulta = dataConsultaFormatada;
      console.log(dataConsultaFormatada)
    }
    console.log(this.consultas);
    this.http.create(this.consultas).pipe(
      delay(2000) // Atraso de 2 segundos
    ).subscribe(
      () => {
        // Implemente aqui a lógica para retornar à tela anterior
        console.log('Consulta criada com sucesso!');
        // Exemplo: redirecionar para a tela anterior usando uma biblioteca de roteamento
        // this.router.navigate(['/tela-anterior']);
      },
      error => {
        console.error('Ocorreu um erro ao criar a consulta:', error);
      }
    );
=======
      const year = this.consultas.dataConsulta.getUTCFullYear();
      const month = this.consultas.dataConsulta.getUTCMonth() + 1;
      const day = this.consultas.dataConsulta.getUTCDate();
      const dataConsultaF = day + '-' + month + '-' + year;
      this.consultas.dataConsulta = dataConsultaF +', '+ this.hora;
    }
    if(this.validate_inputs(this.consultas)){
      console.log(this.consultas);   
    }else{
      console.log('Preencha todos os campos');
    }
   
>>>>>>> 49dce922ad689bb2196d2c67f478315e6fc3f2a1
  }

  backHome() {
    this.sharedService.home()
  }




}
