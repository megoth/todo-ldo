import Layout from "@/components/layout";
import {useSession} from "@inrupt/solid-ui-react";
import useSubject from "@/hooks/useSubject";
import {WebIdProfileShape} from "@/ldo/webIdProfile.typings";
import {WebIdProfileShapeFactory} from "@/ldo/webIdProfile.ldoFactory";
import Loading from "@/components/loading";
import ErrorDetails from "@/components/errorDetails";
import TodoList from "@/components/todoList";
import {getResourceUrl} from "@/libs/ldo";
import useTypeStorage from "@/hooks/useTypeStorage";
import SetupPrompt from "@/components/setupPrompt";
import {todo} from "@/vocabularies";
import {TodoDocumentShapeFactory} from "@/ldo/todoDocument.ldoFactory";
import {TodoDocumentShape} from "@/ldo/todoDocument.typings";

export default function Home() {
    const {session, sessionRequestInProgress} = useSession();
    const {webId, isLoggedIn} = session.info;
    const {
        data: profile,
        error: profileError,
        isLoading: profileIsLoading
    } = useSubject<WebIdProfileShape>(webId, getResourceUrl(webId), WebIdProfileShapeFactory);
    const storages = useTypeStorage(profile, todo.TodoList);
    const {
        data: storage,
        error: storageError,
        isLoading: storageIsLoading,
    } = useSubject<TodoDocumentShape>(storages?.[0], getResourceUrl(storages?.[0]), TodoDocumentShapeFactory);

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
            <TodoList listUrl={storage?.list?.[0]?.["@id"]} resourceUrl={getResourceUrl(storage?.list?.[0]?.["@id"])!}/>
        </Layout>
    )
}
