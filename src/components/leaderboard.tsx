import { asc, db, desc, Leaderboard as LeaderboardTable } from "astro:db";
import { createResource, Match, Show, Switch } from "solid-js";

async function getLeaderboard() {
  return await db
    .select()
    .from(LeaderboardTable)
    .orderBy(desc(LeaderboardTable.highest_score))
    .limit(10);
}

export function Leaderboard() {
  const [leaderboard, { refetch }] = createResource(getLeaderboard);

  return (
    <div class="bg-white max-w-lg space-y-4 px-4 py-2 rounded-2xl">
      <h3>Leaderboard</h3>

      <Show when={leaderboard.loading}>
        <p>Loading...</p>
      </Show>
      <Switch>
        <Match when={leaderboard.error}>
          <p>Error: {leaderboard.error}</p>
        </Match>
        <Match when={leaderboard() !== null}>
          <div class="flex flex-row gap-5">
            {leaderboard()?.map((entry, idx) => (
              <div
                data-idx={idx}
                class="flex flex-row gap-5 justify-between w-full data-[idx=0]:text-amber-500 data-[idx=0]:text-xl 
                data-[idx=1]:text-green-500 data-[idx=1]:text-lg text-md"
              >
                <p>{entry.userId}</p>
                <p>{entry.highest_score}</p>
              </div>
            ))}
          </div>
        </Match>
      </Switch>
    </div>
  );
}
