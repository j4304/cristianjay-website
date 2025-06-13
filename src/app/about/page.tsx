"use client";

import Link from "next/link";
import ProfileCard from "@/components/ProfileCard/ProfileCard";
import { LazyMotion, domAnimation, m } from "framer-motion";
import skillIconMap, { skillGroups } from "../../lib/skills";
import { Download } from "lucide-react";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const TrueFocus = dynamic(() => import("@/components/TrueFocus/TrueFocus"), {
  ssr: false,
});

const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.05,
    },
  },
};

const skillVariants = {
  hidden: { opacity: 0, y: 10 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3 } },
};

export default function About() {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);
  return (
    <LazyMotion features={domAnimation}>
      <div>
        <div className="container mx-auto mt-16 px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-16">
              <TrueFocus
                sentence="About Me"
                manualMode={false}
                blurAmount={5}
                borderColor="white"
                animationDuration={2}
                pauseBetweenAnimations={1}
              />
            </div>

            {/* Profile + Bio Section */}
            <div className="grid md:grid-cols-[auto_1fr] gap-12 items-start mb-24">
              <m.div
                className="flex justify-center md:justify-start"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <ProfileCard
                  name="Cristian Jay Cosep"
                  title="Creative Full-Stack Developer"
                  handle="j4304"
                  status="Online"
                  contactText="Contact Me"
                  avatarUrl="/images/cristianjay.png"
                  miniAvatarUrl="/images/jack-icon.webp"
                  showBehindGradient
                  showUserInfo
                  enableTilt
                />
              </m.div>

              {hasMounted && (
                <m.div
                  className="space-y-12"
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                >
                  {/* My Story */}
                  <div>
                    <h2 className="text-2xl font-bold mb-6">My Story</h2>
                    <div className="space-y-4 leading-relaxed text-justify">
                      <p>
                        Hey, I&apos;m Cristian Jay Cosep — a developer and
                        designer passionate about building clean, user-friendly
                        digital experiences.
                      </p>
                      <p>
                        My journey started with simple curiosity, exploring
                        code, design, and anything tech-related I could get my
                        hands on. Over time, that curiosity turned into a
                        relentless drive to learn, build and lead. As a student
                        leader and a jack of all trades, I’ve embraced every
                        challenge: from full-stack development to UI/UX design
                        and system thinking, all with the goal of creating
                        meaningful, real-world impact.
                      </p>
                      <p>
                        I specialize in modern web development using React,
                        Next.js and TypeScript. I care deeply about clean code,
                        intuitive UI, and collaboration.
                      </p>
                      <p>
                        I bring together development, UI/UX design, system
                        thinking and leadership in my work. I&apos;m also
                        skilled in Figma, where I transform wireframes into
                        high-fidelity prototypes that guide polished, real-world
                        interfaces.
                      </p>
                    </div>
                  </div>

                  {/* Resume Download Button */}
                  <div className="flex items-center gap-2">
                    <a
                      href="/files/Cristian-Jay-Resume.pdf"
                      download
                      className="inline-flex items-center gap-2 bg-white text-zinc-900 px-4 py-2 rounded-md font-medium shadow-sm hover:bg-zinc-200 transition"
                    >
                      <Download className="w-4 h-4" />
                      Download Resume
                    </a>
                  </div>
                </m.div>
              )}
            </div>

            {/* Technical Skills */}
            <div className="mb-20">
              <m.h2
                className="text-2xl font-bold text-center mb-8"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                Technical Skills
              </m.h2>
              <div className="grid md:grid-cols-3 gap-6">
                {skillGroups.map(({ title, skills }) => (
                  <m.div
                    key={title}
                    className={`p-6 rounded-lg bg-neutral-900 ${
                      title === "Design & Media"
                        ? "md:col-span-3 flex justify-center"
                        : ""
                    }`}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="show"
                  >
                    <div className="w-full max-w-md">
                      <h3 className="font-semibold mb-4 text-lg text-center">
                        {title}
                      </h3>
                      <div className="flex flex-wrap justify-center gap-3">
                        {skills.map((skill) => (
                          <m.div
                            key={skill}
                            className="flex items-center gap-2 px-3 py-1 rounded-full text-sm bg-neutral-800 text-white border border-neutral-700"
                            variants={skillVariants}
                          >
                            {skillIconMap[skill] ?? "❓"}
                            <span>{skill}</span>
                          </m.div>
                        ))}
                      </div>
                    </div>
                  </m.div>
                ))}
              </div>
            </div>

            {/* Quote */}
            <div className="mb-20 text-center">
              <m.div
                className="inline-block px-6 py-4 text-white shadow-md"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                viewport={{ once: true, amount: 0.5 }}
              >
                <blockquote className="italic text-base md:text-lg tracking-tight">
                  “Start with no motivation, stay with humility and do it like
                  there&apos;s no tomorrow”
                </blockquote>
                <p className="mt-1 text-xs text-neutral-400">– Cristian Jay</p>
              </m.div>
            </div>

            {/* CTA */}
            <m.div
              className="text-center mb-24"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
            >
              <h2 className="text-2xl font-bold mb-4">
                Let&apos;s Work Together
              </h2>
              <p className="text-muted-foreground mb-6">
                Whether it’s a collaboration, freelance project, or community
                initiative — I’m always open to ideas.
              </p>
              <Link
                href="/contacts"
                className="bg-white text-zinc-900 px-6 py-3 rounded-md font-semibold hover:bg-zinc-200 transition"
              >
                Get In Touch
              </Link>
            </m.div>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-zinc-900 text-white mt-auto py-4 overflow-hidden">
          <div className="container relative mx-auto px-2 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-0">
            <div className="z-10 flex items-center gap-3"></div>
            <div className="z-10 text-xs text-zinc-400 text-center md:text-right">
              © {new Date().getFullYear()} Cristian Jay Cosep. All rights
              reserved.
            </div>
          </div>
        </footer>
      </div>
    </LazyMotion>
  );
}
