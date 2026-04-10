export function SiteFooter() {
  return (
    <footer className="relative z-20 px-6 pb-10 text-center md:px-8">
      <div className="mx-auto flex max-w-[1400px] flex-col items-center gap-4 text-white/70">
        <div>
          <div className="font-mono text-6xl uppercase tracking-[0.08em] text-white/90">
            Slap Apps
          </div>
          <p className="mt-1 text-sm font-semibold md:text-base">
            Where visions really work!
          </p>
        </div>
        <p className="text-sm">© 2026 Slap Apps | Made with love in Falkensee.</p>
        <div className="flex flex-wrap items-center justify-center gap-6 text-sm">
          <a href="https://slap-apps.de/kontakt" target="_blank" rel="noreferrer">
            Kontakt
          </a>
          <a href="https://slap-apps.de/impressum" target="_blank" rel="noreferrer">
            Impressum
          </a>
          <a href="https://slap-apps.de/datenschutz" target="_blank" rel="noreferrer">
            Datenschutz
          </a>
        </div>
      </div>
    </footer>
  );
}
