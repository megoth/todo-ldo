import {ButtonHTMLAttributes, DetailedHTMLProps, forwardRef, ReactNode} from "react";
import styles from "./styles.module.css";

type CheckboxProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    children?: ReactNode;
}

const CheckboxToggle = forwardRef<HTMLInputElement, CheckboxProps>(({children, ...props}, ref) => {
    return (
        <label className={styles.label}>
            <input className={styles.checkbox} type={"checkbox"} {...props} ref={ref}/>
            <span className={styles.labelText}>{children}</span>
        </label>
    )
});
export default CheckboxToggle;