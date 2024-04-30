import { TestBed } from '@angular/core/testing';

import { GateGuardRoutService } from './gate-guard-rout.service';

describe('GateGuardRoutService', () => {
  let service: GateGuardRoutService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GateGuardRoutService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
