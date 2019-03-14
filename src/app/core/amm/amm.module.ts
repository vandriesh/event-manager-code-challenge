import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatRadioModule,
  MatSelectModule,
  MatToolbarModule,
  MatTooltipModule
} from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const ammModules = [
  MatButtonModule,
  MatCardModule,
  MatChipsModule,
  MatToolbarModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatNativeDateModule,
  MatRadioModule,
  MatSelectModule,
  MatTooltipModule
];

@NgModule({
  declarations: [],
  exports: [BrowserAnimationsModule, ...ammModules],
  imports: [CommonModule, ...ammModules],
  providers: [MatDatepickerModule]
})
export class AmmModule {}
