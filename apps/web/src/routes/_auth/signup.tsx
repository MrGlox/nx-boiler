import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { z } from "zod";

import { m } from "@repo/dictionaries/messages";
import { Alert, Badge, Button, Input, useAppForm } from "@repo/ui";
import { cn } from "@repo/utils";

import { Google } from "@/assets/logos";
import { Link } from "@/components/atoms/link";
import { signIn, signUp, useSession, getSession } from "@/lib/auth";
import { Divider } from "@/components/atoms/divider";

const REDIRECT_URL = "/dashboard";

export const Route = createFileRoute("/_auth/signup")({
  component: RouteComponent,
});

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

function RouteComponent() {
  const navigate = useNavigate();
  const { data: session } = useSession();

  if (session) {
    navigate({
      to: "/dashboard",
    });
  }

  const [error, setError] = useState<string | null>(null);

  const form = useAppForm({
    validators: {
      onSubmit: FormSchema,
    },
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const handleSubmit = useCallback(
    async (ev: React.FormEvent) => {
      ev.preventDefault();
      ev.stopPropagation();

      await form.handleSubmit();

      await signUp.email(
        {
          ...form.state.values,
          name: "", // nullable just for type
        },
        {
          onSuccess: () => {
            navigate({
              to: "/signin",
            });
          },
          onError: ({ error }) => {
            // display the error message
            setError(error.message);
          },
        },
      );
    },
    [form, navigate],
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
            signIn.social({
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
            className="group-hover:animate-bounce absolute -right-[12px] -top-[6px] rotate-12"
          >
            {m["common.recommended"]()}
          </Badge>
        </Button>
        <Divider>{m["auth.or_continue"]()}</Divider>
        {error && (
          <Alert variant="destructive">
            {m[`codes.${error}`]?.() || error}
          </Alert>
        )}
        <form className="space-y-6" onSubmit={handleSubmit} method="POST">
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
                  />
                </field.FormControl>
                <field.FormMessage />
              </field.FormItem>
            )}
          />
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <div className="flex flex-row-reverse justify-between items-center">
                <Button type="submit" disabled={!canSubmit || isSubmitting}>
                  {isSubmitting ? "..." : m["auth.signup.action"]()}
                </Button>
              </div>
            )}
          />
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
