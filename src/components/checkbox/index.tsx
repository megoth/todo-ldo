import {ButtonHTMLAttributes, DetailedHTMLProps, forwardRef, ReactNode} from "react";

type CheckboxProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    children?: ReactNode;
    help?: string;
}

const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(({children, help, ...props}, ref) => {
    return (
        <label className="checkbox">
            <input type="checkbox" {...props} ref={ref}/>
            <span className="ml-1">{children}</span>
            {help && <p className="help">{help}</p>}
        </label>
    )
});
Checkbox.displayName = "Checkbox";
export default Checkbox;