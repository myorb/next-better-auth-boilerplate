import { updateOrganization } from "@/actions/organizations";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { InputWithAdornment } from "@/components/ui/input-with-adornment";
import { Separator } from "@/components/ui/separator";
import { authClient } from "@/lib/auth-client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Organization } from "better-auth/plugins";
import { Loader2 } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const updateOrganizationSlugSchema = z.object({
  slug: z
    .string()
    .min(1, { message: "Slug is required" })
    .regex(/^[a-z0-9-]+$/, {
      message: "Slug must contain only lowercase letters, numbers, and hyphens",
    }),
});

type UpdateOrganizationSlug = z.infer<typeof updateOrganizationSlugSchema>;

export function UpdateOrganizationSlug({
  organization,
}: {
  organization: Organization;
}) {
  const [isUpdating, setIsUpdating] = useState(false);
  const [slug, setSlug] = useState({
    initialValue: organization.slug,
    value: "",
    isValidating: false,
  });
  const form = useForm<UpdateOrganizationSlug>({
    resolver: zodResolver(updateOrganizationSlugSchema),
    defaultValues: { slug: organization.slug },
    mode: "onChange",
  });

  const handleSlugCheck = useCallback(
    async (value: string) => {
      try {
        setSlug((prev) => ({ ...prev, isValidating: true }));
        if (value === slug.initialValue) return;
        const { error } = await authClient.organization.checkSlug({
          slug: value,
        });
        if (error) form.setError("slug", { message: "Slug is already taken" });
      } catch (error) {
        form.setError("slug", { message: "Error checking slug" });
      } finally {
        setSlug((prev) => ({ ...prev, isValidating: false }));
      }
    },
    [form, slug.initialValue]
  );

  useEffect(() => {
    if (!slug.value) return;

    const timer = setTimeout(() => {
      handleSlugCheck(slug.value);
    }, 800);

    return () => clearTimeout(timer);
  }, [slug.value, handleSlugCheck]);

  const onSubmit = async (data: UpdateOrganizationSlug) => {
    setIsUpdating(true);
    try {
      await updateOrganization({
        name: organization.name,
        slug: data.slug,
      });
    } catch (error) {
      console.error(error);
      toast.error("Failed to update organization slug");
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Organization Slug</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="slug"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Please enter a unique slug</FormLabel>
                  <FormControl>
                    <InputWithAdornment
                      {...field}
                      startAdornment="/organizations/"
                      endAdornment={
                        slug.isValidating && (
                          <Loader2 className="size-4 animate-spin" />
                        )
                      }
                      placeholder="acme-inc"
                      onChange={(e) => {
                        field.onChange(e);
                        setSlug((prev) => ({ ...prev, value: e.target.value }));
                      }}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <Separator />
          <CardFooter className="flex flex-row justify-between">
            <p className="text-sm text-muted-foreground">
              Use a slug to identify your organization. Use only lowercase
              letters, numbers, and hyphens.
            </p>
            <Button
              type="submit"
              disabled={
                isUpdating ||
                !form.formState.isValid ||
                slug.isValidating ||
                slug.value === slug.initialValue
              }
              loading={isUpdating}
            >
              Update Slug
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
