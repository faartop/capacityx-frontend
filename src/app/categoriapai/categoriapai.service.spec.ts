import { TestBed } from '@angular/core/testing';

import { CategoriaPaiService } from './categoriapai.service';

describe('CategoriaPaiService', () => {
  let service: CategoriaPaiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CategoriaPaiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
