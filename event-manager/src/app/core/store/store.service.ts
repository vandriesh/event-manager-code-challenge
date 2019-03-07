import { formatDate } from '@angular/common';
import { Inject, Injectable, LOCALE_ID } from '@angular/core';

import { PSEvent } from '../../events/event';

import { LocalStore } from './local-store';

export const sortDescending = ({ event_date: a }: PSEvent, { event_date: b }: PSEvent) =>
  a.getTime() - b.getTime();

@Injectable({
  providedIn: 'root'
})
export class StoreService<T extends PSEvent> {
  constructor(@Inject(LOCALE_ID) private locale: string) {}

  buildEventStore(events: T[]) {
    return this.buildStore(events.sort(sortDescending), (e: T) =>
      formatDate(e.event_date, 'yyyy-MM-dd', this.locale)
    );
  }

  buildStore(events: T[], getKey: (e: T) => string) {
    const store: LocalStore<T> = {
      entities: {},
      indexes: []
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
