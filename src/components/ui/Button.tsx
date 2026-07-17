import type { ButtonHTMLAttributes } from "react";
export default function Button({ className = "", ...props }: ButtonHTMLAttributes<HTMLButtonElement>) { return <button className={`rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 ${className}`} {...props} />; }
