"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/Auth/FormInput";
import AuthButton from "@/components/Auth/AuthButton";
import { signinSchema, SigninFormData } from "@/lib/validations/signinSchema";
import { signIn } from "@/lib/auth/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles } from "lucide-react";

export default function SignInPage() {
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SigninFormData>({
    resolver: zodResolver(signinSchema),
  });

  const onSubmit = async (data: SigninFormData) => {
    setAuthError(null);
    const { error } = await signIn.email({
      email: data.email,
      password: data.password,
      callbackURL: "/",
    });

    if (error) {
      setAuthError(error.message ?? "Invalid email or password.");
    } else {
      router.push("/");
    }
  };

  return (
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
          Sign In
        </h1>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-3">
            <FormInput
              label="Email"
              type="email"
              placeholder="Enter your email"
              register={register("email")}
              error={errors.email}
            />
            <div className="relative">
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
                className="text-sm text-slate-400 hover:text-slate-200 hover:underline absolute right-3 top-9 cursor-pointer"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <a
            href="/forgot-password"
            className="font-medium text-accent underline underline-offset-4 hover:no-underline text-sm mb-4 block mt-2 w-fit"
          >
            Forgot password?
          </a>

          {authError && (
            <p className="text-sm text-red-400 mb-3">{authError}</p>
          )}

          <AuthButton
            className="w-full bg-accent text-background py-2 rounded-lg hover:bg-accent-hover transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Processing..." : "Sign in"}
          </AuthButton>
        </form>
      </div>
    </div>
  );
}
