import useSubject from "@/hooks/useSubject";
import {getResourceUrl} from "@/libs/ldo";
import {TypeIndex} from "@/ldo/solid.typings";
import {TypeIndexShapeType} from "@/ldo/solid.shapeTypes";
import { SolidProfile, SolidProfileShapeType } from "ldo-solid-profile";

export default function useTypeIndexResources(profile: SolidProfile | null | undefined) {
    const publicTypeIndex = useSubject<TypeIndex>(profile?.publicTypeIndex?.["@id"], getResourceUrl(profile?.publicTypeIndex?.["@id"]), TypeIndexShapeType);
    const preferences = useSubject<SolidProfile>(profile?.["@id"], getResourceUrl(profile?.preferencesFile?.["@id"]), SolidProfileShapeType);
    const privateTypeIndex = useSubject<TypeIndex>(preferences.data?.privateTypeIndex?.["@id"], getResourceUrl(preferences?.data?.privateTypeIndex?.["@id"]), TypeIndexShapeType);

    return {
        publicTypeIndex,
        preferences,
        privateTypeIndex
    };
}