import { Component, OnInit } from '@angular/core';
import { SharedService } from '../../../shared/shared.service';
import { FormsModule } from '@angular/forms';
import { Consultas } from '../../models/Consultas';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './update.component.html',
  styleUrl: './update.component.scss'
})
export class UpdateComponent implements OnInit {

  constructor(private sharedService: SharedService){}
  consulta: Consultas = {
    id: 1,
    nomePaciente: 'Pedro Gomes',
    nomeMedico: 'João Marcos',
    dataConsulta: '20/03, 08:30',
    motivoConsulta: 'Revisão Geral',
  };

  ngOnInit(){

  }



  backHome(){
    this.sharedService.home()
  }
  save(){
    //implements
  }


}
