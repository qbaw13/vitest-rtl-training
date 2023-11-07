import { Store } from "../store";

export function selectActiveUserId(store: Store) {
  return store.activeUserId;
}
