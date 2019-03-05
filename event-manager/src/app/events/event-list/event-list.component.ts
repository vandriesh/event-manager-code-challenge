import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateNewCallDialogComponent } from '../../calls/create-new-call-dialog/create-new-call-dialog.component';

import { Call, Meeting, Participant, PSEvent } from '../event';
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

interface LocalState<T> {
  nextId: number;
  indexes: string[];
  entities: {
    [key: string]: T;
  };
}

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent {
  calls: Call[];
  meetings: Meeting[];
  newCallId = 0;

  callEventStore: LocalState<Call>;

  constructor(
    private eventService: EventService,
    @Inject(LOCALE_ID) private locale: string,
    private dialog: MatDialog
  ) {
    this.eventService.getAll<Call>('calls').subscribe((events) => {
      this.calls = events.slice(0, events.length + 1);

      this.newCallId = this.calls.length;
      this.buildCallEventStore(events);
    });

    this.eventService.getAll<Meeting>('meetings').subscribe((events) => {
      this.meetings = events.slice(0, events.length + 1);
    });
  }

  buildCallEventStore(events: Call[]) {
    this.callEventStore = this.buildStore<Call>(events, (e: Call) =>
      formatDate(e.event_date, 'yyyy-MM-dd', this.locale)
    );
  }

  private buildStore<T>(events: T[], getKey: (e: T) => string) {
    const store = {
      nextId: events.length,
      indexes: [],
      entities: {}
    };

    events.forEach((event: T) => {
      const key = getKey(event);

      if (!store.entities[key]) {
        store.indexes.push(key);
        store.entities[key] = [];
      }

      store.entities[key].push(event);
    });

    return store;
  }

  getParticipants(participants: any[]) {
    return participants.map((participant: Participant) => participant.email);
  }

  formatEmailLink(call: Call | Meeting) {
    const mailto = this.getParticipants(call.participants).join(',');
    const date = formatDate(call.event_date, 'yyyy-mm-dd hh:mm', this.locale);
    const bodyMessage = `You are invited to a meeting at ${date}`;

    return `mailto:${mailto}?subject=${call.name}&body=${bodyMessage}`;
  }

  openCreateCallDialog() {
    const dialogRef = this.dialog.open(CreateNewCallDialogComponent, {
      autoFocus: true,
      data: {}
    });

    dialogRef.afterClosed().subscribe((newCall: any) => {
      if (!newCall) {
        return;
      }

      const { event_date, name, participants, hours, minutes } = newCall;

      const index = getIndex(this.calls, event_date);
      const event_date_and_time = new Date(event_date);
      event_date_and_time.setHours(hours);
      event_date_and_time.setMinutes(minutes);

      const remasteredCall = {
        name,
        created_date: new Date().toISOString(),
        event_date: event_date_and_time.toISOString(),
        participants
      };

      this.eventService.add('calls', remasteredCall).subscribe((call: Call) => {
        const id = (this.newCallId += 1);
        call.id = id;
        this.calls.splice(index, 0, call);

        this.buildCallEventStore(this.calls);
      });
    });
  }

}
