"use client";
export default function AuthButton({
  className,
  children,
  onClick,
  disabled,
  type = "submit",
}: {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: "submit" | "button";
}) {
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`shadow-md rounded-md w-fit sm:text-base transition-colors duration-200 disabled:cursor-not-allowed ${
        disabled ? "" : "cursor-pointer"
      } ${className}`}
    >
      {children}
    </button>
  );
}
