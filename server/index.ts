import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { drizzle as drizzleServerless } from "drizzle-orm/neon-serverless";
import { config } from "dotenv";
import * as schema from "./schema";

config({ path: ".env.local" });

const sql = neon(process.env.DATABASE_URL!);
export const db = drizzle({ client: sql, schema: { ...schema } });

export const dbClient = drizzleServerless({
  connection: process.env.DATABASE_URL!,
  schema: { ...schema },
});
