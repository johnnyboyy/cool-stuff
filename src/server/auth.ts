import Resend from "@auth/core/providers/resend";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import type { SolidAuthConfig } from "@solid-mediakit/auth/src/index";

import { db } from "./db";

export const authOptions: SolidAuthConfig = {
	adapter: DrizzleAdapter(db),
	providers: [Resend({ from: "no-reply@johnzdanis.com" })],
};
