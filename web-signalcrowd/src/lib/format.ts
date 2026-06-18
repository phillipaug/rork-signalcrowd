export function formatCompact(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1).replace(/\.0$/, "")}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1).replace(/\.0$/, "")}K`;
  return `${n}`;
}

export function formatNumber(n: number): string {
  return n.toLocaleString("en-US");
}

export function signed(n: number, suffix = ""): string {
  const v = Math.round(n * 10) / 10;
  return `${v >= 0 ? "+" : ""}${v}${suffix}`;
}
