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
import { Medico } from '../../models/Medico';
import { MedicosService } from '../../../services/medicoServices/medicos.service';
import { Admin } from '../../models/Admin';
import { AdminService } from '../../../services/adminServices/admin.service';

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
 // password = new FormControl('', [Validators.required, Validators.minLength(6)]);
 celularMedico = new FormControl('', Validators.required)
  crm = new FormControl('', [Validators.required]);
  sexo = new FormControl('', Validators.required);
  dataNascimento = new FormControl('', [Validators.required]);
  tipoUsuario=''
  errorMessage = '';
  cpfErrorMessage = ''
  emailErrorMessage = '';
  celularErrorMessage = ''
  crmErrorMessage = ''



  constructor(private sharedService: SharedService, private httpMedico: MedicosService, private httpAdm: AdminService) {
  }
medico:Medico={
  nomeMedico: '',
  crm: '',
  dataNascMedico: '',
  sexoMedico: '',
  emailMedico: '',
  celularMedico: '',
  tipoUsuario: 1
}
adm: Admin={
  nomeAdmin: '',
  cpfAdmin:  '',
  dataNascAdmin: '',
  sexoAdmin: '',
  emailAdmin:  '',
  celularAdmin:  '',
  tipoUsuario: 2
}
att(medico: Medico){
  medico.nomeMedico = this.nome.value
  medico.crm = this.crm.value
  medico.dataNascMedico = this.dataInFormat(this.dataNascimento.value)
  medico.sexoMedico = this.sexo.value
  medico.emailMedico = this.email.value
  medico.celularMedico = this.celularMedico.value
  return medico
}
attAdm(adm: Admin){
  adm.nomeAdmin = this.nome.value
  adm.cpfAdmin = this.cpf.value
  adm.dataNascAdmin = this.dataInFormat(this.dataNascimento.value)
  adm.sexoAdmin = this.sexo.value
  adm.emailAdmin = this.email.value
  adm.celularAdmin = this.celularMedico.value
  return adm
}
dataInFormat(data: any){
  const partes = data.split('/');
  const dataISO = partes[2] + '-' + partes[1] + '-' + partes[0];
 return dataISO
}
  cadastrar() {
    if (this.nome.invalid || this.email.invalid || this.celularMedico.invalid || this.celularMedico.invalid) {
      console.log('Por favor, preencha todos os campos corretamente.')
      return;
    }
    if(this.tipoUsuario==="medico"){
      let medicoObservable = this.att(this.medico)
       console.log(medicoObservable)
       this.sharedService.openDialog('Aguarde um momento!')
       this.httpMedico.create(medicoObservable).subscribe(
         (response) => {
           this.sharedService.openDialog('Médico registrado com sucesso: ' + response);
           setTimeout(() => {

             this.sharedService.consultas();
           }, 2000);
           localStorage.setItem('chavePrimaria', medicoObservable.crm);
           localStorage.setItem('role', '1');
           localStorage.setItem('nomeUser', medicoObservable.nomeMedico);
         },
         (error) => {
           this.sharedService.openDialog('Erro ao registrar Medico:'+ error);
           }
     );
    }else{
      let admObservable = this.attAdm(this.adm)
      console.log(admObservable)
      this.sharedService.openDialog('Aguarde um momento!')
      this.httpAdm.create(admObservable).subscribe(
        (response) => {
          this.sharedService.openDialog('Administrador registrado com sucesso: ' + response);
          setTimeout(() => {

            this.sharedService.consultas();
          }, 2000);
          localStorage.setItem('chavePrimaria', admObservable.nomeAdmin);
          localStorage.setItem('role', '2');
          localStorage.setItem('nomeUser', admObservable.nomeAdmin);
        },
        (error) => {
          this.sharedService.openDialog('Erro ao registrar Administrador:'+ error);
          }
    );
    }
}
  updateErrorMessage(field: FormControl) {
    if (field.invalid && (field.dirty || field.touched)) {
      if (field.hasError('required')) {
        this.errorMessage = 'Esse campo é obrigatório!';
        this.crmErrorMessage = 'Esse campo é obrigatório!';
        this.emailErrorMessage = 'Esse campo é obrigatório!';
        this.celularErrorMessage = 'Esse campo é obrigatório!';
      } else if (field.hasError('email')) {
        this.emailErrorMessage = 'Formato de e-mail inválido!';
      } else if (field.hasError('minlength')) {
        this.celularErrorMessage = 'No mínimo 6 caracteres';
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
     formatarCrm(event: any) {
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
