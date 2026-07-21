"use client";

import { FieldError } from "react-hook-form";

interface FormInputProps {
  label: string;
  type?: string;
  placeholder?: string;
  register: any;
  error?: FieldError;
}

export default function FormInput({
  label,
  type = "text",
  placeholder,
  register,
  error,
}: FormInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-slate-300">{label}</label>

      <input
        type={type}
        placeholder={placeholder}
        {...register}
        className={`h-11 w-full rounded-lg border px-3 bg-background text-sm outline-none transition text-slate-100 placeholder:text-slate-500
          ${
            error
              ? "border-red-500 focus:ring-red-500"
              : "border-border focus:ring-accent"
          }
          focus:ring-1`}
      />

      {error && <p className="text-xs text-red-400">{error.message}</p>}
    </div>
  );
}
