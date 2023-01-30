import Layout from "@/components/layout";
import {useSession} from "@inrupt/solid-ui-react";
import useSubject from "@/hooks/useSubject";
import {WebIdProfileShape} from "@/ldo/webIdProfile.typings";
import {WebIdProfileShapeFactory} from "@/ldo/webIdProfile.ldoFactory";
import {TodoListShapeFactory} from "@/ldo/todoList.ldoFactory";
import {TodoListShape} from "@/ldo/todoList.typings";
import Loading from "@/components/loading";
import ErrorDetails from "@/components/errorDetails";
import TodoList from "@/components/todoList";

export default function Home() {
    const {session, sessionRequestInProgress} = useSession();
    const {webId, isLoggedIn} = session.info;
    const {
        data: profile,
        error: profileError,
        isLoading: profileIsLoading
    } = useSubject<WebIdProfileShape>(webId, WebIdProfileShapeFactory);
    // TODO: For now we just choose first storage available (usually just one)
    const storageUrl = profile?.storage?.[0]?.["@id"];
    // TODO: We should follow links to find it, but for now we cheat and just assumes the Subject URL
    const defaultTodoListId = storageUrl ? `${storageUrl}todo.ttl#defaultList` : null;

    if (!isLoggedIn || sessionRequestInProgress) {
        return <Layout/>
    }

    if (profileError) {
        return <ErrorDetails error={profileError}/>
    }

    if (!defaultTodoListId || profileIsLoading) {
        return <Loading/>
    }

    return (
        <Layout>
            <h1>Welcome, {profile?.name}</h1>
            <TodoList listUrl={defaultTodoListId}/>
        </Layout>
    )
}
