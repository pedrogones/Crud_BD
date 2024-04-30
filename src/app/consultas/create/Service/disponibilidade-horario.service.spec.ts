import { TestBed } from '@angular/core/testing';

import { DisponibilidadeHorarioService } from './disponibilidade-horario.service';

describe('DisponibilidadeHorarioService', () => {
  let service: DisponibilidadeHorarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisponibilidadeHorarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
