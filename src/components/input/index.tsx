import {
    DetailedHTMLProps,
    forwardRef, InputHTMLAttributes,
    ReactNode
} from "react";
import styles from "./styles.module.css";
import clsx from "clsx";

type InputProps = {
    children: ReactNode;
    className?: string;
} & DetailedHTMLProps<InputHTMLAttributes<HTMLInputElement>, HTMLInputElement>;

const Input = forwardRef<HTMLInputElement, InputProps>(({children, ...props}, ref) => {
    return (
        <label className={styles.label}>
            <span className={styles.labelText}>{children}</span>
            <input ref={ref} type="text" {...props} className={clsx(styles.input, props.className)}/>
        </label>
    )
});
Input.displayName = "Input";

export default Input;