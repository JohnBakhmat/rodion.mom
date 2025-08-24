type Props = {
  x: number;
  y: number;
};
export function Fart(props: Props) {
  return (
    <div
      class="fixed text-white text-3xl opacity-5 z-100"
      style={{
        top: `${props.y}px`,
        left: `${props.x}px`,
      }}
    >
      пукать
    </div>
  );
}
