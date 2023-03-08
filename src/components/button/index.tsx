import {AnchorHTMLAttributes, ButtonHTMLAttributes, DetailedHTMLProps, MouseEventHandler} from "react";
import clsx from "clsx";
import Link from "next/link";

type ButtonOptions = {
    variant?: "primary" | "danger"
}

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
    & DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
    & ButtonOptions;

export default function Button({variant, ...props}: ButtonProps) {
    const className = clsx('button', {
        'is-primary': variant === "primary",
        'is-danger is-light': variant === "danger",
    }, props.className);
    return props.href
        ? <Link
            {...props as any}
            className={className}
            onClick={props.onClick as MouseEventHandler<HTMLAnchorElement>}/>
        : <button
            {...props}
            className={className}
            onClick={props.onClick as MouseEventHandler<HTMLButtonElement>}/>
}