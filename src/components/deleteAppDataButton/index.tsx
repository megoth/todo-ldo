import React from "react";
import { useSession } from "@inrupt/solid-ui-react";
import useSubject from "@/hooks/useSubject";
import { getResourceUrl } from "@/libs/ldo";
import useTypeStorage from "@/hooks/useTypeStorage";
import { todoNamespace } from "@/vocabularies";
import Loading from "@/components/loading";
import ErrorDetails from "@/components/errorDetails";
import { useForm } from "react-hook-form";
import Redirect from "@/components/redirect";
import SubmitButton from "@/components/submitButton";
import { SolidProfile, SolidProfileShapeType } from "ldo-solid-profile";
import { deleteTypeRegistration, TypeIndex, TypeIndexShapeType } from "ldo-type-index";

interface FormData {
}

export default function DeleteAppDataButton() {
  const { fetch, session: { info: { webId } } } = useSession();
  const {
    handleSubmit,
    formState: {
      isSubmitted
    }
  } = useForm<FormData>();
  const {
    data: profile,
    error: profileError,
    isLoading: profileIsLoading
  } = useSubject<SolidProfile>(webId, getResourceUrl(webId), SolidProfileShapeType);
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
  } = useSubject<TypeIndex>(profile?.privateTypeIndex?.["@id"], profile?.privateTypeIndex?.["@id"], TypeIndexShapeType);
  const storages = useTypeStorage(profile, todoNamespace.TodoList) || [];

  if (profileError || publicTypeIndexError || privateTypeIndexError) {
    return <ErrorDetails error={profileError || publicTypeIndexError || privateTypeIndexError} />;
  }

  if (!profile || profileIsLoading || !publicTypeIndex || publicTypeIndexIsLoading || !privateTypeIndex || privateTypeIndexIsLoading) {
    return <Loading />;
  }

  const onDelete = handleSubmit(async () => {
    // Update references to storages
    await deleteTypeRegistration(publicTypeIndex, todoNamespace.TodoList, fetch).then(() => mutatePublicTypeIndex());
    await deleteTypeRegistration(privateTypeIndex, todoNamespace.TodoList, fetch).then(() => mutatePrivateTypeIndex());
    // Delete storage resources themselves
    await Promise.all(storages.map((storageUrl) => fetch(storageUrl, {
      method: "DELETE"
    })));
  });

  // TODO: Implement modal (Are You Sure)
  return isSubmitted ? (
    <Redirect url={"/"} />
  ) : (
    <form onSubmit={onDelete}>
      <SubmitButton className={"is-danger"}>Delete App Data</SubmitButton>
    </form>
  );
}