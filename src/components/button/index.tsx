import {AnchorHTMLAttributes, ButtonHTMLAttributes, DetailedHTMLProps, MouseEventHandler} from "react";
import styles from "./styles.module.css";
import clsx from "clsx";
import Link from "next/link";

type ButtonProps =
    DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
    & DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;

export default function Button(props: ButtonProps) {
    return props.href
        ? <Link {...props as any} className={clsx(styles.button, props.className)} onClick={props.onClick as MouseEventHandler<HTMLAnchorElement>}/>
        : <button {...props} className={clsx(styles.button, props.className)} onClick={props.onClick as MouseEventHandler<HTMLButtonElement>}/>
}