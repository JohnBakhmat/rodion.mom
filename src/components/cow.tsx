import { makeAudio } from "@solid-primitives/audio";

export function Cow() {
  const player = makeAudio("/moo.wav");

  return (
    <button
      class="h-full w-fit aspect-square cursor-pointer"
      type="button"
      onclick={() => player.play()}
    >
      <img src="/cow.webp" alt="cow" class="w-fit h-full" />
    </button>
  );
}
