import { CommonModule } from '@angular/common';
import { Component, ElementRef, HostListener, Renderer2 } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import { SharedService } from '../../shared/shared.service';
import { AppComponent } from '../app.component';
import { appConfig } from '../app.config';
import { Router, RouterOutlet } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-create',
  standalone: true,
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.scss',
  imports: [FormsModule, AppComponent, CommonModule, RouterOutlet]
})
export class LayoutsComponent {

  authUser = 1
  constructor(private sharedService: SharedService, private router: Router, private photoProfile: AuthService) { }
  home() {
    this.sharedService.home()
  }
  consultas() {
  }
  loginRoute() {
    this.router.navigate(['/login']);
  }
  profileRoute() {
    this.menuAberto = false
    if(this.authUser==0){
      this.router.navigate(['/perfil-medico']);
    }else if(this.authUser==1){
      this.router.navigate(['/perfil-paciente']);
    }
  }


  getPhoto() {
    this.menuAberto = false
    return this.photoProfile.photoProfile("Pedro")
  }

  foto = this.getPhoto();
  menuAberto = false;
}
