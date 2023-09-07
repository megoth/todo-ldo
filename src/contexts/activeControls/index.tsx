import React, {createContext, ReactNode, useState} from "react";

interface ActiveControlsContextProps {
    activeControlsId: string | null;
    toggleActiveControlsId: (id: string) => void
}

const ActiveControlsContext = createContext<ActiveControlsContextProps>({
    activeControlsId: null,
    toggleActiveControlsId: () => {},
});
export default ActiveControlsContext;

interface ActiveControlsContextProviderProps {
    children: ReactNode;
}

export function ActiveControlsContextProvider({children}: ActiveControlsContextProviderProps) {
    const [activeControlsId, setActiveControlsId] = useState<string | null>(null);
    const toggleActiveControlsId = (id: string) => setActiveControlsId(id === activeControlsId ? null : id);
    return (
        <ActiveControlsContext.Provider value={{activeControlsId, toggleActiveControlsId}}>
            {children}
        </ActiveControlsContext.Provider>
    )
}
