import { Organization } from "better-auth/plugins";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { auth } from "./auth";
import { authClient } from "./auth-client";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type ErrorTypes = Partial<
  Record<keyof typeof authClient.$ERROR_CODES, { en: string }>
>;

const errorCodes = {
  USER_ALREADY_EXISTS: { en: "user already registered" },
} satisfies ErrorTypes;

export const getErrorMessage = (code: string) => {
  if (code in errorCodes) {
    return errorCodes[code as keyof typeof errorCodes].en;
  }
  return "An error occurred";
};
