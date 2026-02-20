import { PrismaClient } from '../generated/prisma/client';
import { PrismaMariaDb } from '@prisma/adapter-mariadb';

const databaseUrl = new URL(process.env.DATABASE_URL || "mysql://user:password@localhost:3306/mydb");

const adapter = new PrismaMariaDb({
  host: databaseUrl.hostname,
  port: parseInt(databaseUrl.port, 10),
  user: databaseUrl.username,
  password: databaseUrl.password,
  database: databaseUrl.pathname.slice(1),
});

const createPrismaClient = () => new PrismaClient({ adapter });

const globalForPrisma = globalThis as unknown as {
  prisma: ReturnType<typeof createPrismaClient> | undefined;
};

export const db = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = db;
