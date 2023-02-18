import Layout from "@/components/layout";
import {LinkedDataObject} from "ldo";
import {WebIdProfileShape} from "@/ldo/webIdProfile.typings";
import TextContent from "@/components/textContent";
import Checkbox from "@/components/checkbox";
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
import {create, update} from "@/libs/ldo";
import {useSession} from "@inrupt/solid-ui-react";

interface SetupPageProps {
    profile: LinkedDataObject<WebIdProfileShape>
}

export default function SetupPage({profile}: SetupPageProps) {
    const {fetch} = useSession();
    const {control, register, handleSubmit, formState: {errors}} = useForm();
    const {publicTypeIndex, privateTypeIndex} = useTypeIndexResources(profile);
    const suggestedStoragePath = `${profile?.storage?.[0]?.["@id"]}todo.ttl`;
    // const [storagePath, setStoragePath] = useState<string | null>(suggestedStoragePath);
    // const {isLoading, error} = useResource(storagePath);

    if (publicTypeIndex.isLoading && privateTypeIndex.isLoading) {
        return <Loading/>;
    }

    const onSubmit = async (data: any) => {
        // Adding resource to Pod
        const listDocument: LinkedDataObject<TodoDocumentShape> = TodoDocumentShapeFactory.new(data.storagePath);
        // @ts-ignore
        listDocument.type = {"@id": todo.TodoDocument.value};
        const response1 = await update(listDocument, data.storagePath, fetch);

        const publicTypeIndexUrl = publicTypeIndex.data?.["@id"]!;
        const typeRegistry: LinkedDataObject<TypeRegistration> = TypeRegistrationFactory.new(`#${uuidv4()}`);
        // @ts-ignore
        typeRegistry.type = {"@id": solid.TypeRegistration.value};
        typeRegistry.forClass = {"@id": todo.TodoList.value};
        // @ts-ignore
        typeRegistry.instance = data.storagePath;
        const response2 = await update(typeRegistry, publicTypeIndexUrl, fetch);

        console.log("RESULTS 1", response1)
        console.log("RESULTS 2", response2)
    }

    return (
        <Layout>
            <h1>Setting up your Pod</h1>
            <TextContent>
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
                            <Checkbox control={control} name="private">Make this link private</Checkbox>
                        </>}
                    </ContentGroup>
                    <SubmitButton>Set up my Pod for me</SubmitButton>
                    {Object.keys(errors).length > 0 && (
                        <ContentGroup>
                            <FormError>Some fields are invalid, please check for errors.</FormError>
                        </ContentGroup>
                    )}
                </form>
            </TextContent>
        </Layout>
    )
}