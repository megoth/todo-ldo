import Layout from "@/components/layout";
import {LinkedDataObject} from "ldo";
import {WebIdProfileShape} from "@/ldo/webIdProfile.typings";
import TextContent from "@/components/textContent";
import Checkbox from "@/components/checkbox";
import useTypeIndices from "@/hooks/useTypeIndices";
import useTypeIndexResources from "@/hooks/useTypeIndexResources";
import Loading from "@/components/loading";

interface SetupPageProps {
    profile: LinkedDataObject<WebIdProfileShape>
}

export default function SetupPage({profile}: SetupPageProps) {
    const {publicTypeIndex, privateTypeIndex} = useTypeIndexResources(profile);
    const typeIndices = useTypeIndices(profile);
    if (publicTypeIndex.isLoading && privateTypeIndex.isLoading) {
        return <Loading/>;
    }
    return (
        <Layout>
            <h1>Setting up your Pod</h1>
            <TextContent>
                <ol>
                    <li>
                        <p>First, We need to set up a storage for Todo lists on your Pod.</p>
                        <label>
                            <span>Storage:</span>
                            <input type={"text"}/>
                        </label>
                    </li>
                    <li>
                        <p>
                            We also need to link to this storage in order to let us (and other apps) know of this
                            storage in the future.
                        </p>
                        {!privateTypeIndex.error && <>
                            <p>If you prefer, you can make this link private.</p>
                            <Checkbox>Make this link private</Checkbox>
                        </>}
                    </li>
                    <li>
                        <p>Last, what will you call your first todo list?</p>
                        <label>
                            <span>Name:</span>
                            <input type={"text"}/>
                        </label>
                    </li>
                </ol>
            </TextContent>
        </Layout>
    )
}