"use client";

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
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftIcon } from "lucide-react";
import { useRouter } from "nextjs-toploader/app";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const onboardingFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  slug: z
    .string()
    .min(1, { message: "Slug is required" })
    .regex(/^[a-z0-9-]+$/, {
      message: "Slug must contain only lowercase letters, numbers, and hyphens",
    }),
  logo: z.string().optional(),
});

type OnboardingFormSchema = z.infer<typeof onboardingFormSchema>;

export default function OnboardingForm() {
  const router = useRouter();
  const [isValidatingSlug, setIsValidatingSlug] = useState(false);
  const [isCreatingOrganization, setIsCreatingOrganization] = useState(false);
  const [slugToCheck, setSlugToCheck] = useState("");
  const form = useForm<OnboardingFormSchema>({
    resolver: zodResolver(onboardingFormSchema),
    defaultValues: { name: "", slug: "", logo: "" },
    mode: "onChange",
  });

  const handleSlugCheck = useCallback(
    async (slug: string) => {
      try {
        setIsValidatingSlug(true);
        const { error } = await authClient.organization.checkSlug({ slug });
        if (error) form.setError("slug", { message: error.message });
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

  const onSubmit = async (data: OnboardingFormSchema) => {
    try {
      setIsCreatingOrganization(true);
      const { data: organization, error } =
        await authClient.organization.create({
          name: data.name,
          slug: data.slug,
        });

      if (error) toast.error(error.message);
      if (organization) {
        await authClient.organization.setActive({
          organizationId: organization.id,
        });
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsCreatingOrganization(false);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="Acme Inc." />
                </FormControl>
                <FormDescription>
                  This is the name of your organization.
                </FormDescription>
                <FormMessage />
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
                    {form.formState.errors
                      ? `/organizations/${field.value}`
                      : "Slug is already taken"}
                  </FormDescription>
                )}
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="w-full"
            disabled={isValidatingSlug}
            loading={isCreatingOrganization}
          >
            Create
          </Button>
        </form>
      </Form>
      <div
        className="text-xs w-full underline underline-offset-4 flex items-center gap-1 cursor-pointer"
        onClick={() =>
          authClient.signOut({
            fetchOptions: {
              onSuccess(context) {
                router.push("/signin");
              },
            },
          })
        }
      >
        <ArrowLeftIcon className="size-4" />
        <span>Sign Out</span>
      </div>
    </div>
  );
}
