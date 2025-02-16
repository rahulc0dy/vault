import React from "react";
import Link from "next/link";
import DarkLightSwitch from "@/components/helpers/DarkLightSwitch";
import MobileNav from "@/components/MobileNav";

const NavBar = () => {
  return (
    <div className="sticky w-full border-b border-teal-100 dark:border-teal-950 dark:bg-zinc-900">
      <nav className="wrapper">
        <div className="flex w-full justify-between py-3 md:items-center">
          <Link href="/" className="font-code text-lg font-extrabold">
            c0dy_blogs
          </Link>
          {/* Desktop Navigation */}
          <div className="hidden flex-row items-center gap-5 text-lg font-bold text-teal-950 md:flex dark:text-teal-100">
            <Link href="/blogs" className="hidden md:block">
              blogs
            </Link>
            <Link
              href="https://portfolio-webapp.framer.ai"
              className="hidden md:block"
              target={`_blank`}
            >
              about
            </Link>
            <Link href="/create" className="hidden md:block">
              create
            </Link>
            <DarkLightSwitch />
          </div>

          {/* Mobile Navigation */}
          <MobileNav />
        </div>
      </nav>
    </div>
  );
};
export default NavBar;
