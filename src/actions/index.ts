import { db, eq, Leaderboard, Users } from "astro:db";
import { defineAction } from "astro:actions";
import { z } from "astro:schema";
import { nanoid } from "nanoid";

export const server = {
  addUser: defineAction({
    input: z.object({
      userId: z.string(),
    }),
    handler: async (input) => {
      await db
        .insert(Users)
        .values({
          id: input.userId,
        })
        .execute();
    },
  }),
  getHighscore: defineAction({
    input: z.object({
      userId: z.string(),
    }),
    handler: async (input) => {
      const results = await db
        .select()
        .from(Users)
        .innerJoin(Leaderboard, eq(Users.id, Leaderboard.userId))
        .where(eq(Users.id, input.userId));

      const result = results.at(0);
      if (!result) return 0;

      return result.Leaderboard.highest_score ?? 0;
    },
  }),
  setHighscore: defineAction({
    input: z.object({
      userId: z.string(),
      score: z.number(),
    }),
    handler: async (input) => {
      await db
        .insert(Leaderboard)
        .values({
          id: nanoid(),
          userId: input.userId,
          highest_score: input.score,
        })
        .onConflictDoUpdate({
          target: Leaderboard.userId,
          set: {
            highest_score: input.score,
          },
        })
        .execute();
    },
  }),
};
