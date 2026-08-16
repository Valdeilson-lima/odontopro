"use client";

import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";
import { TimeSlot } from "./schedule-content";

interface ScheduleTimesListProps {
  selectedTime: string | null;
  availableTimeSlots: TimeSlot[];
  onSelectTime: (time: string) => void;
}

export default function ScheduleTimesList({
  selectedTime,
  availableTimeSlots,
  onSelectTime,
}: ScheduleTimesListProps) {
  return (
    <div className="grid grid-cols-5 gap-2">
      {availableTimeSlots.map((slot) => {
        const button = (
          <Button
            onClick={() => onSelectTime(slot.time)}
            type="button"
            variant="outline"
            disabled={!slot.isAvailable}
            key={slot.time}
            className={cn(
              "h-10 w-full select-none",
              slot.isAvailable && "cursor-pointer",
              selectedTime === slot.time &&
                "border-2 border-emerald-500 text-emerald-900"
            )}
          >
            {slot.time}
          </Button>
        );

        if (!slot.isAvailable) {
          return (
            <Tooltip key={slot.time}>
              <TooltipTrigger
                render={<span className="block w-full pointer-events-auto" />}
              >
                {button}
              </TooltipTrigger>
              <TooltipContent>Horário bloqueado</TooltipContent>
            </Tooltip>
          );
        }

        return button;
      })}
    </div>
  );
}
