import React, {MouseEvent} from "react";
import {getProviders, ProviderModel} from "@/libs/providers";
import {useSession} from "@inrupt/solid-ui-react";
import {getRedirectURL} from "@/libs/window";
import {clientName} from "@/constants";
import Button from "@/components/button";

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
            <Button key={provider.loginIri} onClick={(event) => onIDPClick(event as MouseEvent<HTMLButtonElement>, provider)}>{provider.label}</Button>
        ))}
    </div>
}