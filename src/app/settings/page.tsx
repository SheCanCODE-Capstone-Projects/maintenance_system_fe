import ProfileForm from "@/components/settings/ProfileForm";
import PasswordForm from "@/components/settings/PasswordForm";
export default function Page() { return <section className="mx-auto grid max-w-4xl gap-8 p-8 md:grid-cols-2"><div><h1 className="mb-6 text-2xl font-bold">Profile</h1><ProfileForm /></div><div><h2 className="mb-6 text-2xl font-bold">Password</h2><PasswordForm /></div></section>; }
