import { defineConfig } from "drizzle-kit";

const url = process.env.DATABASE_URL || "postgres://postgres:postgres@localhost:5013/postgres";

export default defineConfig({
	dialect: "postgresql",
	schema: "./drizzle/schema.ts",
	out: "./drizzle/migrations",
	dbCredentials: { url },
});
