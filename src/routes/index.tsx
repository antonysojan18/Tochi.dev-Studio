import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/site/Navbar";
import { Hero } from "@/components/site/Hero";
import { Mission } from "@/components/site/Mission";
import { Services } from "@/components/site/Services";
import { ScrollStack } from "@/components/site/ScrollStack";
import { Process } from "@/components/site/Process";
import { InternshipSection } from "@/components/site/InternshipSection";
import { IntakeSheet } from "@/components/site/IntakeSheet";
import SplashCursor from "@/components/site/SplashCursor";
import { AmbientOrbs } from "@/components/site/AmbientOrbs";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "TOCHI .dev studio" },
      {
        name: "description",
        content:
          "An independent engineering studio crafting modern web interfaces and high-leverage internal platforms.",
      },
      { property: "og:title", content: "TOCHI .dev studio" },
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
      <AmbientOrbs />
      <SplashCursor
        rainbow={false}
        colors={["#8A1C36", "#6B1124", "#A82544", "#540B1A", "#FF4D36"]}
        size={0.7}
        force={0.8}
        swirl={2.8}
        trail={0.85}
        clickSplash
        colorSpeed={0.8}
        intensity={0.85}
        momentum={0.9}
        shading={0.8}
        glow={0.1}
        quality="high"
        intro
        contained={false}
      />
      <Navbar />
      <Hero />
      <Mission />
      <Services />
      <ScrollStack />
      <Process />
      <InternshipSection />
      <IntakeSheet />
    </main>
  );
}


