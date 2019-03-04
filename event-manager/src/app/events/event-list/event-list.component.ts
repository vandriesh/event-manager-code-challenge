import { formatDate } from '@angular/common';
import { Component, Inject, LOCALE_ID } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CreateNewCallDialogComponent } from '../../calls/create-new-call-dialog/create-new-call-dialog.component';

import { Call, Meeting, Participant } from '../event';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent {
  calls: Call[];
  meetings: Meeting[];
  newCall: Call;

  constructor(
    private eventService: EventService,
    @Inject(LOCALE_ID) private locale: string,
    private dialog: MatDialog
  ) {
    this.eventService.getAll<Call>('calls').subscribe((events) => {
      this.calls = events.slice(0, events.length + 1);
    });
    this.eventService.getAll<Meeting>('meetings').subscribe((events) => {
      this.meetings = events.slice(0, events.length + 1);
    });
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
      data: {  }
    });

    dialogRef.afterClosed().subscribe((result) => {
      console.log('The dialog was closed', result);
      this.newCall = result;
    });
  }
}
