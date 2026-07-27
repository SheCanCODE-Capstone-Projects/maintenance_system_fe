"use client";

import { useState } from "react";
import Link from "next/link";

export default function CompanyRegisterPage() {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="min-h-screen bg-bg flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center justify-center h-14 w-14 rounded-2xl bg-secondary mb-4">
            <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-primary">
              <svg className="h-5 w-5 text-white" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
              </svg>
            </div>
          </div>
          <h1 className="text-2xl font-bold text-text">Company Registration</h1>
          <p className="text-sm text-muted mt-1">Register your maintenance company</p>
        </div>

        <div className="rounded-2xl border border-gray-200 bg-white p-8 shadow-sm">
          <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Company name</label>
              <input type="text" placeholder="Acme Maintenance Ltd." required className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm placeholder-muted shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Business email</label>
              <input type="email" placeholder="info@company.com" required className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm placeholder-muted shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Phone number</label>
              <input type="tel" placeholder="+250 7XX XXX XXX" className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm placeholder-muted shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">TIN / Registration number</label>
              <input type="text" placeholder="e.g. 123456789" className="w-full rounded-lg border border-gray-300 px-3 py-2.5 text-sm placeholder-muted shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
            </div>
            <div>
              <label className="block text-sm font-medium text-text mb-1.5">Password</label>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} placeholder="••••••••" required className="w-full rounded-lg border border-gray-300 px-3 py-2.5 pr-10 text-sm placeholder-muted shadow-sm focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted hover:text-text transition">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>
                </button>
              </div>
            </div>
            <button type="submit" className="w-full rounded-lg bg-primary py-2.5 text-sm font-semibold text-white hover:bg-orange-700 transition mt-2 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2">
              Register company
            </button>
          </form>
          <p className="mt-6 text-center text-sm text-muted">
            Already have an account?{" "}
            <Link href="/login" className="font-medium text-primary hover:underline">Sign in</Link>
          </p>
          <p className="mt-2 text-center text-sm text-muted">
            <Link href="/" className="hover:underline">← Back to role selection</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
