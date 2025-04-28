import { zodResolver } from "@hookform/resolvers/zod";
import { useMemo } from "react";
import {
  createFileRoute,
  // useLoaderData
} from "@tanstack/react-router";
import z from "zod";
import { m } from "@repo/dictionaries/messages";
import { getLocale } from "@repo/dictionaries/runtime";

import {
  // Button,
  // Input,
  // Select,
  // SelectContent,
  // SelectItem,
  // SelectTrigger,
  // SelectValue,
  Separator,
  useAppForm,
} from "@repo/ui";

import { Container } from "@/components/layout/container";
import { langs } from "@/containers/language-switcher";

const schema = z.object({
  pseudo: z.string(),
  language: z.string(),
});

type FormData = z.infer<typeof schema>;
const resolver = zodResolver(schema);

export const Route = createFileRoute("/dashboard/account/")({
  loader: async ({ context }) => {
    return {
      // Translated meta tags
      title: m["dashboard.my_account.title"](),
      description: m["dashboard.my_account.description"](),
    };
  },
});

const AccountHome = () => {
  // const { message, user } = useLoaderData<typeof Route>();

  const { currentLanguage } = useMemo(() => {
    return {
      currentLanguage: langs.filter(({ value }) => value === getLocale())[0],
    };
  }, [getLocale()]);

  const form = useAppForm<FormData>({
    defaultValues: {
      // pseudo: user?.pseudo || "",
      language: getLocale(),
    },
    resolver,
  });

  return (
    <Container className="px-0">
      <header className="flex-1 space-y-2 pb-4">
        <h3 className="text-xl font-bold tracking-tight">
          {m["dashboard.my_account.title"]()}
        </h3>
        <p className="text-sm text-muted-foreground">
          {m["dashboard.my_account.description"]()}
        </p>
        <Separator className="mt-2" />
      </header>
      <main className="max-w-[500px]">
        {/* {withForm(form, ({ Field }) => (
          <form>
            <Field
              name="pseudo"
              disabled
              render={({
                field,
              }: {
                field: {
                  value: string;
                  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
                };
              }) => (
                <div className="space-y-2">
                  <label>{m["dashboard.fields.username"]()}</label>
                  <Input
                    placeholder={
                      user?.pseudo || m["dashboard.fields.username"]()
                    }
                    value={field.value}
                    onChange={field.onChange}
                  />
                  <p className="text-sm text-muted-foreground">
                    {m["dashboard.my_account.description"]()}
                  </p>
                </div>
              )}
            />
            <Field
              name="language"
              render={({
                field,
              }: {
                field: { value: string; onChange: (value: string) => void };
              }) => (
                <div className="space-y-2">
                  <label>{m["dashboard.fields.language"]()}</label>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={currentLanguage.label} />
                    </SelectTrigger>
                    <SelectContent>
                      {langs.map(({ label, value }) => (
                        <SelectItem
                          key={`${field.name}_${value}_${label}`}
                          value={value}
                        >
                          {label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}
            />

            <div className="flex justify-end">
              <Button className="mt-3 self-end min-w-[120px]">
                {m["common.submit"]()}
              </Button>
            </div>
          </form>
        ))} */}
      </main>
    </Container>
  );
};

export default AccountHome;
