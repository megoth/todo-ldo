import {useEffect, useState} from "react";
import {LinkedDataObject} from "ldo";
import {WebIdProfile} from "@/ldo/webIdProfile.typings";
import {Container} from "@/ldo/container.typings";
import {ContainerFactory} from "@/ldo/container.ldoFactory";

export default function useStorage(storageUri?: string) {
    const [storage, setStorage] = useState<LinkedDataObject<Container> | null>(null);

    useEffect(() => {
        if (!storageUri) {
            setStorage(null);
            return;
        }

        (async () => {
            const response = await fetch(storageUri);
            const rawDocument = await response.text();
            const loadedStorage = await ContainerFactory.parse(storageUri, rawDocument, {
                format: "Turtle",
                baseIRI: storageUri
            });
            setStorage(loadedStorage);
        })();


    }, [storageUri]);

    return storage;
}