import { useState } from 'react';
import TableUsers from './TableUsers';
import { User } from './types';
import EditUserDialog from './EditUserDialog';
import { useUpdateUser } from './hooks/useUpdateUser';
import DeleteUserAlertDialog from './DeleteUserAlertDialog';
import { useDeleteUser } from './hooks/useDeleteUser';
import { Button } from '@/components/ui/button';
import useCreateUser from './hooks/useCreateUser';

const UsersPage = () => {
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User>();
    const [userId, setUserId] = useState<number>();

    const { mutate: updateUser } = useUpdateUser();
    const { mutate: deleteUser } = useDeleteUser();
    const { mutate: createUser } = useCreateUser();

    const handleEditUser = (user: User) => {
        setIsEdit(true)
        setSelectedUser(user);
        setIsOpenEditModal(true);
    };
    const handleUpdate = (updatedProfile: User) => {

        if (isEdit && selectedUser) return updateUser({ userId: selectedUser.id, userData: updatedProfile });
        if (!isEdit && !selectedUser) return createUser();

        setIsOpenEditModal(false);
        setIsEdit(false)
    };

    const handleDeleteUser = (userId: number) => {
        setUserId(userId);
        setIsOpenDeleteModal(true);

    };
    const handleDelete = () => {
        console.log(userId)
        if (userId) return deleteUser(userId);
        setIsOpenDeleteModal(false);
    };

    const handleCreateUser = () => {
        setIsEdit(false)
        setIsOpenEditModal(true)
    }
    return (
        <div>
            <Button onClick={handleCreateUser}>
                Dodaj Uzytkownika
            </Button>
            <TableUsers onEditUser={handleEditUser} onDeleteUser={handleDeleteUser} />
            {isOpenEditModal && (
                <EditUserDialog
                    initialValues={selectedUser}
                    onSave={handleUpdate}
                    isOpen={isOpenEditModal}
                    onClose={() => setIsOpenEditModal(false)}
                />
            )}
            {isOpenDeleteModal && userId && (
                <DeleteUserAlertDialog
                    onSave={handleDelete}
                    isOpen={isOpenDeleteModal}
                    onClose={() => setIsOpenDeleteModal(false)}
                />
            )}
        </div>
    );
}
export default UsersPage;
