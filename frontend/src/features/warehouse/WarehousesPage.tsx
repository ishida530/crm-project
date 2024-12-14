import { useState } from 'react';
import DeleteWarehouseAlertDialog from './DeleteWarehouseAlertDialog';
import EditWarehouseDialog from './EditWarehouseDialog';
import { useCreateWarehouse } from './hooks/useCreateWarehouse';
import { useDeleteWarehouse } from './hooks/useDeleteWarehouse';
import useGetAllWarehouses from './hooks/useGetAllWarehouses';
import { useUpdateWarehouse } from './hooks/useUpdateWarehouse';
import TableWarehouses from './TableWarehouses ';
import { Warehouse } from './types';

const WarehousesPage = () => {
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [selectedWarehouse, setSelectedWarehouse] = useState<Warehouse | null>(null);
    const [warehouseId, setWarehouseId] = useState<number | null>(null);

    const { warehouses, error, isLoading } = useGetAllWarehouses();
    const { mutate: updateWarehouse } = useUpdateWarehouse();
    const { mutate: deleteWarehouse } = useDeleteWarehouse();
    const { mutate: createWarehouse } = useCreateWarehouse();

    const handleEditWarehouse = (warehouse: Warehouse) => {
        setIsEdit(true);
        setSelectedWarehouse(warehouse);
        setIsOpenEditModal(true);
    };

    const handleUpdate = (updatedWarehouse: Warehouse) => {
        if (isEdit && selectedWarehouse) {
            updateWarehouse({ ...updatedWarehouse, id: selectedWarehouse.id });
        } else {
            createWarehouse(updatedWarehouse);
        }

        setIsOpenEditModal(false);
        setIsEdit(false);
        setSelectedWarehouse(null);
    };

    const handleDeleteWarehouse = (warehouseId: number) => {
        setWarehouseId(warehouseId);
        setIsOpenDeleteModal(true);
    };

    const handleDelete = () => {
        if (warehouseId) {
            deleteWarehouse(warehouseId);
        }
        setIsOpenDeleteModal(false);
    };

    const handleCreateWarehouse = () => {
        setIsEdit(false);
        setSelectedWarehouse(null);
        setIsOpenEditModal(true);
    };

    if (isLoading) return <div>Loading warehouses...</div>;
    if (error) return <div>Error loading warehouses: {error.message}</div>;

    return (
        <div>
            <TableWarehouses
                warehouses={warehouses}
                onAddWarehouse={handleCreateWarehouse}
                onEditWarehouse={handleEditWarehouse}
                onDeleteWarehouse={handleDeleteWarehouse}
            />
            {isOpenEditModal && (
                <EditWarehouseDialog
                    initialValues={isEdit ? selectedWarehouse : undefined}
                    onSave={handleUpdate}
                    isOpen={isOpenEditModal}
                    onClose={() => setIsOpenEditModal(false)}
                />
            )}
            {isOpenDeleteModal && warehouseId && (
                <DeleteWarehouseAlertDialog
                    onSave={handleDelete}
                    isOpen={isOpenDeleteModal}
                    onClose={() => setIsOpenDeleteModal(false)}
                />
            )}
        </div>
    );
};

export default WarehousesPage;
