import {LinkedDataObject} from "ldo";
import {Headers} from "cross-fetch";

export async function update(subject: LinkedDataObject<any>, resourceUrl: string | undefined, fetch: (input: (RequestInfo | URL), init?: RequestInit) => Promise<Response>): Promise<Response> {
    if (!resourceUrl) {
        throw new Error("No resource URL given");
    }
    const body = await subject.$toSparqlUpdate();
    return fetch(resourceUrl, {
        method: "PATCH",
        body,
        headers: new Headers({
            "content-type": "application/sparql-update",
        })
    });
}

export function getResourceUrl(url: string | undefined | null): string | null {
    return url ? url.split("#")[0] : null;
}

export function getValue<T>(term: string): {"@id": T} {
    return {"@id": term} as {"@id": T};
}
