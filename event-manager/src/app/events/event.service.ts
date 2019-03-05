import { formatDate } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { Call, Meeting, Participant, PSEvent } from './event';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(private http: HttpClient, @Inject(LOCALE_ID) private locale: string) {}

  getAll<T>(slag: string): Observable<T[]> {
    return this.http.get<T[]>(`/api/${slag}`);
  }

  add<T>(slag: string, entity: T): Observable<T> {
    return this.http.post<T>(`/api/${slag}`, entity).pipe(catchError(this.handleError));
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }

  formatEmailLink(call: Call|Meeting) {
    const mailto = this.getParticipants(call.participants).join(',');
    const date = formatDate(call.event_date, 'yyyy-mm-dd hh:mm', this.locale);
    const bodyMessage = `You are invited to a meeting at ${date}`;

    return `mailto:${mailto}?subject=${call.name}&body=${bodyMessage}`;
  }

  getParticipants(participants: any[]) {
    return participants.map((participant: Participant) => participant.email);
  }
}
