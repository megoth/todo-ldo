import LoginForm from "@/components/loginForm";
import {useSession} from "@inrupt/solid-ui-react";
import {ReactNode} from "react";

interface LayoutContentProps {
    children: ReactNode;
}

export default function LayoutContent({children}: LayoutContentProps) {
    const {sessionRequestInProgress, session: {info: {isLoggedIn}}} = useSession();
    return (
        <>
            {isLoggedIn && children}
            {!isLoggedIn && !sessionRequestInProgress && <LoginForm/>}
        </>
    )
}