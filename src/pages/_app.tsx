import '@/styles/globals.css'
import type {AppProps} from 'next/app'
import {SessionProvider} from "@inrupt/solid-ui-react";
import {sessionId} from "@/constants";

export default function App({Component, pageProps}: AppProps) {
    return (
        <SessionProvider sessionId={sessionId}>
            <Component {...pageProps} />
        </SessionProvider>
    )
}
