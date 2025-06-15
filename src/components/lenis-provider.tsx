"use client";

import { useEffect } from "react";
import Lenis from "@studio-freight/lenis";

export default function LenisProvider() {
  useEffect(() => {
    let lenisInstance: Lenis | null = null;

    const startLenis = async () => {
      const { default: Lenis } = await import("@studio-freight/lenis");

      lenisInstance = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // smooth easing
        lerp: 0.1,
      });

      const raf = (time: number) => {
        lenisInstance?.raf(time);
        requestAnimationFrame(raf);
      };

      requestAnimationFrame(raf);
    };

    startLenis();

    return () => {
      lenisInstance?.destroy();
    };
  }, []);

  return null;
}
