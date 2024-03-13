import { AuthService } from './../../services/auth.service';
import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { CommonModule } from '@angular/common';
import { Consultas } from '../models/Consultas';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {


  ngOnInit(): void {
      this.index();

  }

  constructor(private matSnack:MatSnackBar, private sharedService: SharedService, private http: AuthService) { }

  consultas: Consultas[] = [];
  minDate = Date();
  index(){
  this.http.index().subscribe(
    (data: Consultas[]) => {
      this.consultas = data;
    },
    error => {
      console.error('Ocorreu um erro ao buscar as consultas:', error);
    }
  );
  }


    delete(id: number) {
    
    }


    redirectCreate() {
      this.sharedService.create();
    }

    redirectUpdate(id: number) {
      this.sharedService.update(id);
    }

    
}
