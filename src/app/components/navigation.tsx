"use client";
import Link from "next/link";
import Image from "next/image"
import { usePathname } from "next/navigation";
import "../globals.css"

const navigationItems = [
  // { href: "/", label: "Home" },
  { href: "/about", label: "About" },
  { href: "/contacts", label: "Contacts" },
] as const;

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="py-4">
      <div className="flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold hover:text-zinc-300 transition-colors"
        >
          <Image src="/jack.svg" alt="J Logo" width={40} height={40} priority className="hover:opacity-70 transition-opacity"/>
        </Link>

        <ul className="flex items-center space-x-8">
          {navigationItems.map(({ href, label }) => {
            const isActive = pathname === href;
            return (
              <li key={href}>
                <Link
                  href={href}
                  className={`
                    relative px-3 py-2 text-sm font-medium transition-colors duration-200
                    hover:text-zinc-300
                    ${
                      isActive
                        ? "text-white after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-white"
                        : "text-zinc-300"
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
