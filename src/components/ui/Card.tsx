import { ReactNode } from "react";

interface CardProps {
  title?: string;
  children: ReactNode;
  className?: string;
}

export default function Card({ title, children, className = "" }: CardProps) {
  return (
    <div
      className={`rounded-xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md ${className}`}
    >
      {title && (
        <div className="border-b border-gray-100 px-5 py-4">
          <h2 className="text-base font-semibold text-text">{title}</h2>
        </div>
      )}
      <div className="p-5">{children}</div>
    </div>
  );
}
