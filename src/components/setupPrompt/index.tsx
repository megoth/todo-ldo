import WelcomeTitle from "@/components/welcomeTitle";
import TextContent from "@/components/textContent";
import Button from "@/components/button";
import ContentGroup from "@/components/contentGroup";
import FlexBar from "@/components/flexBar";
import {WebIdProfile} from "@/ldo/solid.typings";

interface SetupPromptProps {
    profile: WebIdProfile
}

export default function SetupPrompt({profile}: SetupPromptProps) {
    return (
        <>
            <WelcomeTitle profile={profile}/>
            <TextContent>
                <ContentGroup>
                    <p>We&#39;re unable to find data on existing Todo lists.</p>
                    <p>Should we setup your Pod to store Todo lists?</p>
                </ContentGroup>
                <FlexBar align="center">
                    <Button href="/setup" variant="primary">Let&#39;s get started!</Button>
                </FlexBar>
            </TextContent>
        </>
    )
}