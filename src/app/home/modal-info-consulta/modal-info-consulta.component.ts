import { Component, Inject, OnInit } from '@angular/core';
import { Consultas } from '../../models/Consultas';
import { SharedService } from '../../../shared/shared.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ConsultasService } from '../../../services/consultasServices/consultas.service';
import { ConsultaRequest } from '../../models/ConsultaRequest';

@Component({
  selector: 'app-modal-info-consulta',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, CommonModule],
  templateUrl: './modal-info-consulta.component.html',
  styleUrl: './modal-info-consulta.component.scss'
})
export class ModalInfoConsultaComponent implements OnInit {
consulta!: ConsultaRequest;

constructor(@Inject(MAT_DIALOG_DATA) public data: { idConsulta: string },private sharedService: SharedService, private httpConsultas: ConsultasService, private route: ActivatedRoute) {

}
hora=''
consultaIsEmpty = false;
ngOnInit(){
  this.route.params.subscribe(params => {
    this.httpConsultas.loadById(this.data.idConsulta).subscribe(
      consulta => {
        this.consulta = consulta;
        const datayhora = this.converterData(this.consulta.dataConsulta)
        this.hora=this.sharedService.formatarHora(datayhora);
        this.consultaIsEmpty = true;
      },
      error => {
        console.error('Ocorreu um erro ao carregar a consulta por ID:', error);
      }
    );
  })

  }



  deleteConsulta() {
    this.httpConsultas.delete(this.data.idConsulta).subscribe(
      () => {
        this.sharedService.openDialog("Consulta removida com sucesso");

      },
      error => {
        this.sharedService.openDialog("Ocorreu um erro ao remover a consulta");
      }
    );
    this.sharedService.consultas()
  }
  converterData(data: any): string {
    return this.sharedService.converterData(data)
    }

}
