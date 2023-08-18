import { useSignal } from "@preact/signals";

export function Counter() {
  const count = useSignal(0);

  return (
    <>
      <button onClick={() => count.value++}>+</button>
      <button onClick={() => count.value--}>-</button>
      {count}
    </>
  );
}
