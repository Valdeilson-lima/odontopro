"use client";

import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Calendar as CalendarIcon } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface DateTimePickerProps {
  minDate?: Date;
  className?: string;
  initialDate?: Date;
  onChange?: (date: Date) => void;
}

export function DateTimePicker({
  minDate,
  className,
  initialDate,
  onChange,
}: DateTimePickerProps) {
  const [date, setDate] = useState(initialDate ?? new Date());
  const [open, setOpen] = useState(false);

  const handleDateChange = (selectedDate: Date | null) => {
    if (selectedDate) {
      console.log("Selected date:", selectedDate);
      setDate(selectedDate);
      onChange?.(selectedDate);
      setOpen(false);
    }
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger
        render={
          <Button
            variant="outline"
            data-empty={!date}
            className="justify-start text-left font-normal data-[empty=true]:text-muted-foreground cursor-pointer w-full"
          />
        }
      >
        <CalendarIcon />
        {date ? (
          format(date, "dd/MM/yyyy", { locale: ptBR })
        ) : (
          <span>Selecione uma data</span>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          required
          selected={date}
          onSelect={handleDateChange}
          locale={ptBR}
          disabled={{ before: minDate ?? new Date() }}
          className={className}
        />
      </PopoverContent>
    </Popover>
  );
}
