"use client";

import { Checkbox } from "@/components/shadcnui/checkbox";
import { Field, FieldError, FieldLabel } from "@/components/shadcnui/field";
import { Input } from "@/components/shadcnui/input";
import { LoginSchemaType } from "@/lib/type";
import { Control, Controller, Path } from "react-hook-form";

type LoginFieldProps = {
  control: Control<LoginSchemaType>;
  name: Path<LoginSchemaType>;
  label: string;
  type: React.HTMLInputTypeAttribute;
  placeholder?: string;
  autoComplete?: string;
};

const FieldLogin = ({
  control,
  type,
  autoComplete,
  label,
  name,
  placeholder,
}: LoginFieldProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => (
        <Field>
          {type === "checkbox" ?
            <div className="flex items-center gap-2">
              <Checkbox
                id={field.name}
                checked={field.value as boolean}
                onCheckedChange={field.onChange}
              />
              <FieldLabel htmlFor={field.name}>{label}</FieldLabel>
            </div>
          : <>
              <FieldLabel htmlFor={field.name}>{label}</FieldLabel>

              <Input
                {...field}
                id={field.name}
                type={type}
                placeholder={placeholder}
                autoComplete={autoComplete}
                value={field.value as string}
                aria-invalid={fieldState.invalid}
                aria-describedby={
                  fieldState.invalid ? `${field.name}-error` : undefined
                }
              />
            </>
          }

          {fieldState.invalid && (
            <FieldError
              id={`${field.name}-error`}
              errors={[fieldState.error]}
            />
          )}
        </Field>
      )}
    />
  );
};

export default FieldLogin;
