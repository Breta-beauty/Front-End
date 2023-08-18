'use client';
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Calendar, momentLocalizer, View, Views } from "react-big-calendar";
import moment from "moment";
const localizer = momentLocalizer(moment);
import { useMemo } from "react";
import { CalendarEventCard } from "@/components/CalendarEventCard";

export default function Citas() {
  const events = [
    {
      service: "Corte de Cabello",
      client: "Derek Alvarado",
      pay: "$150.00",
      id: 0,
      start: new Date(2023, 7, 9, 9, 0, 0),
      end: new Date(2023, 7, 9, 13, 0, 0),
      resourceId: 1,
    },
    {
      service: "Corte de Cabello",
      client: "Carlos Acosta",
      pay: "$200.00",
      id: 2,
      start: new Date(2023, 7, 9, 8, 30, 0),
      end: new Date(2023, 7, 9, 13, 30, 0),
      resourceId: [2],
    },
    {
      service: "Corte de Cabello",
      client: "Alejandro Garcia",
      pay: "$210.00",
      id: 11,
      start: new Date(2023, 7, 9, 7, 0, 0),
      end: new Date(2023, 7, 9, 13, 30, 0),
      resourceId: 4,
    },
  ];
  const resourceMap = [
    { resourceId: 1, resourceTitle: "Empleado 1" },
    { resourceId: 2, resourceTitle: "Empleado 2" },
    { resourceId: 3, resourceTitle: "Empleado 3" },
    { resourceId: 4, resourceTitle: "Empleado 4" },
  ];
  const { defaultDate, views } = useMemo(
    () => ({
      defaultDate: new Date().setHours(0, 0, 0, 0),
      views: [Views.DAY, Views.WORK_WEEK],
    }),
    []
  );
  const customEventStyleGetter = () => {
    const style = {
      backgroundColor: "transparent", // Custom background color for events
      color: "black", // Custom background color for events
      border: "none", // Remove event border
      overflow: "visible",
      width:"100%"
    };

    return { style };
  };
  const components = {
    event: CalendarEventCard,
  };
  return (
    <>
        <Calendar
          eventPropGetter={customEventStyleGetter}
          components={components}
          defaultView={Views.DAY}
          events={events}
          localizer={localizer}
          resourceIdAccessor="resourceId"
          resources={resourceMap}
          resourceTitleAccessor="resourceTitle"
          step={60}
          views={views}
        />
    </>
  );
}
