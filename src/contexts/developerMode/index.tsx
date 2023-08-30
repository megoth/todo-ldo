import {createContext, ReactNode, useState} from "react";
import useLocalStorage from "use-local-storage";
import {LdoBase} from "ldo/lib/util";

export type SubjectNode<T extends LdoBase> = {
    resourceUrl: string;
    ldo: T;
}

interface DeveloperModeContextProps<T extends LdoBase> {
    developerMode: boolean
    setDeveloperMode: (editMode: boolean) => void
    subjects: Array<SubjectNode<T>>
    addSubject: (resourceUrl: string, subject: T) => void
}

const DeveloperModeContext = createContext<DeveloperModeContextProps<any>>({
    developerMode: false,
    setDeveloperMode: () => {
    },
    subjects: [],
    addSubject: () => {
    }
});
export default DeveloperModeContext;

interface DeveloperModeContextProviderProps {
    children: ReactNode;
}

export function DeveloperModeContextProvider({children}: DeveloperModeContextProviderProps) {
    const [developerMode, setDeveloperMode] = useLocalStorage<boolean>("developer-mode", true);
    const [subjects, setSubjects] = useState<Array<SubjectNode<any>>>([]);
    const addSubject = (resourceUrl: string, ldo: any) => {
        const existingIndex = subjects.findIndex((item) => item.ldo["@id"] === ldo["@id"] && item.resourceUrl === resourceUrl);
        const node = {ldo, resourceUrl};
        if (existingIndex === -1) {
            subjects.push(node);
        } else {
            subjects[existingIndex] = node;
        }
        setSubjects([...subjects]);
    };
    return (
        <DeveloperModeContext.Provider value={{developerMode, setDeveloperMode, subjects, addSubject}}>
            {children}
        </DeveloperModeContext.Provider>
    )
}
