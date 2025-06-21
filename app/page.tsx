import { buttonVariants } from "@/components/ui/button";
import { appConfig } from "@/constants/config";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-svh h-svh p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center text-center">
        <div className="flex flex-col sm:flex-row gap-8 items-center">
          <Image
            className="dark:invert"
            src="/next.svg"
            alt="Next.js logo"
            width={180}
            height={38}
            priority
          />
          <Image
            src="/better-auth.svg"
            alt="Better Auth logo"
            width={180}
            height={38}
            priority
          />
        </div>

        <div className="max-w-[600px] space-y-4">
          <h1 className="text-4xl font-bold tracking-tight">
            Next.js + Better Auth Boilerplate
          </h1>
          <p className="text-lg text-muted-foreground">
            A modern authentication boilerplate built with Next.js and Better
            Auth. Get started with a secure, scalable authentication system in
            minutes.
          </p>
        </div>

        <div className="flex flex-col gap-4 items-center">
          <Link
            className={cn(
              buttonVariants({ variant: "default" }),
              "w-full sm:w-auto"
            )}
            href={appConfig.authRoutes.signin}
          >
            Get Started.
          </Link>
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href={appConfig.authRoutes.signin}
              className="text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
          <div className="space-y-2">
            <h3 className="font-semibold">Modern Stack</h3>
            <p className="text-sm text-muted-foreground">
              Built with Next.js 14, React Server Components, and Tailwind CSS
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Secure Auth</h3>
            <p className="text-sm text-muted-foreground">
              Enterprise-grade authentication with Better Auth
            </p>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Ready to Deploy</h3>
            <p className="text-sm text-muted-foreground">
              Deploy instantly to Vercel with zero configuration
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
