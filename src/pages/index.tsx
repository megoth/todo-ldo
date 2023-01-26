import Layout from "@/components/layout";
import {useSession} from "@inrupt/solid-ui-react";
import useProfile from "@/hooks/useProfile";

export default function Home() {
    const {session, sessionRequestInProgress} = useSession();
    const {webId, isLoggedIn} = session.info;
    const profile = useProfile(webId);
    const storage = useStorage(profile);
    if (!isLoggedIn || sessionRequestInProgress) {
        return <Layout/>
    }
    return (
        <Layout>
            <h1>Welcome, {profile?.name}</h1>
        </Layout>
    )
}
