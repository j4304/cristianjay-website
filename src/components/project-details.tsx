"use client";

import { motion, Variants } from "framer-motion";
import Image, { StaticImageData } from "next/image";
import React from "react";
import ImageCarousel from "./image-carousel";

const container: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween",
      duration: 0.6,
      ease: "easeOut",
      delay: 0.25,
      staggerChildren: 0.15, // ✅ valid only if children also have `variants`
    },
  },
};

interface ProjectDetailsProps {
  title: string;
  description: string;
  githubLink?: string;
  liveLink?: string;
  githubLabel?: string;
  liveLabel?: string;
  features: string;
  posterImage: string | StaticImageData;
  techStacks?: string[];
  images: string[];
}

export const ProjectDetails: React.FC<ProjectDetailsProps> = ({
  title,
  description,
  githubLink,
  liveLink,
  githubLabel,
  liveLabel,
  posterImage,
  techStacks,
  images,
}) => {
  return (
    <motion.section
      className="w-full text-white py-20 px-6 md:px-24 bg-zinc-950/50"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={container}
    >
      <div className="max-w-7xl mx-auto space-y-16">
        {/* Hero Poster */}
        <div className="relative w-full h-auto min-h-[400px] rounded-2xl overflow-hidden flex flex-col md:flex-row items-center justify-between px-6 md:px-12 gap-10">
          {/* Background Poster */}
          <div className="absolute inset-0 border border-white/20 shadow-inner shadow-white/5 rounded-2xl overflow-hidden">
            <Image
              src={posterImage}
              alt={`${title} Poster`}
              fill
              priority
              className="object-cover w-full h-full opacity-50 blur-sm"
              placeholder="blur"
            />
          </div>

          {/* Overlay layer */}
          <div className="absolute inset-0 z-10 bg-gradient-to-r from-black/60 to-transparent" />

          {/* Image Carousel */}
          <div className="relative z-20 flex-[2] max-w-[650px] w-full">
            <ImageCarousel images={images} />
          </div>

          {/* Right: Title, Desc, Buttons, Tech Stack */}
          <div className="relative z-20 flex flex-col justify-center items-start max-w-xl space-y-4 flex-[1]">
            <h2 className="text-4xl md:text-5xl font-bold drop-shadow-lg">
              {title}
            </h2>

            <p className="text-lg text-zinc-300 drop-shadow">{description}</p>

            {/* Buttons */}
            <div className="flex gap-4 flex-wrap pt-2">
              {liveLink && (
                <a
                  href={liveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-transparent text-white px-4 py-2 text-sm rounded-md font-semibold border border-white/20 hover:bg-white/10 transition"
                >
                  {liveLabel}
                </a>
              )}
              {githubLink && (
                <a
                  href={githubLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-zinc-900 px-4 py-2 text-sm rounded-md font-semibold hover:bg-zinc-200 transition"
                >
                  {githubLabel}
                </a>
              )}
            </div>

            {/* Tech Stack Tags */}
            {techStacks && techStacks.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {techStacks.map((stack, index) => (
                  <span
                    key={index}
                    className="text-sm px-4 py-1 rounded-full border border-white/10 text-white bg-white/5 backdrop-blur-sm"
                  >
                    {stack}
                  </span>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.section>
  );
};
