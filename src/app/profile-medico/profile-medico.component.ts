import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile-medico',
  standalone: true,
  imports: [],
  templateUrl: './profile-medico.component.html',
  styleUrl: './profile-medico.component.scss'
})
export class ProfileMedicoComponent {


  constructor(private http: AuthService){}
  foto = this.getFoto()

  getFoto(){
    console.log('entrou')
    return this.http.photoProfile("Severino");
  }

}
