import {useEffect, useState} from "react";
import {WebIdProfileFactory} from "@/ldo/webIdProfile.ldoFactory";
import {LinkedDataObject} from "ldo";
import {WebIdProfile} from "@/ldo/webIdProfile.typings";

export default function useProfile(webIdUrl?: string) {
    const [profile, setProfile] = useState<LinkedDataObject<WebIdProfile> | null>(null);

    useEffect(() => {
        if (!webIdUrl) {
            setProfile(null);
            return;
        }

        const webIdResourceUrl = webIdUrl.split("#")[0];

        (async () => {
            const response = await fetch(webIdResourceUrl);
            const rawDocument = await response.text();
            const loadedProfile = await WebIdProfileFactory.parse(webIdUrl, rawDocument, {
                format: "Turtle",
                baseIRI: webIdResourceUrl
            });
            setProfile(loadedProfile);
        })();


    }, [webIdUrl]);

    return profile;
}