import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { VerticalTimelineModule } from 'angular-vertical-timeline';
import { CallsModule } from '../calls/calls.module';
import { AmmModule } from '../core/amm/amm.module';
import { MeetingsModule } from '../meetings/meetings.module';
import { EventListComponent } from './event-list/event-list.component';

@NgModule({
  declarations: [EventListComponent],
  imports: [CommonModule, CallsModule, MeetingsModule, AmmModule, VerticalTimelineModule]
})
export class EventsModule {}
