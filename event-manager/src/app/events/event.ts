export interface PSEvent {
  id: number;
  created_date: string;
  event_date: string;
  name: string;
}

export interface Participant {
  email: string;
}

export interface Call extends PSEvent {
  participants: [Participant, Participant];
}

interface Geo {
  lat: string;
  lng: string;
}

export interface Meeting extends PSEvent {
  participants: [Participant, Participant, Participant];
  address: Geo;
}
