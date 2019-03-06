export interface LocalState<T> {
  indexes: string[];
  entities: {
    [key: string]: T;
  };
}
