import { createEffect, createSignal } from "solid-js";

function getRandom(max: number) {
  return Math.floor(Math.random() * max);
}

export function useFart(condition: () => boolean) {
  const [farts, setFarts] = createSignal([] as { x: number; y: number }[]);

  const spawnFart = (x: number, y: number) => {
    setFarts((f) => [...f, { x, y }]);
  };

  createEffect(() => {
    if (condition()) {
      spawnFart(
        getRandom(window.innerWidth - 100),
        getRandom(window.innerHeight - 100),
      );
    }
  });

  return farts;
}
