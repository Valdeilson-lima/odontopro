import getSession from "@/lib/getSession";
import { Suspense } from "react";
import ServiceContent from "./_components/service-content";
import ServicesLoading from "./_components/services-loading";

export default async function Services() {
  const session = await getSession();
  return (
    <Suspense fallback={<ServicesLoading />}>
      <ServiceContent userId={session?.user?.id!} />
    </Suspense>
  );
}
