"use client";
import { useState } from "react";
interface DaySelectorProps {
  day: string;
  handleDayChange: (
    key:string,
    type: string,
    event : boolean | string,
  ) => void;
}
export default function DaySelector(props: DaySelectorProps) {
  const [activeDay, setActiveDay] = useState<boolean>(false)
  const handleChanges = (event: boolean | string, type:string) => {
    props.handleDayChange(
      props.day,
      type,
      event
    );
  };
  const handleDayChange = (event: boolean) => {
    setActiveDay(event)
  };
  return (
    <>
    <div className="flex items-center justify-center gap-4 w-full">
      <label className="relative inline-flex items-center cursor-pointer w-1/3">
        <input
          onChange={(e) =>{handleChanges(e.target.checked, "day");handleDayChange(e.target.checked)}}
          type="checkbox"
          className="sr-only peer"
        />
        <div className="w-9 h-5 bg-breta-gray peer-focus:outline-none rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-breta-blue"></div>
        <span className="ml-3 text-sm font-medium text-breta-blue">
          {props.day.charAt(0).toUpperCase() + props.day.slice(1)}
        </span>
      </label>
        <div className="flex gap-4 w-2/3" >
          <input
            type="time"
            disabled={activeDay == true ? false : true}
            className={`text-sm ring-1 ring-gray-300 rounded-md p-1 w-1/2 cursor-text focus:outline-0 disabled:ring-0 disabled:bg-gray-200 disabled:cursor-not-allowed`}
            onChange={e =>handleChanges(e.target.value, "from")}
          />
          <input
            type="time"
            disabled={activeDay == true ? false : true}
            className={`text-sm ring-1 ring-gray-300 rounded-md p-1 w-1/2 cursor-text focus:outline-0 disabled:ring-0 disabled:bg-gray-200 disabled:cursor-not-allowed`}
            onChange={e =>handleChanges(e.target.value, "to")}
          />
        </div>
    </div>
    </>
  );
}
