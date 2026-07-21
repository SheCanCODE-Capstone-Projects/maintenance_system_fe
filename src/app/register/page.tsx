import Link from "next/link";

type IconName = "customer" | "technician" | "company";
type Tone = "customer" | "technician" | "company";

function Icon({ name }: { name: IconName }) {
  const common = { width: 26, height: 26, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 1.8, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  if (name === "customer") return <svg {...common}><circle cx="12" cy="7" r="3.2" /><path d="M5.5 20v-2.2a5.8 5.8 0 0 1 11.6 0V20" /></svg>;
  if (name === "technician") return <svg {...common}><path d="m14.7 6.4-5.9 5.9" /><path d="M18.3 2.8a5 5 0 0 0-6.5 6.5L3.6 17.5a2 2 0 1 0 2.9 2.9l8.2-8.2a5 5 0 0 0 6.5-6.5l-3.1 3.1-2.4-2.4z" /></svg>;
  return <svg {...common}><path d="M4 21h16" /><path d="M6 21V5h9v16M9 8h2m-2 4h2m5-2h2m-2 4h2M3 21V11h3m9 10v-7h4v7" /></svg>;
}

function BrandIcon() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M14.7 6.4 8.8 12.3" /><path d="M18.3 2.8a5 5 0 0 0-6.5 6.5l-8.2 8.2a2 2 0 1 0 2.9 2.9l8.2-8.2a5 5 0 0 0 6.5-6.5l-3.1 3.1-2.4-2.4z" /></svg>;
}

function CheckIcon() {
  return <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" aria-hidden="true"><circle cx="12" cy="12" r="8" /><path d="m8.5 12 2.2 2.2 4.8-4.8" /></svg>;
}

function ArrowIcon() {
  return <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6" /></svg>;
}

const roles: { name: string; icon: IconName; description: string; benefits: string[]; tag: string; href: string; tone: Tone }[] = [
  { name: "Customer", icon: "customer", description: "Submit maintenance requests and track job progress for your property.", benefits: ["Browse verified technicians", "Real-time tracking", "Feedback & reviews"], tag: "Free plan", href: "/register/customer", tone: "customer" },
  { name: "Independent Technician", icon: "technician", description: "Get verified, receive jobs, and grow your client base on the platform.", benefits: ["Set your service area", "Build a portfolio", "Subscription access"], tag: "Earn more", href: "/register/technician", tone: "technician" },
  { name: "Company", icon: "company", description: "Register your maintenance company, add your team, and receive large-scale contracts.", benefits: ["Add & manage employees", "Company public profile", "Priority job matching"], tag: "Team accounts", href: "/register/company", tone: "company" },
];

const tagStyles: Record<Tone, string> = { customer: "bg-[#ddf4e9] text-[#158366]", technician: "bg-[#fff0ec] text-[#fc5923]", company: "bg-[#eaf1ff] text-[#315cec]" };
const checkStyles: Record<Tone, string> = { customer: "text-[#168b6b]", technician: "text-[#ff6127]", company: "text-[#315cec]" };

export default function RegisterPage() {
  return <main className="min-h-screen bg-[#f6f8f8] font-sans text-[#071b24]">
    <header className="flex h-[49px] items-center justify-between border-b border-[#edf0f0] bg-white px-[31px]">
      <div className="flex items-center gap-2 text-[13px] font-extrabold tracking-[.2px]"><span className="grid h-[29px] w-[29px] place-items-center rounded-[7px] bg-[#ff6127] text-white"><BrandIcon /></span>MAINTENANCE HUB</div>
      <Link href="/login" className="rounded-md border border-[#e0e6e5] px-[14px] py-[8px] text-xs text-black">Sign in</Link>
    </header>
    <section className="mx-auto mt-12 max-w-[1020px] px-5 text-center sm:mt-16 sm:px-8 lg:mt-20">
      <h1 className="mb-3 text-[clamp(30px,4vw,38px)] font-extrabold leading-[1.15] tracking-[-.8px]">Join Maintenance Hub</h1>
      <p className="mb-10 text-[clamp(15px,2vw,17px)] text-black">Choose your account type to get started</p>
      <div className="grid grid-cols-1 gap-5 text-left md:grid-cols-3">
        {roles.map((role) => <article className="flex min-h-[280px] flex-col rounded-[14px] border border-[#dce5e4] bg-white p-6 shadow-[0_7px_20px_#11223317] transition-shadow hover:shadow-[0_12px_28px_#11223324] sm:min-h-[300px]" key={role.name}>
          <div className="h-8 text-[#789695]"><Icon name={role.icon} /></div>
          <h2 className="mb-2 mt-3 text-[20px] font-extrabold leading-6">{role.name}</h2>
          <p className="m-0 text-[14px] leading-[22px] text-black">{role.description}</p>
          <ul className="m-0 mt-4 list-none space-y-1 p-0 text-[14px] leading-[23px]">
            {role.benefits.map((benefit) => <li className="flex items-center gap-[7px] text-black" key={benefit}><span className={checkStyles[role.tone]}><CheckIcon /></span>{benefit}</li>)}
          </ul>
          <footer className="mt-auto flex items-center justify-between pt-5">
            <em className={`rounded-xl px-3 py-1.5 text-[11px] font-extrabold not-italic ${tagStyles[role.tone]}`}>{role.tag}</em>
            <Link className="flex items-center gap-1 text-[14px] font-extrabold text-black" href={role.href}>Select <ArrowIcon /></Link>
          </footer>
        </article>)}
      </div>
      <div className="mt-8 text-[14px] text-black">Already have an account? <Link className="font-extrabold text-black" href="/login">Sign in</Link></div>
    </section>
  </main>;
}
