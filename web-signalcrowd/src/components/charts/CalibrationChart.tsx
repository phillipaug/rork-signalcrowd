interface CalibrationChartProps {
  score: number;
  className?: string;
}

/** Calibration plot: ideal diagonal vs the forecaster's observed curve. */
export function CalibrationChart({ score, className }: CalibrationChartProps) {
  const W = 320;
  const H = 220;
  const pad = 32;
  const plotW = W - pad * 2;
  const plotH = H - pad * 2;

  // Deviation from perfect calibration scales with (100 - score).
  const dev = (100 - score) / 100;
  const points = Array.from({ length: 6 }, (_, i) => {
    const x = i / 5; // forecast probability 0..1
    const noise = Math.sin(i * 1.3) * dev * 0.18;
    const y = Math.max(0, Math.min(1, x + noise));
    return [pad + x * plotW, H - pad - y * plotH] as const;
  });
  const curve = points.map((p, i) => `${i === 0 ? "M" : "L"}${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(" ");

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className={className} style={{ width: "100%", maxWidth: W }}>
      {/* grid */}
      {[0, 0.25, 0.5, 0.75, 1].map((g) => (
        <line key={g} x1={pad} x2={W - pad} y1={H - pad - g * plotH} y2={H - pad - g * plotH} stroke="hsl(var(--border))" strokeWidth={1} strokeDasharray="3 5" />
      ))}
      {/* ideal diagonal */}
      <line x1={pad} y1={H - pad} x2={W - pad} y2={pad} stroke="hsl(var(--muted-foreground))" strokeWidth={1.5} strokeDasharray="4 4" opacity={0.5} />
      {/* observed curve */}
      <path d={curve} fill="none" stroke="hsl(var(--electric))" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
      {points.map((p, i) => (
        <circle key={i} cx={p[0]} cy={p[1]} r={3.5} fill="hsl(var(--electric))" stroke="white" strokeWidth={1.5} />
      ))}
      {/* axis labels */}
      <text x={pad} y={H - 8} fontSize={10} fill="hsl(var(--muted-foreground))">0%</text>
      <text x={W - pad - 18} y={H - 8} fontSize={10} fill="hsl(var(--muted-foreground))">100%</text>
      <text x={W / 2 - 34} y={H - 6} fontSize={10} fill="hsl(var(--muted-foreground))">Forecast probability</text>
    </svg>
  );
}
