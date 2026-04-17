"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

interface NavbarProps {
  isHome?: boolean;
  activeSection?: string;
}

export default function Navbar({ isHome = false, activeSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const prefix = isHome ? "" : "/";
  const links = isHome
    ? [
        { href: "#home", label: "Start" },
        { href: "#about", label: "O nas" },
        { href: "#brands", label: "Marki" },
        { href: "#services", label: "Usługi" },
        { href: "#news", label: "Aktualności" },
        { href: "#contact", label: "Kontakt" },
      ]
    : [
        { href: "/", label: "Start" },
        { href: "/#about", label: "O nas" },
        { href: "/#brands", label: "Marki" },
        { href: "/#services", label: "Usługi" },
        { href: "/#news", label: "Aktualności" },
        { href: "/#contact", label: "Kontakt" },
      ];

  return (
    <nav className={`navbar${scrolled ? " scrolled" : ""}`} id="navbar">
      <div className="nav-container">
        <Link href="/" className="nav-logo">
          <img
            src="/pics/logo.jpg"
            alt="MotoFan logo"
            className="nav-logo-img"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
          <div>
            <div className="logo-text">
              MOTO<span className="logo-accent">FAN</span>
            </div>
            <div className="logo-sub">Opole</div>
          </div>
        </Link>
        <ul className={`nav-links${menuOpen ? " open" : ""}`} id="navLinks">
          {links.map((l) => (
            <li key={l.href}>
              <Link
                href={l.href}
                className={`nav-link${activeSection === l.label ? " active" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                {l.label}
              </Link>
            </li>
          ))}
        </ul>
        <a href="tel:601484242" className="nav-cta">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13 19.79 19.79 0 0 1 1.61 4.35 2 2 0 0 1 3.58 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L7.91 9.91a16 16 0 0 0 6.18 6.18l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          601 48 42 42
        </a>
        <button
          className={`hamburger${menuOpen ? " active" : ""}`}
          aria-label="Menu"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </nav>
  );
}
