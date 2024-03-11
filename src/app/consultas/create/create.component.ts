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

@Component({
  selector: 'app-create',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [FormsModule, MatFormFieldModule, MatInputModule, MatDatepickerModule, MatNativeDateModule,],
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

  save(): void {
    if (this.consultas.dataConsulta instanceof Date) {
      const year = this.consultas.dataConsulta.getUTCFullYear();
      const month = this.consultas.dataConsulta.getUTCMonth() + 1; // Lembrando que os meses começam em 0
      const day = this.consultas.dataConsulta.getUTCDate();
      const dataConsultaF = day + '-' + month + '-' + year;
      // Atualizar a propriedade dataConsulta
      this.consultas.dataConsulta = dataConsultaF;
    }
    console.log(this.consultas);
  }

  backHome() {
    this.sharedService.home()
  }




}
