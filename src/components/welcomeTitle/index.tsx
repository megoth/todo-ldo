import {getName} from "@/libs/profile";
import {LinkedDataObject} from "ldo";
import {WebIdProfileShape} from "@/ldo/solid.typings";

interface WelcomeTitleProps {
    profile: LinkedDataObject<WebIdProfileShape>
}

export default function WelcomeTitle({profile}: WelcomeTitleProps) {
    return (
        <h1 className="title">
            <span>Welcome, </span>
            <a href={profile["@id"]}>{getName(profile)}</a>
        </h1>
    )
}