"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/Auth/FormInput";
import AuthButton from "@/components/Auth/AuthButton";
import { resetPassword } from "@/lib/auth/auth-client";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
// import AnimatedLogo from "@/components/AnimatedLogo";
import {
  ResetPassFormData,
  resetPassSchema,
} from "@/lib/validations/resetSchema";

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
    <div className="flex min-h-screen items-center justify-center bg-brand-dark p-4">
      <div className="w-full max-w-md rounded-2xl bg-brand-dark p-8 shadow-xl border border-gray-200">
        {/* <div className="mb-4 flex justify-center">
          <AnimatedLogo size={2} />
        </div> */}

        <h1 className="mb-4 text-center text-2xl font-semibold text-gray-100">
          Reset Password
        </h1>

        <form className="">
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

          {/* Auth error */}
          {authError && <p className="text-sm text-brand-red">{authError}</p>}
          <AuthButton
            // type="submit"
            className="w-full bg-brand-red text-white py-2 rounded-lg hover:bg-brand-red/80 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting || loading}
            onClick={handleSubmit(onSubmit)}
          >
            {isSubmitting ? "Processing..." : "Reset Password"}
          </AuthButton>
        </form>
      </div>
    </div>
  ) : (
    <div className="flex min-h-screen items-center justify-center bg-brand-dark p-4">
      <div className="w-full max-w-md rounded-2xl bg-brand-dark p-8 shadow-xl border border-gray-200">
        {/* <div className="mb-4 flex justify-center">
          <AnimatedLogo size={2} />
        </div> */}
        <p className="text-center text-gray-300">
          Invalid or expired reset token.
        </p>
      </div>
    </div>
  );
}
