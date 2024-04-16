import { Component, NgModule } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Paciente } from '../models/Paciente';
import { FormsModule, NgForm } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {

  paciente: Paciente = {
    idPaciente: 1,
    nome: 'Pedro Targino',
    cpf: '124-267-224-95',
    role: 1,
    email: 'pedrotargin@gmail.com',
    telefone: '83 992643401',
    grupoSanguineo: 'A+',
  }

  constructor(private http: AuthService) { }
  foto = this.getFoto()

  getFoto() {
    console.log('entrou')
    return this.http.photoProfile(this.paciente.nome);
  }

}
