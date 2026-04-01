'use client';
import { useEffect, useRef } from 'react';

export default function SacredGeometryCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    let animId: number;
    let startTime = performance.now();

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = (now: number) => {
      const elapsed = now - startTime;
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const baseR = Math.min(w, h) * 0.38;
      const rings = window.innerWidth < 768 ? 3 : 4;
      const pts = 6;
      const speed = 0.00025;

      ctx.strokeStyle = 'rgba(201,168,76,0.18)';
      ctx.lineWidth = 0.7;

      for (let ring = 1; ring <= rings; ring++) {
        const r = baseR * (ring / rings);
        const rot = elapsed * speed * (ring % 2 === 0 ? 1 : -1);

        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.stroke();

        const points: [number, number][] = [];
        for (let p = 0; p < pts; p++) {
          const a = (p / pts) * Math.PI * 2 + rot;
          points.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
        }

        for (let i = 0; i < points.length; i++) {
          for (let j = i + 1; j < points.length; j++) {
            ctx.beginPath();
            ctx.moveTo(points[i][0], points[i][1]);
            ctx.lineTo(points[j][0], points[j][1]);
            ctx.stroke();
          }
        }

        if (ring < rings) {
          const nr = baseR * ((ring + 1) / rings);
          const nrot = elapsed * speed * ((ring + 1) % 2 === 0 ? 1 : -1);
          for (let p = 0; p < pts; p++) {
            const a = (p / pts) * Math.PI * 2 + rot;
            const na = (p / pts) * Math.PI * 2 + nrot;
            ctx.beginPath();
            ctx.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
            ctx.lineTo(cx + Math.cos(na) * nr, cy + Math.sin(na) * nr);
            ctx.stroke();
          }
        }
      }

      ctx.fillStyle = 'rgba(201,168,76,0.5)';
      ctx.beginPath();
      ctx.arc(cx, cy, 2, 0, Math.PI * 2);
      ctx.fill();

      animId = requestAnimationFrame(draw);
    };

    const handleVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animId);
      } else {
        startTime = performance.now();
        animId = requestAnimationFrame(draw);
      }
    };

    document.addEventListener('visibilitychange', handleVisibility);
    animId = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
      }}
    />
  );
}
