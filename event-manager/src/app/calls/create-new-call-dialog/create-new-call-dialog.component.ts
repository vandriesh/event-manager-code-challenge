import { Component, Inject } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

const notEmptyAndValid = (control: AbstractControl) => control.value !== '' && control.valid;

@Component({
  selector: 'app-create-new-call-dialog',
  templateUrl: './create-new-call-dialog.component.html',
  styleUrls: ['./create-new-call-dialog.component.scss']
})
export class CreateNewCallDialogComponent {
  callForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    public dialogRef: MatDialogRef<CreateNewCallDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.callForm = this.fb.group({
      name: [null, Validators.required],
      event_date: [{disabled: true, value: new Date()}, Validators.required],
      hours: [null, [Validators.required, Validators.min(0), Validators.max(23)]],
      minutes: [null, [Validators.required, Validators.min(0), Validators.max(59)]],
      participant1: [null, [Validators.required, Validators.email]],
      participant2: [null, [Validators.required, Validators.email]]
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
      notEmptyAndValid(this.callForm.controls['event_time']) &&
      notEmptyAndValid(this.callForm.controls['participant1']) &&
      notEmptyAndValid(this.callForm.controls['participant2'])
    );
  }

  hasMinOrMaxError(fieldName: string) {
    const control = this.callForm.controls[fieldName];

    return control.hasError('min') || control.hasError('max');
  }
}
