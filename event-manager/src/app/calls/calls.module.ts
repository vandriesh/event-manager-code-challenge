import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { AmmModule } from '../core/amm/amm.module';
import { CallFormComponent } from './call-form/call-form.component';
import { CreateNewCallDialogComponent } from './create-new-call-dialog/create-new-call-dialog.component';

@NgModule({
  declarations: [CreateNewCallDialogComponent, CallFormComponent],
  exports: [CreateNewCallDialogComponent, CallFormComponent],
  entryComponents: [CreateNewCallDialogComponent],
  imports: [CommonModule, AmmModule, ReactiveFormsModule]
})
export class CallsModule {}
