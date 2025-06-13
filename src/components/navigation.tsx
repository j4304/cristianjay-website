"use client";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import "@/app/globals.css";

const navigationItems = [
  { href: "/about", label: "About" },
  { href: "/projects", label: "Projects" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contacts", label: "Contacts" },
] as const;

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="py-4 ">
      <div className="flex items-center justify-between max-w-7xl mx-auto px-4">
        <Link
          href="/"
          className="text-xl font-semibold transition-transform duration-300 hover:scale-105"
        >
          <Image
            src="/images/jack.svg"
            alt="J Logo"
            width={40}
            height={40}
            priority
            className="transition-opacity duration-300 hover:opacity-70"
          />
        </Link>

        <ul className="flex items-center space-x-6">
          {navigationItems.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  style={{ fontFamily: "Davetica, sans-serif" }}
                  className={`
                    relative px-2 py-1 text-sm font-medium uppercase tracking-wide transition-all duration-300
                    hover:text-white hover:after:w-full
                    ${
                      isActive
                        ? "text-white after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-full after:bg-white after:transition-all"
                        : "text-zinc-400 after:absolute after:bottom-0 after:left-0 after:h-0.5 after:w-0 after:bg-white after:transition-all"
                    }
                  `}
                >
                  {label}
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}
