import { useState } from 'react';
import { CustomerGroup } from './types';

import CustomerGroupTable from './CustomerGroupTable';
import { useCreateCustomerGroup } from './hooks/useCreateCustomerGroup';
import { useUpdateCustomerGroup } from './hooks/useUpdateCustomerGroup';
import { useDeleteCustomerGroup } from './hooks/useDeleteCustomerGroup';
import useGetAllCustomersGroup from './hooks/useGetAllCustomerGroup';
import EditCustomerGroupDialog from './EditCustomerGroupDialog';

const CustomerGroupPage = () => {
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [selectedCustomerGroup, setSelectedCustomerGroup] = useState<CustomerGroup | null>(null);
    const [customerGroupId, setCustomerGroupId] = useState<number | null>(null);

    const { customersGroup, error, isLoading } = useGetAllCustomersGroup();
    const { mutate: updateCustomerGroup } = useUpdateCustomerGroup();
    const { mutate: deleteCustomerGroup } = useDeleteCustomerGroup();
    const { mutate: createCustomerGroup } = useCreateCustomerGroup();

    const handleEditCustomerGroup = (customerGroup: CustomerGroup) => {
        setIsEdit(true);
        setSelectedCustomerGroup(customerGroup);
        setIsOpenEditModal(true);
    };

    const handleUpdate = (updatedGroup: CustomerGroup) => {
        if (isEdit && selectedCustomerGroup) {
            updateCustomerGroup({ ...updatedGroup, id: selectedCustomerGroup.id });
        } else {
            createCustomerGroup(updatedGroup);
        }

        setIsOpenEditModal(false);
        setIsEdit(false);
        setSelectedCustomerGroup(null);
    };

    const handleDeleteCustomerGroup = (customerGroupId: number) => {
        setCustomerGroupId(customerGroupId);
        setIsOpenDeleteModal(true);
    };

    const handleDelete = () => {
        if (customerGroupId) {
            deleteCustomerGroup(customerGroupId);
        }
        setIsOpenDeleteModal(false);
    };

    const handleCreateCustomerGroup = () => {
        setIsEdit(false);
        setSelectedCustomerGroup(null);
        setIsOpenEditModal(true);
    };

    if (isLoading) return <div>Loading customer groups...</div>;
    if (error) return <div>Error loading customer groups: {error.message}</div>;

    return (
        <div>
            <CustomerGroupTable
                customerGroups={customersGroup ? customersGroup : []}
                onAddGroup={handleCreateCustomerGroup}
                onEditGroup={handleEditCustomerGroup}
                onDeleteGroup={handleDeleteCustomerGroup}
            />
            {isOpenEditModal && (
                <EditCustomerGroupDialog
                    initialValues={isEdit ? selectedCustomerGroup : undefined}
                    onSave={handleUpdate}
                    isOpen={isOpenEditModal}
                    onClose={() => setIsOpenEditModal(false)}
                />
            )}
            {isOpenDeleteModal && customerGroupId && (
                <DeleteCustomerGroupAlertDialog
                    onSave={handleDelete}
                    isOpen={isOpenDeleteModal}
                    onClose={() => setIsOpenDeleteModal(false)}
                />
            )}
        </div>
    );
};

export default CustomerGroupPage;
