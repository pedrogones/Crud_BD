import { Component, NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedService } from '../../../shared/shared.service';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { merge } from 'rxjs';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [MatDatepickerModule, MatDialogModule, MatButtonModule, FormsModule,  ReactiveFormsModule, CommonModule, MatInputModule, MatFormField],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

  nome = new FormControl('', [Validators.required]);
  cpf = new FormControl('', [Validators.required]);
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required, Validators.minLength(6)]);
  crm = new FormControl('', [Validators.required]);
  sexo = new FormControl('', Validators.required);
  dataNascimento = new FormControl('', [Validators.required]);
  tipoUsuario=''
  errorMessage = '';
  cpfErrorMessage = ''
  emailErrorMessage = '';
  passwordErrorMessage = ''
  crmErrorMessage = ''



  constructor(private sharedService: SharedService) {
    merge(this.email.statusChanges, this.email.valueChanges).subscribe(() => this.updateErrorMessage(this.email));
    merge(this.password.statusChanges, this.password.valueChanges).subscribe(() => this.updateErrorMessage(this.password));
    merge(this.cpf.statusChanges, this.cpf.valueChanges).subscribe(() => this.updateErrorMessage(this.cpf));
    merge(this.crm.statusChanges, this.crm.valueChanges).subscribe(() => this.updateErrorMessage(this.crm));
    merge(this.sexo.statusChanges, this.sexo.valueChanges).subscribe(() => this.updateErrorMessage(this.sexo));
    merge(this.dataNascimento.statusChanges, this.dataNascimento.valueChanges).subscribe(() => this.updateErrorMessage(this.dataNascimento));

  }

  cadastrar() {
    if (this.nome.invalid || this.cpf.invalid || this.email.invalid || this.password.invalid) {
      this.errorMessage = 'Por favor, preencha todos os campos corretamente.';
      return;
    }
    // Aqui você pode implementar a lógica para enviar os dados do cadastro para o backend
    console.log('Dados do cadastro:', {
      nome: this.nome.value,
      cpf: this.cpf.value,
      email: this.email.value,
      password: this.password.value,
      crm: this.crm.value,
      sexo: this.sexo.value,
      dataNascimento: this.dataNascimento.value
    });

    this.sharedService.openDialog("Cadastro realizado com sucesso!");
  }

  updateErrorMessage(field: FormControl) {
    if (field.invalid && (field.dirty || field.touched)) {
      if (field.hasError('required')) {
        this.errorMessage = 'Esse campo é obrigatório!';
        this.crmErrorMessage = 'Esse campo é obrigatório!';
        this.emailErrorMessage = 'Esse campo é obrigatório!';
        this.passwordErrorMessage = 'Esse campo é obrigatório!';
      } else if (field.hasError('email')) {
        this.emailErrorMessage = 'Formato de e-mail inválido!';
      } else if (field.hasError('minlength')) {
        this.passwordErrorMessage = 'No mínimo 6 caracteres';
        this.crmErrorMessage = 'No mínimo 5 caracteres';
      }else if (field.hasError('maxlength')) {
        this.crmErrorMessage = 'No máximo 5 caracteres';
      }
    } else {
      this.errorMessage = '';
    }
  }

  changeValue(tipoUser: any) {
    if (tipoUser === 'administrador') {
      this.crm.setValue(''); // Define o valor do campo CRM como vazio quando o tipo de usuário é administrador
      this.crm.clearValidators(); // Limpa os validadores do campo CRM quando o tipo de usuário é administrador
    }
    this.tipoUsuario = tipoUser; // Define o tipo de usuário selecionado
  }
  cadastrarColab(){
     }
     formatarCrm(event: any){
      let inputValue: string = event.target.value.toString();
      const maxLength = 5;
      if(inputValue.length>maxLength){
        event.target.value = inputValue.slice(0, maxLength);
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

}
