import * as dotenv from "dotenv";
import { defineConfig } from "prisma/config";

// Load .env.local for Next.js projects
dotenv.config({ path: ".env.local" });

export default defineConfig({
  schema: "prisma/schema.prisma",
  migrations: {
    path: "prisma/migrations",
  },
  datasource: {
    url: process.env["DATABASE_URL"]!,
  },
});
