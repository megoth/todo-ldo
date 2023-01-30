import {createContext, ReactNode, useState} from "react";

interface EditModeContextProps {
    editMode: boolean
    setEditMode: (editMode: boolean) => void
    updating: boolean
    setUpdating: (updating: boolean) => void
}
const EditModeContext = createContext<EditModeContextProps>({
    editMode: false,
    setEditMode: () => {},
    updating: false,
    setUpdating: () => {},
});
export default EditModeContext;

interface EditModeContextProviderProps {
    children: ReactNode;
}
export function EditModeContextProvider({ children }: EditModeContextProviderProps) {
    const [editMode, setEditMode] = useState<boolean>(false);
    const [updating, setUpdating] = useState<boolean>(false);
    return (
        <EditModeContext.Provider value={{editMode, setEditMode, updating, setUpdating}}>
            {children}
        </EditModeContext.Provider>
    )
}
