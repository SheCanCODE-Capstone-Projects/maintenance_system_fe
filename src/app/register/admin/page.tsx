import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
export default function Page() {
  return (
    <section className="mx-auto max-w-md p-8">
      <h1 className="mb-6 text-2xl font-bold">Create admin account</h1>
      <p className="mb-6 text-sm text-slate-600">This path is for platform administrators only.</p>
      <form className="space-y-4">
        <Input label="Full name" />
        <Input label="Email" type="email" />
        <Input label="Password" type="password" />
        <Button type="submit">Create admin account</Button>
      </form>
    </section>
  );
}
