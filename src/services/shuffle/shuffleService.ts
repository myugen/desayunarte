export interface ShuffleService<T> {
  shuffle(collection: T[]): Map<number, T[]>;
}
