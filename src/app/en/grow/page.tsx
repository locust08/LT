import type { Metadata } from "next";
import { ExperiencePage } from "@/components/experience/experience-page";
import { experiences } from "@/lib/experience-data";

export const metadata: Metadata = {
  title: "Ideas start small! - Slap Apps",
  description: "Every seed holds infinite potential.",
};

export default function GrowPage() {
  return <ExperiencePage data={experiences.grow} />;
}
