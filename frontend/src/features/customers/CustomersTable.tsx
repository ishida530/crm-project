import React, { useState, useMemo } from "react";
import {
    useReactTable,
    getCoreRowModel,
    flexRender,
    SortingState,
    getSortedRowModel,
} from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";  // Import Select component
import { Customer } from './types';

interface TableCustomersProps {
    onEditCustomer: (customer: Customer) => void;
    onDeleteCustomer: (customerId: number) => void;
    customers: Customer[] | undefined;
    onAddCustomer: () => void;
}

const TableCustomers = ({ customers = [], onEditCustomer, onDeleteCustomer, onAddCustomer }: TableCustomersProps) => {
    const [searchInput, setSearchInput] = useState<string>(""); 
    const [selectedGroup, setSelectedGroup] = useState<string>("all");
    const [sorting, setSorting] = useState<SortingState>([]); // State to track sorting

    const filteredData = useMemo(() => {
        return customers.filter((customer: Customer) => {
            const matchesSearch = 
                !searchInput ||
                customer.contactName.toLowerCase().includes(searchInput.toLowerCase()) ||
                customer.email.toLowerCase().includes(searchInput.toLowerCase()) ||
                customer.address.toLowerCase().includes(searchInput.toLowerCase()) ||
                customer.nip.toLowerCase().includes(searchInput.toLowerCase()) ||
                customer.website.toLowerCase().includes(searchInput.toLowerCase()) ||
                customer.group?.name.toLowerCase().includes(searchInput.toLowerCase());
            
            const matchesGroup = 
                selectedGroup === "all" || customer.group?.name.toLowerCase() === selectedGroup.toLowerCase();

            return matchesSearch && matchesGroup;
        });
    }, [searchInput, customers, selectedGroup]);

    const columns = useMemo(() => [
        {
            accessorKey: "id",
            header: "ID",
            // Enable sorting for this column
            enableSorting: true,
        },
        {
            accessorKey: "contactName",
            header: "Nazwa kontaktu",
            enableSorting: true,
        },
        {
            accessorKey: "email",
            header: "Email",
            enableSorting: true,
        },
        {
            accessorKey: "address",
            header: "Adres",
            enableSorting: true,
        },
        {
            accessorKey: "nip",
            header: "NIP",
            enableSorting: true,
        },
        {
            accessorKey: "website",
            header: "Strona WWW",
            enableSorting: true,
        },
        {
            accessorKey: "group",
            header: "Grupa",
            cell: ({ row }) => {
                return row.original.group ? row.original.group.name : '';
            },
            enableSorting: true,
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
        state: { sorting },
        onSortingChange: setSorting, // Update sorting state when it changes
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    // Get unique groups for the select options
    const groups = useMemo(() => {
        const groupNames = new Set(customers.map((customer) => customer.group?.name).filter(Boolean));
        return Array.from(groupNames);
    }, [customers]);

    return (
        <div className="w-full">
            <div className="flex items-center justify-between py-4">
                <Input
                    placeholder="Filtruj klientów..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="max-w-sm"
                />
                {/* Add Select filter for groups */}
                <Select value={selectedGroup} onValueChange={setSelectedGroup} className="max-w-sm ml-4">
                    <SelectTrigger>
                        <SelectValue placeholder="Wybierz grupę" />
                    </SelectTrigger>
                    <SelectContent>
                        {/* Set the value for "All groups" to 'all' */}
                        <SelectItem value="all">Wszystkie grupy</SelectItem>
                        {groups.map((group) => (
                            <SelectItem key={group} value={group}>
                                {group}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
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
                                        {/* Click handler for sorting */}
                                        <Button
                                            variant="ghost"
                                            className="text-left"
                                            onClick={() => {
                                                table.getColumn(header.id)?.toggleSorting();
                                            }}
                                        >
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </Button>
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
