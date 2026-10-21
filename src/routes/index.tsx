import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { ScrollStack } from "@/components/site/ScrollStack";
import { BentoGrid } from "@/components/site/BentoGrid";
import { Process } from "@/components/site/Process";
import { IntakeSheet } from "@/components/site/IntakeSheet";
import Silk from "@/components/site/Silk";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TOCHI (.dev studio) — Modern software infused with Obsessive craft" },
      {
        name: "description",
        content:
          "An independent engineering studio crafting modern web interfaces and high-leverage internal platforms.",
      },
      { property: "og:title", content: "TOCHI (.dev studio)" },
      {
        property: "og:description",
        content:
          "An independent engineering studio crafting modern web interfaces and high-leverage internal platforms.",
      },
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
      <div className="relative isolate">
        {/* Silk flowing background from the second section onwards */}
        <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
          <div className="sticky top-0 h-[100svh] w-full">
            <Silk
              color="#3c0e24"
              sheenColor="#020002"
              speed={5}
              scale={1}
              rotation={0}
              sheen={0.5}
              depth={0.25}
              glow={0.3}
              noiseIntensity={1.5}
              mouseInteraction
              clickRipple
              intro
              ripple={1}
              wave={1}
              variation={0}
              interactionStrength={1}
              fade={0}
              lightMode={false}
            />
          </div>
        </div>

        <ScrollStack />
        <BentoGrid />
        <Process />
        <IntakeSheet />
      </div>
    </main>
  );
}
