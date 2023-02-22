import useSubject from "@/hooks/useSubject";
import {DocumentShape} from "@/ldo/todo.typings";
import {getResourceUrl} from "@/libs/ldo";
import ErrorDetails from "@/components/errorDetails";
import Loading from "@/components/loading";
import {DocumentShapeFactory} from "@/ldo/todo.ldoFactory";
import Button from "@/components/button";
import ContentGroup from "@/components/contentGroup";

interface ListIndexStorageProps {
    storageUrl?: string;
}

export default function ListIndexStorage({storageUrl}: ListIndexStorageProps) {
    const {data: storage, error: storageError, isLoading: storageIsLoading} = useSubject<DocumentShape>(storageUrl, getResourceUrl(storageUrl), DocumentShapeFactory);

    if (storageError) {
        return <ErrorDetails error={storageError} />
    }

    if (!storage || storageIsLoading) {
        return <Loading />
    }

    return (
        <>
            {storage.list?.map((list) => (
                <ContentGroup key={list["@id"]}>
                    <Button variant="link" href={`/list/${encodeURIComponent(list["@id"]!)}`}>{list.name || "[Unnamed list]"} ({list.task?.length} tasks)</Button>
                </ContentGroup>
            ))}
        </>
    )
}