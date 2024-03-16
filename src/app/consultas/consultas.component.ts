import { AuthService } from '../../services/auth.service';
import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { CommonModule, Location } from '@angular/common';
import { Consultas } from '../models/Consultas';
import { MatIconModule } from '@angular/material/icon';
import { Observable, catchError, delay, of } from 'rxjs';
import { log } from 'console';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './consultas.component.html',
  styleUrl: './consultas.component.scss'
})
export class ConsultasComponent implements OnInit {

  consultas:  Consultas[]=[]

  consultaIsEmpty = true;
  isContentVisible = false
  ngOnInit(): void {
    setTimeout(() => {
      this.isContentVisible = true; // Define como true após o atraso de 5 segundos
      this.index();
    }, 1500);
  }
  constructor( private sharedService: SharedService, private http: AuthService) {
    // this.index()
    }

    index() {
      this.http.index().subscribe(
        (data: Consultas[]) => {
          this.consultas = data;
          this.consultaIsEmpty = false;
        },
        error => {
          this.openDialog('Ocorreu um erro ao listar as consultas, tente novamente mais tarde');
        }
      );
    }

    converterData(data: any): string {
      return this.sharedService.converterData(data)
      }


    openDialog(message: string) {
      this.sharedService.openDialog(message)
    }

  delete(consulta: Consultas) {
    this.http.delete(consulta.idConsulta!).subscribe(
    () => {
      this.openDialog("Consulta removida com sucesso")
      this.index();
    }
    );

  }



  redirectCreate() {
    this.sharedService.create();
  }

  redirectUpdate(id: number) {
    this.sharedService.update(id);
  }

}
