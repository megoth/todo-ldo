import {LinkedDataObject} from "ldo";
import {WebIdProfileShape} from "@/ldo/webIdProfile.typings";
import {useEffect, useState} from "react";
import {solid} from "@/vocabularies";
import useTypeIndexResources from "@/hooks/useTypeIndexResources";

export default function useTypeIndices(profile: LinkedDataObject<WebIdProfileShape> | undefined) {
    const [indices, setIndices] = useState<string[] | null>(null);

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
        const publicTypes = publicTypeIndex?.$dataset().filter((quad) => quad.object.equals(solid.TypeRegistration)).toArray().map((quad) => quad.subject.value) || [];
        const privateTypes = privateTypeIndex?.$dataset().filter((quad) => quad.object.equals(solid.TypeRegistration)).toArray().map((quad) => quad.subject.value) || [];
        const resourcesAreLoading = publicTypeIsLoading || preferencesIsLoading || privateTypeIsLoading;
        const errorsOccurred = publicTypeIndexError || preferencesError || privateTypeIndexError;
        if (resourcesAreLoading) {
            return;
        }
        if (!errorsOccurred && publicTypes && privateTypes) {
            setIndices([...publicTypes, ...privateTypes]);
        }
        if (errorsOccurred && (privateTypeIndexError && !publicTypeIndexError || publicTypeIndexError && !privateTypeIndexError)) {
            setIndices([...publicTypes, ...privateTypes]);
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

    return indices;
}