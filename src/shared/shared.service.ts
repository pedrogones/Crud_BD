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
}
