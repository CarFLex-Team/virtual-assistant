"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/Auth/FormInput";
import AuthButton from "@/components/Auth/AuthButton";
import { signinSchema, SigninFormData } from "@/lib/validations/signinSchema";
import { signIn } from "@/lib/auth/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignInPage() {
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    const { error } = await signIn.email({
      email: data.email,
      password: data.password,
      callbackURL: "/",
    });

    if (error) {
      setAuthError(error.message ?? "Invalid email or password.");
      setLoading(false);
    } else {
      router.push("/");
    }

    // // success
    // const sessionRes = await fetch("/api/auth/session");
    // const session = await sessionRes.json();

    // const role = session?.user?.role;
    // router.push(role === "OWNER" ? "/owner/dashboard" : "/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <div className="w-full max-w-md rounded-2xl bg-background p-8 shadow-xl border border-gray-200">
        {/* <div className="mb-4 flex justify-center">
          <AnimatedLogo size={2} />
        </div> */}

        <h1 className="mb-4 text-center text-2xl font-semibold text-gray-100">
          Sign In
        </h1>

        <form className="">
          <div className=" space-y-3">
            <FormInput
              label="Email"
              type="email"
              placeholder="Enter your email"
              register={register("email")}
              error={errors.email}
            />
            <div className=" relative">
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
                className="text-sm text-gray-400 hover:underline absolute right-3 top-9"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <a
            href="/forgot-password"
            className="font-medium text-primary underline underline-offset-4 hover:no-underline text-sm text-gray-400 mb-4 block mt-2 w-fit"
          >
            Forget Password?
          </a>

          {/* Auth error */}
          {authError && <p className="text-sm text-red-400">{authError}</p>}
          <AuthButton
            className="w-full bg-sky-900 text-white py-2 rounded-lg hover:bg-sky-900/80 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
            onClick={handleSubmit(onSubmit)}
          >
            {isSubmitting ? "Processing..." : "Sign in"}
          </AuthButton>
        </form>
      </div>
    </div>
  );
}
