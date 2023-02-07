import {useContext, useEffect, useState} from "react";
import DeveloperModeContext from "@/contexts/developerMode";
import {useSession} from "@inrupt/solid-ui-react";
import styles from "./styles.module.css";
import clsx from "clsx";
import Code from "@/components/code";
import {LinkedDataObject} from "ldo";
import DeveloperModeButton from "@/components/developerModeButton";

export default function ToolBox() {
    const {developerMode, subjects} = useContext(DeveloperModeContext);
    const {session} = useSession();
    const [selectedSubject, setSelectedSubject] = useState<LinkedDataObject<any>>(null);
    const [turtle, setTurtle] = useState<string>();

    useEffect(() => {
        if (selectedSubject || subjects.length === 0) {
            return;
        }
        setSelectedSubject(subjects[0]);
    }, [subjects])

    useEffect(() => {
        if (!selectedSubject) {
            return;
        }
        (async () => {
            setTurtle(await selectedSubject.$toTurtle())
        })();
    }, [selectedSubject]);

    return (
        <div className={styles.toolbar}>
            <ul className={styles.bars}>
                {developerMode && session.info.isLoggedIn && subjects.map((subject) => (
                    <li key={subject["@id"]}>
                        <button type={"button"} className={clsx({
                            [styles.selectedBar]: selectedSubject === subject
                        })} onClick={(_) => setSelectedSubject(subject)}>{getUrlEnd(subject["@id"])}</button>
                    </li>
                ))}
                {session.info.isLoggedIn && (
                    <li className={styles.developerModeToggleBar}>
                        <DeveloperModeButton/>
                    </li>
                )}
            </ul>
            {developerMode && session.info.isLoggedIn && selectedSubject && (
                <>
                    <div>
                        <span>URL: </span>
                        <a href={selectedSubject["@id"]}>{selectedSubject["@id"]}</a>
                    </div>
                    <Code>{turtle}</Code>
                </>
            )}
        </div>
    )

}

function getUrlEnd(url: string): string {
    const parts = url.split("/");
    return parts[parts.length - 1];
}