import { TestBed } from '@angular/core/testing';

import { InteractionMockService } from './interaction-mock.service';

describe('InteractionMockService', () => {
  let service: InteractionMockService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InteractionMockService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
