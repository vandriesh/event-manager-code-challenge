import { formatDate } from '@angular/common';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';
import { Call, Meeting, PSEvent } from '../../events/event';


export function sortDescending({ event_date: a }: PSEvent, { event_date: b }: PSEvent) {
  const aDate = a.getTime();
  const bDate = b.getTime();

  // const aDate = new Date(a).getTime();
  // const bDate = new Date(b).getTime();
  //
  return aDate - bDate;
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  constructor(@Inject(LOCALE_ID) private locale: string) {}

  buildEventStore(events: (Call | Meeting)[]) {
    return this.buildStore<Call | Meeting>(events.sort(sortDescending), (e: Call) =>
      formatDate(e.event_date, 'yyyy-MM-dd', this.locale)
    );
  }

  private buildStore<T>(events: T[], getKey: (e: T) => string) {
    const store = {
      nextId: events.length,
      indexes: [],
      entities: {}
    };

    events.forEach((event: T) => {
      const key = getKey(event);

      if (!store.entities[key]) {
        store.indexes.push(key);
        store.entities[key] = [];
      }

      store.entities[key].push(event);
    });

    return store;
  }
}
