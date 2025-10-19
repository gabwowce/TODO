import { useEffect, useRef } from "react";

export function useConfettiRain({
  pieces = 160,
  duration = 3000,
  speed = 1,
  onDone,
}) {
  const ref = useRef(null);
  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    let raf = 0,
      running = true;
    const dpr = Math.max(1, window.devicePixelRatio || 1);
    const resize = () => {
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = window.innerWidth + "px";
      canvas.style.height = window.innerHeight + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize, { passive: true });

    const colors = [
      "#6d5efc",
      "#22c55e",
      "#eab308",
      "#06b6d4",
      "#ef4444",
      "#8b5cf6",
    ];
    const P = Array.from({ length: pieces }).map((_, i) => {
      const w = 6 + Math.random() * 7,
        h = w * (0.5 + Math.random() * 1.2);
      return {
        x: Math.random() * window.innerWidth,
        y: -Math.random() * window.innerHeight,
        w,
        h,
        vy: (120 + Math.random() * 180) * speed,
        vx: (Math.random() - 0.5) * 60,
        rot: Math.random() * Math.PI * 2,
        vr: (Math.random() - 0.5) * 0.2,
        color: colors[i % colors.length],
        delay: Math.random() * 600,
        started: false,
        done: false,
      };
    });

    const t0 = performance.now();
    const tick = (t) => {
      if (!running) return;
      const elapsed = t - t0;
      const stopSpawning = elapsed >= duration;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let active = 0;

      for (const p of P) {
        if (!p.started) {
          if (elapsed >= p.delay) {
            if (stopSpawning) {
              p.done = true;
              continue;
            }
            p.started = true;
          } else continue;
        }
        if (p.done) continue;

        p.x += Math.sin((t + p.delay) / 300) * 0.8 + (p.vx / 1000) * 16;
        p.y += (p.vy / 1000) * 16;
        p.rot += p.vr;

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();

        if (p.y > window.innerHeight + 50) {
          if (stopSpawning) p.done = true;
          else {
            p.y = -20 - Math.random() * 200;
            p.x = Math.random() * window.innerWidth;
            p.started = true;
          }
        } else active++;
      }

      if (!stopSpawning || active > 0) {
        raf = requestAnimationFrame(tick);
      } else {
        running = false;
        onDoneRef.current && onDoneRef.current();
      }
    };

    raf = requestAnimationFrame(tick);
    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      ctx && ctx.clearRect(0, 0, canvas.width, canvas.height);
    };
  }, [pieces, duration, speed]);

  return ref;
}
