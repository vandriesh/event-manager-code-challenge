export interface LocalStore<T> {
  indexes: string[];
  entities: {
    [key: string]: T[];
  };
}
