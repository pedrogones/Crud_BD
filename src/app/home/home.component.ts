import { AuthService } from './../../services/auth.service';
import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { User } from '../models/user';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent{


  users: User[]=[]
  constructor(private sharedService: SharedService
    , private http: AuthService
    ) { }

  index(){

  }
    delete(id: number) {

    }

    redirectCreate() {
      this.sharedService.create();
    }

    redirectUpdate() {
      this.sharedService.update();
    }
}
