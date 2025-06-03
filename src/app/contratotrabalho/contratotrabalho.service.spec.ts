import { TestBed } from '@angular/core/testing';

import { ContratoTrabalhoService } from './contratotrabalho.service';

describe('ContratoTrabalhoService', () => {
  let service: ContratoTrabalhoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ContratoTrabalhoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
