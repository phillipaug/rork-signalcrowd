import { useMemo, useState } from "react";

interface AreaChartProps {
  data: number[];
  height?: number;
  color?: string;
  className?: string;
  showAxis?: boolean;
  yMin?: number;
  yMax?: number;
  /** Optional second comparison series (e.g. search interest). */
  compare?: number[];
  compareColor?: string;
}

/** Premium responsive SVG area chart with hover tooltip. */
export function AreaChart({
  data,
  height = 260,
  color = "hsl(var(--electric))",
  className,
  showAxis = true,
  yMin,
  yMax,
  compare,
  compareColor = "hsl(var(--violet))",
}: AreaChartProps) {
  const W = 600;
  const H = height;
  const padX = showAxis ? 8 : 0;
  const padY = 14;
  const [hover, setHover] = useState<number | null>(null);

  const all = compare ? [...data, ...compare] : data;
  const min = yMin ?? Math.min(...all);
  const max = yMax ?? Math.max(...all);
  const range = max - min || 1;

  const id = useMemo(() => `ac-${Math.random().toString(36).slice(2, 8)}`, []);

  function build(series: number[]) {
    const step = (W - padX * 2) / (series.length - 1 || 1);
    const pts = series.map((d, i) => {
      const x = padX + i * step;
      const y = padY + (1 - (d - min) / range) * (H - padY * 2);
      return [x, y] as const;
    });
    const line = pts.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");
    const area = `${line} L${W - padX},${H - padY} L${padX},${H - padY} Z`;
    return { pts, line, area };
  }

  const main = build(data);
  const cmp = compare ? build(compare) : null;

  function onMove(e: React.MouseEvent<SVGSVGElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const rel = (e.clientX - rect.left) / rect.width;
    const idx = Math.round(rel * (data.length - 1));
    setHover(Math.max(0, Math.min(data.length - 1, idx)));
  }

  const gridLines = [0, 0.25, 0.5, 0.75, 1];

  return (
    <div className={className}>
      <svg
        viewBox={`0 0 ${W} ${H}`}
        className="w-full"
        style={{ height }}
        preserveAspectRatio="none"
        onMouseMove={onMove}
        onMouseLeave={() => setHover(null)}
      >
        <defs>
          <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={color} stopOpacity="0.28" />
            <stop offset="100%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {showAxis &&
          gridLines.map((g) => (
            <line
              key={g}
              x1={padX}
              x2={W - padX}
              y1={padY + g * (H - padY * 2)}
              y2={padY + g * (H - padY * 2)}
              stroke="hsl(var(--border))"
              strokeWidth={1}
              strokeDasharray="3 5"
            />
          ))}
        <path d={main.area} fill={`url(#${id})`} />
        {cmp && (
          <path d={cmp.line} fill="none" stroke={compareColor} strokeWidth={2} strokeDasharray="5 4" opacity={0.7} strokeLinecap="round" />
        )}
        <path d={main.line} fill="none" stroke={color} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
        {hover !== null && (
          <>
            <line x1={main.pts[hover][0]} x2={main.pts[hover][0]} y1={padY} y2={H - padY} stroke={color} strokeWidth={1} opacity={0.35} />
            <circle cx={main.pts[hover][0]} cy={main.pts[hover][1]} r={4.5} fill={color} stroke="white" strokeWidth={2} />
          </>
        )}
      </svg>
      {hover !== null && (
        <div className="mt-1 text-center font-mono-num text-xs text-muted-foreground">
          {data[hover].toFixed(1)}
          {compare && <span className="ml-3 text-violet">attention {compare[hover].toFixed(0)}</span>}
        </div>
      )}
    </div>
  );
}
