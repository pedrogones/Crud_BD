import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(private sharedService: SharedService){

  }

  cpf:any
  authUser = 'medico';
  login(){
//    if(key=='medico'){
//    }
    this.sharedService.consultas()
  }
  submitForm() {
    // Implemente a lógica de autenticação para médicos aqui
  }

  // Função para submeter o formulário de paciente
  submitPacienteForm() {
    // Implemente a lógica de autenticação para pacientes aqui
  }



  changeDisplay(typeUser: string) {
     this.authUser = typeUser
  }

}
