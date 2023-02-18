import {AnchorHTMLAttributes, ButtonHTMLAttributes, DetailedHTMLProps, ReactNode} from "react";
import Button from "@/components/button";
import Center from "@/components/center";

type SubmitButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
    & DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
    & {
    children: ReactNode;
}

export default function SubmitButton({children, ...props}: SubmitButtonProps) {
    return (
        <Center>
            <Button variant="primary" shadow="full" type="submit" {...props}>{children}</Button>
        </Center>
    )
}