import type { ReactNode } from "react";

export function Section({
  children,
  light = false,
  className = "",
  id,
}: {
  children: ReactNode;
  light?: boolean;
  className?: string;
  id?: string;
}) {
  return (
    <section
      id={id}
      className={`py-24 md:py-32 ${light ? "surface-light" : ""} ${className}`}
    >
      <div className="container-prose">{children}</div>
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <div className="eyebrow mb-6">{children}</div>;
}

export function GoldStroke({ className = "" }: { className?: string }) {
  return <div className={`gold-stroke ${className}`} />;
}
