import Layout from "@/components/layout";
import {LinkedDataObject} from "ldo";
import TextContent from "@/components/textContent";
import CheckboxToggle from "@/components/checkboxToggle";
import useTypeIndexResources from "@/hooks/useTypeIndexResources";
import Loading from "@/components/loading";
import Input from "@/components/input";
import {useForm} from "react-hook-form";
import FormError from "@/components/formError";
import SubmitButton from "@/components/submitButton";
import ContentGroup from "@/components/contentGroup";
import {solid, todo} from "@/vocabularies";
import {createSubjectUrl, getValue, update} from "@/libs/ldo";
import {useSession} from "@inrupt/solid-ui-react";
import {DocumentShapeFactory, ListShapeFactory} from "@/ldo/todo.ldoFactory";
import {DocumentShape, ListShape} from "@/ldo/todo.typings";
import {TypeRegistrationShape, WebIdProfileShape} from "@/ldo/solid.typings";
import {TypeRegistrationShapeFactory} from "@/ldo/solid.ldoFactory";

interface SetupPageProps {
    profile: LinkedDataObject<WebIdProfileShape>
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
            _formState: {
                isSubmitted
            },
            _formValues: {
                storageIsCreated,
                indexIsUpdated,
                listIsCreated,
            }
        }, register, handleSubmit, formState: {errors}, setValue
    } = useForm<FormData>();
    const {publicTypeIndex, privateTypeIndex} = useTypeIndexResources(profile);
    const suggestedStoragePath = `${profile?.storage?.[0]?.["@id"]}todo.ttl`;

    if (publicTypeIndex.isLoading && privateTypeIndex.isLoading) {
        return <Loading/>;
    }

    const onSubmit = handleSubmit(async (data) => {
        // Adding resource to Pod
        const todoDocument: LinkedDataObject<DocumentShape> = DocumentShapeFactory.new(data.storagePath);
        todoDocument.type = getValue(todo.TodoDocument.value);
        await update(todoDocument, data.storagePath, fetch);
        setValue("storageIsCreated", true);

        // Adding resource to TypeIndex
        const typeIndexUrl = data.private ? privateTypeIndex.data?.["@id"]! : publicTypeIndex.data?.["@id"]!;
        const typeRegistry: LinkedDataObject<TypeRegistrationShape> = TypeRegistrationShapeFactory.new(createSubjectUrl(typeIndexUrl));
        typeRegistry.type = getValue(solid.TypeRegistration.value);
        typeRegistry.forClass = getValue(todo.TodoList.value);
        // @ts-ignore
        typeRegistry.instance = data.storagePath;
        await update(typeRegistry, typeIndexUrl, fetch);
        setValue("indexIsUpdated", true);

        // Creating the first todo list and updating todo index
        const list: LinkedDataObject<ListShape> = ListShapeFactory.new(createSubjectUrl(data.storagePath));
        list.type = getValue(todo.List.value);
        list.name = data.listName;
        await update(list, data.storagePath, fetch);
        todoDocument.list?.push(list);
        await update(todoDocument, data.storagePath, fetch);
        setValue("listIsCreated", true);
    });

    return (
        <Layout>
            <h1>Setting up your Pod</h1>
            <TextContent>
                {isSubmitted ? (
                    <>
                        <ContentGroup>
                            <ul>
                                <li>Create storage on Pod: {storageIsCreated ? "Success!" : "In progress!"}</li>
                                <li>Update typeIndex with storage: {indexIsUpdated ? "Success!" : "In progress!"}</li>
                                <li>Created list: {listIsCreated ? "Success!" : "In progress!"}</li>
                            </ul>
                        </ContentGroup>
                        <SubmitButton href={"/"}>Let&#39;s get to your first todo list!</SubmitButton>
                    </>
                ) : (
                    <form onSubmit={onSubmit}>
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
                            <p>Finally, let&#39;s create your first todo list, to get you started.</p>
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