/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly SITE_API_BASE_URL: string;
  readonly SITE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
