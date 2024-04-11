import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { SharedService } from '../../../shared/shared.service';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { merge } from 'rxjs';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [MatDialogModule, MatButtonModule, FormsModule,  ReactiveFormsModule, MatInputModule, MatFormField],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {

  email = new FormControl('', [Validators.required, Validators.email])
  password = new FormControl('', [Validators.required, Validators.minLength(6)])
  passwordConfirm = new FormControl('', [Validators.required, Validators.minLength(6)])
  errorMessage = '';
  emailErrorMessage='';
  confirmErrorMessage='';
  loginFormRegister: { email: string|null; password: string|null } = {email: '', password: ''};
  constructor(private sharedService: SharedService){
    merge(this.email.statusChanges, this.email.valueChanges).subscribe(()=>this.updateErrorMessage(this.email));
    merge(this.password.statusChanges, this.password.valueChanges).subscribe(()=>this.updateErrorMessage(this.password));
  }
resetPassword(email: FormControl, password: FormControl) {
  this.loginFormRegister.email = email.value
  this.loginFormRegister.password = password.value
  console.log(this.loginFormRegister)
  this.sharedService.openDialog("Método não implementado!")
}
updateErrorMessage(field: FormControl){
  if(field.hasError('required')){
    this.errorMessage = 'Esse campo é obrigatório!';
    this.emailErrorMessage = 'Esse campo é obrigatório!';

  } else if(field.hasError('email')){
    this.emailErrorMessage = 'Formato email inválido!';
  } else if(field.hasError('minlength')){
    this.errorMessage = 'No mínimo 6 caracteres';
  } else if(this.passwordConfirm!==this.password){
    this.confirmErrorMessage = 'Senhas não coincidem';
  }else{
    this.errorMessage = '';
  }
}

}
