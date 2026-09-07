"use client";

import { format } from "date-fns";
import { useState } from "react";

export function ButtomPickerAppointments() {
  const [selectedDate, setSelectedDate] = useState(
    format(new Date(), "yyyy-MM-dd")
  );

  function handleChangeDate(event: React.ChangeEvent<HTMLInputElement>) {
    const newDate = event.target.value;
    setSelectedDate(newDate);

    // Atualiza a URL com o novo parâmetro de data
    const url = new URL(window.location.href);
    url.searchParams.set("date", newDate);
    window.history.pushState({}, "", url.toString());
  }
  return (
    <input
      type="date"
      id="start"
      className="border-2 px-2 py-1 rounded-md text-sm md:text-base"
      value={selectedDate}
      onChange={handleChangeDate}
      min={format(new Date(), "yyyy-MM-dd")}
    />
  );
}
