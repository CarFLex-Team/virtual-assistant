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
  const { className, onClick, children, item, isActive } = props;

  return (
    <Link
      href={`${item.href}`}
      className={`flex gap-2 items-center text-left w-full  font-medium text-sm transition-colors text-gray-300 hover:bg-zinc-700 ${className} ${
        isActive
          ? "text-white bg-zinc-700 shadow-[0_0px_6px_rgba(0,0,0,0.5)]  "
          : //+ colorMap[item.label]
            ""
      }`}
      onClick={onClick}
    >
      {children}
    </Link>
  );
}
