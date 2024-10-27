import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import useGetAllUsers from "./hooks/useGetAllUsers";
import { Edit, Trash } from 'lucide-react';
import { User } from './types';



interface TableUsers {
    onEditUser: (user: User) => void
    onDeleteUser: (userId: number) => void
}
const TableUsers = ({ onEditUser, onDeleteUser }: TableUsers) => {
    const { users, error, isLoading } = useGetAllUsers();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div className="overflow-x-auto">
            <Table className="min-w-full">
                <TableCaption>A list of your users with details.</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>ID</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Name</TableHead>
                        <TableHead>Phone Number</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {users?.map((user) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.id}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.name}</TableCell>
                            <TableCell>{user.phoneNumber}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>
                                <Button
                                    variant="ghost"
                                    onClick={() => onEditUser(user)}
                                >
                                    <Edit className="w-5 h-5" />
                                </Button>
                                <Button

                                    onClick={() => onDeleteUser(user.id)}
                                    className="text-red-600">
                                    <Trash size={20} className="w-5 h-5" />
                                </Button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default TableUsers;
