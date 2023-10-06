import React from "react";
import Layout from "@/components/layout";
import {useSession} from "@inrupt/solid-ui-react";
import useSubject from "@/hooks/useSubject";
import {getResourceUrl} from "@/libs/ldo";
import useTypeStorage from "@/hooks/useTypeStorage";
import {todoNamespace} from "@/vocabularies";
import Loading from "@/components/loading";
import TodoListIndex from "@/components/todoListIndex";
import { SolidProfile, SolidProfileShapeType } from "ldo-solid-profile";

export default function ListIndexPage() {
    const {
        session: {info: {webId}},
    } = useSession();
    const {
        data: profile,
        error: profileError,
        isLoading: profileIsLoading
    } = useSubject<SolidProfile>(webId, getResourceUrl(webId), SolidProfileShapeType);
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