import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { FormsModule } from '@angular/forms';
import { Consultas } from '../../models/Consultas';
import { DatePickerComponent } from '../../../services/date-picker/date-picker.component';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.scss'], // Corrigido para `styleUrls`
})
export class UpdateComponent implements OnInit {
  @ViewChild(DatePickerComponent)
  datePickerComponent!: DatePickerComponent<any>;
  exampleHeader = DatePickerComponent;

  constructor(private sharedService: SharedService){

  }
  hora = '08:30';
  minDate = new Date();
  consulta: Consultas = {
    idConsulta: 1,
    nomePaciente: 'Pedro Gomes',
    nomeMedico: 'João Marcos',
    dataConsulta: '20/03, 08:30',
    motivoConsulta: 'Revisão Geral',
  };

  ngOnInit() {}

  validate_inputs(consulta: Consultas): boolean {
    if (
      consulta.nomePaciente == '' ||
      consulta.nomeMedico == '' ||
      consulta.dataConsulta == '' ||
      consulta.motivoConsulta == ''
    ) {
      return false;
    } else {
      return true;
    }
  }
<<<<<<< HEAD
  backHome(){
    this.sharedService.home()
  }
  save(){
    //implements
=======

  save(): void {
    if (this.consulta.dataConsulta instanceof Date) {
      const year = this.consulta.dataConsulta.getUTCFullYear();
      const month = this.consulta.dataConsulta.getUTCMonth() + 1;
      const day = this.consulta.dataConsulta.getUTCDate();
      const dataConsultaF = day + '-' + month + '-' + year;
      this.consulta.dataConsulta = dataConsultaF + ', ' + this.hora;
    }
    if (this.validate_inputs(this.consulta)) {
      console.log(this.consulta);
    } else {
      console.log('Preencha todos os campos');
    }
>>>>>>> 49dce922ad689bb2196d2c67f478315e6fc3f2a1
  }

  backHome() {
    this.sharedService.home();
  }
}
