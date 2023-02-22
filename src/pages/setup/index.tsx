import Layout from "@/components/layout";
import {useSession} from "@inrupt/solid-ui-react";
import useSubject from "@/hooks/useSubject";
import ErrorDetails from "@/components/errorDetails";
import {getResourceUrl} from "@/libs/ldo";
import Setup from "@/components/setup";
import {WebIdProfileShape} from "@/ldo/solid.typings";
import {WebIdProfileShapeFactory} from "@/ldo/solid.ldoFactory";
import Loading from "@/components/loading";

export default function SetupPage() {
    const {session: {info: {webId, isLoggedIn}}} = useSession();
    const {
        data: profile,
        error: profileError,
        isLoading: profileIsLoading
    } = useSubject<WebIdProfileShape>(webId, getResourceUrl(webId), WebIdProfileShapeFactory);

    if (!isLoggedIn) {
        return <Layout/>
    }

    if (profileError) {
        return <ErrorDetails error={profileError}/>
    }

    if (!profile) {
        return <Loading />
    }

    return (
        <Layout loading={profileIsLoading}>
            <Setup profile={profile}/>
        </Layout>
    )

}
