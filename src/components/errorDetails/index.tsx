import React from "react";

interface ErrorDetailsProps {
    error: unknown
}

export default function ErrorDetails({ error }: ErrorDetailsProps) {
    return <div>
        <h2>Something went wrong...</h2>
        <pre>
            {error?.toString()}
        </pre>
    </div>
}