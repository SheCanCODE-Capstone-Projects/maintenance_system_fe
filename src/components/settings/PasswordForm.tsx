"use client";
import Input from "@/components/ui/Input";
import Button from "@/components/ui/Button";
export default function PasswordForm() { return <form className="space-y-4"><Input label="Current password" type="password" /><Input label="New password" type="password" /><Button type="submit">Update password</Button></form>; }
