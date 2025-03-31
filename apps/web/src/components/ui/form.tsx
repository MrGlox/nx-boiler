'use client';

import * as LabelPrimitive from '@radix-ui/react-label';
import { Slot } from '@radix-ui/react-slot';
import * as React from 'react';
// import { FormApi } from '@tanstack/react-form';
import { useTranslation } from 'react-i18next';

import { Label } from '~/components/ui/label';
import { cn, generateAlert, generateFlash } from '~/lib/utils';

// Define proper types instead of using 'any'
interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  form: any;
  children: React.ReactNode;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  actionData?: Record<string, unknown>;
  loaderData?: Record<string, unknown>;
  // Add any other form props needed
}

const Form = React.forwardRef<HTMLFormElement, FormProps>(
  (
    {
      form,
      children,
      handleSubmit,
      className,
      actionData,
      loaderData,
      ...props
    },
    ref,
  ) => {
    const { t } = useTranslation();

    return (
      <form.Provider
        ref={ref}
        method="POST"
        onSubmit={handleSubmit}
        className={cn('space-y-4 py-4', className)}
        {...props}
      >
        {(actionData && generateAlert({ t, actionData })) ||
          (loaderData && generateFlash({ t, loaderData }))}
        {children}
      </form.Provider>
    );
  },
);
Form.displayName = 'Form';

// Define proper context types
type FormFieldContextValue = {
  name: string;
};

const FormFieldContext = React.createContext<FormFieldContextValue | undefined>(
  undefined,
);

// Update FormField to use TanStack Form API
interface FormFieldProps {
  name: string;
  children: React.ReactNode;
}

const FormField = ({ name, children }: FormFieldProps) => {
  return (
    <FormFieldContext.Provider value={{ name }}>
      {children}
    </FormFieldContext.Provider>
  );
};

// Update useFormField to work with TanStack Form
const useFormField = () => {
  const fieldContext = React.useContext(FormFieldContext);
  const itemContext = React.useContext(FormItemContext);

  if (!fieldContext) {
    throw new Error('useFormField should be used within <FormField>');
  }

  const { id } = itemContext || { id: '' };

  // This is a simplified version - you'll need to adapt this to work with TanStack Form's API
  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    error: undefined, // You'll need to get the error from TanStack Form
  };
};

type FormItemContextValue = {
  id: string;
};

const FormItemContext = React.createContext<FormItemContextValue | undefined>(
  undefined,
);

const FormItem = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => {
  const id = React.useId();

  return (
    <FormItemContext.Provider value={{ id }}>
      <div ref={ref} className={cn('space-y-1', className)} {...props} />
    </FormItemContext.Provider>
  );
});
FormItem.displayName = 'FormItem';

const FormLabel = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { error, formItemId } = useFormField();

  return (
    <Label
      ref={ref}
      className={cn(className, error && 'text-destructive')}
      htmlFor={formItemId}
      {...props}
    />
  );
});
FormLabel.displayName = 'FormLabel';

const FormControl = React.forwardRef<
  React.ElementRef<typeof Slot>,
  React.ComponentPropsWithoutRef<typeof Slot>
>(({ ...props }, ref) => {
  const { error, formItemId, formDescriptionId, formMessageId } =
    useFormField();

  return (
    <Slot
      ref={ref}
      id={formItemId}
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={!!error}
      {...props}
    />
  );
});
FormControl.displayName = 'FormControl';

const FormDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => {
  const { formDescriptionId } = useFormField();

  return (
    <p
      ref={ref}
      id={formDescriptionId}
      className={cn('text-sm text-muted-foreground', className)}
      {...props}
    />
  );
});
FormDescription.displayName = 'FormDescription';

const FormMessage = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, children, ...props }, ref) => {
  const { t } = useTranslation('validations');
  const { error, formMessageId } = useFormField();

  // Replace any with a proper type
  const body: string | undefined = error
    ? String(error?.message)
    : (children as string | undefined);
  const [message, value] = body?.split('/') || ['', ''];

  if (!body) {
    return null;
  }

  return (
    <p
      ref={ref}
      id={formMessageId}
      className={cn('text-sm font-medium text-destructive', className)}
      {...props}
    >
      {t(message, {
        value: value || '',
      })}
    </p>
  );
});
FormMessage.displayName = 'FormMessage';

export {
  useFormField,
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
  FormField,
};
