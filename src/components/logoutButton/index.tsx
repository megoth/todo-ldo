import {useSession} from "@inrupt/solid-ui-react";
import Button from "@/components/button";

export default function LogoutButton() {
    const {logout} = useSession();
    return <Button onClick={() => logout()}>Log out</Button>
}