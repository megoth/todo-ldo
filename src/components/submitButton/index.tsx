import {AnchorHTMLAttributes, ButtonHTMLAttributes, DetailedHTMLProps, ReactNode} from "react";
import Button from "@/components/button";
import FlexBar from "@/components/flexBar";

type SubmitButtonProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>
    & DetailedHTMLProps<AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>
    & {
    children: ReactNode;
}

export default function SubmitButton({children, ...props}: SubmitButtonProps) {
    return (
        <FlexBar align="center" className="mb-5">
            <Button variant="primary" type="submit" {...props}>{children}</Button>
        </FlexBar>
    )
}