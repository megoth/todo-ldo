import {useSession} from "@inrupt/solid-ui-react";
import useSWR, {SWRResponse} from "swr";
import {LinkedDataObject} from "ldo";
import {Headers} from "cross-fetch";
import {useContext} from "react";
import DeveloperModeContext from "@/contexts/developerMode";

// TODO: Replace any in factory with proper type
export default function useSubject<T>(subjectIdUrl: string | undefined | null, factory: any): SWRResponse<LinkedDataObject<T>> {
    const {fetch} = useSession();
    const {addSubject} = useContext(DeveloperModeContext);
    const subjectResourceUrl = subjectIdUrl ? subjectIdUrl.split("#")[0] : null;
    return useSWR(subjectResourceUrl, async (url: RequestInfo | URL, init: RequestInit | undefined) => {
        if (!subjectResourceUrl) {
            return;
        }
        const response = await fetch(url, {
            ...(init || {}),
            headers: new Headers({
                ...(init?.headers || {}),
                'Content-Type': 'text/turtle'
            }),
        });
        const rawDocument = await response.text();
        const data = await factory.parse(subjectIdUrl, rawDocument, {
            format: "Turtle",
            baseIRI: subjectResourceUrl
        });
        addSubject(subjectIdUrl!, data);
        return data;
    })
};