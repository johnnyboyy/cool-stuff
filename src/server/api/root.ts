import { exampleRouter } from "./routers/example";
import { userProfileRouter } from "./routers/profile";
import { createTRPCRouter } from "./utils";

export const appRouter = createTRPCRouter({
	example: exampleRouter,
	userProfile: userProfileRouter,
});

export type AppRouter = typeof appRouter;
