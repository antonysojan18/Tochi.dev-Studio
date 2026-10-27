import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { type ReactNode } from "react";
import { Toaster } from "@/components/ui/sonner";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-xl font-semibold tracking-tight text-foreground">
          This page didn't load
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong on our end. You can try refreshing or head back home.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Try again
          </button>
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium text-foreground transition-colors hover:bg-accent"
          >
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": ["Organization", "ProfessionalService"],
      "@id": "https://tochidevstudio.in/#organization",
      "name": "TOCHI .dev Studio",
      "alternateName": [
        "tochidevstudio",
        "tochidevstudio.in",
        "TOCHI dev studio",
        "TOCHI Studio",
        "TOCHI .Labs"
      ],
      "url": "https://tochidevstudio.in",
      "logo": "https://tochidevstudio.in/favicon.png",
      "image": "https://tochidevstudio.in/og-image.png",
      "description":
        "TOCHI .dev Studio (tochidevstudio.in) is an independent creative engineering and software studio building high-performance web applications, modern AI experiences, and production systems.",
      "address": {
        "@type": "PostalAddress",
        "addressCountry": "IN"
      },
      "sameAs": [
        "https://github.com/antonysojan18/Tochi.dev-Studio"
      ]
    },
    {
      "@type": "WebSite",
      "@id": "https://tochidevstudio.in/#website",
      "url": "https://tochidevstudio.in",
      "name": "TOCHI .dev Studio",
      "alternateName": "tochidevstudio.in",
      "description": "Creative Engineering & AI Web Development Studio",
      "publisher": {
        "@id": "https://tochidevstudio.in/#organization"
      },
      "inLanguage": "en-US"
    }
  ]
};

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=5" },
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
      { name: "author", content: "Tochi Dev Studio" },
      { name: "publisher", content: "Tochi Dev Studio" },
      { name: "creator", content: "Tochi Dev Studio" },
      { name: "robots", content: "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1" },
      { name: "googlebot", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
      { name: "theme-color", content: "#2C0D1B" },
      { property: "og:site_name", content: "Tochi Dev Studio" },
      { property: "og:type", content: "website" },
      { property: "og:locale", content: "en_IN" },
      { property: "og:url", content: "https://www.tochidevstudio.in/" },
      { property: "og:title", content: "Tochi Dev Studio | Web Development & Digital Solutions" },
      {
        property: "og:description",
        content:
          "Tochi Dev Studio is an engineering and design studio crafting modern web development, high-performance digital solutions, and bespoke interactive platforms.",
      },
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
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&family=Manrope:wght@400;500;600&family=Outfit:wght@400;500;600;700;800;900&family=Sora:wght@500;600;700&display=swap",
      },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.ico", sizes: "any" },
      { rel: "icon", href: "/favicon.svg", type: "image/svg+xml" },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/apple-touch-icon.png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();

  return (
    <QueryClientProvider client={queryClient}>
      {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
      <Outlet />
      <Toaster />
    </QueryClientProvider>
  );
}
