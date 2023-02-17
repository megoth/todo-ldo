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
                <p>We're unable to find data on existing Todo lists.</p>
                <p>Should we setup your Pod to store Todo lists?</p>
            </TextContent>
            <Button href={"/setup"}>Let's get started!</Button>
        </Layout>
    )
}