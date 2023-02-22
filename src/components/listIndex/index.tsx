import ListIndexStorage from "@/components/listIndex/storage";

interface ListIndexPageProps {
    storages: string[] | null;
}

export default function ListIndex({storages}: ListIndexPageProps) {
    return (
        <>
            <h1>Todo Lists</h1>
            {storages?.map((storageUrl) => <ListIndexStorage key={storageUrl} storageUrl={storageUrl} />)}
        </>
    )
}