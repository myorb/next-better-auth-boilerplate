import { ServerActionResponse } from "@/lib/server-action-response";
import { useState } from "react";
import { toast } from "sonner";

interface UseServerActionConfig<TData> {
  action: (prevState: any, data: any) => Promise<ServerActionResponse<TData>>;
  onSuccess?: (data?: TData) => void;
  onError?: (error: ServerActionResponse<TData>) => void;
  message?: {
    success?: string;
    loading?: string;
  };
}

export function useServerAction<TData = undefined>({
  action,
  onSuccess,
  onError,
  message = {},
}: UseServerActionConfig<TData>) {
  const [isLoading, setIsLoading] = useState(false);

  const execute = async (data: any) => {
    setIsLoading(true);

    const promise = action({}, data);

    if (message.loading) {
      toast.promise(promise, {
        loading: message.loading,
        success: (response) => {
          if (!response.success) throw response;
          return message.success || response.message;
        },
        error: (error) => {
          return error.message || "An unexpected error occurred";
        },
      });
    }

    try {
      const response = await promise;
      onSuccess?.(response.data);
      return response;
    } catch (err: unknown) {
      const error = err as Error;
      const errorResponse: ServerActionResponse<TData> = {
        success: false,
        message: error?.message || "An unexpected error occurred",
        error: { code: "UNEXPECTED_ERROR", details: error },
      };
      onError?.(errorResponse);
      return errorResponse;
    } finally {
      setIsLoading(false);
    }
  };

  return { execute, isLoading };
}
