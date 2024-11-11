import React, { useState, useMemo } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
    flexRender,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Customer } from './types';

interface TableCustomersProps {
    onEditCustomer: (customer: Customer) => void;
    onDeleteCustomer: (customerId: number) => void;
    customers: Customer[] | undefined;
    onAddCustomer: () => void;
}

const TableCustomers = ({ customers = [], onEditCustomer, onDeleteCustomer, onAddCustomer }: TableCustomersProps) => {
    const [searchInput, setSearchInput] = useState<string>("");

    const filteredData = useMemo(() => {
        if (!searchInput) return customers;
        return customers.filter(
            (customer) =>
                customer.contactName.toLowerCase().includes(searchInput.toLowerCase()) ||
                customer.email.toLowerCase().includes(searchInput.toLowerCase()) ||
                customer.address.toLowerCase().includes(searchInput.toLowerCase()) ||
                customer.nip.toLowerCase().includes(searchInput.toLowerCase()) ||
                customer.website.toLowerCase().includes(searchInput.toLowerCase())
        );
    }, [searchInput, customers]);

    const columns = useMemo(() => [
        {
            accessorKey: "id",
            header: "ID",
        },
        {
            accessorKey: "contactName",
            header: "Nazwa kontaktu",
        },
        {
            accessorKey: "email",
            header: "Email",
        },
        {
            accessorKey: "address",
            header: "Adres",
        },
        {
            accessorKey: "nip",
            header: "NIP",
        },
        {
            accessorKey: "website",
            header: "Strona WWW",
        },
        {
            id: "actions",
            header: "Akcje",
            cell: ({ row }) => {
                const customer = row.original;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Otwórz menu</span>
                                <MoreHorizontal className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Akcje</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => onEditCustomer(customer)}>
                                Edytuj klienta
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => onDeleteCustomer(customer.id)}
                                className="text-red-600"
                            >
                                Usuń klienta
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ], [onEditCustomer, onDeleteCustomer]);

    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    return (
        <div className="w-full">
            <div className="flex items-center justify-between py-4">
                <Input
                    placeholder="Filtruj klientów..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="max-w-sm"
                />
                <Button variant="outline" onClick={onAddCustomer} className="ml-4">
                    Dodaj klienta
                </Button>
            </div>

            <div className="overflow-x-auto rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length} className="text-center">
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

export default TableCustomers;
