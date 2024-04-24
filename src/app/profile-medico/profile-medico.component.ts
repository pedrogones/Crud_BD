import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Medico } from '../models/Medico';
import { MedicosService } from '../../services/medicoServices/medicos.service';
import { SharedService } from '../../shared/shared.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile-medico',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-medico.component.html',
  styleUrl: './profile-medico.component.scss'
})
export class ProfileMedicoComponent implements OnInit {
  pkUser:any;
  roleUser: any;
  ngOnInit(): void {
    this.pkUser = localStorage.getItem('chavePrimaria');
    this.roleUser = Number(localStorage.getItem('role'));
    this.index()
  }
  medico!:Medico;
  index(){
    this.httpMedico.getMedicoPorCrm(this.pkUser).subscribe(
      (data: Medico)=>{
        this.medico=data;
        this.foto = this.http.photoProfile(this.medico.nomeMedico)
        console.log(this.medico)
      },
    (error) => {
      this.sharedService.openDialog('Erro ao carregar perfil do paciente: ' + error);
    });

  }
  sexoFormat(char: any): string {
    return char === 'm' ? 'Masculino' : 'Feminino';
  }
  constructor(private http: AuthService, private httpMedico: MedicosService, private sharedService: SharedService){}
  foto = ''

  edit(){
    this.anableInputs=true
  }
  anableInputs = false
   saveUpdate(){
    if (this.medico) {
      this.httpMedico.updateMedico(this.medico.crm, this.medico).subscribe(
        (response) => {
          this.sharedService.openDialog('Perfil do Médico atualizado com sucesso!');
          this.anableInputs = false;
          localStorage.setItem('nomeUser', this.medico!.nomeMedico);
          this.foto = this.http.photoProfile(this.medico!.nomeMedico);
        },
        (error) => {
          this.sharedService.openDialog('Erro ao atualizar perfil do Médico: ' + error);
          console.log(error)
        }
      );
    }
   }

}
