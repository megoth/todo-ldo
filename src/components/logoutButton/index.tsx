import React from "react";
import {useSession} from "@inrupt/solid-ui-react";
import Button from "@/components/button";

export default function LogoutButton() {
    const {logout} = useSession();
    return <Button className="is-dark" onClick={() => logout()}>Log out</Button>
}