"use client";

import { createOrganization } from "@/actions/organizations";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { getErrorMessage } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { APIError } from "better-auth/api";
import { Organization } from "better-auth/plugins";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const createOrganizationSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  slug: z
    .string()
    .min(1, { message: "Slug is required" })
    .regex(/^[a-z0-9-]+$/, {
      message: "Slug must contain only lowercase letters, numbers, and hyphens",
    }),
});

type CreateOrganization = z.infer<typeof createOrganizationSchema>;

type CreateOrganizationFormProps = {
  onSuccess: (organization: Organization) => void;
};

export function CreateOrganizationForm({
  onSuccess,
}: CreateOrganizationFormProps) {
  const [isValidatingSlug, setIsValidatingSlug] = useState(false);
  const [isCreatingOrganization, setIsCreatingOrganization] = useState(false);
  const [slugToCheck, setSlugToCheck] = useState("");
  const form = useForm<CreateOrganization>({
    resolver: zodResolver(createOrganizationSchema),
    defaultValues: { name: "", slug: "" },
    mode: "onChange",
  });

  const handleSlugCheck = useCallback(
    async (slug: string) => {
      try {
        setIsValidatingSlug(true);
        const { error } = await authClient.organization.checkSlug({ slug });
        if (error) form.setError("slug", { message: "Slug is already taken" });
      } catch (error) {
        form.setError("slug", { message: "Error checking slug" });
      } finally {
        setIsValidatingSlug(false);
      }
    },
    [form]
  );

  useEffect(() => {
    if (!slugToCheck) return;

    const timer = setTimeout(() => {
      handleSlugCheck(slugToCheck);
    }, 800);

    return () => clearTimeout(timer);
  }, [slugToCheck, handleSlugCheck]);

  const onSubmit = async (data: CreateOrganization) => {
    try {
      setIsCreatingOrganization(true);
      const { data: organization, error } = await createOrganization({
        name: data.name,
        slug: data.slug,
      });

      if (error) toast.error(getErrorMessage(error));
      if (organization) {
        await authClient.organization.setActive({
          organizationId: organization.id,
        });
        onSuccess?.(organization);
      }
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof APIError ? error.body?.message : "An error occurred"
      );
    } finally {
      setIsCreatingOrganization(false);
    }
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} type="text" placeholder="Acme Inc." />
                </FormControl>
                <FormMessage />
                <FormDescription>
                  This is the name of your organization.
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="slug"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Slug</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="acme-inc"
                    onChange={(e) => {
                      field.onChange(e);
                      setSlugToCheck(e.target.value);
                    }}
                  />
                </FormControl>
                {isValidatingSlug ? (
                  <FormDescription>Checking...</FormDescription>
                ) : (
                  <FormDescription>
                    {!form.formState.errors.slug &&
                      `/organizations/${field.value}`}
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={
              isCreatingOrganization ||
              !form.formState.isValid ||
              isValidatingSlug
            }
            loading={isCreatingOrganization}
          >
            Create Organization
          </Button>
        </div>
      </form>
    </Form>
  );
}
