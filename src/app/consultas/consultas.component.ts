import { AuthService } from '../../services/auth.service';
import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { CommonModule } from '@angular/common';
import { Consultas } from '../models/Consultas';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './consultas.component.html',
  styleUrl: './consultas.component.scss'
})
export class ConsultasComponent implements OnInit {

  consultas: Consultas[] = []

  ngOnInit(): void {
      this.index();
  }

  constructor(private sharedService: SharedService, private http: AuthService) { }

  index() {
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
    this.http.delete(id)
  }


  redirectCreate() {
    this.sharedService.create();
  }

  redirectUpdate(id: number) {
    this.sharedService.update(id);
  }

  
}
