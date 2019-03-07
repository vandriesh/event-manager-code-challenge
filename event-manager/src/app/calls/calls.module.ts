import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { AmmModule } from '../core/amm/amm.module';
import { CreateNewCallDialogComponent } from './create-new-call-dialog/create-new-call-dialog.component';

@NgModule({
  declarations: [CreateNewCallDialogComponent],
  exports: [CreateNewCallDialogComponent],
  entryComponents: [CreateNewCallDialogComponent],
  imports: [AmmModule, ReactiveFormsModule]
})
export class CallsModule {}
