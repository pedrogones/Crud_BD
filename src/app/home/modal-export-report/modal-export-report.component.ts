import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import flatpickr from 'flatpickr';
import { Paciente } from '../../models/Paciente';
import { Medico } from '../../models/Medico';

@Component({
  selector: 'app-modal-export-report',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './modal-export-report.component.html',
  styleUrl: './modal-export-report.component.scss'
})
export class ModalExportReportComponent{

  menuMedicos = false;
medicoSelect = '';
medicos: Medico[] = [
  {
    nomeMedico: 'ssssssssss',
    crm: 'ssssssssss',
    dataNascMedico: 'ssssssssss',
    sexoMedico: 'ssssssssss',
    emailMedico: 'ssssssssss',
    celularMedico: 'ssssssssss',
    tipoUsuario: 'ssssssssss'
  }

];

authUser = 1;
dateInit: string = '';
dateEnd: string = '';

selecionarMedico(nome: string): void {
  this.menuMedicos = false;
  this.medicoSelect = nome;
}

gerarRelatorio(): void {
  console.log("Estarei gerando o relatorio de consultas, entre as datas: " + this.dateInit + " e " + this.dateEnd);
}

}







