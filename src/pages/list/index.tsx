import Layout from "@/components/layout";
import {useSession} from "@inrupt/solid-ui-react";
import useSubject from "@/hooks/useSubject";
import {WebIdProfileShape} from "@/ldo/solid.typings";
import {getResourceUrl} from "@/libs/ldo";
import {WebIdProfileShapeFactory} from "@/ldo/solid.ldoFactory";
import useTypeStorage from "@/hooks/useTypeStorage";
import {todoNamespace} from "@/vocabularies";
import Loading from "@/components/loading";
import ListIndex from "@/components/listIndex";

export default function ListIndexPage() {
    const {
        session: {info: {webId}},
    } = useSession();
    const {
        data: profile,
        error: profileError,
        isLoading: profileIsLoading
    } = useSubject<WebIdProfileShape>(webId, getResourceUrl(webId), WebIdProfileShapeFactory);
    const storages = useTypeStorage(profile, todoNamespace.TodoList);

    if (profileIsLoading) {
        return <Loading/>;
    }

    return (
        <Layout loading={profileIsLoading} error={profileError}>
            <ListIndex storages={storages} />
        </Layout>
    );
}