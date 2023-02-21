import Layout from "@/components/layout";
import {LinkedDataObject} from "ldo";
import WelcomeTitle from "@/components/welcomeTitle";
import TextContent from "@/components/textContent";
import Button from "@/components/button";
import ContentGroup from "@/components/contentGroup";
import Center from "@/components/center";
import {WebIdProfileShape} from "@/ldo/solid.typings";

interface SetupPromptProps {
    profile: LinkedDataObject<WebIdProfileShape>
}

export default function SetupPrompt({profile}: SetupPromptProps) {
    return (
        <Layout>
            <WelcomeTitle profile={profile}/>
            <TextContent>
                <ContentGroup>
                    <p>We&#39;re unable to find data on existing Todo lists.</p>
                    <p>Should we setup your Pod to store Todo lists?</p>
                </ContentGroup>
                <Center>
                    <Button href="/setup" variant="primary" shadow="full">Let&#39;s get started!</Button>
                </Center>
            </TextContent>
        </Layout>
    )
}