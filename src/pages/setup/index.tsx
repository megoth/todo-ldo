import Layout from "@/components/layout";
import {useSession} from "@inrupt/solid-ui-react";
import useSubject from "@/hooks/useSubject";
import Loading from "@/components/loading";
import ErrorDetails from "@/components/errorDetails";
import {getResourceUrl} from "@/libs/ldo";
import SetupPage from "@/components/setupPage";
import {WebIdProfileShape} from "@/ldo/solid.typings";
import {WebIdProfileShapeFactory} from "@/ldo/solid.ldoFactory";

export default function Setup() {
    const {session, sessionRequestInProgress} = useSession();
    const {webId, isLoggedIn} = session.info;
    const {
        data: profile,
        error: profileError,
        isLoading: profileIsLoading
    } = useSubject<WebIdProfileShape>(webId, getResourceUrl(webId), WebIdProfileShapeFactory);

    if (!isLoggedIn || sessionRequestInProgress) {
        return <Layout/>
    }

    if (profileError) {
        return <ErrorDetails error={profileError}/>
    }

    if (!profile || profileIsLoading) {
        return <Loading/>
    }

    return <SetupPage profile={profile} />

}
