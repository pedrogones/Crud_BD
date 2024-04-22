import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { AuthService } from '../../../services/auth.service';
import { delay, merge, takeUntil } from 'rxjs';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { ResetPasswordComponent } from '../register-colaborator/reset-password.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatFormField],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent{
  constructor( private sharedService: SharedService, private http: AuthService, public dialog: MatDialog){
    merge(this.email.statusChanges, this.email.valueChanges).subscribe(()=>this.updateErrorMessage(this.email));
    merge(this.senha.statusChanges, this.senha.valueChanges).subscribe(()=>this.updateErrorMessage(this.senha));
    merge(this.nome.statusChanges, this.nome.valueChanges).subscribe(()=>this.updateErrorMessage(this.nome));
    merge(this.cpf.statusChanges, this.cpf.valueChanges).subscribe(()=>this.updateErrorMessage(this.cpf));

  }

  authUser = 'medico';
  errorMessage = '';
  emailErrorMessage='';
  nomeErrorMessage='';
  cpfErrorMessage='';
  // declarações dos inputs
  email = new FormControl('', [Validators.required, Validators.email])
  senha = new FormControl('', [Validators.required, Validators.minLength(6)])
  tipoColab = new FormControl(-1)

  nome = new FormControl('', [Validators.required])
  cpf = new FormControl('', [Validators.required, Validators.minLength(14)])
  loginFormMedico: { email: string|null; password: string|null; tipoColab: number|null } = {email: '', password: '', tipoColab: -1};
  loginFormPaciente: { tipoColab: number; nome: string|null; cpf: string|null} = { tipoColab: 0, nome: '', cpf: '' };
  //

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
      this.errorMessage = 'No mínimo 6 caracteres!';
      this.cpfErrorMessage = 'No mínimo 11 caracteres!';
    } else{
      this.errorMessage = '';
    }
}
changeValue(tipoUser:any){
  this.tipoColab = tipoUser;
}
//chamadas do metodo http
  async loginMedico(tipoColab: FormControl, email:FormControl, senha: FormControl, ) {
   this.loginFormMedico.email = this.email.value
   this.loginFormMedico.password = this.senha.value
   this.loginFormMedico.tipoColab = this.tipoColab.value
   if(email.invalid||senha.invalid){
    this.sharedService.openDialog("Preencha todos campos!")
   } else if(tipoColab.value===-1){
    this.sharedService.openDialog("Você precisa dizer se é Medico ou Administrador")
    }
    if(tipoColab.value==1){
     console.log('Médico: '+this.loginFormMedico)
      this.sharedService.openDialog("Entrando!")
        delay(2000)
        //this.http.loginMedico(email, senha)
        this.sharedService.consultasPorChave(1, this.loginFormMedico.password)

    } else if(tipoColab.value==2){
       console.log('Adm: '+this.loginFormMedico)
       this.sharedService.openDialog("Entrando!")
        delay(2000)
        //this.http.loginMedico(email, senha)
        this.sharedService.consultasPorChave(2, null)
    }
  }
loginPaciente(pacienteValue: number, nome: FormControl, cpf: FormControl){
      this.loginFormPaciente.nome = this.nome.value
      this.loginFormPaciente.cpf = this.cpf.value
      this.loginFormPaciente.tipoColab = pacienteValue
      if(nome.invalid||cpf.invalid){
        this.sharedService.openDialog("Preencha os campos!")
      }else{
        this.sharedService.consultasPorChave(0, this.loginFormPaciente.cpf)
      }
  }

  changeDisplay(typeUser: string) {
     this.authUser = typeUser
  }
  formatCpf(event: any){
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

  openDialog() {
    const dialogRef = this.dialog.open(RegisterComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  resetPassword(){
    const dialogRef = this.dialog.open(ResetPasswordComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}


