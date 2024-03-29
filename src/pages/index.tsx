import React from "react";
import Layout from "@/components/layout";
import { useSession } from "@inrupt/solid-ui-react";
import useSubject from "@/hooks/useSubject";
import Loading from "@/components/loading";
import ErrorDetails from "@/components/errorDetails";
import { getResourceUrl } from "@/libs/ldo";
import useTypeStorage from "@/hooks/useTypeStorage";
import SetupPrompt from "@/components/setupPrompt";
import { todoNamespace } from "@/vocabularies";
import Redirect from "@/components/redirect";
import { DocumentShapeType } from "@/ldo/todo.shapeTypes";
import { Document } from "@/ldo/todo.typings";
import { SolidProfile, SolidProfileShapeType } from "ldo-solid-profile";

export default function HomePage() {
  const { session: { info: { webId, isLoggedIn } } } = useSession();
  const {
    data: profile,
    error: profileError,
    isLoading: profileIsLoading
  } = useSubject<SolidProfile>(webId, getResourceUrl(webId), SolidProfileShapeType);
  const storages = useTypeStorage(profile, todoNamespace.TodoList);
  const {
    data: storage,
    error: storageError,
    isLoading: storageIsLoading
  } = useSubject<Document>(storages?.[0], getResourceUrl(storages?.[0]), DocumentShapeType);

  if (profileError || storageError) {
    return <ErrorDetails error={profileError || storageError} />;
  }

  if (!isLoggedIn) {
    return <Layout />;
  }

  if (!profile) {
    return <Loading />;
  }

  return (
    <Layout loading={profileIsLoading || storageIsLoading}>
      {!storages?.length && <SetupPrompt profile={profile} />}
      {storages && storages.length > 1 && <div>TODO: MULTIPLE STORAGES, PLEASE CHOOSE ONE!</div>}
      {storages && storage?.list && storage?.list?.length > 1 && <Redirect url={"/list"} />}
      {storage?.list && storage?.list?.length === 0 && <Redirect url={"/list"} />}
      {storage?.list && storage?.list?.length === 1 && storage?.list?.[0]?.["@id"] &&
        <Redirect url={`/list/${encodeURIComponent(storage?.list?.[0]?.["@id"])}`} />}
      {storage?.list && storage?.list?.length === 1 && !storage?.list?.[0]?.["@id"] &&
        <Redirect url={`/list`} />}
    </Layout>
  );
}
