"use client";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
export default function RequestForm() { return <form className="space-y-4"><Input label="Title" /><label className="block text-sm font-medium">Description<textarea className="mt-1 w-full rounded border px-3 py-2" rows={5} /></label><Button type="submit">Submit request</Button></form>; }
