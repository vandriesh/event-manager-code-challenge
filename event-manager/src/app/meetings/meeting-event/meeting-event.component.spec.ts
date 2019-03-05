import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeetingEventComponent } from './meeting-event.component';

describe('MeetingEventComponent', () => {
  let component: MeetingEventComponent;
  let fixture: ComponentFixture<MeetingEventComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeetingEventComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeetingEventComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
