import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { log } from 'console';
import { delay, merge, share } from 'rxjs';
import { Paciente } from '../../models/Paciente';
import { PacienteService } from '../../../services/pacientesServices/paciente.service';
import { SharedService } from '../../../shared/shared.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatFormField],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {

  //objetos p cadastro
  paciente: Paciente={
    nomePaciente: '',
    cpfPaciente: '',
    dataNascPaciente: '',
    sexoPaciente: '',
    tipoUsuario: null
  }

  nome = new FormControl('', [Validators.required])
  cpf = new FormControl('', [Validators.required, Validators.minLength(14)])
  dataNascimento = new FormControl('', [Validators.required])
  sexo = new FormControl('', Validators.required)

  nomeErroMessage=''
  cpfErroMessage=''
  dataNascimentoErroMessage=''
  sexoErroMessage=''

  loginFormRegister: { nome: string|null; cpf: string|null; dataNascimento: string|null; sexo: string|null } = {
    nome: '', cpf: '',
    dataNascimento: '',
    sexo: ''
  }
  dialogRef: any;
  constructor(private httpPaciente: PacienteService, private sharedService: SharedService){}
  cadastrar(){
    console.log(this.loginFormRegister)
  }

  updateErrorMessage(field: FormControl){
    if(field.hasError('required')){
      this.nomeErroMessage = 'O nome é obrigatório!';
      this.cpfErroMessage = 'Cpf é obrigatório!';
      this.dataNascimentoErroMessage = "Campo Obrigatório!"
      this.sexoErroMessage = 'Sexo é obrigatório!';
    } else if(field.hasError('minlength')){
      this.cpfErroMessage = 'No mínimo 14 caracteres';
    } else{
      this.nomeErroMessage = '';
    }
  }
  formatarCpf(event: any) {
    let inputValue: string = event.target.value.toString();
    const maxLength = 14;
    if (inputValue.length <= maxLength) {
      if (inputValue.length === 3 || inputValue.length === 7) {
        event.target.value += '.';
      } else if (inputValue.length === 11) {
        event.target.value += '-';
      }
    } else {
      event.target.value = inputValue.slice(0, maxLength);
    }
  }
  formatarDataNascimento(event: any) {
    let inputValue: string = event.target.value.toString();
    const maxLength = 10;
    if (inputValue.length <= maxLength) {
      if (inputValue.length === 2 || inputValue.length === 5) {
        event.target.value += '/';
      }
    } else {
      event.target.value = inputValue.slice(0, maxLength);
    }
  }
  dataInFormat(data: any){
    // Divida a string da data em dia, mês e ano
    const partes = data.split('/');
    // Crie uma nova string de data no formato ISO (aaaa-mm-dd)
    const dataISO = partes[2] + '-' + partes[1] + '-' + partes[0];
   return dataISO
}

  registerPaciente(): void {
    if(this.nome.valid&&this.cpf.valid&&this.dataNascimento.valid&&this.sexo.valid){
      console.log(this.paciente);
      this.paciente.nomePaciente = this.nome.value;
      this.paciente.cpfPaciente = this.cpf.value;
      this.paciente.dataNascPaciente = this.dataInFormat(this.dataNascimento.value);
      this.paciente.sexoPaciente = this.sexo.value;

      this.httpPaciente.create(this.paciente).subscribe(
        (response) => {
          this.sharedService.openDialog('Paciente registrado com sucesso: ' + response);
          setTimeout(() => {

            this.sharedService.dashboardRole(0, this.paciente.cpfPaciente);
          }, 2000);
          localStorage.setItem('chavePrimaria', this.paciente.cpfPaciente);
          localStorage.setItem('role', '0');
          localStorage.setItem('nomeUser', this.paciente.nomePaciente);
        },
        (error) => {
          this.sharedService.openDialog('Erro ao registrar paciente:'+ error);
          // Aqui você pode exibir uma mensagem de erro para o usuário ou fazer outra ação necessária
        }
    );
  } else {
    this.sharedService.openDialog('Por favor, preencha todos os campos corretamente.');
    // Mensagem de erro para o usuário quando os campos não estiverem preenchidos corretamente
  }
}


}
