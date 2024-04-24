import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Paciente } from '../models/Paciente';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthUser } from '../models/AuthUser';
import { PermissionsService } from '../controller/permissions.service';
import { PacienteService } from '../../services/pacientesServices/paciente.service';
import { SharedService } from '../../shared/shared.service';
import { MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{

  pkUser:any
  roleUser:any
  ngOnInit(): void {
    this.pkUser = localStorage.getItem('chavePrimaria');
    this.roleUser = Number(localStorage.getItem('role'));
    this.index();
  }
  foto = '';
  paciente: Paciente | undefined;
  anableInputs = false;
  constructor(private photo: AuthService, private sharedService: SharedService, private httpPaciente: PacienteService, private permission: PermissionsService) {}
  index() {
    this.httpPaciente.loadByCpf(this.pkUser).subscribe(
      (paciente: Paciente) => {
        this.paciente = paciente;
        this.foto = this.photo.photoProfile(this.paciente.nomePaciente);
      },
      (error) => {
        this.sharedService.openDialog('Erro ao carregar perfil do paciente: ' + error);
      }
    );
  }

  sexoFormat(char: any): string {
    return char === 'f' ? 'Feminino' : 'Masculino';
  }

  edit() {
    this.anableInputs = !this.anableInputs;
  }

  saveUpdate() {
    if (this.paciente) {
      this.httpPaciente.update(this.paciente).subscribe(
        (response) => {
          this.sharedService.openDialog('Perfil do paciente atualizado com sucesso!');
          this.anableInputs = false;
          localStorage.setItem('nomeUser', this.paciente!.nomePaciente);
          this.foto = this.photo.photoProfile(this.paciente!.nomePaciente);
        },
        (error) => {
          this.sharedService.openDialog('Erro ao atualizar perfil do paciente: ' + error);
          console.log(error)
        }
      );
    }
  }
}
