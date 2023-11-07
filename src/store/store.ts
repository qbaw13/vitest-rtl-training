export interface Store {
  activeUserId?: number;
}

export const store: Store = {};

export function useSelector<T>(selector: (store: Store) => T): T {
  return selector(store);
}
