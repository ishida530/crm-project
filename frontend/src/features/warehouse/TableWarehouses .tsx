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
import { Warehouse } from './types';
import { Link } from "react-router-dom";

interface TableWarehousesProps {
    onEditWarehouse: (warehouse: Warehouse) => void;
    onDeleteWarehouse: (warehouseId: number) => void;
    warehouses: Warehouse[] | undefined;
    onAddWarehouse: () => void;
}

const TableWarehouses = ({ warehouses = [], onEditWarehouse, onDeleteWarehouse, onAddWarehouse }: TableWarehousesProps) => {
    const [searchInput, setSearchInput] = useState<string>("");
    const [selectedProducer, setSelectedProducer] = useState<string>("all");
    const [sorting, setSorting] = useState<SortingState>([]);

    const filteredData = useMemo(() => {
        return warehouses.filter((warehouse: Warehouse) => {
            const matchesSearch =
                !searchInput ||
                warehouse.name.toLowerCase().includes(searchInput.toLowerCase()) ||
                warehouse.address.toLowerCase().includes(searchInput.toLowerCase()) ||
                warehouse.products.some((product) =>
                    product.producer.toLowerCase().includes(searchInput.toLowerCase()) ||
                    product.name.toLowerCase().includes(searchInput.toLowerCase())
                );

            const matchesProducer =
                selectedProducer === "all" ||
                warehouse.products.some((product) =>
                    product.producer.toLowerCase() === selectedProducer.toLowerCase()
                );

            return matchesSearch && matchesProducer;
        });
    }, [searchInput, warehouses, selectedProducer]);

    const columns = useMemo(() => [
        {
            accessorKey: "id",
            header: "ID",
            enableSorting: true,
        },
        {
            accessorKey: "name",
            header: "Nazwa magazynu",
            enableSorting: true,
        },
        {
            accessorKey: "address",
            header: "Adres",
            enableSorting: true,
        },
        {
            id: "actions",
            header: "Akcje",
            cell: ({ row }) => {
                const warehouse = row.original;
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
                            <DropdownMenuItem >
                                <Link to={`/warehouses/${warehouse.id}`}>
                                    Szczegóły magazynu
                                </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => onEditWarehouse(warehouse)}>
                                Edytuj magazyn
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => onDeleteWarehouse(warehouse.id)}
                                className="text-red-600"
                            >
                                Usuń magazyn
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ], [onEditWarehouse, onDeleteWarehouse]);

    const table = useReactTable({
        data: filteredData,
        columns,
        state: { sorting },
        onSortingChange: setSorting,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });

    const producers = useMemo(() => {
        const producerNames = new Set(
            warehouses.flatMap((warehouse) => warehouse.products.map((product) => product.producer))
        );
        return Array.from(producerNames);
    }, [warehouses]);

    return (
        <div className="w-full">
            <div className="flex items-center justify-between py-4">
                <Input
                    placeholder="Filtruj magazyny..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="max-w-sm"
                />

                <Button variant="outline" onClick={onAddWarehouse} className="ml-4">
                    Dodaj magazyn
                </Button>
            </div>

            <div className="overflow-x-auto rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
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

export default TableWarehouses;
