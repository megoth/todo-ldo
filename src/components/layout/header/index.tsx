import styles from "./styles.module.css";
import Container from "@/components/container";
import {useSession} from "@inrupt/solid-ui-react";
import LogoutButton from "@/components/logoutButton";
import Link from "next/link";
import Navigation from "@/components/navigation";

export default function LayoutHeader() {
    const {session: {info: {isLoggedIn}}} = useSession();
    return (
        <div className={styles.header}>
            <Container>
                <div className={styles.headerContent}>
                    <Link className={styles.appName} href={"/"}>Solid Todo App</Link>
                    {isLoggedIn && <LogoutButton />}
                </div>
            </Container>
        </div>
    )
}