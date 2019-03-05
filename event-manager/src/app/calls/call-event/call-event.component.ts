import { Component, Input, OnInit } from '@angular/core';
import { Call } from '../../events/event';
import { EventService } from '../../events/event.service';

@Component({
  selector: 'app-call-event',
  templateUrl: './call-event.component.html',
  styleUrls: ['./call-event.component.scss']
})
export class CallEventComponent implements OnInit {
  @Input() callEvent: Call;

  constructor(private eventService: EventService) {}

  ngOnInit() {}

  formatEmailLink() {
    return this.eventService.formatEmailLink(this.callEvent);
  }

  getParticipants() {
    return this.callEvent.participants.map((participant) => participant.email).join(', ');
  }
}
