import React, { useState, useMemo } from "react";
import {
    useReactTable,
    getCoreRowModel,
    getSortedRowModel,
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
import { Vehicle } from './types';

interface TableVehiclesProps {
    onEditVehicle: (vehicle: Vehicle) => void;
    onDeleteVehicle: (vehicleId: number) => void;
    vehicles: Vehicle[];
    onAddVehicle: () => void;
}

const TableVehicles = ({ vehicles, onEditVehicle, onDeleteVehicle, onAddVehicle }: TableVehiclesProps) => {
    const [searchInput, setSearchInput] = useState<string>("");

    const filteredData = useMemo(() => {
        if (!searchInput) return vehicles;
        return vehicles.filter(
            (vehicle) =>
                vehicle.brand.toLowerCase().includes(searchInput.toLowerCase()) ||
                vehicle.model.toLowerCase().includes(searchInput.toLowerCase()) ||
                vehicle.vin.toLowerCase().includes(searchInput.toLowerCase()) ||
                vehicle.driver?.toLowerCase().includes(searchInput.toLowerCase()) ||
                vehicle.owner?.toLowerCase().includes(searchInput.toLowerCase())
        );
    }, [searchInput, vehicles]);

    const columns = [
        {
            accessorKey: "id",
            header: "ID",
        },
        {
            accessorKey: "brand",
            header: "Marka",
        },
        {
            accessorKey: "model",
            header: "Model",
        },
        {
            accessorKey: "vin",
            header: "Numer VIN",
        },
        {
            accessorKey: "inspection_date",
            header: "Data przeglądu",
            cell: ({ row }) => {
                return row.original.inspection_date ? row.original.inspection_date : 'Brak';
            },
        },
        {
            accessorKey: "insurance_date",
            header: "Data ubezpieczenia",
            cell: ({ row }) => {
                return row.original.insurance_date ? row.original.insurance_date : 'Brak';
            },
        },
        {
            accessorKey: "technical_inspection",
            header: "Przegląd techniczny",
            cell: ({ row }) => {
                const value = row.original.technical_inspection;
                if (value !== undefined) {
                    return value === 1 ? "Aktualny" : "Nieaktualny";
                }
                return 'Brak';
            },
        },
        {
            accessorKey: "driver",
            header: "Kierowca",
        },
        {
            accessorKey: "owner",
            header: "Właściciel",
        },
        {
            accessorKey: "engine",
            header: "Silnik",
        },
        {
            accessorKey: "year",
            header: "Rok produkcji",
        },
        {
            id: "actions",
            header: "Akcje",
            cell: ({ row }) => {
                const vehicle = row.original;
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
                            <DropdownMenuItem onClick={() => onEditVehicle(vehicle)}>
                                Edytuj pojazd
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => onDeleteVehicle(vehicle.id)}
                                className="text-red-600"
                            >
                                Usuń pojazd
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    const table = useReactTable({
        data: filteredData,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
    });
    console.log("Filtered Data:", filteredData);

    return (
        <div className="w-full">
            <div className="flex items-center justify-between py-4">
                <Input
                    placeholder="Filtruj pojazdy..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                    className="max-w-sm"
                />

                <Button variant="outline" onClick={onAddVehicle} className="ml-4">
                    Dodaj pojazd
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

export default TableVehicles;
