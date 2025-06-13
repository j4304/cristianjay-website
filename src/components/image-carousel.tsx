import React, { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface ImageCarouselProps {
  images: string[];
}

const ImageCarousel: React.FC<ImageCarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(1);
  const [isAnimating, setIsAnimating] = useState(true);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const extendedImages = [images[images.length - 1], ...images, images[0]];

  const goToIndex = (index: number) => {
    setCurrentIndex(index);
    setIsAnimating(true);
  };

  const goToPrev = () => goToIndex(currentIndex - 1);
  const goToNext = () => goToIndex(currentIndex + 1);

  useEffect(() => {
    timeoutRef.current = setTimeout(goToNext, 5000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [currentIndex]);

  const handleTransitionEnd = () => {
    if (currentIndex === 0) {
      setIsAnimating(false);
      setCurrentIndex(images.length);
    } else if (currentIndex === images.length + 1) {
      setIsAnimating(false);
      setCurrentIndex(1);
    }
  };

  useEffect(() => {
    if (!isAnimating) {
      const id = setTimeout(() => setIsAnimating(true), 20);
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
          <img
            key={idx}
            src={src}
            alt={`Slide ${idx}`}
            className="h-full w-full object-cover flex-shrink-0"
          />
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
            className={`h-2 w-2 rounded-full transition ${
              currentIndex === idx + 1 ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
