import {ReactNode} from "react";
import styles from "./styles.module.css";

interface FormErrorProps {
    children: ReactNode;
}

export default function FormError({children}: FormErrorProps) {
    return <p className={styles.error}>{children}</p>
}