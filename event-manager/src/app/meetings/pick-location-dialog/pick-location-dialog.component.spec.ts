import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PickLocationDialogComponent } from './pick-location-dialog.component';

describe('PickLocationDialogComponent', () => {
  let component: PickLocationDialogComponent;
  let fixture: ComponentFixture<PickLocationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PickLocationDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PickLocationDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
