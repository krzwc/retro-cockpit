import { Map } from 'immutable';

export interface ImmutableMap<T> extends Omit<Map<string, any>, 'get' | 'set'> {
  get<K extends keyof T>(name: K, notSetValue?: T[K]): T[K];
  set<K extends keyof T>(key: K, value: T[K]): ImmutableMap<T>;
}