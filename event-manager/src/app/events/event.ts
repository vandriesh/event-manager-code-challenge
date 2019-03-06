export interface PSEvent {
  type: string;
  id: number;
  created_date: Date;
  event_date: Date;
  participants?: Participant[];
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
