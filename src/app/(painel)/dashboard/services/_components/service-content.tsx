import { getAllServices } from "../_data-access/get-all-services";
import ServiceList from "./services-list";

interface ServiceContentProps {
  userId: string;
}

export default async function ServiceContent({ userId }: ServiceContentProps) {
  const services = await getAllServices({ userId });
  console.log("services", services);
  return <ServiceList />;
}
