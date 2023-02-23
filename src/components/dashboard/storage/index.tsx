import {LinkedDataObject} from "ldo";
import {WebIdProfileShape} from "@/ldo/solid.typings";
import useSubject from "@/hooks/useSubject";
import {DocumentShape} from "@/ldo/todo.typings";
import {getResourceUrl} from "@/libs/ldo";
import {DocumentShapeFactory} from "@/ldo/todo.ldoFactory";
import styles from "./styles.module.css";
import DashboardList from "@/components/dashboard/list";
import {ButtonHTMLAttributes, DetailedHTMLProps} from "react";
import clsx from "clsx";

type DashboardStorageProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLDivElement>, HTMLDivElement> & {
    profile: LinkedDataObject<WebIdProfileShape>;
    storageUrl: string;
}

export default function DashboardStorage({className, style, profile, storageUrl, ...props}: DashboardStorageProps) {
    const {
        data: storage,
        error: storageError,
        isLoading: storageIsLoading,
        mutate: mutateStorage,
    } = useSubject<DocumentShape>(storageUrl, getResourceUrl(storageUrl), DocumentShapeFactory);
    const ownStorage = profile.storage.find((s) => s["@id"] === storageUrl) !== null;
    return (
        <div className={clsx(styles.storage, className)} style={{...style, minWidth: 320 * ((storage?.list?.length || 0) + 1)}} {...props}>
            <h2>
                {ownStorage && "Your storage"}
                {!ownStorage && "Someone else's storage"}
            </h2>
            <div className={styles.lists}>
                {storage?.list?.map((list) => (
                    <DashboardList key={list["@id"]} className={styles.list} listUrl={list["@id"]} resourceUrl={storageUrl} />
                ))}
                <div className={styles.list}>
                    <h3>Add list</h3>
                    <p>TODO: Controls to add list here</p>
                </div>
            </div>
        </div>
    );
}