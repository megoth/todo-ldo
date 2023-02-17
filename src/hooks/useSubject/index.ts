import {SWRResponse} from "swr";
import {LinkedDataObject} from "ldo";
import useResource from "@/hooks/useResource";
import {useContext, useEffect, useState} from "react";
import DeveloperModeContext from "@/contexts/developerMode";

// TODO: Replace any in factory with proper type
export default function useSubject<T>(subjectUrl: string | undefined | null, resourceUrl: string | undefined | null, factory: any) {
    const {addSubject} = useContext(DeveloperModeContext);
    const {data, isLoading, isValidating, mutate, error} = useResource(resourceUrl);
    const [response, setResponse] = useState<SWRResponse<LinkedDataObject<T> | null>>({data: null, isLoading, isValidating, mutate, error});

    useEffect(() => {
        if (!subjectUrl || !resourceUrl || !data) {
            return;
        }
        if (error) {
            throw error;
        }
        (async () => {
            const subject = await factory.parse(subjectUrl, data, {
                format: "Turtle",
                baseIRI: resourceUrl
            });
            addSubject(resourceUrl, subject);
            setResponse({
                data: subject,
                isLoading,
                isValidating,
                mutate: async (ldoObject: any) => mutate((ldoObject as LinkedDataObject<T>).$toTurtle()),
                error
            })
        })();
    }, [subjectUrl, resourceUrl, data, isLoading, isValidating, mutate, error]);

    return response;
};