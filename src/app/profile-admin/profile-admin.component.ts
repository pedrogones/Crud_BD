import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { MedicosService } from '../../services/medicoServices/medicos.service';
import { SharedService } from '../../shared/shared.service';
import { Medico } from '../models/Medico';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AdminService } from '../../services/adminServices/admin.service';
import { Admin } from '../models/Admin';

@Component({
  selector: 'app-profile-admin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './profile-admin.component.html',
  styleUrl: './profile-admin.component.scss'
})
export class ProfileAdminComponent {
  constructor(private http: AuthService, private httpMedico: MedicosService, private adminService: AdminService, private sharedService: SharedService){}
  ngOnInit(): void {
    this.pkUser = localStorage.getItem('chavePrimaria');
    this.roleUser = Number(localStorage.getItem('role'));
    this.index()
  }
  admin!:Admin;
  pkUser:any;
  roleUser: any;
  index(){

    this.adminService.loadByCpf(this.pkUser).subscribe(
      (data: Admin)=>{
        this.admin=data;
        this.foto = this.http.photoProfile(this.admin.nomeAdmin)
        console.log(this.admin)
      },
    (error) => {
      this.sharedService.openDialog('Erro ao carregar perfil do paciente: ' + error);
    });

  }
  sexoFormat(char: any): string {
    return char === 'm' ? 'Masculino' : 'Feminino';
  }
  foto = ''

  edit(){
    this.anableInputs=true
  }
  anableInputs = false
   saveUpdate(){
    if (this.admin) {
      this.adminService.update(this.admin).subscribe(
        (response) => {
          this.sharedService.openDialog('Perfil do Administrador atualizado com sucesso!');
          this.anableInputs = false;
          localStorage.setItem('nomeUser', this.admin!.nomeAdmin);
          this.foto = this.http.photoProfile(this.admin!.nomeAdmin);
        },
        (error) => {
          this.sharedService.openDialog('Erro ao atualizar perfil do Administrador: ' + error);
          console.log(error)
        }
      );
    }
   }

}
