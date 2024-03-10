import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
  @Component({
    selector: 'app-create',
    standalone: true,
    templateUrl: './index.html',
    styleUrl: './styles.scss',
    imports: [FormsModule, AppComponent]
})
  export class main{


    home(){
      console.log('deu certo')
    }
    consultas(){

    }

  }
