import Layout from "@/components/layout";
import {useSession} from "@inrupt/solid-ui-react";
import useSubject from "@/hooks/useSubject";
import Loading from "@/components/loading";
import ErrorDetails from "@/components/errorDetails";
import TodoList from "@/components/todoList";
import {getResourceUrl} from "@/libs/ldo";
import useTypeStorage from "@/hooks/useTypeStorage";
import SetupPrompt from "@/components/setupPrompt";
import {todoNamespace} from "@/vocabularies";
import {DocumentShape} from "@/ldo/todo.typings";
import {DocumentShapeFactory} from "@/ldo/todo.ldoFactory";
import {WebIdProfileShape} from "@/ldo/solid.typings";
import {WebIdProfileShapeFactory} from "@/ldo/solid.ldoFactory";

export default function Home() {
    const {session, sessionRequestInProgress} = useSession();
    const {webId, isLoggedIn} = session.info;
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

    if (sessionRequestInProgress) {
        return <Loading/>
    }

    if (!isLoggedIn) {
        return <Layout/>
    }

    if (profileError || storageError) {
        return <ErrorDetails error={profileError || storageError}/>
    }

    if (!profile || profileIsLoading || sessionRequestInProgress) {
        return <Loading/>
    }

    if (!storages?.length) {
        return <SetupPrompt profile={profile}/>
    }

    if (storages.length > 1) {
        return <div>TODO: MULTIPLE STORAGES, PLEASE CHOOSE ONE!</div>
    }

    if (!storage || storageIsLoading) {
        return <Loading/>
    }

    if (storage?.list && storage?.list?.length > 1) {
        return <div>TODO: MULTIPLE LISTS, PLEASE CHOOSE ONE!</div>
    }

    if (storage?.list && storage?.list?.length === 0 || !storage?.list?.[0]) {
        return <div>TODO: NO LIST YET</div>
    }

    return (
        <Layout>
            <TodoList listUrl={storage?.list?.[0]?.["@id"]!} resourceUrl={getResourceUrl(storage?.list?.[0]?.["@id"])!}/>
        </Layout>
    )
}
