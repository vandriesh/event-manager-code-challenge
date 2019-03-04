import { TestBed } from '@angular/core/testing';

import { InMemEventsService } from './in-mem-events.service';

describe('InMemEventsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: InMemEventsService = TestBed.get(InMemEventsService);
    expect(service).toBeTruthy();
  });
});
