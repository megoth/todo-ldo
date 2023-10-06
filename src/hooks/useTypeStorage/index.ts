import {useEffect, useState} from "react";
import {solidNamespace} from "@/vocabularies";
import useTypeIndexResources from "@/hooks/useTypeIndexResources";
import {NamedNode} from "@rdfjs/types";
import {getDataset} from "ldo";
import { SolidProfile } from "ldo-solid-profile";

export default function useTypeStorage(profile: SolidProfile | null | undefined, type: NamedNode) {
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
            if (!publicTypeIndex || !privateTypeIndex) {
                return setStorages([]);
            }
            const quads = [...(getDataset(publicTypeIndex).toArray() || []), ...(getDataset(privateTypeIndex).toArray() || [])];
            const typeRegistrations = quads.filter((q) => q.predicate.equals(solidNamespace.forClass) && q.object.equals(type)).map(({subject}) => subject.value);
            const storages = quads.filter((q) => typeRegistrations.indexOf(q.subject.value) >= 0 && q.predicate.equals(solidNamespace.instance)).map(({object}) => object.value);
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
        },
        [
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