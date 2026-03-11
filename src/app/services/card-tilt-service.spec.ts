import { TestBed } from '@angular/core/testing';

import { CardTiltService } from './card-tilt-service';

describe('CardTiltService', () => {
  let service: CardTiltService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CardTiltService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
