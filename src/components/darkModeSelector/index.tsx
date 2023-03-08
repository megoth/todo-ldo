import React, {HTMLAttributes, useEffect} from "react";
import {prefersDarkModeScheme} from "@/libs/window";
import Button from "@/components/button";
import useLocalStorage from "use-local-storage";
import {BsSun, BsSunglasses} from "react-icons/bs";

interface Props extends HTMLAttributes<HTMLAnchorElement | HTMLButtonElement> {
    className?: string;
}

export default function DarkModeSelector({className, ...props}: Props) {
    const [darkMode, setDarkMode] = useLocalStorage<boolean>("darkMode", prefersDarkModeScheme());
    useEffect(() => toggleDarkMode(darkMode));

    function toggleDarkMode(dark: boolean) {
        const classList = document.querySelector("html")?.classList;
        classList?.toggle("dark", dark);
        classList?.toggle("light", !dark);
        setDarkMode(dark);
    }

    return (
        <Button
            className="is-dark"
            type="button"
            onClick={() => toggleDarkMode(!darkMode)}
            {...props}
        >
            {darkMode ? (
                <>
                    <span>Dark mode</span>
                    <span className="icon"><BsSunglasses/></span>
                </>
            ) : (
                <>
                    <span>Light mode</span>
                    <span className="icon"><BsSun/></span>
                </>
            )}
        </Button>
    );
}

DarkModeSelector.defaultProps = {
    className: null,
};
