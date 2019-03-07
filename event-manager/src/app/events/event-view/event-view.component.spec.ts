import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { TimeAgoPipe } from 'time-ago-pipe';
import { AmmModule } from '../../core/amm/amm.module';
import { PSEvent } from '../event';

import { EventViewComponent } from './event-view.component';

describe('EventViewComponent', () => {
  let component: EventViewComponent;
  let fixture: ComponentFixture<EventViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AmmModule],
      declarations: [EventViewComponent, TimeAgoPipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventViewComponent);
    component = fixture.componentInstance;
    component.event = {
      participants: [],
      created_date: new Date(),
      event_date: new Date()
    } as PSEvent;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
