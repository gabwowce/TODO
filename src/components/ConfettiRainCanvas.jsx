import { useConfettiRain } from "../hooks/useConfettiRain";

export default function ConfettiRainCanvas(props) {
  const ref = useConfettiRain(props);
  return (
    <canvas
      ref={ref}
      style={{
        position: "fixed",
        inset: 0,
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
}
