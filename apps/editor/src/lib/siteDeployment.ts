import { api } from "./api";

export type SiteDeploymentStatus = "not-requested" | "requested" | "failed";

export const requestSiteDeployment =
  async (): Promise<SiteDeploymentStatus> => {
    try {
      const response = await api.post("/site_deployments", {});
      return response.ok ? "requested" : "failed";
    } catch {
      return "failed";
    }
  };
