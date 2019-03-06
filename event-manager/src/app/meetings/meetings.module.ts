import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { AmmModule } from '../core/amm/amm.module';

import { PickLocationDialogComponent } from './pick-location-dialog/pick-location-dialog.component';

@NgModule({
  declarations: [PickLocationDialogComponent],
  exports: [PickLocationDialogComponent],
  imports: [CommonModule, AmmModule,
    AgmCoreModule.forRoot({
      // please get your own API key here:
      // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
      apiKey: 'AIzaSyCSIFuXPQXel1splGkx5ElXoU1bL60Jn-I'
    })
  ],
  entryComponents: [PickLocationDialogComponent]
})
export class MeetingsModule {}
