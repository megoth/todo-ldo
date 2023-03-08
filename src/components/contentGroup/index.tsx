import {ButtonHTMLAttributes, DetailedHTMLProps, ReactNode} from "react";
import clsx from "clsx";

type ContentGroupProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    children: ReactNode;
}

export default function ContentGroup({ children, className, ...props}: ContentGroupProps) {
    return <div {...props} className={clsx("box", className)}>{children}</div>
}