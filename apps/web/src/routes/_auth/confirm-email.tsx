import { createFileRoute, redirect } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

import { m } from "@repo/dictionaries/messages";
import { verifyEmail } from "@/lib/auth";

export const Route = createFileRoute("/_auth/confirm-email")({
  component: RouteComponent,
  validateSearch: (search) =>
    search as {
      token: string;
    },
  loaderDeps: ({ search: { token } }) => ({
    token,
  }),
  loader: async ({ deps: { token } }) => {
    if (!token) {
      throw redirect({
        to: "/signin",
        search: {
          error: "auth.invalid_token",
        },
      });
    }

    return {
      token,
    };

    // try {
    //   // Call the API directly since better-auth doesn't expose confirmEmail
    //   const response = await fetch(
    //     `${import.meta.env["VITE_API_URL"]}/api/auth/confirm-email`,
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //       body: JSON.stringify({ token }),
    //     },
    //   );

    //   if (!response.ok) {
    //     throw new Error("Failed to confirm email");
    //   }

    //   return { success: true };
    // } catch (error) {
    //   throw redirect({
    //     to: "/signin",
    //     search: {
    //       error: "auth.confirmation_failed",
    //     },
    //   });
    // }
  },
});

function RouteComponent() {
  const navigate = useNavigate();
  const { token } = Route.useLoaderData();

  useEffect(() => {
    console.log("token", token);

    verifyEmail(
      {
        query: {
          token, // Pass the token here
          callbackURL: "/signin",
        },
      },
      {
        onSuccess: (ctx) => {
          console.log("ctx", ctx);
          // navigate({ to: "/signin", replace: true });
        },
        onError: (ctx) => {
          console.log("ctx", ctx);
          // navigate({ to: "/signin", replace: true });
        },
      },
    );
  }, [token]);

  return (
    <div className="mx-auto flex w-full flex-col justify-center space-y-6 max-w-[420px]">
      <div className="rounded-lg bg-green-50 p-4 text-green-800">
        {m["auth.email.title"]()}
      </div>
      <button
        type="button"
        onClick={() => navigate({ to: "/signin" })}
        className="text-sm text-primary hover:underline"
      >
        {m["auth.signin.title"]()}
      </button>
    </div>
  );
  // }

  // return null;
}
