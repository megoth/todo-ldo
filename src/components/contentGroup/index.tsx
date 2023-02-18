import {ButtonHTMLAttributes, DetailedHTMLProps, ReactNode} from "react";
import styles from "./styles.module.css";
import clsx from "clsx";

type ContentGroupProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    children: ReactNode;
}

export default function ContentGroup({ children, className, ...props}: ContentGroupProps) {
    return <div {...props} className={clsx(styles.group, className)}>{children}</div>
}