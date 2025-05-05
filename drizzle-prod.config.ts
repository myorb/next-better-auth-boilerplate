import { defineConfig } from "drizzle-kit";
import { config } from "dotenv";

config({ path: ".env.production.local" });

export default defineConfig({
  schema: "./db/schema.ts",
  out: "./db/drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!,
  },
});
