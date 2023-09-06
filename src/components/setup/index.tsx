import TextContent from "@/components/textContent";
import useTypeIndexResources from "@/hooks/useTypeIndexResources";
import Loading from "@/components/loading";
import Input from "@/components/input";
import {useForm} from "react-hook-form";
import SubmitButton from "@/components/submitButton";
import ContentGroup from "@/components/contentGroup";
import {solid, todo} from "@/vocabularies";
import {createSubjectUrl, getValue, update} from "@/libs/ldo";
import {useSession} from "@inrupt/solid-ui-react";
import Checkbox from "@/components/checkbox";
import {WebIdProfile} from "@/ldo/solid.typings";
import {createLdoDataset, getDataset, startTransaction} from "ldo";
import {DocumentShapeType, ListShapeType} from "@/ldo/todo.shapeTypes";
import {TypeRegistrationShapeType} from "@/ldo/solid.shapeTypes";
import {useState} from "react";
import {List} from "@/ldo/todo.typings";

interface SetupPageProps {
    profile: WebIdProfile
}

interface FormData {
    listName: string;
    private: boolean;
    storagePath: string;
    storageIsCreated: boolean;
    indexIsUpdated: boolean;
    listIsCreated: boolean;
}

export default function SetupPage({profile}: SetupPageProps) {
    const {fetch} = useSession();
    const {
        control: {
            _formValues: {
                storageIsCreated,
                indexIsUpdated,
                listIsCreated,
            }
        },
        register,
        handleSubmit,
        formState: {
            errors,
            isValid,
            isSubmitted,
            isSubmitSuccessful,
        },
        setValue
    } = useForm<FormData>();
    const {publicTypeIndex, privateTypeIndex} = useTypeIndexResources(profile);
    const suggestedStoragePath = `${profile.storage?.[0]?.["@id"]}todo.ttl`;
    const [list, setList] = useState<List | null>(null);

    const onSubmit = handleSubmit(async (data) => {
        const todoDataset = createLdoDataset(getDataset(profile.storage));

        // Adding resource to Pod
        const todoDocument = todoDataset.usingType(DocumentShapeType).fromSubject(data.storagePath);
        startTransaction(todoDocument);
        todoDocument.type = todo.TodoDocument;
        await update(todoDocument, data.storagePath, fetch);
        setValue("storageIsCreated", true);

        // Adding resource to TypeIndex
        const typeIndexUrl = data.private ? privateTypeIndex.data?.["@id"]! : publicTypeIndex.data?.["@id"]!;
        const typeRegistry = todoDataset.usingType(TypeRegistrationShapeType).fromSubject(createSubjectUrl(typeIndexUrl));
        startTransaction(typeRegistry);
        typeRegistry.type = solid.TypeRegistration;
        typeRegistry.forClass = todo.TodoList;
        typeRegistry.instance = getValue(data.storagePath);
        await update(typeRegistry, typeIndexUrl, fetch);
        setValue("indexIsUpdated", true);

        // Creating the first todo list and updating todo index
        const list = todoDataset.usingType(ListShapeType).fromSubject(createSubjectUrl(data.storagePath));
        startTransaction(list);
        list.type =  todo.List;
        list.name = data.listName;
        await update(list, data.storagePath, fetch);

        startTransaction(todoDocument);
        todoDocument.list?.push(list);
        await update(todoDocument, data.storagePath, fetch);
        setValue("listIsCreated", true);
        setList(list);
    });

    if (publicTypeIndex.isLoading || privateTypeIndex.isLoading) {
        return <Loading/>
    }

    return (
        <>
            <h1 className="title">Setting up your Pod</h1>
            <TextContent>
                {isSubmitSuccessful && list ? (
                    <>
                        <ContentGroup>
                            <ul>
                                <li>Create storage on Pod: {storageIsCreated ? "Success!" : "In progress!"}</li>
                                <li>Update typeIndex with storage: {indexIsUpdated ? "Success!" : "In progress!"}</li>
                                <li>Created list: {listIsCreated ? "Success!" : "In progress!"}</li>
                            </ul>
                        </ContentGroup>
                        <SubmitButton href={list ? `/list/${encodeURIComponent(list["@id"]!)}` : "/"}>Let&#39;s get to your first todo list!</SubmitButton>
                    </>
                ) : (
                    <form onSubmit={onSubmit}>
                        <ContentGroup>
                            <p>First, We need to set up a storage for Todo lists on your Pod.</p>
                            <Input
                                defaultValue={suggestedStoragePath}
                                help={"We've suggested a path for you, but you can change this if you want"}
                                error={{
                                    "You must provide a valid URL": errors.storagePath?.type === "pattern",
                                    "You must provide a path": errors.storagePath?.type === "required",
                                }}
                                {...register("storagePath", {
                                    required: true,
                                    pattern: /[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?/g
                                })}>
                                Storage
                            </Input>
                        </ContentGroup>
                        <ContentGroup>
                            <p>
                                We also need to setup a link in order to let us (and other apps) know of
                                this storage in the future.
                            </p>
                            {privateTypeIndex.error && <>
                                <p className="help is-warning">We don&#39;t have access to a private index for this, so
                                    we&#39;ll add this link
                                    publicly.</p>
                            </>}
                            {!privateTypeIndex.error && <>
                                <Checkbox {...register("private")}
                                          help="If you prefer, you can make this link private">Make this link
                                    private</Checkbox>
                            </>}
                        </ContentGroup>
                        <ContentGroup>
                            <p>Finally, let&#39;s create your first todo list, to get you started.</p>
                            <Input defaultValue={"My Todo List"} {...register("listName")}
                                   help="You can leave the list's name blank if you want">
                                List Name
                            </Input>
                        </ContentGroup>
                        <SubmitButton>Set up my Pod for me</SubmitButton>
                        {isSubmitted && !isValid && (
                            <ContentGroup className={"help is-danger"}>
                                Some fields are invalid, please check for errors.
                            </ContentGroup>
                        )}
                    </form>
                )}
            </TextContent>
        </>
    )
}