import React, { DetailedHTMLProps, forwardRef, InputHTMLAttributes, ReactNode } from "react";
import clsx from "clsx";

type InputProps = {
  children: ReactNode;
  error?: Record<string, boolean>;
  help?: string;
  className?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(({ children, error = {}, help, ...props }, ref) => {
  const errorMessages = Object.keys(error).filter((key) => error[key]);
  return (
    <div className="field">
      <label className="label">{children}</label>
      <input ref={ref} type="text" {...props} className={clsx("input", {
        "is-danger": errorMessages.length > 0
      }, props.className)} />
      {help && <p className="help">{help}</p>}
      {errorMessages && errorMessages.map((msg, index) => <p key={`error-${index}`}
                                                             className="help is-danger">{msg}</p>)}
    </div>
  );
});
Input.displayName = "Input";

export default Input;