import Layout from "@/components/layout";
import {useSession} from "@inrupt/solid-ui-react";
import useSubject from "@/hooks/useSubject";
import Loading from "@/components/loading";
import ErrorDetails from "@/components/errorDetails";
import {getResourceUrl} from "@/libs/ldo";
import useTypeStorage from "@/hooks/useTypeStorage";
import SetupPrompt from "@/components/setupPrompt";
import {todoNamespace} from "@/vocabularies";
import {DocumentShape} from "@/ldo/todo.typings";
import {DocumentShapeFactory} from "@/ldo/todo.ldoFactory";
import {WebIdProfileShape} from "@/ldo/solid.typings";
import {WebIdProfileShapeFactory} from "@/ldo/solid.ldoFactory";
import Redirect from "@/components/redirect";

export default function HomePage() {
    const {session: {info: {webId, isLoggedIn}}} = useSession();
    const {
        data: profile,
        error: profileError,
        isLoading: profileIsLoading
    } = useSubject<WebIdProfileShape>(webId, getResourceUrl(webId), WebIdProfileShapeFactory);
    const storages = useTypeStorage(profile, todoNamespace.TodoList);
    const {
        data: storage,
        error: storageError,
        isLoading: storageIsLoading,
    } = useSubject<DocumentShape>(storages?.[0], getResourceUrl(storages?.[0]), DocumentShapeFactory);

    if (profileError || storageError) {
        return <ErrorDetails error={profileError || storageError}/>
    }

    if (!isLoggedIn) {
        return <Layout />
    }

    if (!profile) {
        return <Loading/>
    }

    return (
        <Layout loading={profileIsLoading || storageIsLoading}>
            {!storages?.length && <SetupPrompt profile={profile}/>}
            {storages && storages.length > 1 && <div>TODO: MULTIPLE STORAGES, PLEASE CHOOSE ONE!</div>}
            {storages && storage?.list && storage?.list?.length > 1 &&
                <div>TODO: MULTIPLE LISTS, PLEASE CHOOSE ONE!</div>}
            {storage?.list && storage?.list?.length === 0 && <div>TODO: NO LIST YET</div>}
            {storage?.list && storage?.list?.length === 1 &&
                <Redirect url={`/list/${encodeURIComponent(storage?.list?.[0]?.["@id"]!)}`}/>}
        </Layout>
    );
}
