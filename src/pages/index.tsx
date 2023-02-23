import Layout from "@/components/layout";
import {useSession} from "@inrupt/solid-ui-react";
import useSubject from "@/hooks/useSubject";
import Loading from "@/components/loading";
import ErrorDetails from "@/components/errorDetails";
import {getResourceUrl} from "@/libs/ldo";
import useTypeStorage from "@/hooks/useTypeStorage";
import SetupPrompt from "@/components/setupPrompt";
import {todoNamespace} from "@/vocabularies";
import {WebIdProfileShape} from "@/ldo/solid.typings";
import {WebIdProfileShapeFactory} from "@/ldo/solid.ldoFactory";
import Dashboard from "@/components/dashboard";

export default function HomePage() {
    const {session: {info: {webId, isLoggedIn}}} = useSession();
    const {
        data: profile,
        error: profileError,
        isLoading: profileIsLoading
    } = useSubject<WebIdProfileShape>(webId, getResourceUrl(webId), WebIdProfileShapeFactory);
    const storages = useTypeStorage(profile, todoNamespace.TodoList);

    if (profileError) {
        return <ErrorDetails error={profileError}/>
    }

    if (!isLoggedIn) {
        return <Layout/>
    }

    if (!profile) {
        return <Loading/>
    }

    return (
        <Layout loading={profileIsLoading} noContainer={(storages?.length || 0) > 0}>
            {!storages?.length && <SetupPrompt profile={profile}/>}
            {storages && <Dashboard profile={profile} />}
        </Layout>
    );
}
