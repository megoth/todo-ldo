import {LinkedDataObject} from "ldo";
import {Headers} from "cross-fetch";

export function hasChanges(obj: LinkedDataObject<any> | null): boolean {
    return !!obj && Object.values(obj.$changes()).length > 0;
}

export async function update(obj: LinkedDataObject<any>, fetch: (input: (RequestInfo | URL), init?: RequestInit) => Promise<Response>): Promise<Response> {
    const subjectId = obj["@id"];
    const resourceUrl = subjectId.split("#")[0];
    const body = await obj.$toSparqlUpdate();
    console.log("SPARQL UPDATE", obj["@id"], body);
    return fetch(resourceUrl, {
        method: "PATCH",
        body,
        headers: new Headers({
            "content-type": "application/sparql-update",
        })
    });
}

export function createNamespace(uri: string): (term: string) => string {
    return (term) => uri + term;
}