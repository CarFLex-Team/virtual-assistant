import Chat from "@/components/ChatWindow";
import PageShell from "@/components/PageShell";
import { auth } from "@/lib/auth/auth";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
export default async function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  const user = session?.user.id;
  if (!user) {
    redirect("/login");
  }
  return <PageShell>{children}</PageShell>;
}
