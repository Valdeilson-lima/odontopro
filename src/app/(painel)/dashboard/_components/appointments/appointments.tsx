import { getTimesClinic } from "../../_date-access/get-times-clinic";
import { ApointmentsList } from "./appointments-list";

export async function Apointments({ userId }: { userId: string }) {
  const { times } = await getTimesClinic({ userId: userId });
  return <ApointmentsList times={times} />;
}
