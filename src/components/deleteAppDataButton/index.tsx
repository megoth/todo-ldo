import {useSession} from "@inrupt/solid-ui-react";
import useSubject from "@/hooks/useSubject";
import {TypeIndex, WebIdProfile} from "@/ldo/solid.typings";
import {getResourceUrl, remove} from "@/libs/ldo";
import {TypeIndexShapeType, TypeRegistrationShapeType, WebIdProfileShapeType} from "@/ldo/solid.shapeTypes";
import useTypeStorage from "@/hooks/useTypeStorage";
import {solid, todo, todoNamespace} from "@/vocabularies";
import Loading from "@/components/loading";
import ErrorDetails from "@/components/errorDetails";
import {createLdoDataset, getDataset, startTransaction} from "ldo";
import {useForm} from "react-hook-form";
import Redirect from "@/components/redirect";
import SubmitButton from "@/components/submitButton";

interface FormData {
}

export default function DeleteAppDataButton() {
    const {fetch, session: {info: {webId}}} = useSession();
    const {
        register,
        handleSubmit,
        formState: {
            isSubmitSuccessful,
            isSubmitted,
        },
    } = useForm<FormData>();
    const {
        data: profile,
        error: profileError,
        isLoading: profileIsLoading
    } = useSubject<WebIdProfile>(webId, getResourceUrl(webId), WebIdProfileShapeType);
    const {
        data: publicTypeIndex,
        error: publicTypeIndexError,
        isLoading: publicTypeIndexIsLoading,
        mutate: mutatePublicTypeIndex
    } = useSubject<TypeIndex>(profile?.publicTypeIndex?.["@id"], profile?.publicTypeIndex?.["@id"], TypeIndexShapeType);
    const {
        data: privateTypeIndex,
        error: privateTypeIndexError,
        isLoading: privateTypeIndexIsLoading,
        mutate: mutatePrivateTypeIndex
    } = useSubject<TypeIndex>(profile?.publicTypeIndex?.["@id"], profile?.publicTypeIndex?.["@id"], TypeIndexShapeType);
    const storages = useTypeStorage(profile, todoNamespace.TodoList) || [];

    if (profileError || publicTypeIndexError || privateTypeIndexError) {
        return <ErrorDetails error={profileError || publicTypeIndexError || privateTypeIndexError}/>
    }

    if (!profile || profileIsLoading || !publicTypeIndex || publicTypeIndexIsLoading || !privateTypeIndex || privateTypeIndexIsLoading) {
        return <Loading/>
    }

    const deleteTypeRegistration = async (typeIndex: TypeIndex) => {
        const dataset = getDataset(typeIndex);
        const registrationSubjects = dataset
            .toArray()
            .filter(({predicate, object}) => predicate.equals(solid.forClass) && object.equals(todoNamespace.TodoList));
        return Promise.all(registrationSubjects.map(async ({subject}) => {
            const registration = createLdoDataset(dataset).usingType(TypeRegistrationShapeType).fromSubject(subject.value);
            startTransaction(registration);
            await remove(registration, typeIndex["@id"], fetch);
        }));
    }

    const onDelete = handleSubmit(async () => {
        await deleteTypeRegistration(publicTypeIndex).then(() => mutatePublicTypeIndex());
        await deleteTypeRegistration(privateTypeIndex).then(() => mutatePrivateTypeIndex());
        await Promise.all(storages.map((storageUrl) => fetch(storageUrl, {
            method: "DELETE"
        })));
    });

    // TODO: Implement modal (Are You Sure)
    return isSubmitted ? (
        <Redirect url={"/"}/>
    ) : (
        <form onSubmit={onDelete}>
            <SubmitButton className={"is-danger"}>Delete App Data</SubmitButton>
        </form>
    );
}