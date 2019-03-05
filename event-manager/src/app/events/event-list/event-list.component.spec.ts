import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PSEvent } from '../event';

import { getIndex, EventListComponent } from './event-list.component';

describe('EventListComponent', () => {
  // let component: EventListComponent;
  // let fixture: ComponentFixture<EventListComponent>;

  beforeEach(async(() => {
    // TestBed.configureTestingModule({
    //   declarations: [EventListComponent]
    // }).compileComponents();
  }));

  beforeEach(() => {
    // fixture = TestBed.createComponent(EventListComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    // expect(component).toBeTruthy();
  });

  it('should return index where to insert', () => {
    const out = getIndex([], new Date());

    expect(out).toEqual(0);

    const event1: PSEvent = {
      event_date: new Date(2017, 1, 1).toISOString()
    } as PSEvent;
    const event2: PSEvent = {
      event_date: new Date(2017, 2, 1).toISOString()
    } as PSEvent;
    const event3: PSEvent = {
      event_date: new Date(2017, 3, 1).toISOString()
    } as PSEvent;

    const events: PSEvent[] = [event1, event2, event3];

    const out1 = getIndex(events, new Date(2017, 1, 10));
    expect(out1).toEqual(1);

    const out2 = getIndex(events, new Date(2017, 2, 10));
    expect(out2).toEqual(2);

    const out3 = getIndex(events, new Date(2017, 3, 10));
    expect(out3).toEqual(3);
  });
});
