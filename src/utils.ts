import { InvariantError } from '@/errors/invariant';
import currency from 'currency.js';

export function isNil(value: unknown) {
  return value === undefined || value === null;
}

export function sleep(ms: number) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

export function basename(path: string) {
  const splitted = path.split('/');
  return splitted[splitted.length - 1];
}

export function extname(path: string) {
  const splitted = path.split('.');
  return splitted[splitted.length - 1];
}

export function toCurrency(money: number | string) {
  const raw = String(money).replace(/\D/g, '');
  return currency(raw, { decimal: ',', separator: '.', symbol: '', fromCents: true }).format();
}

export function toCents(money: string) {
  return currency(money, { decimal: ',', separator: '.', symbol: '', fromCents: false }).intValue;
}

export function assure(condition: unknown): asserts condition {
  if (!condition) throw new InvariantError();
}

export type ListOf<T> = T[];

export type FindMany<T> = {
  items: T;
  hasMore: boolean;
};

export type Nullable<T> = T | null;
