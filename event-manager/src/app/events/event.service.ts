import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  constructor(private http: HttpClient) {
  }

  getAll<T>(slag: string): Observable<T[]> {
    return this.http.get<T[]>(`/api/${slag}`);
  }

}
