import {LinkedDataObject} from "ldo";
import useSubject from "@/hooks/useSubject";
import {getResourceUrl} from "@/libs/ldo";
import {TypeIndexShape, WebIdProfileShape} from "@/ldo/solid.typings";
import {TypeIndexShapeFactory, WebIdProfileShapeFactory} from "@/ldo/solid.ldoFactory";

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