import React from "react";
import Layout from "@/components/layout";
import {useSession} from "@inrupt/solid-ui-react";
import useSubject from "@/hooks/useSubject";
import {getResourceUrl} from "@/libs/ldo";
import useTypeStorage from "@/hooks/useTypeStorage";
import {todoNamespace} from "@/vocabularies";
import Loading from "@/components/loading";
import TodoListIndex from "@/components/todoListIndex";
import {WebIdProfile} from "@/ldo/solid.typings";
import {WebIdProfileShapeType} from "@/ldo/solid.shapeTypes";

export default function ListIndexPage() {
    const {
        session: {info: {webId}},
    } = useSession();
    const {
        data: profile,
        error: profileError,
        isLoading: profileIsLoading
    } = useSubject<WebIdProfile>(webId, getResourceUrl(webId), WebIdProfileShapeType);
    const storages = useTypeStorage(profile, todoNamespace.TodoList);

    if (profileIsLoading) {
        return <Loading/>;
    }

    return (
        <Layout loading={profileIsLoading} error={profileError}>
            <TodoListIndex storages={storages} />
        </Layout>
    );
}