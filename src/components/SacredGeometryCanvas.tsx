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
      const isMobile = window.innerWidth < 768;
      // Larger: fill more of the viewport
      const baseR = Math.min(w, h) * (isMobile ? 0.44 : 0.46);
      const rings = isMobile ? 3 : 5;
      const pts = 6;
      const speed = 0.00022;

      for (let ring = 1; ring <= rings; ring++) {
        const r = baseR * (ring / rings);
        const rot = elapsed * speed * (ring % 2 === 0 ? 1 : -1);
        // Outer rings slightly more visible
        const alpha = 0.12 + (ring / rings) * 0.22;

        // Circle
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(201,168,76,${alpha})`;
        ctx.lineWidth = ring === rings ? 1.0 : 0.8;
        ctx.stroke();

        // Vertices
        const points: [number, number][] = [];
        for (let p = 0; p < pts; p++) {
          const a = (p / pts) * Math.PI * 2 + rot;
          points.push([cx + Math.cos(a) * r, cy + Math.sin(a) * r]);
        }

        // Connecting lines within ring
        ctx.strokeStyle = `rgba(201,168,76,${alpha * 0.85})`;
        ctx.lineWidth = 0.6;
        for (let i = 0; i < points.length; i++) {
          for (let j = i + 1; j < points.length; j++) {
            ctx.beginPath();
            ctx.moveTo(points[i][0], points[i][1]);
            ctx.lineTo(points[j][0], points[j][1]);
            ctx.stroke();
          }
        }

        // Connectors to next ring
        if (ring < rings) {
          const nr = baseR * ((ring + 1) / rings);
          const nrot = elapsed * speed * ((ring + 1) % 2 === 0 ? 1 : -1);
          ctx.strokeStyle = `rgba(201,168,76,${alpha * 0.55})`;
          ctx.lineWidth = 0.5;
          for (let p = 0; p < pts; p++) {
            const a = (p / pts) * Math.PI * 2 + rot;
            const na = (p / pts) * Math.PI * 2 + nrot;
            ctx.beginPath();
            ctx.moveTo(cx + Math.cos(a) * r, cy + Math.sin(a) * r);
            ctx.lineTo(cx + Math.cos(na) * nr, cy + Math.sin(na) * nr);
            ctx.stroke();
          }
        }

        // Glowing vertex dots on outermost ring
        if (ring === rings) {
          const pulse = 0.5 + 0.5 * Math.sin(elapsed * 0.0012);
          ctx.fillStyle = `rgba(201,168,76,${0.4 + pulse * 0.35})`;
          for (const [px, py] of points) {
            ctx.beginPath();
            ctx.arc(px, py, 2.5, 0, Math.PI * 2);
            ctx.fill();
          }
        }
      }

      // Centre glow
      const glowPulse = 0.5 + 0.5 * Math.sin(elapsed * 0.0008);
      const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, 18);
      grd.addColorStop(0, `rgba(201,168,76,${0.55 + glowPulse * 0.25})`);
      grd.addColorStop(1, 'rgba(201,168,76,0)');
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(cx, cy, 18, 0, Math.PI * 2);
      ctx.fill();

      // Centre dot
      ctx.fillStyle = `rgba(201,168,76,${0.7 + glowPulse * 0.3})`;
      ctx.beginPath();
      ctx.arc(cx, cy, 2.5, 0, Math.PI * 2);
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
