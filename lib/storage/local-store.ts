"use client";

import { useSyncExternalStore } from "react";

/**
 * Pequena "store" sobre localStorage, compatível com useSyncExternalStore:
 * renderiza o valor inicial no servidor (sem erro de hidratação) e atualiza
 * quando o dado muda nesta aba ou em outra.
 */
export function createLocalStore<T>(key: string, initial: T) {
  const listeners = new Set<() => void>();
  let cachedRaw: string | null | undefined;
  let cachedValue: T = initial;

  const read = (): T => {
    let raw: string | null = null;
    try {
      raw = window.localStorage.getItem(key);
    } catch {}
    if (raw === cachedRaw) return cachedValue;
    cachedRaw = raw;
    try {
      cachedValue = raw ? (JSON.parse(raw) as T) : initial;
    } catch {
      cachedValue = initial;
    }
    return cachedValue;
  };

  const notify = () => listeners.forEach((l) => l());

  const subscribe = (listener: () => void) => {
    listeners.add(listener);
    const onStorage = (e: StorageEvent) => {
      if (e.key === key || e.key === null) notify();
    };
    window.addEventListener("storage", onStorage);
    return () => {
      listeners.delete(listener);
      window.removeEventListener("storage", onStorage);
    };
  };

  return {
    get: read,
    set(value: T) {
      try {
        window.localStorage.setItem(key, JSON.stringify(value));
      } catch {}
      notify();
    },
    update(fn: (current: T) => T) {
      this.set(fn(read()));
    },
    use: () =>
      useSyncExternalStore(
        subscribe,
        read,
        () => initial,
      ),
  };
}
