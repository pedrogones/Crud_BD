import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SharedService } from './shared/shared.service';
import { CommonModule } from '@angular/common';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
  @Component({
    selector: 'app-create',
    standalone: true,
    templateUrl: './index.html',
    styleUrl: './styles.scss',
    imports: [FormsModule, AppComponent, CommonModule]
})
  export class main{

    authUser = 'mdico'
    constructor(private sharedService: SharedService){}
home(){
      this.sharedService.home()
    }
    consultas(){

    }

  }
