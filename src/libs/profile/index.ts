import {WebIdProfile} from "@/ldo/solid.typings";

export function getName(profile: WebIdProfile): string {
    return profile.name || profile.fn || "[Unknown name]";
}