import { useRef, useEffect, useCallback } from "react";

/**
 * LiquidImage
 * Wraps an <img> with a cursor-driven water-ripple effect.
 *
 * Physically, a real ripple isn't one outward push — it's a wave TRAIN:
 * a leading crest, followed by a trough, then a weaker crest, etc.,
 * expanding outward and losing energy as it spreads and ages. That's
 * what's modeled here: for every point in the displacement grid, we sum
 * a damped cosine wave (per active ripple) as a function of distance
 * behind the ripple's expanding wavefront. The sign of that cosine is
 * what gives you alternating in/out rings instead of a single bulge.
 *
 * That vector field (x/y push per point) is painted into a small offscreen
 * canvas each frame, encoded as R/G color, and fed into an SVG
 * <feDisplacementMap> which physically warps the <img> pixels to match —
 * so the rings visually radiate outward from wherever the cursor moved.
 *
 * Usage:
 *   <LiquidImage
 *     src={ABOUT_CONTENT.image}
 *     alt="Nufail Shaikh"
 *     className="aspect-[4/5] w-full max-w-xl border border-border"
 *   />
 */

const GRID_COLS = 80; // resolution of the displacement map — higher = crisper rings
const MAX_AGE = 1400; // ms a ripple's wave train lives before fully dissipating
const WAVE_SPEED = 0.00055; // normalized units per ms the wavefront expands
const WAVELENGTH = 0.075; // spacing between successive rings
const NUM_RINGS = 5; // how many rings trail behind the leading wavefront
const SPATIAL_DECAY = 2.6; // higher = rings weaken faster as they travel outward
const MAX_AMPLITUDE = 1; // vector magnitude cap (scaled by feDisplacementMap's `scale`)
const SPAWN_INTERVAL = 55; // ms between auto-spawned ripples while the pointer moves
const DISPLACEMENT_SCALE = 40; // px — overall strength of the visual warp

const LiquidImage = ({ src, alt, className = "" }) => {
  const wrapperRef = useRef(null);
  const canvasRef = useRef(document.createElement("canvas"));
  const feImageRef = useRef(null);
  const filterIdRef = useRef(`liquid-${Math.random().toString(36).slice(2)}`);

  const ripplesRef = useRef([]); // { u, v, t0 }
  const lastSpawnRef = useRef(0);
  const sizeRef = useRef({ w: GRID_COLS, h: GRID_COLS, aspect: 1 });
  const rafRef = useRef(null);

  // Keep the low-res grid's aspect ratio matched to the actual rendered image
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      if (!width || !height) return;
      const aspect = height / width;
      const w = GRID_COLS;
      const h = Math.max(8, Math.round(GRID_COLS * aspect));
      sizeRef.current = { w, h, aspect };
      canvasRef.current.width = w;
      canvasRef.current.height = h;
    };

    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const spawnRipple = useCallback((u, v) => {
    ripplesRef.current.push({ u, v, t0: performance.now() });
    if (ripplesRef.current.length > 20) ripplesRef.current.shift();
  }, []);

  const handlePointerMove = useCallback(
    (e) => {
      const el = wrapperRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const u = (e.clientX - rect.left) / rect.width;
      const v = (e.clientY - rect.top) / rect.height;

      const now = performance.now();
      if (now - lastSpawnRef.current > SPAWN_INTERVAL) {
        spawnRipple(u, v);
        lastSpawnRef.current = now;
      }
    },
    [spawnRipple]
  );

  // Main render loop
  useEffect(() => {
    const { current: canvas } = canvasRef;
    const ctx = canvas.getContext("2d", { willReadFrequently: true });
    const trailingSpan = WAVELENGTH * NUM_RINGS;

    const tick = () => {
      const now = performance.now();
      const { w, h, aspect } = sizeRef.current;

      ripplesRef.current = ripplesRef.current.filter(
        (r) => now - r.t0 < MAX_AGE
      );
      const ripples = ripplesRef.current;

      const imageData = ctx.createImageData(w, h);
      const data = imageData.data;

      for (let py = 0; py < h; py++) {
        const v = py / h;
        for (let px = 0; px < w; px++) {
          const u = px / w;
          let vx = 0;
          let vy = 0;

          for (let i = 0; i < ripples.length; i++) {
            const r = ripples[i];
            const age = now - r.t0;
            const dx = u - r.u;
            const dy = (v - r.v) / aspect; // aspect-correct so rings stay circular
            const dist = Math.sqrt(dx * dx + dy * dy);

            const front = age * WAVE_SPEED; // where the leading edge currently is
            const phase = dist - front; // <= 0 means the wave has already reached this point

            // Only render the trailing wave train behind the front, not ahead of it
            if (phase > 0 || phase < -trailingSpan) continue;

            const spatialEnvelope = Math.exp(-dist * SPATIAL_DECAY);
            const temporalEnvelope = 1 - age / MAX_AGE; // overall fade as the ripple ages out
            const trailEnvelope = 1 - -phase / trailingSpan; // older rings within the train are weaker
            const oscillation = Math.cos((2 * Math.PI * phase) / WAVELENGTH);

            const amplitude =
              MAX_AMPLITUDE *
              spatialEnvelope *
              temporalEnvelope *
              trailEnvelope *
              oscillation;

            if (dist > 1e-4) {
              vx += (dx / dist) * amplitude;
              vy += (dy / dist) * amplitude;
            }
          }

          const idx = (py * w + px) * 4;
          data[idx] = Math.max(0, Math.min(255, 128 + vx * 127));
          data[idx + 1] = Math.max(0, Math.min(255, 128 + vy * 127));
          data[idx + 2] = 128;
          data[idx + 3] = 255;
        }
      }

      ctx.putImageData(imageData, 0, 0);

      if (feImageRef.current) {
        feImageRef.current.setAttribute("href", canvas.toDataURL());
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const filterId = filterIdRef.current;

  return (
    <div
      ref={wrapperRef}
      className={`relative overflow-hidden ${className}`}
      onPointerMove={handlePointerMove}
    >
      <svg className="absolute h-0 w-0" aria-hidden="true">
        <defs>
          <filter id={filterId} x="-10%" y="-10%" width="120%" height="120%">
            <feImage
              ref={feImageRef}
              result="dispMap"
              preserveAspectRatio="none"
              x="0"
              y="0"
              width="100%"
              height="100%"
            />
            <feGaussianBlur in="dispMap" stdDeviation="0.6" result="dispMapSmooth" />
            <feDisplacementMap
              in="SourceGraphic"
              in2="dispMapSmooth"
              scale={DISPLACEMENT_SCALE}
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>

      <img
        src={src}
        alt={alt}
        style={{ filter: `url(#${filterId})` }}
        className="h-full w-full object-cover object-top"
        draggable={false}
      />
    </div>
  );
};

export default LiquidImage;