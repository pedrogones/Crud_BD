import { Component, Inject, OnInit } from '@angular/core';
import { Consultas } from '../../models/Consultas';
import { SharedService } from '../../../shared/shared.service';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../../services/auth.service';
import { UpdateComponent } from '../../consultas/update/update.component';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-modal-info-consulta',
  standalone: true,
  imports: [MatButtonModule, MatDialogModule, CommonModule],
  templateUrl: './modal-info-consulta.component.html',
  styleUrl: './modal-info-consulta.component.scss'
})
export class ModalInfoConsultaComponent implements OnInit {
consulta!: Consultas;

constructor(@Inject(MAT_DIALOG_DATA) public data: { idConsulta: string }, private sharedService: SharedService, private http: AuthService, private route: ActivatedRoute) {

}
hora=''
consultaIsEmpty = false;
ngOnInit(){

  console.log(this.data.idConsulta)
  this.route.params.subscribe(params => {
    this.http.loadByID(this.data.idConsulta).subscribe(
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


  editConsulta(consulta: Consultas){
    console.log(consulta)
   this.sharedService.update(this.consulta.idConsulta)
  }

  deleteConsulta(consulta: Consultas) {
    this.http.delete(consulta.idConsulta!).subscribe(
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
