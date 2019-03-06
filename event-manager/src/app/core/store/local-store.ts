export interface LocalState<T> {
  nextId: number;
  indexes: string[];
  entities: {
    [key: string]: T;
  };
}
