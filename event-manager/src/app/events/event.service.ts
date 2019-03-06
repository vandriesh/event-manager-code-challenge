import { formatDate } from '@angular/common';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Participant, PSEvent } from './event';

@Injectable({
  providedIn: 'root'
})
export class EventService<T extends PSEvent> {
  constructor(private http: HttpClient, @Inject(LOCALE_ID) private locale: string) {}

  getAll(): Observable<T[]> {
    return this.http.get<T[]>('/api/events');
  }

  add(entity: T): Observable<T> {
    return this.http.post<T>(`/api/${entity.type}s`, entity).pipe(catchError(this.handleError));
  }

  save(entity: T): Observable<T> {
    return this.http
      .put<T>(`/api/${entity.type}s/${entity.id}`, entity)
      .pipe(catchError(this.handleError));
  }

  formatEmailLink(call: PSEvent) {
    const mailto = this.getParticipantWEmails(call.participants).join(',');
    const date = formatDate(call.event_date, 'yyyy-mm-dd hh:mm', this.locale);
    const bodyMessage = `You are invited to a meeting at ${date}`;

    return `mailto:${mailto}?subject=${call.name}&body=${bodyMessage}`;
  }

  remove({ type, id }: T) {
    return this.http.delete<T>(`/api/${type}s/${id}`).pipe(catchError(this.handleError));
  }

  combineDateWithTime(event_date: Date, time: { hours: number; minutes: number }): Date {
    const { hours, minutes } = time;

    event_date.setHours(hours);
    event_date.setMinutes(minutes);

    return event_date;
  }

  private getParticipantWEmails(participants: any[]) {
    return participants.map((participant: Participant) => participant.email);
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }
}
