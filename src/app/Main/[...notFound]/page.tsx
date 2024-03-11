"use client";
import { usePathname } from "next/navigation";
import Main from "../page";

export default function NotFoundCatchAllPage() {
  const pathname = usePathname();

  if (pathname === "/main/description") {
    return <Main defaultTab="description" />;
  } else if (pathname === "/main/nutritionalFacts") {
    return <Main defaultTab="nutritionalFacts" />;
  }
  return <p>Page Not Found</p>;
}
