import {LinkedDataObject} from "ldo";
import {Headers} from "cross-fetch";
import {todo} from "@/vocabularies";

export function hasChanges(obj: LinkedDataObject<any> | null): boolean {
    return !!obj && Object.values(obj.$changes()).length > 0;
}

export async function update(subject: LinkedDataObject<any>, resourceUrl: string, fetch: (input: (RequestInfo | URL), init?: RequestInit) => Promise<Response>): Promise<Response> {
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

export function getValue(term: string) {
    return {"@id": term};
}

export function getValueAsString(term: string): string {
    return {"@id": term} as unknown as string;
}