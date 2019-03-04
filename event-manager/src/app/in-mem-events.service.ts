import { InMemoryDbService } from 'angular-in-memory-web-api';
import * as faker from 'faker';

import { Call, Meeting, Participant, PSEvent } from './events/event';

function buildEvent(): PSEvent {
  return {
    created_date: faker.date.past(0.5).toISOString(),
    event_date: faker.date.future(0.5).toString(),
    name: faker.company.bsBuzz()
  };
}

function buildCall(): Call {
  const event: PSEvent = buildEvent();
  const participant1: Participant = {email: faker.helpers.userCard().email.toLowerCase()};
  const participant2: Participant = {email: faker.helpers.userCard().email.toLowerCase()};

  return {
    ...event,
    participants: [participant1, participant2]
  };
}


function buildMeeting(): Meeting {
  const event: PSEvent = buildEvent();
  const participant1: Participant = {email: faker.helpers.userCard().email.toLowerCase()};
  const participant2: Participant = {email: faker.helpers.userCard().email.toLowerCase()};
  const participant3: Participant = {email: faker.helpers.userCard().email.toLowerCase()};

  return {
    ...event,
    participants: [participant1, participant2, participant3],
    address: faker.helpers.createCard().address.geo
  };
}

function buildEntities<T>(builder) {
  const calls: T[] = [];

  for (let i = 0; i < 5; i++) {
    calls.push(builder());
  }

  return calls;
}

export class InMemEventsService implements InMemoryDbService {
  createDb() {
    const calls: Call[] = buildEntities<Call>(buildCall);
    const meetings: Meeting[] = buildEntities<Meeting>(buildMeeting);

    return {calls, meetings};
  }
}
