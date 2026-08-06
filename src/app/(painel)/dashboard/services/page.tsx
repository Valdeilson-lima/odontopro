import getSession from "@/lib/getSession";
import ServiceContent from "./_components/service-content";

export default async function Services() {
  const session = await getSession();
  return <ServiceContent userId={session?.user?.id!} />;
}
