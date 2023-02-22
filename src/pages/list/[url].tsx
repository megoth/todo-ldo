import {useRouter} from "next/router";
import {getResourceUrl} from "@/libs/ldo";
import {ensureSingleQueryParam} from "@/libs/next";
import Layout from "@/components/layout";
import TodoList from "@/components/todoList";

export default function ListPage() {
    const router = useRouter();
    const listUrl = ensureSingleQueryParam(router.query.url);
    const resourceUrl = ensureSingleQueryParam(router.query.resourceUrl) || getResourceUrl(listUrl);
    return (
        <Layout>
            <TodoList listUrl={listUrl} resourceUrl={resourceUrl}/>
        </Layout>
    )
}