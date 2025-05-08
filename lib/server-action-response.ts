export type ServerActionResponse<T = undefined> = {
  success: boolean;
  message: string;
  data?: T;
  error?: {
    code?: string;
    details?: unknown;
  };
};

export function successResponse<T>(
  message: string,
  data?: T
): ServerActionResponse<T> {
  return {
    success: true,
    message,
    data,
  };
}

export function errorResponse<T = undefined>(
  message: string,
  code?: string,
  details?: unknown
): ServerActionResponse<T> {
  return {
    success: false,
    message,
    error: {
      code,
      details,
    },
  };
}
