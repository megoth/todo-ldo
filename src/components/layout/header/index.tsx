import styles from "./styles.module.css";
import Container from "@/components/container";
import {useSession} from "@inrupt/solid-ui-react";
import LogoutButton from "@/components/logoutButton";
import DeveloperModeButton from "@/components/developerModeButton";

export default function LayoutHeader() {
    const {session} = useSession();
    const {info} = session;
    return (
        <div className={styles.header}>
            <Container>
                <div className={styles.headerContent}>
                    <div className={styles.appName}>Solid Todo App</div>
                    {info.isLoggedIn && <DeveloperModeButton />}
                    {info.isLoggedIn && <LogoutButton />}
                </div>
            </Container>
        </div>
    )
}