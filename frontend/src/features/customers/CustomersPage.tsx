import { useState } from 'react';
import { Customer } from './types';
import { useUpdateCustomer } from './hooks/useUpdateCustomer';
import { useDeleteCustomer } from './hooks/useDeleteCustomer';
import { useCreateCustomer } from './hooks/useCreateCustomer';
import useGetAllCustomers from './hooks/useGetAllCustomers';
import TableCustomers from './CustomersTable';
import EditCustomerDialog from './EditCustomerDialog';
import DeleteCustomerAlertDialog from './DeleteUserAlertDialog';

const CustomersPage = () => {
  const [isOpenEditModal, setIsOpenEditModal] = useState(false);
  const [isEdit, setIsEdit] = useState(false);
  const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customerId, setCustomerId] = useState<number | null>(null);

  const { customers, error, isLoading } = useGetAllCustomers();
  const { mutate: updateCustomer } = useUpdateCustomer();
  const { mutate: deleteCustomer } = useDeleteCustomer();
  const { mutate: createCustomer } = useCreateCustomer();

  const handleEditCustomer = (customer: Customer) => {
    setIsEdit(true);
    setSelectedCustomer(customer);
    setIsOpenEditModal(true);
  };

  const handleUpdate = (updatedProfile: Customer) => {
    if (isEdit && selectedCustomer) {
      updateCustomer({ ...updatedProfile, id: selectedCustomer.id, });
    } else {
      createCustomer(updatedProfile);
    }

    setIsOpenEditModal(false);
    setIsEdit(false);
    setSelectedCustomer(null);
  };

  const handleDeleteCustomer = (customerId: number) => {
    console.log(customerId)
    setCustomerId(customerId);
    setIsOpenDeleteModal(true);
  };

  const handleDelete = () => {
    if (customerId) {
      deleteCustomer(customerId);
    }
    setIsOpenDeleteModal(false);
  };

  const handleCreateCustomer = () => {
    setIsEdit(false);
    setSelectedCustomer(null);
    setIsOpenEditModal(true);
  };

  if (isLoading) return <div>Loading customers...</div>;
  if (error) return <div>Error loading customers: {error.message}</div>;

  return (
    <div>
      <TableCustomers
        customers={customers}
        groups
        onAddCustomer={handleCreateCustomer}
        onEditCustomer={handleEditCustomer}
        onDeleteCustomer={handleDeleteCustomer}
      />
      {isOpenEditModal && (
        <EditCustomerDialog
          initialValues={isEdit ? selectedCustomer : undefined}
          onSave={handleUpdate}
          isOpen={isOpenEditModal}
          onClose={() => setIsOpenEditModal(false)}
        />
      )}
      {isOpenDeleteModal && customerId && (
        <DeleteCustomerAlertDialog
          onSave={handleDelete}
          isOpen={isOpenDeleteModal}
          onClose={() => setIsOpenDeleteModal(false)}
        />
      )}
    </div>
  );
};

export default CustomersPage;
