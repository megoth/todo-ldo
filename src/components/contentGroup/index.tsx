import React, { ButtonHTMLAttributes, DetailedHTMLProps, ReactNode } from "react";
import clsx from "clsx";

type ContentGroupProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
  children: ReactNode;
  variant?: "content";
}

export default function ContentGroup({ children, className, variant, ...props }: ContentGroupProps) {
  return (
    <div {...props} className={clsx("box", className)}>
      <div className={variant}>{children}</div>
    </div>
  );
}