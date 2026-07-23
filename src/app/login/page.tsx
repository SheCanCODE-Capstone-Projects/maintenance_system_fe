"use client";

import LeftPanel from "@/components/login/LeftPanel";
import LoginForm from "@/components/login/LoginForm";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex bg-[#F4F6F5]">
      {/* Left branding panel — hidden on mobile/tablet */}
      <div className="lg:w-[45%] xl:w-[42%] shrink-0">
        <LeftPanel />
      </div>

      {/* Right form panel */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 lg:py-0">
        <LoginForm />
      </div>
    </div>
  );
}
