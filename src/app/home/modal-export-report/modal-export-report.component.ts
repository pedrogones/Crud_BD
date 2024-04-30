import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Medico } from '../../models/Medico';
import { ConsultasService } from '../../../services/consultasServices/consultas.service';
import { saveAs } from 'file-saver';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { SharedService } from '../../../shared/shared.service';
import { MedicosService } from '../../../services/medicoServices/medicos.service';

@Component({
  selector: 'app-modal-export-report',
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule],
  templateUrl: './modal-export-report.component.html',
  styleUrl: './modal-export-report.component.scss'
})
export class ModalExportReportComponent implements OnInit{

  pkUser:any
  roleUser:any
  ngOnInit(){
    this.pkUser=localStorage.getItem('chavePrimaria')
    this.roleUser=localStorage.getItem('role')
    this.selectLoad()
  }
  constructor(private medicoService:MedicosService, private consultasService: ConsultasService, private sharedService: SharedService) {}


  menuMedicos = false;
  medicoSelect = '';
  medicos: Medico[] = []

authUser = 1;
dateInit!: string;
dateEnd!: string;

gerRelatorio = new FormControl('1');

  selectLoad(){
    if(this.roleUser==2){
      this.medicoService.index().subscribe((data: Medico[])=>{
        this.medicos = data;
      }, (er)=>{
        console.log(er)
      })
    }else {
      return;
    }
  }

changeValueRequest(){
  console.log("Date init: "+this.dateInit, "dateEnd: "+this.dateEnd)
  console.log(this.gerRelatorio.value)
}

selecionarMedico(nome: string): void {
  this.menuMedicos = false;
  this.medicoSelect = nome;
}
gerarRelatorio(): void {
  let crm:string
  if(this.roleUser==2){
      crm = this.medicoSelect
    }else{
     crm = this.pkUser
    }
    let nameFile = `consultas_${crm}`
  if(this.gerRelatorio.value=='1'){
    this.consultasService.gerarRelatorio().subscribe(
      (data: Blob) => {
        this.sharedService.openDialog("Aguarde um momento, seu relatorio será gerado em até 5 segundos!")
        const url = URL.createObjectURL(data); // Cria o URL do Blob
        const link = document.createElement('a'); // Cria um elemento de link
        link.href = url; // Define o URL do link
        link.download = `todas_${nameFile}.xlsx`; // Define o nome do arquivo para download
        document.body.appendChild(link); // Adiciona o link ao corpo do documento
        link.click(); // Simula o clique no link para iniciar o download
        document.body.removeChild(link); 
      },
      error => {
        console.error('Erro ao gerar o relatório:', error);
        // Trate o erro conforme necessário
      }
    );
  }else if(this.gerRelatorio.value=='2'){ 
    if((this.roleUser==2)&&(this.medicoSelect=='')){
      this.sharedService.openDialog("Você precisa selecionar um médico!")
      return
    }
    this.consultasService.gerarRelatorioPorDatas(this.dateInit, this.dateEnd, crm).subscribe(
      (data: Blob) => {
        this.sharedService.openDialog("Aguarde um momento, seu relatorio será gerado em até 5 segundos!")
        const url = URL.createObjectURL(data); // Cria o URL do Blob
        const link = document.createElement('a'); // Cria um elemento de link
        link.href = url; // Define o URL do link
        link.download =`${nameFile}.xlsx`; // Define o nome do arquivo para download
        document.body.appendChild(link); // Adiciona o link ao corpo do documento
        link.click(); // Simula o clique no link para iniciar o download
        document.body.removeChild(link); // Remove o link do corpo do documento após o download
      },
      error => {
        console.error('Erro ao gerar o relatório:', error);
        // Trate o erro conforme necessário
      }
    );
  }

}

}