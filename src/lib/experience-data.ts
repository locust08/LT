export type ExperienceKey = "space" | "grow" | "deliver";

export type SceneCopy = {
  id: string;
  number: string;
  title: [string, string];
  description: string;
};

export type ExperienceConfig = {
  key: ExperienceKey;
  title: string;
  accentColor: string;
  ctaTitle: [string, string];
  ctaText: string;
  ctaLabel: string;
  ctaHref: string;
  counterLabels: string[];
  sections: SceneCopy[];
};

export const experiences: Record<ExperienceKey, ExperienceConfig> = {
  space: {
    key: "space",
    title: "We launch ideas!",
    accentColor: "#2465ff",
    ctaTitle: ["Ready for", "Liftoff?"],
    ctaText: "Start your journey today",
    ctaLabel: "Start your journey today",
    ctaHref: "https://slap-apps.de/kontakt",
    counterLabels: ["Altitude", "Velocity"],
    sections: [
      {
        id: "launch",
        number: "001",
        title: ["We launch", "ideas"],
        description:
          "Digital products that break through the noise. From concept to orbit.",
      },
      {
        id: "connect",
        number: "002",
        title: ["We", "connect"],
        description: "Communication is key. All components are connected.",
      },
      {
        id: "power",
        number: "003",
        title: ["Pure", "power"],
        description:
          "Raw power ignited. The heart of innovation spinning at maximum thrust.",
      },
      {
        id: "atmosphere",
        number: "004",
        title: ["Break", "atmosphere"],
        description:
          "Ascending through layers. From ground to sky to the infinite beyond.",
      },
      {
        id: "orbit",
        number: "005",
        title: ["Orbit", "achieved"],
        description:
          "Your product circles the globe. Visible to millions. Unstoppable.",
      },
    ],
  },
  grow: {
    key: "grow",
    title: "Ideas start small!",
    accentColor: "#2465ff",
    ctaTitle: ["Ready", "to grow?"],
    ctaText: "Let's cultivate your vision into a thriving ecosystem.",
    ctaLabel: "Plant your seed",
    ctaHref: "https://slap-apps.de/kontakt",
    counterLabels: ["Growth"],
    sections: [
      {
        id: "seed",
        number: "001",
        title: ["Every idea", "starts small"],
        description:
          "Every seed holds infinite potential. Your vision, compressed into its purest form, waiting for the right conditions to grow.",
      },
      {
        id: "ground",
        number: "002",
        title: ["Breaking", "ground"],
        description:
          "First roots take hold. First shoots reach for light. Your concept begins to take shape through rapid prototyping.",
      },
      {
        id: "shape",
        number: "003",
        title: ["Taking", "shape"],
        description:
          "Branches emerge, leaves unfold. Your MVP stands on its own with core features that prove the concept works.",
      },
      {
        id: "stronger",
        number: "004",
        title: ["Growing", "stronger"],
        description:
          "The trunk thickens, canopy expands. Your product matures through iteration and user feedback.",
      },
      {
        id: "tall",
        number: "005",
        title: ["Standing", "tall"],
        description:
          "Deep roots, broad canopy. Your platform becomes a landmark — robust, reliable, ready to scale.",
      },
    ],
  },
  deliver: {
    key: "deliver",
    title: "We deliver!",
    accentColor: "#2465ff",
    ctaTitle: ["Ready to", "launch?"],
    ctaText: "Let's build your MVP together.",
    ctaLabel: "Start your journey",
    ctaHref: "https://slap-apps.de/kontakt",
    counterLabels: ["Features", "Line of code"],
    sections: [
      {
        id: "mvp",
        number: "001",
        title: ["We deliver", "MVPs"],
        description:
          "Your startup idea, transformed into a working product. From concept to launch in weeks, not months.",
      },
      {
        id: "iteration",
        number: "002",
        title: ["Rapid", "iteration"],
        description:
          "Agile sprints. Modern tech stack. Your MVP takes shape through continuous development cycles.",
      },
      {
        id: "roll",
        number: "003",
        title: ["Ready to", "roll"],
        description:
          "Tested, debugged, optimized. Your MVP hits the road for real-world validation with early users.",
      },
      {
        id: "scale",
        number: "004",
        title: ["Built to", "scale"],
        description:
          "Enterprise ready. Your platform handles growth from first users to enterprise demand.",
      },
      {
        id: "takeoff",
        number: "005",
        title: ["Ready for", "takeoff"],
        description:
          "Go live. Your app launches to the market, ready to acquire customers and prove product-market fit.",
      },
    ],
  },
};
