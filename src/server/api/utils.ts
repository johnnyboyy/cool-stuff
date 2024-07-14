import { eq } from "drizzle-orm";
import { initTRPC, TRPCError } from "@trpc/server";
import { getSession } from "@solid-mediakit/auth";
import type { Session } from "@solid-mediakit/auth";
import type { FetchCreateContextFnOptions } from "@trpc/server/adapters/fetch";

import { authOptions } from "~/server/auth";
import { db, users } from "~/server/db";

// Create context type
export type Context = {
	req: Request;
	session: Session | undefined;
	user: Session["user"] | undefined;
};

export const t = initTRPC.context<Context>().create();

export const createTRPCRouter = t.router;
export const publicProcedure = t.procedure;
export const middleware = t.middleware;

export const createContext = async (opts: FetchCreateContextFnOptions): Promise<Context> => {
	const session = await getSession(opts.req, authOptions);

	if (session === null || session.user === undefined || session.user.id === undefined) {
		return { req: opts.req, session: undefined, user: undefined };
	} else {
		const user = db.select().from(users).where(eq(users.id, session.user.id)).get();

		if (user === undefined) {
			console.log("user has a session but no id");
		}

		return { req: opts.req, session, user };
	}
};

const authMiddleware = middleware(async ({ ctx, next }) => {
	if (!ctx.session || !ctx.user || ctx.user.id === undefined) {
		throw new TRPCError({ code: "UNAUTHORIZED" });
	} else {
		return next({
			ctx: {
				...ctx,
				session: ctx.session,
				user: ctx.user,
			},
		});
	}
});

// Protected procedure
export const protectedProcedure = publicProcedure.use(authMiddleware);
