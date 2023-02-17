import Layout from "@/components/layout";
import {useSession} from "@inrupt/solid-ui-react";
import useSubject from "@/hooks/useSubject";
import {WebIdProfileShape} from "@/ldo/webIdProfile.typings";
import {WebIdProfileShapeFactory} from "@/ldo/webIdProfile.ldoFactory";
import Loading from "@/components/loading";
import ErrorDetails from "@/components/errorDetails";
import {getResourceUrl} from "@/libs/ldo";
import useTypeIndices from "@/hooks/useTypeIndices";
import SetupPage from "@/components/setupPage";

export default function Setup() {
    const {session, sessionRequestInProgress} = useSession();
    const {webId, isLoggedIn} = session.info;
    const {
        data: profile,
        error: profileError,
        isLoading: profileIsLoading
    } = useSubject<WebIdProfileShape>(webId, getResourceUrl(webId), WebIdProfileShapeFactory);
    const typeIndices = useTypeIndices(profile);

    // TODO: For now we just choose first storage available (usually just one)
    const storageUrl = profile?.storage?.[0]?.["@id"];
    // TODO: We should follow links to find it, but for now we cheat and just assumes the Subject URL
    const defaultTodoListId = storageUrl ? `${storageUrl}todo.ttl#defaultList` : null;
    const defaultTodoResourceUrl = getResourceUrl(defaultTodoListId);

    if (!isLoggedIn || sessionRequestInProgress) {
        return <Layout/>
    }

    if (profileError) {
        return <ErrorDetails error={profileError}/>
    }

    if (!defaultTodoListId || !defaultTodoResourceUrl || !profile || profileIsLoading) {
        return <Loading/>
    }

    return <SetupPage profile={profile} />

}
