import Layout from "@/components/layout";
import {LinkedDataObject} from "ldo";
import {WebIdProfileShape} from "@/ldo/webIdProfile.typings";
import WelcomeTitle from "@/components/welcomeTitle";
import TextContent from "@/components/textContent";
import Button from "@/components/button";

interface SetupPromptProps {
    profile: LinkedDataObject<WebIdProfileShape>
}

export default function SetupPrompt({ profile }: SetupPromptProps) {
    return (
        <Layout>
            <WelcomeTitle profile={profile} />
            <TextContent>
                <p>We&#39;re unable to find data on existing Todo lists.</p>
                <p>Should we setup your Pod to store Todo lists?</p>
                <p>
                    <Button href="/setup" variant="primary">Let&#39;s get started!</Button>
                </p>
            </TextContent>
        </Layout>
    )
}