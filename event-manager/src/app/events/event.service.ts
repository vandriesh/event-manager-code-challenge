import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { throwError as observableThrowError, Observable } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(private http: HttpClient) {
  }

  getAll<T>(slag: string): Observable<T[]> {
    return this.http.get<T[]>(`/api/${slag}`);
  }

  add<T>(slag: string, entity: T): Observable<T> {
    return this.http
      .post<T>(`/api/${slag}`, entity)
      .pipe(catchError(this.handleError));
  }

  private handleError(res: HttpErrorResponse | any) {
    console.error(res.error || res.body.error);
    return observableThrowError(res.error || 'Server error');
  }

}
