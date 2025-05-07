"use server";

import { appConfig } from "@/constants/config";
import { auth } from "@/lib/auth";
import { authClient } from "@/lib/auth-client";
import { APIError } from "better-auth/api";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

type CreateOrganization = {
  name: string;
  slug: string;
};

type Organization = typeof authClient.$Infer.Organization;
export async function createOrganization(
  organization: CreateOrganization
): Promise<{
  success: boolean;
  error?: string | null;
  data?: Organization | null;
}> {
  try {
    const session = auth.api.getSession({
      headers: await headers(),
    });

    if (!session) return { success: false, error: "Unauthorized" };

    const { name, slug } = organization;

    const createdOrganization = await auth.api.createOrganization({
      body: { name, slug },
      headers: await headers(),
    });

    revalidatePath(appConfig.authRoutes.default);
    return {
      success: true,
      error: null,
      data: createdOrganization,
    };
  } catch (error) {
    console.error(error);
    if (error instanceof APIError) {
      return { success: false, error: error.body?.message };
    }
    return { success: false, error: "Something went wrong. Please try again." };
  }
}
