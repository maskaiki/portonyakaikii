export type MediaAsset = {
  src: string;
  alt: string;
  kind: "image" | "video";
};

export type Project = {
  slug: string;
  title: string;
  summary: string;
  year: string;
  role: string;
  disciplines: string[];
  tools: string[];
  challenge?: string;
  approach?: string;
  process?: string;
  outcome?: string;
  reflection?: string;
  media?: MediaAsset[];
  links?: { label: string; href: string }[];
};
