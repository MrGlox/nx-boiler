import { Slot } from "@radix-ui/react-slot";
import * as React from "react";

import { cn } from "@repo/utils";
import { m } from "@repo/dictionaries/messages";

import { Label } from "./label";

import {
  createFormHook,
  createFormHookContexts,
  useStore,
} from "@tanstack/react-form";

const {
  fieldContext,
  formContext,
  useFieldContext: _useFieldContext,
  useFormContext,
} = createFormHookContexts();

const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    FormAlert,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
    FormItem,
  },
  formComponents: {},
});

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue>(
  {} as FormItemContextValue,
);

function FormAlert({ className, ...props }: React.ComponentProps<"div">) {
  const { id } = React.useContext(FormItemContext);
  const { store } = _useFieldContext();

  // const formErrorMap = useStore(store, (state) => {
  //   console.log(state);
  //   return state;
  // });

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-alert"
        className={cn("grid gap-2", className)}
        {...props}
      />
    </FormItemContext.Provider>
  );
}

function FormItem({ className, ...props }: React.ComponentProps<"div">) {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div
        data-slot="form-item"
        className={cn("grid gap-2", className)}
        {...props}
      />
    </FormItemContext.Provider>
  );
}

const useFieldContext = () => {
  const { id } = React.useContext(FormItemContext);
  const { name, store, ...fieldContext } = _useFieldContext();

  const errors = useStore(store, (state) => state.meta.errors);
  const value = useStore(store, (state) => state.value);

  if (!fieldContext) {
    throw new Error("useFieldContext should be used within <FormItem>");
  }

  return {
    id,
    name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    errors,
    store,
    value,
    ...fieldContext,
  };
};

function FormLabel({
  className,
  ...props
}: React.ComponentProps<typeof Label>) {
  const { formItemId, errors } = useFieldContext();

  return (
    <Label
      data-slot="form-label"
      data-error={!!errors.length}
      className={cn("data-[error=true]:text-destructive", className)}
      htmlFor={formItemId}
      {...props}
    />
  );
}

function FormControl({ ...props }: React.ComponentProps<typeof Slot>) {
  const { errors, formItemId, formDescriptionId, formMessageId } =
    useFieldContext();

  return (
    <Slot
      data-slot="form-control"
      id={formItemId}
      aria-describedby={
        !errors.length
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!errors.length}
      {...props}
    />
  );
}

function FormDescription({ className, ...props }: React.ComponentProps<"p">) {
  const { formDescriptionId } = useFieldContext();

  return (
    <p
      data-slot="form-description"
      id={formDescriptionId}
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function FormMessage({ className, ...props }: React.ComponentProps<"p">) {
  const { errors, formMessageId } = useFieldContext();

  const body = errors.length
    ? String(errors.at(0)?.message ?? "")
    : props.children;

  if (!body) return null;

  const [message, value] = body?.toString().split("/") || [];
  const parsedMessage = m[message]?.({ value: value });

  return (
    <p
      data-slot="form-message"
      id={formMessageId}
      className={cn("text-destructive text-sm", className)}
      {...props}
    >
      {parsedMessage ? parsedMessage : body}
    </p>
  );
}

export { useAppForm, useFormContext, useFieldContext, withForm };
