import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  variant?: "dark" | "light";
}

/** SignalCrowd wordmark: a signal-wave mark built from converging dots. */
export function Logo({ className, showText = true, variant = "dark" }: LogoProps) {
  const textColor = variant === "light" ? "text-white" : "text-navy";
  const dots = [
    { x: 4, y: 22, r: 1.6, o: 0.5 },
    { x: 9, y: 19, r: 1.8, o: 0.65 },
    { x: 14, y: 21, r: 1.7, o: 0.6 },
    { x: 19, y: 15, r: 2.1, o: 0.8 },
    { x: 24, y: 17, r: 2.0, o: 0.85 },
    { x: 29, y: 10, r: 2.4, o: 1 },
  ];
  return (
    <span className={cn("inline-flex items-center gap-2", className)}>
      <span className="relative inline-flex h-8 w-8 items-center justify-center rounded-lg bg-navy">
        <svg viewBox="0 0 34 30" className="h-5 w-5">
          <defs>
            <linearGradient id="logoWave" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0%" stopColor="hsl(222 89% 60%)" />
              <stop offset="100%" stopColor="hsl(200 100% 65%)" />
            </linearGradient>
          </defs>
          <path
            d="M4 22 L9 19 L14 21 L19 15 L24 17 L29 10"
            fill="none"
            stroke="url(#logoWave)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {dots.map((d, i) => (
            <circle key={i} cx={d.x} cy={d.y} r={d.r} fill="url(#logoWave)" opacity={d.o} />
          ))}
        </svg>
      </span>
      {showText && (
        <span className={cn("text-[17px] font-extrabold tracking-tight", textColor)}>
          Signal<span className="text-electric">Crowd</span>
        </span>
      )}
    </span>
  );
}
