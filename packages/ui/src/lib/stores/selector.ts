import type { Store, StoreActionMap } from "@tanstack/store";

export const subscribeSelector = <S, T, A extends StoreActionMap = never>(
  store: Store<T, A>,
  selector: (state: T) => S,
  listener: (slice: S, previousSlice: S) => void,
  isEqual: (a: S, b: S) => boolean = Object.is
) => {
  let prev = selector(store.state);

  return store.subscribe((state) => {
    const next = selector(state);
    if (isEqual(prev, next)) return;
    const current = prev;
    prev = next;
    listener(next, current);
  });
};
