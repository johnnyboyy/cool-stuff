import { wrap } from "@typeschema/valibot";
import { string } from "valibot";
import { createTRPCRouter, publicProcedure } from "../utils";

export const profilesRouter = createTRPCRouter({
  search: publicProcedure
    .input(wrap(string()))
    .query(({ input }) => {
      return `Hello ${input}!`;
    })
});
