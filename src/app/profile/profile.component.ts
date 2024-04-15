import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent {


  constructor(private http: AuthService){}
  foto = this.getFoto()

  getFoto(){
    console.log('entrou')
    return this.http.photoProfile("Pedro");
  }

}
