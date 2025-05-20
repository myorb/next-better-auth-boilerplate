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
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { updateOrganizationSchema } from "@/types/organization.schema";
import { UpdateOrganization } from "@/types/organization.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Organization } from "better-auth/plugins";
import { useState } from "react";
import { useForm } from "react-hook-form";

export function UpdateOrganizationName({
  organization,
}: {
  organization: Organization;
}) {
  const [isUpdating, setIsUpdating] = useState(false);
  const form = useForm<UpdateOrganization>({
    resolver: zodResolver(updateOrganizationSchema),
    defaultValues: { name: organization.name },
    mode: "onChange",
  });

  const onSubmit = async (data: UpdateOrganization) => {
    setIsUpdating(true);
    try {
      await updateOrganization({
        name: data.name,
        slug: organization.slug,
      });
    } catch (error) {
      console.error(error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Organization Name</CardTitle>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Please enter your organization name</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="My Organization" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </CardContent>
          <Separator />
          <CardFooter className="flex flex-row justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              This action will update the name of the organization.
            </p>
            <Button type="submit" size="sm" loading={isUpdating}>
              Update Name
            </Button>
          </CardFooter>
        </Card>
      </form>
    </Form>
  );
}
