import { getInfoUser } from "./_data-access/get-info-user";
import getSession from "@/lib/getSession";

export default async function Profile() {
  const session = await getSession();
  console.log("Session data:", session);

  const user = await getInfoUser({ userId: session?.user?.id || "" });
  console.log("User data:", user);

  return (
    <div className="flex flex-col min-h-screen">
      <div className="grow">
        <h1 className="text-3xl font-bold text-center mt-8">Perfil</h1>
        <p className="text-center mt-4">Bem-vindo ao seu perfil!</p>
      </div>
    </div>
  );
}
