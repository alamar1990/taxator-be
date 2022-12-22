interface CRUDInterface<T> {
  all(): Promise<T[] | null>
  list(): Promise<T[] | null>
  view(): Promise<T | null>
  create(): Promise<T | null>
  update(): Promise<T | null>
  remove(): Promise<T | null>
}
