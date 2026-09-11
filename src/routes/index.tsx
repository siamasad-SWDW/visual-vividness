import { createFileRoute } from "@tanstack/react-router";
import { Scissors, ShieldCheck, Sparkles, Wand2, Zap } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { BgRemoverStudio } from "@/components/BgRemoverStudio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Free BG Remover — Remove Image Backgrounds Free" },
      {
        name: "description",
        content:
          "Upload a photo, remove the background automatically and download a transparent PNG. Free, no sign-up, no watermarks.",
      },
      { property: "og:title", content: "Free BG Remover — Remove Image Backgrounds Free" },
      {
        property: "og:description",
        content:
          "Upload a photo, remove the background automatically and download a transparent PNG. Free, no sign-up, no watermarks.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

const steps = [
  {
    icon: Sparkles,
    title: "Upload your image",
    body: "Drop in a JPG, PNG or WEBP file, or pick one from your device.",
  },
  {
    icon: Wand2,
    title: "Background removed",
    body: "The subject is detected and cut out automatically with clean edges.",
  },
  {
    icon: Zap,
    title: "Download the PNG",
    body: "Save a high-quality transparent PNG instantly — no watermark, no cost.",
  },
];

const faqs = [
  {
    q: "Is it really free?",
    a: "Yes. Every image is free to process and download. There is no payment, subscription, credit limit or sign-up.",
  },
  {
    q: "Are my images uploaded anywhere?",
    a: "No. The background removal runs entirely inside your browser, so your photos never leave your device and are never stored.",
  },
  {
    q: "Which file types work?",
    a: "JPG, JPEG, PNG and WEBP images up to 15 MB. The result is always a transparent PNG.",
  },
  {
    q: "Will there be a watermark?",
    a: "Never. The downloaded PNG is exactly your subject on a transparent background, at full quality.",
  },
  {
    q: "Why does the first image take longer?",
    a: "The first run downloads the detection model into your browser. Every image after that is much faster.",
  },
];

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 border-b border-border/70 bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="#top" className="flex items-center gap-2.5">
            <span className="flex size-9 items-center justify-center rounded-xl bg-[image:var(--gradient-brand)] text-primary-foreground shadow-[var(--shadow-brand)]">
              <Scissors className="size-4.5" />
            </span>
            <span className="font-display text-base font-semibold">Free BG Remover</span>
          </a>
          <nav aria-label="Main" className="flex items-center gap-1 text-sm font-medium">
            <a href="#top" className="rounded-lg px-3 py-2 hover:bg-accent">
              Home
            </a>
            <a href="#how-it-works" className="rounded-lg px-3 py-2 hover:bg-accent">
              How It Works
            </a>
            <a href="#faq" className="rounded-lg px-3 py-2 hover:bg-accent">
              FAQ
            </a>
          </nav>
        </div>
      </header>

      <main id="top">
        <section className="glow-surface px-4 pt-16 pb-20 sm:px-6 sm:pt-24">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-1.5 text-xs font-semibold text-accent-foreground shadow-[var(--shadow-soft)]">
              <ShieldCheck className="size-3.5" /> Runs in your browser — nothing is uploaded
            </span>
            <h1 className="mt-6 text-4xl leading-[1.08] font-bold sm:text-6xl">
              Remove Image Backgrounds —{" "}
              <span className="text-gradient-brand">Completely Free</span>
            </h1>
            <p className="mx-auto mt-5 max-w-xl text-base text-muted-foreground sm:text-lg">
              Drop in any photo and get a clean, transparent PNG in seconds. No sign-up, no
              watermarks, no limits.
            </p>
          </div>

          <div className="mx-auto mt-12 max-w-3xl">
            <BgRemoverStudio />
          </div>
        </section>

        <section id="how-it-works" className="border-t border-border/70 bg-card/60 px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-5xl">
            <h2 className="text-center text-3xl font-bold sm:text-4xl">How it works</h2>
            <p className="mx-auto mt-3 max-w-lg text-center text-muted-foreground">
              Three simple steps from photo to transparent PNG.
            </p>
            <div className="mt-12 grid gap-6 md:grid-cols-3">
              {steps.map((step, i) => (
                <article
                  key={step.title}
                  className="rounded-2xl border bg-card p-7 shadow-[var(--shadow-soft)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[var(--shadow-card)]"
                >
                  <div className="flex size-11 items-center justify-center rounded-xl bg-accent text-accent-foreground">
                    <step.icon className="size-5" />
                  </div>
                  <p className="mt-5 text-xs font-semibold tracking-widest text-muted-foreground uppercase">
                    Step {i + 1}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="faq" className="px-4 py-20 sm:px-6">
          <div className="mx-auto max-w-2xl">
            <h2 className="text-center text-3xl font-bold sm:text-4xl">Frequently asked questions</h2>
            <Accordion type="single" collapsible className="mt-10">
              {faqs.map((faq) => (
                <AccordionItem key={faq.q} value={faq.q}>
                  <AccordionTrigger className="text-left text-base font-semibold">
                    {faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm leading-relaxed text-muted-foreground">
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </main>

      <footer className="border-t border-border/70 bg-card/60 px-4 py-10 sm:px-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm sm:flex-row">
          <p className="text-muted-foreground">
            Free BG Remover — Simple, Fast &amp; Free Background Removal
          </p>
          <nav aria-label="Footer" className="flex flex-wrap items-center gap-5 font-medium">
            <a href="#faq" className="text-muted-foreground hover:text-foreground">
              Privacy
            </a>
            <a href="#faq" className="text-muted-foreground hover:text-foreground">
              Terms
            </a>
            <a href="#faq" className="text-muted-foreground hover:text-foreground">
              FAQ
            </a>
            <a href="#faq" className="text-muted-foreground hover:text-foreground">
              Contact
            </a>
          </nav>
        </div>
      </footer>
    </div>
  );
}
