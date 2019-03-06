import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

import { Call, Meeting } from '../../events/event';

const notEmptyAndValid = (control: AbstractControl) => control.value !== '' && control.valid;

interface EventDialogData {
  creating: boolean;
  event: null | Call | Meeting;
}

@Component({
  selector: 'app-create-new-call-dialog',
  templateUrl: './create-new-call-dialog.component.html',
  styleUrls: ['./create-new-call-dialog.component.scss']
})
export class CreateNewCallDialogComponent {
  callForm: FormGroup;
  creating = false;
  type: string;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateNewCallDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: EventDialogData
  ) {
    const { creating, event } = data;

    this.creating = creating;
    const { name, event_date, participants, type } = event;

    this.type = type;
    let hours = null;
    let minutes = null;
    let eventDate = new Date();

    if (event_date) {
      eventDate = event_date;
    }

    if (hours < 10) {
      hours = '0' + hours;
    }

    if (minutes < 10) {
      minutes = '0' + minutes;
    }

    this.callForm = this.fb.group({
      name: [name, Validators.required],
      event_date: [eventDate, Validators.required],
      hours: [hours, [Validators.required, Validators.min(0), Validators.max(23)]],
      minutes: [minutes, [Validators.required, Validators.min(0), Validators.max(59)]],
      participants: this.fb.array(participants.map(({ email }) => this.createParticipant(email)))
    });
  }

  save() {
    this.dialogRef.close(this.callForm.value);
  }

  close() {
    this.dialogRef.close();
  }

  validForm() {
    return (
      notEmptyAndValid(this.callForm.controls['name']) &&
      notEmptyAndValid(this.callForm.controls['event_date']) &&
      notEmptyAndValid(this.callForm.controls['hours']) &&
      notEmptyAndValid(this.callForm.controls['minutes']) &&
      notEmptyAndValid(this.callForm.controls['participants'])
    );
  }

  hasMinOrMaxError(fieldName: string) {
    const control = this.callForm.controls[fieldName];

    return control.hasError('min') || control.hasError('max');
  }

  private createParticipant(email) {
    return this.fb.group({
      email: [email, [Validators.required, Validators.email]]
    });
  }
}
