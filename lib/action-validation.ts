import { User } from "better-auth";
import { headers } from "next/headers";
import { z } from "zod";
import { auth } from "./auth";
import { errorResponse, ServerActionResponse } from "./server-action-response";

export type ActionState<T> = {
  error?: string | null;
  success?: string | null;
  data?: T;
};

type ValidatedActionFunction<S extends z.ZodType<any, any>, T> = (
  data: z.infer<S>
) => Promise<ServerActionResponse<T>>;

export function validatedAction<S extends z.ZodType<any, any>, T>(
  schema: S,
  action: ValidatedActionFunction<S, T>
) {
  return async (
    prevState: ActionState<T>,
    data: z.infer<S>
  ): Promise<ServerActionResponse<T>> => {
    const result = schema.safeParse(data);
    if (!result.success) {
      return errorResponse(
        result.error.errors[0]?.message || "Validation failed",
        "VALIDATION_ERROR",
        result.error.errors
      ) as ServerActionResponse<T>;
    }

    try {
      return await action(result.data);
    } catch (error) {
      console.error("Action error:", error);
      return errorResponse(
        "An unexpected error occurred",
        "INTERNAL_ERROR",
        error
      ) as ServerActionResponse<T>;
    }
  };
}

type ValidatedActionWithUserFunction<S extends z.ZodType<any, any>, T> = (
  data: z.infer<S>,
  user: User
) => Promise<ServerActionResponse<T>>;

export function validatedActionWithUser<S extends z.ZodType<any, any>, T>(
  schema: S,
  action: ValidatedActionWithUserFunction<S, T>
) {
  return async (
    prevState: ActionState<T>,
    data: z.infer<S>
  ): Promise<ServerActionResponse<T>> => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      return errorResponse(
        "User is not authenticated",
        "UNAUTHORIZED"
      ) as ServerActionResponse<T>;
    }

    const result = schema.safeParse(data);
    if (!result.success) {
      return errorResponse(
        result.error.errors[0]?.message || "Validation failed",
        "VALIDATION_ERROR",
        result.error.errors
      ) as ServerActionResponse<T>;
    }

    try {
      return await action(result.data, session.user);
    } catch (error) {
      console.error("Action error:", error);
      return errorResponse(
        "An unexpected error occurred",
        "INTERNAL_ERROR",
        error
      ) as ServerActionResponse<T>;
    }
  };
}

// type ActionWithTeamFunction<T> = (
//   formData: FormData,
//   team: TeamDataWithMembers
// ) => Promise<T>;

// export function withTeam<T>(action: ActionWithTeamFunction<T>) {
//   return async (formData: FormData): Promise<T> => {
//     const user = await getUser();
//     if (!user) {
//       redirect("/sign-in");
//     }

//     const team = await getTeamForUser(user.id);
//     if (!team) {
//       throw new Error("Team not found");
//     }

//     return action(formData, team);
//   };
// }

type ValidatedActionSchemaFunction<S extends z.ZodType<any, any>, T> = (
  data: z.infer<S>
) => Promise<ServerActionResponse<T>>;

export function validateActionSchema<T>(
  schema: z.ZodType<any, any>,
  action: ValidatedActionSchemaFunction<typeof schema, T>
) {
  return async (
    data: z.infer<typeof schema>
  ): Promise<ServerActionResponse<T>> => {
    const session = await auth.api.getSession({
      headers: await headers(),
    });
    if (!session) {
      return errorResponse(
        "User is not authenticated",
        "UNAUTHORIZED"
      ) as ServerActionResponse<T>;
    }

    const result = schema.safeParse(data);
    if (!result.success) {
      return errorResponse(
        result.error.errors[0]?.message || "Validation failed",
        "VALIDATION_ERROR",
        result.error.errors
      ) as ServerActionResponse<T>;
    }

    try {
      return await action(result.data);
    } catch (error) {
      console.error("Action error:", error);
      return errorResponse(
        "An unexpected error occurred",
        "INTERNAL_ERROR",
        error
      ) as ServerActionResponse<T>;
    }
  };
}
