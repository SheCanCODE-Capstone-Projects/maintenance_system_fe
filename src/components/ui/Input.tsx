import type { InputHTMLAttributes } from "react";
export default function Input({ label, ...props }: InputHTMLAttributes<HTMLInputElement> & { label?: string }) { return <label className="block text-sm font-medium">{label && <span className="mb-1 block">{label}</span>}<input className="w-full rounded border px-3 py-2" {...props} /></label>; }
