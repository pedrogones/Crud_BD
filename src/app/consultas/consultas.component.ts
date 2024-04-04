import { Consultas } from './../models/Consultas';
import { AuthService } from '../../services/auth.service';
import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { CommonModule, Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { Observable, catchError, delay, of } from 'rxjs';
import { log } from 'console';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatIconModule, FormsModule],
  templateUrl: './consultas.component.html',
  styleUrl: './consultas.component.scss'
})
export class ConsultasComponent implements OnInit {
  searchNome="";
   searchMedico = "";
  consultas: Consultas[] = [];
  consultaIsEmpty = true;
  isContentVisible = false;
  dataSource = new MatTableDataSource<Consultas>();

  displayedColumns: string[] = ['idConsulta', 'nomePaciente', 'nomeMedico', 'dataConsulta', 'motivoConsulta'];

  constructor(private sharedService: SharedService, private http: AuthService) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.isContentVisible = true;
      this.index();
    }, 1500);
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataSource.filter = filterValue;
  }

  index() {
    this.http.index().subscribe(
      (data: Consultas[]) => {
        this.consultas = data;
        this.dataSource.data = this.consultas; // Adiciona os dados ao MatTableDataSource
        this.consultaIsEmpty = this.consultas.length === 0;
      },
      error => {
        this.openDialog('Ocorreu um erro ao listar as consultas, tente novamente mais tarde');
      }
    );
  }

  searchByName(name: string) {
    if (name.trim() === "") {
      this.index();
    } else {
      this.http.searchByName(name).subscribe(
        (data: Consultas[]) => {
          this.dataSource.data = data;
          this.consultaIsEmpty = data.length === 0;
          if (data.length === 0) {
            this.openDialog('Nenhuma consulta encontrada para o paciente especificado.');
            this.index()
          }
        },
        error => {
          this.openDialog('Nenhuma consulta encontrada para o paciente especificado.');
          this.index()
        }
      );
    }
  }
  searchByMedico(name: string) {
    if (name.trim() === "") {
      this.index();
    } else {
      this.http.searchByMedico(name).subscribe(
        (data: Consultas[]) => {
          this.dataSource.data = data;
          this.consultaIsEmpty = data.length === 0;
          if (data.length === 0) {
            this.openDialog('Nenhuma consulta encontrada para o médico especificado.');
            this.index()
          }
        },
        error => {
          this.openDialog('Nenhuma consulta encontrada para o Médico especificado.');
            this.index()
        }
      );
    }
  }

  converterData(data: any): string {
    // Suponho que esta função esteja correta, então deixei inalterada
    return this.sharedService.converterData(data);
  }

  openDialog(message: string) {
    this.sharedService.openDialog(message);
  }

  delete(consulta: Consultas) {
    this.http.delete(consulta.idConsulta!).subscribe(
      () => {
        this.openDialog("Consulta removida com sucesso");
        this.index();
      },
      error => {
        this.openDialog("Ocorreu um erro ao remover a consulta");
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
