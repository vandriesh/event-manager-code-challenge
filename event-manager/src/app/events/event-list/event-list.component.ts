import { Component } from '@angular/core';
import { MatDialog } from '@angular/material';

import { LocalStore } from '../../core/store/local-store';
import { StoreService } from '../../core/store/store.service';
import { PickLocationDialogComponent } from '../../meetings/pick-location-dialog/pick-location-dialog.component';
import { Call, Meeting, PSEvent } from '../event';
import { EventEditDialogComponent } from '../event-edit-dialog/event-edit-dialog.component';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-list',
  styleUrls: ['./event-list.component.scss'],
  templateUrl: './event-list.component.html'
})
export class EventListComponent {
  events: (Meeting | Call)[];
  newCallId = 0;
  eventStore: LocalStore<Call | Meeting>;

  constructor(
    private eventService: EventService<Call | Meeting>,
    private storeService: StoreService<Call | Meeting>,
    private dialog: MatDialog,
    private mapDialog: MatDialog
  ) {
    this.eventService.getAll().subscribe((events: (Call | Meeting)[]) => {
      this.events = events.slice(0, events.length + 1).map((e) => {
        // reverting im-memory-api side effect (Date -> string)
        e.event_date = new Date(e.event_date);
        e.created_date = new Date(e.created_date);

        return e;
      });

      this.eventStore = this.storeService.buildEventStore(events);
      this.newCallId = events.length;
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
      participants: [{ email }, { email }, { email }],
      type: 'meeting'
    });
  }

  openCreateCallDialog() {
    const email = '';

    this.openCreateDialog(<Call>{
      participants: [{ email }, { email }],
      type: 'call'
    });
  }

  pickAddressDialog(event: any) {
    const dialogRef = this.mapDialog.open(PickLocationDialogComponent, {
      data: event.address || {lat : 47.005, lng : 28.8577 },
      width: '500px'
    });

    dialogRef.afterClosed().subscribe((newAddress: any) => {
      if (newAddress === null) {
        return;
      }

      this.saveEvent({ ...event, address: newAddress });
    });
  }

  private openEditDialog(callEvent: Call | Meeting) {
    const dialogRef = this.dialog.open(EventEditDialogComponent, {
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
        created_date: new Date(),
        event_date: this.eventService.combineDateWithTime(event_date, { hours, minutes }),
        name,
        participants
      };

      this.saveEvent(remasteredCall);
    });
  }

  private openCreateDialog(event: Call | Meeting) {
    const dialogRef = this.dialog.open(EventEditDialogComponent, {
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
        created_date: new Date(),
        event_date: this.eventService.combineDateWithTime(event_date, { hours, minutes }),
        id,
        name,
        participants
      };

      this.eventService.add(remasteredCall).subscribe(() => {
        this.events.push(remasteredCall);
        this.eventStore = this.storeService.buildEventStore(this.events);
      });
    });
  }

  private saveEvent(event: Call | Meeting) {
    const index = this.events.findIndex((item) => item.id === event.id);

    const updatedEvents = [...this.events.slice(0, index), event, ...this.events.slice(index + 1)];

    this.eventService.save(event).subscribe(() => {
      this.events = updatedEvents;
      this.eventStore = this.storeService.buildEventStore(this.events);
    });
  }
}
