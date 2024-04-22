import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalExportReportComponent } from './modal-export-report.component';

describe('ModalExportReportComponent', () => {
  let component: ModalExportReportComponent;
  let fixture: ComponentFixture<ModalExportReportComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalExportReportComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalExportReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
