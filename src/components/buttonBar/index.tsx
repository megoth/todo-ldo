import {DetailedHTMLProps, HTMLAttributes, ReactNode} from "react";
import styles from "./styles.module.css";
import clsx from "clsx";

type ButtonBarProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    children: ReactNode;
};

export default function ButtonBar({children, className, ...props}: ButtonBarProps) {
    return <div {...props} className={clsx(styles.bar, className)}>{children}</div>
}