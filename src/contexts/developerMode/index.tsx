import {createContext, ReactNode, useState} from "react";

interface DeveloperModeContextProps {
    developerMode: boolean
    setDeveloperMode: (editMode: boolean) => void
}
const DeveloperModeContext = createContext<DeveloperModeContextProps>({
    developerMode: false,
    setDeveloperMode: () => {},
});
export default DeveloperModeContext;

interface DeveloperModeContextProviderProps {
    children: ReactNode;
}
export function DeveloperModeContextProvider({ children }: DeveloperModeContextProviderProps) {
    const [developerMode, setDeveloperMode] = useState<boolean>(false);
    return (
        <DeveloperModeContext.Provider value={{developerMode, setDeveloperMode}}>
            {children}
        </DeveloperModeContext.Provider>
    )
}
