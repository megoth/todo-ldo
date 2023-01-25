export type ProviderModel = {
    label: string;
    logoSrc: string;
    loginIri: string;
    signupIri: string;
};

export function getProviders(): Array<ProviderModel> {
    return [
        // TODO: Inrupt PodSpaces didn't work with the auth library when I tried it, so removing it for now
        // {
        //     label: "Inrupt Pod Spaces",
        //     logoSrc: "/logos/inrupt-ps-logo.png",
        //     loginIri: "https://broker.pod.inrupt.com/",
        //     signupIri: "https://signup.pod.inrupt.com/",
        // },
        {
            label: "solidcommunity.net",
            logoSrc: "/logos/solid-emblem.svg",
            loginIri: "https://solidcommunity.net/",
            signupIri: "https://solidcommunity.net/register",
        },
        {
            label: "inrupt.net",
            logoSrc: "/logos/solid-emblem.svg",
            loginIri: "https://inrupt.net/",
            signupIri: "https://inrupt.net/register",
        },
    ];
}
