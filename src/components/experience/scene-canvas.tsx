"use client";

import { useEffect, useMemo, useRef } from "react";

type Point = {
  x: number;
  y: number;
  size: number;
  color: string;
  alpha?: number;
};

type Star = {
  x: number;
  y: number;
  z: number;
  size: number;
  color: string;
};

type SceneCanvasProps = {
  mode: "home" | "space" | "grow" | "deliver";
  progress: number;
  activeKey?: string | null;
};

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

function lerp(start: number, end: number, amount: number) {
  return start + (end - start) * amount;
}

function randomFromSeed(seed: number) {
  const x = Math.sin(seed * 9999.13) * 43758.5453;
  return x - Math.floor(x);
}

function hexToRgba(hex: string, alpha: number) {
  const value = hex.replace("#", "");
  const expanded = value.length === 3 ? value.split("").map((char) => char + char).join("") : value;
  const integer = Number.parseInt(expanded, 16);
  const r = (integer >> 16) & 255;
  const g = (integer >> 8) & 255;
  const b = integer & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function createStars(count: number): Star[] {
  return Array.from({ length: count }, (_, index) => {
    const seed = index + 1;
    return {
      x: randomFromSeed(seed * 1.37),
      y: randomFromSeed(seed * 2.11),
      z: randomFromSeed(seed * 3.81),
      size: 0.6 + randomFromSeed(seed * 7.21) * 1.8,
      color: index % 5 === 0 ? "#8fd0ff" : "#ffffff",
    };
  });
}

function ellipseCloud(
  count: number,
  width: number,
  height: number,
  color: string,
  centerX = 0,
  centerY = 0,
  hollow = 0,
): Point[] {
  return Array.from({ length: count }, (_, index) => {
    const seed = index + 1;
    const angle = randomFromSeed(seed * 2.71) * Math.PI * 2;
    const radius = hollow + (1 - hollow) * Math.pow(randomFromSeed(seed * 1.91), 0.72);
    return {
      x: centerX + Math.cos(angle) * width * radius,
      y: centerY + Math.sin(angle) * height * radius,
      size: 1.2 + randomFromSeed(seed * 5.91) * 2.3,
      color,
      alpha: 0.45 + randomFromSeed(seed * 4.67) * 0.55,
    };
  });
}

function rectangleCloud(
  count: number,
  width: number,
  height: number,
  color: string,
  centerX = 0,
  centerY = 0,
): Point[] {
  return Array.from({ length: count }, (_, index) => {
    const seed = index + 1;
    return {
      x: centerX + (randomFromSeed(seed * 2.19) - 0.5) * width,
      y: centerY + (randomFromSeed(seed * 3.23) - 0.5) * height,
      size: 1.1 + randomFromSeed(seed * 4.31) * 2.1,
      color,
      alpha: 0.4 + randomFromSeed(seed * 7.17) * 0.6,
    };
  });
}

function lineCloud(
  count: number,
  fromX: number,
  fromY: number,
  toX: number,
  toY: number,
  color: string,
  jitterX: number,
  jitterY: number,
): Point[] {
  return Array.from({ length: count }, (_, index) => {
    const seed = index + 1;
    const t = randomFromSeed(seed * 1.29);
    return {
      x: lerp(fromX, toX, t) + (randomFromSeed(seed * 2.49) - 0.5) * jitterX,
      y: lerp(fromY, toY, t) + (randomFromSeed(seed * 4.19) - 0.5) * jitterY,
      size: 0.9 + randomFromSeed(seed * 5.87) * 1.9,
      color,
      alpha: 0.35 + randomFromSeed(seed * 8.11) * 0.55,
    };
  });
}

function mergePoints(...groups: Point[][]) {
  return groups.flat();
}

function buildHomeShape(width: number, height: number, activeKey?: string | null) {
  const cx = width * 0.5;
  const cy = height * 0.48;
  const whale = mergePoints(
    ellipseCloud(1500, 88, 124, "#b8ecff", 0, -18),
    lineCloud(950, -260, 26, 260, 26, "#b8ecff", 36, 18),
    lineCloud(900, -220, 66, 220, 84, "#b8ecff", 42, 16),
    lineCloud(700, -72, -8, -18, 150, "#b8ecff", 16, 14),
    lineCloud(700, 72, -8, 18, 150, "#b8ecff", 16, 14),
    lineCloud(300, 0, -38, 0, 122, "#ffffff", 10, 10),
  ).map((point, index) => ({
    ...point,
    x: point.x + cx,
    y: point.y + cy + Math.sin(index * 0.08) * 2,
  }));

  const gates = [
    { key: "/en/grow", color: "#5fdd76", x: width * 0.39, y: height * 0.36, w: 58, h: 136 },
    { key: "/en/deliver", color: "#f3bf63", x: width * 0.67, y: height * 0.35, w: 74, h: 156 },
    { key: "/en/space", color: "#cf56e2", x: width * 0.5, y: height * 0.73, w: 78, h: 112 },
  ];

  const gatePoints = gates.flatMap((gate) => {
    const highlight = activeKey === gate.key ? 1.35 : 1;
    return Array.from({ length: 520 }, (_, index) => {
      const seed = index + gate.x;
      const t = randomFromSeed(seed * 1.19);
      const side = randomFromSeed(seed * 3.31) > 0.5 ? -1 : 1;
      const localY = gate.h * (t - 0.5);
      const curve = Math.sin(clamp((localY + gate.h * 0.5) / gate.h, 0, 1) * Math.PI);
      const offset = gate.w * curve * side;
      return {
        x: gate.x + offset + (randomFromSeed(seed * 2.13) - 0.5) * 20,
        y: gate.y + localY + (randomFromSeed(seed * 6.37) - 0.5) * 18,
        size: (0.8 + randomFromSeed(seed * 7.11) * 2.2) * highlight,
        color: gate.color,
        alpha: 0.4 + randomFromSeed(seed * 8.93) * 0.5,
      };
    });
  });

  const tunnel = Array.from({ length: 1700 }, (_, index) => {
    const seed = index + 1;
    const side = index % 2 === 0 ? -1 : 1;
    const depth = Math.pow(randomFromSeed(seed * 2.17), 0.58);
    const spread = lerp(width * 0.12, width * 0.55, depth);
    return {
      x: width * 0.5 + side * spread + (randomFromSeed(seed * 3.91) - 0.5) * 80,
      y: lerp(height * 0.02, height * 1.02, randomFromSeed(seed * 5.33)),
      size: 0.7 + depth * 1.9,
      color: "#8fd0ff",
      alpha: 0.18 + depth * 0.45,
    };
  });

  return { whale, gatePoints, tunnel };
}

function buildSpaceScenes(width: number, height: number): Point[][] {
  const cx = width * 0.56;
  const cy = height * 0.48;
  return [
    mergePoints(
      lineCloud(900, cx - 20, cy + 170, cx - 8, cy - 150, "#ffffff", 30, 16),
      lineCloud(900, cx + 80, cy + 220, cx + 95, cy - 250, "#ffffff", 34, 24),
      ellipseCloud(1200, 380, 92, "#ffffff", cx + 40, cy + 150, 0.6),
      rectangleCloud(400, 1100, 280, "#ffffff", cx, cy + 250),
    ),
    mergePoints(
      rectangleCloud(1200, 260, 260, "#8ec6ff", cx + 20, cy),
      Array.from({ length: 600 }, (_, index) => {
        const seed = index + 1;
        const side = index % 2 === 0 ? -1 : 1;
        return {
          x: cx + side * (120 + randomFromSeed(seed * 3.1) * 120),
          y: cy + (randomFromSeed(seed * 5.1) - 0.5) * 220,
          size: 1.2 + randomFromSeed(seed * 2.1) * 2.1,
          color: "#ffffff",
          alpha: 0.55,
        };
      }),
    ),
    mergePoints(
      ellipseCloud(1100, 140, 140, "#f3bf63", cx + 20, cy - 30, 0.18),
      ellipseCloud(900, 270, 66, "#f3bf63", cx + 20, cy - 30, 0.62),
      lineCloud(350, cx - 10, cy + 80, cx + 70, cy - 110, "#ffffff", 30, 30),
    ),
    mergePoints(
      ellipseCloud(1500, 170, 170, "#8fd0ff", cx + 40, cy + 40, 0.04),
      ellipseCloud(400, 220, 220, "#8fd0ff", cx + 40, cy + 40, 0.82),
      lineCloud(250, cx - 210, cy + 10, cx + 240, cy + 12, "#8fd0ff", 22, 10),
    ),
    mergePoints(
      ellipseCloud(1400, 180, 180, "#8fd0ff", cx + 20, cy + 34, 0.02),
      ellipseCloud(500, 270, 92, "#ffffff", cx + 30, cy + 18, 0.86),
      Array.from({ length: 280 }, (_, index) => {
        const seed = index + 1;
        const angle = (index / 280) * Math.PI * 2;
        const orbit = 300 + randomFromSeed(seed * 1.4) * 50;
        return {
          x: cx + 20 + Math.cos(angle) * orbit,
          y: cy + 60 + Math.sin(angle) * orbit * 0.28,
          size: 1.3,
          color: "#8fd0ff",
          alpha: 0.5,
        };
      }),
    ),
  ];
}

function buildGrowScenes(width: number, height: number): Point[][] {
  const cx = width * 0.5;
  const cy = height * 0.48;
  return [
    [ellipseCloud(1700, 130, 260, "#f4bf63", cx, cy, 0.3)].flat(),
    mergePoints(
      ellipseCloud(480, 54, 76, "#f4bf63", cx, cy + 150, 0.15),
      lineCloud(420, cx, cy + 120, cx, cy - 10, "#9ce27d", 12, 10),
      ellipseCloud(420, 60, 34, "#9ce27d", cx - 34, cy - 10, 0.1),
      ellipseCloud(420, 60, 34, "#9ce27d", cx + 34, cy - 36, 0.1),
    ),
    mergePoints(
      lineCloud(720, cx, cy + 190, cx, cy - 120, "#7dcf63", 28, 14),
      Array.from({ length: 680 }, (_, index) => {
        const seed = index + 1;
        const side = index % 2 === 0 ? -1 : 1;
        const t = randomFromSeed(seed * 2.19);
        return {
          x: cx + side * (70 + t * 120) + (randomFromSeed(seed * 4.37) - 0.5) * 14,
          y: cy + 40 - t * 180 + side * Math.sin(t * Math.PI) * 20,
          size: 1.4,
          color: "#7dcf63",
          alpha: 0.5,
        };
      }),
      ellipseCloud(640, 240, 180, "#9bd85f", cx, cy - 120, 0.32),
    ),
    mergePoints(
      lineCloud(820, cx, cy + 220, cx, cy - 160, "#7d5832", 36, 20),
      ellipseCloud(1100, 360, 260, "#8ee069", cx, cy - 170, 0.28),
      ellipseCloud(400, 260, 150, "#f4bf63", cx + 10, cy - 140, 0.84),
    ),
    mergePoints(
      lineCloud(920, cx, cy + 230, cx, cy - 210, "#7d5832", 42, 20),
      ellipseCloud(1500, 420, 300, "#8fe066", cx, cy - 200, 0.16),
      ellipseCloud(820, 220, 120, "#7d5832", cx, cy - 30, 0.78),
    ),
  ];
}

function buildDeliverScenes(width: number, height: number): Point[][] {
  const cx = width * 0.62;
  const cy = height * 0.5;
  return [
    mergePoints(
      rectangleCloud(1200, 130, 110, "#f3c07a", cx - 120, cy - 30),
      lineCloud(900, cx - 260, cy + 80, cx + 380, cy + 80, "#404d9f", 30, 24),
      lineCloud(220, cx - 240, cy + 94, cx + 360, cy + 94, "#ffffff", 20, 8),
    ),
    mergePoints(
      Array.from({ length: 980 }, (_, index) => {
        const seed = index + 1;
        const row = index % 8;
        const col = Math.floor(index / 8) % 4;
        return {
          x: cx - 260 + row * 70 + (randomFromSeed(seed * 3.1) - 0.5) * 28,
          y: cy - 120 + col * 60 + (randomFromSeed(seed * 5.1) - 0.5) * 28,
          size: 1.5,
          color: ["#f4bf63", "#54c96d", "#2a79ff", "#ffffff"][col],
          alpha: 0.5,
        };
      }),
      rectangleCloud(300, 700, 90, "#2c3168", cx, cy + 150),
    ),
    mergePoints(
      rectangleCloud(1200, 330, 120, "#f18b23", cx - 40, cy + 20),
      rectangleCloud(520, 90, 90, "#ffffff", cx + 170, cy - 28),
      ellipseCloud(400, 50, 50, "#2f3344", cx - 110, cy + 90, 0.3),
      ellipseCloud(400, 50, 50, "#2f3344", cx + 20, cy + 90, 0.3),
      ellipseCloud(400, 50, 50, "#2f3344", cx + 100, cy + 90, 0.3),
    ),
    mergePoints(
      lineCloud(900, cx - 260, cy + 80, cx + 260, cy + 40, "#ffffff", 24, 18),
      rectangleCloud(1000, 260, 80, "#ffffff", cx - 30, cy + 30),
      Array.from({ length: 700 }, (_, index) => {
        const seed = index + 1;
        return {
          x: cx - 80 + (randomFromSeed(seed * 2.1) - 0.5) * 240,
          y: cy - 40 - Math.floor(index / 80) * 20 + (randomFromSeed(seed * 5.7) - 0.5) * 14,
          size: 1.2,
          color: ["#f45e4e", "#2a79ff", "#54c96d", "#f4bf63"][index % 4],
          alpha: 0.65,
        };
      }),
      rectangleCloud(600, 1000, 220, "#2b6fc8", cx + 40, cy + 200),
    ),
    mergePoints(
      lineCloud(1400, cx - 120, cy - 30, cx + 210, cy - 60, "#f1f1f1", 30, 24),
      lineCloud(920, cx - 20, cy + 10, cx + 20, cy - 40, "#f1f1f1", 120, 24),
      lineCloud(400, cx - 250, cy + 140, cx + 300, cy + 210, "#f4bf63", 60, 24),
      rectangleCloud(500, 1200, 240, "#141821", cx, cy + 260),
    ),
  ];
}

export function SceneCanvas({ mode, progress, activeKey }: SceneCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const stars = useMemo(() => createStars(mode === "home" ? 2400 : 1700), [mode]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    let width = 0;
    let height = 0;
    let animationFrame = 0;
    let homeShapes = buildHomeShape(1440, 900, activeKey);
    let scenes = buildSpaceScenes(1440, 900);

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const ratio = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      homeShapes = buildHomeShape(width, height, activeKey);
      scenes =
        mode === "space"
          ? buildSpaceScenes(width, height)
          : mode === "grow"
            ? buildGrowScenes(width, height)
            : buildDeliverScenes(width, height);
    };

    const drawParticle = (point: Point) => {
      context.fillStyle = hexToRgba(point.color, point.alpha ?? 0.7);
      context.beginPath();
      context.arc(point.x, point.y, point.size, 0, Math.PI * 2);
      context.fill();
    };

    const renderHome = (time: number) => {
      context.fillStyle = "#050608";
      context.fillRect(0, 0, width, height);

      homeShapes.tunnel.forEach((star, index) => {
        const wobble = Math.sin(time * 0.00045 + index * 0.1) * 6;
        context.fillStyle = hexToRgba(star.color, star.alpha ?? 0.2);
        context.beginPath();
        context.arc(star.x + wobble, star.y, star.size, 0, Math.PI * 2);
        context.fill();
      });

      stars.forEach((star, index) => {
        const drift = ((time * 0.012 + star.z * 100 + index) % 1400) / 1400;
        const x = width * star.x;
        const y = height * ((star.y + drift * 0.08) % 1);
        context.fillStyle = hexToRgba(star.color, 0.28 + star.z * 0.5);
        context.beginPath();
        context.arc(x, y, star.size + star.z * 0.8, 0, Math.PI * 2);
        context.fill();
      });

      [...homeShapes.whale, ...homeShapes.gatePoints].forEach(drawParticle);
    };

    const renderExperience = (time: number) => {
      context.fillStyle = "#050608";
      context.fillRect(0, 0, width, height);

      stars.forEach((star, index) => {
        const twinkle = 0.15 + ((Math.sin(time * 0.0011 + index * 0.17) + 1) * 0.5) * 0.5;
        context.fillStyle = hexToRgba(star.color, 0.16 + twinkle * 0.4);
        context.beginPath();
        context.arc(width * star.x, height * star.y, star.size, 0, Math.PI * 2);
        context.fill();
      });

      const scaled = clamp(progress * scenes.length, 0, scenes.length - 0.001);
      const index = Math.floor(scaled);
      const nextIndex = Math.min(index + 1, scenes.length - 1);
      const blend = scaled - index;
      const current = scenes[index];
      const next = scenes[nextIndex];
      const max = Math.max(current.length, next.length);

      for (let pointIndex = 0; pointIndex < max; pointIndex += 1) {
        const a = current[pointIndex % current.length];
        const b = next[pointIndex % next.length];
        const pulse = 1 + Math.sin(time * 0.0016 + pointIndex * 0.09) * 0.08;
        drawParticle({
          x: lerp(a.x, b.x, blend),
          y: lerp(a.y, b.y, blend),
          size: lerp(a.size, b.size, blend) * pulse,
          color: blend > 0.5 ? b.color : a.color,
          alpha: lerp(a.alpha ?? 0.55, b.alpha ?? 0.55, blend),
        });
      }
    };

    const render = (time: number) => {
      if (mode === "home") {
        renderHome(time);
      } else {
        renderExperience(time);
      }

      animationFrame = window.requestAnimationFrame(render);
    };

    resize();
    render(0);

    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    return () => {
      window.removeEventListener("resize", onResize);
      window.cancelAnimationFrame(animationFrame);
    };
  }, [activeKey, mode, progress, stars]);

  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <canvas ref={canvasRef} />
    </div>
  );
}
