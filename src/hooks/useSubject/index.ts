import useSWR, {SWRResponse} from "swr";
import {LinkedDataObject} from "ldo";
import useResource from "@/hooks/useResource";

// TODO: Replace any in factory with proper type
export default function useSubject<T>(subjectIdUrl: string | undefined | null, factory: any): SWRResponse<LinkedDataObject<T>> {
    const subjectResourceUrl = subjectIdUrl ? subjectIdUrl.split("#")[0] : null;
    const { data, error } = useResource(subjectResourceUrl);
    return useSWR([subjectIdUrl, data, error], async () => {
        if (!subjectResourceUrl || !data) {
            return;
        }
        if (error) {
            throw error;
        }
        return factory.parse(subjectIdUrl, data, {
            format: "Turtle",
            baseIRI: subjectResourceUrl
        });
    })
};