import Resend from "@auth/core/providers/resend";
import type { SolidAuthConfig } from "@solid-mediakit/auth/src/index";
import { DrizzleAdapter } from "@auth/drizzle-adapter";

import { db } from "./db";

export const authOptions: SolidAuthConfig = {
	adapter: DrizzleAdapter(db),
	providers: [Resend({ from: "onboarding@resend.dev" })],
};
