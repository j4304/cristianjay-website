"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { isModelCached } from "@/lib/is-model-cached";

export default function Loader({ onFinish }: { onFinish: () => void }) {
  const [progress, setProgress] = useState(0);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const modelUrl = "/models/jack.glb";
    const cached = isModelCached(modelUrl);

    const minDuration = cached ? 800 : 3000;
    const increment = cached ? 8 : 2;
    const intervalMs = cached ? 30 : 80;

    const start = Date.now();

    const interval = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(prev + increment, 100);

        if (next >= 100) {
          clearInterval(interval);

          const elapsed = Date.now() - start;
          const waitTime = Math.max(minDuration - elapsed, 0);

          setTimeout(() => {
            setFadeOut(true);
            setTimeout(onFinish, 500);
          }, waitTime);
        }

        return next;
      });
    }, intervalMs);
  }, [onFinish]);

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-black flex items-center justify-center transition-opacity duration-700 ${
        fadeOut ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
    >
      <div className="relative w-40 h-40">
        <Image
          src="/images/jack.svg"
          alt="Loading"
          fill
          className="opacity-20 object-contain"
        />
        <div
          className="absolute inset-0 overflow-hidden"
          style={{
            clipPath: `inset(${100 - progress}% 0 0 0)`,
            transition: "clip-path 0.4s ease-in-out",
          }}
        >
          <Image
            src="/images/jack.svg"
            alt="Loading"
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
