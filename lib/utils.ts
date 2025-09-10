import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"



export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  } else if (typeof error === "string") {
    return error;
  } else if (error && typeof error === "object" && "message" in error) {
    return (error as { message: string }).message;
  }
  return "An unexpected error occurred";
}



export function generateRequestId() {
  const buffer = new Uint32Array(1);
  crypto.getRandomValues(buffer);
  const id = (buffer[0] % 1_000_000_000).toString().padStart(9, "0"); // 9 digits
  return `REQ-${id}`;
}