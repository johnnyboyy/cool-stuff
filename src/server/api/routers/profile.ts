import { eq } from "drizzle-orm";
import { parse } from "valibot";
import { insertUserProfileSchema, selectUserProfileSchema, userProfiles } from "~/server/db";
import { db } from "~/server/db";
import { publicProcedure, createTRPCRouter, protectedProcedure } from "~/server/api/utils";

export const userProfileRouter = createTRPCRouter({
	// getProfile: protectedProcedure
	// 	.input((input) => parse(selectUserProfileSchema, input))
	// 	.query(({ input }) => {
	// 		const select = db.select().from(userProfiles);

	// 		if ((input as { id: number }).id !== undefined) {
	// 			return select.where(eq(userProfiles.id, (input as { id: number }).id)).get();
	// 		} else {
	// 			return select.where(eq(userProfiles.userId, (input as { userId: string }).userId)).get();
	// 		}
	// 	}),

	getCurrentUserProfile: protectedProcedure.query(({ ctx }) => {
		return db.select().from(userProfiles).where(eq(userProfiles.userId, ctx.user.id)).get();
	}),

	// createProfile: protectedProcedure
	// 	.input((input) => parse(insertUserProfileSchema, input))
	// 	.mutation(async ({ input, ctx }) => {
	// 		const userId = ctx.user.id;
	// 		const newProfile = await db
	// 			.insert(userProfiles)
	// 			.values({ ...input, userId })
	// 			.returning()
	// 			.get();
	// 		return newProfile;
	// 	}),

	// updateProfile: protectedProcedure
	// 	.input((input) => parse(insertUserProfileSchema, input))
	// 	.mutation(async ({ input, ctx }) => {
	// 		const userId = ctx.user.id;
	// 		const updatedProfile = await db
	// 			.update(userProfiles)
	// 			.set({ ...input, updatedAt: new Date() })
	// 			.where(eq(userProfiles.userId, userId))
	// 			.returning()
	// 			.get();
	// 		return updatedProfile;
	// 	}),
});
