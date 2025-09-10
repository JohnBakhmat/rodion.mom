import { column, defineDb, defineTable } from "astro:db";

const Users = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
  },
});

const Leaderboard = defineTable({
  columns: {
    id: column.text({ primaryKey: true }),
    userId: column.text({ references: () => Users.columns.id, unique: true }),
    highest_score: column.number(),
  },
});

// https://astro.build/db/config
export default defineDb({
  tables: {
    Users,
    Leaderboard,
  },
});
