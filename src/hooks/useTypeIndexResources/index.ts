import useSubject from "@/hooks/useSubject";
import {getResourceUrl} from "@/libs/ldo";
import { SolidProfile, SolidProfileShapeType } from "ldo-solid-profile";
import { TypeIndex, TypeIndexShapeType } from "ldo-type-index";

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