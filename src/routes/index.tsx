import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { ScrollStack } from "@/components/site/ScrollStack";
import { BentoGrid } from "@/components/site/BentoGrid";
import { Process } from "@/components/site/Process";
import { IntakeSheet } from "@/components/site/IntakeSheet";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TOCHI (.dev studio) — Software crafted with discipline" },
      { name: "description", content: "Bespoke web apps, internal tools and intelligent systems. Direct access to your principal engineer." },
      { property: "og:title", content: "TOCHI (.dev studio)" },
      { property: "og:description", content: "Bespoke web apps, internal tools and intelligent systems. No agency friction." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="studio-atmosphere relative isolate">
      <Navbar />
      <Hero />
      <ScrollStack />
      <BentoGrid />
      <Process />
      <IntakeSheet />
    </main>
  );
}
