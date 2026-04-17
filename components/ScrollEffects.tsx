"use client";

import { useEffect } from "react";

export default function ScrollEffects() {
  useEffect(() => {
    /* Scroll reveal animations */
    const revealElements = document.querySelectorAll(
      ".brand-card, .service-card, .feature-item, .fb-reason, .about-text, .about-timeline, .contact-card, .hours-card, .contact-map, .contact-form-wrap, .timeline-item"
    );

    revealElements.forEach((el) => el.classList.add("reveal"));

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => entry.target.classList.add("visible"), 80);
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealElements.forEach((el) => revealObserver.observe(el));

    /* Staggered reveal for grids */
    document
      .querySelectorAll(".brands-grid, .services-grid")
      .forEach((grid) => {
        const children = grid.querySelectorAll(".brand-card, .service-card");
        const gridObserver = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                children.forEach((child, i) => {
                  setTimeout(() => child.classList.add("visible"), i * 100);
                });
                gridObserver.unobserve(entry.target);
              }
            });
          },
          { threshold: 0.05 }
        );
        gridObserver.observe(grid);
      });

    /* Smooth scroll for anchor links */
    const handleAnchorClick = (e: Event) => {
      const el = e.currentTarget as HTMLAnchorElement;
      const href = el.getAttribute("href");
      if (!href || !href.startsWith("#")) return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const top =
          target.getBoundingClientRect().top + window.scrollY - 90;
        window.scrollTo({ top, behavior: "smooth" });
      }
    };

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", handleAnchorClick);
    });

    return () => {
      revealElements.forEach((el) => revealObserver.unobserve(el));
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.removeEventListener("click", handleAnchorClick);
      });
    };
  }, []);

  return null;
}
