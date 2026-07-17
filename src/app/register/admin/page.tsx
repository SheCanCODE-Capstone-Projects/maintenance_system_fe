import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
export default function Page() { return <section className="mx-auto max-w-md p-8"><h1 className="mb-6 text-2xl font-bold">Admin registration</h1><form className="space-y-4"><Input label="Full name" /><Input label="Email" type="email" /><Input label="Password" type="password" /><Button type="submit">Create account</Button></form></section>; }
