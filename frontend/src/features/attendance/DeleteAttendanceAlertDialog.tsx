import React from 'react';

type DeleteAttendanceAlertDialogProps = {
    onSave: () => void;
    isOpen: boolean;
    onClose: () => void;
};

const DeleteAttendanceAlertDialog = ({
    onSave,
    isOpen,
    onClose,
}: DeleteAttendanceAlertDialogProps) => {
    if (!isOpen) return null;

    return (
        <div>
            <p>Are you sure you want to delete this attendance?</p>
            <button onClick={onSave}>Yes</button>
            <button onClick={onClose}>No</button>
        </div>
    );
};

export default DeleteAttendanceAlertDialog;
