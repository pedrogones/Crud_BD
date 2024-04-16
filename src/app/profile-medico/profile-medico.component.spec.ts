import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileMedicoComponent } from './profile-medico.component';

describe('ProfileMedicoComponent', () => {
  let component: ProfileMedicoComponent;
  let fixture: ComponentFixture<ProfileMedicoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileMedicoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileMedicoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
