import {useSession} from "@inrupt/solid-ui-react";

export default function LogoutButton() {
    const {logout} = useSession();
    return <button onClick={(event) => logout()}>Log out</button>
}