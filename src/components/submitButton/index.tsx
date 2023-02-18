import {AnchorHTMLAttributes, ButtonHTMLAttributes, DetailedHTMLProps, ReactNode} from "react";
import Button from "@/components/button";
import styles from "./styles.module.css";

type SubmitButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
    & DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
    & {
    children: ReactNode;
}

export default function SubmitButton({children, ...props}: SubmitButtonProps) {
    return (
        <div className={styles.container}>
            <Button variant="primary" type="submit" {...props}>{children}</Button>
        </div>
    )
}