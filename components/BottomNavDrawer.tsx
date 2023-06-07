'use client'
import Link from "next/link";
const IconPack = require("../public/icons/Icons");
const Icons = new IconPack();

export default function BottomNavDrawer() {
  return (
    <div className="flex justify-around p-4">
      <Link href={} className="flex flex-1 justify-center items-center text-center">
        <Icons.Home />
      </Link>
      <Link href={} className="flex flex-1 justify-center items-center text-center">
        <Icons.Calendar />
      </Link>
      <Link href={} className="flex flex-1 justify-center items-center text-center">
        <Icons.Heart />
      </Link>
      <Link href={} className="flex flex-1 justify-center items-center text-center">
        <Icons.User />
      </Link>
    </div>
  );
}
