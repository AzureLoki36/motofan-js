"use client";
import { useEffect, useState } from "react";

const ITEMS = [
  { src: "/pics/latajace/biker.svg",       side: "left",  topVh: 18, xFrac: 0.15, size: 60, dur: 6,   del: 0    },
  { src: "/pics/latajace/helmet.svg",       side: "right", topVh: 28, xFrac: 0.45, size: 56, dur: 7,   del: -2   },
  { src: "/pics/latajace/goggles.svg",      side: "left",  topVh: 50, xFrac: 0.42, size: 52, dur: 5.5, del: -1   },
  { src: "/pics/latajace/cogwheel.svg",     side: "right", topVh: 55, xFrac: 0.2,  size: 48, dur: 8,   del: -3   },
  { src: "/pics/latajace/motorcyclist.svg", side: "left",  topVh: 72, xFrac: 0.3,  size: 60, dur: 6.5, del: -0.5 },
  { src: "/pics/latajace/mechanic.svg",     side: "right", topVh: 68, xFrac: 0.48, size: 56, dur: 7.5, del: -1.5 },
  { src: "/pics/latajace/motorcycle.svg",   side: "left",  topVh: 85, xFrac: 0.38, size: 52, dur: 5,   del: -2.5 },
  { src: "/pics/latajace/motorbike.svg",    side: "right", topVh: 82, xFrac: 0.32, size: 48, dur: 9,   del: -4   },
  { src: "/pics/latajace/helmet-moto.svg",  side: "left",  topVh: 38, xFrac: 0.25, size: 54, dur: 7,   del: -3.5 },
  { src: "/pics/latajace/motorcycle2.svg",  side: "right", topVh: 40, xFrac: 0.38, size: 50, dur: 6,   del: -1   },
] as const;

export default function FloatingElements() {
  const [show, setShow] = useState(false);
  const [hasSpace, setHasSpace] = useState(false);

  useEffect(() => {
    const onUpdate = () => {
      setShow(window.scrollY > window.innerHeight * 0.6);
      setHasSpace(window.innerWidth >= 1440);
    };
    onUpdate();
    window.addEventListener("scroll", onUpdate, { passive: true });
    window.addEventListener("resize", onUpdate);
    return () => {
      window.removeEventListener("scroll", onUpdate);
      window.removeEventListener("resize", onUpdate);
    };
  }, []);

  if (!hasSpace) return null;

  return (
    <>
      <style>{`
        @keyframes feFloat {
          0%,100% { transform: translateY(0) rotate(-4deg); }
          50%      { transform: translateY(-18px) rotate(4deg); }
        }
      `}</style>
      <div
        aria-hidden="true"
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 5,
          overflow: "hidden",
          opacity: show ? 1 : 0,
          transition: "opacity 1.2s ease",
        }}
      >
        {ITEMS.map((item, i) => (
          <img
            key={i}
            src={item.src}
            alt=""
            style={{
              position: "absolute",
              top: `${item.topVh}vh`,
              [item.side]: `calc((100vw - 1200px) * ${item.xFrac} / 2)`,
              width: item.size,
              height: item.size,
              opacity: 0.6,
              animation: `feFloat ${item.dur}s ease-in-out ${item.del}s infinite`,
            }}
          />
        ))}
      </div>
    </>
  );
}
