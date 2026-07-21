import type { ReactNode } from "react";
import Link from "next/link";
interface NavButtonProps {
  className?: string;
  onClick?: () => void;
  children?: ReactNode;
  item: { id: string; label: string; href: string };
  isActive?: boolean;
}

export default function NavButton(props: NavButtonProps) {
  const { className, onClick, children, item } = props;

  return (
    <Link
      href={`${item.href}`}
      className={`flex gap-2 items-center text-left w-full font-medium text-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${className}`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
