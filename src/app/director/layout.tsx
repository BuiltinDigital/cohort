import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cohort — Director Dashboard",
  description: "Cohort · Sales OS · Director View",
};

export default function DirectorLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
