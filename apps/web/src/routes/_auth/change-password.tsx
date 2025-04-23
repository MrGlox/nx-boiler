import { useCallback, useState } from "react";
import {
  createFileRoute,
  useNavigate,
  useSearch,
} from "@tanstack/react-router";
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

import { Link } from "@/components/atoms/link";
import { sessionToken, resetPassword, useSession } from "@/lib/auth";
import { Divider } from "@/components/atoms/divider";

const searchSchema = z.object({
  token: z.string(),
});

export const Route = createFileRoute("/_auth/change-password")({
  component: ChangePasswordPage,
  validateSearch: searchSchema,
  loader: async () => {
    if (sessionToken()) {
      return {
        redirect: "/dashboard",
      };
    }

    return null;
  },
});

const FormSchema = z.object({
  password: z.string().min(8),
});

function ChangePasswordPage() {
  const navigate = useNavigate();
  const { data: session } = useSession();
  const { token } = useSearch({ strict: false });

  if (session) {
    navigate({
      to: "/dashboard",
    });
  }

  const [error, setError] = useState<string | null>(null);
  console.log("token", token);

  if (!token) {
    navigate({
      to: "/forgot-password",
    });
  }

  const form = useAppForm({
    validators: {
      onSubmit: FormSchema,
    },
    defaultValues: {
      password: "",
    },
  });

  const handleSubmit = useCallback(
    async (ev: React.FormEvent) => {
      ev.preventDefault();
      ev.stopPropagation();

      await form.handleSubmit();

      await resetPassword(
        {
          newPassword: form.state.values.password,
          token: token || "",
        },
        {
          onSuccess: () => {
            navigate({
              to: "/signin",
            });
          },
          onError: ({ error }) => {
            setError(error?.["code"] || "UNKNOWN_ERROR");
          },
        },
      );
    },
    [form, navigate, token],
  );

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 max-w-[420px]">
      <header className="flex flex-col space-y-2 text-center">
        <h1 className="text-2xl font-semibold tracking-tight">
          {m["auth.change_password.title"]()}
        </h1>
        <p className="text-muted-foreground text-sm">
          {m["auth.change_password.description"]()}
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
        <form className="space-y-6" onSubmit={handleSubmit} method="POST">
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
                  {isSubmitting ? "..." : m["auth.change_password.update"]()}
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
            <Link to="/" className="variant underline-offset-4">
              {m["auth.terms"]()}
            </Link>
          </Button>{" "}
          {m["auth.and"]()}{" "}
          <Button asChild variant="link">
            <Link to="/" className="variant underline-offset-4">
              {m["auth.privacy"]()}
            </Link>
          </Button>
          .
        </p>
      </footer>
    </div>
  );
}

export default ChangePasswordPage;
