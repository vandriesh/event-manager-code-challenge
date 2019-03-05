import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatCardModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatIconModule,
  MatInputModule,
  MatNativeDateModule,
  MatRadioModule,
  MatSelectModule
} from '@angular/material';

const ammModules = [
  MatInputModule,
  MatButtonModule,
  MatDatepickerModule,
  MatDialogModule,
  MatNativeDateModule,
  MatSelectModule,
  MatDividerModule,
  MatRadioModule,
  MatCardModule,
  MatIconModule
];

@NgModule({
  declarations: [],
  imports: [CommonModule, ...ammModules],
  exports: [...ammModules],
  providers: [MatDatepickerModule]
})
export class AmmModule {}
