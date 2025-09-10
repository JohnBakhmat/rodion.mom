import {
  createEffect,
  createSignal,
  For,
  createResource,
  Match,
  Show,
  Switch,
} from "solid-js";
import { Fart } from "./fart";
import useLocalStorage from "@/lib/use-local-storage";
import { nanoid } from "nanoid";
import { useAudioPlayer } from "@/lib/use-audio-player";
import { useFart } from "@/lib/use-fart";
import { actions } from "astro:actions";

const fetchHighscore = (userId: string) =>
  actions
    .getHighscore({
      userId,
    })
    .then((x) => x.data ?? 0);

const setHighscore = (userId: string, score: number) =>
  actions.setHighscore({
    userId,
    score,
  });

const addUser = (userId: string) => actions.addUser({ userId: userId });

export function Cow() {
  const play = useAudioPlayer();
  const [score, setScore] = createSignal(0);
  const [userId, setUserId] = useLocalStorage("user-id", "");
  const farts = useFart(() => score() % 4 === 0 && score() !== 0);
  const [highscore, { mutate }] = createResource(userId, fetchHighscore);

  createEffect(async () => {
    if (userId()) return;
    const newId = nanoid();
    setUserId(newId);
    await addUser(newId);
  });

  createEffect(async () => {
    const hs = highscore() ?? 0;

    if (score() - hs >= 5) {
      mutate(() => score());
      await setHighscore(userId(), score());
    }
  });

  const handleClick = () => {
    setScore((p) => p + 1);
    play();
  };

  return (
    <button
      class="h-full w-fit aspect-square cursor-pointer relative z-0"
      type="button"
      onclick={handleClick}
    >
      <img src="/cow.webp" alt="cow" class="w-fit h-full" />
      <div class="absolute top-5 left-5 text-white">
        your id: {userId()} <br />
        your score: {score()}
        <Show when={highscore.loading}>
          <p>Loading...</p>
        </Show>
        <Switch>
          <Match when={highscore.error}>
            <p>Error: {highscore.error}</p>
          </Match>
          <Match when={highscore() !== null}>
            <p>Your highest score: {highscore()?.toString()}</p>
          </Match>
        </Switch>
      </div>
      <For each={farts()}>{(item) => <Fart x={item.x} y={item.y} />}</For>
    </button>
  );
}
