import { ChangeDetectorRef, Component, EventEmitter, Inject, Input, OnInit, Output } from '@angular/core';
import { DateAdapter, MAT_DATE_FORMATS, MatDateFormats } from '@angular/material/core';
import { MatCalendar } from '@angular/material/datepicker';
import { Subject, takeUntil } from 'rxjs';
import { SharedService } from '../../shared/shared.service';
import { MatFormField } from '@angular/material/form-field';
import {MatIcon, MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-date-picker',
  standalone: true,
  imports:[MatIconModule],
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent<D extends Date | null | undefined = Date | null | undefined> implements OnInit {
  private _destroyed = new Subject<void>();

  @Input() selectedDate: D | undefined;

  @Output() dateSelected = new EventEmitter<D | null>();

  constructor(
    private _calendar: MatCalendar<D>,
    private _dateAdapter: DateAdapter<D>,
    @Inject(MAT_DATE_FORMATS) private _dateFormats: MatDateFormats,
    cdr: ChangeDetectorRef,
  ) {
    _calendar.stateChanges.pipe(takeUntil(this._destroyed)).subscribe(() => cdr.markForCheck());
  }

  ngOnInit() {
    this.selectedDate = this._calendar.activeDate;
  }

  ngOnDestroy() {
    this._destroyed.next();
    this._destroyed.complete();
  }

  get periodLabel() {
    return this._dateAdapter
      .format(this._calendar.activeDate!, this._dateFormats.display.monthYearLabel)
      .toLocaleUpperCase();
  }

  previousClicked(mode: 'month' | 'year') {
    this._calendar.activeDate =
      mode === 'month'
        ? this._dateAdapter.addCalendarMonths(this._calendar.activeDate!, -1)
        : this._dateAdapter.addCalendarYears(this._calendar.activeDate!, -1);
  }

  nextClicked(mode: 'month' | 'year') {
    this._calendar.activeDate =
      mode === 'month'
        ? this._dateAdapter.addCalendarMonths(this._calendar.activeDate!, 1)
        : this._dateAdapter.addCalendarYears(this._calendar.activeDate!, 1);
  }
 
  onDateSelected(date: D) {
    this.selectedDate = date;
    this.dateSelected.emit(this.selectedDate);
  }
}
