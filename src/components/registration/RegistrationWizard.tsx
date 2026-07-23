"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { ChangeEvent, FormEvent, useMemo, useState } from "react";
import "./registration.css";

type Role = "customer" | "technician" | "company";
type Details = Record<string, string>;

const roleCopy = {
  customer: {
    label: "Customer",
    heading: "Create your customer account",
    subheading: "Set up the details needed to request jobs and manage service history.",
    steps: [["Account", "Your credentials"], ["Submit", "Confirm and create account"]],
  },
  technician: {
    label: "Technician",
    heading: "Create your technician account",
    subheading: "Set up the details needed to receive jobs and verify your trade profile.",
    steps: [
      ["Account", "Basic contact"],
      ["Professional profile", "Trade and location"],
      ["Verification docs", "ID and certificates"],
      ["Submit", "Review and confirm"],
    ],
  },
  company: {
    label: "Company",
    heading: "Create your company account",
    subheading: "Set up the details needed to manage your team, documents, and job flow.",
    steps: [
      ["Admin account", "Owner credentials"],
      ["Company details", "Registration info"],
      ["Documents", "Proof of registration"],
      ["Submit", "Review and confirm"],
    ],
  },
} as const;

const initialData: Details = {
  name: "",
  email: "",
  phone: "",
  password: "",
  confirmPassword: "",
  trade: "",
  experience: "",
  district: "",
  sector: "",
  nationalId: "",
  company: "",
  registration: "",
  contact: "",
  service: "",
};

const stepRoutes: Record<Role, string[]> = {
  customer: ["/register/customer", "/register/customer/review"],
  technician: [
    "/register/technician",
    "/register/technician/profile",
    "/register/technician/verification",
    "/register/technician/review",
  ],
  company: [
    "/register/company",
    "/register/company/profile",
    "/register/company/verification",
    "/register/company/review",
  ],
};

function RolePicker() {
  const cards = [
    [
      "customer",
      "♙",
      "Create a customer account to request jobs, track progress, and review completed work.",
      ["Request maintenance in minutes", "Track status updates", "Rate technicians"],
      "Fast start",
    ],
    [
      "technician",
      "♢",
      "Create a technician account to receive jobs, manage your schedule, and build trust.",
      ["Set your trade focus", "Complete verification", "Grow your job history"],
      "Earn more",
    ],
    [
      "company",
      "▥",
      "Create a company account to manage your team, route jobs, and operate as a business.",
      ["Add staff members", "Open company profile", "Access analytics"],
      "Team accounts",
    ],
  ] as const;

  return (
    <main className="reg-roles">
      <header className="reg-topbar">
        <div className="reg-brand">
          <i>∘</i> MAINTENANCE HUB
        </div>
        <Link href="/login">Sign in by role</Link>
      </header>

      <section>
        <h1>Choose your signup role</h1>
        <p>Each path asks only for the details that role needs.</p>
        <div className="reg-role-grid">
          {cards.map(([role, icon, description, benefits, tag]) => (
            <article key={role} className="reg-role-card">
              <b className="reg-role-icon">{icon}</b>
              <h2>{roleCopy[role as Role].label}</h2>
              <p>{description}</p>
              <ul>
                {benefits.map((item) => (
                  <li key={item}>⊙ &nbsp;{item}</li>
                ))}
              </ul>
              <div>
                <em>{tag}</em>
                <Link href={`/register/${role === "technician" ? "technician/independent" : role}`}>
                  Choose&nbsp; →
                </Link>
              </div>
            </article>
          ))}
        </div>
        <p className="reg-login-copy">
          Already have a role-based account? <Link href="/login">Sign in</Link>
        </p>
      </section>
    </main>
  );
}

function Field({
  label,
  name,
  value,
  onChange,
  type = "text",
  placeholder,
  required = false,
  disabled = false,
}: {
  label: string;
  name: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
}) {
  return (
    <label className="reg-field">
      <span>
        {label}
        {required && " *"}
      </span>
      <div className="reg-input-wrap">
        <input
          name={name}
          value={value}
          onChange={onChange}
          type={type}
          placeholder={placeholder}
          required={required}
          disabled={disabled}
        />
      </div>
    </label>
  );
}

function Upload({
  label,
  file,
  onChange,
  required = false,
}: {
  label: string;
  file?: File;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}) {
  return (
    <label className="reg-field">
      <span>
        {label}
        {required && " *"}
      </span>
      <span className="reg-upload">
        <input type="file" accept=".pdf,.png,.jpg,.jpeg" onChange={onChange} required={required} />
        <b>↥</b>
        <strong>{file ? file.name : "Click to upload or drag and drop"}</strong>
        <small>PDF, JPG, PNG - max 5MB</small>
      </span>
    </label>
  );
}

function Select({
  label,
  name,
  value,
  choose,
  disabled = false,
}: {
  label: string;
  name: string;
  value: string;
  choose: (name: string, value: string) => void;
  disabled?: boolean;
}) {
  return (
    <label className="reg-field">
      <span>
        {label} *
      </span>
      <select
        value={value}
        onChange={(event) => choose(name, event.target.value)}
        required
        disabled={disabled}
      >
        <option value="">{disabled ? "Select district first" : `Select ${label.toLowerCase()}`}</option>
        {(name === "district"
          ? ["Gasabo", "Kicukiro", "Nyarugenge", "Musanze", "Muhanga"]
          : ["Kacyiru", "Remera", "Cyeza", "Nyamabuye"]
        ).map((item) => (
          <option key={item}>{item}</option>
        ))}
      </select>
    </label>
  );
}

export default function RegistrationWizard({
  role,
  initialStep = 0,
}: {
  role?: Role;
  initialStep?: number;
}) {
  const config = roleCopy[role ?? "customer"];
  const router = useRouter();
  const [step, setStep] = useState(initialStep);
  const [data, setData] = useState<Details>(() => {
    if (!role || typeof window === "undefined") {
      return initialData;
    }

    const saved = window.sessionStorage.getItem(`maintenance-hub-registration-${role}`);

    if (!saved) {
      return initialData;
    }

    try {
      return { ...initialData, ...JSON.parse(saved) };
    } catch {
      return initialData;
    }
  });
  const [files, setFiles] = useState<Record<string, File | undefined>>({});
  const [error, setError] = useState("");
  const [complete, setComplete] = useState(false);
  const storageKey = role ? `maintenance-hub-registration-${role}` : "";

  const saveProgress = () => {
    if (storageKey) window.sessionStorage.setItem(storageKey, JSON.stringify(data));
  };

  const update = (event: ChangeEvent<HTMLInputElement>) =>
    setData((current) => ({ ...current, [event.target.name]: event.target.value }));

  const choose = (name: string, value: string) =>
    setData((current) => ({ ...current, [name]: value }));

  const next = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (step === 0 && data.password !== data.confirmPassword) {
      return setError("Passwords do not match.");
    }
    if (role === "technician" && step === 1 && !data.trade) {
      return setError("Choose your primary trade category.");
    }
    if (role === "company" && step === 1 && !data.service) {
      return setError("Choose your primary service type.");
    }
    if (step < config.steps.length - 1 && role) {
      saveProgress();
      router.push(stepRoutes[role][step + 1]);
      return;
    }

    if (storageKey) window.sessionStorage.removeItem(storageKey);
    setComplete(true);
  };

  const previous = () => {
    if (!role || step === 0) return router.push("/register");
    saveProgress();
    router.push(stepRoutes[role][step - 1]);
  };

  const reviewRows = useMemo(() => {
    const base = [
      ["Full name", data.name],
      ["Email", data.email],
      ["Phone", data.phone],
      ["Account type", config.label],
    ];

    if (role === "technician") {
      base.push(["Trade", data.trade], ["District", data.district], ["Sector", data.sector], ["National ID", data.nationalId]);
    }
    if (role === "company") {
      base.push(["Company", data.company], ["Contact", data.contact], ["District", data.district], ["Registration", data.registration]);
    }

    return base;
  }, [data, config.label, role]);

  if (!role) return <RolePicker />;

  if (complete) {
    return (
      <main className="reg-success-page">
        <section className="reg-success">
          <b className="reg-success-icon">▥</b>
          {role !== "customer" && <em>Pending verification</em>}
          <h1>{role === "customer" ? "Customer account created!" : `${role === "company" ? "Company" : "Technician"} application submitted!`}</h1>
          <p>
            {role === "customer"
              ? "Your customer account is ready. You can now request maintenance services and track progress."
              : `Your ${role === "company" ? "company" : "technician"} registration is under review. Our team will verify the submitted documents.`}
          </p>
          <div className="reg-review">
            {reviewRows.slice(role === "company" ? 4 : 0).map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <b>{value}</b>
              </div>
            ))}
          </div>
          <Link className="reg-primary reg-success-button" href="/login">
            Back to role sign in
          </Link>
        </section>
      </main>
    );
  }

  const isReview = step === config.steps.length - 1;
  const account = (
    <>
      <Field
        label={role === "company" ? "Owner full name" : "Full name"}
        name="name"
        value={data.name}
        onChange={update}
        placeholder="Jean Pierre Nkurunziza"
        required
      />
      <Field
        label="Email address"
        name="email"
        value={data.email}
        onChange={update}
        type="email"
        placeholder="you@example.com"
        required
      />
      <Field
        label="Phone number"
        name="phone"
        value={data.phone}
        onChange={update}
        type="tel"
        placeholder="+250 7xx xxx xxx"
        required
      />
      <div className="reg-two-cols">
        <Field
          label="Password"
          name="password"
          value={data.password}
          onChange={update}
          type="password"
          placeholder="Min. 8 characters"
          required
        />
        <Field
          label="Confirm password"
          name="confirmPassword"
          value={data.confirmPassword}
          onChange={update}
          type="password"
          placeholder="Repeat password"
          required
        />
      </div>
    </>
  );

  const professional = (
    <>
      <label className="reg-field">
        <span>Primary trade category *</span>
        <div className="reg-pills">
          {["Plumbing", "Electrical", "Carpentry", "Painting", "Mechanical", "Other"].map((item) => (
            <button
              type="button"
              className={data.trade === item ? "selected" : ""}
              onClick={() => choose("trade", item)}
              key={item}
            >
              {item}
            </button>
          ))}
        </div>
      </label>
      <Field
        label="Years of experience"
        name="experience"
        value={data.experience}
        onChange={update}
        type="number"
        placeholder="e.g. 7"
        required
      />
      <div className="reg-two-cols">
        <Select label="District" name="district" value={data.district} choose={choose} />
        <Select label="Sector" name="sector" value={data.sector} choose={choose} disabled={!data.district} />
      </div>
    </>
  );

  const companyDetails = (
    <>
      <Field
        label="Company name"
        name="company"
        value={data.company}
        onChange={update}
        placeholder="e.g. BuildFix Ltd"
        required
      />
      <div className="reg-two-cols">
        <Field
          label="Registration number"
          name="registration"
          value={data.registration}
          onChange={update}
          placeholder="e.g. RW-123456"
          required
        />
        <Field
          label="Contact person"
          name="contact"
          value={data.contact}
          onChange={update}
          placeholder="Full name"
          required
        />
      </div>
      <div className="reg-two-cols">
        <Select label="District" name="district" value={data.district} choose={choose} />
        <Select label="Sector" name="sector" value={data.sector} choose={choose} disabled={!data.district} />
      </div>
      <label className="reg-field">
        <span>Primary service type</span>
        <div className="reg-pills">
          {["Plumbing", "Electrical", "Carpentry", "Painting", "Mechanical", "General"].map((item) => (
            <button
              type="button"
              className={data.service === item ? "selected" : ""}
              onClick={() => choose("service", item)}
              key={item}
            >
              {item}
            </button>
          ))}
        </div>
      </label>
    </>
  );

  const documents =
    role === "technician" ? (
      <>
        <Field
          label="National ID number"
          name="nationalId"
          value={data.nationalId}
          onChange={update}
          placeholder="e.g. 1199780012345678"
          required
        />
        <Upload
          label="National ID scan (front)"
          file={files.id}
          onChange={(event) => setFiles({ ...files, id: event.target.files?.[0] })}
          required
        />
        <Upload
          label="Trade certificate / qualification proof"
          file={files.certificate}
          onChange={(event) => setFiles({ ...files, certificate: event.target.files?.[0] })}
        />
        <div className="reg-note warning">
          Your documents are only used for verification. They will not be shared publicly or with customers.
        </div>
      </>
    ) : (
      <>
        <Upload
          label="Company registration certificate"
          file={files.registration}
          onChange={(event) => setFiles({ ...files, registration: event.target.files?.[0] })}
          required
        />
        <Upload
          label="Business license / operating permit"
          file={files.license}
          onChange={(event) => setFiles({ ...files, license: event.target.files?.[0] })}
        />
        <div className="reg-note success">
          Once documents are reviewed, your company profile will display an <b>Accredited</b> badge, which increases trust with customers.
        </div>
      </>
    );

  let content: JSX.Element;
  if (isReview) {
    content = (
      <>
        <div className="reg-review">
          {reviewRows.map(([label, value]) => (
            <div key={label}>
              <span>{label}</span>
              <b>{value}</b>
            </div>
          ))}
        </div>
          {role !== "customer" && <div className="reg-note warning">Your submission will remain under review until admin verification is complete.</div>}
      </>
    );
  } else if (step === 0) {
    content = account;
  } else if (role === "technician") {
    content = step === 1 ? professional : documents;
  } else {
    content = step === 1 ? companyDetails : documents;
  }

  const pageTitle =
    isReview
      ? "Review and submit"
      : step === 1 && role === "technician"
        ? "Professional profile"
        : step === 1 && role === "company"
          ? "Company details"
          : step === 2
            ? role === "company"
              ? "Company documents"
              : "Verification documents"
            : config.heading;

  const pageDescription =
    isReview
      ? ""
      : step === 1 && role === "technician"
        ? "Appears on your public profile once verified."
        : step === 1 && role === "company"
          ? "Tell us about your maintenance business."
          : step === 2
            ? "Required for identity verification and admin approval."
            : config.subheading;

  return (
    <main className="reg-shell">
      <aside className="reg-sidebar">
        <div className="reg-brand">
          <i>∘</i> MAINTENANCE HUB
        </div>
        <p>CREATE {config.label.toUpperCase()} ACCOUNT</p>
        <ol>
          {config.steps.map(([title, sub], index) => (
            <li key={title} className={index < step ? "done" : index === step ? "active" : ""}>
              <b>{index < step ? "⊙" : index + 1}</b>
              <span>
                <strong>{title}</strong>
                <small>{sub}</small>
              </span>
            </li>
          ))}
        </ol>
          <Link href="/login">↩ Back to role sign in</Link>
      </aside>

      <section className="reg-content">
        <div className="reg-form-wrap">
          <h1>{pageTitle}</h1>
          <p>{pageDescription}</p>
          <form onSubmit={next}>
            <div className="reg-card">{content}</div>
            {error && <p className="reg-error">{error}</p>}
            <div className="reg-actions">
              <button type="button" className="reg-secondary" onClick={previous}>
                ← {step === 0 ? "Back to roles" : "Back"}
              </button>
              <button className="reg-primary" type="submit">
                {isReview
                  ? role === "company"
                    ? "Register company"
                    : role === "technician"
                      ? "Submit application"
                      : "Create customer account"
                  : "Continue"}{" "}
                →
              </button>
            </div>
          </form>
          <p className="reg-login-copy">
            Have a role-based account? <Link href="/login">Sign in by role</Link>
          </p>
        </div>
      </section>
    </main>
  );
}
