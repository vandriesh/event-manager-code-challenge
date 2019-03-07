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
  styleUrls: ['./pick-location-dialog.component.scss'],
  templateUrl: './pick-location-dialog.component.html'
})
export class PickLocationDialogComponent implements OnInit {
  marker: Marker;
  changed = false;

  constructor(
    public dialogRef: MatDialogRef<PickLocationDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: PSGeo
  ) {
    const { lat, lng } = data;

    this.marker = {
      draggable: true,
      lat: lat,
      lng: lng
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
    this.changed = true;
  }
}
