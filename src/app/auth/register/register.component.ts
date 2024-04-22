import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { log } from 'console';
import { merge } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatFormField],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
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
  constructor(){}
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
  registerPaciente(): void {
    if(this.nome.valid&&this.cpf.valid&&this.dataNascimento.valid&&this.sexo.valid){
      console.log(this.loginFormRegister);
      this.loginFormRegister.nome = this.nome.value;
      this.loginFormRegister.cpf = this.cpf.value;
      this.loginFormRegister.dataNascimento = this.dataNascimento.value;
      this.loginFormRegister.sexo = this.sexo.value;
      console.log(this.loginFormRegister)
    }

}

}
