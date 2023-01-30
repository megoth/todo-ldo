import React, {MouseEvent} from "react";
import {getProviders, ProviderModel} from "@/libs/providers";
import {useSession} from "@inrupt/solid-ui-react";
import {getRedirectURL} from "@/libs/window";
import {clientName} from "@/constants";

export default function LoginForm() {
    const {login} = useSession();
    const providers = getProviders();

    const onIDPClick = async (event: MouseEvent<HTMLButtonElement>, provider: ProviderModel) => {
        event.preventDefault();
        try {
            await login({
                oidcIssuer: provider.loginIri,
                redirectUrl: getRedirectURL(),
                clientName
            })
        } catch (error) {
            // TODO: Better errorDetails handling
            console.error(error);
        }
    }

    return <div>
        {providers.map((provider) => (
            <button key={provider.loginIri} onClick={(event) => onIDPClick(event, provider)}>{provider.label}</button>
        ))}
    </div>
}