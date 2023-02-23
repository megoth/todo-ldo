import {LinkedDataObject} from "ldo";
import {WebIdProfileShape} from "@/ldo/solid.typings";
import useTypeStorage from "@/hooks/useTypeStorage";
import {todoNamespace} from "@/vocabularies";
import DashboardStorage from "@/components/dashboard/storage";
import styles from "./styles.module.css";
import Container from "@/components/container";

interface DashboardProps {
    profile: LinkedDataObject<WebIdProfileShape>
}

export default function Dashboard({profile}: DashboardProps) {
    const storages = useTypeStorage(profile, todoNamespace.TodoList);
    return (
        <div>
            <Container>
                <h1>Dashboard</h1>
            </Container>
            <div className={styles.storages}>
                {storages?.map((storageUrl) => <DashboardStorage key={storageUrl} className={styles.storage} profile={profile} storageUrl={storageUrl}/>)}
                <div className={styles.storage}>
                    <h2>Add storage</h2>
                </div>
            </div>
        </div>
    );
}