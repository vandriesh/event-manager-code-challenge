import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VerticalTimelineModule } from 'angular-vertical-timeline';
import { TimeAgoPipe } from 'time-ago-pipe';

import { CallsModule } from '../calls/calls.module';
import { AmmModule } from '../core/amm/amm.module';
import { MeetingsModule } from '../meetings/meetings.module';
import { EventListComponent } from './event-list/event-list.component';
import { EventViewComponent } from './event-view/event-view.component';

@NgModule({
  declarations: [EventListComponent, TimeAgoPipe, EventViewComponent],
  exports: [EventViewComponent],
  imports: [CommonModule, CallsModule, MeetingsModule, AmmModule, VerticalTimelineModule]
})
export class EventsModule {}
