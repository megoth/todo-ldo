import React, {ReactNode} from "react";
import styles from "./styles.module.css";

interface ContainerProps {
    children: ReactNode;
}

export default function Container({children}: ContainerProps) {
    return (
        <div className={styles.container}>{children}</div>
    )
}