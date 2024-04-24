
import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { CommonModule, Location } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { ConsultaRequest } from '../models/ConsultaRequest';
import { ConsultasService } from '../../services/consultasServices/consultas.service';

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
  consultas: ConsultaRequest[] = [];
  consultaIsEmpty = true;
  isContentVisible = false;
  dataSource = new MatTableDataSource<ConsultaRequest>();

  displayedColumns: string[] = ['idConsulta', 'nomePaciente', 'nomeMedico', 'dataConsulta', 'motivoConsulta'];

  constructor(private sharedService: SharedService, private consultaService: ConsultasService) {}

  roleUser:any
  pkUser:any

  ngOnInit(): void {
    this.roleUser=localStorage.getItem('role')
    this.pkUser = localStorage.getItem('chavePrimaria');
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
    if (this.roleUser === '1') { // Se for médico
      this.loadConsultasMedico();
    } else { // Se for adm ou outro tipo de usuário
      this.loadConsultasAll();
    }
  }
  searchByName(name: string) {
    if (name.trim() === "") {
      this.index();
    } else {
      this.consultaService.listarConsultasPaciente(name).subscribe(
        (data: ConsultaRequest[]) => {
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
      this.consultaService.listarConsultasMedico(name).subscribe(
        (data: ConsultaRequest[]) => {
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

  delete(id:any) {
    this.consultaService.delete(id).subscribe(
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
  loadConsultasMedico() {
  
          this.consultaService.listarConsultasPorCrm(this.pkUser).subscribe(
            (data: ConsultaRequest[]) => {
              this.consultas = data;
              this.dataSource.data = this.consultas;
              this.consultaIsEmpty = this.consultas.length === 0;
            },
            error => {
              this.openDialog('Ocorreu um erro ao listar as consultas do médico, tente novamente mais tarde');
            }
          );
        
  }
  
  loadConsultasAll() {
    this.consultaService.index().subscribe(
      (data: ConsultaRequest[]) => {
        this.consultas = data;
        this.dataSource.data = this.consultas;
        this.consultaIsEmpty = this.consultas.length === 0;
      },
      error => {
        this.openDialog('Ocorreu um erro ao listar todas as consultas, tente novamente mais tarde');
      }
    );
  }
}
