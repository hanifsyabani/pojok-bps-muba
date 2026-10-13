export const APP_NAME = "Project BPS";

export const API_ROUTES = {
  health: "/api/health",
  greeting: "/api/greeting",
  desil: "/api/desil"
} as const;

export type HealthResponse = {
  ok: true;
  service: string;
  version: string;
  time: string;
};

export * from "./desil";

export type GreetingResponse = {
  message: string;
  stack: string[];
};
