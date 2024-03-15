import { Component, OnInit, ViewChild } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { FormsModule } from '@angular/forms';
import { Consultas } from '../../models/Consultas';
import { MatFormField, MatFormFieldModule, MatHint } from '@angular/material/form-field';
import { MatDatepicker, MatDatepickerModule } from '@angular/material/datepicker';
import { DatePickerComponent } from '../../../services/date-picker/date-picker.component';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../../../services/auth.service';
import { delay } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [CommonModule,FormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent implements OnInit {
  @ViewChild(DatePickerComponent)
  datePickerComponent!: DatePickerComponent<any>;
  exampleHeader = DatePickerComponent;
  consultaPage: Consultas = {
    idConsulta: 0,
    nomePaciente: '',
    nomeMedico: '',
    dataConsulta: '',
    motivoConsulta: ''
  };
  minDate= Date()
  hora!:string

  constructor(
    private sharedService: SharedService,
    private http: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      const consultaId = +params['id']; // Use o operador + para converter o ID para número, se necessário
      this.http.loadByID(consultaId).subscribe(

        consulta => {
          // Aqui você recebe o valor real da consulta quando o Observable for concluído
          this.consultaPage = consulta;
          console.log(this.consultaPage);
        },
        error => {
          console.error('Ocorreu um erro ao carregar a consulta por ID:', error);
        }
      );
    });
  }

  backHome() {
    this.sharedService.home();
  }

  save() {
    console.log(this.consultaPage.dataConsulta)
    if (this.consultaPage.dataConsulta instanceof Date) {
      // Obtendo os componentes da data
      const horaFormate = this.hora
      const year = this.consultaPage.dataConsulta.getUTCFullYear();
      const month = (this.consultaPage.dataConsulta.getUTCMonth() + 1).toString().padStart(2, '0'); // Mês começa em 0
      const day = this.consultaPage.dataConsulta.getUTCDate().toString().padStart(2, '0');
      const seconds = this.consultaPage.dataConsulta.getUTCSeconds().toString().padStart(2, '0');
      const dataConsultaFormatada = `${year}-${month}-${day}T${horaFormate}:${seconds}`;
      // Atualizar a propriedade dataConsulta
      console.log(this.hora)
      this.consultaPage.dataConsulta = dataConsultaFormatada;
      console.log(dataConsultaFormatada);
    }

    console.log(this.consultaPage);

    if (this.consultaPage.idConsulta !== null && this.consultaPage.idConsulta !== undefined) {
      console.log(this.consultaPage)
      this.http.update(this.consultaPage).pipe(
        delay(2000)
        ).subscribe(
          (response: any) => {
            this.sharedService.openDialog("Consulta atualizada com Sucesso");
             this.sharedService.home();
           },
           error => {
             this.sharedService.openDialog("Ocorreu um erro ao atualizar a consulta")
           }
      );
    } else {
      this.sharedService.openDialog('ID da consulta é nulo ou indefinido.');
    }
  }

onCancel(){
 this.sharedService.consultas()
}


}
