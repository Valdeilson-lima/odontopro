import getSession from "@/lib/getSession";
import HistoryList from "./_components/history-list";
import { getHistoryAppointments } from "./_data-access/get-history-appointments";

export default async function HistoryPage() {
  const session = await getSession();

  const result = await getHistoryAppointments({
    userId: session?.user?.id!,
  });

  return <HistoryList appointments={result.data || []} error={result.error} />;
}
