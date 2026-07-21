"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useEffect, useMemo, useState } from "react";
import { saveLocalAccount } from "@/lib/localAuth";
import "./registration.css";

type Role = "customer" | "technician" | "company";
type Details = Record<string, string>;

const roleCopy = {
  customer: { label: "Customer", heading: "Create your account", subheading: "Set up your customer credentials.", steps: [["Account", "Your credentials"], ["Submit", "Confirm & create"]] },
  technician: { label: "Technician", heading: "Create your account", subheading: "Set up your technician credentials.", steps: [["Account", "Basic contact"], ["Professional profile", "Trade & location"], ["Verification docs", "ID & certificates"], ["Submit", "Review & confirm"]] },
  company: { label: "Company", heading: "Create your account", subheading: "Set up your company credentials.", steps: [["Admin account", "Owner credentials"], ["Company details", "Registration info"], ["Documents", "Proof of registration"], ["Submit", "Review & confirm"]] },
} as const;

const initialData: Details = { name: "", email: "", phone: "", password: "", confirmPassword: "", trade: "", experience: "", district: "", sector: "", nationalId: "", company: "", registration: "", contact: "", service: "" };

const stepRoutes: Record<Role, string[]> = {
  customer: ["/register/customer", "/register/customer/review"],
  technician: ["/register/technician", "/register/technician/profile", "/register/technician/verification", "/register/technician/review"],
  company: ["/register/company", "/register/company/profile", "/register/company/verification", "/register/company/review"],
};

const Icon = ({ children }: { children: React.ReactNode }) => <span className="reg-input-icon">{children}</span>;

function Field({ label, name, value, onChange, type = "text", placeholder, required = false, disabled = false }: { label: string; name: string; value: string; onChange: (event: ChangeEvent<HTMLInputElement>) => void; type?: string; placeholder?: string; required?: boolean; disabled?: boolean }) {
  return <label className="reg-field"><span>{label}{required && " *"}</span><div className="reg-input-wrap"><input name={name} value={value} onChange={onChange} type={type} placeholder={placeholder} required={required} disabled={disabled} /></div></label>;
}

function Upload({ label, file, onChange, required = false }: { label: string; file?: File; onChange: (event: ChangeEvent<HTMLInputElement>) => void; required?: boolean }) {
  return <label className="reg-field"><span>{label}{required && " *"}</span><span className="reg-upload"><input type="file" accept=".pdf,.png,.jpg,.jpeg" onChange={onChange} required={required} /><b>↥</b><strong>{file ? file.name : "Click to upload or drag & drop"}</strong><small>PDF, JPG, PNG — max 5MB</small></span></label>;
}

function RolePicker() {
  const cards = [
    ["customer", "♙", "Submit maintenance requests and track job progress for your property.", ["Browse verified technicians", "Real-time tracking", "Feedback & reviews"], "Free plan"],
    ["technician", "♢", "Get verified, receive jobs, and grow your client base on the platform.", ["Set your service area", "Build a portfolio", "Subscription access"], "Earn more"],
    ["company", "▥", "Register your maintenance company, add your team, and receive large-scale contracts.", ["Add & manage employees", "Company public profile", "Priority job matching"], "Team accounts"],
  ] as const;
  return <main className="reg-roles"><header className="reg-topbar"><div className="reg-brand"><i>⌕</i> MAINTENANCE HUB</div><Link href="/login">Sign in</Link></header><section><h1>Join Maintenance Hub</h1><p>Choose your account type to get started</p><div className="reg-role-grid">{cards.map(([role, icon, description, benefits, tag]) => <article key={role} className="reg-role-card"><b className="reg-role-icon">{icon}</b><h2>{roleCopy[role].label}</h2><p>{description}</p><ul>{benefits.map(item => <li key={item}>⊙ &nbsp;{item}</li>)}</ul><div><em>{tag}</em><Link href={`/register/${role === "technician" ? "technician/independent" : role}`}>Select&nbsp; →</Link></div></article>)}</div><p className="reg-login-copy">Already have an account? <Link href="/login">Sign in</Link></p></section></main>;
}

export default function RegistrationWizard({ role, initialStep = 0 }: { role?: Role; initialStep?: number }) {
  const config = roleCopy[role ?? "customer"];
  const router = useRouter();
  const [step, setStep] = useState(initialStep);
  const [data, setData] = useState<Details>(initialData);
  const [files, setFiles] = useState<Record<string, File | undefined>>({});
  const [error, setError] = useState("");
  const [complete, setComplete] = useState(false);
  const storageKey = role ? `maintenance-hub-registration-${role}` : "";

  useEffect(() => {
    if (!storageKey) return;
    const saved = window.sessionStorage.getItem(storageKey);
    if (saved) setData({ ...initialData, ...JSON.parse(saved) });
  }, [storageKey]);

  const saveProgress = () => {
    if (storageKey) window.sessionStorage.setItem(storageKey, JSON.stringify(data));
  };
  const update = (event: ChangeEvent<HTMLInputElement>) => setData(current => ({ ...current, [event.target.name]: event.target.value }));
  const choose = (name: string, value: string) => setData(current => ({ ...current, [name]: value }));
  const next = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    if (step === 0 && data.password !== data.confirmPassword) return setError("Passwords do not match.");
    if (role === "technician" && step === 1 && !data.trade) return setError("Choose your primary trade category.");
    if (role === "company" && step === 1 && !data.service) return setError("Choose your primary service type.");
    if (step < config.steps.length - 1 && role) {
      saveProgress();
      router.push(stepRoutes[role][step + 1]);
      return;
    }
    if (role) saveLocalAccount({ email: data.email, password: data.password, role, name: data.name });
    if (storageKey) window.sessionStorage.removeItem(storageKey);
    setComplete(true);
  };
  const previous = () => {
    if (!role || step === 0) return router.push("/register");
    saveProgress();
    router.push(stepRoutes[role][step - 1]);
  };
  const reviewRows = useMemo(() => {
    const base = [["Full name", data.name], ["Email", data.email], ["Phone", data.phone], ["Account type", config.label]];
    if (role === "technician") base.push(["Trade", data.trade], ["District", data.district], ["Sector", data.sector], ["National ID", data.nationalId]);
    if (role === "company") base.push(["Company", data.company], ["Contact", data.contact], ["District", data.district], ["Registration", data.registration]);
    return base;
  }, [data, config.label, role]);

  if (!role) return <RolePicker />;

  if (complete) return <main className="reg-success-page"><section className="reg-success"><b className="reg-success-icon">▥</b>{role !== "customer" && <em>Pending Accreditation</em>}<h1>{role === "customer" ? "Account created!" : `${role === "company" ? "Company" : "Technician"} registered!`}</h1><p>{role === "customer" ? "Your account is ready. You can now find reliable maintenance professionals." : `Your ${role === "company" ? "company" : "application"} is pending review. Our team will verify your documents.`}</p><div className="reg-review">{reviewRows.slice(role === "company" ? 4 : 0).map(([label, value]) => <div key={label}><span>{label}</span><b>{value}</b></div>)}</div><Link className="reg-primary reg-success-button" href="/login">Back to login</Link></section></main>;

  const isReview = step === config.steps.length - 1;
  const account = <><Field label={role === "company" ? "Owner full name" : "Full name"} name="name" value={data.name} onChange={update} placeholder="Jean Pierre Nkurunziza" required /><Field label="Email address" name="email" value={data.email} onChange={update} type="email" placeholder="you@example.com" required /><Field label="Phone number" name="phone" value={data.phone} onChange={update} type="tel" placeholder="+250 7xx xxx xxx" required /><div className="reg-two-cols"><Field label="Password" name="password" value={data.password} onChange={update} type="password" placeholder="Min. 8 characters" required /><Field label="Confirm password" name="confirmPassword" value={data.confirmPassword} onChange={update} type="password" placeholder="Repeat password" required /></div></>;
  const professional = <><label className="reg-field"><span>Primary trade category *</span><div className="reg-pills">{["Plumbing", "Electrical", "Carpentry", "Painting", "Mechanical", "Other"].map(item => <button type="button" className={data.trade === item ? "selected" : ""} onClick={() => choose("trade", item)} key={item}>{item}</button>)}</div></label><Field label="Years of experience" name="experience" value={data.experience} onChange={update} type="number" placeholder="e.g. 7" required /><div className="reg-two-cols"><Select label="District" name="district" value={data.district} choose={choose} /><Select label="Sector" name="sector" value={data.sector} choose={choose} district={data.district} disabled={!data.district} /></div></>;
  const companyDetails = <><Field label="Company name" name="company" value={data.company} onChange={update} placeholder="e.g. BuildFix Ltd" required /><div className="reg-two-cols"><Field label="Registration number" name="registration" value={data.registration} onChange={update} placeholder="e.g. RW-123456" required /><Field label="Contact person" name="contact" value={data.contact} onChange={update} placeholder="Full name" required /></div><div className="reg-two-cols"><Select label="District" name="district" value={data.district} choose={choose} /><Select label="Sector" name="sector" value={data.sector} choose={choose} district={data.district} disabled={!data.district} /></div><label className="reg-field"><span>Primary service type</span><div className="reg-pills">{["Plumbing", "Electrical", "Carpentry", "Painting", "Mechanical", "General"].map(item => <button type="button" className={data.service === item ? "selected" : ""} onClick={() => choose("service", item)} key={item}>{item}</button>)}</div></label></>;
  const documents = role === "technician" ? <><Field label="National ID number" name="nationalId" value={data.nationalId} onChange={update} placeholder="e.g. 1199780012345678" required /><Upload label="National ID scan (front)" file={files.id} onChange={e => setFiles({ ...files, id: e.target.files?.[0] })} required /><Upload label="Trade certificate / qualification proof" file={files.certificate} onChange={e => setFiles({ ...files, certificate: e.target.files?.[0] })} /><div className="reg-note warning">⚠ Your documents are only used for verification. They will not be shared publicly or with customers.</div></> : <><Upload label="Company registration certificate" file={files.registration} onChange={e => setFiles({ ...files, registration: e.target.files?.[0] })} required /><Upload label="Business license / operating permit" file={files.license} onChange={e => setFiles({ ...files, license: e.target.files?.[0] })} /><div className="reg-note success">⊙ Once documents are reviewed, your company profile will display an <b>Accredited</b> badge, which increases trust with customers.</div></>;
  const content = isReview ? <><div className="reg-review">{reviewRows.map(([label, value]) => <div key={label}><span>{label}</span><b>{value}</b></div>)}</div>{role !== "customer" && <div className="reg-note warning">◷ Your account will be under review until admin verification is complete.</div>}</> : step === 0 ? account : role === "technician" ? (step === 1 ? professional : documents) : companyDetails && (step === 1 ? companyDetails : documents);
  return <main className="reg-shell"><aside className="reg-sidebar"><div className="reg-brand"><i>⌕</i> MAINTENANCE HUB</div><p>CREATE {config.label.toUpperCase()} ACCOUNT</p><ol>{config.steps.map(([title, sub], index) => <li key={title} className={index < step ? "done" : index === step ? "active" : ""}><b>{index < step ? "⊙" : index + 1}</b><span><strong>{title}</strong><small>{sub}</small></span></li>)}</ol><Link href="/login">↩ &nbsp;Back to sign in</Link></aside><section className="reg-content"><div className="reg-form-wrap"><h1>{isReview ? "Review & submit" : step === 1 && role === "technician" ? "Professional profile" : step === 1 && role === "company" ? "Company details" : step === 2 ? (role === "company" ? "Company documents" : "Verification documents") : config.heading}</h1><p>{isReview ? "" : step === 1 && role === "technician" ? "Appears on your public profile once verified." : step === 1 && role === "company" ? "Tell us about your maintenance business." : step === 2 ? "Required for identity verification and admin approval." : config.subheading}</p><form onSubmit={next}><div className="reg-card">{content}</div>{error && <p className="reg-error">{error}</p>}<div className="reg-actions"><button type="button" className="reg-secondary" onClick={previous}>← {step === 0 ? "Back to roles" : "Back"}</button><button className="reg-primary" type="submit">{isReview ? (role === "company" ? "Register company" : role === "technician" ? "Submit application" : "Create account") : "Continue"} →</button></div></form><p className="reg-login-copy">Have an account? <Link href="/login">Sign in</Link></p></div></section></main>;
}

const districtsByProvince = {
  "Eastern Province": ["Bugesera", "Gatsibo", "Kayonza", "Kirehe", "Ngoma", "Nyagatare", "Rwamagana"],
  "Kigali City": ["Gasabo", "Kicukiro", "Nyarugenge"],
  "Northern Province": ["Burera", "Gakenke", "Gicumbi", "Musanze", "Rulindo"],
  "Southern Province": ["Gisagara", "Huye", "Kamonyi", "Muhanga", "Nyamagabe", "Nyanza", "Nyaruguru", "Ruhango"],
  "Western Province": ["Karongi", "Ngororero", "Nyabihu", "Nyamasheke", "Rubavu", "Rusizi", "Rutsiro"],
};

const sectorsByDistrict: Record<string, string[]> = {
  Gasabo: ["Bumbogo", "Gikomero", "Gisozi", "Jabana", "Jali", "Kinyinya", "Ndera", "Nduba", "Remera", "Rusororo", "Rutunga"],
  Kicukiro: ["Gahanga", "Gatenga", "Gikondo", "Kagarama", "Kanombe", "Kicukiro", "Masaka", "Niboye", "Nyarugunga", "Kigarama"],
  Nyarugenge: ["Gitega", "Kanyinya", "Kigali", "Kimisagara", "Mageragere", "Muhima", "Nyakabanda", "Nyamirambo", "Rwezamenyo", "Nyarugenge"],
  Bugesera: ["Gashora", "Juru", "Kamabuye", "Mareba", "Mayange", "Musenyi", "Mwogo", "Ntarama", "Nyamata", "Nyarugenge", "Rilima", "Ruhuha", "Rweru", "Shyara", "Ngeruka"],
  Gatsibo: ["Gasange", "Gatsibo", "Gitoki", "Kabarore", "Kageyo", "Kiramuruzi", "Kiziguro", "Muhura", "Murambi", "Ngarama", "Nyagihanga", "Remera", "Rugarama", "Rwimbogo"],
  Kayonza: ["Gahini", "Kabare", "Kabarondo", "Mukarange", "Murama", "Murundi", "Mwiri", "Ndego", "Nyamirama", "Rukara", "Ruramira", "Rwinkwavu"],
  Kirehe: ["Gahara", "Gatore", "Kigina", "Kigarama", "Kirehe", "Mahama", "Mpanga", "Musaza", "Ngarama", "Nyamugali", "Nasho", "Nyabugare"],
  Ngoma: ["Gashanda", "Jarama", "Karembo", "Kibungo", "Mugesera", "Murama", "Mutenderi", "Remera", "Rukumberi", "Rurenge", "Sake", "Zaza", "Rukira", "Rukoma"],
  Nyagatare: ["Gatunda", "Karama", "Karangazi", "Katabagemu", "Matimba", "Mimuli", "Musheli", "Nyagatare", "Rukomo", "Rwempasha", "Rwimiyaga", "Tabagwe", "Mukama", "Bushoga"],
  Rwamagana: ["Fumbwe", "Gahengeri", "Gishali", "Karenge", "Kigabiro", "Muhazi", "Munyaga", "Musha", "Muyumbu", "Mwulire", "Nyakaliro", "Nzige", "Rubona", "Rukara"],
  Gisagara: ["Gikonko", "Gishubi", "Kansi", "Kibilizi", "Kigembe", "Muganza", "Mukindo", "Musha", "Ndora", "Nyanza", "Save", "Kibirizi", "Nyabisindu"],
  Huye: ["Gishamvu", "Huye", "Karama", "Kigoma", "Kinazi", "Maraba", "Mbazi", "Mukura", "Ngoma", "Ruhashya", "Rusatira", "Rwaniro", "Simbi", "Tumba"],
  Kamonyi: ["Gacurabwenge", "Kayenzi", "Kayumbu", "Mugina", "Musambira", "Ngamba", "Nyamiyaga", "Nyarubaka", "Rugarika", "Rukoma", "Runda", "Karama"],
  Muhanga: ["Cyeza", "Kabacuzi", "Kibangu", "Kiyumba", "Muhanga", "Mushishiro", "Ndiza", "Nyabinoni", "Nyamabuye", "Nyarusange", "Rugendabari", "Shyogwe"],
  Nyamagabe: ["Bugarama", "Buruhukiro", "Cyanika", "Gasaka", "Gatare", "Kaduha", "Kamegeri", "Kitabi", "Mbazi", "Mugano", "Musange", "Musebeya", "Nkomane", "Tare", "Uwinkingi", "Kibirizi"],
  Nyanza: ["Busasamana", "Cyabakamyi", "Kibilizi", "Kigoma", "Mukingo", "Muyira", "Ntyazo", "Nyagisozi", "Rwabicuma", "Shinga"],
  Nyaruguru: ["Busanze", "Cyahinda", "Kibeho", "Kivu", "Mata", "Muganza", "Munini", "Ngera", "Ngoma", "Nyabimata", "Nyagisozi", "Ruheru", "Ruramba", "Rusenge"],
  Ruhango: ["Bweramana", "Byimana", "Kabagari", "Kinazi", "Mbuye", "Mwendo", "Ntongwe", "Ruhango", "Kinihira", "Gitwe", "Nyarurambi", "Gishari"],
  Burera: ["Butaro", "Cyanika", "Cyeru", "Gahunga", "Gatebe", "Kagogo", "Kinoni", "Kinyababa", "Nemba", "Rugarama", "Ruhunde", "Rusarabuye", "Rwerere", "Bungwe", "Kivuye", "Nyamugali", "Vumbi"],
  Gakenke: ["Busengo", "Coko", "Cyabingo", "Gakenke", "Gashenyi", "Janja", "Kamubuga", "Karambo", "Kivuruga", "Mataba", "Minazi", "Muhondo", "Muyongwe", "Muzo", "Nemba", "Ruli", "Rusasa", "Rushashi"],
  Gicumbi: ["Bukure", "Bwisige", "Byumba", "Cyumba", "Giti", "Kaniga", "Manyagiro", "Miyove", "Mukarange", "Muko", "Mutete", "Nyamiyaga", "Nyankenke I", "Nyankenke II", "Rubaya", "Rukomo", "Rushaki", "Rutare", "Ruvune", "Shangasha", "Kageyo"],
  Musanze: ["Busogo", "Cyuve", "Gacaca", "Gashaki", "Gataraga", "Kinigi", "Muhoza", "Nkotsi", "Nyange", "Remera", "Ruhengeri", "Rwaza", "Shingiro", "Muko", "Gacundezi"],
  Rulindo: ["Base", "Burega", "Bushoki", "Buyoga", "Cyinzuzi", "Cyungo", "Kinihira", "Kisaro", "Masoro", "Mbogo", "Murambi", "Ngoma", "Ntarabana", "Shyorongi", "Tumba", "Rusiga", "Rukozo"],
  Karongi: ["Bwishyura", "Gashari", "Gishyita", "Mubuga", "Murambi", "Murundi", "Mutuntu", "Rubengera", "Ruganda", "Rwankuba", "Twumba", "Kibuye", "Gitesi"],
  Ngororero: ["Bwira", "Gatumba", "Hindiro", "Kavumu", "Matyazo", "Muhanda", "Muhororo", "Ndaro", "Ngororero", "Nyange", "Sovu", "Kageyo"],
  Nyabihu: ["Bigogwe", "Jenda", "Jomba", "Karago", "Kintobo", "Mukamira", "Muringa", "Rambura", "Rugera", "Rurembo", "Shyira", "Arusha"],
  Nyamasheke: ["Bushekeri", "Bushenge", "Cyato", "Gihombo", "Kagano", "Kanjongo", "Karambi", "Karengera", "Kirimbi", "Macuba", "Nyabitekeri", "Rangiro", "Ruharambuga", "Shangi", "Mahembe"],
  Rubavu: ["Bugeshi", "Busasamana", "Gisenyi", "Kanama", "Nyamyumba", "Nyundo", "Rubavu", "Rugerero", "Kanzenze", "Cyanzarwe", "Mudende", "Nyakiriba"],
  Rusizi: ["Bugarama", "Butare", "Bweyeye", "Gikundamvura", "Gashonga", "Gitambi", "Kamembe", "Muganza", "Mururu", "Nkanka", "Nkombo", "Nkungu", "Nyakabuye", "Nyakarenzo", "Nzahaha", "Rwimbogo", "Rwimbogo II", "Rwimbogo III"],
  Rutsiro: ["Boneza", "Gihango", "Kigeyo", "Kivumu", "Manihira", "Mukura", "Murunda", "Musasa", "Mushonyi", "Nyabirasi", "Ruhango", "Rusebeya", "Tumba", "Gihango II"],
};

function Select({ label, name, value, choose, district = "", disabled = false }: { label: string; name: string; value: string; choose: (name: string, value: string) => void; district?: string; disabled?: boolean }) {
  const sectors = sectorsByDistrict[district] ?? [];
  const sectorDisabled = disabled || (name === "sector" && sectors.length === 0);
  const placeholder = name === "sector" && district && sectors.length === 0 ? "Sectors coming soon" : disabled ? "Select district first" : `Select ${label.toLowerCase()}`;
  return <label className="reg-field"><span>{label} *</span><select value={value} onChange={e => { choose(name, e.target.value); if (name === "district") choose("sector", ""); }} required disabled={sectorDisabled}><option value="">{placeholder}</option>{name === "district" ? Object.entries(districtsByProvince).map(([province, districts]) => <optgroup key={province} label={province}>{districts.map(districtName => <option key={districtName} value={districtName}>{districtName}</option>)}</optgroup>) : sectors.map(sector => <option key={sector} value={sector}>{sector}</option>)}</select></label>;
}
