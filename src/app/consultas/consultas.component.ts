import { AuthService } from '../../services/auth.service';
import { Component, ElementRef, OnInit, inject } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { CommonModule, Location } from '@angular/common';
import { Consultas } from '../models/Consultas';
import { MatIconModule } from '@angular/material/icon';
import { Observable, catchError, delay, of } from 'rxjs';
import { log } from 'console';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './consultas.component.html',
  styleUrl: './consultas.component.scss'
})
export class ConsultasComponent implements OnInit {

  consultas:  Observable<Consultas[]>|undefined
  
  ngOnInit(): void {
    delay(2000)  
    this.index();
  }

  constructor( private sharedService: SharedService, private http: AuthService) {
     this.index() 
    }

  index() {
    this.consultas = this.http.index()
 .pipe(
  catchError(error =>{
    console.log("Erro ao carregar o curso: "+error)
    return of([]);
  })
 );
  }
  delete(consulta: Consultas) {
    this.http.delete(consulta.idConsulta!).subscribe(
    () => {
      window.console.log('Removido Com Sucesso');
      this.index();
    }
    );

  }

  

  redirectCreate() {
    this.sharedService.create();
  }
  
  redirectUpdate(id: number) {
    this.sharedService.update(id);
  }
  
}
