import {
	serial,
	text,
	pgTable,
	pgSchema,
	integer,
	timestamp,
	varchar,
	bigint,
} from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-valibot";
import type { AdapterAccountType } from "@auth/core/adapters";

// CREATE TABLE users
// (
//   id SERIAL,
//   name VARCHAR(255),
//   email VARCHAR(255),
//   "emailVerified" TIMESTAMPTZ,
//   image TEXT,

//   PRIMARY KEY (id)
// );

export const users = pgTable("users", {
	id: serial("id").primaryKey(),
	name: varchar("name", { length: 255 }),
	email: varchar("email", { length: 255 }).notNull(),
	emailVerified: timestamp("emailVerified", { withTimezone: true }),
	image: text("image"),
});

// CREATE TABLE accounts
// (
//   id SERIAL,
//   "userId" INTEGER NOT NULL,
//   type VARCHAR(255) NOT NULL,
//   provider VARCHAR(255) NOT NULL,
//   "providerAccountId" VARCHAR(255) NOT NULL,
//   refresh_token TEXT,
//   access_token TEXT,
//   expires_at BIGINT,
//   id_token TEXT,
//   scope TEXT,
//   session_state TEXT,
//   token_type TEXT,

//   PRIMARY KEY (id)
// );
export const accounts = pgTable("accounts", {
	id: serial("id").primaryKey(),
	userId: integer("userId")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	type: varchar("type", { length: 255 }).$type<AdapterAccountType>().notNull(),
	provider: varchar("provider", { length: 255 }).notNull(),
	providerAccountId: varchar("providerAccountId", { length: 255 }).notNull(),
	refresh_token: text("refresh_token"),
	access_token: text("access_token"),
	expires_at: bigint("expires_at", { mode: "bigint" }),
	id_token: text("id_token"),
	scope: text("scope"),
	session_state: text("session_state"),
	token_type: text("token_type"),
});

// CREATE TABLE sessions
// (
//   id SERIAL,
//   "userId" INTEGER NOT NULL,
//   expires TIMESTAMPTZ NOT NULL,
//   "sessionToken" VARCHAR(255) NOT NULL,

//   PRIMARY KEY (id)
// );
export const sessions = pgTable("sessions", {
	id: serial("id").primaryKey(),
	userId: integer("userId")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
		expires: timestamp("expires", { withTimezone: true }).notNull(),
	sessionToken: varchar("sessionToken", { length: 255 }).notNull(),
});

// CREATE TABLE verification_token
// (
//   identifier TEXT NOT NULL,
//   expires TIMESTAMPTZ NOT NULL,
//   token TEXT NOT NULL,

//   PRIMARY KEY (identifier, token)
// );
export const verificationTokens = pgTable("verification_token", {
	identifier: text("identifier").notNull(),
	expires: timestamp("expires", { withTimezone: true }).notNull(),
	token: text("token").notNull(),
});

export const selectUserSchema = createSelectSchema(users);
export const insertUserSchema = createInsertSchema(users);
