import Chat from "@/components/ChatWindow";
import PageShell from "@/components/PageShell";

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <PageShell>{children}</PageShell>;
}
