"use client";

import React, { useState } from "react";
import Link from "next/link";
import DarkLightSwitch from "@/components/helpers/DarkLightSwitch";

const MobileNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <label className="z-50 flex w-8 flex-col gap-2 md:hidden">
        <input
          className="peer hidden"
          type="checkbox"
          checked={isOpen}
          onChange={() => setIsOpen(!isOpen)}
        />
        <div className="h-[3px] w-1/2 origin-right rounded-2xl bg-black duration-500 peer-checked:-translate-x-[12px] peer-checked:-translate-y-[1px] peer-checked:rotate-[225deg] dark:bg-teal-50"></div>
        <div className="h-[3px] w-full rounded-2xl bg-black duration-500 peer-checked:-rotate-45 dark:bg-teal-50"></div>
        <div className="h-[3px] w-1/2 origin-left place-self-end rounded-2xl bg-black duration-500 peer-checked:translate-x-[12px] peer-checked:translate-y-[1px] peer-checked:rotate-[225deg] dark:bg-teal-50"></div>
      </label>
      {isOpen && (
        <>
          <div className="fixed inset-0 z-40 bg-white dark:bg-zinc-950"></div>
          <div className="absolute top-10 right-0 left-0 z-50 mt-5 flex flex-col items-center gap-5 text-lg font-bold text-teal-950 md:hidden dark:text-teal-100">
            <Link href="/blogs" className="">
              blogs
            </Link>
            <Link
              href="https://portfolio-webapp.framer.ai"
              className=""
              target={`_blank`}
            >
              about
            </Link>
            <Link href="/create" className="">
              create
            </Link>
            <DarkLightSwitch />
          </div>
        </>
      )}
    </>
  );
};
export default MobileNav;
