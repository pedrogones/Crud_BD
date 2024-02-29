import { Component, Input } from '@angular/core';
import { User } from '../models/user';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-create',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.scss'
})
export class CreateComponent {
  user: User={
    name: '',
    last_name: '',
    email: '',
    sexo: '',
    country: '',
    informacoes: ''
  }

  showFields(){
  }

}
