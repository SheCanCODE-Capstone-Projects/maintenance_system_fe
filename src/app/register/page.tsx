import Link from "next/link";
import BrandMark from "@/components/layout/BrandMark";

type IconName = "customer" | "technician" | "company";
type Tone = "customer" | "technician" | "company";

function Icon({ name }: { name: IconName }) {
  const common = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  if (name === "customer") {
    return (
      <svg {...common}>
        <circle cx="12" cy="7" r="3.2" />
        <path d="M5.5 20v-2.2a5.8 5.8 0 0 1 11.6 0V20" />
      </svg>
    );
  }

  if (name === "technician") {
    return (
      <svg {...common}>
        <path d="m14.7 6.4-5.9 5.9" />
        <path d="M18.3 2.8a5 5 0 0 0-6.5 6.5L3.6 17.5a2 2 0 1 0 2.9 2.9l8.2-8.2a5 5 0 0 0 6.5-6.5l-3.1 3.1-2.4-2.4z" />
      </svg>
    );
  }

  return (
    <svg {...common}>
      <path d="M4 21h16" />
      <path d="M6 21V5h9v16M9 8h2m-2 4h2m5-2h2m-2 4h2M3 21V11h3m9 10v-7h4v7" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <path d="m8.5 12 2.2 2.2 4.8-4.8" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" />
    </svg>
  );
}

const roles: {
  name: string;
  icon: IconName;
  description: string;
  benefits: string[];
  tag: string;
  href: string;
  tone: Tone;
}[] = [
  {
    name: "Customer",
    icon: "customer",
    description: "Create a customer account to request jobs, track progress, and review completed work.",
    benefits: ["Request maintenance in minutes", "Track status updates", "Rate technicians"],
    tag: "Fast start",
    href: "/register/customer",
    tone: "customer",
  },
  {
    name: "Independent Technician",
    icon: "technician",
    description: "Create a technician account to receive jobs, manage your schedule, and build trust.",
    benefits: ["Set your trade focus", "Complete verification", "Grow your job history"],
    tag: "Earn more",
    href: "/register/technician",
    tone: "technician",
  },
  {
    name: "Company",
    icon: "company",
    description: "Create a company account to manage your team, route jobs, and operate as a business.",
    benefits: ["Add staff members", "Open company profile", "Access analytics"],
    tag: "Team accounts",
    href: "/register/company",
    tone: "company",
  },
];

const tagStyles: Record<Tone, string> = {
  customer: "bg-[#ddf4e9] text-[#158366]",
  technician: "bg-[#fff0ec] text-[#fc5923]",
  company: "bg-[#eaf1ff] text-[#315cec]",
};

const checkStyles: Record<Tone, string> = {
  customer: "text-[#168b6b]",
  technician: "text-[#ff6127]",
  company: "text-[#315cec]",
};

export default function RegisterPage() {
  return (
    <main className="min-h-screen bg-[#f6f8f8] font-sans text-[#071b24]">
      <header className="flex h-[56px] items-center justify-between border-b border-[#edf0f0] bg-white px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-3 text-[13px] font-extrabold tracking-[.2px] text-[#0D3330]">
          <BrandMark size={28} />
          <span>
            Maintenance<span className="text-[#FF6224]">Hub</span>
          </span>
        </Link>
        <Link href="/login" className="rounded-full border border-[#e0e6e5] px-[14px] py-[8px] text-xs font-semibold text-[#294047]">
          Sign in by role
        </Link>
      </header>

      <section className="mx-auto mt-[56px] max-w-[920px] px-4 text-center sm:px-6 lg:px-8">
        <p className="text-[11px] font-semibold uppercase tracking-[.22em] text-[#7a8e8c]">
          Role-based signup
        </p>
        <h1 className="mb-3 mt-2 text-[30px] font-extrabold leading-[1.15] tracking-[-.8px] text-[#0D3330] sm:text-[34px]">
          Choose the account type that matches your role
        </h1>
        <p className="mx-auto mb-[34px] max-w-2xl text-[14px] leading-6 text-[#789098]">
          Each signup path asks only for the information needed for that role, so the flow stays clear, secure, and ready for backend verification.
        </p>

        <div className="grid grid-cols-1 gap-3 text-left md:grid-cols-3">
          {roles.map((role) => (
            <article
              key={role.name}
              className="flex min-h-[232px] flex-col rounded-[14px] border border-[#dce5e4] bg-white p-5 shadow-[0_3px_9px_#11223315]"
            >
              <div className="h-[26px] text-[#789695]">
                <Icon name={role.icon} />
              </div>
              <h2 className="mb-1 mt-3 text-[18px] font-extrabold leading-6 text-[#0D3330]">{role.name}</h2>
              <p className="m-0 text-xs leading-[19px] text-[#749099]">{role.description}</p>
              <ul className="m-0 mt-[12px] list-none space-y-0 p-0 text-xs leading-[22px]">
                {role.benefits.map((benefit) => (
                  <li className="flex items-center gap-[7px] text-[#36535a]" key={benefit}>
                    <span className={checkStyles[role.tone]}>
                      <CheckIcon />
                    </span>
                    {benefit}
                  </li>
                ))}
              </ul>
              <footer className="mt-auto flex items-center justify-between pt-[12px]">
                <em className={`rounded-xl px-2.5 py-1 text-[9px] font-extrabold not-italic ${tagStyles[role.tone]}`}>
                  {role.tag}
                </em>
                <Link className="flex items-center gap-1 text-xs font-extrabold text-[#6d878c]" href={role.href}>
                  Choose <ArrowIcon />
                </Link>
              </footer>
            </article>
          ))}
        </div>

        <div className="mt-[26px] text-xs text-[#7d969b]">
          Already have a role-based account?{" "}
          <Link className="font-extrabold text-[#ff5922]" href="/login">
            Sign in
          </Link>
        </div>
      </section>
    </main>
  );
}
