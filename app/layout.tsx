import type { Metadata } from "next";
import "../styles/portfolio-layout.css";
import ServiceWorkerRegistrar from "@/components/ServiceWorkerRegistrar";

export const metadata: Metadata = {
  title: "Zaid Shabir | Portfolio",
  description:
    "Personal portfolio of Zaid Shabir showcasing projects in AI/ML, satellite imagery pipelines, cloud-backed full-stack systems, and software engineering.",
  metadataBase: new URL("https://zaidshabir.github.io"),
  alternates: { canonical: "/" },
  verification: {
    google: "1qe3cEZmpUpCyhVnz2i2MsffDnyvi18DSo9KUl86Hjk",
  },
  openGraph: {
    title: "Zaid Shabir | Portfolio",
    description:
      "Portfolio showcasing projects in AI/ML, satellite imagery, cloud systems, and full-stack development.",
    url: "https://zaidshabir.github.io/",
    siteName: "Zaid Shabir",
    images: [{ url: "https://zaidshabir.github.io/Images/logo.png" }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Zaid Shabir | Portfolio",
    description:
      "Portfolio showcasing projects in AI/ML, satellite imagery, cloud systems, and full-stack development.",
    images: ["https://zaidshabir.github.io/Images/logo.png"],
  },
  icons: {
    icon: [
      {
        url: "/Images/logo-light.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/Images/logo-dark.png",
        media: "(prefers-color-scheme: dark)",
      },
    ],
    apple: "/Images/logo-light.png",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Zaid Shabir",
  url: "https://zaidshabir.github.io/",
  image: "https://zaidshabir.github.io/Images/logo.png",
  sameAs: [
    "https://github.com/Zai14",
    "https://www.linkedin.com/in/zai14/",
    "https://www.instagram.com/za.i.14",
    "https://linktr.ee/Za.I.14",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-terminal-mode="modern" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* App Router: link tag fonts are fine for a single layout (legacy parity with index.html) */}
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Instrument+Serif:ital@0;1&family=Orbitron:wght@700;900&family=VT323&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("zaid-embed-theme");if(t==="light")document.documentElement.classList.add("embed-site-light");}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <ServiceWorkerRegistrar />
        {children}
      </body>
    </html>
  );
}
