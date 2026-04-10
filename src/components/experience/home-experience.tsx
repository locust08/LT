"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { SiteHeader } from "@/components/site/site-header";
import { SceneCanvas } from "./scene-canvas";

const gates = [
  {
    href: "/en/grow",
    label: "Grow",
    sublabel: "Ideas start small",
    color: "#5fdd76",
    className:
      "left-[36%] top-[22%] h-[34vh] w-[16vw] min-h-[220px] min-w-[150px] md:left-[39%] md:top-[20%]",
  },
  {
    href: "/en/deliver",
    label: "Deliver",
    sublabel: "Build and ship MVPs",
    color: "#f3bf63",
    className:
      "right-[18%] top-[22%] h-[38vh] w-[18vw] min-h-[240px] min-w-[160px] md:right-[20%] md:top-[20%]",
  },
  {
    href: "/en/space",
    label: "Space",
    sublabel: "Launch ideas into orbit",
    color: "#cf56e2",
    className:
      "left-1/2 top-[48%] h-[32vh] w-[18vw] min-h-[210px] min-w-[170px] -translate-x-1/2 md:top-[46%]",
  },
];

export function HomeExperience() {
  const [activeGate, setActiveGate] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const frame = window.requestAnimationFrame(() => setReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  const gateMap = useMemo(
    () => Object.fromEntries(gates.map((gate) => [gate.href, gate])),
    [],
  );

  return (
    <div className="site-shell page-noise overflow-hidden bg-background">
      <SiteHeader />
      <SceneCanvas mode="home" progress={0} activeKey={activeGate} />
      <main className="relative min-h-screen">
        <div className="absolute inset-0 z-20">
          {gates.map((gate) => (
            <Link
              key={gate.href}
              href={gate.href}
              aria-label={gate.label}
              className={`group absolute ${gate.className} flex items-end justify-center rounded-[999px] transition`}
              onMouseEnter={() => setActiveGate(gate.href)}
              onMouseLeave={() => setActiveGate(null)}
              onFocus={() => setActiveGate(gate.href)}
              onBlur={() => setActiveGate(null)}
            >
              <span
                className="mb-[-4.8rem] rounded-full border px-4 py-2 font-mono text-lg uppercase tracking-[0.18em] opacity-0 transition duration-300 group-hover:opacity-100 group-focus-visible:opacity-100"
                style={{
                  borderColor: `${gate.color}66`,
                  color: gate.color,
                  backgroundColor: "#050608d9",
                  boxShadow: `0 0 18px ${gate.color}40`,
                }}
              >
                {gate.label}
              </span>
            </Link>
          ))}
        </div>

        <div className="relative z-20 flex min-h-screen items-end justify-center px-6 pb-10 md:pb-12">
          <div className="max-w-xl text-center">
            <h1
              className={`font-mono text-5xl uppercase leading-none tracking-[0.02em] text-white/85 md:text-7xl ${ready ? "animate-fade-up" : "opacity-0"}`}
            >
              We shape your dreams!
            </h1>
            <p className="mt-3 text-2xl font-semibold text-white/70 md:text-[2.1rem]">
              Click on the gates and dive in.
            </p>
            {activeGate && gateMap[activeGate] ? (
              <p
                className="mt-5 font-semibold uppercase tracking-[0.22em]"
                style={{ color: gateMap[activeGate].color }}
              >
                {gateMap[activeGate].sublabel}
              </p>
            ) : null}
          </div>
        </div>
      </main>
    </div>
  );
}
