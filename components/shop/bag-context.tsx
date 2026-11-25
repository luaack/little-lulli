"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";

type BagUi = { open: boolean; openBag: () => void; closeBag: () => void };
const BagContext = createContext<BagUi>({ open: false, openBag: () => {}, closeBag: () => {} });

export const useBag = () => useContext(BagContext);

export function BagProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const openBag = useCallback(() => setOpen(true), []);
  const closeBag = useCallback(() => setOpen(false), []);
  const value = useMemo(() => ({ open, openBag, closeBag }), [open, openBag, closeBag]);
  return <BagContext.Provider value={value}>{children}</BagContext.Provider>;
}
