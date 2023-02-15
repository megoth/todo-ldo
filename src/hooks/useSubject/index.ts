import useSWR, {SWRResponse} from "swr";
import {LinkedDataObject} from "ldo";
import useResource from "@/hooks/useResource";
import {useContext} from "react";
import {useSession} from "@inrupt/solid-ui-react";
import DeveloperModeContext from "@/contexts/developerMode";

// TODO: Replace any in factory with proper type
export default function useSubject<T>(subjectUrl: string | undefined | null, resourceUrl: string | undefined | null, factory: any): SWRResponse<LinkedDataObject<T>> {
    const {addSubject} = useContext(DeveloperModeContext);
    const { data, error, mutate } = useResource(resourceUrl);
    const swrResponse = useSWR([subjectUrl, resourceUrl, data], async () => {
        if (!subjectUrl || !resourceUrl || !data) {
            return;
        }
        if (error) {
            throw error;
        }
        const subject = await factory.parse(subjectUrl, data, {
            format: "Turtle",
            baseIRI: resourceUrl
        });
        addSubject(resourceUrl, subject);
        return subject;
    })
    return {
        ...swrResponse,
        mutate: async (ldoObject: any, ...args: any[]) => {
            await mutate((ldoObject as LinkedDataObject<T>).$toTurtle());
            return swrResponse.mutate(ldoObject, ...args);
        }
    }
};