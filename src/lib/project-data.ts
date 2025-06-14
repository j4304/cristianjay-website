import microbankImg from "@/assets/images/microbank-card.webp";
import bigimbobImg from "@/assets/images/bigimbob-card.webp";
import umdscImg from "@/assets/images/umsdc-card.webp";
import umgpaImg from "@/assets/images/umgpa-card.webp";
import phpayImg from "@/assets/images/phpay-card.webp";
import intellistatsImg from "@/assets/images/intellistats-card.webp";
import { StaticImageData } from "next/image";


export type Project = {
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
};

export const projectData: Project[] = [
  {
    title: "BIGIMBOB",
    description:
      "A Sales and Order Management System for a Korean food business, built with FlutterFlow. It streamlines ordering, inventory, and sales reporting.",
    githubLink: "https://bigimbob-kiosk-lavdw9.flutterflow.app/",
    githubLabel: "Visit Website",
    liveLink:
      "https://www.figma.com/design/qtxx8pklD0iuXkNaERfXjD/JACKWORKS?node-id=399-581&t=xJMNZSCgmnupvlnv-1",
    liveLabel: "View in Figma",
    features: `- POS for cashier use
- Customer kiosk for self-ordering
- Inventory tracking
- Cook order panel
- Sales and analytics dashboard
- Role-based user authentication`,
    techStacks: ["Figma", "FlutterFlow", "Supabase"],
    posterImage: bigimbobImg,
    images: ["/images/bigimbob/bigimbob-1.webp", "/images/bigimbob/bigimbob-2.webp", "/images/bigimbob/bigimbob-3.webp", "/images/bigimbob/bigimbob-4.webp", "/images/bigimbob/bigimbob-5.webp", ],
  },
  {
    title: "Microbank",
    description:
      "A microloan management system with automated form validation, loan eligibility logic, and email notifications for loan status and deadlines.",
    githubLink: "https://github.com/Pawieee/microbank",
    githubLabel: "View in GitHub",
    features: `- Loan application with validation
- Role-based login for bank staff
- Loan tracking with due date reminders
- Email notifications via Resend
- Table view with filtering, sorting, pagination`,
    techStacks: [
      "React",
      "TypeScript",
      "TailwindCSS",
      "ShadCN",
      "Python",
      "Flask",
      "SQLite",
      "Resend",
    ],
    posterImage: microbankImg,
    images: ["/images/microbank/microbank-1.webp", "/images/microbank/microbank-2.webp", "/images/microbank/microbank-3.webp", "/images/microbank/microbank-4.webp", ],
  },
  {
    title: "UMSDC Website",
    description:
      "The official website of the University of Mindanao Student Developer Community (UMSDC), built to manage members, teams, and activities.",
    githubLink: "https://umsdc.org/",
    githubLabel: "Visit Website",
    liveLink:
      "https://www.figma.com/design/IpjPkpAfg8ttgKMb4CI7u4/UMSDC-Prototype?node-id=0-1&t=eVw39t2hguPUOIDJ-1",
    liveLabel: "View in Figma",
    features: `- Member registration and monitoring
- Team and project directories
- Authenticated access for core teams`,
    techStacks: [
      "React",
      "JavaScript",
      "TailwindCSS",
      "Preline",
      "ExpressJS",
      "JWT",
    ],
    posterImage: umdscImg,
    images: ["/images/umsdc/umsdc-1.webp", "/images/umsdc/umsdc-2.webp", "/images/umsdc/umsdc-3.webp", "/images/umsdc/umsdc-4.webp", "/images/umsdc/umsdc-5.webp"],
  },
  {
    title: "UM GPA Calculator",
    description:
      "A GPA and Latin honors calculator for UM students. Offers accurate results with real-time GPA and honors suggestions.",
    githubLink: "https://umgpa.vercel.app/",
    githubLabel: "Visit Website",
    features: `- GPA computation
- Honors eligibility feedback
- Clean, responsive UI`,
    techStacks: ["NextJS", "TypeScript", "ShadCN"],
    posterImage: umgpaImg,
    images: ["/images/umgpa/umgpa-1.webp", "/images/umgpa/umgpa-2.webp"],
  },
  {
    title: "PHPay",
    description:
      "A virtual wallet system built in Java. Supports basic transactions, account storage, and fund tracking with MySQL integration.",
    githubLink: "https://github.com/Pawieee/PHPay",
    githubLabel: "View in GitHub",
    features: `- Fund transfer and deposit
- User account management
- Transaction history`,
    techStacks: ["Java", "MySQL"],
    posterImage: phpayImg,
    images: ["/images/phpay/phpay-1.webp", "/images/phpay/phpay-2.webp", "/images/phpay/phpay-3.webp", "/images/phpay/phpay-4.webp", ],
  },
  {
    title: "Intellistats",
    description:
      "A web-based grade calculator to help students track subject performance and overall academic standing.",
    githubLink: "https://github.com/Pawieee/MyCollegeStats",
    githubLabel: "View in GitHub",
    features: `- Per-subject grade input
- Grade summary display`,
    techStacks: ["PHP", "Bootstrap", "SQLite"],
    posterImage: intellistatsImg,
    images: ["/images/intellistats/intellistats-1.webp", "/images/intellistats/intellistats-2.webp", "/images/intellistats/intellistats-3.webp", ],
  },
];