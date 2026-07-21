"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/Auth/FormInput";
import AuthButton from "@/components/Auth/AuthButton";
import { ResetFormData, resetSchema } from "@/lib/validations/resetSchema";
import { requestPasswordReset } from "@/lib/auth/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";

export default function ForgotPasswordPage() {
  const [authError, setAuthError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [googleLoading, setGoogleLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetFormData>({
    resolver: zodResolver(resetSchema),
  });

  const onSubmit = async (data: ResetFormData) => {
    setAuthError(null);
    setLoading(true);
    const { error } = await requestPasswordReset({
      email: data.email,
      // redirectTo: "/login",
    });
    if (error) {
      setAuthError(error.message ?? "Invalid email .");
      setLoading(false);
    } else {
      setLoading(false);
      setSent(true);
    }
  };
  return sent ? (
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
          Forgot Password
        </h1>
        <p className="text-center text-gray-400">
          If you provided a valid email address, Please check your email for a
          reset link.
        </p>
      </div>
    </div>
  ) : (
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
          Forgot Password
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3">
            <FormInput
              label="Email"
              type="email"
              placeholder="Enter your email"
              register={register("email")}
              error={errors.email}
            />
          </div>

          {authError && (
            <p className="text-sm text-red-400 mb-3">{authError}</p>
          )}
          <AuthButton
            className="w-full bg-accent text-background py-2 rounded-lg hover:bg-accent-hover transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Sending..." : "Send Reset Link"}
          </AuthButton>
        </form>
      </div>
    </div>
  );
}
