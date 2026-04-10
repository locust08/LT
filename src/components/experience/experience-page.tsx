"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import type { ExperienceConfig } from "@/lib/experience-data";
import { SceneCanvas } from "./scene-canvas";

type ExperiencePageProps = {
  data: ExperienceConfig;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function formatCounter(value: number, label: string) {
  if (label === "Growth") {
    return `${Math.round(value)} %`;
  }

  if (label === "Altitude") {
    return `${Math.round(value)}`;
  }

  if (label === "Velocity") {
    return `${Math.round(value).toString().padStart(3, "0")}`;
  }

  if (label === "Line of code") {
    return Math.round(value)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  }

  return `${Math.round(value)}`;
}

function buildCounters(key: ExperienceConfig["key"], progress: number) {
  if (key === "space") {
    return {
      Altitude: progress * 42000,
      Velocity: 1 + progress * 999,
    };
  }

  if (key === "grow") {
    return {
      Growth: progress * 100,
    };
  }

  return {
    Features: progress * 48,
    "Line of code": 1000 + progress * 164000,
  };
}

export function ExperiencePage({ data }: ExperiencePageProps) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(900);

  useEffect(() => {
    const onScroll = () => {
      const track = trackRef.current;
      if (!track) {
        return;
      }

      const rect = track.getBoundingClientRect();
      const total = Math.max(track.offsetHeight - window.innerHeight, 1);
      const local = clamp(-rect.top / total, 0, 1);
      setProgress(local);
    };

    const onResize = () => {
      setViewportHeight(window.innerHeight);
      onScroll();
    };

    onResize();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  const stageCount = data.sections.length;
  const scaled = clamp(progress * stageCount, 0, stageCount - 0.001);
  const sceneIndex = Math.floor(scaled);
  const scene = data.sections[sceneIndex];
  const overlayOpacity = progress < 0.9 ? 1 : clamp(1 - (progress - 0.9) / 0.1, 0, 1);
  const counters = useMemo(() => buildCounters(data.key, progress), [data.key, progress]);

  return (
    <div className="site-shell page-noise bg-background">
      <SiteHeader />
      <SceneCanvas mode={data.key} progress={progress} />

      <div
        className="pointer-events-none fixed inset-0 z-20"
        style={{ opacity: overlayOpacity }}
      >
        <div className="mx-auto flex h-full w-full max-w-[1440px] items-center justify-between gap-6 px-6 pt-24 pb-12 md:px-8">
          <div className="max-w-[34rem]">
            <div className="animate-fade-up">
              <div
                className="font-mono text-xl uppercase tracking-[0.24em]"
                style={{ color: data.accentColor }}
              >
                {scene.number}
              </div>
              <h1 className="text-shadow-title mt-3 font-mono text-[4.2rem] uppercase leading-[0.88] text-white md:text-[7.2rem]">
                <span className="block">{scene.title[0]}</span>
                <span className="block" style={{ color: data.accentColor }}>
                  {scene.title[1]}
                </span>
              </h1>
              <p className="mt-6 max-w-[28rem] text-xl font-semibold leading-[1.45] text-white/84 md:text-[2rem]">
                {scene.description}
              </p>
            </div>

            <div className="mt-10 inline-flex h-16 w-8 items-start justify-center rounded-full border border-white/40 p-2">
              <span className="block h-4 w-0.5 rounded-full bg-white/85 animate-pulse-slow" />
            </div>
          </div>

          <div className="flex flex-col items-end gap-6 self-end pb-3 text-right">
            {data.counterLabels.map((label) => (
              <div key={label}>
                <div className="font-mono text-5xl uppercase leading-none text-white md:text-6xl">
                  {formatCounter(counters[label as keyof typeof counters] ?? 0, label)}
                </div>
                <div className="mt-1 font-sans text-sm uppercase tracking-[0.22em] text-white/48 md:text-base">
                  {label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <main className="relative z-10">
        <div
          ref={trackRef}
          className="relative"
          style={{ height: `${stageCount * 170}vh` }}
          aria-hidden="true"
        />

        <section className="relative z-20 px-6 pb-16 md:px-8">
          <div className="mx-auto max-w-[1400px] rounded-[2rem] border border-white/10 bg-black/45 px-6 py-16 text-center backdrop-blur-sm md:px-12 md:py-20">
            <div className="font-mono text-5xl uppercase leading-none text-white md:text-7xl">
              <span className="block">{data.ctaTitle[0]}</span>
              <span className="block">{data.ctaTitle[1]}</span>
            </div>
            <p className="mx-auto mt-5 max-w-2xl text-lg font-semibold text-white/76 md:text-2xl">
              {data.ctaText}
            </p>
            <a
              href={data.ctaHref}
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex rounded-full border border-white/20 bg-white/8 px-6 py-3 font-semibold text-white transition hover:bg-white/14"
            >
              {data.ctaLabel}
            </a>
          </div>
        </section>

        <SiteFooter />
      </main>
      <div
        className="pointer-events-none fixed inset-x-0 bottom-0 z-10 h-40"
        style={{
          background:
            viewportHeight < 700
              ? "linear-gradient(180deg, rgba(5,6,8,0), rgba(5,6,8,0.88))"
              : "linear-gradient(180deg, rgba(5,6,8,0), rgba(5,6,8,0.72))",
        }}
      />
    </div>
  );
}
