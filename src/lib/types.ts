export type ExtraField =
  | { name: string; label: string; type: "text" | "tel" | "email" }
  | { name: string; label: string; type: "select"; options: string[] }
  | { name: string; label: string; type: "radio"; options: string[] };

export type LandingContent = {
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    headline: string;
    sub: string;
    bullets: string[];
    ctaPrimary: string;
    ctaSecondary: string;
    image: string;
  };
  benefits: {
    title: string;
    subtitle: string;
    items: { icon: string; title: string; desc: string }[];
  };
  proof: {
    kpis: { value: string; label: string }[];
    locationCaption: string;
  };
  howItWorks: {
    title: string;
    steps: { title: string; desc: string }[];
  };
  form: {
    title: string;
    subtitle: string;
    extraFields: ExtraField[];
    submitLabel: string;
  };
  faq: {
    title: string;
    items: { q: string; a: string }[];
  };
};
