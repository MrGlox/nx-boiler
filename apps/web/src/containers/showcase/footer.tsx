import { m } from "@/paraglide/messages";

import { LanguageSwitcher } from "../language-switcher";

export const ShowcaseFooter = () => {
  return (
    <footer className="w-full border-t px-4">
      <div className="flex justify-between items-center p-4">
        <p className="text-sm text-gray-500">
          &copy; <span className="font-semibold">{m["common.website"]()}</span>{" "}
          - {new Date().getFullYear()}
        </p>
        <LanguageSwitcher />
      </div>
    </footer>
  );
};
