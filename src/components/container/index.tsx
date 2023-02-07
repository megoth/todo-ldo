import styles from "./styles.module.css";
import {ReactNode} from "react";

interface ContainerProps {
    children: ReactNode;
}

export default function Container({children}: ContainerProps) {
    return (
        <div className={styles.container}>{children}</div>
    )
}