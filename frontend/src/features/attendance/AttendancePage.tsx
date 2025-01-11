import React, { useState } from "react";
import { Attendance } from "./types";
import TableAttendance from "./TableAttendance";

import EditAttendanceDialog from "./EditAttendanceDialog";
import DeleteAttendanceAlertDialog from "./DeleteAttendanceAlertDialog";
// import useGetAllAttendances from "./hooks/useGetAllAttendances";
import { useUpdateAttendance } from "./hooks/useUpdateAttendance";
import { useDeleteAttendance } from "./hooks/useDeleteAttendance";
import { useCreateAttendance } from "./hooks/useCreateAttendance";

const AttendancePage = () => {
    const [isOpenEditModal, setIsOpenEditModal] = useState<boolean>(false);
    const [isEdit, setIsEdit] = useState<boolean>(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState<boolean>(false);
    const [selectedAttendance, setSelectedAttendance] = useState<Attendance | null>(null);
    const [attendanceId, setAttendanceId] = useState<number | null>(null);

    // const { attendances, error, isLoading } = useGetAllAttendances();
    const { mutate: updateAttendance } = useUpdateAttendance();
    const { mutate: deleteAttendance } = useDeleteAttendance();
    const { mutate: createAttendance } = useCreateAttendance();

    const handleEditAttendance = (attendance: Attendance) => {
        setIsEdit(true);
        setSelectedAttendance(attendance);
        setIsOpenEditModal(true);
    };

    const handleUpdate = (updatedAttendance: Attendance) => {
        createAttendance(updatedAttendance);
        setIsOpenEditModal(false);
        setIsEdit(false);
        setSelectedAttendance(null);
    };

    const handleDeleteAttendance = (attendanceId: number) => {
        setAttendanceId(attendanceId);
        setIsOpenDeleteModal(true);
    };

    const handleDelete = () => {
        if (attendanceId) {
            deleteAttendance(attendanceId);
        }
        setIsOpenDeleteModal(false);
    };

    const handleCreateAttendance = () => {
        setIsEdit(false);
        setSelectedAttendance(null);
        setIsOpenEditModal(true);
    };

    // if (isLoading) return <div>Loading attendance...</div>;
    // if (error) return <div>Error loading attendance: {error.message}</div>;

    return (
        <div>
            <TableAttendance
                // attendances={attendances}
                onChangeSelectValue={createAttendance}
                onAddAttendance={handleCreateAttendance}
                onEditAttendance={updateAttendance}
                onDeleteAttendance={handleDeleteAttendance}
            />
            {isOpenEditModal && (
                <EditAttendanceDialog
                    initialValues={isEdit ? selectedAttendance : undefined}
                    onSave={handleUpdate}
                    isOpen={isOpenEditModal}
                    onClose={() => setIsOpenEditModal(false)}
                />
            )}
            {isOpenDeleteModal && attendanceId && (
                <DeleteAttendanceAlertDialog
                    onSave={handleDelete}
                    isOpen={isOpenDeleteModal}
                    onClose={() => setIsOpenDeleteModal(false)}
                />
            )}
        </div>
    );
};

export default AttendancePage;
