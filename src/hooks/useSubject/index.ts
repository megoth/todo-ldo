import {useSession} from "@inrupt/solid-ui-react";
import useSWR, {SWRResponse} from "swr";

// TODO: Replace any in factory with proper type
export default function useSubject<T>(subjectIdUrl: string | undefined | null, factory: any): SWRResponse<T> {
    const { fetch } = useSession();
    const subjectResourceUrl = subjectIdUrl ? subjectIdUrl.split("#")[0] : null;
    return useSWR(subjectIdUrl, async (url: RequestInfo | URL, init: RequestInit | undefined) => {
        const response = await fetch(url, {
            headers: {
                'Content-Type': 'text/turtle'
            },
            ...init
        });
        const rawDocument = await response.text();
        return factory.parse(subjectIdUrl, rawDocument, {
            format: "Turtle",
            baseIRI: subjectResourceUrl
        });
    })
};