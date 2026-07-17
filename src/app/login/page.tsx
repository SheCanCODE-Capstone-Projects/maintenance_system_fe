"use client";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
export default function LoginPage() { return <section className="mx-auto max-w-md p-8"><h1 className="mb-6 text-2xl font-bold">Sign in</h1><form className="space-y-4"><Input label="Email" type="email" /><Input label="Password" type="password" /><Button type="submit">Login</Button></form></section>; }
