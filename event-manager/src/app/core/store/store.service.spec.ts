import { TestBed } from '@angular/core/testing';

import { Call, Meeting } from '../../events/event';

import { LocalStore } from './local-store';
import { StoreService } from './store.service';


describe('StoreService', () => {
  let service: StoreService<Call | Meeting>;
  beforeEach(() => {
    TestBed.configureTestingModule({});

    service = TestBed.get(StoreService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should build a store', function() {
    const email = 'qwe1@qwe';

    const callEvent1: Call = <Call>{
      created_date: new Date(),
      event_date: new Date('February 10, 2018 09:30:30'),
      name: 'call1',
      participants: [{ email }, { email }],
      type: 'call'
    };

    const meetingEvent1: Meeting = <Meeting>{
      created_date: new Date(),
      event_date: new Date('February 10, 2018 10:30:30'),
      name: 'meeting1',
      participants: [{ email }, { email }, { email }],
      type: 'meeting'
    };

    const meetingEvent2: Meeting = <Meeting>{
      created_date: new Date(),
      event_date: new Date('March 10, 2018 05:15:35'),
      name: 'meeting2',
      participants: [{ email }, { email }, { email }],
      type: 'meeting'
    };

    const entities = [callEvent1, meetingEvent1, meetingEvent2];
    const out: LocalStore<Call | Meeting> = service.buildEventStore(entities);

    expect(out).toEqual({
      entities: {
        '2018-02-10': [callEvent1, meetingEvent1],
        '2018-03-10': [meetingEvent2]
      },
      indexes: ['2018-02-10', '2018-03-10']
    });
  });
});
