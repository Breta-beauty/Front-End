"use client";
import Link from "next/link";
const IconPack = require("../public/icons/Icons");
const Icons = new IconPack();

export default function BottomNavDrawer() {
  return (
    <>
      <div className="flex justify-around p-4 fixed bottom-0 left-0 z-50 w-full h-16 bg-breta-light-gray">
        <Link
          href={"/IndexUser"}
          className="flex flex-1 justify-center items-center text-center"
        >
          <Icons.Home />
        </Link>
        <Link
          href={"/IndexUser/calendar"}
          className="flex flex-1 justify-center items-center text-center"
        >
          <Icons.Calendar />
        </Link>
        <Link
          href={"/IndexUser/saved"}
          className="flex flex-1 justify-center items-center text-center"
        >
          <Icons.Heart />
        </Link>
        <Link
          href={"/IndexUser/profile"}
          className="flex flex-1 justify-center items-center text-center"
        >
          <Icons.User />
        </Link>
      </div>
    </>
  );
}
