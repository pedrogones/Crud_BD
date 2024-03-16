import { Injectable } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { ErrorDialogComponent } from '../app/shared/components/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { time } from 'console';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  constructor(private dialog: MatDialog,private router: Router, private route: ActivatedRoute) { }
  consultas() {
    this.router.navigate([''], { relativeTo: this.route });
  }
  home(){
    this.router.navigate(['consultas'], { relativeTo: this.route });
  }
  create(): void {
    this.router.navigate(['consultas/create'], { relativeTo: this.route });
  }
   update(id: number) {
    this.router.navigate(['consultas/update', id], { relativeTo: this.route });
  }
  openDialog(message: string) {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      data: message,
    });

    setTimeout(() => {
      dialogRef.close();
    }, 1500);

  }


  converterData(data: string): string {
    const dataHora = new Date(data); // Converter a string para um objeto Date
    const dia = this.pad(dataHora.getDate());
    const mes = this.pad(dataHora.getMonth() + 1);
    const ano = dataHora.getFullYear();
    const hora = this.pad(dataHora.getHours());
    const minutos = this.pad(dataHora.getMinutes());

    return `${dia}/${mes}/${ano} às ${hora}:${minutos}`;
  }


  pad(numero: number): string {
    return numero < 10 ? '0' + numero : numero.toString();
  }

}
