import React, {ReactNode} from "react";
import styles from "./styles.module.css";

interface TextContentProps {
    children: ReactNode
}

export default function TextContent({ children }: TextContentProps) {
    return <div className={styles.content}>{children}</div>
}