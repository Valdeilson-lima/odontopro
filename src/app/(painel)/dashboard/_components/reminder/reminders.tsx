import { getReminders } from "../../_date-access/get-reminders";
import { ReminderContent } from "./reminder-list";

export default async function Reminders({ userId }: { userId: string }) {
  const reminders = await getReminders({ userId });

  return <ReminderContent reminders={reminders} />;
}
