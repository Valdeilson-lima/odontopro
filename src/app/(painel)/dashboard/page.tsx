import GetSession from "@/lib/getSession";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const session = await GetSession();

  if (!session) {
    redirect("/");
  }

  console.log("Session:", session.user);
  return (
    <div>
      <h1>Dashboard</h1>

      <div className="w-full h-150 bg-gray-200 mb-10"></div>
      <div className="w-full h-150 bg-gray-500 mb-10"></div>
      <div className="w-full h-150 bg-gray-700 mb-10"></div>
    </div>
  );
}
