import {ReactNode} from "react";
import styles from "./styles.module.css";

interface FooterProps {
    children: ReactNode
}

export default function Footer({children}: FooterProps) {
    return (
        <footer className={styles.footer}>
            {children}
        </footer>
    );
}