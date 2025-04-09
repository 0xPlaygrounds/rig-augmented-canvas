import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * A utility function that combines clsx and tailwind-merge
 * to provide a powerful way to conditionally apply Tailwind classes.
 * 
 * @example
 * cn('text-red-500', condition && 'bg-blue-500', ['p-2', 'm-2'])
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
