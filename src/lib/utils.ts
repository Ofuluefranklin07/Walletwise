import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Utility function to combine Tailwind classes efficiently.
 * It uses 'clsx' to handle conditional classes and 'tailwind-merge' 
 * to handle conflicts (e.g., if you pass 'px-2 px-4', it ensures 'px-4' wins).
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
