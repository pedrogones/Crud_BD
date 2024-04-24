import { Injectable } from '@angular/core';
import { Router, RouterModule, ActivatedRoute } from '@angular/router';
import { ErrorDialogComponent } from '../app/shared/components/error-dialog/error-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { time } from 'console';
import { PermissionsService } from '../app/controller/permissions.service';


@Injectable({
  providedIn: 'root'
})
export class SharedService {
  horaFormatada!:string;
  constructor(private permissions: PermissionsService, private dialog: MatDialog,private router: Router, private route: ActivatedRoute) { }
  consultas() {
    this.router.navigate(['/dashboard']);
  }
  consultasAndId(role: any) {
    this.permissions.setRole(role)
    this.router.navigate(['/dashboard']);
  }
  consultasPorChave(role: any, cpf: any){
    this.permissions.setRole(role);
    this.permissions.setChavePrimaria(cpf);
    this.router.navigate(['/dashboard']);
  }
  dashboardRole(role: any, cpf: any){
    this.permissions.setRole(role);
    this.permissions.setChavePrimaria(cpf);
    this.router.navigate(['/dashboard']);
  }
  home(){
    this.router.navigate(['/consultas'], { relativeTo: this.route });
  }
  homeRole(role: any, primaryKey: any){
    this.permissions.setRole(role);
    this.permissions.setChavePrimaria(primaryKey);
    this.router.navigate(['/consultas'], { relativeTo: this.route });
  }
  create(): void {
    this.router.navigate(['/consultas/create'], { relativeTo: this.route });
  }
  createRole(role: any, primaryKey: any) {
    this.permissions.setRole(role);
    this.permissions.setChavePrimaria(primaryKey);
    this.router.navigate(['/consultas/create'], { relativeTo: this.route });
  }
  update(id: any) {
    this.router.navigate(['/consultas/update', id], { relativeTo: this.route });
  }
  profileRole(role: any, primaryKey: any){
    this.permissions.setRole(role);
    this.permissions.setChavePrimaria(primaryKey);
    if(role==0){
      this.router.navigate(['/perfil-paciente']);
    }else if(role==1){
      this.router.navigate(['/perfil-medico']);
    }

  }

  updateRole(id: any, role: any, primaryKey: any) {
    this.permissions.setRole(role);
    this.permissions.setChavePrimaria(primaryKey);
    this.router.navigate(['/consultas/update', id], { relativeTo: this.route });
  }

  openDialog(message: string) {
    const dialogRef = this.dialog.open(ErrorDialogComponent, {
      data: message,
    });

    setTimeout(() => {
      dialogRef.close();
    }, 1500);

  }

formatarHora(data: string):string{
   const partes = data.split(' ');
   const horaMinuto = partes[2].split(':');
   return horaMinuto[0] + ':' + horaMinuto[1];
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
  dateRigthFormat(data: string): string {
    const dataHora = new Date(data); // Converter a string para um objeto Date
    const dia = this.pad(dataHora.getDate());
    const mes = this.pad(dataHora.getMonth() + 1);
    const ano = dataHora.getFullYear();
    return `${dia}/${mes}/${ano}`;
  }
formatData(data: any){
  const dataHora = new Date(data); // Converter a string para um objeto Date
  const dia = this.pad(dataHora.getDate());
  const mes = this.pad(dataHora.getMonth() + 1);
  const ano = dataHora.getFullYear();
  return `${ano}-${mes}-${dia}`
}

  pad(numero: number): string {
    return numero < 10 ? '0' + numero : numero.toString();
  }

}
