import { AuthService } from './../../services/auth.service';
import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { CommonModule } from '@angular/common';
import { Consultas } from '../models/Consultas';
import { MatSnackBar } from '@angular/material/snack-bar';
import { catchError, delay, of } from 'rxjs';
import { error } from 'console';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { SharedModule } from '../shared/shared.module';
import { ErrorDialogComponent } from '../shared/components/error-dialog/error-dialog.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatDialogModule, SharedModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit {


  consultaIsEmpty = true;
  isContentVisible = false
  ngOnInit(): void {
    setTimeout(() => {
      this.isContentVisible = true; // Define como true após o atraso de 5 segundos
      this.index();
    }, 1500);
  }
  constructor(private sharedService: SharedService, private http: AuthService) { }

  consultas: Consultas[] = [];
  minDate = Date();
  index() {
    this.http.index().subscribe(
      (data: Consultas[]) => {
        this.consultas = data;
        this.consultaIsEmpty = false;
      },
      error => {
        this.openDialog('Ocorreu um erro ao listar as consultas, tente novamente mais tarde');
      }
    );
  }

  openDialog(message: string) {
    this.sharedService.openDialog(message)
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
