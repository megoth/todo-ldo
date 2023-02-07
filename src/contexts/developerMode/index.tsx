import {createContext, ReactNode, useState} from "react";
import {LinkedDataObject} from "ldo";

interface DeveloperModeContextProps {
    developerMode: boolean
    setDeveloperMode: (editMode: boolean) => void
    subjects: Array<LinkedDataObject<any>>
    addSubject: (subjectUrl: string, resource: LinkedDataObject<any>) => void
}
const DeveloperModeContext = createContext<DeveloperModeContextProps>({
    developerMode: false,
    setDeveloperMode: () => {},
    subjects: [],
    addSubject: () => {}
});
export default DeveloperModeContext;

interface DeveloperModeContextProviderProps {
    children: ReactNode;
}
export function DeveloperModeContextProvider({ children }: DeveloperModeContextProviderProps) {
    const [developerMode, setDeveloperMode] = useState<boolean>(true);
    const [subjects, setSubjects] = useState<Array<LinkedDataObject<any>>>([]);
    const addSubject = (subjectUrl: string, data: LinkedDataObject<any>) => {
        const existingIndex = subjects.findIndex((item) => item["@id"] === subjectUrl);
        if (existingIndex === -1) {
            subjects.push(data);
        } else {
            subjects[existingIndex] = data;
        }
        setSubjects([...subjects]);
    };
    return (
        <DeveloperModeContext.Provider value={{developerMode, setDeveloperMode, subjects, addSubject}}>
            {children}
        </DeveloperModeContext.Provider>
    )
}
