"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/Auth/FormInput";
import AuthButton from "@/components/Auth/AuthButton";
import { resetPassword } from "@/lib/auth/auth-client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";

import {
  ResetPassFormData,
  resetPassSchema,
} from "@/lib/validations/resetSchema";
import { Sparkles } from "lucide-react";

export default function ResetPassword() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [authError, setAuthError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const token = searchParams.get("token");
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPassFormData>({
    resolver: zodResolver(resetPassSchema),
  });

  const onSubmit = async (data: ResetPassFormData) => {
    setAuthError(null);
    setLoading(true);
    const { error } = await resetPassword({
      newPassword: data.password,
      token: token ?? undefined,
    });

    if (error) {
      setAuthError(error.message ?? "Invalid password.");
      setLoading(false);
    } else {
      router.push("/login");
    }
  };

  return token ? (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md rounded-2xl bg-surface p-8 shadow-xl border border-border">
        <div className="mb-4 flex justify-center  items-center">
          <div className=" rounded-2xl bg-surface border border-border p-4 flex items-center justify-center gap-2">
            <Sparkles className="text-accent" size={26} />
            <p className="text-slate-100 font-semibold text-2xl tracking-tight">
              ELIARA
            </p>
          </div>
        </div>
        <h1 className="mb-4 text-center text-2xl font-semibold text-slate-100">
          Reset Password
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className=" relative mb-4">
            <FormInput
              label="Password"
              type={showPassword ? "text" : "password"}
              placeholder="Enter your password"
              register={register("password")}
              error={errors.password}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="text-sm text-primary hover:underline absolute right-3 top-9"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          {authError && (
            <p className="text-sm text-red-400 mb-3">{authError}</p>
          )}
          <AuthButton
            className="w-full bg-accent text-background py-2 rounded-lg hover:bg-accent-hover transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Reset Password"}
          </AuthButton>
        </form>
      </div>
    </div>
  ) : (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="flex min-h-screen items-center justify-center bg-background p-4">
        <div className="mb-4 flex justify-center  items-center">
          <div className=" rounded-2xl bg-surface border border-border p-4 flex items-center justify-center gap-2">
            <Sparkles className="text-accent" size={26} />
            <p className="text-slate-100 font-semibold text-2xl tracking-tight">
              ELIARA
            </p>
          </div>
        </div>
        <p className="text-center text-gray-300">
          Invalid or expired reset token.
        </p>
      </div>
    </div>
  );
}
