"use client";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
export default function ProfileForm() { return <form className="space-y-4"><Input label="Name" /><Input label="Email" type="email" /><Button type="submit">Save profile</Button></form>; }
