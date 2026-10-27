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

const homeServiceSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://tochidevstudio.in/#studio-services",
  "name": "TOCHI .dev Studio",
  "url": "https://tochidevstudio.in",
  "image": "https://tochidevstudio.in/og-image.png",
  "description":
    "Independent creative engineering and software studio building high-performance web platforms, AI applications, and interactive digital products.",
  "serviceType": "Creative Web Engineering & AI Platform Development",
  "areaServed": {
    "@type": "Country",
    "name": "Global"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Software Engineering & Design Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "AI Web Platform Engineering"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Creative UI/UX & Generative Interface Design"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Intelligent Backend & API Architecture"
        }
      }
    ]
  }
};

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Tochi Dev Studio | Web Development & Digital Solutions" },
      {
        name: "description",
        content:
          "Tochi Dev Studio is an engineering and design studio crafting modern web development, high-performance digital solutions, and bespoke interactive platforms.",
      },
      {
        name: "keywords",
        content:
          "tochidevstudio, tochidevstudio.in, tochi dev studio, tochi.dev studio, tochi studio, web development, digital solutions, creative engineering studio, AI web development, UI UX design studio India",
      },
      { property: "og:site_name", content: "Tochi Dev Studio" },
      { property: "og:title", content: "Tochi Dev Studio | Web Development & Digital Solutions" },
      {
        property: "og:description",
        content:
          "Tochi Dev Studio is an engineering and design studio crafting modern web development, high-performance digital solutions, and bespoke interactive platforms.",
      },
      { property: "og:url", content: "https://www.tochidevstudio.in/" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "https://www.tochidevstudio.in/og-image.png" },
      { property: "og:image:secure_url", content: "https://www.tochidevstudio.in/og-image.png" },
      { property: "og:image:type", content: "image/png" },
      { property: "og:image:width", content: "1200" },
      { property: "og:image:height", content: "630" },
      { property: "og:image:alt", content: "Tochi Dev Studio — Web Development & Digital Solutions" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:domain", content: "tochidevstudio.in" },
      { name: "twitter:url", content: "https://www.tochidevstudio.in/" },
      { name: "twitter:title", content: "Tochi Dev Studio | Web Development & Digital Solutions" },
      {
        name: "twitter:description",
        content:
          "Tochi Dev Studio is an engineering and design studio crafting modern web development, high-performance digital solutions, and bespoke interactive platforms.",
      },
      { name: "twitter:image", content: "https://www.tochidevstudio.in/og-image.png" },
    ],
    links: [
      { rel: "canonical", href: "https://www.tochidevstudio.in/" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify(homeServiceSchema),
      },
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


