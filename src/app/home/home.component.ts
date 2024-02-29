import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { User } from '../models/user';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  ngOnInit(): void {

  }

  users: User[]=[]
  constructor(private sharedService: SharedService
    , private http: AuthService
    ) { }



  index(){
    this.http.index().subscribe(
      users => {
        this.users = users;
      },
      error => {
        console.error('Erro ao carregar usuários:', error);
      }
    );
  }
    delete(id: number) {
      this.http.delete(id).subscribe(
        response => {
          console.log('Usuário excluído com sucesso:', response);
          this.index();
        },
        error => {
          console.error('Erro ao excluir usuário:', error);
        }
      );
    }

    redirectCreate() {
      this.sharedService.create();
    }

    redirectUpdate() {
      this.sharedService.update();
    }
}
