"use client";

import Image from "next/image";
import CardSwap, { Card } from "@/components/CardSwap/CardSwap";
import RotatingText from "@/components/RotatingText/RotatingText";
import { ProjectDetails } from "@/components/project-details";
import { projectData } from "@/lib/project-data";
import { useEffect, useRef, useState } from "react";
import { useInView, Variants, motion, Transition } from "framer-motion";

const spring: Transition = {
  type: "spring",
  damping: 24,
  stiffness: 300,
};

const container: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "tween",
      duration: 0.6,
      ease: "easeOut",
      staggerChildren: 0.15,
    },
  },
};

const Projects = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.3 });

  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return (
    <>
      <section
        ref={sectionRef}
        className="w-full min-h-screen text-white py-16 flex items-center justify-center overflow-x-clip"
      >
        {hasMounted && (
          <motion.div
            variants={container}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
            className="w-full grid grid-cols-1 md:grid-cols-2 gap-10 items-center max-w-[1600px]"
          >
            {/* Left */}
            <motion.div variants={container} className="px-8 md:px-24">
              <div className="inline-flex flex-wrap items-center gap-2 text-4xl font-bold">
                <span className="whitespace-nowrap">Featured</span>
                <motion.div
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  exit={{ y: "-120%" }}
                  transition={{ type: "spring", damping: 28, stiffness: 400 }}
                  className="inline-flex px-4 py-2 text-white rounded-lg text-4xl font-bold shadow-[0_0_15px_rgba(255,255,255,0.15)]"
                >
                  <RotatingText
                    texts={["Projects", "Works", "Solutions", "Developments"]}
                    staggerFrom="last"
                    staggerDuration={0.025}
                    splitLevelClassName="overflow-hidden"
                    rotationInterval={2000}
                  />
                </motion.div>
              </div>

              <motion.p
                variants={container}
                className="mt-4 text-lg leading-relaxed text-zinc-300"
              >
                <span className="font-black">
                  Each project reflects a journey—from concept to creation.
                </span>{" "}
                From solving real-world problems to crafting seamless user
                experiences, these builds highlight my passion for thoughtful
                design and practical development.
              </motion.p>
            </motion.div>

            {/* Right */}
            <motion.div
              variants={container}
              className="relative w-full flex justify-end px-4 md:px-0"
            >
              <motion.div
                transition={spring}
                className="relative w-[600px] h-[700px]"
              >
                <div className="relative w-full h-full overflow-hidden pb-32">
                  <CardSwap
                    width={600}
                    height={500}
                    cardDistance={50}
                    verticalDistance={70}
                    skewAmount={6}
                    delay={3000}
                  >
                    {projectData.map((card, i) => (
                      <Card key={i}>
                        <motion.div
                          transition={{ duration: 0.4, ease: "easeInOut" }}
                          className="relative w-full h-full"
                        >
                          <Image
                            src={card.posterImage}
                            alt={`Card ${i + 1}`}
                            fill
                            priority
                            className="rounded-lg object-cover"
                          />
                        </motion.div>
                      </Card>
                    ))}
                  </CardSwap>
                </div>
                <div className="pointer-events-none absolute bottom-0 right-0 w-[600px] h-32 bg-gradient-to-t from-zinc-950 to-transparent z-10" />
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </section>

      {projectData.map((project, i) => (
        <div
          key={i}
          className="border-t border-white/10 pt-12 first:border-none first:pt-0"
        >
          <ProjectDetails {...project} />
        </div>
      ))}

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
};

export default Projects;
