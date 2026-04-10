import type { Metadata } from "next";
import { ExperiencePage } from "@/components/experience/experience-page";
import { experiences } from "@/lib/experience-data";

export const metadata: Metadata = {
  title: "We deliver! - Slap Apps",
  description: "Your startup idea, transformed into a working product.",
};

export default function DeliverPage() {
  return <ExperiencePage data={experiences.deliver} />;
}
