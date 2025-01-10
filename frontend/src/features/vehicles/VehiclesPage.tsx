import React, { useState } from 'react';
import TableVehicles from './TableVehicles';
import useGetAllVehicles from './hooks/useGetAllVehicles';
import { useUpdateVehicle } from './hooks/useUpdateVehicle';
import { useDeleteVehicle } from './hooks/useDeleteVehicle';
import { useCreateVehicle } from './hooks/useCreateVehicle';
import EditVehicleDialog from './EditVehicleDialog';
import DeleteVehicleAlertDialog from './DeleteVehicleAlertDialog';
import { Vehicle } from './types';

const VehiclesPage = () => {
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [selectedVehicle, setSelectedVehicle] = useState<Vehicle | null>(null);
    const [vehicleId, setVehicleId] = useState<number | null>(null);

    const { vehicles, error, isLoading } = useGetAllVehicles();
    const { mutate: updateVehicle } = useUpdateVehicle();
    const { mutate: deleteVehicle } = useDeleteVehicle();
    const { mutate: createVehicle } = useCreateVehicle();

    const handleEditVehicle = (vehicle: Vehicle) => {
        setIsEdit(true);
        setSelectedVehicle(vehicle);
        setIsOpenEditModal(true);
    };

    const handleUpdate = (updatedProfile: Vehicle) => {
        if (isEdit && selectedVehicle) {
            updateVehicle({ vehicleId: selectedVehicle.id, vehicleData: updatedProfile });
        } else {
            createVehicle(updatedProfile);
        }

        setIsOpenEditModal(false);
        setIsEdit(false);
        setSelectedVehicle(null);
    };

    const handleDeleteVehicle = (vehicleId: number) => {
        setVehicleId(vehicleId);
        setIsOpenDeleteModal(true);
    };

    const handleDelete = () => {
        if (vehicleId) {
            deleteVehicle(vehicleId);
        }
        setIsOpenDeleteModal(false);
    };

    const handleCreateVehicle = () => {
        setIsEdit(false);
        setSelectedVehicle(null);
        setIsOpenEditModal(true);
    };

    if (isLoading) return <div>Loading vehicles...</div>;
    if (error) return <div>Error loading vehicles: {error.message}</div>;

    return (
        <div>
            <TableVehicles
                vehicles={vehicles && vehicles}
                onAddVehicle={handleCreateVehicle}
                onEditVehicle={handleEditVehicle}
                onDeleteVehicle={handleDeleteVehicle}
            />
            {isOpenEditModal && (
                <EditVehicleDialog
                    initialValues={isEdit ? selectedVehicle : undefined}
                    onSave={handleUpdate}
                    isOpen={isOpenEditModal}
                    onClose={() => setIsOpenEditModal(false)}
                />
            )}
            {isOpenDeleteModal && vehicleId && (
                <DeleteVehicleAlertDialog
                    onSave={handleDelete}
                    isOpen={isOpenDeleteModal}
                    onClose={() => setIsOpenDeleteModal(false)}
                />
            )}
        </div>
    );
};

export default VehiclesPage;
