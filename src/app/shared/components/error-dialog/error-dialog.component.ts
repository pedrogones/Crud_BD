import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogModule} from '@angular/material/dialog';
import { SharedModule } from '../../shared.module';
@Component({
  selector: 'app-error-dialog',
  standalone: false,
  templateUrl: './error-dialog.component.html',
  styleUrl: './error-dialog.component.scss'
})
export class ErrorDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: string) {}
}
