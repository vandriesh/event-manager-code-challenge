import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateNewCallDialogComponent } from './create-new-call-dialog.component';

describe('CreateNewCallDialogComponent', () => {
  let component: CreateNewCallDialogComponent;
  let fixture: ComponentFixture<CreateNewCallDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateNewCallDialogComponent ]
    })
    .compileComponents();
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
