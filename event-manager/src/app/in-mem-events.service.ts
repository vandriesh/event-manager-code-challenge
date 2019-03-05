import { InMemoryDbService } from 'angular-in-memory-web-api';
import * as faker from 'faker';

import { Call, Meeting, Participant, PSEvent } from './events/event';

function buildEvent(id: number): PSEvent {
  const event_date = faker.date.future(0.01);
  const startDate = new Date(event_date);
  const endDate = new Date(event_date);

  startDate.setHours(8);
  startDate.setMinutes(0);
  endDate.setHours(18);
  endDate.setMinutes(0);

  return {
    id,
    created_date: faker.date.past(0.5).toISOString(),
    event_date: faker.date.between(startDate, endDate).toISOString(),
    name: faker.company.bsBuzz()
  };
}

function buildCall(id): Call {
  const event: PSEvent = buildEvent(id);
  const participant1: Participant = { email: faker.helpers.userCard().email.toLowerCase() };
  const participant2: Participant = { email: faker.helpers.userCard().email.toLowerCase() };

  return {
    ...event,
    participants: [participant1, participant2]
  };
}

function buildMeeting(id): Meeting {
  const event: PSEvent = buildEvent(id);
  const participant1: Participant = { email: faker.helpers.userCard().email.toLowerCase() };
  const participant2: Participant = { email: faker.helpers.userCard().email.toLowerCase() };
  const participant3: Participant = { email: faker.helpers.userCard().email.toLowerCase() };

  return {
    ...event,
    participants: [participant1, participant2, participant3],
    address: faker.helpers.createCard().address.geo
  };
}

function buildEntities<T>(builder) {
  const calls: T[] = [];

  for (let i = 0; i < 5; i++) {
    calls.push(builder(i));
  }

  return calls;
}

function sortDescending({ event_date: a }: PSEvent, { event_date: b }: PSEvent) {
  const aDate = new Date(a).getTime();
  const bDate = new Date(b).getTime();

  return aDate - bDate;
}

export class InMemEventsService implements InMemoryDbService {
  createDb() {
    const calls: Call[] = buildEntities<Call>(buildCall).sort(sortDescending);
    const meetings: Meeting[] = buildEntities<Meeting>(buildMeeting).sort(sortDescending);

    return { calls, meetings };
  }
}
