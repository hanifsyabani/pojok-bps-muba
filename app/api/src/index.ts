import { cors } from "@elysiajs/cors";
import { Elysia } from "elysia";
import {
  API_ROUTES,
  APP_NAME,
  type GreetingResponse,
  type HealthResponse
} from "@bps/shared";
import { ApiError } from "./errors";
import { desilRoutes } from "./routes/desil";

const port = Number(process.env.PORT ?? 3000);

export const app = new Elysia()
  .use(
    cors({
      origin: (process.env.CORS_ORIGIN ?? "http://localhost:5173,http://localhost:5174,http://localhost:5175").split(",").map((origin) => origin.trim())
    })
  )
  .onError(({ error, code, set }) => {
    if (error instanceof ApiError) {
      set.status = error.status;
      return { message: error.message, ...(error.fieldErrors ? { fieldErrors: error.fieldErrors } : {}) };
    }
    if (code === "PARSE" || code === "VALIDATION") {
      set.status = 422;
      return { message: "Format permintaan tidak valid." };
    }
    if (code === "NOT_FOUND") {
      set.status = 404;
      return { message: "Endpoint tidak ditemukan." };
    }
    set.status = 503;
    console.error("API request failed.", { code });
    return { message: "Layanan belum dapat memproses permintaan. Silakan coba kembali." };
  })
  .use(desilRoutes)
  .get("/", () => ({
    service: `${APP_NAME} API`,
    routes: API_ROUTES
  }))
  .get(
    API_ROUTES.health,
    (): HealthResponse => ({
      ok: true,
      service: "api",
      version: process.env.npm_package_version ?? "0.1.0",
      time: new Date().toISOString()
    })
  )
  .get(
    API_ROUTES.greeting,
    (): GreetingResponse => ({
      message: "Halo dari Elysia + Bun.",
      stack: ["Svelte", "Elysia", "Bun", "TypeScript"]
    })
  );

export default app;

if (import.meta.main) {
  app.listen({ port, maxRequestBodySize: 16 * 1024 * 1024 });
  console.log(`API ready on http://localhost:${app.server?.port}`);
}
