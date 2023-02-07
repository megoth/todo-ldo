import {useContext} from "react";
import DeveloperModeContext from "@/contexts/developerMode";

export default function DeveloperModeButton() {
    const { developerMode, setDeveloperMode } = useContext(DeveloperModeContext);

    return <button onClick={(event) => setDeveloperMode(!developerMode)}>Turn developer mode {developerMode ? "off" : "on"}</button>
}