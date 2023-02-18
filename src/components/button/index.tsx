import {AnchorHTMLAttributes, ButtonHTMLAttributes, DetailedHTMLProps, MouseEventHandler} from "react";
import styles from "./styles.module.css";
import clsx from "clsx";
import Link from "next/link";

type ButtonOptions = {
    variant?: "link" | "primary"
}

type ButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
    & DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
    & ButtonOptions;

export default function Button({variant, ...props}: ButtonProps) {
    const className = clsx({
        [styles.button]: !variant,
        [styles.link]: variant === "link",
        [styles.primaryButton]: variant === "primary",
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