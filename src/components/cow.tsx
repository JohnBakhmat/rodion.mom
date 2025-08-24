import { makeAudio } from "@solid-primitives/audio";
import { children, type ResolvedChildren } from "solid-js";

type Props = {
  children: ResolvedChildren;
};

export function Cow(props: Props) {
  const player = makeAudio("/moo.wav");

  return (
    <button
      class="h-full w-fit aspect-square cursor-pointer"
      type="button"
      onclick={() => player.play()}
    >
      {props.children}
    </button>
  );
}
