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
import { zodResolver } from "@hookform/resolvers/zod";
import { Organization } from "better-auth/plugins";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const updateOrganizationSlugSchema = z.object({
  slug: z.string().min(1, { message: "Slug is required" }),
});

type UpdateOrganizationSlug = z.infer<typeof updateOrganizationSlugSchema>;

export function UpdateOrganizationSlug({
  organization,
}: {
  organization: Organization;
}) {
  const [isUpdating, setIsUpdating] = useState(false);
  const form = useForm<UpdateOrganizationSlug>({
    resolver: zodResolver(updateOrganizationSlugSchema),
    defaultValues: { slug: organization.slug },
    mode: "onChange",
  });

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
                  <FormLabel>Enter your slug</FormLabel>
                  <FormControl>
                    <InputWithAdornment
                      {...field}
                      placeholder="my-organization"
                      startAdornment="/organizations/"
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
            <Button type="submit" loading={isUpdating}>
              Update
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
