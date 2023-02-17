import React, {HTMLAttributes, useEffect, useState} from "react";
import {prefersDarkModeScheme} from "@/libs/window";
import Button from "@/components/button";
import useLocalStorage from "use-local-storage";

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
            type="button"
            onClick={() => toggleDarkMode(!darkMode)}
            {...props}
        >
            {darkMode ? <span>🌙 Dark mode</span> : <span>💡 Light mode</span>}
        </Button>
    );
}

DarkModeSelector.defaultProps = {
    className: null,
};
