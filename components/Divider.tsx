type DividerVariant = "floret" | "line-circle" | "line-star" | "rectangle" | "triangle";

// Width / height of each SVG's viewBox.
const ratios: Record<DividerVariant, string> = {
  floret: "1200 / 61",
  "line-circle": "1189 / 31",
  "line-star": "1142 / 22",
  rectangle: "1189 / 31",
  triangle: "1189 / 31",
};

type DividerProps = {
  variant: DividerVariant;
  className?: string;
};

// Decorative ornament. Painted with the current text colour through a mask so
// one SVG file works on both light and dark sections.
export default function Divider({ variant, className = "" }: DividerProps) {
  const url = `url(/images/dividers/${variant}.svg)`;
  return (
    <span
      aria-hidden="true"
      className={`block w-full bg-current ${className}`}
      style={{
        aspectRatio: ratios[variant],
        maskImage: url,
        WebkitMaskImage: url,
        maskSize: "100% 100%",
        WebkitMaskSize: "100% 100%",
        maskRepeat: "no-repeat",
        WebkitMaskRepeat: "no-repeat",
      }}
    />
  );
}
