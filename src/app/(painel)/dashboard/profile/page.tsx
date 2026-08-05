import getSession from "@/lib/getSession";
import { redirect } from "next/navigation";
import ProfileContent from "./_componentes/profile";
import { getUserData } from "./_data-access/get-info-user";

export default async function Profile() {
  const session = await getSession();
  const user = await getUserData({ userId: session?.user.id || "" });

  if (!user) {
    redirect("/");
  }
  return <ProfileContent user={user} />;
}
