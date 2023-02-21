import Layout from "@/components/layout";
import {LinkedDataObject} from "ldo";
import {WebIdProfileShape} from "@/ldo/webIdProfile.typings";
import TextContent from "@/components/textContent";
import CheckboxToggle from "@/components/checkboxToggle";
import useTypeIndexResources from "@/hooks/useTypeIndexResources";
import Loading from "@/components/loading";
import Input from "@/components/input";
import {useForm} from "react-hook-form";
import FormError from "@/components/formError";
import SubmitButton from "@/components/submitButton";
import ContentGroup from "@/components/contentGroup";
import {TypeRegistrationFactory} from "@/ldo/typeRegistration.ldoFactory";
import {TypeRegistration} from "@/ldo/typeRegistration.typings";
import {v4 as uuidv4} from 'uuid';
import {TodoDocumentShape} from "@/ldo/todoDocument.typings";
import {TodoDocumentShapeFactory} from "@/ldo/todoDocument.ldoFactory";
import {solid, todo} from "@/vocabularies";
import {getValue, getValueAsString, update} from "@/libs/ldo";
import {useSession} from "@inrupt/solid-ui-react";
import {useState} from "react";
import {TodoListShape} from "@/ldo/todoList.typings";
import {TodoListShapeFactory} from "@/ldo/todoList.ldoFactory";

interface SetupPageProps {
    profile: LinkedDataObject<WebIdProfileShape>
}

interface FormData {
    listName: string;
    private: boolean;
    storagePath: string;
}

export default function SetupPage({profile}: SetupPageProps) {
    const {fetch} = useSession();
    const {control, register, handleSubmit, formState: {errors}} = useForm<FormData>();
    const {publicTypeIndex, privateTypeIndex} = useTypeIndexResources(profile);
    const suggestedStoragePath = `${profile?.storage?.[0]?.["@id"]}todo.ttl`;
    const [createdStorage, setCreatedStorage] = useState<boolean>(false);
    const [updatedIndex, setUpdatedIndex] = useState<boolean>(false);
    const [createdList, setCreatedList] = useState<boolean>(false);

    if (publicTypeIndex.isLoading && privateTypeIndex.isLoading) {
        return <Loading/>;
    }

    const onSubmit = async (data: any) => {
        // Adding resource to Pod
        const listDocument: LinkedDataObject<TodoDocumentShape> = TodoDocumentShapeFactory.new(data.storagePath);
        listDocument.type = getValueAsString(todo.TodoDocument.value);
        await update(listDocument, data.storagePath, fetch);
        setCreatedStorage(true);

        // Adding resource to TypeIndex
        const typeIndexUrl = data.private ? privateTypeIndex.data?.["@id"]! : publicTypeIndex.data?.["@id"]!;
        const typeRegistry: LinkedDataObject<TypeRegistration> = TypeRegistrationFactory.new(`#${uuidv4()}`);
        typeRegistry.type = getValueAsString(solid.TypeRegistration.value);
        typeRegistry.forClass = {"@id": todo.TodoList.value};
        // @ts-ignore
        typeRegistry.instance = data.storagePath;
        await update(typeRegistry, typeIndexUrl, fetch);
        setUpdatedIndex(true);

        // Creating the first todo list and updating todo index
        const list: LinkedDataObject<TodoListShape> = TodoListShapeFactory.new(`#${uuidv4()}`);
        list.name = data.listName;
        await update(list, data.storagePath, fetch);
        listDocument.list?.push(getValue(list["@id"]!));
        await update(listDocument, data.storagePath, fetch);
        setCreatedList(true);
    }

    return (
        <Layout>
            <h1>Setting up your Pod</h1>
            <TextContent>
                {control._formState.isSubmitted ? (
                    <>
                        <ContentGroup>
                            <ul>
                                <li>Create storage on Pod: {createdStorage ? "Success!" : "In progress!"}</li>
                                <li>Update typeIndex with storage: {updatedIndex ? "Success!" : "In progress!"}</li>
                                <li>Created list: {createdList ? "Success!" : "In progress!"}</li>
                            </ul>
                        </ContentGroup>
                        <SubmitButton href={"/"}>Let's get to your first todo list!</SubmitButton>
                    </>
                ) : (
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <ContentGroup>
                            <p>First, We need to set up a storage for Todo lists on your Pod.</p>
                            <p>We&#39;ve suggested a path for you, but you can change this if you want.</p>
                            <Input
                                defaultValue={suggestedStoragePath}
                                {...register("storagePath", {
                                    required: true,
                                    pattern: /[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?/g
                                })}>
                                Storage
                            </Input>
                            {errors.storagePath?.type === "pattern" &&
                                <FormError>You must provide a valid URL</FormError>}
                            {errors.storagePath?.type === "required" &&
                                <FormError>You must provide a path</FormError>}
                        </ContentGroup>
                        <ContentGroup>
                            <p>
                                We also need to setup a link in order to let us (and other apps) know of
                                this storage in the future.
                            </p>
                            {privateTypeIndex.error && <>
                                <p>We don&#39;t have access to a private index for this, so we&#39;ll add this link
                                    publicly.</p>
                            </>}
                            {!privateTypeIndex.error && <>
                                <p>If you prefer, you can make this link private.</p>
                                <CheckboxToggle {...register("private")}>Make this link private</CheckboxToggle>
                            </>}
                        </ContentGroup>
                        <ContentGroup>
                            <p>Lastly, let's create your first todo list, to get you started.</p>
                            <p>You can name the list if you want</p>
                            <Input defaultValue={"My Todo List"} {...register("listName")}>
                                Storage
                            </Input>
                        </ContentGroup>
                        <SubmitButton>Set up my Pod for me</SubmitButton>
                        {Object.keys(errors).length > 0 && (
                            <ContentGroup>
                                <FormError>Some fields are invalid, please check for errors.</FormError>
                            </ContentGroup>
                        )}
                    </form>
                )}
            </TextContent>
        </Layout>
    )
}