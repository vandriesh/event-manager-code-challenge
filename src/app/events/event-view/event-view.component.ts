import { Component, EventEmitter, Input, Output } from '@angular/core';

import { PSEvent } from '../event';

@Component({
  selector: 'app-event-view',
  styleUrls: ['./event-view.component.scss'],
  templateUrl: './event-view.component.html'
})
export class EventViewComponent {
  @Input() event: PSEvent;
  @Input() type: string;
  @Output() sendInvitation = new EventEmitter();
  @Output() editEvent = new EventEmitter();
  @Output() deleteEvent = new EventEmitter();

  constructor() {}

  sendInvites() {
    this.sendInvitation.emit();
  }

  triggerEdit() {
    this.editEvent.emit();
  }

  triggerDelete() {
    this.deleteEvent.emit();
  }
}
