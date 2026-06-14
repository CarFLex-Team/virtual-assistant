"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormInput from "@/components/Auth/FormInput";
import AuthButton from "@/components/Auth/AuthButton";
import { signupSchema, SignupFormData } from "@/lib/validations/signupSchema";
import { signUp, signIn } from "@/lib/auth/auth-client";
import { useState } from "react";
import { useRouter } from "next/navigation";
// import AnimatedLogo from "@/components/AnimatedLogo";

export default function SignUpPage() {
  const router = useRouter();
  const [authError, setAuthError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
  });

  const onSubmit = async (data: SignupFormData) => {
    setAuthError(null);
    setLoading(true);
    const { error } = await signUp.email({
      name: data.name,
      email: data.email,
      password: data.password,
      company: Number(data.company),
      callbackURL: "/",
    });

    if (error) {
      setAuthError(error.message ?? "Something went wrong. Please try again.");
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
  async function handleGoogle() {
    setGoogleLoading(true);
    await signIn.social({ provider: "google", callbackURL: "/" });
    setGoogleLoading(false);
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-dark p-4">
      <div className="w-full max-w-md rounded-2xl bg-brand-dark p-8 shadow-xl border border-gray-200">
        {/* <div className="mb-4 flex justify-center">
          <AnimatedLogo size={2} />
        </div> */}

        <h1 className="mb-4 text-center text-2xl font-semibold text-gray-100">
          Sign Up
        </h1>

        <form className="">
          <div className=" space-y-3">
            <FormInput
              label="Name"
              type="text"
              placeholder="Enter your name"
              register={register("name")}
              error={errors.name}
            />
            <FormInput
              label="Email"
              type="email"
              placeholder="Enter your email"
              register={register("email")}
              error={errors.email}
            />
            <FormInput
              label="Company"
              type="number"
              placeholder="Enter your company ID"
              register={register("company")}
              error={errors.company}
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
                className="text-sm text-primary hover:underline absolute right-3 top-9"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <p className="font-medium text-primary text-sm text-gray-400 mb-4 block mt-2">
            Already have an account?{" "}
            <a
              href="/login"
              className="underline underline-offset-4 hover:no-underline"
            >
              Login
            </a>
          </p>

          {/* Auth error */}
          {authError && <p className="text-sm text-brand-red">{authError}</p>}
          <AuthButton
            // type="submit"
            className="w-full bg-brand-red text-white py-2 rounded-lg hover:bg-brand-red/80 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isSubmitting}
            onClick={handleSubmit(onSubmit)}
          >
            {isSubmitting ? "Processing..." : "Sign up"}
          </AuthButton>
        </form>
      </div>
    </div>
  );
}
