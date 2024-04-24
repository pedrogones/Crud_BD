import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, OnInit, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import { SharedService } from '../../shared/shared.service';
import { AppComponent } from '../app.component';
import { appConfig } from '../app.config';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { PermissionsService } from '../controller/permissions.service';
import { AuthUser } from '../models/AuthUser';

@Component({
  selector: 'app-create',
  standalone: true,
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.scss',
  imports: [FormsModule, AppComponent, CommonModule, RouterOutlet]
})
export class LayoutsComponent implements OnInit{

  authUser:AuthUser={
    id: 0,
    nome: '',
    role: 0,
    chavePrimaria:''
  }

  pkUser:any
  roleUser:any
  nomeUser:any
  primaryKey :any

  ngOnInit(): void {
      this.pkUser = localStorage.getItem('chavePrimaria');
      this.roleUser = Number(localStorage.getItem('role'));
      this.nomeUser = localStorage.getItem('nomeUser')
      console.log(this.pkUser, this.roleUser)
      this.foto =this.getPhoto()
      this.visible = true

  }
  constructor(private permission: PermissionsService, private sharedService: SharedService, private router: Router, private photoProfile: AuthService) { }
  home() {
    this.sharedService.homeRole(this.roleUser, this.pkUser)
  }
  consultas() {
  }
  loginRoute() {
    localStorage.clear()
    this.router.navigate(['/login']);
  }
  profileRoute() {
    console.log(this.roleUser)
    this.menuAberto = false
    if(this.roleUser==0){
      this.router.navigate(['/perfil-paciente']);
    }else if(this.roleUser==1){
      this.router.navigate(['/perfil-medico']);
    }
  }

  consultasList(){
    this.sharedService.homeRole(this.roleUser, this.pkUser)
  }

  getPhoto() {
    this.menuAberto = false
    return this.photoProfile.photoProfile(this.nomeUser)
  }

  foto =''
  visible = false
  menuAberto = false;
}

