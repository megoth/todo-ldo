import React from "react";
import Prism from "prismjs";

interface CodeProps {
    children: string | undefined;
}


export default function Code({children}: CodeProps) {
    const code = Prism.highlight(children || "", Prism.languages.turtle, "turtle");
    return (
        <pre className={"language-turtle line-numbers"}>
            <code className={"language-turtle"} dangerouslySetInnerHTML={{__html: code}}/>
        </pre>
    )
}