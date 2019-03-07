import { OverlayContainer } from '@angular/cdk/overlay';
import { Component, NgModule } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { AmmModule } from '../../core/amm/amm.module';

import { CreateNewCallDialogComponent } from './create-new-call-dialog.component';

xdescribe('CreateNewCallDialogComponent', () => {
  let component: CreateNewCallDialogComponent;
  let fixture: ComponentFixture<CreateNewCallDialogComponent>;
  let noop: ComponentFixture<NoopComponent>;
  let overlayContainerElement: HTMLElement;
  let dialog: MatDialog;

  beforeEach(async(() => {
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
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateNewCallDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});



// Noop component is only a workaround to trigger change detection
@Component({
  template: ''
})
class NoopComponent {}

const TEST_DIRECTIVES = [CreateNewCallDialogComponent, NoopComponent];

@NgModule({
  imports: [AmmModule, ReactiveFormsModule],
  exports: TEST_DIRECTIVES,
  declarations: TEST_DIRECTIVES,
  entryComponents: [CreateNewCallDialogComponent]
})
class DialogTestModule {}
