import React, {useEffect} from "react";
import {useRouter} from "next/router";
import Loading from "@/components/loading";

interface RedirectProps {
    url: string;
}

export default function Redirect({url}: RedirectProps) {
    const router = useRouter();
    useEffect(() => {
        router.push(url);
    }, [router, url])
    return <Loading />;
}