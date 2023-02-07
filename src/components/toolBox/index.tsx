import {useContext} from "react";
import DeveloperModeContext from "@/contexts/developerMode";
import {useSession} from "@inrupt/solid-ui-react";
import styles from "./styles.module.css";

export default function ToolBox() {
    const { developerMode } = useContext(DeveloperModeContext);
    const {session} = useSession();
    const {info} = session;

    if (!developerMode || !info.isLoggedIn) {
        return null;
    }

    return <div className={styles.toolbar}>test</div>
}