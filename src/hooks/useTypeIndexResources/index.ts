import {LinkedDataObject} from "ldo";
import {WebIdProfileShape} from "@/ldo/webIdProfile.typings";
import {useEffect, useState} from "react";
import useSubject from "@/hooks/useSubject";
import {getResourceUrl} from "@/libs/ldo";
import {TypeIndexFactory} from "@/ldo/typeIndex.ldoFactory";
import {WebIdProfileShapeFactory} from "@/ldo/webIdProfile.ldoFactory";
import {TypeIndex} from "@/ldo/typeIndex.typings";
import {solid} from "@/vocabularies";

export default function useTypeIndexResources(profile: LinkedDataObject<WebIdProfileShape> | undefined) {
    const publicTypeIndex = useSubject<TypeIndex>(profile?.publicTypeIndex?.["@id"], getResourceUrl(profile?.publicTypeIndex?.["@id"]), TypeIndexFactory);
    const preferences = useSubject<WebIdProfileShape>(profile?.preferencesFile?.["@id"], getResourceUrl(profile?.preferencesFile?.["@id"]), WebIdProfileShapeFactory);
    const [privateTypeUrl, setPrivateTypeUrl] = useState<string | undefined>(preferences?.data?.privateTypeIndex?.["@id"]);
    const privateTypeIndex = useSubject<TypeIndex>(privateTypeUrl, getResourceUrl(preferences?.data?.privateTypeIndex?.["@id"]), TypeIndexFactory);

    useEffect(() => {
        console.log("TEST22", preferences?.data?.privateTypeIndex?.["@id"])
        setPrivateTypeUrl(preferences?.data?.privateTypeIndex?.["@id"]);
    }, [preferences])

    return {
        publicTypeIndex,
        preferences,
        privateTypeIndex
    };
}