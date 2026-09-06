import react from "@astrojs/react";
import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";
import { loadEnv } from "vite";

const readRequiredUrl = (environment, name) => {
  const value = environment[name];

  if (!value) {
    throw new Error(`${name} is required to build the Astro site`);
  }

  try {
    return new URL(value).toString();
  } catch {
    throw new Error(`${name} must be an absolute URL`);
  }
};

const environment = loadEnv(
  process.env.NODE_ENV ?? "development",
  process.cwd(),
  "",
);

export default defineConfig({
  output: "static",
  site: readRequiredUrl(environment, "SITE_URL"),
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
