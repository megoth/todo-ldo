import {ReactNode} from "react";
import styles from "./styles.module.css";

interface CheckboxProps {
    children?: ReactNode;
}

export default function Checkbox({ children }: CheckboxProps) {
    return (
        <label className={styles.label}>
            <input className={styles.checkbox} type={"checkbox"}/>
            <span className={styles.labelText}>{children}</span>
        </label>
    )
}