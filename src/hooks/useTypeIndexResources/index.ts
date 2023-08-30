import useSubject from "@/hooks/useSubject";
import {getResourceUrl} from "@/libs/ldo";
import {TypeIndex, WebIdProfile} from "@/ldo/solid.typings";
import {TypeIndexShapeType, WebIdProfileShapeType} from "@/ldo/solid.shapeTypes";

export default function useTypeIndexResources(profile: WebIdProfile | null | undefined) {
    const publicTypeIndex = useSubject<TypeIndex>(profile?.publicTypeIndex?.["@id"], getResourceUrl(profile?.publicTypeIndex?.["@id"]), TypeIndexShapeType);
    const preferences = useSubject<WebIdProfile>(profile?.["@id"], getResourceUrl(profile?.preferencesFile?.["@id"]), WebIdProfileShapeType);
    const privateTypeIndex = useSubject<TypeIndex>(preferences.data?.privateTypeIndex?.["@id"], getResourceUrl(preferences?.data?.privateTypeIndex?.["@id"]), TypeIndexShapeType);

    return {
        publicTypeIndex,
        preferences,
        privateTypeIndex
    };
}