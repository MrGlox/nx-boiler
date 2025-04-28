import { AvatarFallback } from "@radix-ui/react-avatar";
import { PersonIcon } from "@radix-ui/react-icons";
import { useNavigate } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import {
  ChevronDown,
  Cloud,
  CreditCard,
  LifeBuoy,
  LogOut,
  Mail,
  MessageSquare,
  PlusCircle,
  ReceiptText,
  Settings,
  User,
  UserPlus,
  Users,
} from "lucide-react";

import { m } from "@repo/dictionaries/messages";

import {
  Avatar,
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@repo/ui";
import { signOut } from "@/lib/auth";

export function DropdownProfile() {
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(
      {
        query: {
          callbackURL: "/signin",
        },
      },
      {
        onSuccess: () => {
          navigate({ to: "/signin", replace: true });
        },
      },
    );
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="link"
          className="inline-flex focus:border-none border-none p-0.5"
        >
          <Avatar className="mr-2 bg-black">
            {/* <AvatarImage src="https://github.com/shadcn.png" /> */}
            <AvatarFallback className="inline-flex text-white min-h-[40px] min-w-[40px] items-center justify-center">
              <PersonIcon className="h-5 w-5" />
            </AvatarFallback>
          </Avatar>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end">
        <DropdownMenuLabel>
          {m["dashboard.my_account.title"]()}
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to="/dashboard/account/profile">
              <User />
              <span>{m["dashboard.profile.title"]()}</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/dashboard/account/billings">
              <ReceiptText />
              <span>{m["dashboard.billings.title"]()}</span>
              <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/dashboard/account/subscription">
              <CreditCard />
              <span>{m["dashboard.subscription.title"]()}</span>
              <DropdownMenuShortcut>⌘P</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link to="/dashboard/account/settings">
              <Settings />
              <span>{m["dashboard.settings.title"]()}</span>
              <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          {/* <DropdownMenuItem>
            <Keyboard />
            <span>Keyboard shortcuts</span>
            <DropdownMenuShortcut>⌘K</DropdownMenuShortcut>
          </DropdownMenuItem> */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            <Link to="/dashboard/account/team">
              <Users />
              <span>{m["dashboard.team"]()}</span>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <UserPlus />
              <span>{m["dashboard.invite_users"]()}</span>
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem>
                  <Mail />
                  <span>{m["dashboard.invite.email"]()}</span>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <MessageSquare />
                  <span>{m["dashboard.invite.message"]()}</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <PlusCircle />
                  <span>{m["dashboard.invite.more"]()}</span>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          {/* <DropdownMenuItem>
            <Plus />
            <span>New Team</span>
            <DropdownMenuShortcut>⌘+T</DropdownMenuShortcut>
          </DropdownMenuItem> */}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        {/* <DropdownMenuItem asChild>
          <a
            href="https://github.com/MrGlox/remix-nest-boilerplate"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Github />
            <span>GitHub</span>
          </a>
        </DropdownMenuItem> */}
        <DropdownMenuItem asChild>
          <a
            href="https://github.com/MrGlox/remix-nest-boilerplate/issues"
            target="_blank"
            rel="noopener noreferrer"
          >
            <LifeBuoy />
            <span>{m["dashboard.support"]()}</span>
          </a>
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Cloud />
          <span>API</span>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild className="w-full">
          <button type="button" onClick={handleSignOut}>
            <LogOut />
            <span>{m["common.logout"]()}</span>
            {/* <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut> */}
          </button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
