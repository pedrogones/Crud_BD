import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedService } from '../../../shared/shared.service';
import { Consultas } from '../../models/Consultas';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatNativeDateModule, provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { Subject } from 'rxjs';
import { DatePickerComponent } from '../../../services/date-picker/date-picker.component';
import { CommonModule } from '@angular/common';

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
  ngOnInit(): void {
  }
  hora!: string;
  minDate = new Date();
  constructor(
    private sharedService: SharedService,) {
  }
  consultas: Consultas = {
    id: null,
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
   
  }

  backHome() {
    this.sharedService.home()
  }




}
