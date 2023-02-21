import {LinkedDataObject} from "ldo";
import {WebIdProfileShape} from "@/ldo/webIdProfile.typings";
import useSubject from "@/hooks/useSubject";
import {getResourceUrl} from "@/libs/ldo";
import {WebIdProfileShapeFactory} from "@/ldo/webIdProfile.ldoFactory";
import {TypeIndexShape} from "@/ldo/typeIndex.typings";
import {TypeIndexShapeFactory} from "@/ldo/typeIndex.ldoFactory";

export default function useTypeIndexResources(profile: LinkedDataObject<WebIdProfileShape> | null | undefined) {
    const publicTypeIndex = useSubject<TypeIndexShape>(profile?.publicTypeIndex?.["@id"], getResourceUrl(profile?.publicTypeIndex?.["@id"]), TypeIndexShapeFactory);
    const preferences = useSubject<WebIdProfileShape>(profile?.["@id"], getResourceUrl(profile?.preferencesFile?.["@id"]), WebIdProfileShapeFactory);
    const privateTypeIndex = useSubject<TypeIndexShape>(preferences.data?.privateTypeIndex?.["@id"], getResourceUrl(preferences?.data?.privateTypeIndex?.["@id"]), TypeIndexShapeFactory);

    return {
        publicTypeIndex,
        preferences,
        privateTypeIndex
    };
}