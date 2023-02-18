import {DetailedHTMLProps, HTMLAttributes, ReactNode} from "react";
import styles from "./styles.module.css";
import clsx from "clsx";

type CenterProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    children: ReactNode;
};

export default function Center({children, className, ...props}: CenterProps) {
    return <div {...props} className={clsx(styles.center, className)}>{children}</div>
}