import { createFileRoute } from "@tanstack/react-router";
import { useCallback } from "react";
import { z } from "zod";
import { sub } from "date-fns";
import { m } from "@repo/dictionaries/messages";

import {
  Button,
  Input,
  LocationSelector,
  Separator,
  DatePicker,
  type CountryProps,
  type StateProps,
  useAppForm,
} from "@repo/ui";

import { Container } from "@/components/layout/container";
import { Grid } from "@/components/layout/grid";

export const Route = createFileRoute("/dashboard/account/profile")({
  component: RouteComponent,
});

const schema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  birthday: z.coerce.date(),
  street: z.string(),
  street_optional: z.string().optional(),
  city: z.string(),
  state: z.string().optional(),
  country: z.tuple([z.string(), z.string()]),
});

type FormData = z.infer<typeof schema>;

function RouteComponent() {
  const defaultValues: FormData = {
    firstName: "",
    lastName: "",
    birthday: sub(new Date(), { years: 20 }),
    street: "",
    street_optional: "",
    city: "",
    state: "",
    country: ["", ""],
  };

  const form = useAppForm({
    validators: {
      onSubmit: schema,
    },
    defaultValues,
  });

  const handleSubmit = useCallback(
    async (ev: React.FormEvent) => {
      ev.preventDefault();
      ev.stopPropagation();

      await form.handleSubmit();
      console.log("Form submitted:", form.state.values);
      // Handle form submission
    },
    [form],
  );

  return (
    <Container>
      <header className="flex-1 space-y-2">
        <h3 className="text-xl font-bold tracking-tight">
          {m["dashboard.profile.title"]()}
        </h3>
        <p className="text-sm text-muted-foreground">
          {m["dashboard.profile.update_profile_settings"]()}
        </p>
        <Separator className="mt-2" />
      </header>
      <main className="max-w-[500px]">
        <form
          onSubmit={handleSubmit}
          className="space-y-2 max-w-3xl mx-auto pb-10"
          method="POST"
        >
          <header className="flex flex-col">
            <h4 className="text-lg font-bold tracking-tight">
              {m["dashboard.profile.personal_information"]()}
            </h4>
            <p className="text-muted-foreground text-sm">
              {m["dashboard.profile.personal_description"]()}
            </p>
          </header>
          <Grid className="!mb-4">
            <div className="col-span-full md:col-span-3 lg:col-span-6">
              <form.AppField
                name="firstName"
                children={(field) => (
                  <field.FormItem>
                    <field.FormLabel>
                      {m["dashboard.profile.firstName"]()}
                    </field.FormLabel>
                    <field.FormControl>
                      <Input id="firstName" placeholder="" type="text" />
                    </field.FormControl>
                    <field.FormMessage />
                  </field.FormItem>
                )}
              />
            </div>
            <div className="col-span-full md:col-span-3 lg:col-span-6">
              <form.AppField
                name="lastName"
                children={(field) => (
                  <field.FormItem>
                    <field.FormLabel>
                      {m["dashboard.profile.lastName"]()}
                    </field.FormLabel>
                    <field.FormControl>
                      <Input id="lastName" placeholder="" type="text" />
                    </field.FormControl>
                    <field.FormMessage />
                  </field.FormItem>
                )}
              />
            </div>
          </Grid>
          <div className="w-full">
            <form.AppField
              name="birthday"
              children={(field) => (
                <field.FormItem>
                  <field.FormLabel>
                    {m["dashboard.profile.birthday"]()}
                  </field.FormLabel>
                  <field.FormControl>
                    <DatePicker
                      date={
                        form.state.values.birthday
                          ? new Date(form.state.values.birthday)
                          : undefined
                      }
                      setDate={(date: Date | undefined) => {
                        form.setValue("birthday", date || new Date());
                      }}
                      endYear={sub(new Date(), { years: 16 }).getFullYear()}
                    />
                  </field.FormControl>
                  <field.FormMessage />
                </field.FormItem>
              )}
            />
          </div>
          <Separator className="!my-6" />
          <header className="flex flex-col">
            <h4 className="text-lg font-bold tracking-tight">
              {m["dashboard.profile.address"]()}
            </h4>
            <p className="text-muted-foreground text-sm">
              {m["dashboard.profile.address_description"]()}
            </p>
          </header>
          <Grid className="gap-y-2">
            <div className="col-span-full md:col-span-4 lg:col-span-8">
              <form.AppField
                name="street"
                children={(field) => (
                  <field.FormItem>
                    <field.FormLabel>
                      {m["dashboard.profile.street1"]()}
                    </field.FormLabel>
                    <field.FormControl>
                      <Input id="street" placeholder="" type="text" />
                    </field.FormControl>
                    <field.FormMessage />
                  </field.FormItem>
                )}
              />
            </div>
            <div className="col-span-full md:col-span-2 lg:col-span-4">
              <form.AppField
                name="city"
                children={(field) => (
                  <field.FormItem>
                    <field.FormLabel>
                      {m["dashboard.profile.city"]()}
                    </field.FormLabel>
                    <field.FormControl>
                      <Input id="city" placeholder="" type="text" />
                    </field.FormControl>
                    <field.FormMessage />
                  </field.FormItem>
                )}
              />
            </div>
            <div className="col-span-full">
              <form.AppField
                name="street_optional"
                children={(field) => (
                  <field.FormItem>
                    <field.FormLabel>
                      {m["dashboard.profile.street2"]()}
                    </field.FormLabel>
                    <field.FormControl>
                      <Input id="street_optional" placeholder="" type="text" />
                    </field.FormControl>
                    <field.FormMessage />
                  </field.FormItem>
                )}
              />
            </div>
          </Grid>
          <div>
            <form.AppField
              name="country"
              children={(field) => (
                <field.FormItem>
                  <field.FormLabel>
                    {m["dashboard.profile.country"]()}
                  </field.FormLabel>
                  <field.FormControl>
                    <LocationSelector
                      defaultValue={form.state.values.country}
                      onCountryChange={(country: CountryProps | null) => {
                        form.setValue("country", [country?.name || "", ""]);
                      }}
                      onStateChange={(state: StateProps | null) => {
                        const countryValue = form.state.values.country;
                        if (countryValue[0] !== "") {
                          form.setValue("country", [
                            countryValue[0] || "",
                            state?.name || "",
                          ]);
                        }
                      }}
                    />
                  </field.FormControl>
                  <field.FormDescription className="text-sm text-muted-foreground">
                    {m["dashboard.profile.country_description"]()}
                  </field.FormDescription>
                  <field.FormMessage />
                </field.FormItem>
              )}
            />
          </div>
          <div className="flex justify-end">
            <form.Subscribe
              selector={(state) => [state.canSubmit, state.isSubmitting]}
              children={([canSubmit, isSubmitting]) => (
                <Button
                  className="mt-3 self-end min-w-[120px]"
                  type="submit"
                  disabled={!canSubmit || isSubmitting}
                >
                  {isSubmitting ? "..." : m["common.submit"]()}
                </Button>
              )}
            />
          </div>
        </form>
      </main>
    </Container>
  );
}
