import {useSession} from "@inrupt/solid-ui-react";
import useSWR, {SWRResponse} from "swr";
import {Headers} from "cross-fetch";

// TODO: Replace any in factory with proper type
export default function useResource(url: string | undefined | null): SWRResponse {
    const {fetch} = useSession();
    return useSWR(url, async (url: RequestInfo | URL, init: RequestInit | undefined) => {
        if (!url) {
            return;
        }
        const response = await fetch(url, {
            ...(init || {}),
            headers: new Headers({
                ...(init?.headers || {}),
                'Content-Type': 'text/turtle'
            }),
        });
        return response.text();
    })
};