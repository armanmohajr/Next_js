"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy", label: "Privacy" },
    { href: "/terms", label: "Terms" },
];

export default function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="bg-white shadow-sm rounded-xl mb-8 px-6 py-3">
            <ul className="flex justify-center gap-14">
                {links.map((link) => {
                    const isActive = pathname === link.href;

                    return (
                        <li key={link.href}>
                            <Link
                                href={link.href}
                                className={`transition-colors ${isActive
                                    ? "text-blue-600 font-semibold"
                                    : "text-gray-600 hover:text-blue-600"
                                    }`}
                            >
                                {link.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </nav>
    );
}
