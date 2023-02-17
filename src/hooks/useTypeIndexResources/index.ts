import {LinkedDataObject} from "ldo";
import {WebIdProfileShape} from "@/ldo/webIdProfile.typings";
import useSubject from "@/hooks/useSubject";
import {getResourceUrl} from "@/libs/ldo";
import {TypeIndexFactory} from "@/ldo/typeIndex.ldoFactory";
import {WebIdProfileShapeFactory} from "@/ldo/webIdProfile.ldoFactory";
import {TypeIndex} from "@/ldo/typeIndex.typings";

export default function useTypeIndexResources(profile: LinkedDataObject<WebIdProfileShape> | null | undefined) {
    const publicTypeIndex = useSubject<TypeIndex>(profile?.publicTypeIndex?.["@id"], getResourceUrl(profile?.publicTypeIndex?.["@id"]), TypeIndexFactory);
    const preferences = useSubject<WebIdProfileShape>(profile?.["@id"], getResourceUrl(profile?.preferencesFile?.["@id"]), WebIdProfileShapeFactory);
    const privateTypeIndex = useSubject<TypeIndex>(preferences.data?.privateTypeIndex?.["@id"], getResourceUrl(preferences?.data?.privateTypeIndex?.["@id"]), TypeIndexFactory);

    return {
        publicTypeIndex,
        preferences,
        privateTypeIndex
    };
}