import React, {ReactNode, useContext, useEffect, useState} from "react";
import DeveloperModeContext, { NodeBase, SubjectNode } from "@/contexts/developerMode";
import {useSession} from "@inrupt/solid-ui-react";
import styles from "./styles.module.css";
import clsx from "clsx";
import Code from "@/components/code";
import Button from "@/components/button";
import {toTurtle} from "ldo";

interface ToolBoxProps {
    children?: ReactNode;
}

export default function ToolBox({children}: ToolBoxProps) {
    const {developerMode, subjects} = useContext(DeveloperModeContext);
    const {session} = useSession();
    const [selectedSubject, setSelectedSubject] = useState<SubjectNode<NodeBase> | null>(null);
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
            setTurtle(await toTurtle(selectedSubject.ldo))
        })();
    }, [selectedSubject]);

    return (
        <div className={styles.toolbar}>
            <ul className={styles.bars}>
                {developerMode && session.info.isLoggedIn && subjects.map((subject) => (
                    <li key={`${subject.resourceUrl}-${subject.ldo["@id"]}`}>
                        <Button type={"button"} className={clsx({
                            "is-dark": selectedSubject !== subject,
                            "is-selected": selectedSubject === subject
                        })} onClick={() => setSelectedSubject(subject)}>{getUrlEnd(subject.resourceUrl)}</Button>
                    </li>
                ))}
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
            {children}
        </div>
    )

}

function getUrlEnd(url: string): string {
    const parts = url.split("/");
    return parts[parts.length - 1];
}