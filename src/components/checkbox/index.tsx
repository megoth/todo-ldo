import {ReactNode} from "react";
import {Controller, ControllerProps} from "react-hook-form";
import styles from "./styles.module.css";

type CheckboxProps = Omit<ControllerProps, "render"> & {
    children?: ReactNode;
}

export default function Checkbox({children, ...props}: CheckboxProps) {
    return (
        <label className={styles.label}>
            <Controller
                {...props}
                render={({field}) => <input className={styles.checkbox} type={"checkbox"} {...field}/>}
            />
            <span className={styles.labelText}>{children}</span>
        </label>
    )
}