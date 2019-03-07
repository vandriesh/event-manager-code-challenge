import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, NgModule } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material';

import { AmmModule } from '../../core/amm/amm.module';
import { Call } from '../event';

import { EventEditDialogComponent } from './event-edit-dialog.component';

function changeInput(input: HTMLInputElement, newValue) {
  input.value = newValue;
  input.dispatchEvent(new Event('input'));
}

// Noop component is only a workaround to trigger change detection
@Component({
  template: ''
})
class NoopComponent {}

const TEST_DIRECTIVES = [EventEditDialogComponent, NoopComponent];

@NgModule({
  declarations: [...TEST_DIRECTIVES],
  entryComponents: [EventEditDialogComponent],
  exports: [...TEST_DIRECTIVES],
  imports: [AmmModule, ReactiveFormsModule]
})
class DialogTestModule {}

describe('EventEditDialogComponent', () => {
  let dialog: MatDialog;
  let overlayContainerElement: HTMLElement;
  let mockEvent: Call;
  let mockCreateCallEvent: Call;
  let noop: ComponentFixture<NoopComponent>;
  const created_date = new Date('February 02, 2019 01:02:03');
  const event_date = new Date('February 02, 2019 01:02:03');

  beforeEach(() => {
    const email = '';
    mockCreateCallEvent = <Call>{
      participants: [{ email }, { email }],
      type: 'call'
    };
    mockEvent = <Call>{
      created_date,
      event_date,
      name: 'qwe',
      participants: [
        {
          email: 'qwe1@qwe.com'
        },
        {
          email: 'qwe2@qwe.com'
        }
      ],
      type: 'call'
    };

    TestBed.configureTestingModule({
      imports: [DialogTestModule],
      providers: [
        {
          provide: OverlayContainer,
          useFactory: () => {
            overlayContainerElement = document.createElement('div');
            overlayContainerElement.setAttribute('id', 'zzz');
            return { getContainerElement: () => overlayContainerElement };
          }
        }
      ]
    });

    dialog = TestBed.get(MatDialog);

    noop = TestBed.createComponent(NoopComponent);
  });

  it('should have create title and create (disabled) button when creating event', () => {
    dialog.open(EventEditDialogComponent, {
      data: {
        creating: true,
        event: mockCreateCallEvent
      }
    });

    noop.detectChanges(); // Updates the dialog in the overlay

    const dialogTitle = overlayContainerElement.querySelector('h2');
    expect(dialogTitle.textContent).toEqual(`Create ${mockEvent.type} event`);

    const primaryButton: HTMLButtonElement = overlayContainerElement.querySelector(
      '.mat-dialog-actions .mat-primary'
    );

    expect(primaryButton.textContent).toEqual('Create');
    expect(primaryButton.disabled).toBeTruthy();
  });

  describe('dialog interaction', () => {
    let dialogTitle: HTMLHeadElement;
    let nameField: HTMLInputElement;
    let dateField: HTMLInputElement;
    let dialogRef: MatDialogRef<EventEditDialogComponent>;
    let hoursField: HTMLInputElement;
    let minutesField: HTMLInputElement;
    let participant1Field: HTMLInputElement;
    let participant2Field: HTMLInputElement;
    let primaryButton: HTMLButtonElement;

    beforeEach(() => {
      dialogRef = dialog.open(EventEditDialogComponent, {
        data: {
          event: mockEvent
        }
      });

      noop.detectChanges(); // Updates the dialog in the overlay

      dialogTitle = overlayContainerElement.querySelector('h2');
      nameField = <HTMLInputElement>overlayContainerElement.querySelector('.field-name input');

      dateField = <HTMLInputElement>overlayContainerElement.querySelector('.field-date input');

      hoursField = <HTMLInputElement>overlayContainerElement.querySelector('.field-hours input');
      minutesField = <HTMLInputElement>(
        overlayContainerElement.querySelector('.field-minutes input')
      );
      participant1Field = <HTMLInputElement>(
        overlayContainerElement.querySelector('.field-participant-0 input')
      );
      participant2Field = <HTMLInputElement>(
        overlayContainerElement.querySelector('.field-participant-1 input')
      );
      primaryButton = overlayContainerElement.querySelector('.mat-dialog-actions .mat-primary');
    });

    it('should have edit title and save (enabled) button when editing event', () => {
      expect(nameField.value).toEqual(mockEvent.name);
      expect(dateField.value).toEqual('2/2/2019');
      expect(hoursField.value).toEqual('01');
      expect(minutesField.value).toEqual('02');
      expect(participant1Field.value).toEqual(mockEvent.participants[0].email);
      expect(participant2Field.value).toEqual(mockEvent.participants[1].email);

      expect(dialogTitle.textContent).toEqual(`Edit ${mockEvent.type} event`);

      expect(primaryButton.textContent).toEqual('Save');
      expect(primaryButton.disabled).toBeFalsy();
    });

    it('should return new values to the invoker', (done) => {
      const name = 'newName';
      const year = 2020;
      const month = 10;
      const day = 20;
      const hours = 13;
      const minutes = 31;
      changeInput(nameField, name);
      changeInput(dateField, new Date(`${month}/${day}/${year}`));
      changeInput(hoursField, 13);
      changeInput(minutesField, 31);
      changeInput(participant1Field, 'johny1@gmail');
      changeInput(participant2Field, 'johny2@hotmail');
      noop.detectChanges();

      dialogRef.afterClosed().subscribe((formVal) => {
        expect(formVal).toEqual({
          event_date: new Date(`${month}/${day}/${year}`),
          hours,
          minutes,
          name,
          participants: [
            {
              email: 'johny1@gmail'
            },
            {
              email: 'johny2@hotmail'
            }
          ]
        });

        done();
      });

      primaryButton.click();
    });
  });

  it('should close the dialog when cancel', (done) => {
    const dialogRef = dialog.open(EventEditDialogComponent, {
      data: {
        event: mockEvent
      }
    });

    noop.detectChanges(); // Updates the dialog in the overlay

    const primaryButton = overlayContainerElement.querySelectorAll(
      '.mat-dialog-actions button'
    ) as NodeListOf<HTMLButtonElement>;

    dialogRef.afterClosed().subscribe((formVal) => {
      expect(formVal).toBeUndefined();

      done();
    });

    primaryButton.item(0).click();
  });
});
