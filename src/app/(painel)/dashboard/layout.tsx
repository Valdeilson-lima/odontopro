import GetSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import { SidebarDashboard } from "./_componentes/sidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await GetSession();

  if (!session) {
    redirect("/");
  }

  return (
    <>
      <SidebarDashboard>{children}</SidebarDashboard>
    </>
  );
}
