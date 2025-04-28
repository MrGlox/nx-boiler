import { m } from "@repo/dictionaries/messages";

import { LanguageSwitcher } from "../language-switcher";

export const DashboardFooter = () => {
  return (
    <footer className="w-full border-t border-input px-4">
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
