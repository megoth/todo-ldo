import {DetailedHTMLProps, HTMLAttributes, ReactNode} from "react";
import styles from "./styles.module.css";
import clsx from "clsx";

type FlexBarProps = DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    align?: "center";
    children: ReactNode;
};

export default function FlexBar({align, children, className, ...props}: FlexBarProps) {
    return <div {...props} className={clsx(styles.bar, {
        [styles.center]: align === "center",
    }, className)}>{children}</div>
}