import * as React from "react";
import {
    ColumnDef,
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    SortingState,
    ColumnFiltersState,
    VisibilityState,
    flexRender,
} from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { User } from './types';

interface TableUsersProps {
    onEditUser: (user: User) => void;
    onDeleteUser: (userId: number) => void;
    users: User[];
    onAddUser: () => void; 
}

const TableUsers = ({ users, onEditUser, onDeleteUser, onAddUser }: TableUsersProps) => {
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [searchInput, setSearchInput] = React.useState<string>("");

    const columns: ColumnDef<User>[] = [
        {
            accessorKey: "id",
            header: "ID",
            enableSorting: false,
        },
        {
            accessorKey: "email",
            header: "Email",
            filterFn: 'includesString',
        },
        {
            accessorKey: "name",
            header: "Name",
            filterFn: 'includesString',
        },
        {
            accessorKey: "phoneNumber",
            header: "Phone Number",
        },
        {
            accessorKey: "role",
            header: "Role",
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {
                const user = row.original;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => onEditUser(user)}>
                                Edytuj użytkownika
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => onDeleteUser(user.id)}
                                className="text-red-600"
                            >
                                Usuń użytkownika
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    const table = useReactTable({
        data: users || [],
        columns,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
    });

    return (
        <div className="w-full">
            <div className="flex items-center justify-between py-4">
                {/* Search Input */}
                <Input
                    placeholder="Filtruj użytkowników..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="max-w-sm"
                />

                {/* Add User Button */}
                <Button variant="outline" onClick={onAddUser} className="ml-4">
                    Dodaj użytkownika
                </Button>
            </div>

            <div className="overflow-x-auto rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel()?.rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    className="w-full hover:cursor-pointer"
                                    onClick={row.getToggleExpandedHandler()}
                                >
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id} className="w-full">
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="h-24 text-center">
                                    Brak danych.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default TableUsers;
