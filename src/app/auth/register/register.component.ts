import { Component } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
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
  cpf = new FormControl('', [Validators.required, Validators.minLength(11), Validators.maxLength(11)])
  nomeErroMessage=''
  cpfErroMessage=''
  loginFormRegister: { nome: string|null; cpf: string|null } = {nome: '', cpf: ''};
  constructor(){
    merge(this.nome.statusChanges, this.nome.valueChanges).subscribe(()=>this.updateErrorMessage(this.nome));
    merge(this.cpf.statusChanges, this.cpf.valueChanges).subscribe(()=>this.updateErrorMessage(this.cpf));
  }

  updateErrorMessage(field: FormControl){
    if(field.hasError('required')){
      this.nomeErroMessage = 'Esse campo é obrigatório!';
      this.cpfErroMessage = 'Esse campo é obrigatório!';
    } else if(field.hasError('minlength')){
      this.cpfErroMessage = 'No mínimo 11 caracteres';
    } else if(field.hasError('maxlength')){
      this.cpfErroMessage = 'No máximo 11 caracteres';
    }else{
      this.nomeErroMessage = '';
    }
  }
  registerPaciente(): void {
    this.loginFormRegister.nome = this.nome.value;
    this.loginFormRegister.cpf = this.cpf.value;
    console.log(this.loginFormRegister);
}

}
