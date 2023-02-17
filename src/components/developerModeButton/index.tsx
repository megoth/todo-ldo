import {useContext} from "react";
import DeveloperModeContext from "@/contexts/developerMode";
import Button from "@/components/button";

export default function DeveloperModeButton() {
    const { developerMode, setDeveloperMode } = useContext(DeveloperModeContext);

    return <Button onClick={() => setDeveloperMode(!developerMode)}>Turn developer mode {developerMode ? "off" : "on"}</Button>
}