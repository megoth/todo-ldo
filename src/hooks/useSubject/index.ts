import {useEffect, useState} from "react";
import {WebIdProfileFactory} from "@/ldo/webIdProfile.ldoFactory";
import {LdoFactory, LinkedDataObject} from "ldo";
import {WebIdProfile} from "@/ldo/webIdProfile.typings";
import {useSession} from "@inrupt/solid-ui-react";

export default function useSubject<T>(subjectIdUrl: string | undefined | null, factory: any): [
        LinkedDataObject<T> | null,
        unknown | null
] {
    const { fetch } = useSession();
    const [subject, setSubject] = useState<LinkedDataObject<T> | null>(null);
    const [error, setError] = useState<unknown | null>(null);

    useEffect(() => {
        if (!subjectIdUrl) {
            setSubject(null);
            setError(null);
            return;
        }

        const subjectResourceUrl = subjectIdUrl.split("#")[0];

        (async () => {
            try {
                const response = await fetch(subjectResourceUrl, {
                    headers: {
                        'Content-Type': 'text/turtle'
                    },
                });
                const rawDocument = await response.text();
                const loadedSubject = await factory.parse(subjectIdUrl, rawDocument, {
                    format: "Turtle",
                    baseIRI: subjectResourceUrl
                });
                setSubject(loadedSubject);
            } catch (err) {
                setError(err);
            }
        })();


    }, [subjectIdUrl]);

    return [subject, error];
}