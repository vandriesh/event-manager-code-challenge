import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';
import { EventsModule } from './events/events.module';
import { InMemEventsService } from './in-mem-events.service';
import { PSLayoutModule } from './ps-layout/layout.module';

@NgModule({
  'bootstrap': [AppComponent],
  'declarations': [
    AppComponent
  ],
  'imports': [
    BrowserModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(InMemEventsService),
    EventsModule,
    PSLayoutModule,
    BrowserAnimationsModule
  ],
  'providers': []
})
export class AppModule { }
