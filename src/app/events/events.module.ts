import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { VerticalTimelineModule } from 'angular-vertical-timeline';
import { TimeAgoPipe } from 'time-ago-pipe';

import { AmmModule } from '../core/amm/amm.module';
import { MeetingsModule } from '../meetings/meetings.module';

import { EventEditDialogComponent } from './event-edit-dialog/event-edit-dialog.component';
import { EventListComponent } from './event-list/event-list.component';
import { EventViewComponent } from './event-view/event-view.component';

@NgModule({
  'declarations': [EventListComponent, TimeAgoPipe, EventViewComponent, EventEditDialogComponent],
  'entryComponents': [EventEditDialogComponent],
  'exports': [EventListComponent],
  'imports': [CommonModule, MeetingsModule, AmmModule, VerticalTimelineModule, ReactiveFormsModule]
})
export class EventsModule {}
