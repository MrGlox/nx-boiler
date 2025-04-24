import { createFileRoute, redirect } from "@tanstack/react-router";
import { useSearch } from "@tanstack/react-router";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/_auth/confirm-email")({
  component: RouteComponent,
  loader: async () => {
    const search = new URLSearchParams(window.location.search);
    const token = search.get("token");

    if (!token) {
      throw redirect({
        to: "/signin",
        search: {
          error: "auth.invalid_token",
        },
      });
    }

    try {
      // Call the API directly since better-auth doesn't expose confirmEmail
      const response = await fetch(
        `${import.meta.env["VITE_API_URL"]}/api/auth/confirm-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        },
      );

      if (!response.ok) {
        throw new Error("Failed to confirm email");
      }

      return { success: true };
    } catch (error) {
      throw redirect({
        to: "/signin",
        search: {
          error: "auth.confirmation_failed",
        },
      });
    }
  },
});

function RouteComponent() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { success } = Route.useLoaderData();

  if (success) {
    return (
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 max-w-[420px]">
        <div className="rounded-lg bg-green-50 p-4 text-green-800">
          {t("auth.email_confirmed")}
        </div>
        <button
          type="button"
          onClick={() => navigate({ to: "/signin" })}
          className="text-sm text-primary hover:underline"
        >
          {t("auth.back_to_signin")}
        </button>
      </div>
    );
  }

  return null;
}
