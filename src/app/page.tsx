"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import Loader from "@/components/loader";
import PreloadImages from "@/components/preload-images";
import PreloadAssets from "@/components/preload-assets";
import Canvas from "./canvas";

const Hero = dynamic(() => import("./hero"), { ssr: false });

export default function Home() {
  const [loaderDone, setLoaderDone] = useState(false);
  const [canvasReady, setCanvasReady] = useState(false);
  const [heroReady, setHeroReady] = useState(false);

  const allReady = loaderDone && canvasReady && heroReady;

  return (
    <>
      <PreloadAssets />
      <PreloadImages />

      {/* Loader stays on top until assets are ready */}
      {!loaderDone && (
        <Loader
          onFinish={() => {
            setLoaderDone(true);
          }}
        />
      )}

      {/* App is always mounted but visually hidden until ready */}
      <main
        className={`transition-opacity duration-700 ${
          allReady ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <Canvas onReady={() => setCanvasReady(true)} />
        <Hero onReady={() => setHeroReady(true)} />
      </main>
    </>
  );
}
