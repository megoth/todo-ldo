import Link from "next/link";
import DarkModeSelector from "@/components/darkModeSelector";
import DeveloperModeButton from "@/components/developerModeButton";
import {useSession} from "@inrupt/solid-ui-react";
import styles from "./styles.module.css";

export default function FooterNavigation() {
    const {session: {info: {isLoggedIn}}} = useSession();
    return (
        <nav>
            <ul className={styles.nav}>
                <li>
                    <Link href={"/about"}>About this app</Link>
                </li>
                <li className={styles.split}/>
                <li>
                    <DarkModeSelector/>
                </li>
                {isLoggedIn && (
                    <li>
                        <DeveloperModeButton/>
                    </li>
                )}
            </ul>
        </nav>
    )
}