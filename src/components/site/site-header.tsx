"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LogoMark } from "./logo-mark";

export function SiteHeader() {
  const pathname = usePathname();
  const isEnglish = pathname.startsWith("/en");

  return (
    <header className="fixed inset-x-0 top-0 z-30 px-6 py-4 md:px-8">
      <div className="mx-auto flex w-full max-w-[1400px] items-center justify-between">
        <Link href="/en" aria-label="Slap Apps home" className="w-[100px]">
          <LogoMark className="w-full max-w-8" />
        </Link>
        <div className="flex items-center gap-2">
          <a
            href="https://slap-apps.de/en/kontakt"
            target="_blank"
            rel="noreferrer"
            className="rounded-md px-3 py-2 font-mono text-xl uppercase tracking-[0.14em] text-white transition hover:bg-white/8"
          >
            Contact
          </a>
          <button
            type="button"
            aria-label="Current language English"
            className="grid size-8 place-items-center rounded-full border border-white/25 bg-white/8 p-0.5"
          >
            <span
              aria-hidden="true"
              className="block size-6 rounded-full border border-white/15 bg-[radial-gradient(circle_at_50%_50%,transparent_0_56%,#111827_56%_60%,transparent_60%),repeating-linear-gradient(180deg,#b91c1c_0_10%,#ffffff_10%_20%),linear-gradient(90deg,#1d4ed8_0_42%,transparent_42%)] shadow-[0_0_12px_rgba(255,255,255,0.16)]"
              title={isEnglish ? "English" : "German"}
            />
          </button>
        </div>
      </div>
    </header>
  );
}
