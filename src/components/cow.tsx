import { makeAudio } from "@solid-primitives/audio";
import { createEffect, createSignal, For } from "solid-js";
import { Fart } from "./fart";

const cowSounds = {
  HURT1: "/sounds/Cow_hurt1.ogg",
  HURT3: "/sounds/Cow_hurt3.ogg",
  IDLE1: "/sounds/Cow_idle1.ogg",
  IDLE4: "/sounds/Cow_idle4.ogg",
  STEP1: "/sounds/Cow_step1.ogg",
  MOO: "/sounds/moo.wav",
} as const;

type CowSounds = keyof typeof cowSounds;

const chances = {
  MOO: 50,
  HURT1: 20,
  IDLE4: 15,
  HURT3: 5,
  IDLE1: 5,
  STEP1: 5,
} as const satisfies Readonly<Record<CowSounds, number>>;

const scan = (sum: number) => {
  return (value: number) => (sum += value);
};

const cdf = Object.values(chances)
  .map((x) => x / 100)
  .map(scan(0));

export function Cow() {
  const [score, setScore] = createSignal(0);

  const [farts, setFarts] = createSignal([] as { x: number; y: number }[]);

  const players = {
    MOO: makeAudio(cowSounds.MOO),
    HURT1: makeAudio(cowSounds.HURT1),
    HURT3: makeAudio(cowSounds.HURT3),
    IDLE4: makeAudio(cowSounds.IDLE4),
    IDLE1: makeAudio(cowSounds.IDLE1),
    STEP1: makeAudio(cowSounds.STEP1),
  } satisfies Record<CowSounds, HTMLAudioElement>;

  const handleClick = () => {
    const soundIdx = cdf.findIndex((chance) => chance >= Math.random());
    const sound = Object.keys(cowSounds).at(soundIdx) as CowSounds;

    setScore((p) => p + 1);

    const player = players[sound];
    player.play();
  };

  createEffect(() => {
    if (score() % 4 === 0 && score() !== 0) {
      setFarts((p) => [
        ...p,
        {
          x: getRandom(window.innerWidth - 100),
          y: getRandom(window.innerHeight - 100),
        },
      ]);
    }
  });

  return (
    <button
      class="h-full w-fit aspect-square cursor-pointer relative z-0"
      type="button"
      onclick={handleClick}
    >
      <img src="/cow.webp" alt="cow" class="w-fit h-full" />
      <div class="absolute top-5 left-5 text-white">{score()}</div>
      <For each={farts()}>{(item) => <Fart x={item.x} y={item.y} />}</For>
    </button>
  );
}

function getRandom(max: number) {
  return Math.floor(Math.random() * max);
}
