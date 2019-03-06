import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { CreateNewCallDialogComponent } from '../../calls/create-new-call-dialog/create-new-call-dialog.component';
import { LocalState } from '../../core/store/local-store';
import { StoreService } from '../../core/store/store.service';
import { Call, Meeting, PSEvent } from '../event';
import { EventService } from '../event.service';

export function getIndex(arr: PSEvent[], newDate: Date) {
  for (let i = 0; i < arr.length; i++) {
    const aDate = new Date(arr[i].event_date);
    const diff = aDate.getTime() - newDate.getTime();

    if (diff > 0) {
      return i;
    }
  }

  return arr.length;
}

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent {
  events: (Meeting | Call)[];
  newCallId = 0;
  eventStore: LocalState<Call | Meeting>;

  constructor(
    private eventService: EventService<Call | Meeting>,
    private storeService: StoreService,
    private dialog: MatDialog
  ) {
    this.eventService.getAll().subscribe((events: (Call | Meeting)[]) => {
      this.events = events.slice(0, events.length + 1).map((e) => {
        e.event_date = new Date(e.event_date);
        e.created_date = new Date(e.created_date);

        return e;
      });

      this.eventStore = this.storeService.buildEventStore(events);
      this.newCallId = events.length;
    });
  }

  openCreateDialog(event: Call | Meeting) {
    const dialogRef = this.dialog.open(CreateNewCallDialogComponent, {
      autoFocus: true,
      data: {
        creating: true,
        event
      }
    });

    dialogRef.afterClosed().subscribe((newCall: any) => {
      if (!newCall) {
        return;
      }

      const { event_date, name, participants, hours, minutes } = newCall;

      const id = (this.newCallId += 1);
      const remasteredCall = <Call>{
        ...event,
        id,
        name,
        created_date: new Date(),
        event_date: this.eventService.combineDateWithTime(event_date, { hours, minutes }),
        participants
      };

      this.eventService.add(remasteredCall).subscribe(() => {
        this.events.push(remasteredCall);
        this.eventStore = this.storeService.buildEventStore(this.events);
      });
    });
  }

  openEditDialog(callEvent: Call | Meeting) {
    const dialogRef = this.dialog.open(CreateNewCallDialogComponent, {
      autoFocus: true,
      data: {
        creating: false,
        event: callEvent
      }
    });

    dialogRef.afterClosed().subscribe((newCall: any) => {
      if (!newCall) {
        return;
      }

      const { event_date, name, participants, hours, minutes } = newCall;

      const remasteredCall = {
        ...callEvent,
        name,
        created_date: new Date(),
        event_date: this.eventService.combineDateWithTime(event_date, { hours, minutes }),
        participants
      };

      const index = this.events.findIndex((item) => item.id === callEvent.id);

      const updatedEvents = [
        ...this.events.slice(0, index),
        remasteredCall,
        ...this.events.slice(index + 1)
      ];

      this.eventService.save(remasteredCall).subscribe(() => {
        this.events = updatedEvents;
        this.eventStore = this.storeService.buildEventStore(this.events);
      });
    });
  }

  sendInvites(participants: PSEvent) {
    window.open(this.eventService.formatEmailLink(participants));
  }

  editEvent(event: Call | Meeting) {
    this.openEditDialog(event);
  }

  deleteEvent(event: Call | Meeting) {
    this.eventService.remove(event).subscribe(() => {
      this.events = this.events.filter((item) => item.id !== event.id);
      this.eventStore = this.storeService.buildEventStore(this.events);
    });
  }

  openCreateMeetingDialog() {
    const email = '';

    this.openCreateDialog(<Meeting>{
      type: 'meeting',
      participants: [{ email }, { email }, { email }]
    });
  }

  openCreateCallDialog() {
    const email = '';

    this.openCreateDialog(<Call>{
      type: 'call',
      participants: [{ email }, { email }]
    });
  }
}
