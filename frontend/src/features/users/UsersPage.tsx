import React, { useState } from 'react';
import TableUsers from './TableUsers';
import { User } from './types';
import EditUserDialog from './EditUserDialog';
import { useUpdateUser } from './hooks/useUpdateUser';
import DeleteUserAlertDialog from './DeleteUserAlertDialog';
import { useDeleteUser } from './hooks/useDeleteUser';
import { Button } from '@/components/ui/button';
import { useCreateUser } from './hooks/useCreateUser';
import useGetAllUsers from './hooks/useGetAllUsers';

const UsersPage = () => {
    const [isOpenEditModal, setIsOpenEditModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [isOpenDeleteModal, setIsOpenDeleteModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [userId, setUserId] = useState<number | null>(null);

    const { users, error, isLoading } = useGetAllUsers();
    const { mutate: updateUser } = useUpdateUser();
    const { mutate: deleteUser } = useDeleteUser();
    const { mutate: createUser } = useCreateUser();
    const handleEditUser = (user: User) => {
        setIsEdit(true);
        setSelectedUser(user);
        setIsOpenEditModal(true);
    };

    const handleUpdate = (updatedProfile: User) => {
        if (isEdit && selectedUser) {
            updateUser({ userId: selectedUser.id, userData: updatedProfile });
        } else {
            createUser(updatedProfile);
        }

        setIsOpenEditModal(false);
        setIsEdit(false);
        setSelectedUser(null);
    };

    const handleDeleteUser = (userId: number) => {
        setUserId(userId);
        setIsOpenDeleteModal(true);
    };

    const handleDelete = () => {
        if (userId) {
            deleteUser(userId);
        }
        setIsOpenDeleteModal(false);
    };

    const handleCreateUser = () => {
        setIsEdit(false);
        setSelectedUser(null);
        setIsOpenEditModal(true);
    };

    if (isLoading) return <div>Loading users...</div>;
    if (error) return <div>Error loading users: {error.message}</div>;
    console.log(users)
    return (
        <div>
            <TableUsers
                users={users}
                onAddUser={handleCreateUser}
                onEditUser={handleEditUser}
                onDeleteUser={handleDeleteUser}
            />
            {isOpenEditModal && (
                <EditUserDialog
                    initialValues={isEdit ? selectedUser : undefined}
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
};

export default UsersPage;
