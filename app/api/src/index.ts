import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";
import {
  API_ROUTES,
  APP_NAME,
  type GreetingResponse,
  type HealthResponse
} from "@bps/shared";

const port = Number(Bun.env.PORT ?? 3000);

export const app = new Elysia()
  .use(
    cors({
      origin: Bun.env.CORS_ORIGIN ?? "http://localhost:5173"
    })
  )
  .get("/", () => ({
    service: `${APP_NAME} API`,
    routes: API_ROUTES
  }))
  .get(
    API_ROUTES.health,
    (): HealthResponse => ({
      ok: true,
      service: "api",
      version: Bun.env.npm_package_version ?? "0.1.0",
      time: new Date().toISOString()
    })
  )
  .get(
    API_ROUTES.greeting,
    (): GreetingResponse => ({
      message: "Halo dari Elysia + Bun.",
      stack: ["Svelte", "Elysia", "Bun", "TypeScript"]
    })
  )
  .listen(port);

console.log(`API ready on http://localhost:${app.server?.port}`);
