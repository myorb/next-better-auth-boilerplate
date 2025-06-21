import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SparklesIcon } from "lucide-react";

export default async function ApiKeys() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>API Keys</CardTitle>
        <CardDescription>You can manage your API keys.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-4">
        <SparklesIcon className="mx-auto size-8 text-muted-foreground" />
        <p className="text-center text-sm text-muted-foreground">
          This feature is coming soon.
        </p>
      </CardContent>
      <Separator />
      <CardFooter className="flex flex-row justify-between gap-4">
        <p className="text-sm text-muted-foreground">
          You can manage your API keys.
        </p>
      </CardFooter>
    </Card>
  );
}
