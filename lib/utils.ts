import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const renderProfessionType = (type: string) => {
  switch (type) {
    case "doctor":
      return "医師"
    case "nurse":
      return "看護師"
    case "physicalTherapist":
      return "理学療法士"
    case "occupationalTherapist":
      return "作業療法士"
    default:
      return type
  }
}

