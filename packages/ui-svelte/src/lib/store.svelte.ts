import type { Atom, ReadonlyAtom, ReadonlyStore, Store, StoreActionMap } from "@tanstack/store";

export type UseSelectorOptions<TSelected> = {
  compare?: (a: TSelected, b: TSelected) => boolean;
};

function defaultCompare<T>(a: T, b: T) {
  return a === b;
}

export function useSelector<TState, TSelected = NoInfer<TState>, TActions extends StoreActionMap = never>(
  source: Atom<TState> | ReadonlyAtom<TState> | Store<TState, TActions> | ReadonlyStore<TState>,
  selector: (state: NoInfer<TState>) => TSelected = (d) => d as unknown as TSelected,
  options: UseSelectorOptions<TSelected> = {}
): { readonly current: TSelected } {
  const compare = options.compare ?? defaultCompare;
  let slice = $state.raw(selector(source.get()));

  $effect(() => {
    const unsub = source.subscribe((s) => {
      const data = selector(s);
      if (compare(slice, data)) {
        return;
      }
      slice = data;
    }).unsubscribe;

    return unsub;
  });

  return {
    get current() {
      return slice;
    },
  };
}
