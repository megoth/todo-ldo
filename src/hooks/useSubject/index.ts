import {SWRResponse} from "swr";
import {useContext, useEffect, useState} from "react";
import DeveloperModeContext from "@/contexts/developerMode";
import {parseRdf} from "ldo";
import {LdoBase} from "ldo/lib/util";
import {ShapeType} from "ldo/lib/ShapeType";
import useResource from "@/hooks/useResource";

export default function useSubject<T extends LdoBase>(subjectUrl: string | undefined | null, resourceUrl: string | undefined | null, type: ShapeType<T>) {
    const {addSubject} = useContext(DeveloperModeContext);
    const {data: text, isLoading, isValidating, mutate, error} = useResource(resourceUrl);
    const [response, setResponse] = useState<SWRResponse<T | null>>({
        data: null,
        isLoading,
        isValidating,
        mutate,
        error
    });

    useEffect(() => {
        if (!subjectUrl || !resourceUrl || !text) {
            return;
        }
        if (error) {
            throw error;
        }
        (async () => {
            const dataset = await parseRdf(text, {
                format: "Turtle",
                baseIRI: resourceUrl
            });
            const subject = dataset.usingType(type).fromSubject(subjectUrl);
            setResponse({
                data: subject,
                isLoading,
                isValidating,
                mutate,
                error
            })
        })();
    }, [subjectUrl, resourceUrl, text, isLoading, isValidating, mutate, error, type]);

    useEffect(() => {
        if (!resourceUrl || !response.data) {
            return;
        }
        addSubject(resourceUrl, response.data);
    }, [resourceUrl, response.data])

    return response;
};