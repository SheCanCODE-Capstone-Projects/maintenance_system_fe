import { ReactNode } from "react";

interface CardProps {
  title?: string;
  children: ReactNode;
}

export default function Card({ title, children }: CardProps) {
  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition">
      {title && <h2 className="text-lg font-semibold text-primary mb-2">{title}</h2>}
      {children}
    </div>
  );
}
