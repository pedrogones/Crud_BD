import { Component } from '@angular/core';
import { SharedService } from '../../shared/shared.service';
import { CrudService } from '../../services/crud.service';
import { User } from '../models/user';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

  users: User[]=[]
  constructor(
    private sharedService: SharedService,
    private http: CrudService ) { }

  ngOnInit(){
    this.index();
  }

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

    redirectCreate() {
      this.sharedService.create();
    }

    redirectUpdate() {
      this.sharedService.update();
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

}
