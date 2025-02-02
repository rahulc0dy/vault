"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const DEFAULT_DELAY_MS = 30; // Delay between updates in milliseconds

// Custom scramble function: reveals a percentage of the final text and replaces the rest with random characters.
const scrambleText = (
  finalText: string,
  progress: number,
  charSet: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()"
): string => {
  const revealCount = Math.floor(progress * finalText.length);
  let result = "";
  for (let i = 0; i < finalText.length; i++) {
    if (i < revealCount) {
      result += finalText[i];
    } else {
      const randomIndex = Math.floor(Math.random() * charSet.length);
      result += charSet[randomIndex];
    }
  }
  return result;
};

const ScrambleText = ({
  content,
  classes,
}: {
  content: string;
  classes?: string[];
}) => {
  const lastUpdateRef = useRef<number>(0);

  useGSAP(() => {
    const obj = { progress: 0 };

    const tl = gsap.timeline({ defaults: { duration: 2, ease: "none" } });
    tl.to(obj, {
      duration: 3,
      progress: 1,
      onUpdate: () => {
        const element = document.getElementById("scrambler");
        if (!element) return;

        // Always update if progress has reached 1 (to ensure the final text is shown)
        if (obj.progress >= 1) {
          element.textContent = content;
          return;
        }

        const now = Date.now();
        if (now - lastUpdateRef.current < DEFAULT_DELAY_MS) return;
        lastUpdateRef.current = now;

        const scrambled = scrambleText(content, obj.progress);
        element.textContent = scrambled;
      },
    });
  });

  return (
    <span className={classes?.length ? classes.join(" ") : ""} id="scrambler">
      {content}
    </span>
  );
};

export default ScrambleText;
