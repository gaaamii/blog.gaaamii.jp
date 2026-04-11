export type PostSummary = {
  id: string;
  title: string;
  body: string;
};

export const posts: PostSummary[] = [
  {
    id: "welcome",
    title: "Welcome to Astro site migration",
    body: "This is a Phase 1 scaffold page for /posts/:id.",
  },
  {
    id: "phase-1",
    title: "Phase 1",
    body: "We are building Astro and React Router apps in parallel.",
  },
];
