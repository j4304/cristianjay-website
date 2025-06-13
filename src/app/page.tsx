"use client";
import Canvas from "./canvas";
import dynamic from "next/dynamic";

const Hero = dynamic(() => import("./hero"), { ssr: false });

export default function Home() {
  return (
    <div>
      <Canvas />
      <Hero />
    </div>
  );
}
