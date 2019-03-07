import { MouseEvent } from '@agm/core';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { PSGeo } from '../../events/event';

// just an interface for type safety.
interface Marker {
  lat: number;
  lng: number;
  label?: string;
  draggable: boolean;
}

@Component({
  selector: 'app-pick-location-dialog',
  templateUrl: './pick-location-dialog.component.html',
  styleUrls: ['./pick-location-dialog.component.scss']
})
export class PickLocationDialogComponent implements OnInit {
  marker: Marker;

  constructor(
    public dialogRef: MatDialogRef<PickLocationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PSGeo
  ) {
    const { lat = 47.005, lng = 28.8577 } = data;

    this.marker = {
      lat: lat,
      lng: lng,
      draggable: true
    };
  }

  ngOnInit() {}

  close() {
    this.dialogRef.close(null);
  }

  save() {
    this.dialogRef.close({
      lat: this.marker.lat,
      lng: this.marker.lng
    });
  }

  updateLocation($event: MouseEvent) {
    this.marker.lat = $event.coords.lat;
    this.marker.lng = $event.coords.lng;
  }
}
