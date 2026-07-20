"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, ArrowRight, Wrench } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import RoleSelector, { type Role } from "./RoleSelector";

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

type FormData = z.infer<typeof schema>;

export default function LoginForm() {
  const router = useRouter();
  const [role, setRole] = useState<Role>("customer");
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const onSubmit = async (data: FormData) => {
    const target = {
      customer: "/dashboard/customer",
      technician: "/dashboard/technician",
      company: "/dashboard/company",
      admin: "/dashboard/admin",
    }[role];
    router.push(target);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="w-full max-w-md mx-auto"
    >
      {/* Mobile logo */}
      <div className="flex lg:hidden items-center gap-2 mb-8">
        <div className="w-8 h-8 rounded-lg bg-[#FF6224] flex items-center justify-center">
          <Wrench className="w-4 h-4 text-white" />
        </div>
        <span className="font-heading font-bold text-lg text-[#0D3330]">
          Maintenance<span className="text-[#FF6224]">Hub</span>
        </span>
      </div>

      {/* Heading */}
      <div className="mb-7">
        <h2 className="font-heading text-2xl xl:text-3xl font-extrabold text-[#0D3330]">Welcome back</h2>
        <p className="text-gray-500 text-sm mt-1">Sign in to your Maintenance Hub account</p>
      </div>

      {/* Role selector */}
      <div className="mb-6">
        <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mb-3">Sign in as</p>
        <RoleSelector selected={role} onChange={setRole} />
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1.5">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              {...register("email")}
              className={`
                w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm bg-white transition-colors
                focus:outline-none focus:ring-2 focus:ring-[#FF6224]/40 focus:border-[#FF6224]
                ${errors.email ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-gray-300"}
              `}
            />
          </div>
          {errors.email && (
            <p id="email-error" role="alert" className="text-xs text-red-500 mt-1.5 flex items-center gap-1">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Password */}
        <div>
          <div className="flex items-center justify-between mb-1.5">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="text-xs text-[#FF6224] font-medium hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6224] rounded"
            >
              Forgot password?
            </Link>
          </div>
          <div className="relative">
            <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              autoComplete="current-password"
              placeholder="Enter your password"
              aria-invalid={!!errors.password}
              aria-describedby={errors.password ? "password-error" : undefined}
              {...register("password")}
              className={`
                w-full pl-10 pr-11 py-2.5 rounded-xl border text-sm bg-white transition-colors
                focus:outline-none focus:ring-2 focus:ring-[#FF6224]/40 focus:border-[#FF6224]
                ${errors.password ? "border-red-400 bg-red-50" : "border-gray-200 hover:border-gray-300"}
              `}
            />
            <button
              type="button"
              aria-label={showPassword ? "Hide password" : "Show password"}
              onClick={() => setShowPassword((v) => !v)}
              className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6224] rounded"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
          {errors.password && (
            <p id="password-error" role="alert" className="text-xs text-red-500 mt-1.5">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Submit */}
        <motion.button
          type="submit"
          disabled={isSubmitting}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          className="
            w-full flex items-center justify-center gap-2 bg-[#FF6224] hover:bg-orange-600
            text-white font-semibold py-3 rounded-xl transition-colors mt-2
            focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6224] focus-visible:ring-offset-2
            disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-orange-200
          "
        >
          {isSubmitting ? (
            <span className="w-4 h-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
          ) : (
            <>
              Sign In
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </motion.button>
      </form>

      {/* Create account */}
      <p className="text-center text-sm text-gray-500 mt-6">
        Don&apos;t have an account?{" "}
        <Link
          href="/register/customer"
          className="text-[#FF6224] font-semibold hover:underline focus:outline-none focus-visible:ring-2 focus-visible:ring-[#FF6224] rounded"
        >
          Create Account
        </Link>
      </p>
    </motion.div>
  );
}
