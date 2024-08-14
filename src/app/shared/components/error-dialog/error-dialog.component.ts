import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import swal from 'sweetalert';

@Component({
  selector: 'app-error-dialog',
  templateUrl: './error-dialog.component.html',
  styleUrls: ['./error-dialog.component.scss']
})
export class ErrorDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}

  public showAlert() {
    swal({
      title: "Error",
      text: this.data,
      icon: "error",
      buttons: [true, "Ok"]
    });
  }
}
