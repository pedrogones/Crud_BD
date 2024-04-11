import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { bootstrapApplication } from '@angular/platform-browser';
import { SharedService } from '../../shared/shared.service';
import { AppComponent } from '../app.component';
import { appConfig } from '../app.config';
import { Router, RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-create',
  standalone: true,
  templateUrl: './layouts.component.html',
  styleUrl: './layouts.component.scss',
  imports: [FormsModule, AppComponent, CommonModule, RouterOutlet]
})
export class LayoutsComponent {

    authUser = 'medico'
    constructor(private sharedService: SharedService, private router: Router){}
home(){
      this.sharedService.home()
    }
    consultas(){
    }
    loginRoute(){
      this.router.navigate(['/login']);
    }

  }

