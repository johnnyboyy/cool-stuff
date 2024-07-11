import { integer, text, sqliteTable } from "drizzle-orm/sqlite-core";

export const Users = sqliteTable("users", {
	id: integer("id").primaryKey().unique().notNull(),
	email: text("email").unique().notNull(),
});
