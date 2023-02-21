import {ButtonHTMLAttributes, DetailedHTMLProps, forwardRef, ReactNode} from "react";
import styles from "./styles.module.css";

type CheckboxMarkProps = DetailedHTMLProps<ButtonHTMLAttributes<HTMLInputElement>, HTMLInputElement> & {
    children?: ReactNode;
}

const CheckboxMark = forwardRef<HTMLInputElement, CheckboxMarkProps>(({children, ...props}, ref) => {
    return (
        <label className={styles.label}>
            <input className={styles.checkbox} type={"checkbox"} {...props} ref={ref}/>
            <span className={styles.labelText}>{children}</span>
        </label>
    )
});
export default CheckboxMark;