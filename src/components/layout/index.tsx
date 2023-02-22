import Head from "next/head";
import {ReactNode, useContext} from "react";
import {useSession} from "@inrupt/solid-ui-react";
import Loading from "@/components/loading";
import LoginForm from "@/components/loginForm";
import LayoutHeader from "@/components/layout/header";
import Container from "@/components/container";
import ToolBox from "@/components/toolBox";
import styles from "./styles.module.css";
import Navigation from "@/components/navigation";
import FooterNavigation from "@/components/footerNavigation";
import Footer from "@/components/footer";
import DeveloperModeContext from "@/contexts/developerMode";

interface LayoutProps {
    children?: ReactNode
}

export default function Layout({children}: LayoutProps) {
    const {sessionRequestInProgress, session: {info: {isLoggedIn}}} = useSession();
    const {developerMode} = useContext(DeveloperModeContext);

    if (sessionRequestInProgress) {
        return <Loading/>
    }

    return (
        <>
            <Head>
                <title>Create Next App</title>
                <meta name="description" content="Generated by create next app"/>
                <meta name="viewport" content="width=device-width, initial-scale=1"/>
                <link rel="icon" href="/favicon.ico"/>
            </Head>
            <div className={styles.layoutContainer}>
                <LayoutHeader/>
                <main className={styles.layoutMain}>
                    <Container>
                        {isLoggedIn ? children : <LoginForm/>}
                    </Container>
                </main>
                {isLoggedIn && (
                    <Container>
                        <Navigation/>
                    </Container>
                )}
                <Footer>
                    {developerMode && (
                        <>
                            <ToolBox/>
                            <FooterNavigation/>
                        </>
                    )}
                    {!developerMode && (
                        <Container>
                            <FooterNavigation/>
                        </Container>
                    )}
                </Footer>
            </div>
        </>
    )
}