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
import ErrorDetails from "@/components/errorDetails";
import LayoutContent from "@/components/layout/content";

interface LayoutProps {
    children?: ReactNode;
    loading?: boolean;
    error?: Error;
    noContainer?: boolean;
}

export default function Layout({children, loading, error, noContainer}: LayoutProps) {
    const {sessionRequestInProgress, session: {info: {isLoggedIn}}} = useSession();
    const {developerMode} = useContext(DeveloperModeContext);

    if (sessionRequestInProgress || loading) {
        return <Loading/>
    }

    if (error) {
        return <ErrorDetails error={error}/>
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
                    {noContainer && <LayoutContent>{children}</LayoutContent>}
                    {!noContainer && (
                        <Container>
                            <LayoutContent>{children}</LayoutContent>
                        </Container>
                    )}
                </main>
                {isLoggedIn && (
                    <>
                        <Container>
                            <Navigation/>
                        </Container>
                        <Footer>
                            {developerMode && (
                                <>
                                    <ToolBox>
                                        <FooterNavigation/>
                                    </ToolBox>
                                </>
                            )}
                            {!developerMode && (
                                <Container>
                                    <FooterNavigation/>
                                </Container>
                            )}
                        </Footer>
                    </>
                )}
            </div>
        </>
    )
}