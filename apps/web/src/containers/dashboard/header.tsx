import { Link } from "@tanstack/react-router";
import { m } from "@repo/dictionaries/messages";

import { Brand } from "@/assets";

import { CommandMenu } from "./command-menu";
import { DropdownProfile } from "./dropdown-profile";
import { NotificationsCard } from "./notifications-card";

export const DashboardHeader = () => {
  return (
    <header className="border-b border-input sticky z-50 top-0 w-full bg-white">
      <div className="flex h-16 max-h-16 py-3 items-center px-4 justify-between">
        <Link to="/dashboard" className="flex items-center text-lg font-medium">
          <Brand className="w-10 h-10 min-w-10 mr-2" />
          {m["common.website"]()}
        </Link>
        <div className="flex items-center gap-8">
          <CommandMenu />
          <nav>
            <ul className="flex gap-4">
              <li>
                <NotificationsCard notifications={[]} />
              </li>
              <li className="max-h-[40px]">
                <DropdownProfile />
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};
