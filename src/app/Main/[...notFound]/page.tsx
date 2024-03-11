"use client";
import { usePathname } from "next/navigation";
import MainComponent from "../MainComponent";

export default function NotFoundCatchAllPage() {
  const pathname = usePathname();

  if (pathname === "/main/description") {
    return <MainComponent defaultTab="description" />;
  } else if (pathname === "/main/nutritionalFacts") {
    return <MainComponent defaultTab="nutritionalFacts" />;
  }
  return <p>Page Not Found</p>;
}
