import { NgZone } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { TimeAgoPipe } from 'time-ago-pipe';

import { AmmModule } from '../../core/amm/amm.module';

import { EventViewComponent } from './event-view.component';
class NgZoneMock {
  runOutsideAngular(fn: Function) {
    return fn();
  }
  run(fn: Function) {
    return fn();
  }
}

describe('EventViewComponent', () => {
  let component: EventViewComponent;
  let fixture: ComponentFixture<EventViewComponent>;
  const mockEvent = {
    id: 1,
    type: 'call',
    name: 'qwe call event',
    participants: [
      {
        email: 'johny1@gmail'
      },
      {
        email: 'johny1@hotmail'
      }
    ],
    created_date: new Date('February 01, 2018 11:12:13'),
    event_date: new Date('February 02, 2019 01:02:03')
  };
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [AmmModule],
      declarations: [EventViewComponent, TimeAgoPipe]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EventViewComponent);
    component = fixture.componentInstance;

    component.event = { ...mockEvent };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render card', () => {
    const pipe = new TimeAgoPipe(null, new NgZoneMock() as NgZone);

    const titleElement = fixture.debugElement.query(By.css('mat-card-title'));
    const subTitleElement = fixture.debugElement.query(By.css('mat-card-subtitle'));
    const participantsListElement = fixture.debugElement.queryAll(By.css('mat-list mat-chip'));
    const createInfoElement = fixture.debugElement.query(By.css('.created-info'));

    expect(titleElement.nativeElement.textContent).toEqual(mockEvent.name);
    expect(subTitleElement.nativeElement.textContent).toEqual('schedule 01:02');
    expect(participantsListElement[0].nativeElement.textContent).toEqual(
      mockEvent.participants[0].email
    );
    expect(participantsListElement[1].nativeElement.textContent).toEqual(
      mockEvent.participants[1].email
    );
    expect(createInfoElement.nativeElement.textContent).toContain(
      'created at: ' + pipe.transform(mockEvent.created_date.toString())
    );
  });

  it('should trigger delete event', (done) => {
    component.deleteEvent.subscribe((e) => {
      expect(e).toBeUndefined();
      done();
    });

    const deleteButton: HTMLButtonElement = <HTMLButtonElement>(
      fixture.debugElement.query(By.css('.button-delete')).nativeElement
    );

    deleteButton.click();
  });

  it('should trigger send invites event', (done) => {
    component.sendInvitation.subscribe((e) => {
      expect(e).toBeUndefined();
      done();
    });

    const deleteButton: HTMLButtonElement = <HTMLButtonElement>(
      fixture.debugElement.query(By.css('.button-send')).nativeElement
    );

    deleteButton.click();
  });

  it('should trigger edit event', (done) => {
    component.editEvent.subscribe((e) => {
      expect(e).toBeUndefined();
      done();
    });

    const deleteButton: HTMLButtonElement = <HTMLButtonElement>(
      fixture.debugElement.query(By.css('.button-edit')).nativeElement
    );

    deleteButton.click();
  });
});
