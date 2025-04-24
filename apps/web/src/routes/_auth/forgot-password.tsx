import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { useCallback, useState } from "react";
import { z } from "zod";

import { m } from "@repo/dictionaries/messages";
import {
  Button,
  Input,
  useAppForm,
  Alert,
  AlertTitle,
  AlertDescription,
} from "@repo/ui";
import { cn } from "@repo/utils";

import { forgetPassword, sessionToken, useSession } from "@/lib/auth";
import { Divider } from "@/components/atoms/divider";

const FormSchema = z.object({
  email: z.string().email(),
});

export const Route = createFileRoute("/_auth/forgot-password")({
  component: ForgotPasswordPage,
  loader: async () => {
    if (sessionToken()) {
      return redirect({
        to: "/dashboard",
      });
    }

    return null;
  },
});

function ForgotPasswordPage() {
  const navigate = useNavigate();
  const { data: session } = useSession();

  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  if (session) {
    navigate({
      to: "/dashboard",
    });
  }

  const form = useAppForm({
    validators: {
      onSubmit: FormSchema,
    },
    defaultValues: {
      email: "",
    },
  });

  const handleSubmit = useCallback(
    async (ev: React.FormEvent) => {
      ev.preventDefault();
      ev.stopPropagation();

      await form.handleSubmit();

      await forgetPassword(form.state.values, {
        onSuccess: (ctx) => {
          console.log("onSuccess", ctx);
          setSuccess("success");
        },
        onError: ({ error }) => {
          // console.log("onSuccess", ctx);
          setError(error?.["code"] || "UNKNOWN_ERROR");
        },
      });
    },
    [form],
  );

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 max-w-[420px]">
      <header className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {m["auth.forgot.title"]()}
        </h1>
        <p className="text-muted-foreground text-sm">
          {m["auth.forgot.description"]()}
        </p>
      </header>
      <main className={cn("grid gap-6")}>
        <Divider />
        {error && (
          <Alert variant="destructive">
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        {success && (
          <Alert variant="success">
            <AlertTitle>Success</AlertTitle>
            <AlertDescription>{success}</AlertDescription>
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
          <form.Subscribe
            selector={(state) => [state.canSubmit, state.isSubmitting]}
            children={([canSubmit, isSubmitting]) => (
              <div className="flex flex-row-reverse justify-between items-center">
                <Button type="submit" disabled={!canSubmit || isSubmitting}>
                  {isSubmitting ? "..." : m["auth.forgot.confirm"]()}
                </Button>
              </div>
            )}
          />
        </form>
      </main>
    </div>
  );
}
