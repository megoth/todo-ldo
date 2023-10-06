import React from "react";
import { getName, SolidProfile } from "ldo-solid-profile";

interface WelcomeTitleProps {
    profile: SolidProfile
}

export default function WelcomeTitle({profile}: WelcomeTitleProps) {
    return (
        <h1 className="title">
            <span>Welcome, </span>
            <a href={profile["@id"]}>{getName(profile)}</a>
        </h1>
    )
}