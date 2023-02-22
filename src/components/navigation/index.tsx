import styles from "./styles.module.css";
import Link from "next/link";
import {FaCaretRight} from "react-icons/fa";

const items = [
    {href: "/list", text: "All lists"},
    {href: "/settings", text: "Settings"}
]

export default function Navigation() {
    return (
        <nav className={styles.nav}>
            <ul className={styles.list}>
                {items.map(({href, text}) => (
                    <li key={href}>
                        <Link className={styles.link} href={href}>
                            <FaCaretRight />
                            <span> {text}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    )
}