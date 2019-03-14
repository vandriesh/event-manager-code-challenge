import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { Call, Meeting } from './event';
import { EventService } from './event.service';

describe('EventService', () => {
  let service: EventService<Call | Meeting>;
  let event: Call;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientModule]
    });

    service = TestBed.get(EventService);

    event = {
      event_date: new Date('February 02, 2019 01:01:01'),
      name: 'qwe',
      participants: [
        {
          email: 'qwe1@qwe.com'
        },
        {
          email: 'qwe2@qwe.com'
        }
      ]
    } as Call;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should buidl notification email', function() {
    const out = service.formatEmailLink(event);
    const { name, participants } = event;
    expect(out).toEqual(
      `mailto:${participants
        .map((p) => p.email)
        .join(',')}?subject=${name}&body=You are invited to a meeting on 2019-02-02 01:01`
    );
  });
  it('should buidl notification email', function() {
    const time = {
      hours: 3,
      minutes: 30
    };
    const out = service.combineDateWithTime(event.event_date, time);
    expect(out).toEqual(new Date(`February 02, 2019 ${time.hours}:${time.minutes}:01`));
  });
});
