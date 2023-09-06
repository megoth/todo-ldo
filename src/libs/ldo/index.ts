import {Headers} from "cross-fetch";
import {v4 as uuidv4} from 'uuid';
import {namedNode} from "@rdfjs/data-model";
import {LdoBase} from "ldo/lib/util";
import {getDataset, startTransaction, toSparqlUpdate} from "ldo";

export function createSubjectUrl(resourceUrl: string | null | undefined, id?: string): string {
    return `${resourceUrl}#${id || uuidv4()}`;
}

export function getResourceUrl(url: string | undefined | null): string | null {
    return url ? url.split("#")[0] : null;
}

export function getValue<T>(term: string): { "@id": T } {
    return {"@id": term} as { "@id": T };
}

export async function update<T extends LdoBase>(subject: T, resourceUrl: string | null | undefined, fetch: (input: (RequestInfo | URL), init?: RequestInit) => Promise<Response>, updates?: (subject: T) => void): Promise<Response> {
    if (!resourceUrl) {
        throw new Error("No resource URL given");
    }
    if (updates) {
        startTransaction(subject);
        updates(subject);
    }
    return fetch(resourceUrl, {
        method: "PATCH",
        body: await toSparqlUpdate(subject),
        headers: new Headers({
            "content-type": "application/sparql-update",
        })
    });
}

export async function remove<T extends LdoBase>(subject: T, resourceUrl: string | null | undefined, fetch: (input: (RequestInfo | URL), init?: RequestInit) => Promise<Response>): Promise<Response> {
    return update(subject, resourceUrl, fetch, () => {
        getDataset(subject).deleteMatches(namedNode(subject["@id"]));
    });
}
