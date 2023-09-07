import React from "react";
import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {SessionProvider} from "@inrupt/solid-ui-react";
import {sessionId} from "@/constants";
import {DeveloperModeContextProvider} from "@/contexts/developerMode";
import {ModalProvider} from 'react-modal-hook';

export default function App({Component, pageProps}: AppProps) {
    return (
        <SessionProvider sessionId={sessionId}>
            <ModalProvider>
                <DeveloperModeContextProvider>
                    <Component {...pageProps} />
                </DeveloperModeContextProvider>
            </ModalProvider>
        </SessionProvider>
    )
}
