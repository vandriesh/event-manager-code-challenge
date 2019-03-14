import { AgmCoreModule } from '@agm/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AmmModule } from '../../core/amm/amm.module';

import { PickLocationDialogComponent } from './pick-location-dialog.component';

xdescribe('PickLocationDialogComponent', () => {
  let component: PickLocationDialogComponent;
  let fixture: ComponentFixture<PickLocationDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        AmmModule,
        AgmCoreModule.forRoot({
          // please get your own API key here:
          // https://developers.google.com/maps/documentation/javascript/get-api-key?hl=en
          apiKey: 'AIzaSyCSIFuXPQXel1splGkx5ElXoU1bL60Jn-I'
        })
      ],
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
