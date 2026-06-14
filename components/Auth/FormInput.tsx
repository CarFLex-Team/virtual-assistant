"use client";

import { useState } from "react";
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
  const isPassword = type === "password";

  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-gray-300">{label}</label>

      <div className="">
        <input
          type={type}
          placeholder={placeholder}
          {...register}
          className={`h-11 w-full rounded-lg border px-3 bg-brand-dark text-sm outline-none transition
            ${
              error
                ? "border-brand-red focus:ring-brand-red"
                : "border-gray-300  focus:ring-brand-gray"
            }
            focus:ring-1`}
        />
      </div>

      {error && <p className="text-xs text-brand-red">{error.message}</p>}
    </div>
  );
}
