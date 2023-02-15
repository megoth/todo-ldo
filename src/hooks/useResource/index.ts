import {useSession} from "@inrupt/solid-ui-react";
import useSWR, {SWRResponse} from "swr";
import {Headers} from "cross-fetch";
import {HttpError} from "@/libs/error";

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
        if (response.status >= 400) {
            throw new HttpError(response.status, response.statusText);
        }
        return response.text();
    })
};