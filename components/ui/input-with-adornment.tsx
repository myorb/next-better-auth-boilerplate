import * as React from "react";
import { Input } from "./input";
import { cn } from "@/lib/utils";

interface InputWithAdornmentProps extends React.ComponentProps<"input"> {
  startAdornment?: React.ReactNode | string;
  endAdornment?: React.ReactNode | string;
  wrapperClassName?: string;
  adornmentClassName?: string;
}

function InputWithAdornment({
  className,
  startAdornment,
  endAdornment,
  wrapperClassName,
  adornmentClassName,
  ...props
}: InputWithAdornmentProps) {
  return (
    <div className={cn("relative flex items-center", wrapperClassName)}>
      {startAdornment && (
        <div
          {...props}
          className={cn(
            "absolute left-0 flex items-center justify-center h-full px-3 bg-muted rounded-l-md border border-r-0",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            adornmentClassName
          )}
        >
          {typeof startAdornment === "string" ? (
            <span className="text-xs text-muted-foreground">
              {startAdornment}
            </span>
          ) : (
            startAdornment
          )}
        </div>
      )}
      <Input
        className={cn(
          startAdornment && "pl-[calc(var(--adornment-width,0.5rem))]",
          endAdornment && "pr-[calc(var(--adornment-width,0.5rem))]",
          className
        )}
        style={
          {
            "--adornment-width":
              startAdornment && typeof startAdornment === "string"
                ? `${startAdornment.length * 0.5}rem`
                : "1.5rem",
          } as React.CSSProperties
        }
        {...props}
      />
      {endAdornment && (
        <div
          {...props}
          className={cn(
            "absolute right-0 flex items-center justify-center h-full px-3 bg-muted rounded-r-md border border-l-0",
            "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
            adornmentClassName
          )}
        >
          {typeof endAdornment === "string" ? (
            <span className="text-xs text-muted-foreground">
              {endAdornment}
            </span>
          ) : (
            endAdornment
          )}
        </div>
      )}
    </div>
  );
}

export { InputWithAdornment };
