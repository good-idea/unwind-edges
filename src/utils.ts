import { Maybe } from './types'

export function definitely<T>(items?: Maybe<T>[] | null): T[] {
  if (!items) return []
  return items.reduce<T[]>((acc, item) => (item ? [...acc, item] : acc), [])
}
