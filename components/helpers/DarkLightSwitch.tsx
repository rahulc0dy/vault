"use client";

import { useEffect, useState } from "react";
import { Laptop, Moon, Sun } from "lucide-react";

type Theme = "light" | "dark" | "system";

const DarkLightSwitch = () => {
  const [theme, setTheme] = useState<Theme>("system");

  // Get initial theme from localStorage or system preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as Theme | null;

    if (savedTheme) {
      setTheme(savedTheme);
    } else {
      setTheme("system");
    }
  }, []);

  useEffect(() => {
    const html = document.documentElement;
    if (theme === "system") {
      const systemPrefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      html.setAttribute("data-theme", systemPrefersDark ? "dark" : "light");
    } else {
      html.setAttribute("data-theme", theme);
    }

    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className="flex items-center rounded-lg bg-teal-50 px-2 focus-within:outline focus-within:outline-gray-500/50 dark:bg-teal-900/20">
      <span className="text-foreground">
        {theme === "light" && <Sun size={20} />}
        {theme === "dark" && <Moon size={20} />}
        {theme === "system" && <Laptop size={20} />}
      </span>
      <select
        value={theme}
        onChange={(e) => setTheme(e.target.value as Theme)}
        className="rounded-md px-2 py-1 focus:outline-none"
      >
        <option
          value="light"
          className="bg-teal-50 text-teal-950 dark:bg-zinc-900 dark:text-teal-50"
        >
          Light
        </option>
        <option
          value="dark"
          className="bg-teal-50 text-teal-950 dark:bg-zinc-900 dark:text-teal-50"
        >
          Dark
        </option>
        <option
          value="system"
          className="bg-teal-50 text-teal-950 dark:bg-zinc-900 dark:text-teal-50"
        >
          System
        </option>
      </select>
    </div>
  );
};

export default DarkLightSwitch;
