import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function scrollTo(sectionNumber: number) {
  window.scrollTo({ top: window.innerHeight * (sectionNumber - 1), behavior: "smooth" });
}
