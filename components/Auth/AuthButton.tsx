"use client";
export default function AuthButton({
  className,
  children,
  onClick,
  disabled,
}: {
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="submit"
      disabled={disabled}
      onClick={onClick}
      className={`  text-gray-200  cursor-pointer shadow-md px-2.5 py-0.5 rounded-md  w-fit sm:text-base  transition-colors duration-200 ${className}`}
    >
      {children}
    </button>
  );
}
