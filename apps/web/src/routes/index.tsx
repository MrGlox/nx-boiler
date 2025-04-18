import { createFileRoute } from "@tanstack/react-router";

import { m } from "@repo/dictionaries/messages";
import { locales, setLocale } from "@repo/dictionaries/runtime";
import { getServerMessage } from "@/server/get-message";

export const Route = createFileRoute("/")({
  component: App,
  loader: () => {
    return getServerMessage({ data: "📩" });
  },
});

function App() {
  const serverMessage = Route.useLoaderData();

  return (
    <div className="p-2">
      <h2>{serverMessage}:</h2>
      <h3>{m.example_message({ username: "John Doe" })}</h3>
      {locales.map((locale) => (
        <button
          onClick={() => setLocale(locale)}
          key={locale}
          type="button"
          className={
            "px-2 py-1 bg-gray-600 dark:bg-gray-700 rounded-sm text-white uppercase font-extrabold m-2"
          }
        >
          {locale}
        </button>
      ))}
    </div>
  );
}
