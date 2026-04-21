import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cohort — Alicia's Sales Dashboard",
  description: "Cohort · Sales OS · Sales Rep View",
};

export default function SalesLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <>{children}</>;
}
