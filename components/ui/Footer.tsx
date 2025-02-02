import React from "react";
import { CopyrightIcon } from "lucide-react";
import Link from "next/link";

const Footer = () => {
  return (
    <div className="w-full bg-teal-50 py-5 dark:bg-teal-950/30">
      <footer className="wrapper">
        <div className="grid grid-cols-1 gap-5 pb-4 md:grid-cols-[1fr_2fr]">
          <div className="flex h-full flex-col justify-center">
            <h5 className="font-code text-xl font-bold">c0dy_blogs</h5>
            <p className="font-handwriting text-sm text-teal-700 dark:text-teal-50/80">
              by rahulc0dy
            </p>
            <article className="max-w-[50ch] py-4 text-sm text-gray-700 dark:text-gray-300">
              Lorem ipsum dolor sit amet, consectetur adipisicing elit. Culpa,
            </article>
          </div>
          <div className="grid grid-cols-1 tracking-wider md:grid-cols-3">
            <div className="flex flex-col justify-end gap-2">
              <h3 className="pb-3 text-base font-medium" id="footer-product-3">
                Creator
              </h3>
              <Link
                href="/"
                className="block opacity-85 transition-all duration-150 hover:text-teal-600 dark:hover:text-teal-200"
              >
                Portfolio
              </Link>
              <Link
                href="/"
                className="block opacity-85 transition-all duration-150 hover:text-teal-600 dark:hover:text-teal-200"
              >
                Contact
              </Link>
              <Link
                href="/"
                className="block opacity-85 transition-all duration-150 hover:text-teal-600 dark:hover:text-teal-200"
              >
                About
              </Link>
              <Link
                href="/"
                className="block opacity-85 transition-all duration-150 hover:text-teal-600 dark:hover:text-teal-200"
              >
                Location
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="pb-3 text-base font-medium" id="footer-product-3">
                Links
              </h3>
              <Link
                href="/"
                className="block opacity-85 transition-all duration-150 hover:text-teal-600 dark:hover:text-teal-200"
              >
                Github
              </Link>
              <Link
                href="/"
                className="block opacity-85 transition-all duration-150 hover:text-teal-600 dark:hover:text-teal-200"
              >
                Medium
              </Link>
              <Link
                href="/"
                className="block opacity-85 transition-all duration-150 hover:text-teal-600 dark:hover:text-teal-200"
              >
                LinkedIn
              </Link>
            </div>
            <div className="flex flex-col gap-2">
              <h3 className="pb-3 text-base font-medium" id="footer-product-3">
                Product
              </h3>
              <Link
                href="/"
                className="block opacity-85 transition-all duration-150 hover:text-teal-600 dark:hover:text-teal-200"
              >
                Features
              </Link>
              <Link
                href="/"
                className="block opacity-85 transition-all duration-150 hover:text-teal-600 dark:hover:text-teal-200"
              >
                Customers
              </Link>
              <Link
                href="/"
                className="block opacity-85 transition-all duration-150 hover:text-teal-600 dark:hover:text-teal-200"
              >
                Why us?
              </Link>
              <Link
                href="/"
                className="block opacity-85 transition-all duration-150 hover:text-teal-600 dark:hover:text-teal-200"
              >
                Pricing
              </Link>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center justify-between border-t border-teal-800/20 pt-4 md:flex-row dark:border-gray-200/50">
          <span className="text-gray-500/80 dark:text-gray-50/80">
            <CopyrightIcon className="inline size-4" /> Rahul Chakraborty 2024
          </span>
          <div className="flex flex-row items-center justify-between gap-3">
            <Link
              href="/"
              className="transition-all duration-150 hover:text-teal-600 dark:hover:text-teal-200"
            >
              T&C
            </Link>
            <Link
              href="/"
              className="transition-all duration-150 hover:text-teal-600 dark:hover:text-teal-200"
            >
              Cookies
            </Link>
            <Link
              href="/"
              className="transition-all duration-150 hover:text-teal-600 dark:hover:text-teal-200"
            >
              Privacy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};
export default Footer;
