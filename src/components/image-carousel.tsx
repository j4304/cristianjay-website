"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Image from "next/image";

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(true);
  const [isLocked, setIsLocked] = useState(false);

  const extendedImages = [images[images.length - 1], ...images, images[0]];

  const transitionDuration = 700; // ms
  const autoPlayDelay = 5000;

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const failsafeRef = useRef<NodeJS.Timeout | null>(null);

  const goToIndex = useCallback(
    (index: number) => {
      if (isLocked) return;

      setIsLocked(true);
      setIsAnimating(true);
      setCurrentIndex(index);

      // 🔐 Failsafe unlock in case transitionEnd doesn’t fire
      if (failsafeRef.current) clearTimeout(failsafeRef.current);
      failsafeRef.current = setTimeout(
        () => setIsLocked(false),
        transitionDuration + 100
      );
    },
    [isLocked]
  );

  const goToPrev = useCallback(
    () => goToIndex(currentIndex - 1),
    [currentIndex, goToIndex]
  );
  const goToNext = useCallback(
    () => goToIndex(currentIndex + 1),
    [currentIndex, goToIndex]
  );

  // autoplay
  useEffect(() => {
    timeoutRef.current = setTimeout(goToNext, autoPlayDelay);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex, goToNext]);

  const handleTransitionEnd = () => {
    if (currentIndex === 0) {
      setIsAnimating(false);
      setCurrentIndex(images.length);
    } else if (currentIndex === images.length + 1) {
      setIsAnimating(false);
      setCurrentIndex(1);
    }
    // ✅ Clear lock when transition ends naturally
    setIsLocked(false);
  };

  useEffect(() => {
    if (!isAnimating) {
      const id = setTimeout(() => setIsAnimating(true), 30);
      return () => clearTimeout(id);
    }
  }, [isAnimating]);

  return (
    <div className="relative w-full max-w-[600px] aspect-video overflow-hidden rounded-xl shadow-md">
      <div
        className={`flex h-full w-full ${
          isAnimating ? "transition-transform duration-700 ease-in-out" : ""
        }`}
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
        onTransitionEnd={handleTransitionEnd}
      >
        {extendedImages.map((src, idx) => (
          <div key={idx} className="relative w-full h-full flex-shrink-0">
            <Image
              src={src}
              alt={`Slide ${idx}`}
              fill
              priority
              sizes="(max-width: 768px) 100vw, 600px"
              className="object-cover"
              quality={80}
            />
          </div>
        ))}
      </div>

      <button
        onClick={goToPrev}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-10
               rounded-full p-2 bg-black/40 text-white border border-white/30
               backdrop-blur-sm hover:scale-110 transition shadow-lg"
        aria-label="Previous slide"
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={goToNext}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-10
               rounded-full p-2 bg-black/40 text-white border border-white/30
               backdrop-blur-sm hover:scale-110 transition shadow-lg"
        aria-label="Next slide"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1">
        {images.map((_, idx) => (
          <div
            key={idx}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              currentIndex === idx + 1 ? "bg-white scale-125" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
