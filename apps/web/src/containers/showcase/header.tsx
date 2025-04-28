import { Link } from "@tanstack/react-router";

import { m } from "@repo/dictionaries/messages";
import Brand from "@/assets/Brand";
import { Container } from "@/components/layout/container";
import { Button } from "@repo/ui";

export const ShowcaseHeader = ({ isAuth }: { isAuth: boolean }) => {
  return (
    <header className="border-b border-input sticky z-50 top-0 w-full">
      <Container
        size="large"
        className="flex h-16 items-center px-4 justify-between"
      >
        <Link to="/" className="flex items-center text-lg font-medium">
          <Brand className="w-10 h-10 min-w-10 mr-2" />
          <span>{m["common.website"]()}</span>
        </Link>
        {isAuth && (
          <Button asChild variant="ghost">
            <Link to="/dashboard">{m["dashboard.title"]()}</Link>
          </Button>
        )}
        {!isAuth && (
          <nav>
            <ul className="flex gap-2">
              <li>
                <Button asChild variant="ghost">
                  <Link to="/signup">{m["auth.signup.title"]()}</Link>
                </Button>
              </li>
              <li>
                <Button asChild>
                  <Link to="/signin">{m["auth.signin.title"]()}</Link>
                </Button>
              </li>
            </ul>
          </nav>
        )}
      </Container>
    </header>
  );
};
