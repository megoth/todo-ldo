import React, {ReactNode} from "react";
import Button from "@/components/button";

interface FormModalProps {
    children: ReactNode;
    hideModal: () => void;
    title: string;
}

export default function FormModal({children, hideModal, title}: FormModalProps) {
    return (
        <div className="modal is-active" style={{display: "flex"}}>
            <div className="modal-background"/>
            <div className="modal-card">
                <div className="modal-card-head">
                    <div className="modal-card-title">{title}</div>
                    <button className="delete" onClick={hideModal} aria-label="Close modal" type="reset"/>
                </div>
                <div className="modal-card-body">{children}</div>
                <div className="modal-card-foot">
                    <Button type="submit" variant="primary">Submit</Button>
                    <Button type="reset">Cancel</Button>
                </div>
            </div>
        </div>
    )
}