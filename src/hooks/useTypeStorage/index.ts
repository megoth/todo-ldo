import {LinkedDataObject} from "ldo";
import {WebIdProfileShape} from "@/ldo/webIdProfile.typings";
import {useEffect, useState} from "react";
import {solid, todo} from "@/vocabularies";
import useTypeIndexResources from "@/hooks/useTypeIndexResources";
import {NamedNode} from "@rdfjs/types";

export default function useTypeStorage(profile: LinkedDataObject<WebIdProfileShape> | null | undefined, type: NamedNode) {
    const [storages, setStorages] = useState<string[] | null>(null);

    const {
        publicTypeIndex: {
            data: publicTypeIndex,
            error: publicTypeIndexError,
            isLoading: publicTypeIsLoading
        },
        preferences: {
            data: preferences,
            error: preferencesError,
            isLoading: preferencesIsLoading
        },
        privateTypeIndex: {
            data: privateTypeIndex,
            error: privateTypeIndexError,
            isLoading: privateTypeIsLoading
        }
    } = useTypeIndexResources(profile);

    useEffect(() => {
        const quads = [...(publicTypeIndex?.$dataset().toArray() || []), ...(privateTypeIndex?.$dataset().toArray() || [])];
        const typeRegistrations = quads.filter((q) => q.predicate.equals(solid.forClass) && q.object.equals(todo.TodoList)).map(({ subject }) => subject.value);
        const storages = quads.filter((q) => typeRegistrations.indexOf(q.subject.value) >= 0 && q.predicate.equals(solid.instance)).map(({ object }) => object.value);
        const resourcesAreLoading = publicTypeIsLoading || preferencesIsLoading || privateTypeIsLoading;
        const errorsOccurred = publicTypeIndexError || preferencesError || privateTypeIndexError;
        if (resourcesAreLoading) {
            return;
        }
        if (!errorsOccurred && storages) {
            setStorages(storages);
        }
        if (errorsOccurred && (privateTypeIndexError && !publicTypeIndexError || publicTypeIndexError && !privateTypeIndexError)) {
            setStorages(storages);
        }
    }, [
        publicTypeIndex,
        publicTypeIndexError,
        publicTypeIsLoading,
        preferences,
        preferencesError,
        preferencesIsLoading,
        privateTypeIndex,
        privateTypeIndexError,
        privateTypeIsLoading
    ]);

    return storages;
}