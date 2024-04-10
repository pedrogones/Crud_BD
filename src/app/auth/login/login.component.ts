import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { AuthService } from '../../../services/auth.service';
import { merge, takeUntil } from 'rxjs';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatFormField],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  authUser = 'medico';
  errorMessage = '';
  emailErrorMessage='';
  nomeErrorMessage='';
  cpfErrorMessage='';
  // declarações dos inputs
  email = new FormControl('', [Validators.required, Validators.email])
  senha = new FormControl('', [Validators.required, Validators.minLength(6)])
  nome = new FormControl('', [Validators.required])
  cpf = new FormControl('', [Validators.required, Validators.minLength(11)])
  loginFormMedico: { email: string|null; password: string|null } = {email: '', password: ''};
  loginFormPaciente: { nome: string|null; cpf: string|null } = { nome: '', cpf: '' };
  //
  constructor(private sharedService: SharedService, private http: AuthService){
    merge(this.email.statusChanges, this.email.valueChanges).subscribe(()=>this.updateErrorMessage(this.email));
    merge(this.senha.statusChanges, this.senha.valueChanges).subscribe(()=>this.updateErrorMessage(this.senha));
    merge(this.nome.statusChanges, this.nome.valueChanges).subscribe(()=>this.updateErrorMessage(this.nome));
    merge(this.cpf.statusChanges, this.cpf.valueChanges).subscribe(()=>this.updateErrorMessage(this.cpf));

  }
  //validações de inputs 
  updateErrorMessage(field: FormControl){
    if(field.hasError('required')){
      this.errorMessage = 'Esse campo é obrigatório!';
      this.emailErrorMessage = 'Esse campo é obrigatório!';
      this.nomeErrorMessage = 'Esse campo é obrigatório!';
      this.cpfErrorMessage = 'Esse campo é obrigatório!';
      
    } else if(field.hasError('email')){
      this.emailErrorMessage = 'Coloque um email válido!';
    } else if(field.hasError('minlength')){
      this.errorMessage = 'Deve conter no mínimo 6 caracteres';
      this.cpfErrorMessage = 'Cpf deve conter no mínimo 11 caracteres';
    } else{
      this.errorMessage = '';
    }
}
//chamadas do metodo http
  loginMedico(authUser: string, email:FormControl, senha: FormControl) {
    if (authUser === 'medico') {
      this.loginFormMedico.email = this.email.value 
      this.loginFormMedico.password = this.senha.value
      if(email.invalid||senha.invalid){
        this.sharedService.openDialog("Preencha os campos!")
      }else{ 
        console.log(this.loginFormMedico)
        //this.http.loginMedico(email, senha)
      }
    }else{
      this.sharedService.openDialog("Ocorreu um erro")
    }
  }
loginPaciente(authUser: string, nome: FormControl, cpf: FormControl){
  if (authUser === 'paciente') {
    this.loginFormPaciente.nome = this.nome.value 
      this.loginFormPaciente.cpf = this.cpf.value
      if(nome.invalid||cpf.invalid){
        this.sharedService.openDialog("Preencha os campos!")
      }else{ 
        console.log(this.loginFormMedico)
        //this.http.loginMedico(email, senha)
      }
  } else {
    this.sharedService.openDialog("Ocorreu um erro!");
  }
} 
  changeDisplay(typeUser: string) {
     this.authUser = typeUser
  }

}


