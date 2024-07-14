import { sql } from "drizzle-orm";
import { integer, sqliteTable, text, primaryKey } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema } from "drizzle-valibot";
import { string, object, number, union } from "valibot";
import type { AdapterAccountType } from "@auth/core/adapters";

export const users = sqliteTable("user", {
	id: text("id")
		.primaryKey()
		.$defaultFn(() => crypto.randomUUID()),
	name: text("name"),
	email: text("email").notNull(),
	emailVerified: integer("emailVerified", { mode: "timestamp_ms" }),
	image: text("image"),
});
export const selectUserSchema = createSelectSchema(users);
export const insertUserSchema = createInsertSchema(users);

export const accounts = sqliteTable(
	"account",
	{
		userId: text("userId")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		type: text("type").$type<AdapterAccountType>().notNull(),
		provider: text("provider").notNull(),
		providerAccountId: text("providerAccountId").notNull(),
		refresh_token: text("refresh_token"),
		access_token: text("access_token"),
		expires_at: integer("expires_at"),
		token_type: text("token_type"),
		scope: text("scope"),
		id_token: text("id_token"),
		session_state: text("session_state"),
	},
	(account) => ({
		compoundKey: primaryKey({
			columns: [account.provider, account.providerAccountId],
		}),
	})
);

export const sessions = sqliteTable("session", {
	sessionToken: text("sessionToken").primaryKey(),
	userId: text("userId")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
});

export const verificationTokens = sqliteTable(
	"verificationToken",
	{
		identifier: text("identifier").notNull(),
		token: text("token").notNull(),
		expires: integer("expires", { mode: "timestamp_ms" }).notNull(),
	},
	(verificationToken) => ({
		compositePk: primaryKey({
			columns: [verificationToken.identifier, verificationToken.token],
		}),
	})
);

export const authenticators = sqliteTable(
	"authenticator",
	{
		credentialID: text("credentialID").notNull().unique(),
		userId: text("userId")
			.notNull()
			.references(() => users.id, { onDelete: "cascade" }),
		providerAccountId: text("providerAccountId").notNull(),
		credentialPublicKey: text("credentialPublicKey").notNull(),
		counter: integer("counter").notNull(),
		credentialDeviceType: text("credentialDeviceType").notNull(),
		credentialBackedUp: integer("credentialBackedUp", {
			mode: "boolean",
		}).notNull(),
		transports: text("transports"),
	},
	(authenticator) => ({
		compositePK: primaryKey({
			columns: [authenticator.userId, authenticator.credentialID],
		}),
	})
);

export const userProfiles = sqliteTable("user_profiles", {
	id: integer("id").primaryKey(),
	userId: text("userId")
		.notNull()
		.references(() => users.id, { onDelete: "cascade" }),
	displayName: text("display_name"),
	bio: text("bio"),
	location: text("location"),
	website: text("website"),
	avatarUrl: text("avatar_url"),
	createdAt: integer("created_at", { mode: "timestamp" })
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
	updatedAt: integer("updated_at", { mode: "timestamp" })
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`),
});

export const selectUserProfileSchema = union([
	object({ id: number() }),
	object({ userId: string() }),
]);
export const insertUserProfileSchema = createInsertSchema(userProfiles);
