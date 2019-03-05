import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { AmmModule } from '../core/amm/amm.module';
import { MeetingEventComponent } from './meeting-event/meeting-event.component';

@NgModule({
  declarations: [MeetingEventComponent],
  exports: [
    MeetingEventComponent
  ],
  imports: [
    CommonModule,
    AmmModule
  ]
})
export class MeetingsModule { }
