export default function AdminPageHeader({ title, description }: { title: string; description: string }) {
  return <header className="mb-6"><h1 className="font-heading text-2xl font-extrabold text-secondary sm:text-3xl">{title}</h1><p className="mt-1 text-sm text-slate-500">{description}</p></header>;
}
