import {createContext, ReactNode, useState} from "react";
import {LinkedDataObject} from "ldo";
import useLocalStorage from "use-local-storage";

export type SubjectNode = {
    resourceUrl: string;
    ldo: LinkedDataObject<any>;
}

interface DeveloperModeContextProps {
    developerMode: boolean
    setDeveloperMode: (editMode: boolean) => void
    subjects: Array<SubjectNode>
    addSubject: (resourceUrl: string, subject: LinkedDataObject<any>) => void
}

const DeveloperModeContext = createContext<DeveloperModeContextProps>({
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
    const [subjects, setSubjects] = useState<Array<SubjectNode>>([]);
    const addSubject = (resourceUrl: string, ldo: LinkedDataObject<any>) => {
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
