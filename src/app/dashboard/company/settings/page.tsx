import ProfileForm from "@/components/settings/ProfileForm";
import PasswordForm from "@/components/settings/PasswordForm";

export default function Page() { return <section className="mx-auto grid max-w-5xl gap-8 p-8 lg:grid-cols-2"><div><h1 className="text-2xl font-bold text-slate-800">Company settings</h1><p className="mt-1 text-sm text-slate-500">Update your company administrator profile.</p><div className="mt-6"><ProfileForm /></div></div><div className="pt-12 lg:pt-0"><h2 className="text-2xl font-bold text-slate-800">Security</h2><p className="mt-1 text-sm text-slate-500">Keep your account secure.</p><div className="mt-6"><PasswordForm /></div></div></section>; }
