import {useContext, useEffect, useState} from "react";
import DeveloperModeContext, {SubjectNode} from "@/contexts/developerMode";
import {useSession} from "@inrupt/solid-ui-react";
import styles from "./styles.module.css";
import clsx from "clsx";
import Code from "@/components/code";
import DeveloperModeButton from "@/components/developerModeButton";
import Button from "@/components/button";
import DarkModeSelector from "@/components/darkModeSelector";

export default function ToolBox() {
    const {developerMode, subjects} = useContext(DeveloperModeContext);
    const {session} = useSession();
    const [selectedSubject, setSelectedSubject] = useState<SubjectNode | null>(null);
    const [turtle, setTurtle] = useState<string>();

    useEffect(() => {
        if (selectedSubject || subjects.length === 0) {
            return;
        }
        setSelectedSubject(subjects[0]);
    }, [subjects, selectedSubject])

    useEffect(() => {
        if (!selectedSubject) {
            return;
        }
        (async () => {
            setTurtle(await selectedSubject.ldo.$toTurtle())
        })();
    }, [selectedSubject]);

    return (
        <div className={styles.toolbar}>
            <ul className={styles.bars}>
                {developerMode && session.info.isLoggedIn && subjects.map((subject) => (
                    <li key={subject.resourceUrl}>
                        <Button type={"button"} className={clsx({
                            [styles.selectedBar]: selectedSubject === subject
                        })} onClick={() => setSelectedSubject(subject)}>{getUrlEnd(subject.resourceUrl)}</Button>
                    </li>
                ))}
                <li className={styles.developerModeSplit}/>
                <li className={styles.developerModeToggleBar}>
                    <DarkModeSelector/>
                </li>
                {session.info.isLoggedIn && (
                    <li className={styles.developerModeToggleBar}>
                        <DeveloperModeButton/>
                    </li>
                )}
            </ul>
            {developerMode && session.info.isLoggedIn && selectedSubject && (
                <>
                    <div>
                        <span>Resource URL: </span>
                        <a href={selectedSubject.resourceUrl}>{selectedSubject.resourceUrl}</a>
                    </div>
                    <div>
                        <span>Subject URL: </span>
                        <a href={selectedSubject.ldo["@id"]}>{selectedSubject.ldo["@id"]}</a>
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