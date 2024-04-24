import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { AuthService } from '../../../services/auth.service';
import { MatInputModule } from '@angular/material/input';
import { MatDialog } from '@angular/material/dialog';
import { RegisterComponent } from '../register/register.component';
import { ResetPasswordComponent } from '../register-colaborator/reset-password.component';
import { PacienteService } from '../../../services/pacientesServices/paciente.service';
import { Paciente } from '../../models/Paciente';
import { MedicosService } from '../../../services/medicoServices/medicos.service';
import { AdminService } from '../../../services/adminServices/admin.service';
import { Medico } from '../../models/Medico';
import { Admin } from '../../models/Admin';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, MatInputModule, MatFormField],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {

  ngOnInit(): void {
      localStorage.clear()
  }

  constructor(private pacienteService: PacienteService, private medicoService: MedicosService, private admService: AdminService, private sharedService: SharedService, private http: AuthService, public dialog: MatDialog){
  
  }

  authUser = 'medico';
  errorMessage = '';
  crmErrorMessage='';
  nomeErrorMessage='';
  cpfErrorMessage='';
  // declarações dos inputs
 request = new FormControl('', [Validators.required])
  senha = new FormControl('', [Validators.required, Validators.minLength(6)])
  tipoColab = new FormControl('1')

  nome = new FormControl('', [Validators.required])
  cpf = new FormControl('', [Validators.required, Validators.minLength(14)])
  loginFormMedico: { email: string|null; password: string|null; tipoColab: number|null } = {email: '', password: '', tipoColab: -1};
  loginFormPaciente: { tipoColab: number; nome: string|null; cpf: string|null} = { tipoColab: 0, nome: '', cpf: '' };
  //

  //validações de inputs
  updateErrorMessage(field: FormControl){
    if(field.hasError('required')){
      this.errorMessage = 'Esse campo é obrigatório!';
      this.crmErrorMessage = 'Esse campo é obrigatório!';
      this.nomeErrorMessage = 'Esse campo é obrigatório!';
      this.cpfErrorMessage = 'Esse campo é obrigatório!';

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
  async loginMedico(pk: FormControl) {
    if(pk.invalid){ this.sharedService.openDialog("Preencha o campo"); return}
   let pkAuth = pk.value;
   if(this.tipoColab.value==='-1'){
    this.sharedService.openDialog("Você precisa dizer se é Medico ou Administrador")
    }
    if (this.tipoColab.value == '1') {
      console.log('Médico: ' + pkAuth)
      this.sharedService.openDialog("Aguarde um momento.")
      this.medicoService.getMedicoPorCrm(pkAuth).subscribe(
        (data: Medico) => {
          if (data.crm == pkAuth) {
            localStorage.setItem('chavePrimaria', data.crm);
            localStorage.setItem('role', '1');
            localStorage.setItem('nomeUser', data.nomeMedico);
            this.sharedService.openDialog("Entrando!")
            this.sharedService.consultas();
          }
        }, (erro) => {
          console.log(erro)
          this.sharedService.openDialog("Credencial inválida!");
        }
      )
    } else if (this.tipoColab.value == '2') {
      console.log('Adm: ' + pkAuth)
      this.sharedService.openDialog("Aguarde um momento.")
      this.admService.loadByCpf(pkAuth).subscribe(
        (data: Admin) => {
          if (data.cpfAdmin == pkAuth) {
            localStorage.setItem('chavePrimaria', data.cpfAdmin);
            localStorage.setItem('role', '2');
            localStorage.setItem('nomeUser', data.nomeAdmin);
            this.sharedService.openDialog("Entrando!")
            this.sharedService.consultas();
          }
        }, (erro) => {
          console.log(erro)
          this.sharedService.openDialog("Credencial inválida!");
        }
      )
    }
    
  }
  loginPaciente(cpf: FormControl) {
    let pacienteLog!:Paciente;
    this.loginFormPaciente.cpf = this.cpf.value;
    console.log(this.loginFormPaciente.cpf);
    
    if (cpf.invalid) {
      this.sharedService.openDialog("Preencha os campos!");
      return; // Retorna para evitar que o restante do código seja executado se o formulário for inválido
    }
    this.pacienteService.loadByCpf(this.loginFormPaciente.cpf).subscribe(
      (paciente: Paciente) => {
        pacienteLog = paciente;
        if (pacienteLog && pacienteLog.cpfPaciente == this.loginFormPaciente.cpf) {
          localStorage.setItem('chavePrimaria', pacienteLog.cpfPaciente);
          localStorage.setItem('role', '0');
          localStorage.setItem('nomeUser', pacienteLog.nomePaciente);
          this.sharedService.consultas();
        } else {
          this.sharedService.openDialog("CPF não encontrado ou inválido!");
        }
      },
      (error) => {
        console.log(error);
        this.sharedService.openDialog("Ocorreu um erro ao tentar fazer login. Tente novamente mais tarde.");
      }
    );
  }
  changeDisplay(typeUser: string) {
     this.authUser = typeUser
  }
  changValueRequest(){
    this.request.setValue('')
  }
  openDialog() {
    const dialogRef = this.dialog.open(RegisterComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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

  formatCrm(event: any) {
    let inputValue: string = event.target.value.toString();
    const estadoMaxLength = 2;
    const crmMaxLength = 6;

    inputValue = inputValue.replace(/[^a-zA-Z0-9]/g, '');

    if (inputValue.length > crmMaxLength) {
      const crmPart = inputValue.slice(0, crmMaxLength);
      const estadoPart = inputValue.slice(crmMaxLength, crmMaxLength + estadoMaxLength);
      event.target.value = `${crmPart}/${estadoPart}`;
    }
  }
  resetPassword(){
    const dialogRef = this.dialog.open(ResetPasswordComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}


