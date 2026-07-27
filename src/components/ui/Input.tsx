import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export default function Input({ label, error, className = "", ...props }: InputProps) {
  return (
    <label className="block">
      {label && (
        <span className="mb-1 block text-sm font-medium text-text">{label}</span>
      )}
      <input
        className={`w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm text-text placeholder-muted shadow-sm transition focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary ${
          error ? "border-error focus:border-error focus:ring-error" : ""
        } ${className}`}
        {...props}
      />
      {error && <p className="mt-1 text-xs text-error">{error}</p>}
    </label>
  );
}
