import { User, Wrench, Building, ShieldCheck } from "lucide-react";

export type Role = "customer" | "technician" | "company" | "admin";

const roles: { id: Role; label: string; icon: React.ElementType; desc: string }[] = [
  { id: "customer", label: "Customer", icon: User, desc: "Request services" },
  { id: "technician", label: "Technician", icon: Wrench, desc: "Manage your jobs" },
  { id: "company", label: "Company", icon: Building, desc: "Manage your team" },
  { id: "admin", label: "Admin", icon: ShieldCheck, desc: "System control" },
];

interface RoleSelectorProps {
  selected: Role;
  onChange: (role: Role) => void;
}

export default function RoleSelector({ selected, onChange }: RoleSelectorProps) {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3" role="radiogroup" aria-label="Select your role">
      {roles.map(({ id, label, icon: Icon, desc }) => {
        const isSelected = selected === id;
        return (
          <button
            key={id}
            type="button"
            role="radio"
            aria-checked={isSelected}
            onClick={() => onChange(id)}
            className={`
              flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 text-center transition-all duration-200 cursor-pointer
              focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6224] focus-visible:ring-offset-2
              ${isSelected
                ? "border-[#FF6224] bg-orange-50 shadow-sm"
                : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
              }
            `}
          >
            <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${isSelected ? "bg-[#FF6224]" : "bg-gray-100"}`}>
              <Icon className={`w-4 h-4 ${isSelected ? "text-white" : "text-gray-500"}`} />
            </div>
            <span className={`text-xs font-semibold ${isSelected ? "text-[#FF6224]" : "text-gray-700"}`}>{label}</span>
            <span className="text-[10px] text-gray-400 leading-tight">{desc}</span>
          </button>
        );
      })}
    </div>
  );
}
