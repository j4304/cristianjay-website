"use client";

import TiltedCard from "@/components/tilted-card";
import { useState } from "react";
import { motion } from "framer-motion";
import { images } from "@/lib/gallery-images"
import { StaticImageData } from "next/image";


export default function Gallery() {
  return (
    <>
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="px-6 md:px-16 py-12"
    >
      <div className="columns-1 sm:columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4 overflow-visible relative z-0">
        {images.map((img, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              delay: i * 0.05,
              duration: 0.4,
              ease: "easeOut",
            }}
            className="break-inside-avoid w-full relative overflow-visible z-10 isolate"
          >
            <ImageWithSkeleton src={img.src} caption={img.caption} />
          </motion.div>
        ))}
      </div>
    </motion.div>
     <footer className="bg-zinc-900 text-white mt-auto py-4 overflow-hidden">
        <div className="container relative mx-auto px-2 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">

          <div className="z-10 flex items-center gap-3"></div>

          <div className="z-10 text-xs text-zinc-400 text-center md:text-right">
            © {new Date().getFullYear()} Cristian Jay Cosep. All rights
            reserved.
          </div>
        </div>
      </footer>
    </>
  );
}

function ImageWithSkeleton({ src, caption }: { src: string | StaticImageData; caption: string }) {
  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div className="relative w-full group">
      {!isLoaded && (
        <div className="aspect-[4/5] w-full rounded-xl bg-neutral-100 animate-pulse" />
      )}
      <div
        className={`${
          isLoaded ? "opacity-100" : "opacity-0"
        } transition-opacity duration-500`}
      >
        <TiltedCard
          imageSrc={src}
          captionText={caption}
          containerWidth="100%"
          containerHeight="auto"
          scaleOnHover={1.05}
          rotateAmplitude={10}
          showTooltip={true}
          showMobileWarning={false}
          displayOverlayContent={false}
          onLoadComplete={() => setIsLoaded(true)}
        />
      </div>
    </div>
  );
}
