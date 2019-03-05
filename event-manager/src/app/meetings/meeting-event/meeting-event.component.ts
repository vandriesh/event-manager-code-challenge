import { Component, Input, OnInit } from '@angular/core';
import { Meeting } from '../../events/event';
import { EventService } from '../../events/event.service';

@Component({
  selector: 'app-meeting-event',
  templateUrl: './meeting-event.component.html',
  styleUrls: ['./meeting-event.component.scss']
})
export class MeetingEventComponent implements OnInit {
  @Input() meetingEvent: Meeting;

  constructor(private eventService: EventService) {}

  ngOnInit() {}

  formatEmailLink() {
    return this.eventService.formatEmailLink(this.meetingEvent);
  }

  getParticipants() {
    return this.meetingEvent.participants.map((participant) => participant.email).join(', ');
  }
}
