import React, { forwardRef } from "react"

type InputProps = {
  id?: string;
  name?: string;
  type?: string;
  placeholder?: string;
  value?: string;
  defaultValue?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  required?: boolean;
  disabled?: boolean;
  className?: string;
  error?: string;
  ref?: React.Ref<HTMLInputElement>;
};

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      id,
      name,
      type = "text",
      placeholder,
      value,
      defaultValue,
      onChange,
      onBlur,
      required = false,
      disabled = false,
      className = "",
      error,
      ...props
    },
    ref
  ) => {
    return (
      <div className="space-y-1">
        <input
          id={id || name}
          name={name}
          type={type}
          placeholder={placeholder}
          value={value}
          defaultValue={defaultValue}
          onChange={onChange}
          onBlur={onBlur}
          required={required}
          disabled={disabled}
          ref={ref}
          className={`flex h-10 rounded-md border-[1px] border-gray-300 bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className} ${
            error ? "border-red-500" : ""
          }`}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
      </div>
    );
  }
);

Input.displayName = "Input";
