export function isSlotinThePast(slotTime: string, selectedDate: Date) {
  const [hours, minutes] = slotTime.split(":").map(Number);
  const slotDateTime = new Date(
    selectedDate.getFullYear(),
    selectedDate.getMonth(),
    selectedDate.getDate(),
    hours,
    minutes,
    0,
    0
  );

  return slotDateTime < new Date();
}
