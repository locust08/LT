import type { Metadata } from "next";
import { ExperiencePage } from "@/components/experience/experience-page";
import { experiences } from "@/lib/experience-data";

export const metadata: Metadata = {
  title: "We launch ideas! - Slap Apps",
  description: "Digital products that break through the noise. From concept to orbit.",
};

export default function SpacePage() {
  return <ExperiencePage data={experiences.space} />;
}
