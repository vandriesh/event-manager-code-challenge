import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { PSEvent } from '../event';

@Component({
  selector: 'app-event-view',
  templateUrl: './event-view.component.html',
  styleUrls: ['./event-view.component.scss']
})
export class EventViewComponent implements OnInit {
  @Input() event: PSEvent;
  @Input() type: string;
  @Output() onSend = new EventEmitter();
  @Output() onEdit = new EventEmitter();
  @Output() onDelete = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  sendInvites() {
    this.onSend.emit();
  }

  triggerEdit() {
    this.onEdit.emit();
  }
  triggerDelete() {
    this.onDelete.emit();
  }
}
