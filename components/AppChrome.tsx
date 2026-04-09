"use client";

import type { ReactNode } from "react";

/** Marketing-only site: no left rail; inner pages use `MarketingLayout`. */
export function AppChrome({ children }: { children: ReactNode }) {
  return <>{children}</>;
}
