// NEON DATABASE SETUP

// import { neon } from "@neondatabase/serverless";
// import { drizzle } from "drizzle-orm/neon-http";
// import { drizzle as drizzleServerless } from "drizzle-orm/neon-serverless";
// import { config } from "dotenv";
// import * as schema from "./schema";

// config({ path: ".env.local" });

// const sql = neon(process.env.DATABASE_URL!);
// export const db = drizzle({ client: sql, schema: { ...schema } });

// export const dbClient = drizzleServerless({
//   connection: process.env.DATABASE_URL!,
//   schema: { ...schema },
// });

// POSTGRES DATABASE SETUP
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

const connectionString = process.env.DATABASE_URL!;

// Disable prefetch as it is not supported for "Transaction" pool mode
const client = postgres(connectionString, {
  prepare: false,
  max: 10,
  idle_timeout: 30000,
});

export const db = drizzle(client, { schema });
