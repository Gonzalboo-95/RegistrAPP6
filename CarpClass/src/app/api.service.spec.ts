// api.service.spec.ts
import { TestBed } from '@angular/core/testing';
import { ApiService } from './api.service';  // Asegúrate de que la ruta sea correcta

describe('ApiService', () => {
  let service: ApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
