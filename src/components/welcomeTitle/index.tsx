import React from "react";
import {getName} from "@/libs/profile";
import {WebIdProfile} from "@/ldo/solid.typings";

interface WelcomeTitleProps {
    profile: WebIdProfile
}

export default function WelcomeTitle({profile}: WelcomeTitleProps) {
    return (
        <h1 className="title">
            <span>Welcome, </span>
            <a href={profile["@id"]}>{getName(profile)}</a>
        </h1>
    )
}