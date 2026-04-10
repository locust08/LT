import type { Metadata } from "next";
import { HomeExperience } from "@/components/experience/home-experience";

export const metadata: Metadata = {
  title: "Slap Apps - Top-class web experiences",
  description: "We shape your dreams.",
};

export default function EnglishHomePage() {
  return <HomeExperience />;
}
