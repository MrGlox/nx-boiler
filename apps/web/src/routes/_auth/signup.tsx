import { createFileRoute, redirect } from "@tanstack/react-router";
import { useCallback } from "react";
import { z } from "zod";

import { Badge, Button, buttonVariants, Input, useAppForm } from "@repo/ui";

import { Google } from "@/assets/logos";
import { Link } from "@/components/atoms/link";
import { cn } from "@/lib/utils";
import { m } from "@/paraglide/messages";
import { authClient } from "@/lib/auth-client";

const REDIRECT_URL = "/dashboard";

export const Route = createFileRoute("/_auth/signup")({
  component: RouteComponent,
  beforeLoad: async ({ context }) => {
    if (context.user) {
      throw redirect({
        to: REDIRECT_URL,
      });
    }
  },
});

const FormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

function RouteComponent() {
  const form = useAppForm({
    validators: {
      onBlur: FormSchema,
      onChange: FormSchema,
    },
    defaultValues: {
      email: "",
      password: "",
    },
    onSubmit: ({ value }) => console.log(value),
  });

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      e.stopPropagation();
      form.handleSubmit();

      authClient.signUp.email(
        {
          ...form.values,
        },
        {
          onRequest: (ctx) => {
            //show loading
            console.log("onRequest", ctx);
          },
          onSuccess: (ctx) => {
            //redirect to the dashboard or sign in page
            console.log("onSuccess", ctx);
          },
          onError: (ctx) => {
            // display the error message
            console.log("onError", ctx);
          },
        },
      );
    },
    [form],
  );

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 max-w-[420px]">
      <header className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {m["auth.signup.title"]()}
        </h1>
        <p className="text-muted-foreground text-sm">
          {m["auth.signup.description"]()}
        </p>
      </header>
      <main className={cn("grid gap-6")}>
        <Button
          variant="outline"
          onClick={() =>
            authClient.signUp.social({
              provider: "google",
              callbackURL: REDIRECT_URL,
            })
          }
          className={cn("group relative inline-flex ")}
        >
          <span className="inline-flex items-center">
            <Google className="mr-2 size-4" />
            Google
          </span>
          <Badge
            variant="info"
            className="group-hover:animate-bounce-rotated absolute -right-[12px] -top-[6px] rotate-12"
          >
            {m["common.recommended"]()}
          </Badge>
        </Button>
        <div className="relative">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t" />
          </div>
          <div className="relative flex justify-center text-xs uppercase">
            <span className="bg-background text-muted-foreground px-2">
              {m["auth.or_continue"]()}
            </span>
          </div>
        </div>

        <form className="space-y-6" onSubmit={handleSubmit}>
          <form.AppField
            name="email"
            children={(field) => (
              <field.FormItem>
                <field.FormLabel>{m["auth.fields.email"]()}</field.FormLabel>
                <field.FormControl>
                  <Input
                    placeholder={m["auth.fields.email_placeholder"]()}
                    type="email"
                    autoCapitalize="none"
                    autoComplete="email"
                    autoCorrect="off"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                </field.FormControl>
                <field.FormMessage />
              </field.FormItem>
            )}
          />
          <form.AppField
            name="password"
            children={(field) => (
              <field.FormItem>
                <field.FormLabel>{m["auth.fields.password"]()}</field.FormLabel>
                <field.FormControl>
                  <Input
                    placeholder="********"
                    type="password"
                    autoCapitalize="none"
                    autoComplete="new-password"
                    autoCorrect="off"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    onBlur={field.handleBlur}
                  />
                </field.FormControl>
                <field.FormMessage />
              </field.FormItem>
            )}
          />
          <div className="flex flex-row-reverse justify-between items-center">
            <Button type="submit">{m["auth.signup.action"]()}</Button>
          </div>
        </form>
      </main>
      <footer>
        <p className="text-muted-foreground -mb-10 mt-10 px-8 text-center text-sm">
          {m["auth.agree"]()}{" "}
          <Button asChild variant="link">
            <Link to="/terms" className="variant underline-offset-4">
              {m["auth.terms"]()}
            </Link>
          </Button>{" "}
          {m["auth.and"]()}{" "}
          <Button asChild variant="link">
            <Link to="/privacy" className="variant underline-offset-4">
              {m["auth.privacy"]()}
            </Link>
          </Button>
          .
        </p>
      </footer>
    </div>
  );
}
