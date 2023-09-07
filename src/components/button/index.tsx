import React, { AnchorHTMLAttributes, ButtonHTMLAttributes, DetailedHTMLProps, MouseEventHandler } from "react";
import clsx from "clsx";
import Link from "next/link";

type ButtonOptions = {
  variant?: "primary" | "danger"
}

type AnchorElementProps =
  Omit<DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>, "href">
  & { href: URL | string }
  & React.RefAttributes<HTMLAnchorElement>;
type ButtonElementProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;
type ButtonProps = (ButtonElementProps | AnchorElementProps) & ButtonOptions;

export default function Button({ variant, ...props }: ButtonProps) {
  const className = clsx("button", {
    "is-primary": variant === "primary",
    "is-danger is-light": variant === "danger"
  }, props.className);
  return (props as AnchorElementProps).href
    ? <Link
      {...props as AnchorElementProps}
      className={className}
      onClick={props.onClick as MouseEventHandler<HTMLAnchorElement>} />
    : <button
      {...props as ButtonElementProps}
      className={className}
      onClick={props.onClick as MouseEventHandler<HTMLButtonElement>} />;
}