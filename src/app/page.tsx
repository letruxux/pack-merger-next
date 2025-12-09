"use client";

import { Choose } from "@/components/home/choose";
import { Download } from "@/components/home/download";
import { Hero } from "@/components/home/hero";
import { Reorder } from "@/components/home/reorder";
import { scrollTo } from "@/lib/utils";
import { useEffect, useRef } from "react";

export default function Home() {
  /* useEffect(() => {
    const handleResize = () => {
      const step = window.innerHeight;
      const targetY = Math.ceil(window.scrollY / step) * step;
      window.scrollTo({ top: targetY, behavior: "smooth" });
    };

    scrollTo(1);
    setInterval(() => {
      window.addEventListener("resize", handleResize);
    }, 1000);
    return () => window.removeEventListener("resize", handleResize);
  }, []); */

  return (
    <main>
      <Hero />
      <Choose />
      <Reorder />
      <Download />
    </main>
  );
}
