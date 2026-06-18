import { useMemo } from "react";

interface SparklineProps {
  data: number[];
  width?: number;
  height?: number;
  className?: string;
  strokeWidth?: number;
  color?: string;
  fill?: boolean;
}

/** Lightweight SVG sparkline with optional gradient fill. */
export function Sparkline({
  data,
  width = 120,
  height = 36,
  className,
  strokeWidth = 2,
  color = "hsl(var(--electric))",
  fill = true,
}: SparklineProps) {
  const { path, area, id } = useMemo(() => {
    const min = Math.min(...data);
    const max = Math.max(...data);
    const range = max - min || 1;
    const step = width / (data.length - 1 || 1);
    const pts = data.map((d, i) => {
      const x = i * step;
      const y = height - ((d - min) / range) * (height - strokeWidth * 2) - strokeWidth;
      return [x, y] as const;
    });
    const p = pts.map((pt, i) => `${i === 0 ? "M" : "L"}${pt[0].toFixed(2)},${pt[1].toFixed(2)}`).join(" ");
    const a = `${p} L${width},${height} L0,${height} Z`;
    return { path: p, area: a, id: `sg-${Math.random().toString(36).slice(2, 8)}` };
  }, [data, width, height, strokeWidth]);

  return (
    <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`} className={className} preserveAspectRatio="none">
      {fill && (
        <>
          <defs>
            <linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={color} stopOpacity="0.22" />
              <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d={area} fill={`url(#${id})`} />
        </>
      )}
      <path d={path} fill="none" stroke={color} strokeWidth={strokeWidth} strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
