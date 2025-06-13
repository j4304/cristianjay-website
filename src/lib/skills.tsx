import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiJavascript,
  SiTailwindcss,
  SiHtml5,
  SiCss3,
  SiNodedotjs,
  SiExpress,
  SiFigma,
  SiGit,
  SiVercel,
  SiPostgresql,
  SiPython,
  SiMysql,
  SiAdobephotoshop,
  SiAdobeaftereffects,
  SiAdobepremierepro,
  SiCanva,
  SiBlender,
  SiNotion,
} from "react-icons/si";

import { FaJava } from "react-icons/fa6";

import { JSX } from "react";


const skillIconMap: Record<string, JSX.Element> = {
  React: <SiReact className="text-cyan-500" />,
  "Next.js": <SiNextdotjs className="text-black dark:text-white" />,
  TypeScript: <SiTypescript className="text-blue-600" />,
  JavaScript: <SiJavascript className="text-yellow-400" />,
  "Tailwind CSS": <SiTailwindcss className="text-teal-400" />,
  HTML5: <SiHtml5 className="text-orange-500" />,
  CSS3: <SiCss3 className="text-blue-500" />,
  "Node.js": <SiNodedotjs className="text-green-600" />,
  Express: <SiExpress className="text-gray-300" />,
  "REST APIs": <span className="text-pink-400 font-bold">API</span>,
  Git: <SiGit className="text-red-500" />,
  Vercel: <SiVercel className="text-black dark:text-white" />,
  Figma: <SiFigma className="text-pink-500" />,
  Python: <SiPython className="text-yellow-500" />,
  Java: <FaJava className="text-orange-700" />,
  PostgreSQL: <SiPostgresql className="text-blue-800" />,
  MySQL: <SiMysql className="text-blue-600" />,
  Photoshop: <SiAdobephotoshop className="text-blue-500" />,
  "After Effects": <SiAdobeaftereffects className="text-purple-600" />,
  "Premiere Pro": <SiAdobepremierepro className="text-indigo-600" />,
  Canva: <SiCanva className="text-blue-400" />,
  Blender: <SiBlender className="text-orange-400" />,
  Notion: <SiNotion className="text-black dark:text-white" />,
};

export default skillIconMap;

export const skillGroups = [
  {
    title: "Frontend",
    color: "blue",
    skills: [
      "React",
      "Next.js",
      "JavaScript",
      "TypeScript",
      "Tailwind CSS",
      "HTML5",
      "CSS3",
    ],
  },
  {
    title: "Backend",
    color: "green",
    skills: [
      "Node.js",
      "Express",
      "REST APIs",
      "Python",
      "Java",
      "PostgreSQL",
      "MySQL",
    ],
  },
  {
    title: "Tools & Dev",
    color: "purple",
    skills: ["Git", "Vercel", "Notion"],
  },
  {
    title: "Design & Media",
    color: "pink",
    skills: [
      "Figma",
      "Photoshop",
      "After Effects",
      "Premiere Pro",
      "Canva",
      "Blender",
    ],
  },
];