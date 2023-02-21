import {LinkedDataObject} from "ldo";
import {WebIdProfileShape} from "@/ldo/solid.typings";

export function getName(profile: LinkedDataObject<WebIdProfileShape>): string {
    return profile.name || profile.fn || "[Unknown name]";
}