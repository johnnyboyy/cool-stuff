import Resend from "@auth/core/providers/resend";
import PostgresAdapter from "@auth/pg-adapter";
import type { SolidAuthConfig } from "@solid-mediakit/auth";

import { pool } from "./db";

export const authOptions: SolidAuthConfig = {
	adapter: PostgresAdapter(pool),
	providers: [Resend({ from: "no-reply@johnzdanis.com" })],
};
