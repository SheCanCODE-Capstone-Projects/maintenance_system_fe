import type { ReactNode } from "react";
export default function Modal({ open, children }: { open: boolean; children: ReactNode }) { return open ? <div className="fixed inset-0 grid place-items-center bg-black/40 p-4"><div className="rounded-lg bg-white p-6">{children}</div></div> : null; }
