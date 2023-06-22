"use client";
import { useRef } from "react";
import { ChangeEvent } from "react";
interface DaySelectorProps {
  day: string;
  handleDayChange: (
    active: boolean | null,
    name: string,
    openFrom: string,
    openTo: string
  ) => void;
}
export default function DaySelector(props: DaySelectorProps) {
  const fromHour = useRef("");
  const toHour = useRef("");
  const active = useRef<boolean>(false);

  const handleChanges = (e: ChangeEvent) => {
    props.handleDayChange(
      active.current,
      props.day,
      fromHour.current,
      toHour.current
    );
  };
  return (
    <>
    <div className="flex items-center justify-center gap-4 w-full">
      <label className="relative inline-flex items-center cursor-pointer w-1/2">
        <input
          onChange={(e) => {
            active.current == false
              ? (active.current = true)
              : (active.current = false);
            handleChanges(e);
          }}
          type="checkbox"
          className="sr-only peer"
        />
        <div className="w-9 h-5 bg-breta-gray peer-focus:outline-none rounded-full peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-breta-blue"></div>
        <span className="ml-3 text-sm font-medium text-breta-blue">
          {props.day.charAt(0).toUpperCase() + props.day.slice(1)}
        </span>
      </label>
        <div className="flex gap-4 w-1/2">
          <input
            type="text"
            className="text-sm ring-1 ring-gray-300 rounded-md p-1 w-1/2 focus:outline-0"
            onChange={(e) => {
              fromHour.current = e.target.value;
              handleChanges(e);
            }}
          />
          <input
            type="text"
            className="text-sm ring-1 ring-gray-300 rounded-md p-1 w-1/2 focus:outline-0"
            onChange={(e) => {
              toHour.current = e.target.value;
              handleChanges(e);
            }}
          />
        </div>
    </div>
    </>
  );
}
