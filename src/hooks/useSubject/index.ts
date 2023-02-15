import useSWR, {SWRResponse} from "swr";
import {LinkedDataObject} from "ldo";
import useResource from "@/hooks/useResource";
import {useContext} from "react";
import {useSession} from "@inrupt/solid-ui-react";
import DeveloperModeContext from "@/contexts/developerMode";

// TODO: Replace any in factory with proper type
export default function useSubject<T>(subjectIdUrl: string | undefined | null, factory: any): SWRResponse<LinkedDataObject<T>> {
    const {addSubject} = useContext(DeveloperModeContext);
    const subjectResourceUrl = subjectIdUrl ? subjectIdUrl.split("#")[0] : null;
    const { data, error, mutate } = useResource(subjectResourceUrl);
    const swrResponse = useSWR([subjectIdUrl, data, error], async () => {
        if (!subjectResourceUrl || !subjectIdUrl) {
            return;
        }
        if (error) {
            throw error;
        }
        if (!data) {
            return factory.new(subjectIdUrl);
        }
        const node = await factory.parse(subjectIdUrl, data, {
            format: "Turtle",
            baseIRI: subjectResourceUrl
        });
        addSubject(subjectIdUrl!, node);
        return node;
    })
    return {
        ...swrResponse,
        mutate: async (ldoObject: any, ...args: any[]) => {
            await mutate((ldoObject as LinkedDataObject<T>).$toTurtle());
            return swrResponse.mutate(ldoObject, ...args);
        }
    }
};