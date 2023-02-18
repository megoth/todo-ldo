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

interface SetupPageProps {
    profile: LinkedDataObject<WebIdProfileShape>
}

export default function SetupPage({profile}: SetupPageProps) {
    const {control, register, handleSubmit, formState: {errors}} = useForm();
    const {publicTypeIndex, privateTypeIndex} = useTypeIndexResources(profile);
    const suggestedStoragePath = `${profile?.storage?.[0]?.["@id"]}todo.ttl`;
    // const [storagePath, setStoragePath] = useState<string | null>(suggestedStoragePath);
    // const {isLoading, error} = useResource(storagePath);

    if (publicTypeIndex.isLoading && privateTypeIndex.isLoading) {
        return <Loading/>;
    }

    const onSubmit = (data: any) => {
        console.log("SUBMIT", data);
    }

    return (
        <Layout>
            <h1>Setting up your Pod</h1>
            <TextContent>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <ol>
                        <li>
                            <p>First, We need to set up a storage for Todo lists on your Pod.</p>
                            <p>We&#39;ve suggested a path for you, but you can change this if you want.</p>
                            <Input
                                defaultValue={suggestedStoragePath}
                                {...register("storagePath", {
                                    required: true,
                                    pattern: /[Hh][Tt][Tt][Pp][Ss]?:\/\/(?:(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]+-?)*[a-zA-Z\u00a1-\uffff0-9]+)*(?:\.(?:[a-zA-Z\u00a1-\uffff]{2,}))(?::\d{2,5})?(?:\/[^\s]*)?/g
                                })}
                                autoFocus>
                                Storage
                            </Input>
                            {errors.storagePath?.type === "pattern" && <FormError>You must provide a valid URL</FormError>}
                            {errors.storagePath?.type === "required" && <FormError>You must provide a path</FormError>}
                        </li>
                        <li>
                            <p>
                                We also need to link to this storage in order to let us (and other apps) know of this
                                storage in the future.
                            </p>
                            {!privateTypeIndex.error && <>
                                <p>If you prefer, you can make this link private.</p>
                                <Checkbox control={control} name="private">Make this link private</Checkbox>
                            </>}
                        </li>
                        <li>
                            <p>Last, what will you call your first todo list?</p>
                            <Input
                                defaultValue={"My Todo List"} {...register("listName", {required: true})}>Name</Input>
                            {errors.listName && <FormError>You must give it a name</FormError>}
                        </li>
                    </ol>
                    <SubmitButton>Set up my Pod for me</SubmitButton>
                    {Object.keys(errors).length > 0 && (
                        <FormError>Some fields are invalid, please check for errors.</FormError>
                    )}
                </form>
            </TextContent>
        </Layout>
    )
}